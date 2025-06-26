
import { NextApiRequest, NextApiResponse } from 'next';
import { handleLogout } from './logout';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      if (req.url?.includes('/api/auth/logout')) {
      } else {
        await handleLogout(req, res);
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Método ${req.method} não permitido`);
  }
}
