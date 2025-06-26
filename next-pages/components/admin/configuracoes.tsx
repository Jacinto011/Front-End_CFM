import { useState } from 'react';
import { useRouter } from 'next/router'; // Importando useRouter

export default function ConfiguracoesSistema() {
  const [prazoRelatorio, setPrazoRelatorio] = useState(7); // dias
  const [cadastroAberto, setCadastroAberto] = useState(true);
  const [emailNotificacoes, setEmailNotificacoes] = useState(false);
  
  const router = useRouter(); // Usando o useRouter para navegação

  const handleSalvar = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    alert('Configurações salvas com sucesso! (mock)');
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Configurações do Sistema</h2>

      <form onSubmit={handleSalvar} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Prazo máximo para envio de relatório (em dias)</label>
          <input
            type="number"
            className="form-control"
            value={prazoRelatorio}
          onChange={(e) => setPrazoRelatorio(parseInt(e.target.value, 10))}
            min={1}
            max={30}
          />
        </div>

        <div className="form-check form-switch mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="cadastroSwitch"
            checked={cadastroAberto}
            onChange={() => setCadastroAberto(!cadastroAberto)}
          />
          <label className="form-check-label" htmlFor="cadastroSwitch">
            Permitir novos cadastros de estagiários
          </label>
        </div>

        <div className="form-check form-switch mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            id="emailSwitch"
            checked={emailNotificacoes}
            onChange={() => setEmailNotificacoes(!emailNotificacoes)}
          />
          <label className="form-check-label" htmlFor="emailSwitch">
            Enviar notificações por email
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-100">Salvar Configurações</button>
      </form>

      {/* Botão de voltar ao dashboard */}
      <button className="btn btn-secondary mt-3" onClick={() => router.push('/admin/dashbord')}>
        Voltar ao Dashboard
      </button>
    </div>
  );
}
