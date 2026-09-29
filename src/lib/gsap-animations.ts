import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Convenções de atributos:
//   [data-reveal]                 sobe com fade ao entrar na tela
//   [data-reveal-group]           container cujos filhos [data-reveal-item] entram em sequência
//   [data-reveal-group][data-reveal-side]  mesmos filhos, entrando pelas laterais (alternado)
//   [data-parallax="0.15"]        deslocamento vertical leve durante o scroll
// O Hero não usa nenhum desses atributos: o CTA acima da dobra nunca espera animação.

export function initAnimations(root: HTMLElement): () => void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  gsap.registerPlugin(ScrollTrigger);

  const ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
      gsap.from(el, {
        y: 28,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });

    gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
      const fromSide = group.hasAttribute("data-reveal-side");
      group.querySelectorAll<HTMLElement>("[data-reveal-item]").forEach((item, index) => {
        gsap.from(item, {
          x: fromSide ? (index % 2 === 0 ? -36 : 36) : 0,
          y: fromSide ? 0 : 24,
          autoAlpha: 0,
          duration: 0.7,
          delay: (index % 3) * 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 90%", once: true },
        });
      });
    });

    gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
      const strength = Number(el.dataset.parallax) || 0.12;
      gsap.fromTo(
        el,
        { yPercent: -strength * 50 },
        {
          yPercent: strength * 50,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });
  }, root);

  return () => ctx.revert();
}
