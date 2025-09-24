"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export default function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  
  const isAuthenticated = user?.token || user?.accessToken;
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    // Give Redux Persist time to rehydrate
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isChecking) return;

    if (requireAuth) {
      // If authentication is required but user is not authenticated
      if (!isAuthenticated) {
        router.replace("/sign-in");
        return;
      }
      
      // If user is authenticated but not admin
      if (!isAdmin) {
        router.replace("/sign-in");
        return;
      }
    } else {
      // If authentication is not required but user is already authenticated
      if (isAuthenticated && isAdmin) {
        router.replace("/");
        return;
      }
    }
  }, [isChecking, isAuthenticated, isAdmin, requireAuth, router]);

  // Show loading state while checking authentication
  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#6AC8C4]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if authentication check fails
  if (requireAuth && (!isAuthenticated || !isAdmin)) {
    return null;
  }

  // Don't render children if user is already authenticated and trying to access auth pages
  if (!requireAuth && isAuthenticated && isAdmin) {
    return null;
  }

  return <>{children}</>;
}
