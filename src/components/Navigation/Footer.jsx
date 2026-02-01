import logo from "../../containers/img/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Columna Logo y Descripción */}
          <div className="col-span-1 md:col-span-1">
            <img src={logo} alt="Logo" className="h-8 mb-4" />
            <p className="text-sm">
              Soluciones innovadoras para tu negocio. Transformando ideas en realidades digitales.
            </p>
          </div>

          {/* Columna Enlaces Rápidos */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Empresa</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Sobre nosotros</a></li>
              <li><a href="#" className="hover:text-white transition">Carreras</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
            </ul>
          </div>

          {/* Columna Soporte */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Soporte</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Ayuda</a></li>
              <li><a href="#" className="hover:text-white transition">Privacidad</a></li>
              <li><a href="#" className="hover:text-white transition">Términos</a></li>
            </ul>
          </div>

          {/* Columna Redes (Placeholder) */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Síguenos</h3>
            <div className="flex space-x-4">
              <div className="h-8 w-8 bg-gray-700 rounded-full hover:bg-blue-600 transition cursor-pointer flex items-center justify-center">
                <span className="text-[10px]">FB</span>
              </div>
              <div className="h-8 w-8 bg-gray-700 rounded-full hover:bg-blue-400 transition cursor-pointer flex items-center justify-center">
                <span className="text-[10px]">TW</span>
              </div>
              <div className="h-8 w-8 bg-gray-700 rounded-full hover:bg-pink-600 transition cursor-pointer flex items-center justify-center">
                <span className="text-[10px]">IG</span>
              </div>
            </div>
          </div>
        </div>

        {/* Línea inferior de Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs">
          <p>© {new Date().getFullYear()} Ertex. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;