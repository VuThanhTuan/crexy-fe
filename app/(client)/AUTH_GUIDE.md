# Client Authentication Guide

## Tổng quan

Hệ thống authentication cho client đã được refactor để có cấu trúc chuyên nghiệp hơn, sử dụng Context API và hooks pattern tương tự như admin authentication.

## Cấu trúc files

```
app/(client)/
  ├── client-auth.tsx          # AuthContext và AuthProvider
  └── AUTH_GUIDE.md           # File này

components/
  ├── AuthModal.tsx            # Modal đăng nhập/đăng ký (đã refactor)
  └── UserMenu.tsx             # Component hiển thị user menu

hooks/
  └── use-auth.ts             # Re-export hook cho dễ import

types/
  └── user.ts                 # Type definitions cho User và Auth
```

## Sử dụng

### 1. AuthProvider đã được wrap ở client layout

```tsx
// app/(client)/layout.tsx
<AuthProvider>
  {children}
</AuthProvider>
```

### 2. Sử dụng useAuth hook trong components

```tsx
import { useAuth } from "@/hooks/use-auth";

function MyComponent() {
  const { 
    user,              // User object hoặc null
    token,             // Access token hoặc null
    isAuthenticated,   // Boolean: đã đăng nhập?
    isAuthenticating,  // Boolean: đang xử lý?
    isInitialized,     // Boolean: đã khởi tạo?
    login,             // Function: đăng nhập
    register,          // Function: đăng ký
    loginWithGoogle,   // Function: đăng nhập Google
    logout,            // Function: đăng xuất
    refreshUser,       // Function: cập nhật thông tin user
  } = useAuth();

  // Sử dụng...
}
```

### 3. Các hàm authentication

#### Login (Email/Password)
```tsx
try {
  await login({ email, password });
  // Success - token và user đã được lưu tự động
} catch (error) {
  // Handle error
}
```

#### Register
```tsx
try {
  await register({ 
    email, 
    phone, 
    password, 
    address 
  });
  // Success - tự động đăng nhập sau khi đăng ký
} catch (error) {
  // Handle error
}
```

#### Google Login
```tsx
try {
  await loginWithGoogle(credentialToken);
  // Success
} catch (error) {
  // Handle error
}
```

#### Logout
```tsx
logout(); // Xóa token và user data
```

#### Refresh User Data
```tsx
await refreshUser(); // Lấy thông tin user mới nhất từ server
```

## Các Components có sẵn

### 1. AuthModal
Modal đăng nhập/đăng ký đã được refactor để sử dụng useAuth hook.

```tsx
import { AuthModal } from "@/components/AuthModal";

<AuthModal 
  open={isOpen} 
  onClose={() => setIsOpen(false)} 
/>
```

### 2. UserMenu
Component hiển thị menu user với tùy chọn đăng xuất.

```tsx
import { UserMenu } from "@/components/UserMenu";

<UserMenu onLoginClick={() => setShowLoginModal(true)} />
```

## Storage

Authentication data được lưu trong localStorage:
- `access_token`: Access token từ backend
- `refresh_token`: Refresh token từ backend  
- `user`: User object (JSON string)

## Type Definitions

```typescript
// User type
type User = {
  id: string | number;
  email: string;
  phone?: string;
  address?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
};

// Login credentials
type LoginCredentials = {
  email: string;
  password: string;
};

// Register data
type RegisterData = {
  email: string;
  phone: string;
  password: string;
  address: string;
};

// Auth response từ backend
type AuthResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};
```

## Best Practices

1. **Luôn check isInitialized trước khi render**
   ```tsx
   if (!isInitialized) return <LoadingSpinner />;
   ```

2. **Sử dụng isAuthenticating để disable buttons**
   ```tsx
   <button disabled={isAuthenticating}>
     {isAuthenticating ? "Đang xử lý..." : "Đăng nhập"}
   </button>
   ```

3. **Protected routes**
   ```tsx
   if (!isAuthenticated) {
     return <Navigate to="/login" />;
   }
   ```

4. **Handle errors properly**
   ```tsx
   try {
     await login(credentials);
   } catch (error) {
     setError("Đăng nhập thất bại");
   }
   ```

## Migration từ code cũ

### Trước (old code)
```tsx
const handleLogin = async () => {
  const client = getPublicApi();
  const response = await client.post("/auth/login", { email, password });
  localStorage.setItem("access_token", response.data.data.accessToken);
  // ...
};
```

### Sau (new code)
```tsx
const { login } = useAuth();

const handleLogin = async () => {
  await login({ email, password });
  // Token và user data đã được lưu tự động
};
```

## Tương lai

- [ ] Implement auto token refresh
- [ ] Add remember me functionality
- [ ] Add email verification flow
- [ ] Add password reset flow
- [ ] Add profile update functionality
- [ ] Add OAuth providers khác (Facebook, etc.)
