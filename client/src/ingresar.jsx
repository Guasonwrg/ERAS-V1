import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../src/Styles/LoginPage.css'; 
import { useAuth } from './authContext'; 
import { GoogleLogin } from '@react-oauth/google';
import { toast, ToastContainer } from 'react-toastify'; // Importar React-Toastify
import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {
  const [Email, setEmail] = useState('');
  const [Contraseña, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/ingresar', {
        Email,
        Contraseña,
      });
  
      const { token, user, tieneCambiosPendientes } = response.data;
      //console.log(tieneCambiosPendientes);
  
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(user));
        login(user, token);
  
        // Verificar si el usuario es Admin y si hay cambios pendientes
        if (user.Rol === 'Admin' && tieneCambiosPendientes) {
          toast.info('Tienes cambios pendientes por revisar. Haz clic para verlos.', {
            onClick: () => navigate('/cambios-pendientes'),
            autoClose: false,
          });
        } else {
          navigate('/user'); // Redirigir al perfil si no hay cambios pendientes o el usuario no es Admin
        }
      } else {
        console.error('No se recibió token');
      }
    } catch (err) {
      //console.error(err);
      if (err.response && err.response.status === 401) {
        setError('Contraseña incorrecta');
      } else if (err.response && err.response.status === 404) {
        setError('Usuario no encontrado');
      } else {
        setError('Error en el servidor');
      }
    }
  };
  

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;

      const response = await axios.post('http://localhost:5000/api/users/google-login', {
        token: credential,
      });

      const { token, user, tieneCambiosPendientes } = response.data;
      //console.log(tieneCambiosPendientes);
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(user));
      login(user, token);

      if (user.Rol === 'Admin' && tieneCambiosPendientes) {
        toast.info('Tienes cambios pendientes por revisar. Haz clic para verlos.', {
          onClick: () => navigate('/cambios-pendientes'),
          autoClose: false,
        });
      } else {
        navigate('/user'); 
      }
    } catch (err) {
      //console.error("Error en la autenticación con Google:", err);
      setError('Error en la autenticación con Google');
    }
  };

  return (
    <div className="login-page-body">
      <ToastContainer /> {/* Contenedor para las notificaciones */}
      <div className="login-box text-center">
        <div className="login-header">
          <h2 className="text-success fw-bold">Ingresar</h2>
          <p className="text-success">Ingrese su email y contraseña para ingresar</p>
        </div>
        <div className="login-form mt-4">
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="form-group mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="email@latitud.org.uy"
              aria-label="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="********"
              aria-label="Password"
              value={Contraseña}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary w-100" onClick={handleLogin}>
              Iniciar sesión
            </button>
          </div>
          <div className="mt-3">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => setError('Error en la autenticación con Google')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
