"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, LayoutDashboard, FileText, Zap, Image, HelpCircle, BookOpen, Palette } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
    { icon: FileText, label: "Content", href: "/admin/content" },
    { icon: Zap, label: "Services", href: "/admin/services" },
    { icon: Image, label: "Gallery", href: "/admin/gallery" },
    { icon: HelpCircle, label: "FAQs", href: "/admin/faqs" },
    { icon: BookOpen, label: "Bookings", href: "/admin/bookings" },
    { icon: Palette, label: "Branding", href: "/admin/branding" },
  ];

  return (
    <div className="flex min-h-screen bg-brand-champagne">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r-2 border-brand-nude/30 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-brand-nude/20">
          <h1 className="text-2xl font-serif text-brand-espresso font-bold">
            Mua<span className="text-brand-blush">Chii</span>
          </h1>
          <p className="text-xs text-brand-espresso/50 mt-1">Admin Panel</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-brand-espresso hover:bg-brand-blush/10 hover:text-brand-cocoa transition-all font-medium text-sm"
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-6 border-t border-brand-nude/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-3 bg-linear-to-r from-brand-cocoa to-brand-blush text-white rounded-xl hover:shadow-lg transition-all font-medium text-sm"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
