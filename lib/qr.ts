import QRCode from "qrcode";

export async function generateQRCode(url: string) {
  return QRCode.toDataURL(url, {
    errorCorrectionLevel: "H",
    type: "image/png",
    margin: 2,
    width: 300,
  });
}

export async function generateQRCodeSVG(url: string) {
  return QRCode.toString(url, {
    type: "svg",
    errorCorrectionLevel: "H",
  });
}
