'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState('jpg');
  const [isConverting, setIsConverting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const [showCookieConsent, setShowCookieConsent] = useState(true);
  const [showPreferences, setShowPreferences] = useState(false);
  const [functionalEnabled, setFunctionalEnabled] = useState(false);
  const [targetingEnabled, setTargetingEnabled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCookieConsent(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setDownloadUrl(null);
      setShowPremiumPopup(true);
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) return;

    setIsConverting(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('targetFormat', targetFormat);

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
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

  return (
    <main className={`min-h-screen p-8 bg-white ${showCookieConsent && !showPreferences ? 'opacity-50' : ''}`}>
      {/* Cookie Consent */}
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

      {/* Cookie Preferences Modal */}
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

      {/* Premium Plan Popup */}
      {showPremiumPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md">
            <h2 className="text-2xl font-bold mb-4">Upgrade to Premium!</h2>
            <p className="mb-4">Get unlimited conversions, no ads, and faster processing for just $9.99/month!</p>
            <div className="flex gap-4">
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setShowPremiumPopup(false)}
              >
                Maybe Later
              </button>
              <button 
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => setShowPremiumPopup(false)}
              >
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">GURT Image Converter</h1>
        
        <div className="grid grid-cols-12 gap-4">
          {/* Left Ad Column */}
          <div className="col-span-2">
            <div className="bg-gray-200 p-4 rounded-lg h-[600px] flex items-center justify-center">
              <Image
                src="/ads/left-ad.jpg"
                alt="Advertisement"
                width={160}
                height={600}
                className="object-cover"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Select Image
                </label>
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
                  className="w-full p-2 border rounded"
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
          </div>

          {/* Right Ad Column */}
          <div className="col-span-2">
            <div className="bg-gray-200 p-4 rounded-lg h-[600px] flex items-center justify-center">
              <Image
                src="/ads/right-ad.jpg"
                alt="Advertisement"
                width={160}
                height={600}
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bottom Ad Banner */}
        <div className="mt-8 bg-gray-200 p-4 rounded-lg h-[100px] flex items-center justify-center">
          <Image
            src="/ads/bottom-ad.jpg"
            alt="Advertisement"
            width={728}
            height={90}
            className="object-cover"
          />
        </div>
      </div>
    </main>
  );
}
