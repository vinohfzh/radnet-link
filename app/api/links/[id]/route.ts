import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const link = await prisma.link.findUnique({
      where: { id: params.id },
    });

    if (!link) {
      return NextResponse.json(
        { error: "Link not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.link.update({
      where: { id: params.id },
      data: { isActive: !link.isActive },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Failed to toggle link" },
      { status: 500 }
    );
  }
}
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.link.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete link" },
      { status: 500 }
    );
  }
}
