import { Link } from 'react-router-dom';
import noun from '../../ertex/noun.png'

const Banner = () => {
  return (
    <section className="relative bg-gray-900 text-white min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      
      {/* Fondo con gradientes sutiles para un efecto futurista */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Contenido de texto y botones */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
            Descubre, Crea y <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-600">
              Colecciona NFTs Únicos
            </span>
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-lg mx-auto md:mx-0">
            Tu puerta de entrada al fascinante mundo del arte digital y los coleccionables exclusivos. Explora, invierte y sé parte del futuro.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <Link to="/inprogress" className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition duration-300 font-bold text-lg shadow-lg">
              Explorar NFTs
            </Link>
            <Link to="/create" className="bg-gray-800 text-gray-300 border border-gray-700 px-8 py-3 rounded-md hover:bg-gray-700 hover:border-gray-600 transition duration-300 font-bold text-lg shadow-lg">
              Crea tu NFT
            </Link>
          </div>
        </div>

        {/* Imagen o elemento visual del NFT */}
        <div className="flex justify-center md:justify-end mt-12 md:mt-0">
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 bg-gray-800 rounded-xl shadow-2xl flex items-center justify-center p-4">
            {/* Si tienes una imagen de NFT, úsala aquí. De lo contrario, este es un buen placeholder. */}
            {/* Por ejemplo: <img src={heroNftImage} alt="NFT Destacado" className="rounded-lg object-cover w-full h-full" /> */}
            <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-purple-500 opacity-20 rounded-xl animate-pulse-slow"></div>
            <div className="absolute inset-2 bg-gray-900 rounded-xl flex items-center justify-center">
              <img src={noun} alt="NFT destacado" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Banner;