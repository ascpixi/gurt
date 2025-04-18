import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "GURT - Free Online Image & Video Converter",
  description: "Convert images and videos between different formats instantly. Free, secure, and all processing done locally in your browser. Support for JPG, PNG, WebP, and MP4 formats.",
  keywords: "image converter, video converter, online converter, free converter, jpg to png, png to webp, video compression, local processing",
  authors: [{ name: "GURT Team" }],
  creator: "GURT Team",
  publisher: "GURT",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gurt.vercel.app",
    title: "GURT - Free Online Image & Video Converter",
    description: "Convert images and videos between different formats instantly. Free, secure, and all processing done locally in your browser.",
    siteName: "GURT Converter",
    images: [{
      url: '/Untitled-5.jpg',
      width: 1200,
      height: 630,
      alt: 'GURT Image and Video Converter',
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GURT - Free Online Image & Video Converter",
    description: "Convert images and videos between different formats instantly. Free, secure, and all processing done locally in your browser.",
    creator: "@gurt",
    images: ['/Untitled-5.jpg'],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: "google-site-verification-code",
  },
  category: "technology",
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' }
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
