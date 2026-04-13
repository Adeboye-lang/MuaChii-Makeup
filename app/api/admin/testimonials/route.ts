import { isAdminAuthenticated } from "@/app/utils/auth";
import { getTestimonials, saveTestimonials } from "@/app/utils/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const isAuthenticated = await isAdminAuthenticated();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const testimonials = await getTestimonials();
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const result = await saveTestimonials(body);

    if (!result) {
      return NextResponse.json(
        { error: "Failed to save testimonials" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Testimonials saved" });
  } catch (error) {
    console.error("Error saving testimonials:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
