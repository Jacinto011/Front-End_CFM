import { useEffect, useState } from 'react';

interface Curriculo {
  idCurriculo: number;
  tb_candidato_usuario: number;
  Titulo: string;
  anexo: string;
  idVaga: number;
}

export function ListarCurriculos() {
  const [curriculos, setCurriculos] = useState<Curriculo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/curriculo/todos')
      .then(res => {
        if (!res.ok) throw new Error('Erro ao carregar currículos');
        return res.json();
      })
      .then((data: Curriculo[]) => {
        setCurriculos(data);
        setLoading(false);
      })
      .catch(err => {
        if (err instanceof Error) setError(err.message);
        else setError('Erro desconhecido');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <ul>
      {curriculos.map(c => (
        <li key={c.idCurriculo}>
          ID: {c.idCurriculo} - Título: {c.Titulo} - Candidato: {c.tb_candidato_usuario}
        </li>
      ))}
    </ul>
  );
}
