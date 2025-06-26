import { useState } from 'react';

export function EliminarCurriculo() {
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');

  async function handleDelete() {
    try {
      const res = await fetch(`/curriculo/eliminar/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erro ao eliminar currículo');
      await res.json();
      setMessage('Currículo eliminado com sucesso!');
      setId('');
    } catch (err) {
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage('Erro desconhecido');
      }
    }
  }

  return (
    <div>
      <input
        type="number"
        value={id}
        onChange={e => setId(e.target.value)}
        placeholder="ID do Currículo"
      />
      <button onClick={handleDelete}>Eliminar</button>
      {message && <p>{message}</p>}
    </div>
  );
}
