import { AdminShell } from "@/components/admin-shell";
import { Dashboard } from "@/features/dashboard/dashboard";

export default function Home() {
  return <AdminShell><Dashboard /></AdminShell>;
}
