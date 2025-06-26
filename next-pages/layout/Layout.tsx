import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import NavBar from './NavBar';
import Footer from './Footer';
import { useUserContext } from '@/context/UserContext';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, loading } = useUserContext();
  const [collapsed, setCollapsed] = useState(false);
  const [dropProfile, setDropProfile] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [imagem, setImagem] = useState("");

  useEffect(() => {
    console.log('Minha Roles:',user?.roles);
    
    setNome(`${user?.nome} ${user?.apelido} `);
    setEmail(`${user?.email}`);
    setImagem(user?.urlImage || "/default-profile.png");
  }, [user]);

  return (
    <div className="wrapper">
      <SideBar user={nome} email={email} collapsed={collapsed} setCollapsed={setCollapsed} tipoUsuario={user?.roles}/>
      <div className="main">
        <NavBar
          user={nome}
          email={email}
          imagem={imagem}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          dropProfile={dropProfile}
          setDropProfile={setDropProfile}
        />
        <div className="content-container">
          <main className="content">{children}</main>
          <Footer />
        </div>
      </div>

      {/* Estilização do fundo com degradê */}
      <style jsx>{`
        .wrapper {
          display: flex;
          min-height: 100vh;
          margin: 0;
          padding: 0;
        }

        .main {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          margin: 0;
          padding: 0;
        }

        .content-container {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          height: calc(100vh - 60px); /* Ajuste conforme a altura do seu NavBar */
          /* Estilo para scroll invisível */
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE e Edge */
        }

        /* Esconde a scrollbar no Chrome, Safari e Opera */
        .content-container::-webkit-scrollbar {
          display: none;
        }

        .content {
          flex-grow: 1;
          padding: 20px;
          
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
          .content {
            padding: 15px;
          }
          
          .content-container {
            height: calc(100vh - 50px); /* Ajuste para mobile se necessário */
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;