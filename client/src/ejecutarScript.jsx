import React, { useState } from 'react';

const EjecutarScript = () => {
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(false);

    const ejecutarScript = async () => {
        setLoading(true);
        setMensaje('');
        try {
            const response = await fetch('http://localhost:5000/api/ejecutar-script');
            if (response.ok) {
                const data = await response.text();
                setMensaje(`Éxito: ${data}`);
            } else {
                setMensaje('Error al ejecutar el script.');
            }
        } catch (error) {
            //console.error('Error al ejecutar el script:', error);
            setMensaje('Hubo un error al ejecutar el script.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Ejecutar Script Python</h2>
            <button onClick={ejecutarScript} disabled={loading}>
                {loading ? 'Ejecutando...' : 'Ejecutar Script'}
            </button>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default EjecutarScript;
