'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FAQ() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!showContent) {
    return null;
  }

  return (
    <div className="min-h-screen p-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-black">Frequently Asked Questions</h1>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">What is GURT Image Converter?</h2>
            <p className="text-gray-600">
              GURT Image Converter is a powerful online tool that allows you to convert your images between different formats. Our free version supports basic conversions with a 1MB file size limit. For larger files and additional features, consider upgrading to our Premium plan.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">Why is there a file size limit?</h2>
            <p className="text-gray-600">
              The 1MB file size limit for free users helps us maintain server performance and provide a quality service to all users. Our Premium plan offers unlimited file sizes and faster processing times.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">What image formats are supported?</h2>
            <p className="text-gray-600">
              We support conversion between JPG, PNG, and WebP formats. Our Premium plan includes additional format support and batch conversion capabilities.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">How do I upgrade to Premium?</h2>
            <p className="text-gray-600">
              You can upgrade to Premium by visiting our <Link href="/premium" className="text-blue-600 hover:underline">Premium page</Link>. Choose from our various subscription plans to unlock all features.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">Is my data secure?</h2>
            <p className="text-gray-600">
              Yes, we take your privacy seriously. All uploaded images are processed securely and deleted immediately after conversion. We never store your images permanently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 