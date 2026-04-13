import { isAdminAuthenticated } from "@/app/utils/auth";
import { getFAQs, saveFAQs } from "@/app/utils/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const isAuthenticated = await isAdminAuthenticated();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const faqs = await getFAQs();
    return NextResponse.json(faqs);
  } catch (error) {
    console.error("Error fetching FAQs:", error);
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
    const result = await saveFAQs(body);

    if (!result) {
      return NextResponse.json(
        { error: "Failed to save FAQs" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "FAQs saved" });
  } catch (error) {
    console.error("Error saving FAQs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
