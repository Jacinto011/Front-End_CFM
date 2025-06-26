import cookie from 'cookie';

const apiUrl = process.env.API_URL;

export async function handleLogin(req: any, res: any) {
  console.log('Dados de Login: ', req.body);
  
  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    console.log('Dados Retornados: ', data);
    

    // Verifica se a resposta indica sucesso
    if (response.ok && data.access_token) {
      // Configura o cookie com o token de acesso
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', data.access_token, {
          httpOnly: true,
          maxAge: 60 * 60, // 1 hora
          sameSite: 'strict',
          path: '/',
        })
      );

      res.status(200).json(data); // Retorna os dados do login
    } else {
      // Trata casos onde a API retorna erro, como 401 ou 403
      if (response.status === 401) {
        return res.status(401).json({ message: 'Credenciais inválidas. Por favor, verifique seu e-mail e senha.' });
      }
      if (response.status === 403) {
        return res.status(403).json({ message: 'Acesso negado. Entre em contato com o administrador.' });
      }

      // Trata outros erros
      return res.status(response.status).json({
        message: 'Erro ao realizar login. Tente novamente mais tarde.',
        error: data.message || 'Erro desconhecido.',
      });
    }
  } catch (error) {
    // Trata erros que ocorrem ao tentar conectar com a API
    console.error('Erro ao realizar login:', error);
    res.status(500).json({
      message: 'Erro interno no servidor. Tente novamente mais tarde.',
     // error: error.message,
    });
  }
}
