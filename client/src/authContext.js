import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode  } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Función para manejar el login
  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(userData));
    setUser(userData);
    setLoading(false); // Detener la carga después del login
    navigate('/user');
  };

  // Función para manejar el logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUser(null);
    setLoading(false); // Detener la carga después del logout
    navigate('/ingresar');
  };

  // Verificar el token cuando se carga la página
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token desde localStorage:", token);
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log("Usuario desde localStorage:", usuario);
    if (token && usuario) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Token decodificado:", decodedToken);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          logout(); // Si el token ha expirado, cerrar sesión
        } else {
          const usuario = JSON.parse(localStorage.getItem('usuario')) || decodedToken;
          setUser(usuario); 
        }
      } catch (error) {
        console.error("Token inválido:", error);
        logout();
      }
    }
    setLoading(false); // Detener la carga, independientemente del resultado
  }, []);

  if (loading) {
    return <p>Cargando...</p>; // Mostrar "Cargando" mientras se verifica el token
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);