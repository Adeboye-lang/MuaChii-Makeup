import { isAdminAuthenticated } from "@/app/utils/auth";
import { getBookings, addBooking } from "@/app/utils/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const isAuthenticated = await isAdminAuthenticated();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookings = await getBookings();
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await addBooking(body);

    if (!result) {
      return NextResponse.json(
        { error: "Failed to save booking" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Booking saved" });
  } catch (error) {
    console.error("Error saving booking:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
