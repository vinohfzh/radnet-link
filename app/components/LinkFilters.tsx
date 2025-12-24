"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, X } from "lucide-react";

type Link = {
  id: string;
  shortCode: string;
  originalUrl: string;
  clicks: number;
  isActive: boolean;
};

export default function LinkFilters({
  links,
  onChange,
}: {
  links: Link[];
  onChange: (filtered: Link[]) => void;
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "active" | "inactive">("all");
  const [sort, setSort] = useState<"newest" | "most" | "least">("newest");

  const isActive =
    search !== "" || status !== "all" || sort !== "newest";

  // ✅ PURE FILTER (boleh pakai useMemo)
  const filtered = useMemo(() => {
    let result = [...links];

    if (search) {
      result = result.filter(
        (l) =>
          l.shortCode.toLowerCase().includes(search.toLowerCase()) ||
          l.originalUrl.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== "all") {
      result = result.filter((l) =>
        status === "active" ? l.isActive : !l.isActive
      );
    }

    result.sort((a, b) => {
      if (sort === "most") return b.clicks - a.clicks;
      if (sort === "least") return a.clicks - b.clicks;
      return b.id.localeCompare(a.id); // newest
    });

    return result;
  }, [links, search, status, sort]);

  // ✅ SIDE EFFECT → useEffect
  useEffect(() => {
    onChange(filtered);
  }, [filtered, onChange]);

  return (
    <div className="bg-white border rounded-xl px-4 py-3 flex flex-col gap-3">
      {/* SEARCH */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input
          className="w-full pl-9 pr-4 h-10 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          placeholder="Search by short code or original URL..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* STATUS */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          {["all", "active", "inactive"].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s as any)}
              className={`px-3 py-1 rounded-md text-sm transition ${
                status === s
                  ? "bg-white shadow text-blue-700 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* SORT */}
        <select
          className="border rounded-lg px-3 py-2 text-sm"
          value={sort}
          onChange={(e) => setSort(e.target.value as any)}
        >
          <option value="newest">Newest</option>
          <option value="most">Most Clicked</option>
          <option value="least">Least Clicked</option>
        </select>

        {/* RESET */}
        {isActive && (
          <button
            onClick={() => {
              setSearch("");
              setStatus("all");
              setSort("newest");
            }}
            className="ml-auto flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800"
          >
            <X size={14} />
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
