import React, { createContext, useContext, useState, useEffect } from 'react';
import { decodeToken } from '../utils/jwt'; // Função que você deve ter para decodificar JWT
import cookie from 'cookie';

// Interface para os dados do usuário
export interface UserData {
  email: string;
  sub: number; // ID do usuário
  nome: string;
  apelido: string;
  urlImage: string;
  roles: string[];
  iat: number; // Emitido em (timestamp)
  exp: number; // Expira em (timestamp)
}

// Interface do contexto
export interface UserContextProps {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  logout: () => void;
  loading: boolean;
}

// Criação do contexto (não exportar UserContext diretamente)
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Provider do contexto
export const UserProvider = ({
  children,
  initialUserData,
}: {
  children: React.ReactNode;
  initialUserData?: UserData | null;
}) => {
  const [user, setUser] = useState<UserData | null>(initialUserData || null);
  const [loading, setLoading] = useState(!initialUserData);

  useEffect(() => {
    if (!initialUserData) {
      const cookieString = document.cookie;
      const cookies = cookie.parse(cookieString);
      const token = cookies.token;

      if (token) {
        try {
          const userData = decodeToken(token) as UserData;
          setUser(userData);
        } catch (error) {
          console.error('Erro ao decodificar o token:', error);
          setUser(null);
        }
      }
      setLoading(false);
    }
  }, [initialUserData]);

  const logout = () => {
    document.cookie = `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    setUser(null);
  };

  if (loading) {
    return <p>Carregando usuário...</p>;
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para consumir o contexto do usuário
export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext deve ser usado dentro de um UserProvider');
  }
  return context;
};
