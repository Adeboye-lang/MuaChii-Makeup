import { isAdminAuthenticated } from "@/app/utils/auth";
import { getServices, saveServices } from "@/app/utils/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const isAuthenticated = await isAdminAuthenticated();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const services = await getServices();
    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
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
    const result = await saveServices(body);

    if (!result) {
      return NextResponse.json(
        { error: "Failed to save services" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Services saved" });
  } catch (error) {
    console.error("Error saving services:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
