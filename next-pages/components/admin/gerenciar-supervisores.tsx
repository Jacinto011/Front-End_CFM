import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

type Supervisor = {
    id_usuario: number,
    nome: string,
    apelido: string,
    nomeCidade: string,
    email: string,
    area: string
};

interface UserDetailsProps {
  urlImage: string;
  tb_id_usuario: number;
  nome: string;
  apelido: string;
  email: string;
  contato1: string;
  ano_de_nascimento: string;
  username: string;
  contato2: string;
  nomeCidade: string;
  idCidade: number;
  estadoUsuario: boolean;
}

export default function GerenciarSupervisores() {
  const [supervisores, setSupervisores] = useState<Supervisor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<UserDetailsProps | null>(null);
  const [searchId, setSearchId] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedArea, setSelectedArea] = useState('');
  const [areas, setAreas] = useState<string[]>([]);
  const [editingSupervisor, setEditingSupervisor] = useState<Supervisor | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editArea, setEditArea] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchData();
    fetchAreas();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/supervisor', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer `,
        },
      });

      if (!response.ok) throw new Error('Erro ao buscar dados.');

      const result = await response.json();
      setSupervisores(result);
    } catch (error) {
      console.error('Erro:', error);
      setError('Erro ao buscar dados.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAreas = async () => {
    try {
      const response = await fetch('/api/areas');
      const data = await response.json();
      setAreas(data);
    } catch (error) {
      console.error('Erro ao buscar áreas:', error);
    }
  };

  const fetchUser = async (id: string) => {
    try {
      const response = await fetch(`/api/usuarios?id=${id}`);
      if (!response.ok) throw new Error('Usuário não encontrado');
      
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Erro:', error);
      alert('Usuário não encontrado');
      setUser(null);
    }
  };

  const handleAddSupervisor = async () => {
    if (!user || !selectedArea) {
      alert('Por favor, selecione um usuário e uma área');
      return;
    }

    try {
      const response = await fetch('/api/supervisor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer `,
        },
        body: JSON.stringify({
          tb_id_usuario: user.tb_id_usuario,
          area: selectedArea
        }),
      });

      if (!response.ok) throw new Error('Erro ao adicionar supervisor');

      alert('Supervisor adicionado com sucesso!');
      setShowAddModal(false);
      setUser(null);
      setSelectedArea('');
      setSearchId('');
      fetchData();
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao adicionar supervisor');
    }
  };

  const handleEditar = (supervisor: Supervisor) => {
    setEditingSupervisor(supervisor);
    setEditArea(supervisor.area);
    setShowEditModal(true);
  };

  const handleUpdateSupervisor = async () => {
    if (!editingSupervisor || !editArea) {
      alert('Por favor, selecione uma área');
      return;
    }

    try {
      const response = await fetch(`/api/supervisor?id=${editingSupervisor.id_usuario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer `,
        },
        body: JSON.stringify({
          area: editArea
        }),
      });

      if (!response.ok) throw new Error('Erro ao atualizar supervisor');

      alert('Supervisor atualizado com sucesso!');
      setShowEditModal(false);
      setEditingSupervisor(null);
      setEditArea('');
      fetchData();
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao atualizar supervisor');
    }
  };

  const handleExcluir = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir este supervisor?')) {
      try {
        const response = await fetch(`/api/supervisor?id=${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer `,
          },
        });

        if (!response.ok) throw new Error('Erro ao excluir supervisor');

        alert('Supervisor excluído com sucesso!');
        fetchData();
      } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao excluir supervisor');
      }
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Gerenciar Supervisores</h2>

      <div className="mb-4">
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          Adicionar Supervisor
        </button>
      </div>

      {/* Modal para Adicionar Supervisor */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Supervisor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="searchId" className="form-label">Buscar Usuário por ID</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="searchId"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Digite o ID do usuário"
              />
              <button 
                className="btn btn-outline-secondary" 
                type="button"
                onClick={() => fetchUser(searchId)}
              >
                Buscar
              </button>
            </div>
          </div>

          {user && (
            <>
              <div className="mb-3">
                <h6>Informações do Usuário</h6>
                <p><strong>Nome:</strong> {user.nome} ({user.apelido})</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Cidade:</strong> {user.nomeCidade}</p>
              </div>

              <div className="mb-3">
                <label htmlFor="area" className="form-label">Área</label>
                <select
                  className="form-select"
                  id="area"
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                >
                  <option value="">Selecione uma área</option>
                  {areas.map((area) => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setShowAddModal(false);
            setUser(null);
            setSelectedArea('');
            setSearchId('');
          }}>
            Cancelar
          </Button>
          <Button 
            variant="primary" 
            onClick={handleAddSupervisor}
            disabled={!selectedArea || !user}
          >
            Adicionar como Supervisor
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para Editar Supervisor */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Supervisor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingSupervisor && (
            <>
              <div className="mb-3">
                <h6>Informações do Supervisor</h6>
                <p><strong>Nome:</strong> {editingSupervisor.nome} ({editingSupervisor.apelido})</p>
                <p><strong>Email:</strong> {editingSupervisor.email}</p>
              </div>

              <div className="mb-3">
                <label htmlFor="editArea" className="form-label">Área</label>
                <select
                  className="form-select"
                  id="editArea"
                  value={editArea}
                  onChange={(e) => setEditArea(e.target.value)}
                >
                  <option value="">Selecione uma área</option>
                  {areas.map((area) => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button 
            variant="primary" 
            onClick={handleUpdateSupervisor}
            disabled={!editArea}
          >
            Salvar Alterações
          </Button>
        </Modal.Footer>
      </Modal>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Apelido</th>
              <th>Email</th>
              <th>Cidade</th>
              <th>Área</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {supervisores.map((sup) => (
              <tr key={sup.id_usuario}>
                <td>{sup.id_usuario}</td>
                <td>{sup.nome}</td>
                <td>{sup.apelido}</td>
                <td>{sup.email}</td>
                <td>{sup.nomeCidade}</td>
                <td>{sup.area}</td>
                <td>
                  <button 
                    className="btn btn-sm btn-warning me-2" 
                    onClick={() => handleEditar(sup)}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn btn-sm btn-danger" 
                    onClick={() => handleExcluir(sup.id_usuario)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button className="btn btn-secondary mt-3" onClick={() => router.push('/admin/dashbord')}>
        Voltar ao Dashboard
      </button>
    </div>
  );
}