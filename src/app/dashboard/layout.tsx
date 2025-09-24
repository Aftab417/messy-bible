"use client";

import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { ReactNode, useState } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <header className="fixed top-0 left-0 right-0 z-50">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      </header>

      <div className="flex flex-1 pt-[64px]">
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
        <main className="flex-1 overflow-y-auto md:ml-64">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
