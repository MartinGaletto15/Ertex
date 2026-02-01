import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Ertex from '../abis/Ertex.json'; // Tu ABI

export const useErtex = () => {
    // Obtenemos la dirección desde Redux
    const ertexAddress = useSelector(state => state.ethereum.ertexAddress);

    // Usamos useMemo para "recordar" el contrato y no crearlo en cada render
    const contract = useMemo(() => {
        // Solo instanciamos si existe web3 y la dirección
        if (window.web3 && ertexAddress) {
            return new window.web3.eth.Contract(Ertex.abi, ertexAddress);
        }
        return null;
    }, [ertexAddress]); // Solo se recrea si cambia la dirección

    return contract;
};