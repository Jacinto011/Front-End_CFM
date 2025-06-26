// pages/supervisor/vagas.js
import { FaListAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';

export default function Vagass() {
  const router = useRouter();

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        
        </div>

        {/* Conteúdo Principal */}
        <div className="col-md-9 col-lg-9 p-5">
          <h3 className="mb-4">Vagas de Estágio</h3>
          <p>Aqui você pode visualizar as vagas de estágio abertas para os estagiários.</p>
          <button className="btn btn-warning">Ver Vagas Abertas</button>
          <br /><br />
          <button className="btn btn-secondary" onClick={() => router.push('/supervisor/dashbord')}>
            Voltar ao Dashboard
          </button>
        </div>
      </div>
  
  );
}
