import type { Metadata, Viewport } from "next";
import { Fraunces, Nunito_Sans } from "next/font/google";
import { Tracking } from "@/components/Tracking";
import { site } from "@/config/site";
import { buildJsonLd, siteUrl } from "@/lib/seo";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display-family",
  weight: ["500", "600", "700"],
});

const body = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body-family",
});

const baseUrl = siteUrl();

export const metadata: Metadata = {
  ...(baseUrl ? { metadataBase: new URL(baseUrl), alternates: { canonical: "/" } } : {}),
  title: site.seo.title,
  description: site.seo.description,
  applicationName: site.businessName,
  keywords: [
    "presentes personalizados",
    "brindes personalizados",
    "camisetas personalizadas",
    "fardamento personalizado",
    "DTF têxtil",
    "caixa-convite personalizada",
    "kit presente",
  ],
  openGraph: {
    type: "website",
    locale: site.seo.locale,
    siteName: site.businessName,
    title: site.seo.title,
    description: site.seo.description,
    images: [
      {
        url: site.seo.ogImage.src,
        width: site.seo.ogImage.width,
        height: site.seo.ogImage.height,
        alt: site.seo.ogImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
    images: [site.seo.ogImage.src],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: site.theme.ivory,
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(site, baseUrl)).replace(/</g, "\\u003c") }}
        />
        <Tracking metaPixelId={site.tracking.metaPixelId} googleTagId={site.tracking.googleTagId} />
      </body>
    </html>
  );
}
