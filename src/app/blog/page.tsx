'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Blog() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen p-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {showContent ? (
          <>
            <h1 className="text-4xl font-bold mb-8 text-center text-black">Blog</h1>
            
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4 text-black">The Future of Image Conversion</h2>
                <p className="text-gray-600 mb-4">
                  In this article, we explore the latest trends in image conversion technology and how they're shaping the future of digital media. From AI-powered optimization to real-time format conversion, discover what's next for image processing.
                </p>
                <Link href="/blog/future-of-image-conversion" className="text-blue-600 hover:underline">
                  Read more →
                </Link>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4 text-black">Understanding Image Formats</h2>
                <p className="text-gray-600 mb-4">
                  A comprehensive guide to different image formats and when to use them. Learn about the strengths and weaknesses of JPG, PNG, and WebP formats, and how to choose the right one for your needs.
                </p>
                <Link href="/blog/understanding-image-formats" className="text-blue-600 hover:underline">
                  Read more →
                </Link>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4 text-black">Optimizing Images for Web</h2>
                <p className="text-gray-600 mb-4">
                  Discover best practices for optimizing images for web use. Learn how to balance quality and file size, and how proper image optimization can improve your website's performance and user experience.
                </p>
                <Link href="/blog/optimizing-images-for-web" className="text-blue-600 hover:underline">
                  Read more →
                </Link>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
} 