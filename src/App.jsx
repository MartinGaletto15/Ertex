import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Home from "./containers/pages/Home";
import MainLayout from "./hocs/Layout";
import Create from "./containers/pages/Create";
import Eror404 from "./containers/pages/Eror404";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
          </Route>
          <Route path="*" element={<Eror404 />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;