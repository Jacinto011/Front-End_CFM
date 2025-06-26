import React, { useEffect, useState } from 'react';
import { Layout } from '@/layout';
import { usuario_logado } from '@/components/lib/autenticar';
import Dashboard from '@/components/dashboard/dashboard';
import Vagas from '@/components/estagiario/vagas';

interface User {
  nome: string;
  apelido: string;
  email: string;
}

interface HomeProps {
  user?: User;
}

export default function Home({ user }: HomeProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(user || null);

  useEffect(() => {
    if (!currentUser) {
      console.log('Usuário ainda não carregado');
    } else {
      //console.log('Usuário carregado: ', currentUser);
    }
  }, [currentUser]);

  return (
    <div>
      <Vagas/>
    </div>
  );
}

// Define o layout para esta página
Home.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

// Obtém os dados do usuário no lado do servidor
export const getServerSideProps = async (context: any) => {
  const result = await usuario_logado(context);

  if (result.redirect) {
    return result; // Redireciona se necessário
  }

  //console.log('Dados obtidos do usuário visto na Props:', result.props?.user); // Para debug

  return {
    props: {
      user: result.props?.user || null, // Garante que user seja definido
    },
  };
};
