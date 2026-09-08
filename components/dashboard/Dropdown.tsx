"use client";

import { useState, useRef, useEffect } from "react";
import { IconChevronDown, IconChevronUp, IconCheck } from "@tabler/icons-react";

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  label?: string;
  options: DropdownOption[];
  selected: string;
  onChange: (value: string) => void;
  widthClass?: string;
  variant?: "white" | "neutral";
}

export default function Dropdown({
  label,
  options,
  selected,
  onChange,
  widthClass = "w-48",
  variant = "white",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((opt) => opt.value === selected)?.label || selected;
  const bgClass = variant === "white" ? "bg-white hover:bg-neutral-50" : "bg-neutral-100/80 hover:bg-neutral-100";

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${widthClass}`}>
      {label && (
        <span className="block text-xs font-normal text-neutral-400 mb-1.5">
          {label}
        </span>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-11 flex items-center justify-between ${bgClass} rounded-xl px-4 text-sm font-medium text-neutral-900 transition-colors cursor-pointer outline-none select-none`}
      >
        <span className="truncate">{selectedLabel}</span>
        {isOpen ? (
          <IconChevronUp size={16} stroke={1.5} className="text-neutral-500 shrink-0 ml-2" />
        ) : (
          <IconChevronDown size={16} stroke={1.5} className="text-neutral-500 shrink-0 ml-2" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 left-0 mt-2 bg-white rounded-xl py-1.5 z-30 overflow-hidden">
          {options.map((opt) => {
            const isSelected = opt.value === selected;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                  isSelected ? "bg-neutral-100 text-neutral-900" : "text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected && <IconCheck size={14} stroke={1.5} className="text-neutral-900 shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
