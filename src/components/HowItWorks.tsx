import type { WhatsappCtaData } from "@/lib/whatsapp";
import { WhatsappCta } from "./WhatsappCta";

type Props = {
  title: string;
  steps: { title: string; text: string }[];
  cta: WhatsappCtaData;
};

export function HowItWorks({ title, steps, cta }: Props) {
  return (
    <section id="como-funciona" aria-labelledby="how-title" className="scroll-mt-20 bg-ivory">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-24">
        <h2 id="how-title" data-reveal className="font-display text-3xl font-semibold text-ink sm:text-4xl md:text-center">
          {title}
        </h2>
        <ol data-reveal-group className="mt-8 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <li
              key={step.title}
              data-reveal-item
              className="relative flex gap-4 rounded-3xl bg-white p-5 shadow-sm shadow-ink/5 md:flex-col md:p-7"
            >
              <span
                aria-hidden="true"
                className="grid size-11 shrink-0 place-items-center rounded-full bg-burgundy font-display text-lg font-semibold text-ivory"
              >
                {index + 1}
              </span>
              <div>
                <h3 className="text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink/70">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-9 flex justify-center">
          <WhatsappCta data={cta} size="lg" className="w-full sm:w-auto" />
        </div>
      </div>
    </section>
  );
}
