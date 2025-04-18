'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Premium() {
  const [error, setError] = useState<string | null>(null);

  const handleBuyNow = () => {
    setError("Uncaught TypeError: Cannot read properties of null (reading 'response')\n    at processPayment (payment.js:42)\n    at handleBuyNow (premium.js:18)\n    at HTMLButtonElement.onclick (premium.html:127)");
  };

  return (
    <main className="min-h-screen p-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-black">Upgrade to Premium</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 30 Days Package */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-black">30 Days</h2>
            <p className="text-4xl font-bold mb-4 text-black">$14.99</p>
            <ul className="mb-6 text-black">
              <li className="mb-2">✓ Unlimited conversions</li>
              <li className="mb-2">✓ No advertisements</li>
              <li className="mb-2">✓ Faster processing</li>
              <li className="mb-2">✓ Priority support</li>
            </ul>
            <button
              onClick={handleBuyNow}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Buy Now
            </button>
          </div>

          {/* 90 Days Package */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-black">90 Days</h2>
            <p className="text-4xl font-bold mb-4 text-black">$39.99</p>
            <ul className="mb-6 text-black">
              <li className="mb-2">✓ Unlimited conversions</li>
              <li className="mb-2">✓ No advertisements</li>
              <li className="mb-2">✓ Faster processing</li>
              <li className="mb-2">✓ Priority support</li>
            </ul>
            <button
              onClick={handleBuyNow}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Buy Now
            </button>
          </div>

          {/* 365 Days Package */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-black">365 Days</h2>
            <p className="text-4xl font-bold mb-4 text-black">$99.99</p>
            <ul className="mb-6 text-black">
              <li className="mb-2">✓ Unlimited conversions</li>
              <li className="mb-2">✓ No advertisements</li>
              <li className="mb-2">✓ Faster processing</li>
              <li className="mb-2">✓ Priority support</li>
            </ul>
            <button
              onClick={handleBuyNow}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Buy Now
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-8 p-4 bg-red-100 rounded">
            <pre className="text-red-600 font-mono whitespace-pre-wrap">{error}</pre>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-500 hover:underline">
            ← Back to Converter
          </Link>
        </div>
      </div>
    </main>
  );
} 