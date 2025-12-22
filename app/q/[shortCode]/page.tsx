type Props = {
  params: { shortCode: string };
};

export default function QRPage({ params }: Props) {
  const { shortCode } = params;
  const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${shortCode}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow w-[360px] text-center">
        <h1 className="font-bold text-xl mb-4">QR Code</h1>

        {/* QR IMAGE */}
        <img
          src={`/api/qr?code=${shortCode}`}
          alt="QR Code"
          className="w-[300px] h-[300px] mx-auto border rounded"
        />

        {/* SHORT LINK */}
        <p className="mt-4 text-sm text-gray-600 break-all">
          {shortUrl}
        </p>

        {/* ACTIONS */}
        <div className="flex gap-2 mt-4">
          <a
            href={`/api/qr?code=${shortCode}`}
            download={`qr-${shortCode}.png`}
            className="flex-1 bg-black text-white px-4 py-2 rounded"
          >
            Download QR
          </a>

          <a
            href={`/${shortCode}`}
            target="_blank"
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Open Link
          </a>
        </div>
      </div>
    </div>
  );
}
