"use client";

import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";

interface EmptyDomainStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

export default function EmptyDomainState({
  title = "No domain properties connected",
  description = "Connect your domain to start tracking privacy-friendly, lightweight web analytics in real-time.",
  actionText = "Add new domain",
  onAction,
}: EmptyDomainStateProps) {
  return (
    <div className="w-full bg-white border border-[#EAE5D9] rounded-[32px] p-8 sm:p-12 flex flex-col items-center justify-center text-center gap-6 my-auto min-h-[420px]">
      <div className="w-48 sm:w-64 max-w-full flex items-center justify-center">
        <img
          src="/empty-state.png"
          alt="No domains connected"
          className="w-full h-auto object-contain opacity-90"
        />
      </div>

      <div className="flex flex-col gap-2 max-w-md">
        <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-neutral-900">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
          {description}
        </p>
      </div>

      <div className="pt-2">
        {onAction ? (
          <button
            type="button"
            onClick={onAction}
            className="flex items-center gap-2 bg-[#0B63E5] hover:bg-[#0952C3] text-white text-xs font-semibold px-6 py-3.5 rounded-full transition-all cursor-pointer shadow-sm"
          >
            <IconPlus size={16} stroke={2} />
            <span>{actionText}</span>
          </button>
        ) : (
          <Link
            href="/domains"
            className="flex items-center gap-2 bg-[#0B63E5] hover:bg-[#0952C3] text-white text-xs font-semibold px-6 py-3.5 rounded-full transition-all cursor-pointer shadow-sm"
          >
            <IconPlus size={16} stroke={2} />
            <span>{actionText}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
