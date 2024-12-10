import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function BatchButton() {
  const [loading, setLoading] = useState(false);

  const ejecutarBatch = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://eras-latitud-demo.com:5000/api/batch/ejecutar-batch');
      Swal.fire('Éxito', response.data.message, 'success');
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al ejecutar el proceso batch.', 'error');
      console.error('Error al ejecutar el batch:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={ejecutarBatch} disabled={loading}>
      {loading ? 'Ejecutando...' : 'Ejecutar Proceso Batch'}
    </button>
  );
}

export default BatchButton;

