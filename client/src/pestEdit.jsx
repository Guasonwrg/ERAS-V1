import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../src/Styles/PestEdit.css';

function EditarPesticida() {
    const { PK_Pest } = useParams();
    const navigate = useNavigate();
    const [mensaje, setMensaje] = useState(null);
    const [form, setForm] = useState({
    Registro: '',
    Nombre_Comercial: '',
    Aptitud: '',
    Sustancia_Activa_1: '',
    Activo_Contenido_1: '',
    Unidades_1: '',
    Sustancia_Activa_2: '',
    Activo_Contenido_2: '',
    Unidades_2: '',
    Sustancia_Activa_3: '',
    Activo_Contenido_3: '',
    Unidades_3: '',
    Sustancia_Activa_4: '',
    Activo_Contenido_4: '',
    Unidades_4: '',
    Formulacion: '',
    Toxicologia: '',
    Vencimiento: '',
    Estado: '',
    Receta: '',
    Empresa_Razon_Social: '',
    Pais: '',
    Pais_2: '',
    Pais_3: '',
    Pais_4: ''
  });

  useEffect(() => {
    const fetchPesticida = async () => {
      try {
        const response = await axios.get(`https://eras-latitud-demo.com:5000/api/pesticidas/pesticida/${PK_Pest}`);
        console.log('Datos de pesticida:', response.data); // Verifica si los datos se muestran en la consola
        setForm(response.data);
      } catch (error) {
        console.error('Error al cargar el pesticida:', error);
      }
    };
  
    if (PK_Pest) {
      fetchPesticida();
    }
  }, [PK_Pest]);  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://eras-latitud-demo.com:5000/api/pesticidas/pesticida/editar/${PK_Pest}`, form);
      setMensaje({ tipo: 'exito', texto: 'Cambios guardados exitosamente.' });
      setTimeout(() => {
        navigate('/pesticidas-abm'); // Redirige después de un tiempo
      }, 2000);
    } catch (error) {
      console.error('Error al actualizar el pesticida:', error);
      setMensaje({ tipo: 'error', texto: 'Error al guardar los cambios.' });
    }
  };

  return (
    <div>
      <h1>Editar Pesticida</h1>
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-column">
            <label>Registro:</label>
            <input type="text" name="Registro" value={form.Registro} readOnly />

            <label>Nombre Comercial:</label>
            <input type="text" name="Nombre_Comercial" value={form.Nombre_Comercial} onChange={handleChange} required />

            <label>Aptitud:</label>
            <input type="text" name="Aptitud" value={form.Aptitud} onChange={handleChange} required />

            <label>Sustancia Activa 1:</label>
            <input type="text" name="Sustancia_Activa_1" value={form.Sustancia_Activa_1} onChange={handleChange} required />

            <label>Activo Contenido 1:</label>
            <input type="text" name="Activo_Contenido_1" value={form.Activo_Contenido_1} onChange={handleChange} required />

            <label>Unidades 1:</label>
            <input type="text" name="Unidades_1" value={form.Unidades_1} onChange={handleChange} />
        </div>

        <div className="form-column">
            <label>Sustancia Activa 2:</label>
            <input type="text" name="Sustancia_Activa_2" value={form.Sustancia_Activa_2} onChange={handleChange} />

            <label>Activo Contenido 2:</label>
            <input type="text" name="Activo_Contenido_2" value={form.Activo_Contenido_2} onChange={handleChange} />

            <label>Unidades 2:</label>
            <input type="text" name="Unidades_2" value={form.Unidades_2} onChange={handleChange} />

            <label>Sustancia Activa 3:</label>
            <input type="text" name="Sustancia_Activa_3" value={form.Sustancia_Activa_3} onChange={handleChange} />

            <label>Activo Contenido 3:</label>
            <input type="text" name="Activo_Contenido_3" value={form.Activo_Contenido_3} onChange={handleChange} />

            <label>Unidades 3:</label>
            <input type="text" name="Unidades_3" value={form.Unidades_3} onChange={handleChange} />
        </div>

        <div className="form-column">
            <label>Sustancia Activa 4:</label>
            <input type="text" name="Sustancia_Activa_4" value={form.Sustancia_Activa_4} onChange={handleChange} />

            <label>Activo Contenido 4:</label>
            <input type="text" name="Activo_Contenido_4" value={form.Activo_Contenido_4} onChange={handleChange} />

            <label>Unidades 4:</label>
            <input type="text" name="Unidades_4" value={form.Unidades_4} onChange={handleChange} />

            <label>Formulación:</label>
            <input type="text" name="Formulacion" value={form.Formulacion} onChange={handleChange} />

            <label>Toxicología:</label>
            <input type="text" name="Toxicologia" value={form.Toxicologia} onChange={handleChange} />

            <label>Vencimiento:</label>
            <input type="text" name="Vencimiento" value={form.Vencimiento} onChange={handleChange} />
        </div>

        <div className="form-column">
            <label>Estado:</label>
            <input type="text" name="Estado" value={form.Estado} onChange={handleChange} />

            <label>Receta:</label>
            <input type="text" name="Receta" value={form.Receta} onChange={handleChange} />

            <label>Empresa Razón Social:</label>
            <input type="text" name="Empresa_Razon_Social" value={form.Empresa_Razon_Social} onChange={handleChange} />

            <label>País:</label>
            <input type="text" name="Pais" value={form.Pais} onChange={handleChange} />

            <label>País 2:</label>
            <input type="text" name="Pais_2" value={form.Pais_2} onChange={handleChange} />

            <label>País 3:</label>
            <input type="text" name="Pais_3" value={form.Pais_3} onChange={handleChange} />

            <label>País 4:</label>
            <input type="text" name="Pais_4" value={form.Pais_4} onChange={handleChange} />
        </div>
        </form>
        {mensaje && (
            <div className={`mensaje ${mensaje.tipo === 'exito' ? 'mensaje-exito' : 'mensaje-error'}`}>
                {mensaje.texto}
            </div>
        )}
        <div className="form-btn-accion">
            <button type="submit" className="btn-guarda" onClick={handleSubmit}>Guardar Cambios</button>
            <button type="button" className="btn-cancela" onClick={() => navigate(-1)}>Cancelar</button>
        </div>
    </div>
  );
}

export default EditarPesticida;
