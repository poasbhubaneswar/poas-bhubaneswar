import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AmbientLighting } from "@/components/ui/AmbientLighting";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";

export const metadata: Metadata = {
  title: {
    default: "POAS – Paschim Odisha Agrani Sangathana, Bhubaneswar",
    template: "%s | POAS – Paschim Odisha Agrani Sangathana",
  },
  description:
    "Official cultural platform of Paschim Odisha Agrani Sangathana (POAS), Bhubaneswar. Uniting 10+ Western Odisha districts, Maa Samalei Mandir Project, leadership structure, meetings, and cultural heritage.",
  keywords: [
    "POAS",
    "Paschim Odisha Agrani Sangathana",
    "POAS Bhubaneswar",
    "Maa Samalei Mandir",
    "Nuakhai Bhetghat",
    "Western Odisha",
    "Sambalpuri Culture",
    "Odisha Heritage",
    "10 Districts Western Odisha",
  ],
  authors: [{ name: "Paschim Odisha Agrani Sangathana" }],
  creator: "POAS Bhubaneswar",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "http://localhost:3000",
    siteName: "POAS – Paschim Odisha Agrani Sangathana",
    title: "POAS – Paschim Odisha Agrani Sangathana | Bhubaneswar",
    description:
      "Uniting 10+ districts of Western Odisha in Bhubaneswar. Preserving cultural heritage, driving community welfare, and establishing the Maa Samalei Mandir & Cultural Complex.",
    images: [
      {
        url: "/images/poas-logo.png",
        width: 800,
        height: 800,
        alt: "POAS Official Emblem",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=Noto+Serif+Oriya:wght@500;700&family=Noto+Sans+Oriya:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0B0B0C] text-white font-sans antialiased flex flex-col relative selection:bg-[#A31D1D] selection:text-white">
        <ScrollProgressBar />
        <AmbientLighting />
        <Header />
        <main className="flex-1 relative z-10 pt-24 sm:pt-28">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
