import Image from "next/image";
import { Check } from "lucide-react";
import type { SiteImage } from "@/config/site";
import type { WhatsappCtaData } from "@/lib/whatsapp";
import { WhatsappCta } from "./WhatsappCta";

type Props = {
  eyebrow: string;
  title: string;
  text: string;
  bullets: string[];
  image: SiteImage;
  cta: WhatsappCtaData;
};

export function FeaturedOffer({ eyebrow, title, text, bullets, image, cta }: Props) {
  return (
    <section aria-labelledby="featured-title" className="bg-ivory">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 sm:px-6 md:grid-cols-2 md:gap-14 md:py-24">
        <div className="relative order-2 overflow-hidden rounded-[1.75rem] md:order-1">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
            sizes="(min-width: 768px) 45vw, 92vw"
            data-parallax="0.08"
            className="aspect-[5/4] w-full scale-110 object-cover object-[center_65%] md:aspect-[4/5]"
          />
        </div>

        <div className="order-1 md:order-2">
          <p data-reveal className="text-xs font-semibold tracking-[0.16em] text-leaf uppercase sm:text-sm">
            {eyebrow}
          </p>
          <h2 id="featured-title" data-reveal className="mt-2 font-display text-3xl leading-tight font-semibold text-ink sm:text-4xl">
            {title}
          </h2>
          <p data-reveal className="mt-4 leading-relaxed text-ink/75">
            {text}
          </p>
          <ul data-reveal className="mt-5 space-y-2.5">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-ink/85">
                <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold-dark" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <div className="mt-7">
            <WhatsappCta data={cta} size="lg" className="w-full sm:w-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
