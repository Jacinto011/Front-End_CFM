import { useState, useCallback } from 'react';

type UpdateVagaDto = {
  idVaga: number;
  area_vaga: string;
  Requisitos: string;
  prazo: number;
  cidade_idCidade: number;
  estado: 'Aberto' | 'Fechado';
};

const styles = {
  form: {
    maxWidth: '480px',
    margin: '3rem auto',
    padding: '2rem 2.5rem',
    backgroundColor: '#f8fdf7',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#034d32',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.25rem',
  },
  heading: {
    textAlign: 'center' as const,
    marginBottom: '1.5rem',
    fontWeight: 700,
    fontSize: '1.8rem',
    color: '#046a38',
    textTransform: 'uppercase' as const,
    letterSpacing: '1.5px',
  },
  label: {
    fontWeight: 600,
    marginBottom: '0.25rem',
    display: 'block',
    fontSize: '0.9rem',
    color: '#0b3c1a',
  },
  input: {
    width: '100%',
    padding: '0.65rem 1rem',
    border: '2px solid #a3d9a5',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease',
    backgroundColor: 'white',
    color: '#034d32',
    minHeight: '36px',
    resize: 'vertical' as const,
    outline: 'none',
  },
  textarea: {
    minHeight: '80px',
  },
  inputFocus: {
    borderColor: '#2f8f44',
    boxShadow: '0 0 6px #60b755aa',
    backgroundColor: '#eaf6e8',
  },
  button: {
    marginTop: '1rem',
    padding: '0.8rem 0',
    backgroundColor: '#2f8f44',
    color: 'white',
    fontWeight: 700,
    fontSize: '1.1rem',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.25s ease',
    boxShadow: '0 4px 8px #2f8f4499',
  },
  buttonDisabled: {
    backgroundColor: '#8fbf94',
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  message: {
    marginTop: '1rem',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    fontWeight: 600,
    textAlign: 'center' as const,
    fontSize: '1rem',
  },
  success: {
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb',
  },
  error: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
  },
};

export default function AtualizarVaga() {
  const [form, setForm] = useState<UpdateVagaDto>({
    idVaga: 0,
    area_vaga: '',
    Requisitos: '',
    prazo: 0,
    cidade_idCidade: 0,
    estado: 'Aberto',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Debounce para evitar múltiplos envios em sequência rápida
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (loading) return;

      // Validação simples
      if (
        form.idVaga <= 0 ||
        form.area_vaga.trim() === '' ||
        form.Requisitos.trim() === '' ||
        form.prazo < 0 ||
        form.cidade_idCidade <= 0
      ) {
        setError(true);
        setMessage('Por favor, preencha todos os campos corretamente.');
        return;
      }

      setLoading(true);
      setError(false);
      setMessage('');

      try {
        const res = await fetch('/api/vaga', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error('Falha ao atualizar vaga');
        setMessage('Vaga atualizada com sucesso!');
        setForm({
          idVaga: 0,
          area_vaga: '',
          Requisitos: '',
          prazo: 0,
          cidade_idCidade: 0,
          estado: 'Aberto',
        });
      } catch (error) {
        setError(true);
        if (error instanceof Error) setMessage(error.message);
        else setMessage('Erro desconhecido');
      } finally {
        setLoading(false);
      }
    },
    [form, loading]
  );

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === 'idVaga' || name === 'prazo' || name === 'cidade_idCidade'
          ? Number(value)
          : value,
    }));
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={styles.form} aria-label="Formulário para atualizar vaga">
      <h2 style={styles.heading}>Atualizar Vaga</h2>

      <label htmlFor="idVaga" style={styles.label}>
        ID da Vaga
      </label>
      <input
        type="number"
        id="idVaga"
        name="idVaga"
        value={form.idVaga}
        onChange={handleChange}
        placeholder="Digite o ID da vaga"
        min={1}
        required
        aria-describedby="idVagaHelp"
        style={styles.input}
      />

      <label htmlFor="area_vaga" style={styles.label}>
        Área da Vaga
      </label>
      <input
        type="text"
        id="area_vaga"
        name="area_vaga"
        value={form.area_vaga}
        onChange={handleChange}
        placeholder="Exemplo: Tecnologia, Marketing..."
        required
        aria-describedby="areaVagaHelp"
        style={styles.input}
      />

      <label htmlFor="Requisitos" style={styles.label}>
        Requisitos
      </label>
      <textarea
        id="Requisitos"
        name="Requisitos"
        value={form.Requisitos}
        onChange={handleChange}
        placeholder="Descreva os requisitos da vaga"
        required
        aria-describedby="requisitosHelp"
        style={{ ...styles.input, ...styles.textarea }}
      />

      <label htmlFor="prazo" style={styles.label}>
        Prazo (dias)
      </label>
      <input
        type="number"
        id="prazo"
        name="prazo"
        value={form.prazo}
        onChange={handleChange}
        placeholder="Número de dias para candidatura"
        min={0}
        required
        aria-describedby="prazoHelp"
        style={styles.input}
      />

      <label htmlFor="cidade_idCidade" style={styles.label}>
        ID da Cidade
      </label>
      <input
        type="number"
        id="cidade_idCidade"
        name="cidade_idCidade"
        value={form.cidade_idCidade}
        onChange={handleChange}
        placeholder="Digite o ID da cidade"
        min={1}
        required
        aria-describedby="cidadeHelp"
        style={styles.input}
      />

      <label htmlFor="estado" style={styles.label}>
        Estado da Vaga
      </label>
      <select
        id="estado"
        name="estado"
        value={form.estado}
        onChange={handleChange}
        required
        aria-describedby="estadoHelp"
        style={styles.input}
      >
        <option value="Aberto">Aberto</option>
        <option value="Fechado">Fechado</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
        aria-busy={loading}
      >
        {loading ? 'Atualizando...' : 'Atualizar Vaga'}
      </button>

      {message && (
        <p
          role="alert"
          style={{
            ...styles.message,
            ...(error ? styles.error : styles.success),
          }}
        >
          {message}
        </p>
      )}
    </form>
  );
}
