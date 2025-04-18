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

    // Calculate watermark position (centered)
    const watermarkText = 'GURT';
    const fontSize = Math.min(width, height) * 0.4; // 40% of the smaller dimension
    const padding = fontSize * 0.5;

    // Create the watermark overlay
    const watermarkBuffer = Buffer.from(`
      <svg width="${width}" height="${height}">
        <text
          x="${width / 2}"
          y="${height / 2}"
          font-family="Arial"
          font-size="${fontSize}"
          fill="rgba(255, 255, 255, 0.7)"
          text-anchor="middle"
          dominant-baseline="middle"
          font-weight="bold"
        >${watermarkText}</text>
      </svg>
    `);

    switch (targetFormat.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
        convertedImage = await sharp(buffer)
          .composite([{ input: watermarkBuffer, blend: 'over' }])
          .jpeg({ quality: 40 })
          .toBuffer();
        break;
      case 'png':
        convertedImage = await sharp(buffer)
          .composite([{ input: watermarkBuffer, blend: 'over' }])
          .png()
          .toBuffer();
        break;
      case 'webp':
        convertedImage = await sharp(buffer)
          .composite([{ input: watermarkBuffer, blend: 'over' }])
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