"use client";

type ToastProps = {
  message: string;
  type: "success" | "error" | "info" | "warning";
};

const COLORS = {
  success: "bg-green-600",
  error: "bg-red-600",
  info: "bg-blue-600",
  warning: "bg-yellow-500 text-black",
};

export default function Toast({ message, type }: ToastProps) {
  return (
    <div
      className={`${COLORS[type]} text-white px-4 py-3 rounded-lg shadow-lg min-w-[260px] animate-slide-in`}
    >
      {message}
    </div>
  );
}
