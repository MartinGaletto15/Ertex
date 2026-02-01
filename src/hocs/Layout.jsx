import Navbar from "../components/Navigation/Navbar";
import Footer from "../components/Navigation/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout;
