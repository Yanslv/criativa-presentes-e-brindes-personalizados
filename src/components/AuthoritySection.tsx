import { Icon } from "./Icon";

type Props = {
  title: string;
  items: { icon: string; title: string; text: string }[];
};

export function AuthoritySection({ title, items }: Props) {
  return (
    <section aria-labelledby="authority-title" className="border-y border-gold/20 bg-white/60">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <h2 id="authority-title" data-reveal className="font-display text-2xl font-semibold text-ink sm:text-3xl md:text-center">
          {title}
        </h2>
        <ul data-reveal-group className="mt-7 grid grid-cols-2 gap-x-4 gap-y-6 md:mt-10 md:grid-cols-4 md:gap-8">
          {items.map((item) => (
            <li key={item.title} data-reveal-item className="flex flex-col gap-2 md:items-center md:text-center">
              <span className="grid size-11 place-items-center rounded-full bg-blush/45 text-burgundy">
                <Icon name={item.icon} className="size-5" />
              </span>
              <h3 className="text-[0.98rem] font-bold text-ink">{item.title}</h3>
              <p className="text-sm leading-relaxed text-ink/70">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
