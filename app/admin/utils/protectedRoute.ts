import { isAdminAuthenticated } from "@/app/utils/auth";
import { redirect } from "next/navigation";

export async function requireAdminAuth() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin");
  }
}
