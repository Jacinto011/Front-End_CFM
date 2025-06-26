// pages/supervisor/gestao-estagiarios.js
import { FaUserCog } from 'react-icons/fa';
import { useRouter } from 'next/router';

export default function GestaoEstagiarios() {
  const router = useRouter();

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
      

        {/* Conteúdo Principal */}
        <div className="col-md-9 col-lg-9 p-5">
          <h3 className="mb-4">Gestão de Estagiários</h3>
          <p>Aqui você pode gerenciar os estagiários e suas informações.</p>
          <button className="btn btn-success me-2">Adicionar Estagiário</button>
          <button className="btn btn-primary">Listar Estagiários</button>
          <br /><br />
          <button className="btn btn-secondary" onClick={() => router.push('/supervisor/dashbord')}>
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
