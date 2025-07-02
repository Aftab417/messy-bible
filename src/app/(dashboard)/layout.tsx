"use client";

import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { RootState } from "@/redux";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Layout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user);
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (!isAdmin) {
      router.push("/sign-in");
    }
  }, [isAdmin, router]);

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      </header>

      <div className="flex flex-1 pt-[64px]"> {/* Adjust pt-[64px] to match your Navbar height */}
        {/* Fixed Sidebar for large screens */}
        <aside className="hidden md:block fixed left-0 top-[64px] h-[calc(100vh-64px)]  z-40">
          <Sidebar />
        </aside>

        {/* Sidebar overlay for mobile */}
        <div
          className={`fixed w-full inset-0 z-30  bg-opacity-40 md:hidden transition-opacity duration-200 ${
            sidebarOpen ? "block" : "hidden"
          }`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar drawer for mobile */}
        <aside
          className={`fixed top-0 left-0 z-50 h-full w-72   transform  transition-transform duration-300 md:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </aside>

        {/* Main content */}
        <main className="flex-1 md:ml-72 overflow-y-auto">
          <div className="p-2 sm:p-3 md:p-4 lg:py-6 xl:py-6 mt-5">
            {children}
          </div>
        </main>


        
      </div>
    </div>
  );
};

export default Layout;