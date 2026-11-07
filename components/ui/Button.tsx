import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

const VARIANT_CLASSES = {
  primary:
    "bg-neutral-900 text-white hover:bg-neutral-800 border border-transparent",
  secondary:
    "border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50",
  danger: "border border-red-200 bg-white text-red-700 hover:bg-red-50"
} as const;

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  variant?: keyof typeof VARIANT_CLASSES;
};

export function Button({
  children,
  className = "",
  variant = "secondary",
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`rounded-lg px-3.5 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-45 ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
