import {
    LOAD_WEB3_SUCCESS,
    LOAD_WEB3_FAIL,
    LOAD_BLOCKCHAIN_DATA_SUCCESS,
    LOAD_BLOCKCHAIN_DATA_FAIL,
    LOAD_ERTEX_CONTRACT_SUCCESS,
    LOAD_ERTEX_CONTRACT_FAIL,
    LOAD_NFT_TOTALSUPPLY_SUCCESS,
    LOAD_NFT_TOTALSUPPLY_FAIL,
    LOAD_ERTEX_NFTS_SUCCESS,
    LOAD_ERTEX_NFTS_FAIL
} from './types'

import Web3 from 'web3'
import Ertex from '../../abis/Ertex.json';

// --- Función para cargar Web3 ---
export const setLoadWeb3 = () => async dispatch => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            dispatch({ type: LOAD_WEB3_SUCCESS });
        } catch (error) {
            console.error("Conexión rechazada:", error);
            dispatch({ type: LOAD_WEB3_FAIL });
        }
    } else {
        dispatch({ type: LOAD_WEB3_FAIL });
    }
}

// --- Función para cargar los datos de la Blockchain ---
export const loadBlockchainData = () => async dispatch => {
    if (window.web3) {
        const web3 = window.web3;
        try {
            const accounts = await web3.eth.getAccounts();
            dispatch({ type: LOAD_BLOCKCHAIN_DATA_SUCCESS, payload: accounts[0] });

            const networkId = Number(await web3.eth.net.getId());
            const ErtexData = Ertex.networks[networkId];

            if (ErtexData) {
                dispatch({ type: LOAD_ERTEX_CONTRACT_SUCCESS, payload: ErtexData.address });

                const contract = new web3.eth.Contract(Ertex.abi, ErtexData.address);
                const totalSupply = await contract.methods.totalSupply().call();
                const supplyNum = Number(totalSupply);

                if (supplyNum > 0) {
                    // Guardamos el suministro total como String para Redux DevTools
                    dispatch({
                        type: LOAD_NFT_TOTALSUPPLY_SUCCESS,
                        payload: supplyNum.toString()
                    });

                    let nfts = [];
                    for (let i = 0; i < supplyNum; i++) {
                        // Llamamos al contrato
                        const nftData = await contract.methods.ErtexNFTS(i).call();
                        
                        // 🛠️ LIMPIEZA: Según tus fotos, el contrato devuelve un array.
                        // Extraemos solo el link que corresponde a este NFT (posición i).
                        // Si el contrato devolviera un string directo, se guardaría igual.
                        const cleanLink = Array.isArray(nftData) ? nftData[i] : nftData;
                        
                        nfts.push(cleanLink);
                    }

                    // Enviamos la lista limpia de strings ["http...1", "http...2"]
                    dispatch({
                        type: LOAD_ERTEX_NFTS_SUCCESS,
                        payload: nfts
                    });
                } else {
                    dispatch({ type: LOAD_NFT_TOTALSUPPLY_FAIL });
                    dispatch({ type: LOAD_ERTEX_NFTS_FAIL });
                }
            }
        } catch (error) {
            console.error("Error cargando datos:", error);
            dispatch({ type: LOAD_BLOCKCHAIN_DATA_FAIL });
        }
    }
};