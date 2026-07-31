import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";

export default function LayoutTwo() {
  return (
    <div className="flex min-h-screen bg-[#06091a] text-white">
        <SideBar/>
        <Outlet/>
    </div>
  )
}
