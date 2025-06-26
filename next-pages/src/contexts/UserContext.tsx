import { createContext, useState, useEffect, useContext } from 'react';
//import jwtDecode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';



// Tipo dos dados do usuário (ajuste conforme necessário)
export interface UserData {
  email: string;
  nome: string;
  apelido: string;
  sub: number;
  urlImage: string;
  roles: string[];
  iat: number;
  exp: number;
}

// Tipo do contexto do usuário
export interface UserContextProps {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  logout: () => void;
  loading: boolean;
}

// Criação do contexto com valor padrão indefinido
export const UserContext = createContext<UserContextProps | undefined>(undefined);

// Provedor do contexto
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<UserData>(token);
        setUser(decoded);
      } catch (err) {
        console.error('Erro ao decodificar token:', err);
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
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

// Hook personalizado para usar o contexto
export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext deve ser usado dentro de um UserProvider');
  }
  return context;
};
