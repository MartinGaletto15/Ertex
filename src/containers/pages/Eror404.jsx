import React from 'react';
import logo from '../img/logo.png'; 

const Eror404 = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
      <img src={logo} alt="Ertex Logo" className="h-40 w-auto mb-8" />
      <h1 className="text-4xl font-bold mb-4">Página no encontrada</h1>
      <p className="text-lg text-gray-400 mb-8">
        Esta sección de la página se encuentra momentáneamente en desarrollo.
      </p>
    </div>
  );
};

export default Eror404;