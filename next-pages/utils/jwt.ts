import {jwtDecode} from 'jwt-decode';

interface UserPayload {
  email: string;
  sub: number; // ID do usuário
  nome: string;
  apelido: string;
  urlImage: string;
  roles: string[];
}

export function decodeToken(token: string): UserPayload | null {
  try {
   // console.log('Dados de token JWT: ', token );
    return jwtDecode<UserPayload>(token);
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return null;
  }
}
