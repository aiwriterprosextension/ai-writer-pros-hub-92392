
import { DashboardLayout } from "@/components/DashboardLayout";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
