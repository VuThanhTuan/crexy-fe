"use client"

import { useEffect, useState } from "react"
import { useClickOutside } from "@/hooks/use-click-outside"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AnimatePresence, motion } from "framer-motion"
import { X, Eye, EyeOff, ArrowLeft } from "lucide-react"
import Image from "next/image"
import FacebookIcon from "@/public/images/icon/Facebook_icon.svg.png"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { useAuth } from "@/app/(client)/client-auth"

type AuthModalProps = {
  open: boolean
  onClose: () => void
}

const registerSchema = z.object({
  email: z
    .string()
    .min(1, "Email không được để trống")
    .email("Email không hợp lệ"),
  phone: z
    .string()
    .min(1, "Số điện thoại không được để trống")
    .regex(/^[0-9]{10,11}$/, "Số điện thoại phải có 10-11 chữ số"),
  password: z
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  confirmPassword: z
    .string()
    .min(1, "Xác nhận mật khẩu không được để trống"),
  address: z
    .string()
    .min(1, "Địa chỉ không được để trống"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
})

type RegisterFormValues = z.infer<typeof registerSchema>

export const AuthModal = ({ open, onClose }: AuthModalProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState<string | null>(null)

  const { login, register: registerUser, loginWithGoogle, isAuthenticating } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      address: "",
    },
  })

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onClose])

  const panelRef = useClickOutside<HTMLDivElement>(() => onClose())

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    try {
      await login(loginData)
      onClose()
      window.location.reload()
    } catch (err) {
      console.error('Login error:', err)
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.')
    }
  }

  const handleRegister = () => {
    setActiveTab('register')
  }

  const handleBackToLogin = () => {
    setActiveTab('login')
    reset()
  }

  const onRegisterSubmit = async (values: RegisterFormValues) => {
    setError(null)
    
    try {
      await registerUser({
        email: values.email,
        phone: values.phone,
        password: values.password,
        address: values.address,
      })
      onClose()
      window.location.reload()
    } catch (err) {
      console.error('Registration error:', err)
      setError('Đăng ký thất bại. Email có thể đã được sử dụng.')
    }
  }

  const handleGoogleLogin = async (credentialResponse: { credential?: string }) => {
    setError(null)
    
    try {
      if (!credentialResponse.credential) {
        console.error('No credential received from Google')
        setError('Không nhận được thông tin từ Google')
        return
      }

      await loginWithGoogle(credentialResponse.credential)
      onClose()
      window.location.reload()
    } catch (err) {
      console.error('Google login error:', err)
      setError('Đăng nhập Google thất bại. Vui lòng thử lại.')
    }
  }

  const handleFacebookLogin = () => {
    // TODO: Implement Facebook login logic
    console.log('Facebook login')
  }

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50">
            <motion.div
              className="absolute inset-0 bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
            />
            <motion.aside
              ref={panelRef}
              className="absolute right-0 top-0 h-full w-[400px] bg-white shadow-xl border-l flex flex-col"
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ type: "tween", duration: 0.25 }}
            >
            {/* Header */}
            <div className="px-5 py-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                {activeTab === 'register' && (
                  <button
                    onClick={handleBackToLogin}
                    className="text-gray-500 hover:text-gray-800"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
                <div className="text-lg font-medium text-gray-900">
                  {activeTab === 'login' ? 'Thông tin xác nhận' : 'Đăng ký tài khoản'}
                </div>
              </div>
              <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded text-sm">
                  {error}
                </div>
              )}
              
              {activeTab === 'login' ? (
                /* Login Section */
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-2">
                    Tôi đã có tài khoản
                  </h3>
                  <p className="text-xs text-gray-500 mb-4">
                    Thông tin bắt buộc*
                  </p>
                  
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Input
                        type="email"
                        placeholder="Đăng nhập*"
                        value={loginData.email}
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                        className="w-full border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                        required
                      />
                    </div>
                    
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Mật khẩu*"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        className="w-full border-gray-300 focus:border-gray-900 focus:ring-gray-900 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="text-right">
                      <button 
                        type="button"
                        onClick={() => console.log('Forgot password')}
                        className="text-xs text-gray-600 hover:text-gray-800 underline"
                      >
                        Bạn quên mật khẩu?
                      </button>
                    </div>

                    {/* <div className="space-y-2">
                      <p className="text-xs text-gray-600">
                        Hoặc sử dụng liên kết one-time để đăng nhập nhanh
                      </p>
                      <button 
                        type="button"
                        onClick={handleSendOneTimeLink}
                        className="text-xs text-gray-600 hover:text-gray-800 underline"
                      >
                        Gửi liên kết về email của tôi
                      </button>
                    </div> */}

                    <Button 
                      type="submit"
                      disabled={isAuthenticating}
                      className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-none disabled:opacity-50"
                    >
                      {isAuthenticating ? "Đang đăng nhập..." : "Đăng nhập"}
                    </Button>
                  </form>

                  {/* Social Login Buttons */}
                  <div className="mt-4 space-y-3">
                    <button
                      onClick={handleFacebookLogin}
                      className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white hover:bg-gray-50 py-3 px-4 rounded-none transition-colors"
                    >
                        <Image src={FacebookIcon} alt="Facebook" className="w-5 h-5" />
                      <span className="text-gray-700 font-medium">Facebook</span>
                    </button>

                    <div className="w-full">
                      <GoogleLogin
                        onSuccess={handleGoogleLogin}
                        onError={() => {
                          console.log('Login Failed')
                          alert('Đăng nhập Google thất bại')
                        }}
                        useOneTap
                        theme="outline"
                        size="large"
                        text="continue_with"
                        shape="rectangular"
                        logo_alignment="left"
                        width="100%"
                      />
                    </div>
                  </div>

                  {/* Register Section */}
                  <div className="pt-6 border-t">
                    <h3 className="text-base font-medium text-gray-900 mb-2">
                      Tôi không có tài khoản
                    </h3>
                    <p className="text-xs text-gray-600 mb-4">
                      Tận hưởng nhiều lợi ích và trải nghiệm phong phú hơn bằng cách tạo tài khoản cá nhân
                    </p>
                    
                    <Button 
                      onClick={handleRegister}
                      variant="outline"
                      className="w-full border-black text-black hover:bg-black hover:text-white py-3 rounded-none"
                    >
                      Tạo tài khoản
                    </Button>
                  </div>
                </div>
              ) : (
                /* Register Section */
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-2">
                    Tạo tài khoản mới
                  </h3>
                  <p className="text-xs text-gray-500 mb-4">
                    Thông tin bắt buộc*
                  </p>
                  
                  <form onSubmit={handleSubmit(onRegisterSubmit)} className="space-y-4">
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email (dùng để đăng nhập)*"
                        {...register("email")}
                        className="w-full border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Số điện thoại <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Số điện thoại*"
                        {...register("phone")}
                        className="w-full border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Mật khẩu <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Mật khẩu*"
                          {...register("password")}
                          className="w-full border-gray-300 focus:border-gray-900 focus:ring-gray-900 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Xác nhận mật khẩu <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Xác nhận mật khẩu*"
                          {...register("confirmPassword")}
                          className="w-full border-gray-300 focus:border-gray-900 focus:ring-gray-900 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
                      )}
                    </div>

                    {/* Address */}
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Địa chỉ <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        id="address"
                        placeholder="Địa chỉ*"
                        {...register("address")}
                        className="w-full border-gray-300 focus:border-gray-900 focus:ring-gray-900 min-h-[80px]"
                      />
                      {errors.address && (
                        <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>
                      )}
                    </div>

                    <Button 
                      type="submit"
                      disabled={isSubmitting || isAuthenticating}
                      className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-none disabled:opacity-50"
                    >
                      {isSubmitting || isAuthenticating ? "Đang xử lý..." : "Đăng ký"}
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
    </GoogleOAuthProvider>
  )
}

export default AuthModal
