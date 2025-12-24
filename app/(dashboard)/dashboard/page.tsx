"use client";

import { useEffect, useState } from "react";
import {
  Link2,
  TrendingUp,
  Copy,
  Power,
  Trash2,
  QrCode,
  ExternalLink,
} from "lucide-react";

import QRModal from "../../components/QRModal";
import { useToast } from "../../components/ToastProvider";
import LinkFilters from "../../components/LinkFilters";
import TooltipIconButton from "../../components/TooltipIconButton";
import EmptyState from "../../components/EmptyState";

type Link = {
  id: string;
  shortCode: string;
  originalUrl: string;
  clicks: number;
  isActive: boolean;
};

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [qrLink, setQrLink] = useState<Link | null>(null);
  const [filteredLinks, setFilteredLinks] = useState<Link[]>([]);

  const { showToast } = useToast();

  const fetchData = () => {
    fetch("/api/links")
      .then((res) => res.json())
      .then(setData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCopy = (shortCode: string) => {
    navigator.clipboard.writeText(
      `${window.location.origin}/${shortCode}`
    );
    showToast("Link berhasil disalin", "success");
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  const linksToShow =
    filteredLinks.length > 0 ? filteredLinks : data.links;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
              <Link2 className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Radnet Link
              </h1>
              <p className="text-xs text-gray-500">
                URL Shortener Dashboard
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <StatCard
            title="Total Links"
            value={data.totalLinks}
            icon={<Link2 className="w-5 h-5 text-blue-600" />}
          />
          <StatCard
            title="Total Clicks"
            value={data.totalClicks}
            icon={<TrendingUp className="w-5 h-5 text-green-600" />}
          />
        </div>

        {/* SEARCH + FILTER */}
        <div className="mb-6">
          <LinkFilters links={data.links} onChange={setFilteredLinks} />
        </div>

        {/* TABLE */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[140px]">
                    Short
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Original URL
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px]">
                    Clicks
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[120px]">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[200px]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {linksToShow.length > 0 ? (
                  linksToShow.map((link: Link) => (
                    <tr
                      key={link.id}
                      className="group hover:bg-gray-50 transition-colors duration-150"
                    >
                      {/* SHORT CODE */}
                      <td className="px-6 py-4">
  <div className="flex items-center gap-2">
    <code className="inline-flex items-center font-mono text-sm font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
      {link.shortCode}
    </code>

    <a
      href={`/${link.shortCode}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100"
      title="Open link"
    >
      <ExternalLink size={14} />
    </a>
  </div>
</td>


                      {/* ORIGINAL URL */}
                      <td className="px-6 py-4">
                        <div
                          className="text-sm text-gray-600 truncate max-w-md"
                          title={link.originalUrl}
                        >
                          {link.originalUrl}
                        </div>
                      </td>

                      {/* CLICKS */}
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center text-sm font-semibold text-gray-900 tabular-nums">
                          {link.clicks.toLocaleString()}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                              link.isActive
                                ? "bg-green-50 text-green-700 border border-green-200"
                                : "bg-gray-100 text-gray-600 border border-gray-200"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                link.isActive
                                  ? "bg-green-500"
                                  : "bg-gray-400"
                              }`}
                            />
                            {link.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-1">
                          <TooltipIconButton
                            label="Copy link"
                            icon={<Copy size={16} />}
                            onClick={() => handleCopy(link.shortCode)}
                          />

                          <TooltipIconButton
                            label="Show QR Code"
                            icon={<QrCode size={16} />}
                            onClick={() => setQrLink(link)}
                          />

                          <TooltipIconButton
                            label={
                              link.isActive
                                ? "Deactivate"
                                : "Activate"
                            }
                            icon={<Power size={16} />}
                            onClick={() =>
                              fetch(`/api/links/${link.id}`, {
                                method: "PATCH",
                              }).then(fetchData)
                            }
                          />

                          <div className="h-5 w-px bg-gray-200 mx-1.5" />

                          <TooltipIconButton
                            label="Delete"
                            icon={<Trash2 size={16} />}
                            danger
                            onClick={() => {
                              if (confirm("Delete this link?")) {
                                fetch(`/api/links/${link.id}`, {
                                  method: "DELETE",
                                }).then(fetchData);
                              }
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-16">
                      <EmptyState
                        title="No links found"
                        description="Try adjusting your search or filters."
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* QR MODAL */}
      {qrLink && (
        <QRModal
          shortCode={qrLink.shortCode}
          onClose={() => setQrLink(null)}
        />
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-1">
            {title}
          </p>
          <p className="text-3xl font-semibold text-gray-900 tabular-nums">
            {value.toLocaleString()}
          </p>
        </div>
        <div className="flex-shrink-0 w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
}