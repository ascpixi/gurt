"use client";

import Link from "next/link";
import Script from "next/script";
import ChatAssistant from '../components/ChatAssistant';
import AIIntroductionModal from '../components/AIIntroductionModal';
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showAdBlockerModal, setShowAdBlockerModal] = useState(false);
  const [adBlockerConfirmations, setAdBlockerConfirmations] = useState(() => {
    if (typeof window !== 'undefined') {
      const count = parseInt(localStorage.getItem('adBlockerConfirmations') || '0', 10);
      console.log('Initial adBlockerConfirmations:', count);
      return count;
    }
    return 0;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCount = localStorage.getItem('adBlockerConfirmations');
      console.log('Current storedCount:', storedCount);
      console.log('Current adBlockerConfirmations:', adBlockerConfirmations);
      
      // Show adblocker modal if confirmations are less than 2
      const shouldShowAdBlocker = (!storedCount && adBlockerConfirmations < 2) || 
                                (storedCount && parseInt(storedCount, 10) < 2);
      console.log('Should show adblocker modal:', shouldShowAdBlocker);
      
      // Set to false if we should show the adblocker modal
      setShowAdBlockerModal(!shouldShowAdBlocker);
    }
  }, [adBlockerConfirmations]);

  return (
    <html lang="en">
      <head>
        {/* Unnecessary library CDNs */}
        <Script src="https://code.jquery.com/jquery-3.6.0.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/lodash@4.1.0/lodash.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/moment@2.29.1/moment.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/chart.js@3.7.0/dist/chart.min.js" strategy="beforeInteractive" />
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
        <AIIntroductionModal showAdBlockerModal={showAdBlockerModal} />
      </body>
    </html>
  );
} 