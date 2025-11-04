"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "./admin-auth";

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { token, isInitialized } = useAdminAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isInitialized) return;
    if (!token) {
      router.replace("/admin/auth/sign-in");
      return;
    }
    setReady(true);
  }, [isInitialized, token, router]);

  if (!ready) return null;
  return <>{children}</>;
}


