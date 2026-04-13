import { isAdminAuthenticated } from "@/app/utils/auth";
import { getImages, saveImages } from "@/app/utils/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const isAuthenticated = await isAdminAuthenticated();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const images = await getImages();
    return NextResponse.json(images);
  } catch (error) {
    console.error("Error fetching gallery:", error);
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
    const result = await saveImages(body);

    if (!result) {
      return NextResponse.json(
        { error: "Failed to save gallery" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Gallery saved" });
  } catch (error) {
    console.error("Error saving gallery:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
