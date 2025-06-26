import React, { useEffect, useState } from 'react';
import { Layout, NoLayout } from '@/layout';
import { usuario_logado } from '@/components/lib/autenticar';
import Dashboard from '@/components/dashboard/dashboard';
import Cadastro from '@/components/cadastro/page';

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
      <Cadastro/>
    </div>
  );
}

