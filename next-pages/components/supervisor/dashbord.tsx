// pages/supervisor/dashbord.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  FaUserCog,
  FaChalkboardTeacher,
  FaClipboardList,
  FaListAlt
} from 'react-icons/fa';

import ProtectedRoute from '../../components/ProtectedRoute';
import { useUserContext } from '../../context/UserContext';
import { ROLES } from '../../src/utils/roleUtils';
import type { UserContextProps } from '../../context/UserContext';



export default function Dashbord() {
  const { user } = useUserContext() as UserContextProps;
  const router = useRouter();
  const [activeLink, setActiveLink] = useState('gestaoEstagiarios');

  return (
    <ProtectedRoute rolesAllowed={[ROLES.SUPERVISOR]} userRole={user?.roles[0]}>
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div
            className="col-md-3 bg-light p-4"
            style={{
              minHeight: '100vh',
              borderRight: '2px solid #ddd',
              maxWidth: '300px',
            }}
          >
            <h4 className="mb-4 text-center">Dashboard Supervisor</h4>
            <div className="list-group">
              <button
                className={`list-group-item list-group-item-action ${activeLink === 'gestaoEstagiarios' ? 'active' : ''}`}
                onClick={() => setActiveLink('gestaoEstagiarios')}
              >
                <FaUserCog className="me-2" />
                Gestão de Estagiários
              </button>
              <button
                className={`list-group-item list-group-item-action ${activeLink === 'avaliacoes' ? 'active' : ''}`}
                onClick={() => setActiveLink('avaliacoes')}
              >
                <FaChalkboardTeacher className="me-2" />
                Avaliações
              </button>
              <button
                className={`list-group-item list-group-item-action ${activeLink === 'vagas' ? 'active' : ''}`}
                onClick={() => setActiveLink('vagas')}
              >
                <FaListAlt className="me-2" />
                Vagas de Estágio
              </button>
              <button
                className={`list-group-item list-group-item-action ${activeLink === 'relatorios' ? 'active' : ''}`}
                onClick={() => setActiveLink('relatorios')}
              >
                <FaClipboardList className="me-2" />
                Relatórios
              </button>
            </div>
          </div>

          {/* Conteúdo Principal */}
          <div className="col-md-9 p-5">
            <h3 className="mb-4">Bem-vindo ao Dashboard, Supervisor!</h3>

            {activeLink === 'gestaoEstagiarios' && (
              <div>
                <h5>Gestão de Estagiários</h5>
                <p>Aqui você pode gerenciar os estagiários e suas informações.</p>
                <button
                  className="btn btn-success"
                  onClick={() => router.push('/supervisor/gestaoEstagiarios')}
                >
                  Gerenciar Estagiários
                </button>
              </div>
            )}

            {activeLink === 'avaliacoes' && (
              <div>
                <h5>Avaliações</h5>
                <p>Aqui você pode avaliar os estagiários.</p>
                <button
                  className="btn btn-primary"
                  onClick={() => router.push('/supervisor/avaliacoes')}
                >
                  Avaliar Estagiário
                </button>
              </div>
            )}

            {activeLink === 'vagas' && (
              <div>
                <h5>Vagas de Estágio</h5>
                <p>Aqui você pode ver as vagas abertas para os estagiários.</p>
                <button
                  className="btn btn-info"
                  onClick={() => router.push('/supervisor/vagas')}
                >
                  Ver Vagas
                </button>
              </div>
            )}

            {activeLink === 'relatorios' && (
              <div>
                <h5>Relatórios</h5>
                <p>Aqui você pode acessar os relatórios gerenciais.</p>
                <button
                  className="btn btn-warning"
                  onClick={() => router.push('/supervisor/relatorios')}
                >
                  Ver Relatórios
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
