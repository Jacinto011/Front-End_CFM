// pages/perfil.tsx
import React from 'react';
import UserProfile from '../../components/user/Perfil';
import { Layout } from '@/layout';
import { usuario_logado } from '@/components/lib/autenticar';

export default function PerfilPage () {
  return (
    <div>
      <h1 className="text-center">Pefil de Usuario</h1>
      <UserProfile use={{
        id: ''
      }}/>
    </div>
  );
};

PerfilPage.getLayout = function getLayout(page: React.ReactNode) {
    return <Layout>{page}</Layout>;
  };

  export const getServerSideProps = async (context: any) => {
    const result = await usuario_logado(context);
  
    if (result.redirect) {
      return result; // Redireciona se necessário
    }
  
    return {
      props: result.props, // Passa as props para o componente
    };
  }
