// pages/admin/gerenciar-estagiarios.js
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface TableData {
    id_usuario: string,
    nome: string,
    apelido: string,
    email: string,
    nomeCidade: string,
    periodo: string,
    remunerado: string,
    estado: string,
    contato1: string,
    contato2: string
}

export default function GerenciarEstagiarios() {
  const [data, setData] = useState<TableData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentEstagiario, setCurrentEstagiario] = useState<TableData | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [estagiarioToDelete, setEstagiarioToDelete] = useState<string | null>(null);

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

  const handleEdit = (estagiario: TableData) => {
    setCurrentEstagiario(estagiario);
    setShowModal(true);
  };

  const handleDeleteClick = (id: string) => {
    setEstagiarioToDelete(id);
    setDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!estagiarioToDelete) return;
    
    try {
      const response = await fetch(`/api/estagiario/${estagiarioToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer `, // Adicione o token no cabeçalho
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir estagiário.');
      }

      // Atualiza a lista após exclusão
      fetchData();
      setDeleteConfirm(false);
      setEstagiarioToDelete(null);
    } catch (error) {
      console.error('Erro ao excluir estagiário:', error);
      setError('Erro ao excluir estagiário. Tente novamente.');
    }
  };

  const handleSave = async () => {
    if (!currentEstagiario) return;
    
    try {
      const response = await fetch(`/api/estagiario/${currentEstagiario.id_usuario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer `, // Adicione o token no cabeçalho
        },
        body: JSON.stringify(currentEstagiario),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar estagiário.');
      }

      // Atualiza a lista após edição
      fetchData();
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao atualizar estagiário:', error);
      setError('Erro ao atualizar estagiário. Tente novamente.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentEstagiario) return;
    
    setCurrentEstagiario({
      ...currentEstagiario,
      [e.target.name]: e.target.value
    });
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
      <h2 className="mb-4">Gerenciar Estagiários</h2>

      <div className="mb-3">
        <Link href="/admin/dashbord" className="btn btn-secondary">← Voltar ao Dashboard</Link>
      </div>

      <div className="card p-4 shadow-sm">
        <h5 className="card-title mb-3">Lista de Estagiários</h5>
        <p className="text-muted">Aqui você poderá visualizar, editar e remover estagiários cadastrados.</p>

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
                  <th>Remunerado</th>
                  <th>Estado</th>
                  <th>Contatos</th>
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
                    <td>{estagiario.remunerado}</td>
                    <td>{estagiario.estado}</td>
                    <td>
                      <div>{estagiario.contato1}</div>
                      {estagiario.contato2 && <div>{estagiario.contato2}</div>}
                    </td>
                    <td>
                      <button 
                        className="btn btn-sm btn-warning me-2" 
                        onClick={() => handleEdit(estagiario)}
                      >
                        Editar
                      </button>
                      <button 
                        className="btn btn-sm btn-danger" 
                        onClick={() => handleDeleteClick(estagiario.id_usuario)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de Edição */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Estagiário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentEstagiario && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={currentEstagiario.nome}
                  onChange={handleChange}
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Apelido</Form.Label>
                <Form.Control
                  type="text"
                  name="apelido"
                  value={currentEstagiario.apelido}
                  onChange={handleChange}
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={currentEstagiario.email}
                  onChange={handleChange}
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Cidade</Form.Label>
                <Form.Control
                  type="text"
                  name="nomeCidade"
                  value={currentEstagiario.nomeCidade}
                  onChange={handleChange}
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Período</Form.Label>
                <Form.Control
                  type="text"
                  name="periodo"
                  value={currentEstagiario.periodo}
                  onChange={handleChange}
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Remunerado</Form.Label>
                <Form.Select
                  name="remunerado"
                  value={currentEstagiario.remunerado}
                  onChange={(e) => handleChange(e as any)}
                >
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </Form.Select>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  name="estado"
                  value={currentEstagiario.estado}
                  onChange={(e) => handleChange(e as any)}
                >
                  <option value="Em estagio">Em estágio</option>
                  <option value="Finalizado">Finalizado</option>
                  <option value="Cancelado">Cancelado</option>
                </Form.Select>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Contato 1</Form.Label>
                <Form.Control
                  type="text"
                  name="contato1"
                  value={currentEstagiario.contato1}
                  onChange={handleChange}
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Contato 2</Form.Label>
                <Form.Control
                  type="text"
                  name="contato2"
                  value={currentEstagiario.contato2}
                  onChange={handleChange}
                />
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

      {/* Modal de Confirmação de Exclusão */}
      <Modal show={deleteConfirm} onHide={() => setDeleteConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir este estagiário? Esta ação não pode ser desfeita.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteConfirm(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Confirmar Exclusão
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}