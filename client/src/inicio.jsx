import React from 'react';

function HomePage() {
  return (
    <div className="container-fluid main-content">
      <div className="col-12 text-center my-4">
        <h1 className="display-4 text-primary">Bienvenido a ERAS</h1>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 my-5">
          <img className="img-fluid" src="/images/lake2.jpeg" alt="Main" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;

