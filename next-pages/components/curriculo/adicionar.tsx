import { useState } from 'react';

export function AddCurriculo() {
  const [form, setForm] = useState({
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
      const res = await fetch('/curriculo/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tb_candidato_usuario: Number(form.tb_candidato_usuario),
          Titulo: form.Titulo,
          anexo: form.anexo,
          idVaga: Number(form.idVaga),
        }),
      });
      if (!res.ok) throw new Error('Falha ao adicionar currículo');
      await res.json();
      setMessage('Currículo adicionado com sucesso!');
      setForm({ tb_candidato_usuario: '', Titulo: '', anexo: '', idVaga: '' });
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
      <button type="submit">Adicionar</button>
      {message && <p>{message}</p>}
    </form>
  );
}
