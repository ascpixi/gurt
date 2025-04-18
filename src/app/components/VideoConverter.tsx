'use client';

import { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import Image from 'next/image';

export default function VideoConverter() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [showAd, setShowAd] = useState(false);
  const ffmpegRef = useRef<FFmpeg | null>(null);

  const loadFFmpeg = async () => {
    if (ffmpegRef.current) return;

    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
    const ffmpeg = new FFmpeg();
    ffmpegRef.current = ffmpeg;

    ffmpeg.on('log', ({ message }) => {
      console.log(message);
    });

    ffmpeg.on('progress', ({ progress }) => {
      setProgress(Math.round(progress * 100));
    });

    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setConvertedUrl(null);
    setShowAd(true);

    try {
      await loadFFmpeg();
      const ffmpeg = ffmpegRef.current!;

      // Write the file to FFmpeg's virtual filesystem
      await ffmpeg.writeFile('input.mp4', await fetchFile(file));

      // Convert to MP4 with ultrafast preset and 700kb/s bitrate
      await ffmpeg.exec([
        '-i', 'input.mp4',
        '-c:v', 'libx264',
        '-preset', 'ultrafast',
        '-b:v', '700k',
        '-maxrate', '700k',
        '-bufsize', '1400k',
        '-c:a', 'aac',
        '-b:a', '128k',
        'output.mp4'
      ]);

      // Read the converted file
      const data = await ffmpeg.readFile('output.mp4');
      const blob = new Blob([data], { type: 'video/mp4' });
      const url = URL.createObjectURL(blob);
      setConvertedUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during conversion');
    } finally {
      setLoading(false);
      setShowAd(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Video Converter</h2>
        <p className="text-gray-600 mb-4">
          Convert your videos locally in your browser. No files are uploaded to our servers.
          This ensures your privacy and reduces server costs.
        </p>
        
        <div className="mb-4">
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        {loading && (
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Converting... {progress}%</p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {convertedUrl && (
          <div className="mt-4">
            <video
              src={convertedUrl}
              controls
              className="w-full rounded-lg"
            />
            <a
              href={convertedUrl}
              download="converted-video.mp4"
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Download Converted Video
            </a>
          </div>
        )}
      </div>

      {/* Ad Modal */}
      {showAd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={() => setShowAd(false)}
              className="absolute -top-2 -right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100 z-10"
            >
              ×
            </button>
            <a
              href="https://x.com/notnullptr/status/1912935251094946051"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="w-96 h-96 bg-white rounded-lg overflow-hidden">
                <Image
                  src="/ads/conversion-ad.jpg"
                  alt="Advertisement"
                  width={384}
                  height={384}
                  className="w-full h-full object-cover"
                />
              </div>
            </a>
          </div>
        </div>
      )}
    </div>
  );
} 