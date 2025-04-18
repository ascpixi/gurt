import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";
import ChatAssistant from "@/components/ChatAssistant";

const inter = Inter({ subsets: ["latin"] });

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Unnecessary library CDNs */}
        <Script src="https://code.jquery.com/jquery-3.6.0.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/moment@2.29.1/moment.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/chart.js@3.7.0/dist/chart.min.js" strategy="beforeInteractive" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
      </head>
      <body className={inter.className}>
        <nav className="bg-white shadow-md">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex space-x-8">
                <Link href="/" className="text-black hover:text-gray-600">
                  Home
                </Link>
                <Link href="/premium" className="text-black hover:text-gray-600">
                  Premium
                </Link>
                <Link href="/faq" className="text-black hover:text-gray-600">
                  FAQ
                </Link>
                <Link href="/blog" className="text-black hover:text-gray-600">
                  Blog
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
        <ChatAssistant />
      </body>
    </html>
  );
}
