"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";

// Import the Home component from the (dashboard) route group
import Home from "../(dashboard)/page";

export default function DashboardPage() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state?.user || null);
  
  const isAuthenticated = user?.token || user?.accessToken;
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated || !isAdmin) {
      router.replace("/");
    }
  }, [isAuthenticated, isAdmin, router]);

  // Show loading while checking authentication
  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#6AC8C4]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return <Home />;
}
