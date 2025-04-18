import { NextResponse } from 'next/server';
import sharp from 'sharp';
import path from 'path';

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

    // Get absolute path to watermark
    const watermarkPath = path.join(process.cwd(), 'watermark.png');

    // Resize watermark to match image dimensions
    const watermarkBuffer = await sharp(watermarkPath)
      .resize(width, height, {
        fit: 'fill'
      })
      .toBuffer();

    switch (targetFormat.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
        convertedImage = await sharp(buffer)
          .composite([{
            input: watermarkBuffer,
            top: 0,
            left: 0,
            blend: 'over'
          }])
          .jpeg({ quality: 40 })
          .toBuffer();
        break;
      case 'png':
        convertedImage = await sharp(buffer)
          .composite([{
            input: watermarkBuffer,
            top: 0,
            left: 0,
            blend: 'over'
          }])
          .png()
          .toBuffer();
        break;
      case 'webp':
        convertedImage = await sharp(buffer)
          .composite([{
            input: watermarkBuffer,
            top: 0,
            left: 0,
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