"use client";

import DataTable, { DataRow } from "@/components/dashboard/DataTable";

export default function EventsPage() {
  const eventRows: DataRow[] = [
    {
      id: "ev-1",
      name: "signup_submitted",
      avatarColor: "bg-emerald-100 text-emerald-700",
      status: "Completed",
      type: "User Conversion",
      email: "auth/join",
      timestamp: "5 minutes ago",
    },
    {
      id: "ev-2",
      name: "pricing_plan_selected",
      avatarColor: "bg-indigo-100 text-indigo-700",
      status: "Active",
      type: "Checkout Intent",
      email: "pricing#tier-pro",
      timestamp: "18 minutes ago",
    },
    {
      id: "ev-3",
      name: "script_tag_verified",
      avatarColor: "bg-sky-100 text-sky-700",
      status: "Completed",
      type: "Domain Setup",
      email: "app.domain.com",
      timestamp: "45 minutes ago",
    },
    {
      id: "ev-4",
      name: "docs_endpoint_copied",
      avatarColor: "bg-amber-100 text-amber-700",
      status: "Active",
      type: "Developer Action",
      email: "docs/api",
      timestamp: "2 hours ago",
    },
    {
      id: "ev-5",
      name: "feedback_modal_opened",
      avatarColor: "bg-rose-100 text-rose-700",
      status: "Pending",
      type: "Engagement",
      email: "dashboard/feedback",
      timestamp: "6 hours ago",
    },
    {
      id: "ev-6",
      name: "report_exported_csv",
      avatarColor: "bg-purple-100 text-purple-700",
      status: "Completed",
      type: "Data Export",
      email: "overview/export",
      timestamp: "12 hours ago",
    },
  ];

  return (
    <div className="flex flex-col gap-10 w-full">
      <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-900">
        Custom conversion goals
      </h1>

      <DataTable rows={eventRows} />
    </div>
  );
}
