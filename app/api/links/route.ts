import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function generateShortCode(length = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

export async function POST(req: Request) {
  try {
    const { originalUrl } = await req.json();

    if (!originalUrl) {
      return NextResponse.json(
        { error: "originalUrl is required" },
        { status: 400 }
      );
    }

    const shortCode = generateShortCode();

    const link = await prisma.link.create({
      data: {
        originalUrl,
        shortCode,
      },
    });

    return NextResponse.json(link, { status: 201 });
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const links = await prisma.link.findMany({
      orderBy: { createdAt: "desc" },
    });

    const totalClicks = links.reduce((a, b) => a + b.clicks, 0);

    return NextResponse.json({
      totalLinks: links.length,
      totalClicks,
      links,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch links" },
      { status: 500 }
    );
  }
}