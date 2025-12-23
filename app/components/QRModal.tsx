"use client";

import { X, Copy, Download, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  shortCode: string;
  onClose: () => void;
};

export default function QRModal({ shortCode, onClose }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "";

  const qrPngUrl = `/api/qr?code=${shortCode}&format=png`;
  const qrSvgUrl = `/api/qr?code=${shortCode}&format=svg`;
  const shortUrl = `${baseUrl}/${shortCode}`;

  /** COPY SHORT LINK */
  const copyLink = async () => {
    await navigator.clipboard.writeText(shortUrl);
    alert("Link copied");
  };

  /** COPY QR IMAGE */
  const copyQrImage = async () => {
    const blob = await fetch(qrPngUrl).then((r) => r.blob());
    await navigator.clipboard.write([
      new ClipboardItem({ [blob.type]: blob }),
    ]);
    alert("QR image copied");
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-[400px] rounded-xl shadow-xl p-6 relative"
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>

        <h2 className="text-lg font-semibold text-center mb-4">
          QR Code
        </h2>

        {/* QR IMAGE */}
        <div className="flex justify-center">
          {loading && (
            <div className="w-64 h-64 bg-gray-100 animate-pulse rounded" />
          )}

          <img
            src={qrPngUrl}
            alt="QR Code"
            className={`w-64 h-64 border rounded ${
              loading ? "hidden" : "block"
            }`}
            onLoad={() => setLoading(false)}
            onError={() => {
              setError(true);
              setLoading(false);
            }}
          />
        </div>

        {error && (
          <p className="text-center text-red-500 text-sm mt-2">
            Failed to load QR
          </p>
        )}

        {/* URL */}
        <p className="text-xs text-center text-gray-500 mt-3 break-all">
          {shortUrl}
        </p>

        {/* ACTIONS */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button
            onClick={copyLink}
            className="flex items-center justify-center gap-2 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            <Copy size={16} /> Copy Link
          </button>

          <button
            onClick={copyQrImage}
            className="flex items-center justify-center gap-2 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
          >
            <Copy size={16} /> Copy QR
          </button>

          <a
            href={qrPngUrl}
            download={`qr-${shortCode}.png`}
            className="flex items-center justify-center gap-2 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            <Download size={16} /> PNG
          </a>

          <a
            href={qrSvgUrl}
            download={`qr-${shortCode}.svg`}
            className="flex items-center justify-center gap-2 py-2 rounded bg-gray-800 text-white hover:bg-gray-900"
          >
            <Download size={16} /> SVG
          </a>
        </div>

        {/* OPEN */}
        <a
          href={shortUrl}
          target="_blank"
          className="mt-4 flex items-center justify-center gap-2 py-2 border rounded hover:bg-gray-100"
        >
          <ExternalLink size={16} /> Open Link
        </a>
      </div>
    </div>
  );
}
