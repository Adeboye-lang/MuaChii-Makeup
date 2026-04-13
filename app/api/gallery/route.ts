import { getImages } from "@/app/utils/data";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getImages();
    return NextResponse.json(data.gallery || []);
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return NextResponse.json([], { status: 200 });
  }
}
