import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const localPaths = [
    path.join(process.cwd(), 'public', 'images', 'opc-53-cement.jpg'),
    'C:\\Users\\admin\\.gemini\\antigravity\\brain\\186bf5c0-9c5e-4a05-9153-5d8aff1bce2b\\ultratech_opc_53_1792316630525.jpg',
    'C:\\Users\\admin\\.gemini\\antigravity\\brain\\186bf5c0-9c5e-4a05-9153-5d8aff1bce2b\\opc_53_cement_1792316562366.jpg',
  ];

  for (const filePath of localPaths) {
    try {
      if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath);
        
        // Also auto-cache into public/images if not already there
        const destDir = path.join(process.cwd(), 'public', 'images');
        const destFile = path.join(destDir, 'opc-53-cement.jpg');
        if (!fs.existsSync(destFile)) {
          try {
            if (!fs.existsSync(destDir)) {
              fs.mkdirSync(destDir, { recursive: true });
            }
            fs.writeFileSync(destFile, fileBuffer);
          } catch {
            // Ignore cache write errors
          }
        }

        return new Response(fileBuffer, {
          headers: {
            'Content-Type': 'image/jpeg',
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        });
      }
    } catch {
      // Continue to next path
    }
  }

  // Fallback to high-res online UltraTech OPC 53 cement bag image
  return NextResponse.redirect(
    'https://5.imimg.com/data5/SELLER/Default/2026/1/573829326/JC/JH/YU/99417085/ultratech-cement-opc-53-500x500.jpeg',
    307
  );
}
