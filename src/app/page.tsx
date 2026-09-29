import { AboutSection } from "@/components/AboutSection";
import { Animations } from "@/components/Animations";
import { AuthoritySection } from "@/components/AuthoritySection";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FeaturedOffer } from "@/components/FeaturedOffer";
import { FloatingWhatsapp } from "@/components/FloatingWhatsapp";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { OfferGrid } from "@/components/OfferGrid";
import { PreFooterSection } from "@/components/PreFooterSection";
import { ResultsGallery } from "@/components/ResultsGallery";
import { site } from "@/config/site";

// Ordem dos blocos: ver sectionOrder em src/config/site.ts.
// LocationSection não é renderizada: não há endereço, Maps nem coordenadas confirmados.
export default function Home() {
  const { sections } = site;
  return (
    <>
      <Header brandName={site.brandName} brandTagline={site.brandTagline} nav={site.nav} cta={site.header.cta} />
      <main>
        <Hero {...site.hero} />
        {sections.authority && <AuthoritySection {...site.authority} />}
        {sections.featuredOffer && <FeaturedOffer {...site.featured} />}
        {sections.offerGrid && <OfferGrid {...site.offerGrid} />}
        {sections.howItWorks && <HowItWorks {...site.howItWorks} />}
        {sections.resultsGallery && <ResultsGallery {...site.gallery} />}
        {sections.about && <AboutSection {...site.about} />}
        {sections.faq && <FaqAccordion {...site.faq} />}
        {sections.preFooter && <PreFooterSection {...site.preFooter} />}
      </main>
      {/* Espaço extra no mobile para a barra fixa de WhatsApp não cobrir o rodapé. */}
      <div className="bg-ink pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">
        <Footer
          brandName={site.brandName}
          businessName={site.businessName}
          text={site.footer.text}
          instagram={site.instagram}
          phoneCta={site.footer.phoneCta}
          cta={site.footer.cta}
        />
      </div>
      <FloatingWhatsapp {...site.floating} />
      <Animations />
    </>
  );
}
