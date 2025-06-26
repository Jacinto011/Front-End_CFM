import { useState } from 'react';

export function AtualizarCurriculo() {
  const [form, setForm] = useState({
    idCurriculo: '',
    tb_candidato_usuario: '',
    Titulo: '',
    anexo: '',
    idVaga: '',
  });
  const [message, setMessage] = useState('');

  function handleChange(e: { target: { name: string; value: string } }) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    try {
      const res = await fetch('/curriculo/atualizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idCurriculo: Number(form.idCurriculo),
          tb_candidato_usuario: Number(form.tb_candidato_usuario),
          Titulo: form.Titulo,
          anexo: form.anexo,
          idVaga: Number(form.idVaga),
        }),
      });
      if (!res.ok) throw new Error('Falha ao atualizar currículo');
      await res.json();
      setMessage('Currículo atualizado com sucesso!');
    } catch (err) {
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage('Erro desconhecido');
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="idCurriculo"
        value={form.idCurriculo}
        onChange={handleChange}
        placeholder="ID Currículo"
        required
      />
      <input
        name="tb_candidato_usuario"
        value={form.tb_candidato_usuario}
        onChange={handleChange}
        placeholder="ID Candidato"
        required
      />
      <input
        name="Titulo"
        value={form.Titulo}
        onChange={handleChange}
        placeholder="Título"
        required
      />
      <input
        name="anexo"
        value={form.anexo}
        onChange={handleChange}
        placeholder="Anexo"
      />
      <input
        name="idVaga"
        value={form.idVaga}
        onChange={handleChange}
        placeholder="ID Vaga"
        required
      />
      <button type="submit">Atualizar</button>
      {message && <p>{message}</p>}
    </form>
  );
}
