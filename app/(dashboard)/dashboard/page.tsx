"use client"

import type React from "react"

import { useState } from "react"
import { Link2, TrendingUp, Copy, Power, Trash2, QrCode, ExternalLink } from "lucide-react"

type Link = {
  id: string
  shortCode: string
  originalUrl: string
  clicks: number
  isActive: boolean
}

export default function DashboardPage() {
  const [data] = useState({
    totalLinks: 2,
    totalClicks: 7,
    links: [
      {
        id: "1",
        shortCode: "TZ2ZYs",
        originalUrl: "https://supabase.com/docs/guides/platform/ipv4-address",
        clicks: 4,
        isActive: true,
      },
      {
        id: "2",
        shortCode: "WtNwUJ",
        originalUrl: "https://radnet-digital.id",
        clicks: 3,
        isActive: true,
      },
    ],
  })

  const [hoveredQR, setHoveredQR] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const handleCopy = (shortCode: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/${shortCode}`)
  }

  const filteredLinks = data.links.filter(
    (link) =>
      link.shortCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <header className="sticky top-0 z-30 border-b border-slate-200/40 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/40 transition-shadow duration-300">
            <Link2 className="text-white w-5 h-5" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Radnet Link
            </h1>
            <p className="text-xs text-slate-500 font-medium">URL Shortener & Analytics Dashboard</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-slate-900">JAnGan SenTUh SenTuh Aku~~~~~</h2>
            <p className="text-slate-500 text-sm mt-1">Buat linkmu menjadi singkat dan domain sendiri</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Total Links"
              value={data.totalLinks}
              color="primary"
              icon={<Link2 className="w-5 h-5" />}
            />
            <MetricCard
              title="Total Clicks"
              value={data.totalClicks}
              color="secondary"
              icon={<TrendingUp className="w-5 h-5" />}
            />
            <MetricCard
              title="Active Links"
              value={data.links.filter((l) => l.isActive).length}
              color="accent"
              icon={<Power className="w-5 h-5" />}
            />
            <MetricCard
              title="Avg. Clicks"
              value={Math.round(data.totalClicks / data.totalLinks)}
              color="teal"
              icon={<TrendingUp className="w-5 h-5" />}
            />
          </div>
        </div>

        <div className="mb-8 flex gap-3 items-center">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search short code or URL..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200/80 bg-white/50 backdrop-blur-sm text-sm font-medium placeholder:text-slate-400 focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all duration-200 hover:border-slate-300 hover:bg-white"
            />
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200/60">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider w-36 letter-spacing">
                  Short Link
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Original URL
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider w-24">
                  Clicks
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider w-28">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider w-48">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100/60">
              {filteredLinks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-slate-100/80 to-slate-200/60 rounded-3xl flex items-center justify-center mb-4 shadow-inner">
                        <Link2 className="w-12 h-12 text-slate-350" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">No links found</h3>
                      <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
                        {searchTerm
                          ? "Try adjusting your search criteria"
                          : "Create your first short link to get started"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLinks.map((link) => (
                  <tr
                    key={link.id}
                    className="group hover:bg-gradient-to-r hover:from-cyan-50/30 hover:to-blue-50/20 transition-colors duration-200 cursor-pointer border-b border-slate-100/30 last:border-b-0"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <code className="font-mono text-sm font-bold text-cyan-600 bg-cyan-50/60 px-3 py-2 rounded-lg border border-cyan-200/40 group-hover:bg-cyan-100/50 group-hover:border-cyan-300/60 group-hover:shadow-sm transition-all duration-200">
                          {link.shortCode}
                        </code>
                        <a
                          href={`/${link.shortCode}`}
                          target="_blank"
                          className="text-slate-300 hover:text-cyan-600 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                          rel="noreferrer"
                        >
                          <ExternalLink size={16} strokeWidth={2} />
                        </a>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div
                        className="text-sm text-slate-700 truncate max-w-md font-medium group-hover:text-slate-900 transition-colors duration-200"
                        title={link.originalUrl}
                      >
                        {link.originalUrl}
                      </div>
                    </td>

                    <td className="px-6 py-5 text-center">
                      <span
                        className={`inline-block text-sm font-bold px-3 py-2 rounded-lg border transition-all duration-200 ${
                          link.clicks >= 5
                            ? "text-cyan-700 bg-cyan-50/80 border-cyan-200/60 group-hover:bg-cyan-100 group-hover:border-cyan-300/80"
                            : link.clicks >= 3
                              ? "text-slate-700 bg-slate-100/60 border-slate-200/60 group-hover:bg-slate-150 group-hover:border-slate-300/80"
                              : "text-slate-600 bg-slate-50/60 border-slate-100/60 group-hover:bg-slate-100/80 group-hover:border-slate-200/80"
                        }`}
                      >
                        {link.clicks}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-center">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                            link.isActive
                              ? "bg-cyan-50/80 text-cyan-700 border border-cyan-200/60 group-hover:bg-cyan-100 group-hover:border-cyan-300/80"
                              : "bg-slate-100/60 text-slate-600 border border-slate-200/60 group-hover:bg-slate-150 group-hover:border-slate-300/80"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${
                              link.isActive ? "bg-cyan-500 shadow-sm shadow-cyan-500/50" : "bg-slate-400"
                            }`}
                          />
                          {link.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-2">
                        <IconBtn title="Copy short link" onClick={() => handleCopy(link.shortCode)}>
                          <Copy size={16} />
                        </IconBtn>

                        <div
                          className="relative"
                          onMouseEnter={() => setHoveredQR(link.id)}
                          onMouseLeave={() => setHoveredQR(null)}
                        >
                          <IconBtn title="View QR code">
                            <QrCode size={16} />
                          </IconBtn>

                          {hoveredQR === link.id && (
                            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                              <div className="relative bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 w-80 backdrop-blur-sm overflow-hidden">
                                <div className="relative">
                                  <div className="flex gap-4 mb-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg relative overflow-hidden">
                                      <div className="absolute inset-0 bg-white opacity-90"></div>
                                      <QrCode size={32} className="text-cyan-600 relative z-10" />
                                    </div>
                                    <div className="min-w-0">
                                      <code className="text-xs font-mono font-bold text-cyan-600 block mb-2 bg-cyan-50/80 px-2 py-1.5 rounded-lg border border-cyan-200/40">
                                        /{link.shortCode}
                                      </code>
                                      <div className="text-xs text-slate-600 truncate leading-relaxed font-medium">
                                        {link.originalUrl}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center pt-4 border-t border-slate-100/80">
                                    <div className="flex items-center gap-2">
                                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                                      <span className="text-sm font-bold text-slate-900">{link.clicks} clicks</span>
                                    </div>
                                    <span
                                      className={`text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm border transition-all ${
                                        link.isActive
                                          ? "bg-cyan-50/80 text-cyan-700 border-cyan-200/60"
                                          : "bg-slate-100/60 text-slate-600 border-slate-200/60"
                                      }`}
                                    >
                                      {link.isActive ? "Active" : "Inactive"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <IconBtn title="Toggle active status">
                          <Power size={16} />
                        </IconBtn>

                        <div className="h-5 w-px bg-slate-200/60 mx-1.5 group-hover:bg-slate-300/60 transition-colors duration-200" />

                        <IconBtn title="Delete link" danger>
                          <Trash2 size={16} />
                        </IconBtn>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

/* ===================== */
/* REUSABLE COMPONENTS */
/* ===================== */

function MetricCard({
  title,
  value,
  color,
  icon,
}: {
  title: string
  value: number
  color: "primary" | "secondary" | "accent" | "teal"
  icon: React.ReactNode
}) {
  const colorMap = {
    primary: {
      bg: "bg-gradient-to-br from-cyan-50/80 to-blue-50/40 border-cyan-200/50 hover:border-cyan-300/60 hover:shadow-lg hover:shadow-cyan-500/10",
      icon: "text-cyan-600 group-hover:text-cyan-700",
      number: "text-cyan-600",
    },
    secondary: {
      bg: "bg-gradient-to-br from-blue-50/80 to-cyan-50/40 border-blue-200/50 hover:border-blue-300/60 hover:shadow-lg hover:shadow-blue-500/10",
      icon: "text-blue-600 group-hover:text-blue-700",
      number: "text-blue-600",
    },
    accent: {
      bg: "bg-gradient-to-br from-purple-50/80 to-pink-50/40 border-purple-200/50 hover:border-purple-300/60 hover:shadow-lg hover:shadow-purple-500/10",
      icon: "text-purple-600 group-hover:text-purple-700",
      number: "text-purple-600",
    },
    teal: {
      bg: "bg-gradient-to-br from-teal-50/80 to-cyan-50/40 border-teal-200/50 hover:border-teal-300/60 hover:shadow-lg hover:shadow-teal-500/10",
      icon: "text-teal-600 group-hover:text-teal-700",
      number: "text-teal-600",
    },
  }

  const colors = colorMap[color]

  return (
    <div
      className={`group border rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 cursor-default hover:-translate-y-1 bg-white/60 backdrop-blur-sm ${colors.bg}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">{title}</p>
          <p className={`text-4xl font-bold tracking-tight ${colors.number}`}>{value}</p>
        </div>
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 bg-white/60 group-hover:bg-white shadow-sm ${colors.icon}`}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}

function IconBtn({
  children,
  title,
  danger,
  onClick,
}: {
  children: React.ReactNode
  title: string
  danger?: boolean
  onClick?: () => void
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={`group/btn p-2.5 rounded-lg transition-all duration-150 relative ${
        danger
          ? "text-slate-400 hover:text-red-600 hover:bg-red-50/80 hover:border hover:border-red-200/60 hover:scale-110 hover:shadow-md"
          : title === "Copy short link"
            ? "text-slate-400 hover:text-cyan-600 hover:bg-cyan-50/80 hover:border hover:border-cyan-200/60 hover:scale-110 hover:shadow-md"
            : title === "View QR code"
              ? "text-slate-400 hover:text-purple-600 hover:bg-purple-50/80 hover:border hover:border-purple-200/60 hover:scale-110 hover:shadow-md"
              : "text-slate-400 hover:text-teal-600 hover:bg-teal-50/80 hover:border hover:border-teal-200/60 hover:scale-110 hover:shadow-md"
      }`}
    >
      {children}
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900/90 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover/btn:opacity-100 pointer-events-none transition-opacity duration-150 shadow-lg">
        {title}
      </span>
    </button>
  )
}
