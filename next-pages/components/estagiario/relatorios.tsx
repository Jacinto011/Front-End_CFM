import { useUserContext } from '@/context/UserContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Relatorios {
    id_Relatorio: number,
    Titulo: string,
    anexo: string,
    dataAdd: string,
    tb_estagiario_tb_id_usuario: number,
    idAvaliacao: number,
    classificacao: string,
    descricao: string,
    tb_relatorios_id_Relatorio: number
}

export default function Relatorios() {
    const [relatorios, setRelatorios] = useState<Relatorios[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedRelatorio, setSelectedRelatorio] = useState<Relatorios | null>(null);
    const [formData, setFormData] = useState({
        titulo: '',
        anexo: null as File | null
    });
    const router = useRouter();
    const { user } = useUserContext();

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/relatorios?id=${user?.sub}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer `, // Adicione o token real aqui
                },
            });

            if (!response.ok) throw new Error('Erro ao buscar relatorios.');

            const result = await response.json();
            console.log('Relatorios:', result);
            
            setRelatorios(result);
        } catch (error) {
            console.error('Erro:', error);
            setError('Erro ao buscar relatorios.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({
                ...formData,
                anexo: e.target.files[0]
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('titulo', formData.titulo);
            if (formData.anexo) {
                formDataToSend.append('anexo', formData.anexo);
            }
            formDataToSend.append('userId', user?.sub?.toString() || '');

            const response = await fetch('/api/relatorios', {
                method: 'POST',
                body: formDataToSend,
                headers: {
                    Authorization: `Bearer `, // Adicione o token real aqui
                },
            });

            if (!response.ok) throw new Error('Erro ao enviar relatório.');

            const result = await response.json();
            console.log('Relatório enviado:', result);
            
            // Atualiza a lista de relatórios
            fetchData();
            setShowModal(false);
            setFormData({
                titulo: '',
                anexo: null
            });
        } catch (error) {
            console.error('Erro:', error);
            setError('Erro ao enviar relatório.');
        }
    };

    const handleViewDetails = (relatorio: Relatorios) => {
        setSelectedRelatorio(relatorio);
        setShowDetailsModal(true);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-9 p-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3>Relatórios Submetidos</h3>
                        <button 
                            className="btn btn-primary"
                            onClick={() => setShowModal(true)}
                        >
                            Adicionar Relatório
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Carregando...</span>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="alert alert-danger">{error}</div>
                    ) : relatorios.length === 0 ? (
                        <div className="alert alert-info">Nenhum relatório encontrado.</div>
                    ) : (
                        relatorios.map((relatorio, idx) => (
                            <div key={idx} className="border p-3 mb-3">
                                <h5>{relatorio.Titulo}</h5>
                                <p>Data: {new Date(relatorio.dataAdd).toLocaleDateString()}</p>
                                <p>Status: {relatorio.classificacao || 'Em análise'}</p>
                                <button 
                                    className="btn btn-info"
                                    onClick={() => handleViewDetails(relatorio)}
                                >
                                    Ver Detalhes
                                </button>
                            </div>
                        ))
                    )}

                    <button 
                        className="btn btn-secondary mt-4" 
                        onClick={() => router.push('/')}
                    >
                        Voltar ao Dashboard
                    </button>
                </div>
            </div>

            {/* Modal para adicionar relatório */}
            {showModal && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Adicionar Relatório</h5>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="titulo" className="form-label">Título</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="titulo"
                                            name="titulo"
                                            value={formData.titulo}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="anexo" className="form-label">Anexo</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="anexo"
                                            name="anexo"
                                            onChange={handleFileChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary" 
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Enviar Relatório
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para ver detalhes */}
            {showDetailsModal && selectedRelatorio && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Detalhes do Relatório</h5>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => setShowDetailsModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <h4>{selectedRelatorio.Titulo}</h4>
                                <p><strong>Data:</strong> {new Date(selectedRelatorio.dataAdd).toLocaleDateString()}</p>
                                <p><strong>Status:</strong> {selectedRelatorio.classificacao || 'Em análise'}</p>
                                {selectedRelatorio.descricao && (
                                    <p><strong>Descrição:</strong> {selectedRelatorio.descricao}</p>
                                )}
                                {selectedRelatorio.anexo && (
                                    <div>
                                        <p><strong>Anexo:</strong></p>
                                        <a 
                                            href={`/public/${selectedRelatorio.anexo}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="btn btn-outline-primary"
                                        >
                                            Visualizar Arquivo
                                        </a>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary" 
                                    onClick={() => setShowDetailsModal(false)}
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}