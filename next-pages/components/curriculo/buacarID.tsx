import { useState } from 'react';

interface Curriculo {
  idCurriculo: number;
  tb_candidato_usuario: number;
  Titulo: string;
  anexo: string;
  idVaga: number;
}

export function BuscarCurriculoPorId() {
  const [id, setId] = useState('');
  const [curriculo, setCurriculo] = useState<Curriculo | null>(null);
  const [error, setError] = useState('');

  async function handleBuscar() {
    if (!id) {
      setError('Informe o ID do currículo');
      setCurriculo(null);
      return;
    }

    try {
      const res = await fetch(`/curriculo/${id}`);
      if (!res.ok) throw new Error('Currículo não encontrado');
      const data: Curriculo = await res.json();
      setCurriculo(data);
      setError('');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro desconhecido');
      }
      setCurriculo(null);
    }
  }

  return (
    <div>
      <input
        type="number"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="ID do Currículo"
      />
      <button onClick={handleBuscar}>Buscar</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {curriculo && (
        <div>
          <p>ID: {curriculo.idCurriculo}</p>
          <p>Título: {curriculo.Titulo}</p>
          <p>Candidato: {curriculo.tb_candidato_usuario}</p>
          <p>Anexo: {curriculo.anexo}</p>
          <p>ID Vaga: {curriculo.idVaga}</p>
        </div>
      )}
    </div>
  );
}
