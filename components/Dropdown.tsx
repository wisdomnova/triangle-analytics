"use client";

import { useState, useRef, useEffect } from "react";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  selected: string;
  onChange: (value: string) => void;
  widthClass?: string;
}

export default function Dropdown({
  label,
  options,
  selected,
  onChange,
  widthClass = "w-56",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const selectedLabel = options.find((opt) => opt.value === selected)?.label || selected;

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${widthClass} shrink-0`}>
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1">
          {label}
        </span>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full bg-white border border-neutral-300 rounded-xl px-5 py-3.5 text-base font-semibold text-[#1E1E1C] cursor-pointer hover:bg-neutral-50 transition-colors focus:outline-none focus:border-[#1E1E1C]"
        >
          <span>{selectedLabel}</span>
          <span className="material-symbols-outlined text-[18px] text-neutral-400">
            {isOpen ? "expand_less" : "expand_more"}
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 left-0 mt-2 bg-white border border-neutral-300 rounded-xl overflow-hidden z-20 flex flex-col shadow-lg">
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
                className={`w-full flex items-center justify-between px-5 py-3.5 text-base font-medium hover:bg-neutral-50 transition-colors cursor-pointer ${
                  isSelected ? "text-[#1E1E1C] bg-[#FAF8F5] font-semibold" : "text-[#3A3935]"
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <span className="material-symbols-outlined text-[16px] text-[#1E1E1C]">
                    check
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
