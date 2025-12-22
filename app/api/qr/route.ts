import QRCode from "qrcode";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return new NextResponse("Missing code", { status: 400 });
  }

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`;

  const qr = await QRCode.toBuffer(url, {
    type: "png",
    width: 300,
    margin: 2,
  });

  return new NextResponse(qr, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-store",
    },
  });
}
