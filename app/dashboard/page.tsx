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
  X,
} from "lucide-react";

type Link = {
  id: string;
  shortCode: string;
  originalUrl: string;
  clicks: number;
  isActive: boolean;
};

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [qrLink, setQrLink] = useState<Link | null>(null);

  const fetchData = () => {
    fetch("/api/links")
      .then((res) => res.json())
      .then(setData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCopy = (shortCode: string, id: string) => {
    navigator.clipboard.writeText(
      `${window.location.origin}/${shortCode}`
    );
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  if (!data) return <p className="p-8">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Link2 className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Radnet Link</h1>
            <p className="text-sm text-gray-500">
              URL Shortener Dashboard
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard
            title="Total Links"
            value={data.totalLinks}
            icon={<Link2 className="text-blue-600" />}
          />
          <StatCard
            title="Total Clicks"
            value={data.totalClicks}
            icon={<TrendingUp className="text-green-600" />}
          />
        </div>

        {/* TABLE */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="px-6 py-3 text-left">Short</th>
                <th className="px-6 py-3 text-left">Original</th>
                <th className="px-6 py-3 text-center">Clicks</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.links.map((link: Link) => (
                <tr key={link.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <code className="bg-blue-50 text-blue-600 px-2 py-1 rounded font-mono">
                        {link.shortCode}
                      </code>
                      <a
                        href={`/${link.shortCode}`}
                        target="_blank"
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </td>

                  <td className="px-6 py-4 truncate max-w-xs">
                    {link.originalUrl}
                  </td>

                  <td className="px-6 py-4 text-center font-medium">
                    {link.clicks}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        link.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {link.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() =>
                          handleCopy(link.shortCode, link.id)
                        }
                        className="p-2 rounded-lg hover:bg-blue-50 text-gray-500 hover:text-blue-600"
                      >
                        <Copy size={16} />
                      </button>

                      <button
                        onClick={() => setQrLink(link)}
                        className="p-2 rounded-lg hover:bg-purple-50 text-gray-500 hover:text-purple-600"
                      >
                        <QrCode size={16} />
                      </button>

                      <button
                        onClick={() =>
                          fetch(`/api/links/${link.id}`, {
                            method: "PATCH",
                          }).then(fetchData)
                        }
                        className="p-2 rounded-lg hover:bg-orange-50 text-gray-500 hover:text-orange-600"
                      >
                        <Power size={16} />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm("Delete this link?")) {
                            fetch(`/api/links/${link.id}`, {
                              method: "DELETE",
                            }).then(fetchData);
                          }
                        }}
                        className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {copiedId === link.id && (
                      <p className="text-xs text-green-600 text-center mt-1">
                        Copied!
                      </p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* QR MODAL */}
      {qrLink && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-[360px] p-6 relative animate-fadeIn">
            <button
              onClick={() => setQrLink(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>

            <h3 className="font-semibold text-center mb-4">
              QR Code
            </h3>

            <img
              className="mx-auto"
              src={`/api/qr?code=${qrLink.shortCode}`}
              alt="QR Code"
            />

            <p className="text-center text-sm text-gray-600 mt-4 break-all">
              {window.location.origin}/{qrLink.shortCode}
            </p>

            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  `${window.location.origin}/${qrLink.shortCode}`
                )
              }
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Copy Link
            </button>
          </div>
        </div>
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
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
      </div>
      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
}
