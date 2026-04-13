import { getBookings } from "@/app/utils/data";
import { NextRequest, NextResponse } from "next/server";

interface Booking {
  date: string;
  timeSlot: string;
  [key: string]: unknown;
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const dateStr = searchParams.get("date");

    if (!dateStr) {
      return NextResponse.json({ error: "Date parameter required" }, { status: 400 });
    }

    // Parse the date and get day of week
    const date = new Date(dateStr);
    const dayOfWeek = date.getDay();
    const dateOnly = date.toISOString().split("T")[0]; // YYYY-MM-DD format

    const bookingsData = await getBookings();
    
    // Find all bookings for this specific date and extract their time slots
    const bookedSlots = bookingsData.bookings
      .filter((booking: Booking) => {
        // Match bookings by date (YYYY-MM-DD format)
        const bookingDate = new Date(booking.date).toISOString().split("T")[0];
        return bookingDate === dateOnly;
      })
      .map((booking: Booking) => booking.timeSlot)
      .filter(Boolean);

    return NextResponse.json({
      date: dateOnly,
      dayOfWeek,
      bookedSlots: [...new Set(bookedSlots)], // Remove duplicates
    });
  } catch (error) {
    console.error("Error fetching booked slots:", error);
    return NextResponse.json({ error: "Failed to fetch booked slots" }, { status: 500 });
  }
}
