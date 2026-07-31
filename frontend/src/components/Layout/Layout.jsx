import { Outlet } from "react-router-dom";
import Navebar from "../Navebar/Navebar";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <div>
        <Navebar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}
