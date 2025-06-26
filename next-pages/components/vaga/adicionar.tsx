import { useState } from 'react';

type CreateVagaDto = {
  area_vaga: string;
  Requisitos: string;
  prazo: number;
  cidade_idCidade: number;
  estado: 'Aberto' | 'Fechado';
};

const estilo = {
  container: {
    maxWidth: 500,
    margin: '40px auto',
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#f9fdf7', // verde bem clarinho
    boxShadow: '0 4px 12px rgba(0, 128, 0, 0.2)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#004d00',
  },
  titulo: {
    textAlign: 'center' as const,
    marginBottom: 24,
    fontWeight: '700',
    fontSize: 24,
    color: '#2e7d32', // verde escuro
  },
  label: {
    display: 'block',
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    fontSize: 16,
    borderRadius: 6,
    border: '1.5px solid #a5d6a7',
    marginBottom: 16,
    transition: 'border-color 0.3s ease',
    outlineColor: '#2e7d32',
  },
  textarea: {
    width: '100%',
    minHeight: 100,
    padding: '10px 14px',
    fontSize: 16,
    borderRadius: 6,
    border: '1.5px solid #a5d6a7',
    marginBottom: 16,
    resize: 'vertical' as const,
    outlineColor: '#2e7d32',
  },
  select: {
    width: '100%',
    padding: '10px 14px',
    fontSize: 16,
    borderRadius: 6,
    border: '1.5px solid #a5d6a7',
    marginBottom: 24,
    outlineColor: '#2e7d32',
  },
  botao: {
    width: '100%',
    padding: 14,
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    backgroundColor: '#2e7d32',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  botaoHover: {
    backgroundColor: '#1b5e20',
  },
  mensagemSucesso: {
    color: '#2e7d32',
    marginTop: 16,
    fontWeight: '600',
    textAlign: 'center' as const,
  },
  mensagemErro: {
    color: '#b00020',
    marginTop: 16,
    fontWeight: '600',
    textAlign: 'center' as const,
  },
};

export default function AdicionarVaga() {
  const [form, setForm] = useState<CreateVagaDto>({
    area_vaga: '',
    Requisitos: '',
    prazo: 0,
    cidade_idCidade: 0,
    estado: 'Aberto',
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === 'prazo' || name === 'cidade_idCidade' ? Number(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);
    setMessage('');

    try {
      const res = await fetch('/api/vaga', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Falha ao adicionar vaga');
      setMessage('✅ Vaga adicionada com sucesso!');
      setForm({ area_vaga: '', Requisitos: '', prazo: 0, cidade_idCidade: 0, estado: 'Aberto' });
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`❌ ${error.message}`);
      } else {
        setMessage('❌ Erro desconhecido');
      }
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div style={estilo.container}>
      <h1 style={estilo.titulo}>Adicionar Nova Vaga</h1>

      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="area_vaga" style={estilo.label}>
          Área da Vaga
        </label>
        <input
          id="area_vaga"
          name="area_vaga"
          type="text"
          placeholder="Ex: Tecnologia da Informação"
          value={form.area_vaga}
          onChange={handleChange}
          style={estilo.input}
          required
          disabled={isSubmitting}
          autoFocus
        />

        <label htmlFor="Requisitos" style={estilo.label}>
          Requisitos
        </label>
        <textarea
          id="Requisitos"
          name="Requisitos"
          placeholder="Descreva os requisitos para a vaga"
          value={form.Requisitos}
          onChange={handleChange}
          style={estilo.textarea}
          required
          disabled={isSubmitting}
        />

        <label htmlFor="prazo" style={estilo.label}>
          Prazo (em dias)
        </label>
        <input
          id="prazo"
          name="prazo"
          type="number"
          placeholder="Ex: 30"
          min={0}
          value={form.prazo}
          onChange={handleChange}
          style={estilo.input}
          required
          disabled={isSubmitting}
        />

        <label htmlFor="cidade_idCidade" style={estilo.label}>
          ID da Cidade
        </label>
        <input
          id="cidade_idCidade"
          name="cidade_idCidade"
          type="number"
          placeholder="Ex: 101"
          min={0}
          value={form.cidade_idCidade}
          onChange={handleChange}
          style={estilo.input}
          required
          disabled={isSubmitting}
        />

        <label htmlFor="estado" style={estilo.label}>
          Estado da Vaga
        </label>
        <select
          id="estado"
          name="estado"
          value={form.estado}
          onChange={handleChange}
          style={estilo.select}
          required
          disabled={isSubmitting}
        >
          <option value="Aberto">Aberto</option>
          <option value="Fechado">Fechado</option>
        </select>

        <button
          type="submit"
          style={{
            ...estilo.botao,
            ...(isSubmitting ? { opacity: 0.7, cursor: 'not-allowed' } : {}),
          }}
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Adicionar Vaga'}
        </button>

        {message && (
          <p style={isError ? estilo.mensagemErro : estilo.mensagemSucesso}>{message}</p>
        )}
      </form>
    </div>
  );
}
