"use client";

import { MessageCircle } from "lucide-react";
import type { WhatsappCtaData } from "@/lib/whatsapp";
import { trackContact } from "@/lib/tracking";

type Variant = "primary" | "light" | "outline" | "link";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-burgundy text-ivory hover:bg-burgundy-dark shadow-lg shadow-burgundy/20",
  light: "bg-ivory text-burgundy hover:bg-white shadow-lg shadow-ink/20",
  outline: "border-2 border-burgundy text-burgundy hover:bg-burgundy hover:text-ivory",
  link: "min-h-11! justify-start! px-0! font-normal! rounded-none! text-ivory/80 hover:text-ivory [&>svg]:text-gold",
};

const sizes: Record<Size, string> = {
  md: "min-h-12 px-5 text-[0.95rem]",
  lg: "min-h-14 px-7 text-base sm:text-lg",
};

type Props = {
  data: WhatsappCtaData;
  variant?: Variant;
  size?: Size;
  className?: string;
  fullWidth?: boolean;
};

export function WhatsappCta({ data, variant = "primary", size = "md", className = "", fullWidth = false }: Props) {
  return (
    <a
      href={data.href}
      target="_blank"
      rel="noopener noreferrer"
      data-cta={data.cta}
      onClick={() => trackContact(data.cta)}
      className={`inline-flex items-center justify-center gap-2.5 rounded-full font-semibold transition-colors duration-200 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-gold ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      <MessageCircle aria-hidden="true" className="size-5 shrink-0" strokeWidth={2.2} />
      <span>{data.label}</span>
    </a>
  );
}
