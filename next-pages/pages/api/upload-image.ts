import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Processar o upload manualmente
    const multer = require('multer');
    const upload = multer({
      storage: multer.diskStorage({
        destination: async (req: any, file: any, cb: any) => {
          const uploadDir = path.join(process.cwd(), 'public', 'img', 'photos');
          
          // Criar diretório se não existir
          if (!fs.existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
          }
          
          cb(null, uploadDir);
        },
        filename: (req: any, file: any, cb: any) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const ext = path.extname(file.originalname);
          cb(null, file.fieldname + '-' + uniqueSuffix + ext);
        }
      })
    });

    await new Promise((resolve, reject) => {
      upload.single('image')(req as any, res as any, (err: any) => {
        if (err) {
          console.error('Upload error:', err);
          return reject(err);
        }
        resolve(true);
      });
    });

    // @ts-ignore
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imagePath = `/img/photos/${file.filename}`;
    
    return res.status(200).json({ 
      message: 'Upload successful', 
      imagePath 
    });

  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).json({ message: 'Error uploading image' });
  }
}