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

    switch (targetFormat.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
        convertedImage = await sharp(buffer).jpeg().toBuffer();
        break;
      case 'png':
        convertedImage = await sharp(buffer).png().toBuffer();
        break;
      case 'webp':
        convertedImage = await sharp(buffer).webp().toBuffer();
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