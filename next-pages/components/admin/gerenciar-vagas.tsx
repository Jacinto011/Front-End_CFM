import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

type Vaga = {
  idVaga: number;
  area_vaga: string;
  Requisitos: string;
  prazo: number;
  nomeCidade: string;
  dataAdd: string;
  idCidade: number;
  estado: 'Aberto' | 'Fechado';
};

interface Cidade {
  idCidade: number;
  nomeCidade: string;
  idProvincia: number;
  nomeProvincia: string;
}

export default function GerenciarVagas() {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentVaga, setCurrentVaga] = useState<Vaga | null>(null);
  const [novaVaga, setNovaVaga] = useState<Partial<Vaga>>({
    area_vaga: '',
    Requisitos: '',
    prazo: 30,
    idCidade: 0,
    estado: 'Aberto'
  });
  const router = useRouter();

  useEffect(() => {
    fetchData();
    fetchCidades();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/vaga', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer `,
        },
      });

      if (!response.ok) throw new Error('Erro ao buscar dados.');

      const result = await response.json();
      setVagas(result);
    } catch (error) {
      console.error('Erro:', error);
      setError('Erro ao buscar dados.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCidades = async () => {
    try {
      const response = await fetch('/api/cidades');
      if (!response.ok) {
        throw new Error('Erro ao buscar cidades.');
      }
      const result = await response.json();
      setCidades(result);
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
      setError('Erro ao buscar cidades.');
    }
  };

  const handleEditar = (vaga: Vaga) => {
    setCurrentVaga(vaga);
    setShowModal(true);
  };

  const handleExcluir = async (idVaga: number) => {
    if (confirm('Tem certeza que deseja excluir esta vaga?')) {
      try {
        const response = await fetch(`/api/vaga/${idVaga}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer `,
          },
        });

        if (!response.ok) throw new Error('Erro ao excluir vaga.');

        fetchData(); // Atualiza a lista após exclusão
      } catch (error) {
        console.error('Erro ao excluir vaga:', error);
        setError('Erro ao excluir vaga.');
      }
    }
  };

  const handleSave = async () => {
    if (!currentVaga) return;

    try {
      const response = await fetch(`/api/vaga/${currentVaga.idVaga}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer `,
        },
        body: JSON.stringify(currentVaga),
      });

      if (!response.ok) throw new Error('Erro ao atualizar vaga.');

      fetchData();
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao atualizar vaga:', error);
      setError('Erro ao atualizar vaga.');
    }
  };

  const handleAddVaga = async () => {
    try {
      const response = await fetch('/api/vaga', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer `,
        },
        body: JSON.stringify(novaVaga),
      });

      if (!response.ok) throw new Error('Erro ao adicionar vaga.');

      fetchData();
      setShowAddModal(false);
      setNovaVaga({
        area_vaga: '',
        Requisitos: '',
        prazo: 30,
        idCidade: 0,
        estado: 'Aberto'
      });
    } catch (error) {
      console.error('Erro ao adicionar vaga:', error);
      setError('Erro ao adicionar vaga.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (currentVaga) {
      setCurrentVaga({
        ...currentVaga,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleNovaVagaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setNovaVaga({
      ...novaVaga,
      [e.target.name]: e.target.name === 'idCidade' || e.target.name === 'prazo' 
        ? parseInt(e.target.value) 
        : e.target.value
    });
  };

  if (loading) {
    return (
      <div className="container py-5">
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
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <button className="btn btn-primary" onClick={fetchData}>Tentar novamente</button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Gerenciar Vagas</h2>

      <div className="d-flex justify-content-between mb-4">
        <button 
          className="btn btn-secondary" 
          onClick={() => router.push('/admin/dashbord')}
        >
          Voltar ao Dashboard
        </button>
        <button 
          className="btn btn-primary" 
          onClick={() => setShowAddModal(true)}
        >
          Adicionar Nova Vaga
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Área</th>
              <th>Requisitos</th>
              <th>Prazo (dias)</th>
              <th>Cidade</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {vagas.map((vaga) => (
              <tr key={vaga.idVaga}>
                <td>{vaga.idVaga}</td>
                <td>{vaga.area_vaga}</td>
                <td>{vaga.Requisitos.substring(0, 50)}...</td>
                <td>{vaga.prazo}</td>
                <td>{vaga.nomeCidade}</td>
                <td>
                  <span className={`badge ${
                    vaga.estado === 'Aberto' ? 'bg-success' : 'bg-secondary'
                  }`}>
                    {vaga.estado}
                  </span>
                </td>
                <td>
                  <button 
                    className="btn btn-sm btn-warning me-2" 
                    onClick={() => handleEditar(vaga)}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn btn-sm btn-danger" 
                    onClick={() => handleExcluir(vaga.idVaga)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Edição */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Vaga</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentVaga && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Área da Vaga</Form.Label>
                <Form.Control
                  type="text"
                  name="area_vaga"
                  value={currentVaga.area_vaga}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Requisitos</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="Requisitos"
                  value={currentVaga.Requisitos}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Prazo (dias)</Form.Label>
                <Form.Control
                  type="number"
                  name="prazo"
                  value={currentVaga.prazo}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Cidade</Form.Label>
                <Form.Select
                  name="idCidade"
                  value={currentVaga.idCidade}
                  onChange={handleChange}
                >
                  <option value="">Selecione uma cidade</option>
                  {cidades.map((cidade) => (
                    <option key={cidade.idCidade} value={cidade.idCidade}>
                      {cidade.nomeCidade} - {cidade.nomeProvincia}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="estado"
                  value={currentVaga.estado}
                  onChange={handleChange}
                >
                  <option value="Aberto">Aberto</option>
                  <option value="Fechado">Fechado</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Salvar Alterações
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Adicionar Nova Vaga */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Nova Vaga</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Área da Vaga</Form.Label>
              <Form.Control
                type="text"
                name="area_vaga"
                value={novaVaga.area_vaga || ''}
                onChange={handleNovaVagaChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Requisitos</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="Requisitos"
                value={novaVaga.Requisitos || ''}
                onChange={handleNovaVagaChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Prazo (dias)</Form.Label>
              <Form.Control
                type="number"
                name="prazo"
                value={novaVaga.prazo || 30}
                onChange={handleNovaVagaChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cidade</Form.Label>
              <Form.Select
                name="idCidade"
                value={novaVaga.idCidade || 0}
                onChange={handleNovaVagaChange}
                required
              >
                <option value="">Selecione uma cidade</option>
                {cidades.map((cidade) => (
                  <option key={cidade.idCidade} value={cidade.idCidade}>
                    {cidade.nomeCidade} - {cidade.nomeProvincia}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAddVaga}>
            Adicionar Vaga
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}