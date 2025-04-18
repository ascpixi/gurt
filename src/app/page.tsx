'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import VideoConverter from './components/VideoConverter';

export default function Home() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState('jpg');
  const [isConverting, setIsConverting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const [showCookieConsent, setShowCookieConsent] = useState(true);
  const [showPreferences, setShowPreferences] = useState(false);
  const [functionalEnabled, setFunctionalEnabled] = useState(false);
  const [targetingEnabled, setTargetingEnabled] = useState(false);
  const [showAdBlockerModal, setShowAdBlockerModal] = useState(false);
  const [showGitHubWarning, setShowGitHubWarning] = useState(false);
  const [adBlockerConfirmations, setAdBlockerConfirmations] = useState(() => {
    // Initialize from localStorage or default to 0
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('adBlockerConfirmations') || '0', 10);
    }
    return 0;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCookieConsent(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Only show modal on first visit or when confirmations < 3
    if (typeof window !== 'undefined') {
      const storedCount = localStorage.getItem('adBlockerConfirmations');
      if ((!storedCount && adBlockerConfirmations < 3) || (storedCount && parseInt(storedCount, 10) < 3)) {
        setShowAdBlockerModal(true);
      }
    }
  }, [adBlockerConfirmations]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (file.size > 1024 * 1024) {
        alert('File size exceeds 1MB limit. Please choose a smaller file. For larger files, consider upgrading to our Premium plan.');
        return;
      }

      setTimeout(() => {
        setSelectedFile(file);
        setDownloadUrl(null);
        setShowPremiumPopup(true);
      }, 1000);
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) return;

    setIsConverting(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('targetFormat', targetFormat);

    try {
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Conversion failed');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (error) {
      console.error('Error converting file:', error);
      alert('Failed to convert image. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };

  const handleAdBlockerConfirm = () => {
    const newCount = adBlockerConfirmations + 1;
    setAdBlockerConfirmations(newCount);
    localStorage.setItem('adBlockerConfirmations', newCount.toString());
    
    if (newCount < 3) {
      // If less than 3 confirmations, show the modal again after a brief delay
      setTimeout(() => {
        setShowAdBlockerModal(true);
      }, 100);
    } else {
      // After 3 confirmations, hide the modal
      setShowAdBlockerModal(false);
    }
  };

  const handleRefresh = () => {
    handleAdBlockerConfirm();
    // Force a hard refresh to ensure the page reloads completely
    window.location.href = window.location.href;
  };

  return (
    <main className="min-h-screen p-8 bg-white">
      {showGitHubWarning && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-2xl">
            <h2 className="text-3xl font-bold mb-4 text-red-600">⚠️ LEGAL WARNING ⚠️</h2>
            <div className="space-y-4 text-gray-800">
              <p className="text-lg font-semibold">ATTENTION: PROPRIETARY CODE ACCESS WARNING</p>
              <p>You are about to access the source code of GURT, which is protected under United States Code Title 17, Chapter 13, Section 1301, and the Digital Millennium Copyright Act of 1998.</p>
              <p className="font-bold">By proceeding to view this code, you acknowledge and agree to the following terms:</p>
              <ul className="list-disc pl-4 space-y-2">
                <li>This code is protected under the Intellectual Property Protection Act of 2023 (USC 17 § 1301-1309)</li>
                <li>Any unauthorized access, viewing, or reproduction of this code is subject to civil and criminal penalties under USC 18 § 1832</li>
                <li>Your access to this code is being logged and monitored in accordance with the Digital Rights Management Act of 2024</li>
                <li>By proceeding, you consent to jurisdiction in the United States District Court for the Northern District of California</li>
              </ul>
              <p className="text-sm text-gray-500">Reference: v. Public Domain (2024) 9th Cir. No. 24-12345</p>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowGitHubWarning(false)}
              >
                Cancel Access
              </button>
              <a
                href="https://github.com/ascpixi/gurt"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => setShowGitHubWarning(false)}
              >
                I Accept All Terms
              </a>
            </div>
          </div>
        </div>
      )}

      {showAdBlockerModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-black">Please Disable Your AdBlocker</h2>
            <p className="mb-4 text-gray-800">
              We've detected that you're using an ad blocker. Our free service relies on advertising revenue to operate. Please disable your ad blocker to continue using our image converter.
            </p>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleRefresh}
              >
                I Disabled It, Refresh
              </button>
            </div>
          </div>
        </div>
      )}

      {showCookieConsent && !showPreferences && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-bold mb-2">Why we use cookies and other tracking technologies?</h3>
            <p className="text-sm mb-4">
              Our site enables script (e.g. cookies) that is able to read, store, and write information on your browser and in your device. The information processed by this script includes data relating to you which may include personal identifiers (e.g. IP address and session details) and browsing activity. We use this information for various purposes - e.g. to deliver content, maintain security, enable user choice, improve our sites, and for marketing purposes. You can reject all non-essential processing by choosing to accept only necessary cookies. To personalize your choice and learn more <a href="#" className="text-blue-400 hover:underline" onClick={(e) => { e.preventDefault(); setShowPreferences(true); }}>click here to adjust your preferences</a>.
            </p>
            <p className="text-sm mb-4 text-yellow-300">
              Note: We work with over 200 partners who may process your data. For a complete list, please review your preferences.
            </p>
            <div className="flex gap-4">
              <button 
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => setShowCookieConsent(false)}
              >
                Allow All
              </button>
              <button 
                className="bg-gray-600 text-white px-4 py-2 rounded"
                onClick={() => setShowCookieConsent(false)}
              >
                Accept Only Necessary
              </button>
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setShowPreferences(true)}
              >
                Adjust my preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {showPreferences && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-4xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">How can you manage your preferences?</h2>
            <p className="mb-6 text-gray-800">
              Managing your cookie preferences is a multi-step process that requires careful consideration of your privacy needs. First, you must understand the different types of cookies and their purposes. Then, you need to evaluate which vendors you trust with your data. After that, you should consider the implications of enabling or disabling each category of cookies. Finally, you must make an informed decision about your privacy settings. This process should be repeated periodically as your preferences and the site's cookie usage may change over time.
            </p>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Strictly Necessary Cookies</h3>
              <p className="mb-4 text-gray-800">
                These cookies are essential for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.
              </p>
              <div className="bg-gray-100 p-4 rounded max-h-48 overflow-y-auto">
                <h4 className="font-bold mb-2 text-gray-800">Vendors:</h4>
                <ul className="list-disc pl-4 text-gray-800">
                  <li>Cloudflare</li>
                  <li>Akamai</li>
                  <li>Fastly</li>
                  <li>Imperva</li>
                  <li>F5 Networks</li>
                  <li>Barracuda Networks</li>
                  <li>Palo Alto Networks</li>
                  <li>Fortinet</li>
                  <li>Check Point</li>
                  <li>Juniper Networks</li>
                  <li>Citrix</li>
                  <li>Radware</li>
                  <li>Netskope</li>
                  <li>Zscaler</li>
                  <li>CloudPassage</li>
                  <li>Alert Logic</li>
                  <li>Qualys</li>
                  <li>Tenable</li>
                  <li>Rapid7</li>
                  <li>Sophos</li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Functional Cookies</h3>
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-800">
                  These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
                </p>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={functionalEnabled}
                    onChange={(e) => setFunctionalEnabled(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-gray-800">Enable Functional Cookies</span>
                </label>
              </div>
              <div className="bg-gray-100 p-4 rounded max-h-48 overflow-y-auto">
                <h4 className="font-bold mb-2 text-gray-800">Vendors:</h4>
                <ul className="list-disc pl-4 text-gray-800">
                  <li>Google Analytics</li>
                  <li>Hotjar</li>
                  <li>Mixpanel</li>
                  <li>Amplitude</li>
                  <li>Segment</li>
                  <li>Heap Analytics</li>
                  <li>Pendo</li>
                  <li>FullStory</li>
                  <li>LogRocket</li>
                  <li>Smartlook</li>
                  <li>Mouseflow</li>
                  <li>Crazy Egg</li>
                  <li>Lucky Orange</li>
                  <li>Inspectlet</li>
                  <li>SessionCam</li>
                  <li>Contentsquare</li>
                  <li>Quantum Metric</li>
                  <li>Glassbox</li>
                  <li>Decibel</li>
                  <li>UserTesting</li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Targeting Cookies</h3>
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-800">
                  These cookies are set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other sites.
                </p>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={targetingEnabled}
                    onChange={(e) => setTargetingEnabled(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-gray-800">Enable Targeting Cookies</span>
                </label>
              </div>
              <div className="bg-gray-100 p-4 rounded max-h-48 overflow-y-auto">
                <h4 className="font-bold mb-2 text-gray-800">Vendors:</h4>
                <ul className="list-disc pl-4 text-gray-800">
                  <li>Google Ads</li>
                  <li>Facebook Pixel</li>
                  <li>LinkedIn Insight Tag</li>
                  <li>Twitter Pixel</li>
                  <li>Pinterest Tag</li>
                  <li>Microsoft Advertising</li>
                  <li>Amazon Advertising</li>
                  <li>Taboola</li>
                  <li>Outbrain</li>
                  <li>Media.net</li>
                  <li>AdRoll</li>
                  <li>Criteo</li>
                  <li>Quantcast</li>
                  <li>DoubleVerify</li>
                  <li>Integral Ad Science</li>
                  <li>Moat Analytics</li>
                  <li>Nielsen</li>
                  <li>Comscore</li>
                  <li>Kantar</li>
                  <li>Ipsos</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowPreferences(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  setShowPreferences(false);
                  setShowCookieConsent(false);
                }}
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {showPremiumPopup && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-black">Upgrade to Premium!</h2>
            <p className="mb-4 text-black">Get unlimited conversions, no ads, and faster processing for just $9.99/month!</p>
            <div className="flex gap-4">
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setShowPremiumPopup(false)}
              >
                Maybe Later
              </button>
              <Link 
                href="/premium"
                className="bg-green-500 text-white px-4 py-2 rounded text-center"
                onClick={() => setShowPremiumPopup(false)}
              >
                Upgrade Now
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-center text-black">GURT Image Converter</h1>
          <button
            onClick={() => setShowGitHubWarning(true)}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            Check us out on GITHUB
          </button>
        </div>
        <p className="text-gray-600 text-center mb-8">
          An image file converter is a powerful tool that enables users to transform digital images from one format to another, ensuring compatibility across different platforms and applications. Whether you need to convert JPG to PNG, PNG to WebP, or any other image format combination, our converter provides a seamless solution for all your image conversion needs.
        </p>
        
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-2 hidden md:block">
            <a href="https://steak.com" target="_blank" rel="noopener noreferrer" className="block">
              <div className="bg-gray-200 p-4 rounded-lg h-[600px] flex items-center justify-center">
                <Image
                  src="/ads/left-ad.jpg"
                  alt="Advertisement"
                  width={160}
                  height={600}
                  className="object-cover"
                />
              </div>
            </a>
          </div>

          <div className="col-span-12 md:col-span-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Select Image (Max 1MB)
                </label>
                <p className="text-sm text-red-600 mb-2">
                  Free users are limited to 1MB file size. Upgrade to Premium for larger files.
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Convert to
                </label>
                <select
                  value={targetFormat}
                  onChange={(e) => setTargetFormat(e.target.value)}
                  className="w-full p-2 border rounded text-black"
                >
                  <option value="jpg">JPG</option>
                  <option value="png">PNG</option>
                  <option value="webp">WebP</option>
                </select>
              </div>

              <button
                onClick={handleConvert}
                disabled={!selectedFile || isConverting}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
              >
                {isConverting ? 'Converting...' : 'Convert'}
              </button>

              {downloadUrl && (
                <div className="mt-4">
                  <a
                    href={downloadUrl}
                    download={`converted.${targetFormat}`}
                    className="block w-full bg-green-500 text-white py-2 px-4 rounded text-center hover:bg-green-600"
                  >
                    Download Converted Image
                  </a>
                </div>
              )}
            </div>

            <div className="mt-8">
              <VideoConverter />
            </div>
          </div>

          <div className="col-span-2 hidden md:block">
            <a href="https://twitter.com/ascpixi" target="_blank" rel="noopener noreferrer" className="block">
              <div className="bg-gray-200 p-4 rounded-lg h-[600px] flex items-center justify-center">
                <Image
                  src="/ads/right-ad.jpg"
                  alt="Advertisement"
                  width={160}
                  height={600}
                  className="object-cover"
                />
              </div>
            </a>
          </div>
        </div>

        <div className="mt-8">
          <a href="https://youtube.com/shorts/SQ-LNKmmnkQ" target="_blank" rel="noopener noreferrer" className="block">
            <div className="bg-gray-200 rounded-lg h-[120px] md:h-[100px] flex items-center justify-center overflow-hidden">
              <img
                src="/ads/bottom-ad.jpg"
                alt="Advertisement"
                width={728}
                height={91}
                className="w-full h-full object-contain"
              />
            </div>
          </a>
        </div>

        <div className="mt-12 text-gray-600">
          <h2 className="text-2xl font-bold mb-4">Image Conversion: A Comprehensive Guide</h2>
          <p className="mb-4">
            In today's digital landscape, image conversion has become an essential tool for professionals and casual users alike. Whether you're a graphic designer, web developer, or simply someone who needs to share images across different platforms, understanding image formats and conversion processes is crucial. Our image converter supports a wide range of formats, including JPG, PNG, and WebP, ensuring that your images maintain optimal quality while meeting specific requirements.
          </p>
          <p className="mb-4">
            The process of image conversion involves transforming the digital representation of an image from one format to another. This transformation can affect various aspects of the image, including compression, transparency, and color depth. Our converter is designed to handle these transformations efficiently, preserving image quality while ensuring compatibility with different devices and applications.
          </p>
          <p className="mb-4">
            When choosing an image format, it's important to consider factors such as file size, quality, and intended use. JPG is ideal for photographs and complex images, offering good compression while maintaining quality. PNG is perfect for images requiring transparency or lossless compression. WebP provides modern compression techniques that can significantly reduce file size while maintaining visual quality.
          </p>
          <p className="mb-4">
            Our image converter is built with user experience in mind, offering a simple and intuitive interface that makes the conversion process straightforward. Whether you need to convert a single image or multiple files, our tool provides reliable and efficient conversion services. The converted images maintain their original quality while being optimized for their new format.
          </p>
          <p className="mb-4">
            In addition to format conversion, our tool also ensures that your images are properly optimized for web use. This includes appropriate compression levels, color space management, and metadata handling. These optimizations help improve website performance and user experience while maintaining image quality.
          </p>
          <p>
            Whether you're working on a personal project or managing a professional website, our image converter provides the tools you need to handle all your image conversion requirements. With support for multiple formats and optimization features, it's the perfect solution for anyone who needs to work with digital images.
          </p>
        </div>
      </div>
    </main>
  );
}
