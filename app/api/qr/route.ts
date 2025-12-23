import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return new NextResponse("Missing code", { status: 400 });
  }

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`;

  const buffer = await QRCode.toBuffer(url, {
    type: "png",
    width: 300,
    margin: 2,
    errorCorrectionLevel: "H",
  });

  return new NextResponse(
    new Uint8Array(buffer),
    {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-store",
      },
    }
  );
}
