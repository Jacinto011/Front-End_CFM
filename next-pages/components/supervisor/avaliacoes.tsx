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

export default function AvaliacaoEstagiarios() {
  const [data, setData] = useState<TableData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAvaliarModal, setShowAvaliarModal] = useState(false);
  const [showVerAvaliacaoModal, setShowVerAvaliacaoModal] = useState(false);
  const [currentEstagiario, setCurrentEstagiario] = useState<TableData | null>(null);
  const [avaliacaoText, setAvaliacaoText] = useState('');
  const router = useRouter();

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

  const handleAvaliarClick = (estagiario: TableData) => {
    setCurrentEstagiario(estagiario);
    setAvaliacaoText(estagiario.avaliacao || '');
    setShowAvaliarModal(true);
  };

  const handleVerAvaliacaoClick = (estagiario: TableData) => {
    setCurrentEstagiario(estagiario);
    setShowVerAvaliacaoModal(true);
  };

  const handleSubmitAvaliacao = async () => {
    if (!currentEstagiario) return;

    try {
      const response = await fetch(`/api/estagiario/${currentEstagiario.id_usuario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer `, // Adicione o token no cabeçalho
        },
        body: JSON.stringify({
          ...currentEstagiario,
          avaliacao: avaliacaoText
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar avaliação.');
      }

      // Atualiza a lista após salvar a avaliação
      fetchData();
      setShowAvaliarModal(false);
    } catch (error) {
      console.error('Erro ao salvar avaliação:', error);
      setError('Erro ao salvar avaliação. Tente novamente.');
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
      <h2 className="mb-4">Avaliação de Estagiários</h2>

      <div className="mb-3">
        <Link href="/supervisor/dashboard" className="btn btn-secondary">← Voltar ao Dashboard</Link>
      </div>

      <div className="card p-4 shadow-sm">
        <h5 className="card-title mb-3">Lista de Estagiários</h5>
        <p className="text-muted">Aqui você poderá avaliar e visualizar as avaliações dos seus estagiários.</p>

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
                        onClick={() => handleAvaliarClick(estagiario)}
                      >
                        Avaliar
                      </button>
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => handleVerAvaliacaoClick(estagiario)}
                      >
                        Ver Avaliação
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de Avaliação */}
      <Modal show={showAvaliarModal} onHide={() => setShowAvaliarModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Avaliar Estagiário</Modal.Title>
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
                <p><strong>Estado:</strong> {currentEstagiario.estado}</p>
              </div>
              
              <Form.Group className="mb-3">
                <Form.Label>Avaliação</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={avaliacaoText}
                  onChange={(e) => setAvaliacaoText(e.target.value)}
                  placeholder="Digite sua avaliação sobre o estagiário..."
                />
              </Form.Group>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAvaliarModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmitAvaliacao}>
            Salvar Avaliação
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Ver Avaliação */}
      <Modal show={showVerAvaliacaoModal} onHide={() => setShowVerAvaliacaoModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Avaliação do Estagiário</Modal.Title>
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
              
              <div className="mb-3">
                <h5>Avaliação</h5>
                {currentEstagiario.avaliacao ? (
                  <div className="p-3 bg-light rounded">
                    {currentEstagiario.avaliacao}
                  </div>
                ) : (
                  <div className="alert alert-warning">Nenhuma avaliação cadastrada para este estagiário.</div>
                )}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowVerAvaliacaoModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}