import { ChevronDown } from "lucide-react";
import type { WhatsappCtaData } from "@/lib/whatsapp";
import { WhatsappCta } from "./WhatsappCta";

type Props = {
  title: string;
  items: { question: string; answer: string }[];
  cta: WhatsappCtaData;
};

// <details>/<summary> nativos: acessível por teclado e leitor de tela, sem JavaScript.
export function FaqAccordion({ title, items, cta }: Props) {
  return (
    <section id="duvidas" aria-labelledby="faq-title" className="scroll-mt-20 bg-ivory">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-24">
        <h2 id="faq-title" data-reveal className="font-display text-3xl font-semibold text-ink sm:text-4xl md:text-center">
          {title}
        </h2>
        <div data-reveal className="mt-8 divide-y divide-ink/10 rounded-3xl border border-ink/10 bg-white">
          {items.map((item) => (
            <details key={item.question} className="group px-5 sm:px-7">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown
                  aria-hidden="true"
                  className="size-5 shrink-0 text-burgundy transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                />
              </summary>
              <p className="pb-5 leading-relaxed text-ink/75">{item.answer}</p>
            </details>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <WhatsappCta data={cta} variant="outline" size="lg" className="w-full sm:w-auto" />
        </div>
      </div>
    </section>
  );
}
