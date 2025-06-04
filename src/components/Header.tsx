import { NavLink } from "react-router-dom";


export default function Header() {

  return (
    <NavLink to={'/'} className=" bg-black block">
        <h1 className=" text-center text-white p-8 text-4xl font-bold">Humar Restaurante</h1>

    </NavLink>
  )
}
