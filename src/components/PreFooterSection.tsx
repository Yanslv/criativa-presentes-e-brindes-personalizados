import Image from "next/image";
import type { SiteImage } from "@/config/site";
import type { WhatsappCtaData } from "@/lib/whatsapp";
import { WhatsappCta } from "./WhatsappCta";

type Props = {
  title: string;
  text: string;
  image: SiteImage;
  cta: WhatsappCtaData;
};

export function PreFooterSection({ title, text, image, cta }: Props) {
  return (
    <section aria-labelledby="prefooter-title" className="relative isolate overflow-hidden bg-ink">
      <Image
        src={image.src}
        alt=""
        width={image.width}
        height={image.height}
        loading="lazy"
        sizes="100vw"
        data-parallax="0.15"
        className="absolute inset-0 -z-20 h-full w-full scale-125 object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/80 via-burgundy-dark/75 to-ink/90" />
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 md:py-28">
        <h2 id="prefooter-title" data-reveal className="font-display text-3xl leading-tight font-semibold text-ivory sm:text-5xl">
          {title}
        </h2>
        <p data-reveal className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ivory/85">
          {text}
        </p>
        <div className="mt-8 flex justify-center">
          <WhatsappCta data={cta} variant="light" size="lg" className="w-full sm:w-auto" />
        </div>
      </div>
    </section>
  );
}
