import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useErtex } from '../../hooks/useErtex';
import { loadBlockchainData } from '../../redux/actions/ethereum'; // Importamos la acción real

const MintForm = () => {
    const dispatch = useDispatch();
    // --- 1. Estados y Refs ---
    const [selectedImage, setSelectedImage] = useState(null); // Archivo de imagen
    const [previewUrl, setPreviewUrl] = useState(null); // Previsualización local
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [formData, setFormData] = useState({
        input: '' // Aquí va el Token URI manual
    });

    const { input } = formData;
    const fileInputRef = useRef(null);

    // Datos de Redux y Hook del Contrato
    const account = useSelector(state => state.ethereum.blockchain);
    const contract = useErtex();

    // --- 2. Lógica de Selección de Imagen ---
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setStatus('⚠️ Por favor, selecciona un archivo de imagen válido.');
                return;
            }

            setSelectedImage(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setStatus('');
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const clearImage = () => {
        setSelectedImage(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    // --- 3. Función para Mintear ---
    // --- MintForm.jsx ---
    // Asegúrate de pasar loadBlockchainData como prop si usas connect
    const handleMint = async (e) => {
        e.preventDefault();
        if (!contract || !account) return;

        try {
            setIsLoading(true);
            setStatus('⏳ Preparando...');

            let finalURI = input;
            if (selectedImage && !input) {
                setStatus('☁️ Subiendo imagen...');
                await new Promise(resolve => setTimeout(resolve, 1500));
                finalURI = "ipfs://QmarcHivO_HASH_SIMULADO";
            }

            setStatus('⏳ Firmando transacción...');

            // 1. Esperamos a que la transacción se confirme
            await contract.methods.mint(finalURI).send({ from: account });

            setStatus('✅ ¡Éxito! NFT creado correctamente.');

            // 2. 🔥 RECARGAMOS LOS DATOS: Esto actualizará el totalSupply y la lista de NFTs en Redux
            dispatch(loadBlockchainData());

            // 3. LIMPIAMOS EL FORMULARIO)

            clearImage();
            setFormData({ input: '' });
        } catch (error) {
            console.error(error);
            setStatus('❌ Error en el minteo.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto my-12 p-8 bg-gray-900/80 backdrop-blur-md rounded-2xl border border-gray-800 shadow-2xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500 uppercase tracking-tight">
                    Crear Nuevo NFT
                </h2>
                {account && (
                    <span className="text-sm text-gray-400 bg-gray-800 px-4 py-2 rounded-full mt-4 md:mt-0">
                        Creador: <span className="text-blue-300 font-mono">{account.substring(0, 6)}...{account.substring(38)}</span>
                    </span>
                )}
            </div>

            <form onSubmit={handleMint} className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* --- COLUMNA IZQUIERDA: Imagen --- */}
                <div className="order-2 lg:order-1 h-full min-h-112">
                    <label className="block text-lg font-medium text-gray-300 mb-4">
                        Imagen del NFT
                    </label>

                    <input
                        type="file"
                        hidden
                        ref={fileInputRef}
                        onChange={handleImageSelect}
                        accept="image/*"
                    />

                    {!previewUrl ? (
                        <div
                            onClick={triggerFileInput}
                            className="group min-h-100 flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-2xl hover:border-blue-500 hover:bg-gray-800/50 transition-all cursor-pointer relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 group-hover:text-blue-400 transition mb-4 z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-gray-400 text-lg font-medium z-10">Sube tu imagen</p>
                        </div>
                    ) : (
                        <div className="relative min-h-100 rounded-2xl overflow-hidden border border-gray-700 shadow-lg group">
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={clearImage}
                                className="absolute top-4 right-4 bg-red-600/80 text-white p-2 rounded-full hover:bg-red-700 transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>

                {/* --- COLUMNA DERECHA: Datos --- */}
                <div className="order-1 lg:order-2 flex flex-col justify-between space-y-6">
                    <div>
                        <label className="block text-lg font-medium text-gray-300 mb-4">
                            Detalles del NFT
                        </label>

                        <div className="mb-6">
                            <label className="text-sm font-medium text-gray-400 mb-2 block">
                                Token URI / Link manual
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="input"
                                    placeholder="ipfs://... o enlace HTTP"
                                    value={input}
                                    onChange={onChange}
                                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl p-4 pl-12 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                />
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-blue-900/20 rounded-xl border border-blue-800/30 text-sm text-blue-200/70">
                            <p>ℹ️ Sube una imagen o introduce un URI para crear tu NFT.</p>
                        </div>
                    </div>

                    <div className='space-y-4'>
                        <button
                            type="submit"
                            disabled={isLoading || !account}
                            className={`w-full py-4 rounded-xl font-bold text-lg text-white uppercase tracking-widest transition-all duration-300 ${(isLoading || !account)
                                    ? 'bg-gray-700 cursor-not-allowed opacity-50'
                                    : 'bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg'
                                }`}
                        >
                            {isLoading ? 'Minteando...' : 'Confirmar Mint'}
                        </button>

                        {status && (
                            <div className={`p-4 rounded-xl text-sm font-medium text-center ${status.includes('✅') ? 'bg-green-900/40 text-green-400' :
                                    status.includes('⏳') ? 'bg-blue-900/40 text-blue-400' :
                                        'bg-red-900/40 text-red-400'
                                }`}>
                                {status}
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default MintForm;