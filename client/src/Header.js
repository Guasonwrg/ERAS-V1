import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './authContext'; // Asegúrate de importar correctamente el contexto de autenticación

function Header() {
  const { user, logout } = useAuth(); // Obtén el usuario del contexto de autenticación y la función de logout

  return (
    <header className="header">
      <Link to="/" className="logo-link">
        <img src="/images/logo-2.png" alt="Logo" className="logo" />
      </Link>
      <nav className="menu">
        {/* Mostrar siempre Formularios e Informes */}
        <Link to="/formularios-vista" className="menu-item">Formularios</Link>
        <Link to="/informes-ocupacional" className="menu-item">Informes</Link>
        {/* Mostrar Usuarios solo si el rol es admin */}
        {user?.Rol === 'Admin' && (
          <>
            <Link to="/usuarios" className="menu-item">Usuarios</Link>
            <Link to="/pesticidas-abm" className="menu-item">Pesticidas</Link>
          </>
        )}
      </nav>
      <div className="auth-actions">
        {/* Mostrar el perfil si el usuario está logueado */}
        {user ? (
          <>
            <Link to="/user" className="menu-item">Perfil</Link>
            <button onClick={logout} className="btn btn-logout">Cerrar sesión</button>
          </>
        ) : (
          <Link to="/ingresar" className="btn btn-primary w-100">Iniciar sesión</Link>
        )}
      </div>
    </header>
  );
}

export default Header;

