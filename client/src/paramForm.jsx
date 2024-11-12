import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../src/Styles/ParamForm.css'; // Asegúrate de que la ruta sea correcta

function ParamForm() {
  const { id } = useParams(); // Captura el parámetro ID de la URL
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    if (id) {
      // Aquí podrías cargar la información del parámetro desde una API o un estado global
      // Simulando la carga de datos del parámetro
      const param = { name: 'Parametro 1', value: 'Valor 1' }; // Ejemplo de parámetro
      setName(param.name);
      setValue(param.value);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para guardar los cambios del parámetro
    navigate('/parametros'); // Redirige a la lista de parámetros después de guardar
  };

  const handleCancel = () => {
    navigate('/parametros'); // Redirige a la lista de parámetros al cancelar
  };

  return (
    <div className="param-form-body">
      <h1>{id ? 'Editar Parámetro' : 'Agregar Parámetro'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Valor</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn-submit">
            {id ? 'Guardar Cambios' : 'Agregar Parámetro'}
          </button>
          <button type="button" className="btn-cancel" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ParamForm;
