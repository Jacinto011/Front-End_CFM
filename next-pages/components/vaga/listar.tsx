'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';

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

export default function ListarVagas() {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [vagaSelecionada, setVagaSelecionada] = useState<Vaga | null>(null);

  const router = useRouter();

  // Função para verificar se a vaga está dentro do prazo
  const verificarPrazoVaga = (dataAdd: string, prazoDias: number): boolean => {
    const dataAdicao = new Date(dataAdd);
    const dataLimite = new Date(dataAdicao);
    dataLimite.setDate(dataAdicao.getDate() + prazoDias);
    const hoje = new Date();
    
    return hoje <= dataLimite;
  };

  // Atualiza o estado das vagas baseado no prazo
  const atualizarEstadoVagas = (vagas: Vaga[]): Vaga[] => {
    return vagas.map(vaga => {
      const dentroDoPrazo = verificarPrazoVaga(vaga.dataAdd, vaga.prazo);
      return {
        ...vaga,
        estado: dentroDoPrazo ? 'Aberto' : 'Fechado'
      };
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/vaga', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer `, // Adicione o token real aqui
        },
      });

      if (!response.ok) throw new Error('Erro ao buscar dados.');

      const result = await response.json();
      console.log('Vagas Disponiveis', result);
      
      // Atualiza o estado das vagas baseado no prazo
      const vagasAtualizadas = atualizarEstadoVagas(result);
      setVagas(vagasAtualizadas);
    } catch (error) {
      console.error('Erro:', error);
      setError('Erro ao buscar dados.');
    } finally {
      setLoading(false);
    }
  };

  const submeterCandidatura = (id: number) => {
    router.push(`/submissao?id=${id}`);
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Vagas Disponíveis</h2>

      {error && <p className="text-danger text-center">{error}</p>}
      {loading && <p className="text-center">Carregando...</p>}

      <Row xs={1} md={2} lg={3} className="g-4">
        {vagas.map((vaga) => (
          <Col key={vaga.idVaga}>
            <Card onClick={() => setVagaSelecionada(vaga)} className="h-100 cursor-pointer">
              <Card.Body>
                <Card.Title>{vaga.area_vaga}</Card.Title>
                <Card.Text>
                  <strong>Prazo:</strong> {vaga.prazo} dias <br />
                  <strong>Cidade:</strong> {vaga.nomeCidade} <br />
                  <strong>Estado:</strong>{' '}
                  <span className={`badge ${vaga.estado === 'Aberto' ? 'bg-success' : 'bg-secondary'}`}>
                    {vaga.estado}
                  </span>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal de Detalhes da Vaga */}
      <Modal
        show={!!vagaSelecionada}
        onHide={() => setVagaSelecionada(null)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Detalhes da Vaga</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {vagaSelecionada && (
            <>
              <p><strong>Área:</strong> {vagaSelecionada.area_vaga}</p>
              <p><strong>Requisitos:</strong><br />{vagaSelecionada.Requisitos}</p>
              <p><strong>Prazo:</strong> {vagaSelecionada.prazo} dias</p>
              <p><strong>Cidade:</strong> {vagaSelecionada.nomeCidade}</p>
              <p><strong>Estado:</strong> {vagaSelecionada.estado}</p>
              <p><strong>Data de Adição:</strong> {new Date(vagaSelecionada.dataAdd).toLocaleDateString()}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setVagaSelecionada(null)}>
            Fechar
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (vagaSelecionada) {
                submeterCandidatura(vagaSelecionada.idVaga);
              }
            }}
            disabled={vagaSelecionada?.estado === 'Fechado'}
          >
            Submeter Candidatura
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}