"use client";

import { useAuth } from "@/app/(client)/client-auth";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside } from "@/hooks/use-click-outside";
import { User, LogOut, ShoppingBag, X } from "lucide-react";
import { useEffect } from "react";
import Image from "next/image";

type UserMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function UserMenu({ open, onClose }: UserMenuProps) {
  const { user, isAuthenticated, logout, isInitialized } = useAuth();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const panelRef = useClickOutside<HTMLDivElement>(() => onClose());

  if (!isInitialized || !isAuthenticated || !user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    onClose();
    window.location.reload();
  };

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
            className="absolute right-0 top-0 h-full w-[350px] bg-white shadow-xl border-l flex flex-col"
            initial={{ x: 350 }}
            animate={{ x: 0 }}
            exit={{ x: 350 }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b flex items-center justify-between">
              <div className="text-lg font-medium text-gray-900">
                Tài khoản của tôi
              </div>
              <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {/* User Info */}
              <div className="mb-6 pb-6 border-b">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    {
                      user.avatar ? (
                        <Image src={user.avatar} alt={user.fullname || ''} className="w-12 h-12 rounded-full object-cover" width={48} height={48} />
                      ) : (
                        <User className="w-6 h-6 text-gray-600" />
                      )
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate">{user.fullname}</div>
                    {user.phone && (
                      <div className="text-sm text-gray-500">{user.phone}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="space-y-2">
                <button
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center transition-colors"
                  onClick={() => {
                    onClose();
                    // Navigate to profile
                  }}
                >
                  <User className="mr-3 h-5 w-5" />
                  <span>Thông tin cá nhân</span>
                </button>
                <button
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center transition-colors"
                  onClick={() => {
                    onClose();
                    // Navigate to orders
                  }}
                >
                  <ShoppingBag className="mr-3 h-5 w-5" />
                  <span>Đơn hàng của tôi</span>
                </button>
              </div>

              {/* Logout Button */}
              <div className="mt-6 pt-6 border-t">
                <button
                  className="w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center justify-center transition-colors font-medium"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Đăng xuất
                </button>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

