import { Camera } from "lucide-react";
import type { WhatsappCtaData } from "@/lib/whatsapp";
import { WhatsappCta } from "./WhatsappCta";

type Props = {
  brandName: string;
  businessName: string;
  text: string;
  instagram: string;
  phoneCta: WhatsappCtaData;
  cta: WhatsappCtaData;
};

export function Footer({ brandName, businessName, text, instagram, phoneCta, cta }: Props) {
  const handle = `@${instagram.replace(/\/+$/, "").split("/").pop()}`;
  return (
    <footer className="bg-ink text-ivory/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr] md:items-start">
        <div>
          <p className="font-display text-3xl font-semibold text-ivory">{brandName}</p>
          <p className="mt-3 max-w-md leading-relaxed">{text}</p>
          <div className="mt-6">
            <WhatsappCta data={cta} variant="light" />
          </div>
        </div>
        <ul className="space-y-3 text-sm">
          <li>
            <WhatsappCta data={phoneCta} variant="link" />
          </li>
          <li>
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-3 hover:text-ivory"
            >
              <Camera aria-hidden="true" className="size-5 text-gold" />
              Instagram {handle}
            </a>
          </li>
        </ul>
      </div>
      <div className="border-t border-ivory/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-ivory/55 sm:px-6">
          © {new Date().getFullYear()} {businessName}
        </p>
      </div>
    </footer>
  );
}
