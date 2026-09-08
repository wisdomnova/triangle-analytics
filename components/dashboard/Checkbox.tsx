"use client";

import { IconCheck } from "@tabler/icons-react";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export default function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer select-none">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
          checked ? "bg-neutral-900 text-white" : "bg-neutral-200/80 hover:bg-neutral-300"
        }`}
      >
        {checked && <IconCheck size={12} stroke={2} />}
      </button>
      {label && <span className="text-sm font-normal text-neutral-600">{label}</span>}
    </label>
  );
}
