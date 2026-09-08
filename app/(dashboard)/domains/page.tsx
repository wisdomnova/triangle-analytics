"use client";

import { useState } from "react";
import {
  IconWorld,
  IconCircleCheck,
  IconClock,
  IconTrash,
  IconCopy,
  IconCheck,
  IconRefresh,
  IconPlus,
} from "@tabler/icons-react";
import Input from "@/components/dashboard/Input";
import EmptyDomainState from "@/components/dashboard/EmptyDomainState";
import { useDomain } from "@/context/DomainContext";

export default function DomainsPage() {
  const {
    domains,
    isLoading,
    addDomain,
    removeDomain,
    verifyDomain,
  } = useDomain();

  const [isAddingDomain, setIsAddingDomain] = useState(false);
  const [newDomainUrl, setNewDomainUrl] = useState("");
  const [newDomainName, setNewDomainName] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [verifyFeedback, setVerifyFeedback] = useState<Record<string, { verified: boolean; message: string }>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleCopyScript = (siteId: string, id: string) => {
    const code = `<script defer src="https://triangle-analytics.vercel.app/tracker.js" data-site-id="${siteId}"></script>`;
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleAddDomainSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomainUrl.trim()) {
      setErrorMsg("Please enter a valid domain address");
      return;
    }
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      await addDomain({
        name: newDomainName.trim() || newDomainUrl.trim(),
        domain: newDomainUrl.trim(),
      });
      setNewDomainUrl("");
      setNewDomainName("");
      setIsAddingDomain(false);
    } catch (err: unknown) {
      setErrorMsg((err as Error).message || "Failed to add domain property");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerify = async (siteId: string) => {
    setVerifyingId(siteId);
    try {
      const res = await verifyDomain(siteId);
      if (res) {
        setVerifyFeedback((prev) => ({
          ...prev,
          [siteId]: {
            verified: res.verified,
            message: res.message || (res.verified ? "Domain verified and active!" : "Script not detected yet."),
          },
        }));
      }
    } catch (err: unknown) {
      setVerifyFeedback((prev) => ({
        ...prev,
        [siteId]: {
          verified: false,
          message: (err as Error).message || "Verification check failed. Please try again.",
        },
      }));
    } finally {
      setVerifyingId(null);
    }
  };

  const handleDelete = async (siteId: string) => {
    if (confirm("Are you sure you want to delete this domain? All telemetry records will be permanently removed.")) {
      try {
        await removeDomain(siteId);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="flex flex-col gap-10 w-full max-w-5xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-900">
            Connected domains
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-light">
            Manage your verified domain properties and embed tracking snippets.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsAddingDomain(!isAddingDomain);
            setErrorMsg("");
          }}
          className="flex items-center gap-2 bg-[#0B63E5] hover:bg-[#0952C3] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full transition-colors cursor-pointer self-start sm:self-auto shadow-sm"
        >
          <IconPlus size={16} stroke={2} />
          <span>{isAddingDomain ? "Close Form" : "Add new domain"}</span>
        </button>
      </div>

      {/* Add New Domain Panel */}
      {isAddingDomain && (
        <form
          onSubmit={handleAddDomainSubmit}
          className="bg-white rounded-3xl p-4 sm:p-8 flex flex-col gap-6 border border-[#EAE5D9]"
        >
          <span className="text-base font-light text-neutral-900">
            Register new domain property
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Domain Hostname"
              placeholder="analytics.company.com"
              value={newDomainUrl}
              onChange={(e) => setNewDomainUrl(e.target.value)}
              autoFocus
            />

            <Input
              label="Property Label"
              placeholder="Marketing Landing Page"
              value={newDomainName}
              onChange={(e) => setNewDomainName(e.target.value)}
            />
          </div>

          {errorMsg && (
            <span className="text-xs font-medium text-rose-500">{errorMsg}</span>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#0B63E5] hover:bg-[#0952C3] disabled:opacity-60 text-white text-xs font-semibold px-6 py-3 rounded-full transition-colors cursor-pointer shadow-sm"
            >
              {isSubmitting ? "Registering..." : "Confirm and Add Domain"}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAddingDomain(false);
                setErrorMsg("");
              }}
              className="text-neutral-500 hover:text-neutral-900 text-xs font-light px-6 py-3 rounded-full transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Loading Skeleton */}
      {isLoading && domains.length === 0 && !isAddingDomain && (
        <div className="bg-white rounded-3xl p-12 flex flex-col items-center justify-center gap-4 text-center">
          <div className="w-8 h-8 border-2 border-neutral-300 border-t-[#0B63E5] rounded-full animate-spin" />
          <span className="text-xs text-neutral-400 font-light">Loading domain properties...</span>
        </div>
      )}

      {/* Empty State when no domains exist */}
      {!isLoading && domains.length === 0 && !isAddingDomain && (
        <EmptyDomainState
          title="No domain properties connected yet"
          description="Register your first website or web application domain to start capturing real-time telemetry and visitor metrics."
          actionText="Add your first domain"
          onAction={() => setIsAddingDomain(true)}
        />
      )}

      {/* Domains List */}
      <div className="flex flex-col gap-8">
        {domains.map((dom) => {
          const isCopied = copiedId === dom.siteId || copiedId === dom.id;
          const isVerifying = verifyingId === dom.siteId;

          return (
            <div
              key={dom.siteId || dom.id}
              className="bg-white rounded-3xl p-4 sm:p-8 flex flex-col gap-6 sm:gap-8 border border-[#EAE5D9] w-full max-w-full overflow-hidden"
            >
              {/* Card Header with Icons for Domain, Status, and Delete */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-700 shrink-0 mt-0.5">
                    <IconWorld size={20} stroke={1.5} />
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-xl sm:text-2xl font-light text-neutral-900 tracking-tight break-all">
                      {dom.domain}
                    </span>
                    <span className="text-xs font-light text-neutral-400 truncate">
                      {dom.name}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6 self-start sm:self-auto">
                  {/* Status with Icon */}
                  <div className="flex items-center gap-1.5 text-xs font-light text-neutral-500">
                    {dom.status === "Active" ? (
                      <IconCircleCheck size={15} stroke={1.8} className="text-emerald-600" />
                    ) : (
                      <IconClock size={15} stroke={1.8} className="text-amber-500" />
                    )}
                    <span>{dom.status}</span>
                  </div>

                  {/* Delete Action with Icon */}
                  <button
                    type="button"
                    onClick={() => handleDelete(dom.siteId)}
                    className="flex items-center gap-1.5 text-xs font-light text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    <IconTrash size={15} stroke={1.5} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                <div className="flex flex-col gap-1">
                  <span className="text-2xl sm:text-3xl font-light text-neutral-900 tracking-tight">
                    {dom.visitors || "0"}
                  </span>
                  <span className="text-xs font-light text-neutral-400">
                    30 day visitors
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-2xl sm:text-3xl font-light text-neutral-900 tracking-tight">
                    {dom.pageViews || "0"}
                  </span>
                  <span className="text-xs font-light text-neutral-400">
                    30 day page views
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-2xl sm:text-3xl font-light text-neutral-900 tracking-tight">
                    {dom.bounceRate || "0%"}
                  </span>
                  <span className="text-xs font-light text-neutral-400">
                    Average bounce rate
                  </span>
                </div>
              </div>

              {/* Script Snippet Block */}
              <div className="flex flex-col gap-3 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-light text-neutral-400">
                    <span>Tracking script for site ID</span>
                    <span className="px-2 py-0.5 rounded-lg bg-neutral-100 font-mono text-[11px] text-neutral-700 tracking-wide select-all break-all">
                      {dom.siteId}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 self-start sm:self-auto">
                    {dom.status !== "Active" && (
                      <button
                        type="button"
                        onClick={() => handleVerify(dom.siteId)}
                        disabled={isVerifying}
                        className="flex items-center gap-1.5 text-xs font-light text-neutral-600 hover:text-neutral-900 cursor-pointer transition-colors"
                      >
                        <IconRefresh size={14} stroke={1.6} className={isVerifying ? "animate-spin" : ""} />
                        <span>{isVerifying ? "Verifying..." : "Verify installation"}</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleCopyScript(dom.siteId, dom.id)}
                      className="flex items-center gap-1.5 text-xs font-light text-neutral-600 hover:text-neutral-900 cursor-pointer transition-colors"
                    >
                      {isCopied ? (
                        <>
                          <IconCheck size={14} stroke={1.8} className="text-emerald-600" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <IconCopy size={14} stroke={1.6} />
                          <span>Copy script</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="bg-[#FAF8F5] p-3 sm:p-5 rounded-2xl overflow-x-auto max-w-full">
                  <code className="text-xs font-mono text-neutral-800 whitespace-nowrap">
                    {`<script defer src="https://triangle-analytics.vercel.app/tracker.js" data-site-id="${dom.siteId}"></script>`}
                  </code>
                </div>

                {verifyFeedback[dom.siteId] && (
                  <div
                    className={`p-4 rounded-2xl text-xs font-medium flex items-center justify-between gap-4 ${
                      verifyFeedback[dom.siteId].verified
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : "bg-amber-50 text-amber-900 border border-amber-200"
                    }`}
                  >
                    <span>{verifyFeedback[dom.siteId].message}</span>
                    {!verifyFeedback[dom.siteId].verified && (
                      <button
                        type="button"
                        onClick={() => handleVerify(dom.siteId)}
                        disabled={isVerifying}
                        className="font-semibold underline hover:no-underline cursor-pointer shrink-0"
                      >
                        {isVerifying ? "Checking..." : "Retry Verification"}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
