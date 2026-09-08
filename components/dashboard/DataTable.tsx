"use client";

import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import Checkbox from "./Checkbox";
import Dropdown from "./Dropdown";

export interface DataRow {
  id: string;
  name: string;
  avatarColor?: string;
  status: "Active" | "Pending" | "Completed" | "Idle";
  type: string;
  email: string;
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

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 flex flex-col gap-6 w-full max-w-full overflow-hidden min-w-0">
      {/* Header controls: Search & Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {title && (
          <span className="text-base font-medium text-neutral-900">
            {title}
          </span>
        )}

        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
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
              <th className="py-3 px-4 font-normal">ACTIVITY</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-neutral-100">
            {paginatedRows.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-xs font-light text-neutral-400">
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
            className="px-3 py-1.5 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            const isPageActive = page === currentPage;
            return (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-normal transition-colors cursor-pointer ${
                  isPageActive ? "bg-neutral-900 text-white" : "text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                {page}
              </button>
            );
          })}
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1.5 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
