import { useUserContext } from '@/context/UserContext';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

interface AvaliacaoFinal {
  supervisor: string;
  nota: string;
  comentario: string;
}

interface Relatorio {
  id_Relatorio: number;
  Titulo: string;
  anexo: string;
  dataAdd: string;
  classificacao: string;
  descricao: string;
}

interface EstagiarioData {
  nome: string;
  apelido: string;
  nota_final: string;
  comentario: string;
}

interface SupervisorData {
  nome: string;
  apelido: string;
}

export default function Avaliacoes() {
  const { user } = useUserContext();
  const router = useRouter();
  
  const [avaliacaoFinal, setAvaliacaoFinal] = useState<AvaliacaoFinal>({
    supervisor: '',
    nota: '',
    comentario: ''
  });
  
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Buscar dados do estagiário
        const estagiarioResponse = await fetch(`/api/estagiario?cod=${user?.sub}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer `, // Adicione o token no cabeçalho
          },
        });

        if (!estagiarioResponse.ok) {
          throw new Error('Erro ao buscar dados do estagiário.');
        }

        const estagiarioData: EstagiarioData = await estagiarioResponse.json();
        
        // Buscar dados do supervisor
        const supervisorResponse = await fetch(`/api/estagiario?supervisor=${user?.sub}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer `, // Adicione o token no cabeçalho
          },
        });

        if (!supervisorResponse.ok) {
          throw new Error('Erro ao buscar dados do supervisor.');
        }

        const supervisorData: SupervisorData = await supervisorResponse.json();
        
        // Buscar relatórios
        const relatoriosResponse = await fetch(`/api/estagiario?id=${user?.sub}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer `, // Adicione o token no cabeçalho
          },
        });

        if (!relatoriosResponse.ok) {
          throw new Error('Erro ao buscar relatórios.');
        }

        const relatoriosData: Relatorio[] = await relatoriosResponse.json();

        // Atualizar estado com os dados da API
        setAvaliacaoFinal({
          supervisor: `${supervisorData.nome} ${supervisorData.apelido}`,
          nota: estagiarioData.nota_final,
          comentario: estagiarioData.comentario
        });

        setRelatorios(relatoriosData);
        
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError('Erro ao buscar dados. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.sub) {
      fetchData();
    }
  }, [user?.sub]);

  const getAvaliacaoColor = (avaliacao: string) => {
    switch(avaliacao) {
      case 'Excelente':
      case 'Aprovado': // Adicionei para corresponder aos dados da API
        return 'bg-success text-white';
      case 'Boa':
        return 'bg-primary text-white';
      case 'Regular':
        return 'bg-warning';
      case 'Insatisfatório':
      case 'Reprovado': // Adicionei para corresponder aos dados da API
        return 'bg-danger text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

  if (loading) {
    return (
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid p-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <button 
          className="btn btn-secondary mt-4" 
          onClick={() => router.push('/')}
        >
          Voltar ao Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="mb-4">Avaliações do Supervisor</h2>
          
          {/* Card de Avaliação Final */}
          <div className={`card mb-4 ${getAvaliacaoColor(avaliacaoFinal.nota)}`}>
            <div className="card-body">
              <h5 className="card-title">Avaliação Final</h5>
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Supervisor:</strong> {avaliacaoFinal.supervisor}</p>
                  <p><strong>Nota:</strong> {avaliacaoFinal.nota}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Comentário:</strong></p>
                  <p>{avaliacaoFinal.comentario}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabela de Relatórios Avaliados */}
          <h5 className="mt-5 mb-3">Avaliações dos Relatórios</h5>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Data do Relatório</th>
                  <th>Título</th>
                  <th>Anexo</th>
                  <th>Avaliação</th>
                </tr>
              </thead>
              <tbody>
                {relatorios.map((relatorio) => (
                  <tr key={relatorio.id_Relatorio}>
                    <td>{new Date(relatorio.dataAdd).toLocaleDateString()}</td>
                    <td>{relatorio.Titulo}</td>
                    <td>
                      {relatorio.anexo && (
                        <a href={`/anexos/${relatorio.anexo}`} className="btn btn-sm btn-outline-primary">
                          Visualizar
                        </a>
                      )}
                    </td>
                    <td>
                      <span className={`badge ${getAvaliacaoColor(relatorio.classificacao)}`}>
                        {relatorio.classificacao}
                      </span>
                      {relatorio.descricao && (
                        <p className="mt-1 mb-0"><small>{relatorio.descricao}</small></p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button 
            className="btn btn-secondary mt-4" 
            onClick={() => router.push('/')}
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}