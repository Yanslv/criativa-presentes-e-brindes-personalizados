import type { Offer } from "@/config/site";
import { OfferCard } from "./OfferCard";

type Props = {
  title: string;
  subtitle: string;
  offers: Offer[];
};

export function OfferGrid({ title, subtitle, offers }: Props) {
  return (
    <section id="ofertas" aria-labelledby="offers-title" className="scroll-mt-20 overflow-x-clip bg-blush/20">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-24">
        <div className="max-w-2xl">
          <h2 id="offers-title" data-reveal className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            {title}
          </h2>
          <p data-reveal className="mt-3 leading-relaxed text-ink/70">
            {subtitle}
          </p>
        </div>
        <div data-reveal-group data-reveal-side className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </div>
    </section>
  );
}
