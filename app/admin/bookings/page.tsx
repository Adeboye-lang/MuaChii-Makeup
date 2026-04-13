"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/app/admin/components/AdminLayout";
import { useToast } from "@/app/admin/components/Toast";
import { Download, Eye } from "lucide-react";

interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  message?: string;
  createdAt: string;
}

export default function AdminBookingsPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await fetch("/api/admin/bookings");
        if (!response.ok) throw new Error("Failed to fetch bookings");
        const data = await response.json();
        setBookings(data.bookings || []);
      } catch (error) {
        toast("Failed to load bookings", "error");
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, [toast]);

  const exportToCSV = () => {
    if (bookings.length === 0) {
      toast("No bookings to export", "error");
      return;
    }

    const headers = ["ID", "Name", "Email", "Phone", "Service", "Date", "Message", "CreatedAt"];
    const rows = bookings.map((b) => [
      b.id,
      b.name,
      b.email,
      b.phone,
      b.service,
      b.date,
      b.message,
      b.createdAt,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell || ""}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookings-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast("Bookings exported", "success");
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-serif text-brand-espresso mb-2">Booking Inquiries</h1>
            <p className="text-brand-espresso/60">View all contact form submissions</p>
          </div>
          <button
            onClick={exportToCSV}
            className="px-6 py-3 rounded-xl bg-linear-to-r from-brand-cocoa to-brand-blush text-white font-extrabold uppercase tracking-widest text-sm hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Download size={18} />
            Export CSV
          </button>
        </div>

        {/* Bookings Table */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-brand-nude/30 p-12 text-center">
            <p className="text-brand-espresso/60 font-medium">No bookings received yet</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border-2 border-brand-nude/30 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-brand-champagne/50 border-b border-brand-nude/30">
                    <th className="px-6 py-4 text-left text-sm font-extrabold uppercase tracking-widest text-brand-espresso">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-extrabold uppercase tracking-widest text-brand-espresso">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-extrabold uppercase tracking-widest text-brand-espresso">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-extrabold uppercase tracking-widest text-brand-espresso">
                      Service
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-extrabold uppercase tracking-widest text-brand-espresso">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-extrabold uppercase tracking-widest text-brand-espresso">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b border-brand-nude/20 hover:bg-brand-champagne/30 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-brand-espresso">{booking.name}</td>
                      <td className="px-6 py-4 text-sm text-brand-espresso/60">{booking.email}</td>
                      <td className="px-6 py-4 text-sm text-brand-espresso/60">{booking.phone}</td>
                      <td className="px-6 py-4 text-sm text-brand-espresso/60">{booking.service || "N/A"}</td>
                      <td className="px-6 py-4 text-sm text-brand-espresso/60">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="p-2 rounded-lg hover:bg-brand-blush/10 text-brand-cocoa transition-colors"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Booking Detail Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl border-2 border-brand-nude/30 p-8 max-w-md w-full max-h-screen overflow-y-auto">
              <h2 className="text-2xl font-serif text-brand-espresso mb-6">Booking Details</h2>
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-widest text-brand-espresso/50 mb-1">
                    Name
                  </p>
                  <p className="text-brand-espresso font-medium">{selectedBooking.name}</p>
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-widest text-brand-espresso/50 mb-1">
                    Email
                  </p>
                  <p className="text-brand-espresso font-medium break-all">{selectedBooking.email}</p>
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-widest text-brand-espresso/50 mb-1">
                    Phone
                  </p>
                  <p className="text-brand-espresso font-medium">{selectedBooking.phone}</p>
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-widest text-brand-espresso/50 mb-1">
                    Service
                  </p>
                  <p className="text-brand-espresso font-medium">{selectedBooking.service || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-widest text-brand-espresso/50 mb-1">
                    Date
                  </p>
                  <p className="text-brand-espresso font-medium">{selectedBooking.date || "Not specified"}</p>
                </div>
                {selectedBooking.message && (
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-widest text-brand-espresso/50 mb-1">
                      Message
                    </p>
                    <p className="text-brand-espresso font-medium text-sm">{selectedBooking.message}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-widest text-brand-espresso/50 mb-1">
                    Received
                  </p>
                  <p className="text-brand-espresso/60 text-sm">
                    {new Date(selectedBooking.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-full px-6 py-3 bg-brand-champagne/50 border-2 border-brand-nude/30 text-brand-espresso font-extrabold uppercase tracking-widest rounded-full hover:bg-brand-nude/20 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
