import Image from "next/image";
import type { SiteImage } from "@/config/site";

type Props = {
  title: string;
  subtitle: string;
  images: SiteImage[];
};

export function ResultsGallery({ title, subtitle, images }: Props) {
  if (images.length === 0) return null;
  return (
    <section id="trabalhos" aria-labelledby="gallery-title" className="scroll-mt-20 bg-white/60">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-24">
        <h2 id="gallery-title" data-reveal className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          {title}
        </h2>
        <p data-reveal className="mt-3 max-w-2xl leading-relaxed text-ink/70">
          {subtitle}
        </p>
        <ul data-reveal-group className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5">
          {images.map((img) => (
            <li key={img.src} data-reveal-item className="overflow-hidden rounded-2xl bg-blush/30">
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                loading="lazy"
                sizes="(min-width: 768px) 24vw, 46vw"
                className="aspect-[3/4] w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
