# GURT - Image Format Converter

GURT is a web-based image format converter that allows you to convert images between different formats (JPG, PNG, and WebP). The conversion is performed server-side using Sharp, ensuring high-quality results.

## Features

- Convert images between JPG, PNG, and WebP formats
- Server-side processing for optimal performance
- Simple and intuitive user interface
- Built with Next.js and TypeScript
- Deployable on Vercel

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gurt.git
cd gurt
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

GURT can be easily deployed to Vercel:

1. Push your code to a GitHub repository
2. Import the repository in Vercel
3. Deploy!

## Usage

1. Click the "Select Image" button to choose an image file
2. Select the target format from the dropdown menu
3. Click "Convert" to start the conversion
4. Once the conversion is complete, click "Download Converted Image" to save the result

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- Sharp (for image processing)

## License

MIT
