# Radnet Link — Project Snapshot

## Deskripsi
URL shortener dengan dashboard admin, QR code, dan analytics (in progress).
Project magang + MVP SaaS.

## Tech Stack
- Next.js App Router
- Prisma v6
- Supabase PostgreSQL
- Tailwind CSS
- QR Code API
- Vercel-ready

## Fitur Selesai
- Short URL
- Redirect + click counter
- Enable / disable link
- Delete link
- Copy short link
- QR Code per link (modal popup)
- Dashboard admin UI

## Endpoint Penting
- POST /api/links
- GET /api/links
- PATCH /api/links/[id]
- DELETE /api/links/[id]
- GET /api/qr?code=XXXX
- GET /[shortCode]

## Folder Penting
- app/api/links
- app/api/qr
- app/[shortCode]
- app/dashboard
- app/q/[shortCode]
- lib/prisma.ts

## Catatan Teknis
- QR Code dirender via <img src="/api/qr?code=...">
- Redirect handler pakai route.ts
- Prisma schema tanpa datasource.url (pakai prisma.config.ts)
