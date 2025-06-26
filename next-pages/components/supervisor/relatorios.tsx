// pages/supervisor/avaliacoes.js
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';

interface TableData {
  id_usuario: string;
  nome: string;
  apelido: string;
  email: string;
  nomeCidade: string;
  periodo: string;
  remunerado: string;
  estado: string;
  contato1: string;
  contato2: string;
  avaliacao: string | null;
}

interface Relatorio {
  id_Relatorio: number;
  Titulo: string;
  anexo: string;
  dataAdd: string;
  tb_estagiario_tb_id_usuario: string;
}

export default function AvaliacaoEstagiarios() {
  const [data, setData] = useState<TableData[]>([]);
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showVerRelatoriosModal, setShowVerRelatoriosModal] = useState(false);
  const [showAvaliarRelatorioModal, setShowAvaliarRelatorioModal] = useState(false);
  const [currentEstagiario, setCurrentEstagiario] = useState<TableData | null>(null);
  const [selectedRelatorio, setSelectedRelatorio] = useState<Relatorio | null>(null);
  const [avaliacaoRelatorio, setAvaliacaoRelatorio] = useState('');
  const router = useRouter();

  const avaliacaoOptions = [
    'Excelente',
    'Bom',
    'Regular',
    'Insatisfatório'
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/estagiario', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer `, // Adicione o token no cabeçalho
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar dados.');
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setError('Erro ao buscar dados. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatorios = async (idEstagiario: string) => {
    try {
      const response = await fetch(`/api/estagiario?id=${idEstagiario}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer `, // Adicione o token no cabeçalho
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar relatórios.');
      }

      const result = await response.json();
      setRelatorios(result);
    } catch (error) {
      console.error('Erro ao buscar relatórios:', error);
      setError('Erro ao buscar relatórios. Tente novamente.');
    }
  };

  const handleVerRelatoriosClick = async (estagiario: TableData) => {
    setCurrentEstagiario(estagiario);
    await fetchRelatorios(estagiario.id_usuario);
    setShowVerRelatoriosModal(true);
  };

  const handleAvaliarRelatorioClick = (relatorio: Relatorio) => {
    setSelectedRelatorio(relatorio);
    setShowAvaliarRelatorioModal(true);
  };

  const handleSubmitAvaliacaoRelatorio = async () => {
    if (!selectedRelatorio) return;

    try {
      const response = await fetch(`/api/relatorios/${selectedRelatorio.id_Relatorio}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer `, // Adicione o token no cabeçalho
        },
        body: JSON.stringify({
          avaliacao: avaliacaoRelatorio
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar avaliação do relatório.');
      }

      // Atualiza os relatórios após salvar a avaliação
      if (currentEstagiario) {
        await fetchRelatorios(currentEstagiario.id_usuario);
      }
      setShowAvaliarRelatorioModal(false);
    } catch (error) {
      console.error('Erro ao salvar avaliação do relatório:', error);
      setError('Erro ao salvar avaliação do relatório. Tente novamente.');
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
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
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <button className="btn btn-primary" onClick={fetchData}>Tentar novamente</button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Relatórios de Estagiários</h2>

      <div className="mb-3">
        <Link href="/supervisor/dashboard" className="btn btn-secondary">← Voltar ao Dashboard</Link>
      </div>

      <div className="card p-4 shadow-sm">
        <h5 className="card-title mb-3">Lista de Estagiários</h5>
        <p className="text-muted">Aqui você poderá visualizar e avaliar os relatórios dos seus estagiários.</p>

        {data.length === 0 ? (
          <div className="alert alert-info">Nenhum estagiário cadastrado.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered mt-3">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Nome Completo</th>
                  <th>Email</th>
                  <th>Cidade</th>
                  <th>Período</th>
                  <th>Estado</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {data.map((estagiario) => (
                  <tr key={estagiario.id_usuario}>
                    <td>{estagiario.id_usuario}</td>
                    <td>{estagiario.nome} {estagiario.apelido}</td>
                    <td>{estagiario.email}</td>
                    <td>{estagiario.nomeCidade}</td>
                    <td>{estagiario.periodo}</td>
                    <td>{estagiario.estado}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => handleVerRelatoriosClick(estagiario)}
                      >
                        Ver Relatórios
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de Ver Relatórios */}
      <Modal show={showVerRelatoriosModal} onHide={() => setShowVerRelatoriosModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Relatórios do Estagiário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentEstagiario && (
            <div>
              <div className="mb-4">
                <h5>Dados do Estagiário</h5>
                <p><strong>Nome:</strong> {currentEstagiario.nome} {currentEstagiario.apelido}</p>
                <p><strong>Email:</strong> {currentEstagiario.email}</p>
                <p><strong>Cidade:</strong> {currentEstagiario.nomeCidade}</p>
                <p><strong>Período:</strong> {currentEstagiario.periodo}</p>
              </div>
              
              <h5 className="mb-3">Relatórios</h5>
              
              {relatorios.length === 0 ? (
                <div className="alert alert-info">Nenhum relatório encontrado para este estagiário.</div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Título</th>
                        <th>Data</th>
                        <th>Anexo</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {relatorios.map((relatorio) => (
                        <tr key={relatorio.id_Relatorio}>
                          <td>{relatorio.Titulo}</td>
                          <td>{new Date(relatorio.dataAdd).toLocaleDateString()}</td>
                          <td>
                            <a 
                              href={`/api/relatorios/download?file=${relatorio.anexo}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-outline-primary"
                            >
                              Baixar
                            </a>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-info"
                              onClick={() => handleAvaliarRelatorioClick(relatorio)}
                            >
                              Avaliar Relatório
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowVerRelatoriosModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Avaliar Relatório */}
      <Modal show={showAvaliarRelatorioModal} onHide={() => setShowAvaliarRelatorioModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Avaliar Relatório</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRelatorio && (
            <div>
              <div className="mb-4">
                <h5>Dados do Relatório</h5>
                <p><strong>Título:</strong> {selectedRelatorio.Titulo}</p>
                <p><strong>Data:</strong> {new Date(selectedRelatorio.dataAdd).toLocaleDateString()}</p>
                <p>
                  <strong>Anexo:</strong> 
                  <a 
                    href={`/api/relatorios/download?file=${selectedRelatorio.anexo}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="ms-2 btn btn-sm btn-outline-primary"
                  >
                    Baixar
                  </a>
                </p>
              </div>
              
              <Form.Group className="mb-3">
                <Form.Label>Avaliação do Relatório</Form.Label>
                <Form.Select
                  value={avaliacaoRelatorio}
                  onChange={(e) => setAvaliacaoRelatorio(e.target.value)}
                >
                  <option value="">Selecione uma avaliação</option>
                  {avaliacaoOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAvaliarRelatorioModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmitAvaliacaoRelatorio}>
            Salvar Avaliação
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}