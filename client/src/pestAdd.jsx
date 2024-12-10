import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../src/Styles/PestAdd.css';

function AgregarPesticida() {
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
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrores((prevErrores) => {
      const nuevosErrores = { ...prevErrores, [name]: !value };
      console.log('Actualizando errores:', nuevosErrores);
      return nuevosErrores;
    });
  };
  
  const validarCampos = () => {
    const camposObligatorios = ['Registro', 'Nombre_Comercial', 'Aptitud', 'Sustancia_Activa_1', 'Activo_Contenido_1', 'Unidades_1'];
    const nuevosErrores = {};
  
    camposObligatorios.forEach((campo) => {
      if (!form[campo]) {
        nuevosErrores[campo] = true;
      }
    });
  
    setErrores(nuevosErrores);
    console.log('Errores después de validar:', nuevosErrores); // Verifica el estado de errores
    return Object.keys(nuevosErrores).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarCampos()) {
      setMensaje({ tipo: 'error', texto: 'Por favor, completa todos los campos obligatorios.' });
      return;
    }

    try {
      const response = await axios.post('https://eras-latitud-demo.com:5000/api/pesticidas/agregar-pesticida', form);
      if (response.status === 201) {
        setMensaje({ tipo: 'exito', texto: 'Pesticida agregado exitosamente.' });
        setTimeout(() => {
          navigate('/pesticidas-abm'); // Redirige a la lista después de agregar
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setMensaje({ tipo: 'error', texto: 'Ya existe un pesticida con este número de registro.' });
      } else {
        setMensaje({ tipo: 'error', texto: 'Error al agregar el pesticida.' });
      }
    }
  };

  return (
    <div>
      <h1>Agregar Nuevo Pesticida</h1>
      <p style={{ fontSize: '14px', color: '#555' }}>
        Los campos marcados con <span style={{ color: 'red' }}>*</span> son obligatorios.
      </p>
      <form className="form-grid">
        <div className="form-column">
        <label>Registro:<span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            name="Registro"
            value={form.Registro}
            onChange={handleChange}
            required
            className={errores.Registro ? 'input-error' : ''}
          />
        <label>Nombre Comercial:<span style={{ color: 'red' }}>*</span></label>
        <input
            type="text"
            name="Nombre_Comercial"
            value={form.Nombre_Comercial}
            onChange={handleChange}
            required
            className={(errores.Nombre_Comercial ? 'input-error' : '')}
        />


          <label>Aptitud:<span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            name="Aptitud"
            value={form.Aptitud}
            onChange={handleChange}
            required
            className={errores.Aptitud ? 'input-error' : ''}
          />

          <label>Sustancia Activa 1:<span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            name="Sustancia_Activa_1"
            value={form.Sustancia_Activa_1}
            onChange={handleChange}
            required
            className={errores.Sustancia_Activa_1 ? 'input-error' : ''}
          />

          <label>Activo Contenido 1:<span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            name="Activo_Contenido_1"
            value={form.Activo_Contenido_1}
            onChange={handleChange}
            required
            className={errores.Activo_Contenido_1 ? 'input-error' : ''}
          />

          <label>Unidades 1:<span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            name="Unidades_1"
            value={form.Unidades_1}
            onChange={handleChange}
            required
            className={errores.Unidades_1 ? 'input-error' : ''}
          />
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

        {/* Columna 3 */}
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

        {/* Columna 4 */}
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
        <button type="button" className="btn-guarda" onClick={handleSubmit}>Agregar Pesticida</button>
        <button type="button" className="btn-cancela" onClick={() => navigate(-1)}>Cancelar</button>
      </div>
    </div>
  );
}

export default AgregarPesticida;
