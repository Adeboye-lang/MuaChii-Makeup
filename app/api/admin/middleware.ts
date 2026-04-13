import { isAdminAuthenticated } from "@/app/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function adminAuthMiddleware(request: NextRequest) {
  const isAuthenticated = await isAdminAuthenticated();
  
  if (!isAuthenticated) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
  
  return null;
}
