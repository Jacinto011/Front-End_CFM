import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useUserContext } from '@/context/UserContext';

const NavBar = ({ collapsed, setCollapsed, dropProfile, setDropProfile, email, imagem }: any) => {
  const router = useRouter();
  const { logout } = useUserContext();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const dropdownRouter = () => {
    router.push('/usuarios/perfil');
    setDropProfile(false);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        router.push('/auth');
        log();
      } else {
        console.error('Erro ao fazer logout');
      }
    } catch (error) {
      console.error('Erro inesperado no logout:', error);
    }
  };

  const log = () => {
    document.cookie = `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-0 bg-transparent border-0 me-3"
        aria-label="Menu"
        style={{ 
          outline: 'none',
          transform: 'scale(1)',
          transition: 'transform 0.2s',
          cursor: 'pointer',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <div style={{
          width: '24px',
          height: '18px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <span style={{
            height: '3px',
            width: '100%',
            backgroundColor: '#333',
            transform: !collapsed ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            marginBottom: !collapsed ? '-3px' : '5px',
            borderRadius: '2px',
            opacity: !collapsed ? '1' : '1',
            transformOrigin: 'center'
          }}></span>
          
          <span style={{
            height: '3px',
            width: !collapsed ? '0' : '100%',
            backgroundColor: '#333',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            borderRadius: '2px',
            opacity: !collapsed ? '0' : '1',
            alignSelf: !collapsed ? 'flex-end' : 'center'
          }}></span>
          
          <span style={{
            height: '3px',
            width: '100%',
            backgroundColor: '#333',
            transform: !collapsed ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            borderRadius: '2px',
            transformOrigin: 'center'
          }}></span>
        </div>
      </button>

      <div className="navbar-collapse collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item dropdown border-0">
            <button
              onClick={() => setDropProfile(!dropProfile)}
              className="btn nav-link dropdown-toggle border-0 position-relative"
              data-bs-toggle="dropdown"
            >
              <img
                src={imagem}
                className="avatar img-fluid rounded me-1 border-0"
                alt="Perfil"
              />
              <span className="text-dark d-none d-md-inline">{email}</span>
            </button>

            <div 
              className={`dropdown-menu dropdown-menu-end ${dropProfile ? 'show' : ''} position-absolute mt-2`}
              style={{
                right: 0,
                minWidth: '200px' 
              }}
            >
              <button className="dropdown-item" onClick={dropdownRouter}>
                <i className="align-middle me-1" data-feather="user"></i> Meu Perfil
              </button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item">
                <i className="align-middle me-1" data-feather="help-circle"></i> Central de Apoio
              </button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={handleLogout}>
                Sair
              </button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;