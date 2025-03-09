import React from "react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";

export default function DashboardLayout({ children }) {
  return <DashboardSidebar>{children}</DashboardSidebar>;
}