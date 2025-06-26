'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { useUserContext } from '@/context/UserContext';
import { FileEarmarkText, Pencil, XCircle, CheckCircle } from 'react-bootstrap-icons';
import Link from 'next/link';

type Candidatura = {
    idCurriculo: number;
    tb_candidato_usuario: string;
    Titulo: string;
    anexo: string;
    dataAdd: string;
    idVaga: number;
    area_vaga: string;
    Requisitos: string;
    prazo: number;
    nomeCidade: string;
    estado: string;
    statusCandidatura: string;
};

export default function MinhasCandidaturas() {
    const [candidaturas, setCandidaturas] = useState<Candidatura[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [candidaturaSelecionada, setCandidaturaSelecionada] = useState<Candidatura | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [editingCurriculo, setEditingCurriculo] = useState(false);
    const [novoTitulo, setNovoTitulo] = useState('');
    const [novoArquivo, setNovoArquivo] = useState<File | null>(null);
    const { user } = useUserContext();
    const router = useRouter();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/candidato?id=${user?.sub}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer `, // Adicione o token real aqui
                },
            });

            if (!response.ok) throw new Error('Erro ao buscar candidaturas.');

            const result = await response.json();
            setCandidaturas(result);
        } catch (error) {
            console.error('Erro:', error);
            setError('Erro ao buscar candidaturas.');
        } finally {
            setLoading(false);
        }
    };

    const handleAbrirDetalhes = (candidatura: Candidatura) => {
        setCandidaturaSelecionada(candidatura);
        setShowModal(true);
    };

    const handleEditarCurriculo = () => {
        setNovoTitulo(candidaturaSelecionada?.Titulo || '');
        setEditingCurriculo(true);
    };

    const handleCancelarEdicao = () => {
        setEditingCurriculo(false);
        setNovoArquivo(null);
    };

    const handleSalvarEdicao = async () => {
        if (!candidaturaSelecionada) return;

        try {
            const formData = new FormData();
            formData.append('idCurriculo', candidaturaSelecionada.idCurriculo.toString());
            formData.append('Titulo', novoTitulo);
            if (novoArquivo) {
                formData.append('anexo', novoArquivo);
            }

            const response = await fetch('/api/curriculo', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer `, // Adicione o token real aqui
                },
                body: formData,
            });

            if (!response.ok) throw new Error('Erro ao atualizar currículo');

            // Atualizar a lista de candidaturas
            await fetchData();
            setEditingCurriculo(false);
            setNovoArquivo(null);
        } catch (error) {
            console.error('Erro ao atualizar currículo:', error);
            setError('Erro ao atualizar currículo');
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Enviada':
                return <span className="badge bg-primary">{status}</span>;
            case 'Em análise':
                return <span className="badge bg-warning text-dark">{status}</span>;
            case 'Aprovada':
                return <span className="badge bg-success">{status}</span>;
            case 'Rejeitada':
                return <span className="badge bg-danger">{status}</span>;
            default:
                return <span className="badge bg-secondary">{status}</span>;
        }
    };

    return (
        <Container className="mt-5 mb-5">
            <h2 className="mb-4 text-center">Minhas Candidaturas</h2>

            {error && <p className="text-danger text-center">{error}</p>}
            {loading && <p className="text-center">Carregando...</p>}

            {!loading && candidaturas.length === 0 && (
                <div className="text-center">
                    <p>Você ainda não se candidatou a nenhuma vaga.</p>
                    <Link href="/vagas" passHref>
                        <Button variant="primary">Ver Vagas Disponíveis</Button>
                    </Link>
                </div>
            )}

            <Row xs={1} md={2} lg={3} className="g-4">
                {candidaturas.map((candidatura) => (
                    <Col key={`${candidatura.idVaga}-${candidatura.idCurriculo}`}>
                        <Card className="h-100">
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <Card.Title>{candidatura.Titulo}</Card.Title>
                                    {getStatusBadge(candidatura.statusCandidatura)}
                                </div>
                                
                                <div className="d-flex align-items-center mb-3">
                                    <FileEarmarkText size={24} className="me-2 text-primary" />
                                    <span className="text-muted">Currículo enviado</span>
                                </div>
                                
                                <div className="d-flex justify-content-between align-items-center">
                                    <small className="text-muted">
                                        {new Date(candidatura.dataAdd).toLocaleDateString()}
                                    </small>
                                    <Button 
                                        variant="outline-primary" 
                                        size="sm"
                                        onClick={() => handleAbrirDetalhes(candidatura)}
                                    >
                                        Ver detalhes
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Modal de Detalhes da Candidatura */}
            <Modal
                show={showModal}
                onHide={() => {
                    setShowModal(false);
                    setEditingCurriculo(false);
                }}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editingCurriculo ? 'Editar Currículo' : 'Detalhes da Candidatura'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {candidaturaSelecionada && !editingCurriculo && (
                        <>
                            <div className="mb-4">
                                <h5>Vaga</h5>
                                <p><strong>Área:</strong> {candidaturaSelecionada.area_vaga}</p>
                                <p><strong>Cidade:</strong> {candidaturaSelecionada.nomeCidade}</p>
                                <p><strong>Requisitos:</strong><br />{candidaturaSelecionada.Requisitos}</p>
                                <p><strong>Status:</strong> {getStatusBadge(candidaturaSelecionada.statusCandidatura)}</p>
                                <p><strong>Data da Candidatura:</strong> {new Date(candidaturaSelecionada.dataAdd).toLocaleDateString()}</p>
                            </div>
                            
                            <div className="mb-4">
                                <h5>Currículo Enviado</h5>
                                <div className="d-flex align-items-center mb-2">
                                    <FileEarmarkText size={24} className="me-2 text-primary" />
                                    <div>
                                        <p className="mb-0"><strong>Título:</strong> {candidaturaSelecionada.Titulo}</p>
                                        <a 
                                            href={`/uploads/${candidaturaSelecionada.anexo}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-decoration-none"
                                        >
                                            Visualizar currículo
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {editingCurriculo && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Título do Currículo</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={novoTitulo}
                                    onChange={(e) => setNovoTitulo(e.target.value)}
                                />
                            </Form.Group>
                            
                            <Form.Group className="mb-3">
                                <Form.Label>Substituir Arquivo (opcional)</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            setNovoArquivo(e.target.files[0]);
                                        }
                                    }}
                                />
                                <Form.Text className="text-muted">
                                    Formatos aceitos: PDF, DOC, DOCX
                                </Form.Text>
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {!editingCurriculo ? (
                        <>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Fechar
                            </Button>
                            <Button variant="primary" onClick={handleEditarCurriculo}>
                                <Pencil className="me-1" /> Editar Currículo
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="outline-secondary" onClick={handleCancelarEdicao}>
                                <XCircle className="me-1" /> Cancelar
                            </Button>
                            <Button variant="primary" onClick={handleSalvarEdicao}>
                                <CheckCircle className="me-1" /> Salvar Alterações
                            </Button>
                        </>
                    )}
                </Modal.Footer>
            </Modal>
        </Container>
    );
}