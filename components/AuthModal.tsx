"use client"

import { useEffect, useState } from "react"
import { useClickOutside } from "@/hooks/use-click-outside"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AnimatePresence, motion } from "framer-motion"
import { X, Eye, EyeOff } from "lucide-react"
import { GoogleIcon } from "@/assets/icons"
import Image from "next/image"
import FacebookIcon from "@/public/images/icon/Facebook_icon.svg.png"

type AuthModalProps = {
  open: boolean
  onClose: () => void
}

export const AuthModal = ({ open, onClose }: AuthModalProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onClose])

  const panelRef = useClickOutside<HTMLDivElement>(() => onClose())

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement login logic
    console.log('Login data:', loginData)
  }

  const handleRegister = () => {
    // TODO: Implement register logic
    console.log('Navigate to register')
  }

  const handleSendOneTimeLink = () => {
    // TODO: Implement one-time link logic
    console.log('Send one-time link')
  }

  const handleGoogleLogin = () => {
    // TODO: Implement Google login logic
    console.log('Google login')
  }

  const handleFacebookLogin = () => {
    // TODO: Implement Facebook login logic
    console.log('Facebook login')
  }

  return (
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
              <div className="text-lg font-medium text-gray-900">Thông tin xác nhận</div>
              <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
                {/* Login Section */}
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
                      className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-none"
                    >
                      Đăng nhập
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

                    <button
                      onClick={handleGoogleLogin}
                      className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white hover:bg-gray-50 py-3 px-4 rounded-none transition-colors"
                    >
                      <GoogleIcon className="w-5 h-5" />
                      <span className="text-gray-700 font-medium">Google</span>
                    </button>
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
                    Tạo tài khoản MyLV
                  </Button>
                </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}

export default AuthModal
