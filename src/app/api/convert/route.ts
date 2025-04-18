import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const targetFormat = formData.get('targetFormat') as string;

    if (!file || !targetFormat) {
      return NextResponse.json(
        { error: 'Missing file or target format' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let convertedImage;

    // Get image dimensions
    const metadata = await sharp(buffer).metadata();
    const width = metadata.width || 0;
    const height = metadata.height || 0;

    // Create a simple watermark using a semi-transparent overlay
    const watermarkSize = Math.min(width, height) * 0.4; // 40% of the smaller dimension
    const watermarkBuffer = Buffer.from(`
      <svg width="${watermarkSize}" height="${watermarkSize}">
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(0, 0, 0, 0.5)"
        />
        <text
          x="50%"
          y="50%"
          font-family="sans-serif"
          font-size="${watermarkSize * 0.2}"
          fill="white"
          text-anchor="middle"
          dominant-baseline="middle"
          font-weight="bold"
        >GURT</text>
      </svg>
    `);

    switch (targetFormat.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
        convertedImage = await sharp(buffer)
          .composite([{
            input: watermarkBuffer,
            top: Math.floor((height - watermarkSize) / 2),
            left: Math.floor((width - watermarkSize) / 2),
            blend: 'over'
          }])
          .jpeg({ quality: 40 })
          .toBuffer();
        break;
      case 'png':
        convertedImage = await sharp(buffer)
          .composite([{
            input: watermarkBuffer,
            top: Math.floor((height - watermarkSize) / 2),
            left: Math.floor((width - watermarkSize) / 2),
            blend: 'over'
          }])
          .png()
          .toBuffer();
        break;
      case 'webp':
        convertedImage = await sharp(buffer)
          .composite([{
            input: watermarkBuffer,
            top: Math.floor((height - watermarkSize) / 2),
            left: Math.floor((width - watermarkSize) / 2),
            blend: 'over'
          }])
          .webp({ quality: 40 })
          .toBuffer();
        break;
      default:
        return NextResponse.json(
          { error: 'Unsupported target format' },
          { status: 400 }
        );
    }

    return new NextResponse(convertedImage, {
      headers: {
        'Content-Type': `image/${targetFormat}`,
        'Content-Disposition': `attachment; filename="converted.${targetFormat}"`,
      },
    });
  } catch (error) {
    console.error('Error converting image:', error);
    return NextResponse.json(
      { error: 'Failed to convert image' },
      { status: 500 }
    );
  }
} 