import { NextApiRequest, NextApiResponse } from 'next';
import { handleLogin } from './loginUsers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      if (req.url?.includes('/api/auth/login')) {
      } else {
        await handleLogin(req, res);
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Método ${req.method} não permitido`);
  }
}
