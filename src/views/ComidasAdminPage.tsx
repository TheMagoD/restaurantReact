import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";
import ModalDeleteConfirm from "../components/ModalDeleteConfirm";
import type { Comida } from "../types/adminTypes";


export default function ComidasAdminPage() {
    const [selectedArticleId, setSelectedArticleId] = useState(0)

    const { comidas, fetchComidas } = useAppStore()

    const [ openModalDeleteConfirm, setOpenModalDeleteConfirm ] = useState(false)

    const navigate = useNavigate()

    const articulo = 'comida'
    
    

    useEffect(() => {
        try {
            fetchComidas()
        } catch (error) {

            console.log(error)
        }

    },[])

    const eliminarComida = (id : Comida['id']) => {
        setSelectedArticleId(id)
        setOpenModalDeleteConfirm(true)

    }

    const editComida = (comida : Comida) => {
        navigate(`./actualizar/${comida.id}`, {state:comida})
    }

  return (


    <div className=" container mx-auto mt-8">
        {openModalDeleteConfirm && (
            <ModalDeleteConfirm setOpenModalDeleteConfirm = {setOpenModalDeleteConfirm} selectedArticleId={selectedArticleId} articulo={articulo}/>

        )}


        <h1 className=" text-center font-bold text-2xl">Administrar Comidas</h1>

        <table className=" w-full table-auto text-gray-800 border border-gray-200 mt-8">
            <thead className=" bg-gray-100 text-gray-600 ">
                <tr className="">
                    <th className=" p-2">Comida</th>
                    <th className=" p-2">Precio</th>
                    <th className=" p-2">Descripcion</th>
                    <th className=" p-2">Acciones</th>

                </tr>
            </thead>

            <tbody>

                {comidas.map(comida => (
                    <tr key={comida.id} className=' border-b border-gray-200 odd:bg-white even:bg-gray-50'>

                        <td className=' p-2'>{comida.nombre}</td>
                        <td className=' p-2 text-center'>${comida.precio}</td>
                        <td className=" p-2 text-center">{comida.descripcion}</td>
                        <td className=' p-2 text-center space-x-2'>
                            <button className=' bg-indigo-600 px-4 py-2 font-bold text-white rounded-lg cursor-pointer hover:bg-blue-700' onClick={() => editComida(comida)}>Editar</button>
                            <button  className=' bg-red-600 px-4 py-2 font-bold text-white rounded-lg cursor-pointer hover:bg-red-700' onClick={() => eliminarComida(comida.id)}>Eliminar</button>
                        </td>

                    </tr>
                ))}

            </tbody>
        </table>

        <div className=" mt-8 flex justify-around">
            <NavLink to="./agregar" className=" bg-gray-800 px-4 py-2 rounded-lg text-white font-bold cursor-pointer hover:bg-gray-700">Agregar nuevo Producto</NavLink>
        </div>

        <div>
            <NavLink className=' bg-gray-800 px-4 py-2 rounded-lg text-white font-bold cursor-pointer hover:bg-gray-700' to="/admin">Regresar</NavLink>
        </div>
    </div>
  )
}
