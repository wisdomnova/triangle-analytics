"use client";

import DataTable, { DataRow } from "@/components/dashboard/DataTable";

export default function VisitorsPage() {
  const visitorRows: DataRow[] = [
    {
      id: "v-1",
      name: "Amanda Harvey",
      avatarColor: "bg-indigo-100 text-indigo-700",
      status: "Active",
      type: "Checkout Completed",
      email: "amanda@company.com",
      timestamp: "2 minutes ago",
    },
    {
      id: "v-2",
      name: "Rachel Doe",
      avatarColor: "bg-sky-100 text-sky-700",
      status: "Pending",
      type: "Sign Up Flow",
      email: "rachel@client.org",
      timestamp: "14 minutes ago",
    },
    {
      id: "v-3",
      name: "Costa Quinn",
      avatarColor: "bg-emerald-100 text-emerald-700",
      status: "Completed",
      type: "Pricing View",
      email: "costa@studio.io",
      timestamp: "1 hour ago",
    },
    {
      id: "v-4",
      name: "Anna Richard",
      avatarColor: "bg-rose-100 text-rose-700",
      status: "Active",
      type: "Documentation Search",
      email: "anna@enterprise.com",
      timestamp: "3 hours ago",
    },
    {
      id: "v-5",
      name: "Bob Dean",
      avatarColor: "bg-amber-100 text-amber-700",
      status: "Active",
      type: "Session Ping",
      email: "bob@domain.net",
      timestamp: "5 hours ago",
    },
    {
      id: "v-6",
      name: "Mark Colbert",
      avatarColor: "bg-purple-100 text-purple-700",
      status: "Completed",
      type: "API Key Generated",
      email: "mark@build.dev",
      timestamp: "7 hours ago",
    },
    {
      id: "v-7",
      name: "Finch Hoot",
      avatarColor: "bg-teal-100 text-teal-700",
      status: "Pending",
      type: "Onboarding Step 2",
      email: "finch@cloud.ai",
      timestamp: "12 hours ago",
    },
    {
      id: "v-8",
      name: "Ella Lauda",
      avatarColor: "bg-fuchsia-100 text-fuchsia-700",
      status: "Idle",
      type: "Blog Article Read",
      email: "ella@agency.com",
      timestamp: "1 day ago",
    },
  ];

  return (
    <div className="flex flex-col gap-10 w-full">
      <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-900">
        Live visitor sessions and active customer telemetry logs
      </h1>

      <DataTable rows={visitorRows} />
    </div>
  );
}
