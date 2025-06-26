// pages/admin/gerenciar-candidatos.tsx
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface Candidato {
    idCurriculo: number;
    tb_candidato_usuario: number;
    nome: string;
    apelido: string;
    email: string;
    contato1: string;
    contato2: string;
    urlImage: string;
    idVaga: number;
    area_vaga: string;
    Requisitos: string;
    prazo: number;
    Titulo: string;
    anexo: string;
    estado: string;
}

export default function GerenciarCandidatos() {
    const [data, setData] = useState<Candidato[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [currentCandidato, setCurrentCandidato] = useState<Candidato | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/candidato', {
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

    const handleShowDetails = (candidato: Candidato) => {
        setCurrentCandidato(candidato);
        setShowModal(true);
    };

    const handleUpdateStatus = async (novoEstado: string) => {
        if (!currentCandidato) return;

        try {
            const response = await fetch(`/api/candidato/${currentCandidato.idCurriculo}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer `, // Adicione o token no cabeçalho
                },
                body: JSON.stringify({ estado: novoEstado }),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar status do candidato.');
            }

            // Atualiza a lista após mudança de status
            fetchData();
            setShowModal(false);
        } catch (error) {
            console.error('Erro ao atualizar candidato:', error);
            setError('Erro ao atualizar candidato. Tente novamente.');
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
            <h2 className="mb-4">Gerenciar Candidatos</h2>

            <div className="mb-3">
                <Link href="/" className="btn btn-secondary">← Voltar ao Dashboard</Link>
            </div>

            <div className="card p-4 shadow-sm">
                <h5 className="card-title mb-3">Lista de Candidatos</h5>
                <p className="text-muted">Clique em um candidato para ver detalhes e gerenciar a candidatura.</p>

                {data.length === 0 ? (
                    <div className="alert alert-info">Nenhum candidato encontrado.</div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-bordered mt-3">
                            <thead className="table-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Apelido</th>
                                    <th>Email</th>
                                    <th>Área da Vaga</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((candidato) => (
                                    <tr 
                                        key={candidato.idCurriculo} 
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleShowDetails(candidato)}
                                    >
                                        <td>{candidato.idCurriculo}</td>
                                        <td>{candidato.nome}</td>
                                        <td>{candidato.apelido}</td>
                                        <td>{candidato.email}</td>
                                        <td>{candidato.area_vaga}</td>
                                        <td>
                                            <span className={`badge ${
                                                candidato.estado === 'aprovado' ? 'bg-success' :
                                                candidato.estado === 'recusado' ? 'bg-danger' : 'bg-warning'
                                            }`}>
                                                {candidato.estado}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal de Detalhes do Candidato */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Detalhes do Candidato</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentCandidato && (
                        <div className="row">
                            <div className="col-md-6">
                                <h5>Informações Pessoais</h5>
                                <p><strong>Nome Completo:</strong> {currentCandidato.nome} {currentCandidato.apelido}</p>
                                <p><strong>Email:</strong> {currentCandidato.email}</p>
                                <p><strong>Contato 1:</strong> {currentCandidato.contato1}</p>
                                {currentCandidato.contato2 && <p><strong>Contato 2:</strong> {currentCandidato.contato2}</p>}
                                
                                <h5 className="mt-4">Informações da Vaga</h5>
                                <p><strong>Área:</strong> {currentCandidato.area_vaga}</p>
                                <p><strong>Título:</strong> {currentCandidato.Titulo}</p>
                                <p><strong>Requisitos:</strong> {currentCandidato.Requisitos}</p>
                            </div>
                            <div className="col-md-6">
                                <h5>Documentos</h5>
                                {currentCandidato.anexo && (
                                    <p>
                                        <strong>Currículo:</strong> 
                                        <a href={currentCandidato.anexo} target="_blank" rel="noopener noreferrer" className="ms-2">
                                            Visualizar Currículo
                                        </a>
                                    </p>
                                )}
                                {currentCandidato.urlImage && (
                                    <div className="mt-3">
                                        <strong>Foto:</strong>
                                        <div className="mt-2">
                                            <img 
                                                src={currentCandidato.urlImage} 
                                                alt="Foto do candidato" 
                                                className="img-thumbnail" 
                                                style={{ maxWidth: '200px' }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex justify-content-between w-100">
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Fechar
                        </Button>
                        <div>
                            <Button 
                                variant="danger" 
                                className="me-2" 
                                onClick={() => handleUpdateStatus('recusado')}
                                disabled={currentCandidato?.estado === 'recusado'}
                            >
                                Recusar Candidatura
                            </Button>
                            <Button 
                                variant="success" 
                                onClick={() => handleUpdateStatus('aprovado')}
                                disabled={currentCandidato?.estado === 'aprovado'}
                            >
                                Aprovar Candidatura
                            </Button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}