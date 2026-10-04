import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function AdminLayout({ children }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8F5F0]">
      {/* Desktop Sidebar (hidden on mobile, visible on desktop) */}
      <div className="hidden lg:flex w-[240px] shrink-0 min-h-screen sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-[260px] h-full z-10 flex">
            <Sidebar onClose={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onMenuClick={() => setMobileSidebarOpen(true)} />

        <main className="p-4 sm:p-6 md:p-8 flex-1 min-w-0 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;