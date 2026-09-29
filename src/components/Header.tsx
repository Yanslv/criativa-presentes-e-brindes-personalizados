import type { WhatsappCtaData } from "@/lib/whatsapp";
import { WhatsappCta } from "./WhatsappCta";

type Props = {
  brandName: string;
  brandTagline: string;
  nav: { href: string; label: string }[];
  cta: WhatsappCtaData;
};

export function Header({ brandName, brandTagline, nav, cta }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-ivory/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 md:h-20">
        <a href="#inicio" className="flex flex-col leading-none" aria-label={`${brandName}, ${brandTagline}. Voltar ao início`}>
          <span className="font-display text-2xl font-semibold tracking-tight text-burgundy md:text-3xl">{brandName}</span>
          <span className="mt-1 text-[0.62rem] font-semibold tracking-[0.18em] text-gold-dark uppercase md:text-[0.68rem]">
            {brandTagline}
          </span>
        </a>

        <nav aria-label="Seções" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm font-medium text-ink/75">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-burgundy">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <WhatsappCta data={cta} />
        </div>
      </div>
    </header>
  );
}
