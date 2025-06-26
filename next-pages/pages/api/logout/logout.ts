import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export async function handleLogout(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Configura o cabeçalho para remover o cookie
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: -1, // Expira imediatamente
        sameSite: 'strict',
        path: '/',
      })
    );

  //  console.log('Logout efetuado com sucesso!');
    res.status(200).json({ message: 'Logout efetuado com sucesso!' });
  } catch (error) {
    console.error('Erro ao efetuar logout:', error);
    res.status(500).json({ message: 'Erro ao efetuar logout'});
  }
}

