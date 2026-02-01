import React from 'react';
import logo from '../img/logo.png';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className="relative bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center overflow-hidden">
      
      {/* Fondo de estrellas original */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-transparent">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                animation: `twinkle ${Math.random() * 5 + 2}s linear infinite`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Logo original (h-32) */}
        <img src={logo} alt="Ertex Logo" className="h-32 w-auto mb-8 animate-pulse" />

        {/* --- NUEVO COHETE CON ANIMACIÓN BOUNCE ORIGINAL --- */}
        <div className="mb-8 animate-bounce">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-24 h-24 md:w-32 md:h-32 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          >
            {/* Cuerpo de la nave */}
            <path d="M12 2C12 2 10 6 10 11C10 16 12 19 12 19C12 19 14 16 14 11C14 6 12 2 12 2Z" fill="#3B82F6"/>
            <path d="M12 2C12 2 11 6 11 11C11 16 12 19 12 19V2Z" fill="#2563EB"/>
            
            {/* Ventana */}
            <circle cx="12" cy="9" r="1.5" fill="#93C5FD"/>
            
            {/* Aletas laterales */}
            <path d="M10 14L7 18C7 18 10 18 10 15V14Z" fill="#1D4ED8"/>
            <path d="M14 14L17 18C17 18 14 18 14 15V14Z" fill="#1D4ED8"/>
            
            {/* Propulsor / Fuego */}
            <path d="M11 19L12 23L13 19H11Z" fill="#FBBF24">
                <animate attributeName="opacity" values="1;0.5;1" dur="0.2s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>

        {/* Título y Descripción originales */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Página en Construcción
        </h1>
        <p className="text-lg text-gray-400 mb-8 max-w-md">
          Estamos trabajando para traerte una nueva experiencia. ¡Vuelve pronto!
        </p>

        {/* Botón de regreso original */}
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 font-bold text-lg shadow-lg"
        >
          Volver al Inicio
        </Link>
      </div>

      <style>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
          @keyframes bounce {
            0%, 100% { 
              transform: translateY(-15%); 
              animation-timing-function: cubic-bezier(0.8, 0, 1, 1); 
            }
            50% { 
              transform: translateY(0); 
              animation-timing-function: cubic-bezier(0, 0, 0.2, 1); 
            }
          }
        `}
      </style>
    </div>
  );
};

export default Error404;