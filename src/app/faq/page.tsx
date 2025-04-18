'use client';

import { useState, useEffect } from 'react';

export default function FAQ() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading FAQ content...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-black">Frequently Asked Questions</h1>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">What is an image converter?</h2>
            <p className="text-gray-800 mb-4">
              An image converter is a powerful digital tool designed to transform image files from one format to another. This essential utility enables users to convert between popular image formats such as JPG, PNG, WebP, and more, ensuring optimal compatibility across various platforms and applications. Our advanced image conversion technology maintains the highest quality standards while providing efficient format transformation capabilities.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">Why should I use GURT Image Converter?</h2>
            <p className="text-gray-800 mb-4">
              GURT Image Converter stands out as a premier solution for all your image conversion needs. Our platform offers unparalleled conversion quality, lightning-fast processing speeds, and a user-friendly interface that makes image conversion accessible to everyone. Whether you're a professional photographer, graphic designer, or casual user, our converter provides the perfect balance of power and simplicity for all your image format transformation requirements.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">What image formats are supported?</h2>
            <p className="text-gray-800 mb-4">
              Our comprehensive image converter supports a wide range of popular image formats, including but not limited to JPG, PNG, WebP, and more. Each format is optimized for specific use cases - JPG for photographs and complex images, PNG for transparency and lossless quality, and WebP for modern web optimization. Our converter ensures perfect compatibility across all supported formats while maintaining the highest possible image quality standards.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">How does image conversion work?</h2>
            <p className="text-gray-800 mb-4">
              Image conversion is a sophisticated process that involves transforming the digital representation of an image from one format to another. Our advanced conversion algorithms analyze the source image's data structure, color information, and metadata, then reconstruct it in the target format while preserving essential visual elements. This process ensures optimal quality and compatibility while maintaining the image's visual integrity across different platforms and applications.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">Is my data secure?</h2>
            <p className="text-gray-800 mb-4">
              At GURT Image Converter, we prioritize your data security and privacy. Our platform implements industry-standard encryption protocols and secure data handling practices to ensure your images remain protected throughout the conversion process. All uploaded files are automatically deleted from our servers after conversion, and we never store or share your personal information with third parties.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">What are the benefits of premium?</h2>
            <p className="text-gray-800 mb-4">
              Our premium service offers numerous advantages for power users and professionals. Subscribers enjoy unlimited conversions, lightning-fast processing speeds, priority support, and an ad-free experience. Premium users also benefit from advanced features such as batch processing, custom quality settings, and exclusive format support. Upgrade to premium today to unlock the full potential of our image conversion platform.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">How can I optimize my images?</h2>
            <p className="text-gray-800 mb-4">
              Image optimization is crucial for web performance and storage efficiency. Our converter automatically applies optimal compression settings based on the target format and intended use. For best results, consider the specific requirements of your project - JPG for photographs, PNG for graphics with transparency, and WebP for modern web applications. Our platform ensures your images are perfectly optimized for their intended purpose.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">What is the difference between lossy and lossless compression?</h2>
            <p className="text-gray-800 mb-4">
              Lossy and lossless compression are two fundamental approaches to image file size reduction. Lossy compression, used in formats like JPG, achieves smaller file sizes by selectively removing image data that is less noticeable to the human eye. Lossless compression, used in formats like PNG, preserves all original image data while still reducing file size through efficient encoding. Our converter automatically selects the optimal compression method based on your chosen format and quality requirements.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 