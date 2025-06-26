import { useState } from 'react';
import { useRouter } from 'next/router'; // Importando useRouter

export default function RelatoriosAdmin() {
  const [relatorios, setRelatorios] = useState([
    {
      id: 1,
      estagiario: 'Carlos Silva',
      supervisor: 'Dra. Ana Costa',
      status: 'Aprovado',
      data: '2025-04-20',
    },
    {
      id: 2,
      estagiario: 'Maria João',
      supervisor: 'Eng. Jorge Mussa',
      status: 'Pendente',
      data: '2025-04-18',
    },
    {
      id: 3,
      estagiario: 'Pedro Lucas',
      supervisor: 'Prof. André Nunes',
      status: 'Rejeitado',
      data: '2025-04-15',
    },
  ]);

  const router = useRouter(); // Usando o useRouter para navegação

  return (
    <div className="container py-5">
      <h2 className="mb-4">Relatórios de Atividades</h2>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Aprovados</h5>
              <p className="card-text fs-4">{relatorios.filter(r => r.status === 'Aprovado').length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-warning mb-3">
            <div className="card-body">
              <h5 className="card-title">Pendentes</h5>
              <p className="card-text fs-4">{relatorios.filter(r => r.status === 'Pendente').length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-danger mb-3">
            <div className="card-body">
              <h5 className="card-title">Rejeitados</h5>
              <p className="card-text fs-4">{relatorios.filter(r => r.status === 'Rejeitado').length}</p>
            </div>
          </div>
        </div>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Estagiário</th>
            <th>Supervisor</th>
            <th>Status</th>
            <th>Data de Envio</th>
          </tr>
        </thead>
        <tbody>
          {relatorios.map((relatorio) => (
            <tr key={relatorio.id}>
              <td>{relatorio.id}</td>
              <td>{relatorio.estagiario}</td>
              <td>{relatorio.supervisor}</td>
              <td>{relatorio.status}</td>
              <td>{relatorio.data}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botão de voltar ao dashboard */}
      <button className="btn btn-secondary mt-3" onClick={() => router.push('/admin/dashbord')}>
        Voltar ao Dashboard
      </button>
    </div>
  );
}
