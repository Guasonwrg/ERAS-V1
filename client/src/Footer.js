import React from 'react';

function Footer() {
  return (
    <div className="row bg-light py-4">
      <div className="col-12 col-md-8 text-center text-md-start">
        <hr className="my-2"/>
        <p className="fw-bold text-success">Latitud.org.uy</p>
      </div>
      <div className="col-12 col-md-4 text-center text-md-end">
        <img className="img-fluid mb-3 mb-md-0" src="/images/logo-latitud-latu.png" alt="Footer Logo" />
      </div>
    </div>
  );
}

export default Footer;
