"use client";

import { useState } from "react";
import { IconSearch, IconDownload } from "@tabler/icons-react";
import Checkbox from "./Checkbox";
import Dropdown from "./Dropdown";

export interface DataRow {
  id: string;
  name: string;
  avatarColor?: string;
  status: "Active" | "Pending" | "Completed" | "Idle";
  type: string;
  email: string;
  duration?: string;
  timestamp: string;
}

interface DataTableProps {
  title?: string;
  rows: DataRow[];
}

export default function DataTable({ title, rows }: DataTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const hasDuration = rows.some((r) => r.duration !== undefined);

  const statusOptions = [
    { value: "all", label: "Status: All" },
    { value: "Active", label: "Active" },
    { value: "Pending", label: "Pending" },
    { value: "Completed", label: "Completed" },
    { value: "Idle", label: "Idle" },
  ];

  const filteredRows = rows.filter((row) => {
    const matchesSearch =
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || row.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredRows.length / itemsPerPage) || 1;
  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const isAllSelected =
    paginatedRows.length > 0 &&
    paginatedRows.every((r) => selectedIds.includes(r.id));

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      const newIds = Array.from(
        new Set([...selectedIds, ...paginatedRows.map((r) => r.id)])
      );
      setSelectedIds(newIds);
    } else {
      setSelectedIds(
        selectedIds.filter((id) => !paginatedRows.some((r) => r.id === id))
      );
    }
  };

  const toggleSelectRow = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const getStatusDot = (status: DataRow["status"]) => {
    if (status === "Active" || status === "Completed") {
      return "bg-emerald-500";
    }
    if (status === "Pending") {
      return "bg-amber-500";
    }
    return "bg-neutral-400";
  };

  // ── Export Selected Rows as CSV ────────────────────────────
  const exportToCsv = () => {
    const rowsToExport = selectedIds.length > 0
      ? rows.filter((r) => selectedIds.includes(r.id))
      : filteredRows;

    if (rowsToExport.length === 0) return;

    const headers = [
      "Session ID",
      "Visitor / User",
      "Status",
      "Event Type",
      "Identifier",
      ...(hasDuration ? ["Time Spent (ms)"] : []),
      "Activity",
    ];

    const escapeCsv = (val: string | number | undefined) => {
      const str = String(val ?? "").replace(/"/g, '""');
      return `"${str}"`;
    };

    const csvLines = [
      headers.map(escapeCsv).join(","),
      ...rowsToExport.map((r) => {
        const line = [
          escapeCsv(r.id),
          escapeCsv(r.name),
          escapeCsv(r.status),
          escapeCsv(r.type),
          escapeCsv(r.email),
          ...(hasDuration ? [escapeCsv(r.duration || "0 ms")] : []),
          escapeCsv(r.timestamp),
        ];
        return line.join(",");
      }),
    ];

    const blob = new Blob([csvLines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const cleanTitle = (title || "export").toLowerCase().replace(/[^a-z0-9]/g, "_");
    a.download = `triangle_${cleanTitle}_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 flex flex-col gap-6 w-full max-w-full overflow-hidden min-w-0">
      {/* Header controls: Search, Filters & Export Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {title && (
            <span className="text-base font-medium text-neutral-900">
              {title}
            </span>
          )}
          {selectedIds.length > 0 && (
            <span className="text-xs text-neutral-500 bg-neutral-100 rounded-full px-2.5 py-0.5 font-medium">
              {selectedIds.length} selected
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Export as CSV button appears whenever rows are selected */}
          {selectedIds.length > 0 && (
            <button
              type="button"
              onClick={exportToCsv}
              className="flex items-center gap-2 h-11 px-4 bg-[#1E1E1C] hover:bg-neutral-800 text-white rounded-xl text-xs sm:text-sm font-medium transition-all shadow-sm cursor-pointer select-none shrink-0"
              title="Export selected rows to CSV"
            >
              <IconDownload size={16} stroke={1.5} />
              <span>Export as CSV ({selectedIds.length})</span>
            </button>
          )}

          <div className="relative flex-1 sm:w-64">
            <IconSearch
              size={16}
              stroke={1.5}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search sessions or users"
              className="w-full h-11 bg-neutral-100/70 hover:bg-neutral-100 focus:bg-neutral-100 rounded-xl pl-10 pr-4 text-sm font-normal text-neutral-800 placeholder-neutral-400 outline-none transition-colors"
            />
          </div>

          <Dropdown
            options={statusOptions}
            selected={statusFilter}
            onChange={(val) => {
              setStatusFilter(val);
              setCurrentPage(1);
            }}
            widthClass="w-36"
            variant="neutral"
          />
        </div>
      </div>

      {/* Table container with horizontal scroll and no word-wrap */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="text-xs font-light text-neutral-400 border-b border-neutral-100">
              <th className="py-3 px-4 w-12">
                <Checkbox
                  checked={isAllSelected}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="py-3 px-4 font-normal">VISITOR / USER</th>
              <th className="py-3 px-4 font-normal">STATUS</th>
              <th className="py-3 px-4 font-normal">EVENT TYPE</th>
              <th className="py-3 px-4 font-normal">IDENTIFIER</th>
              {hasDuration && (
                <th className="py-3 px-4 font-normal">TIME SPENT</th>
              )}
              <th className="py-3 px-4 font-normal">ACTIVITY</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-neutral-100">
            {paginatedRows.length === 0 ? (
              <tr>
                <td
                  colSpan={hasDuration ? 7 : 6}
                  className="py-12 text-center text-xs font-light text-neutral-400"
                >
                  No records match your filters
                </td>
              </tr>
            ) : (
              paginatedRows.map((row) => {
                const isSelected = selectedIds.includes(row.id);
                return (
                  <tr
                    key={row.id}
                    className={`transition-colors ${
                      isSelected ? "bg-neutral-50" : "hover:bg-neutral-50/50"
                    }`}
                  >
                    <td className="py-4 px-4">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => toggleSelectRow(row.id)}
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-normal text-neutral-700 ${
                            row.avatarColor || "bg-neutral-100"
                          }`}
                        >
                          {row.name.charAt(0)}
                        </div>
                        <span className="font-normal text-neutral-800">
                          {row.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusDot(row.status)}`} />
                        <span className="text-xs font-light text-neutral-600">
                          {row.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-xs font-light text-neutral-600">
                      {row.type}
                    </td>
                    <td className="py-4 px-4 text-xs font-light text-neutral-500">
                      {row.email}
                    </td>
                    {hasDuration && (
                      <td className="py-4 px-4 font-mono text-xs text-neutral-600 font-medium">
                        {row.duration || "0 ms"}
                      </td>
                    )}
                    <td className="py-4 px-4 text-xs font-light text-neutral-400">
                      {row.timestamp}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-neutral-100 text-xs font-light text-neutral-500">
        <span>
          Showing {paginatedRows.length} of {filteredRows.length}
        </span>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1.5 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            Previous
          </button>

          <span className="px-2">
            {currentPage} / {totalPages}
          </span>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1.5 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
