import { useEffect } from "react";
import Link from "next/link";
import feather from "feather-icons";

const sidebarLinks = {
  estagiario: [
    { label: 'Dashboard', href: '/', icon: 'home' },
    { label: 'Ver Vagas', href: '/vaga', icon: 'briefcase' },
    { label: 'Minhas Candidaturas', href: '/vaga/minhas-candidaturas', icon: 'clipboard' },
    { label: 'Relatorios de Estagios', href: '/estagiario/relatorios', icon: 'clipboard' },
    { label: 'Avaliação do Supervisor', href: '/estagiario/avaliacoes', icon: 'star' },
  ],
  supervisor: [
    { label: 'Dashboard', href: '/', icon: 'home' },
    { label: 'Avaliar Estagiários', href: '/supervisor/avaliacoes', icon: 'edit' },
    { label: 'Ver Relatórios', href: '/supervisor/relatorios', icon: 'bar-chart-2' },
  ],
  admin: [
    { label: 'Dashboard', href: '/', icon: 'home' },
    { label: 'Gerir Usuários', href: '/usuarios', icon: 'users' },
    { label: 'Gerir Vagas', href: '/admin/gerenciar-vagas', icon: 'file-plus' },
    { label: 'Gerir Supervisores', href: '/admin/gerenciar-supervisores', icon: 'book' },
    { label: 'Gerir Estágios', href: '/admin/gerenciar-estagiarios', icon: 'file-text' },
    { label: 'Gerir Candidatos', href: '/admin/gerenciar-candidatos', icon: 'user' },
  ],
};

const SideBar = ({ collapsed, user, tipoUsuario = [], setCollapsed }: any) => {
  useEffect(() => {
    feather.replace();
  }, []);

  const tipos = Array.isArray(tipoUsuario) ? tipoUsuario : [tipoUsuario];

  return (
    <nav id="sidebar" className={`sidebar js-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-content js-simplebar">
        <Link href="/" className="sidebar-brand">
          <div className="d-flex justify-content-center">
            <img
              src="../img/photos/cfm11.jpg"
              alt="Logo"
              className="img-fluid rounded-circle"
              width="132"
            />
          </div>
          <p className="m-2 d-flex justify-content-center" style={{ color: 'white', fontSize: '16px', fontFamily: 'monospace' }}>{user}</p>
        </Link>

        <ul className="sidebar-nav">
          {tipos.map((tipo, index) => (
            sidebarLinks[tipo] && (
              <div key={index}>
                <li className="sidebar-header">{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</li>
                {sidebarLinks[tipo].map((item, itemIndex) => (
                  <li key={itemIndex} className="sidebar-item" style={{ color: 'white', fontSize: '15px', fontFamily: 'monospace' }}>
                    <Link href={item.href} className="sidebar-link" onClick={() => setCollapsed(false)}>
                      <i className="align-middle" data-feather={item.icon}></i>
                      <span className="align-middle" style={{ color: 'white', fontSize: '12px', fontFamily: 'monospace' }}>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </div>
            )
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default SideBar;
