import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './authContext'; // Asegúrate de tener el contexto de autenticación

const GoogleCallback = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Función para autenticar al usuario

  useEffect(() => {
    // Obtén el código de autorización de la URL
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    const handleGoogleLogin = async () => {
      try {
        // Envía el código al backend para obtener el token
        const response = await axios.post('http://localhost:5000/api/users/google-login', { code });

        const { token, user } = response.data;

        // Guarda el token y autentica al usuario
        localStorage.setItem('token', token);
        login(user);

        // Redirige al perfil del usuario
        navigate('/user');
      } catch (error) {
        console.error('Error durante la autenticación con Google:', error);
        navigate('/ingresar'); // Redirige al login si hay error
      }
    };

    if (code) {
      handleGoogleLogin();
    }
  }, [login, navigate]);

  return <p>Autenticando con Google...</p>;
};

export default GoogleCallback;
