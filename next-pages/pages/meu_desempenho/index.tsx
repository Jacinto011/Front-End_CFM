// pages/admin/dashboard.tsx
import { Layout } from "@/layout"; 
import ProjectTables from "@/components/table/tableOne";
import { usuario_logado } from "@/components/lib/autenticar";
import MeuDesempenho from "@/components/desempenho/desempenhoI";

export default function Dashboard() {
  return (
    <div>
    <MeuDesempenho/>
  </div>
  );
}

// Define o layout para esta página
Dashboard.getLayout = function getLayout(page: React.ReactNode) {
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