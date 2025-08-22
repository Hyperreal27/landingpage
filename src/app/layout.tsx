import type { Metadata, Viewport } from "next";
import "./globals.css";
import { StructuredData } from "@/components/ui/StructuredData";

export const metadata: Metadata = {
  title: "AiFlux - Automatización IA que Transforma Negocios",
  description: "Automatizamos tus procesos más críticos con Lead Generation Agents, Customer Support IA y N8N Workflows. +300% ROI garantizado en 30 días. Consulta gratuita.",
  keywords: [
    "automatización IA",
    "inteligencia artificial",
    "lead generation agents",
    "customer support IA",
    "N8N workflows",
    "automatización empresarial",
    "agentes IA",
    "transformación digital"
  ],
  authors: [{ name: "AiFlux" }],
  creator: "AiFlux",
  publisher: "AiFlux",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://aiflux.space'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "AiFlux - Automatización IA que Transforma Negocios",
    description: "Automatizamos tus procesos más críticos con Lead Generation Agents, Customer Support IA y N8N Workflows. +300% ROI garantizado en 30 días.",
    url: 'https://aiflux.space',
    siteName: 'AiFlux',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AiFlux - Automatización IA',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "AiFlux - Automatización IA que Transforma Negocios",
    description: "Automatizamos tus procesos más críticos con IA. +300% ROI garantizado en 30 días.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/aiflux.png" type="image/png" />
        <link rel="shortcut icon" href="/aiflux.png" type="image/png" />
        <link rel="apple-touch-icon" href="/aiflux.png" />
        <StructuredData />
      </head>
      <body className="antialiased">
        {children}
        {/* AI Chatbot Widget - Temporarily Hidden */}
        {/* <ChatBot /> */}
      </body>
    </html>
  );
}
