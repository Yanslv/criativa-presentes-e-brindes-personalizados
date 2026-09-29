import { Heart } from "lucide-react";

type Props = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  highlights: string[];
};

export function AboutSection({ eyebrow, title, paragraphs, highlights }: Props) {
  return (
    <section aria-labelledby="about-title" className="overflow-x-clip bg-leaf text-ivory">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-14 md:py-20">
        <div>
          <p data-reveal className="text-xs font-semibold tracking-[0.16em] text-gold uppercase sm:text-sm">
            {eyebrow}
          </p>
          <h2 id="about-title" data-reveal className="mt-2 font-display text-3xl leading-tight font-semibold sm:text-4xl">
            {title}
          </h2>
          {paragraphs.map((p) => (
            <p key={p} data-reveal className="mt-4 leading-relaxed text-ivory/85">
              {p}
            </p>
          ))}
        </div>
        <ul data-reveal-group data-reveal-side className="grid gap-3">
          {highlights.map((h) => (
            <li
              key={h}
              data-reveal-item
              className="flex items-center gap-3 rounded-2xl border border-ivory/15 bg-ivory/5 px-5 py-4 font-display text-xl"
            >
              <Heart aria-hidden="true" className="size-5 shrink-0 fill-blush/70 text-blush" />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
