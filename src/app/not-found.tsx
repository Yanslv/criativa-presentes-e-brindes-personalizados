import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { WhatsappCta } from "@/components/WhatsappCta";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Página não encontrada | ${site.brandName}`,
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-ivory px-4 py-16 text-center">
      <div className="max-w-md">
        <p className="font-display text-6xl font-semibold text-burgundy">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-ink">Esta página não existe</h1>
        <p className="mt-3 leading-relaxed text-ink/70">
          Mas o seu presente personalizado pode começar agora. Fale com a {site.brandName} e conte a sua ideia.
        </p>
        <div className="mt-7 flex flex-col items-center gap-4">
          <WhatsappCta data={site.header.cta} size="lg" />
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 font-semibold text-burgundy hover:underline">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </main>
  );
}
