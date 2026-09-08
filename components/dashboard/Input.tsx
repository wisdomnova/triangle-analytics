"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export default function Input({ label, icon, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <span className="text-xs font-normal text-neutral-400">
          {label}
        </span>
      )}
      <div className="relative flex items-center w-full">
        {icon && (
          <div className="absolute left-4 text-neutral-400 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          {...props}
          className={`w-full bg-neutral-100/70 hover:bg-neutral-100 focus:bg-white rounded-xl py-2.5 text-sm font-normal text-neutral-800 placeholder-neutral-400 transition-colors outline-none ${
            icon ? "pl-11 pr-4" : "px-4"
          } ${className}`}
        />
      </div>
    </div>
  );
}
