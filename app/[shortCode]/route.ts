import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  const { shortCode } = await params;

  const link = await prisma.link.findUnique({
    where: { shortCode },
  });

  if (!link || !link.isActive) {
    return NextResponse.json(
      { error: "Link not found" },
      { status: 404 }
    );
  }

  await prisma.link.update({
    where: { shortCode },
    data: { clicks: { increment: 1 } },
  });

  return NextResponse.redirect(link.originalUrl);
}
