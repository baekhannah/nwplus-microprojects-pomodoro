import * as React from "react";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

type ButtonSize = "default" | "sm" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const baseClasses =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all " +
  "disabled:pointer-events-none disabled:opacity-50 " +
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 " +
  "outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const variantClasses: Record<ButtonVariant, string> = {
  // ✅ Default: your green background
  default: "bg-[#BBFFD4] text-[#2d5f4c] hover:bg-[#a8e6c1]",

  destructive:
    "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/40",

  outline:
    "border-2 border-[#277645] bg-[#BBFFD4] text-[#2d5f4c] hover:bg-[#a8e6c1]",

  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80",

  ghost:
    "hover:bg-[#a8e6c1] hover:text-[#2d5f4c]",

  link:
    "text-[#277645] underline-offset-4 hover:underline",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-9 px-6",
  sm: "h-8 px-4",
  lg: "h-10 px-8",
  icon: "h-9 w-9 p-0",
};

export function Button({
  className = "",
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(" ")}
      {...props}
    />
  );
}
