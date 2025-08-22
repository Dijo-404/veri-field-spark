import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VeriField - Decentralized Dataset Marketplace",
  description: "Verify, Own, and Trade Datasets with Trust. The premier Web3 marketplace for decentralized data verification and trading.",
  authors: [{ name: "VeriField" }],
  openGraph: {
    title: "VeriField - Decentralized Dataset Marketplace",
    description: "Verify, Own, and Trade Datasets with Trust. The premier Web3 marketplace for decentralized data verification and trading.",
    type: "website",
    images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@lovable_dev",
    images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}