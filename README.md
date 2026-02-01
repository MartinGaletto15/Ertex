# 🚀 Ertex NFT Marketplace

Este proyecto de iniciacion en **Web3.0** y gestión de estado complejo con **Redux**. La aplicación permite a los usuarios conectar su wallet de MetaMask, mintear activos digitales únicos y visualizar su colección en tiempo real.

---

## 🛠️ Stack Tecnológico

*   **Frontend:** React.js con Hooks.
*   **Estado Global:** Redux (con arquitectura de Actions/Reducers limpios).
*   **Blockchain:** Web3.js para la comunicación con Smart Contracts.
*   **Estilos:** Tailwind CSS con un diseño *Dark Mode* y efectos de *Glassmorphism*.
*   **Provider:** Integración nativa con MetaMask.

---

## ✨ Características Principales

### 1. Módulo de Minting Estilizado

*   **Interfaz Widescreen:** Con previsualización de imagen dinámica y diseño adaptable.
*   **Detección de Cuenta:** Reconocimiento en tiempo real de la cuenta conectada y red de la blockchain.
*   **Validación Inteligente:** Lógica de habilitación de botones basada en la conexión de la wallet y la integridad de los datos de entrada.

### 2. Galería de Colecciones

*   **Renderizado Dinámico:** Los activos se obtienen directamente de la Blockchain mediante llamadas al contrato.
*   **Visualización de Metadatos:** Presentación de URIs de cada NFT con identificadores únicos e insignias de verificación.
*   **Experiencia de Usuario:** Tarjetas con efectos de hover y transiciones fluidas para una navegación moderna.

### 3. Gestión de Datos Optimizada

*   **Estructura Plana:** Implementación de un estado de Redux limpio para evitar anidamientos, mejorando la eficiencia del renderizado.
*   **Sincronización:** Refresco automático del `totalSupply` y la lista de activos inmediatamente después de cada transacción confirmada.

---

## 📦 Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/ertex-nft-marketplace.git
    ```
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Configurar el entorno:**
    *   Crear un archivo `.env` en la raíz del proyecto.
    *   Añadir las siguientes variables de entorno:
        ```
        REACT_APP_INFURA_KEY=tu-infura-key
        REACT_APP_CONTRACT_ADDRESS=la-direccion-de-tu-contrato
        ```

---

## 🚀 Uso

1.  **Iniciar la aplicación:**
    ```bash
    npm start
    ```
2.  **Abrir en el navegador:**
    *   La aplicación se abrirá en `http://localhost:3000`.
3.  **Conectar MetaMask:**
    *   Asegúrate de tener la extensión de MetaMask instalada en tu navegador.
    *   Conecta tu wallet a la aplicación.

---

## 🌐 Despliegue

El proyecto está desplegado en [Vercel](https://ertex-nft-marketplace.vercel.app/) (este es un enlace de ejemplo).

---

## 🏗️ Arquitectura del Estado (Redux)

La información de la blockchain se procesa y limpia antes de ser almacenada en el store global para asegurar la integridad de la interfaz:

```javascript
// Estructura del estado alcanzada tras la optimización
ethereum: {
  blockchain: "0xa94B...",  // Dirección de la wallet
  ertexAddress: "0x...",    // Dirección del contrato
  totalSupply: "7",         // Contador global de tokens
  nfts: ["http...1", "http...2", ...] // Array limpio de URIs
}
```
