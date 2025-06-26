import { useRouter } from 'next/router';
import Link from 'next/link';
import ProtectedRoute from '../../components/ProtectedRoute';
import { hasRequiredRole } from '../../src/utils/auth';
import { ROLES } from '../../src/utils/roleUtils';
import { useContext } from 'react';
import { UserContext } from '../../src/contexts/UserContext';
import { useRoleValidator } from '../../hooks/useRoleValidator';
import { useUserContext } from '@/context/UserContext';

export default function AdminDashbord() {
const { user } = useUserContext();
  const hasAccess = useRoleValidator(['admin']);

  if (!hasAccess) {
    return <p>Verificando acesso...</p>;
  }

  return (
    <ProtectedRoute rolesAllowed={[ROLES.ADMIN]} userRole={user?.roles}>
      <div className="container d-flex flex-column align-items-center min-vh-100 py-5">
        <div className="w-100" style={{ maxWidth: '900px' }}>
          <h2 className="text-center mb-4">Dashboard do Administrador</h2>

          <div className="row g-4">
            <div className="col-12">
              <div className="card p-4 shadow-sm">
                <h5 className="card-title">Gerenciar Estagiários</h5>
                <p className="card-text">Acesse, edite e gerencie os estagiários registrados no sistema.</p>
                <Link href="/admin/gerenciar-estagiarios" legacyBehavior>
                  <a className="btn btn-primary w-100">Ir para Gerenciamento de Estagiários</a>
                </Link>
              </div>
            </div>

            <div className="col-12">
              <div className="card p-4 shadow-sm">
                <h5 className="card-title">Gerenciar Supervisores</h5>
                <p className="card-text">Acesse, edite e gerencie os supervisores do sistema.</p>
                <Link href="/admin/gerenciar-supervisores" legacyBehavior>
                  <a className="btn btn-success w-100">Ir para Gerenciamento de Supervisores</a>
                </Link>
              </div>
            </div>

            <div className="col-12">
              <div className="card p-4 shadow-sm">
                <h5 className="card-title">Gerenciar Vagas</h5>
                <p className="card-text">Adicione, edite ou exclua vagas para os estagiários.</p>
                <Link href="/admin/gerenciar-vagas" legacyBehavior>
                  <a className="btn btn-warning w-100">Ir para Gerenciamento de Vagas</a>
                </Link>
              </div>
            </div>

            <div className="col-12">
              <div className="card p-4 shadow-sm">
                <h5 className="card-title">Relatórios</h5>
                <p className="card-text">Acesse os relatórios de atividades dos estagiários e supervisores.</p>
                <Link href="/admin/relatorios" legacyBehavior>
                  <a className="btn btn-info w-100">Ir para Relatórios</a>
                </Link>
              </div>
            </div>

            <div className="col-12">
              <div className="card p-4 shadow-sm">
                <h5 className="card-title">Configurações do Sistema</h5>
                <p className="card-text">Ajuste configurações gerais do sistema.</p>
                <Link href="/admin/configuracoes" legacyBehavior>
                  <a className="btn btn-secondary w-100">Ir para Configurações</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
