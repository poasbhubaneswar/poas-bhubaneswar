import { getAdminSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "./AdminLoginForm";

export const metadata = {
  title: "Administrator Login | POAS Secretariat Portal",
  description: "Authorized personnel login for Paschim Odisha Agrani Sangathana administration.",
};

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) {
    redirect("/admin");
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <AdminLoginForm />
    </div>
  );
}
