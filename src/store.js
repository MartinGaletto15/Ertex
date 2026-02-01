import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './redux/reducers'; // Tu reducer combinado
// O importa tu reducer 'ethereum' si no usas combineReducers

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // Desactivamos el chequeo de inmutabilidad (evita el error de recursión)
            immutableCheck: false,
            // Desactivamos el chequeo de serialización (evita el error de BigInt y funciones)
            serializableCheck: false,
        }),
});

export default store;