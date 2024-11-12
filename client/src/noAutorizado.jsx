import React from 'react';

function UnauthorizedPage() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>No tienes permiso para acceder a esta página</h1>
      <p>Ponte en contacto con el administrador si crees que esto es un error.</p>
      <img 
        src="/images/noEntrar.avif" 
        alt="No Autorizado" 
        style={{ maxWidth: '100%', height: 'auto', marginTop: '20px' }} 
      />
    </div>
  );
}

export default UnauthorizedPage;
