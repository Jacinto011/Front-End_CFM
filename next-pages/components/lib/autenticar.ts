import cookie from 'cookie';
import { decodeToken } from '../../utils/jwt';

export const usuario_logado = async (context: any) => {
  const { req } = context;

  // Verifica se o token está nos cookies
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : null;
  const token = cookies?.token;
  
  
  if (!token) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }
  

  // Decodifica o token para obter os dados do usuário
  const userData = decodeToken(token);

  
  
  

  if (!userData) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  // Retorna os dados do usuário como props
  return {
    props: { user: userData },
  };
};

export const usuario_guest = async (context: any) => {
  const { req } = context;

  // Verifica se o token está nos cookies
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : null;
  const token = cookies?.token;

  if (token) {
    // Decodifica o token para verificar se o usuário está logado
    const userData = decodeToken(token);

    if (userData) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }(userData)
  }

  // Permite o acesso como convidado
  return {
    props: {},
  };
};
