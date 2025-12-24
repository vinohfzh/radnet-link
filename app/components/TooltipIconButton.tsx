"use client";

import React from "react";

export default function TooltipIconButton({
  icon,
  label,
  onClick,
  danger = false,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  danger?: boolean;
}) {
  return (
    <div className="relative group">
      <button
        onClick={onClick}
        className={`w-8 h-8 flex items-center justify-center rounded-md
          transition
          ${
            danger
              ? "text-gray-400 hover:text-red-600 hover:bg-red-50"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          }`}
      >
        {icon}
      </button>

      {/* Tooltip */}
      <div
        className="absolute -top-9 left-1/2 -translate-x-1/2
                   whitespace-nowrap rounded-md bg-gray-900 px-2 py-1
                   text-xs text-white opacity-0 group-hover:opacity-100
                   transition pointer-events-none"
      >
        {label}
      </div>
    </div>
  );
}
