import { Outlet } from "react-router-dom";
import Header from "../components/Header";


export default function Layout() {
  return (
    <div className=" ">
        <Header />

        <main className=" ">
            <Outlet/>
        </main>
    </div>
  )
}
