import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../src/Styles/PestView.css'

function VerPesticida() {
  const { id } = useParams();
  const [pesticida, setPesticida] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPesticida = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/pesticidas/pesticida/${id}`);
        setPesticida(response.data);
      } catch (error) {
        console.error('Error al obtener el pesticida:', error);
      }
    };

    fetchPesticida();
  }, [id]);

  return (
    <div>
      <h1>Detalles del Pesticida</h1>
      {pesticida ? (
        <div>
          <p><strong>Registro:</strong> {pesticida.Registro}</p>
          <p><strong>Nombre Comercial:</strong> {pesticida.Nombre_Comercial}</p>
          <p><strong>Aptitud:</strong> {pesticida.Aptitud}</p>
          <p><strong>Sustancia Activa 1:</strong> {pesticida.Sustancia_Activa_1}</p>
          {/* Agrega más campos según lo que quieras mostrar */}
          <button onClick={() => navigate(-1)}>Volver</button>
        </div>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
}

export default VerPesticida;
