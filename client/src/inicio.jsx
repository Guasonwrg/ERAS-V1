import React from 'react';
import { useAuth } from "./authContext";
import './Styles/Inicio.css'

function HomePage() {
  const { user } = useAuth(); 
  const userName = user?.Nombre || "";

  return (
    <div className="container-fluid main-content">
      <div className="col-12 text-center my-4">
        <h1 className="display-4 text-primary">Bienvenido a ERAS{userName && `, ${userName}`}</h1>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 my-5">
          <img className="img-fluid img-pequena" src="/images/lake2.jpeg" alt="Main" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;

