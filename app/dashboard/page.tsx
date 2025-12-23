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
import QRModal from "../components/QRModal";
import { useToast } from "../components/ToastProvider";

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

  const { showToast } = useToast(); // ✅ HOOK DI DALAM COMPONENT

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
    showToast("Link berhasil disalin", "success"); // ✅ TOAST
  };

  if (!data) return <p className="p-8">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* HEADER */}
      <header className="bg-white border-b">
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
        <div className="bg-white border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 text-sm text-gray-500">
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
                      className={`px-2 py-1 rounded-full text-xs ${
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
                        onClick={() => handleCopy(link.shortCode)}
                        className="p-2 hover:bg-blue-50 rounded"
                      >
                        <Copy size={16} />
                      </button>

                      <button
                        onClick={() => setQrLink(link)}
                        className="p-2 hover:bg-purple-50 rounded"
                      >
                        <QrCode size={16} />
                      </button>

                      <button
                        onClick={() =>
                          fetch(`/api/links/${link.id}`, {
                            method: "PATCH",
                          }).then(fetchData)
                        }
                        className="p-2 hover:bg-orange-50 rounded"
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
                        className="p-2 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
    <div className="bg-white border rounded-xl p-6 flex justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
}
