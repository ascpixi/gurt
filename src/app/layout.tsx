import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GURT Image Converter",
  description: "Convert your images between different formats with our powerful online image converter tool.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
      </body>
    </html>
  );
}
