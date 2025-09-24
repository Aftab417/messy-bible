"use client";

import AuthGuard from "@/components/AuthGuard";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthGuard requireAuth={false}>
      {children}
    </AuthGuard>
  );
};

export default AuthLayout;
