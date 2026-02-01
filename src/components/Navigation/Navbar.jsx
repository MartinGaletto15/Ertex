import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../containers/img/logo.png";
import { setLoadWeb3, loadBlockchainData } from '../../redux/actions/ethereum';
import { connect } from 'react-redux';

// IMPORTANTE: Importar el JSON del contrato para tener el ABI
import { useErtex } from '../../hooks/useErtex';

const Navbar = ({
  setLoadWeb3,
  loadBlockchainData,
  blockchain, // Tu cuenta
  ertexAddress // AHORA RECIBIMOS LA ADDRESS (STRING), NO EL OBJETO
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Estado local para guardar datos que leas del contrato
  const [contractName, setContractName] = useState('');
  const [data, setData] = useState(null);


  const navigate = useNavigate();
  const contract = useErtex();


  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  useEffect(() => {
    setLoadWeb3();
    loadBlockchainData();
  }, []);

  // --- NUEVA LÓGICA: Leer datos del contrato ---
  useEffect(() => {
    // Solo intentamos leer si tenemos Web3 y la dirección del contrato cargada
    if (window.web3 && ertexAddress) {
      const loadContractData = async () => {
        // Verificamos que el contrato exista (puede ser null si no está conectado)
        if (contract) {
          try {
            const resultado = await contract.methods.totalSupply().call();
            setData(resultado.toString());
          } catch (error) {
            console.error(error);
          }
        }
      };

      loadContractData();
    }
  }, [ertexAddress]); // <--- Se ejecuta cuando Redux nos da la dirección

  return (
    <nav className="bg-gray-900 border-b border-gray-800 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo - Clickeable para ir al Inicio */}
          <div
            className="shrink-0 flex items-center cursor-pointer"
            onClick={() => handleNavigation('/')}
          >
            <img src={logo} alt="Logo de ertex" className="h-26 w-auto" />
          </div>

          {/* Menú Escritorio */}
          <div className="hidden md:flex space-x-8 items-center">
            <button
              onClick={() => handleNavigation('/inprogress')}
              className="text-gray-300 hover:text-white font-medium transition duration-150 text-sm uppercase tracking-wider"
            >
              Recursos
            </button>
            <button
              onClick={() => handleNavigation('/create')}
              className="text-gray-300 hover:text-white font-medium transition duration-150 text-sm uppercase tracking-wider"
            >
              Crear
            </button>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition text-sm font-bold">
              WALLET
            </button>
            <div className='text-white'>
              {blockchain}
            </div>
          </div>

          {/* Botón Hamburguesa (Móvil) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú Desplegable Móvil */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => handleNavigation('/inprogress')}
              className="block w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md text-sm uppercase"
            >
              Recursos
            </button>
            <button
              onClick={() => handleNavigation('/create')}
              className="block w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md text-sm uppercase"
            >
              Crear
            </button>
            <button className="w-full text-center px-3 py-2 bg-blue-600 text-white rounded-md mt-2 font-bold">
              WALLET
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const mapStateToProps = state => ({
  blockchain: state.ethereum.blockchain,
  // CAMBIO AQUÍ: Traemos la dirección, no el objeto entero
  ertexAddress: state.ethereum.ertexAddress
})

export default connect(mapStateToProps, {
  setLoadWeb3,
  loadBlockchainData
})(Navbar);