import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap
import '../styles/css_template/css/app.css'; // Estilos personalizados
import { UserProvider } from '../context/UserContext'; // Provedor de contexto do usuário
import Head from 'next/head';
import { useRouter } from 'next/router'; // Importa o hook useRouter para verificar a rota atual
import { usuario_logado } from '@/components/lib/autenticar';

export async function getServerSideProps(ctx: any) {
  const userResult = await usuario_logado(ctx); // Obtém os dados do usuário a partir da função `usuario_logado`
  return { props: { ...userResult.props } };
}

export default function MyApp({ Component, pageProps }: AppProps) {
  // Verifica se a página tem um layout personalizado
  const getLayout = (Component as any).getLayout || ((page: React.ReactNode) => page);

  // Lógica para identificar se a rota atual pertence ao formulário
  const router = useRouter();
  const isFormPage = router.pathname.startsWith('/formulario');

  return (
    <UserProvider initialUserData={pageProps.user}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" /> {/* Definindo charset */}
        <meta name="description" content="Gestão de Usuários - Plataforma para gerenciamento de usuários e autenticação." />
        <meta name="author" content="Seu Nome ou Empresa" />
        <title>Plataforma de Recrutamento-CFM</title>
        {/* Favicon */}
        <link rel="icon" href="../img/photos/cfm0.png" className="img-fluid rounded-circle"/>
      </Head>

      {/* Condicional para renderizar algo específico para o formulário, se necessário */}
      {isFormPage ? (
        <div className="form-page-layout">
          {/* Layout específico para páginas de formulário */}
          {getLayout(<Component {...pageProps} />)}
        </div>
      ) : (
        getLayout(<Component {...pageProps} />)
      )}
    </UserProvider>
  );
}
