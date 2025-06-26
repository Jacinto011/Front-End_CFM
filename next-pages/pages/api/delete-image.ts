import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { imagePath } = req.body;
    if (!imagePath) {
      return res.status(400).json({ message: 'Image path is required' });
    }

    const filePath = path.join(process.cwd(), 'public', imagePath);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return res.status(200).json({ message: 'Image deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    return res.status(500).json({ message: 'Error deleting image' });
  }
}