"use client";

import { Link2 } from "lucide-react";

export default function EmptyState({
  title = "No links found",
  description = "Try adjusting your search or create a new short link.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Link2 className="w-7 h-7 text-gray-400" />
      </div>

      <h3 className="text-sm font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-1 text-sm text-gray-500 max-w-sm">
        {description}
      </p>
    </div>
  );
}
