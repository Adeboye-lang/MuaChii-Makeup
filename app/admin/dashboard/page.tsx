import { requireAdminAuth } from "@/app/admin/utils/protectedRoute";
import AdminLayout from "@/app/admin/components/AdminLayout";
import { getServices, getBookings, getTestimonials, getFAQs } from "@/app/utils/data";
import { FileText, Zap, MessageSquare, HelpCircle, BookOpen } from "lucide-react";

export default async function AdminDashboard() {
  await requireAdminAuth();

  // Fetch data
  const services = await getServices();
  const bookings = await getBookings();
  const testimonials = await getTestimonials();
  const faqs = await getFAQs();

  const stats = [
    {
      icon: Zap,
      label: "Services",
      value: services?.services?.length || 0,
      color: "from-brand-blush to-brand-cocoa",
    },
    {
      icon: BookOpen,
      label: "Bookings",
      value: bookings?.bookings?.length || 0,
      color: "from-brand-cocoa to-brand-blush",
    },
    {
      icon: MessageSquare,
      label: "Testimonials",
      value: testimonials?.testimonials?.length || 0,
      color: "from-brand-gold/50 to-brand-cocoa",
    },
    {
      icon: HelpCircle,
      label: "FAQs",
      value: faqs?.faqs?.length || 0,
      color: "from-brand-nude/50 to-brand-blush",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-serif text-brand-espresso mb-2">Dashboard</h1>
          <p className="text-brand-espresso/60 font-medium">Welcome back! Here's your site overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`bg-linear-to-br ${stat.color} p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-white/80 text-sm font-medium">{stat.label}</p>
                    <p className="text-4xl font-serif font-bold mt-1">{stat.value}</p>
                  </div>
                  <Icon size={24} className="opacity-40" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border-2 border-brand-nude/30 p-8">
          <h2 className="text-2xl font-serif text-brand-espresso mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="/admin/content"
              className="p-4 rounded-xl bg-brand-champagne/50 hover:bg-brand-blush/10 transition-all text-center group"
            >
              <FileText className="text-brand-blush/50 group-hover:text-brand-cocoa mx-auto mb-2 transition-colors" size={32} />
              <p className="text-sm font-bold text-brand-espresso">Edit Content</p>
            </a>
            <a
              href="/admin/services"
              className="p-4 rounded-xl bg-brand-champagne/50 hover:bg-brand-blush/10 transition-all text-center group"
            >
              <Zap className="text-brand-blush/50 group-hover:text-brand-cocoa mx-auto mb-2 transition-colors" size={32} />
              <p className="text-sm font-bold text-brand-espresso">Manage Services</p>
            </a>
            <a
              href="/admin/bookings"
              className="p-4 rounded-xl bg-brand-champagne/50 hover:bg-brand-blush/10 transition-all text-center group"
            >
              <BookOpen className="text-brand-blush/50 group-hover:text-brand-cocoa mx-auto mb-2 transition-colors" size={32} />
              <p className="text-sm font-bold text-brand-espresso">View Bookings</p>
            </a>
            <a
              href="/admin/gallery"
              className="p-4 rounded-xl bg-brand-champagne/50 hover:bg-brand-blush/10 transition-all text-center group"
            >
              <FileText className="text-brand-blush/50 group-hover:text-brand-cocoa mx-auto mb-2 transition-colors" size={32} />
              <p className="text-sm font-bold text-brand-espresso">Manage Gallery</p>
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border-2 border-brand-nude/30 p-8">
          <h2 className="text-2xl font-serif text-brand-espresso mb-6">Site Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-brand-champagne/30 rounded-xl">
              <div>
                <p className="font-bold text-brand-espresso">All Systems</p>
                <p className="text-sm text-brand-espresso/60">Your site is running smoothly</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
