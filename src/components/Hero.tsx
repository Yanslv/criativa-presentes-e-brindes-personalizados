import Image from "next/image";
import type { SiteImage } from "@/config/site";
import type { WhatsappCtaData } from "@/lib/whatsapp";
import { WhatsappCta } from "./WhatsappCta";

type Props = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  note: string;
  cta: WhatsappCtaData;
  image: SiteImage;
};

// Sem animação de entrada: o CTA precisa estar visível assim que a página abre.
export function Hero({ eyebrow, headline, subheadline, note, cta, image }: Props) {
  return (
    <section id="inicio" className="relative overflow-hidden bg-ivory">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 size-[28rem] rounded-full bg-blush/40 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 pt-7 pb-10 sm:px-6 md:grid-cols-[1.05fr_1fr] md:gap-12 md:pt-14 md:pb-20">
        <div>
          <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-leaf uppercase sm:text-sm">{eyebrow}</p>
          <h1 className="font-display text-[2.15rem] leading-[1.08] font-semibold text-ink sm:text-5xl lg:text-6xl">
            {headline}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/75 sm:text-lg">{subheadline}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <WhatsappCta data={cta} size="lg" className="w-full sm:w-auto" />
          </div>
          <p className="mt-3 text-sm text-ink/60">{note}</p>
        </div>

        <div className="relative mx-auto w-full max-w-md md:max-w-none">
          <div aria-hidden="true" className="absolute -inset-3 rotate-2 rounded-[2rem] bg-blush/50" />
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            priority
            fetchPriority="high"
            sizes="(min-width: 768px) 45vw, 92vw"
            className="relative aspect-square w-full rounded-[1.75rem] object-cover shadow-2xl shadow-burgundy/15"
          />
        </div>
      </div>
    </section>
  );
}
