import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppStore } from "../../stores/useAppStore";
import type { Mesero } from "../../types/adminTypes";
import ModalDeleteConfirm from "../../components/ModalDeleteConfirm";
import ModalUpdateUserPassword from "../../components/ModalUpdateUserPassword";


export default function MeserosAdminPage() {
    const [selectedArticleId, setSelectedArticleId] = useState(0)

    const [selectedUserId, setSelectedUserId] = useState(0)

    const { meseros, fetchMeseros } = useAppStore()

    const [ openModalDeleteConfirm, setOpenModalDeleteConfirm ] = useState(false)

    const [ openModalUpdatePassword, setOpenModalUpdatePassword ] = useState(false)

    const navigate = useNavigate()

    const articulo = 'mesero'
    
    

    useEffect(() => {
        try {
            fetchMeseros()
        } catch (error) {

            console.log(error)
        }

    },[])

    const eliminarMesero = (id : Mesero['id']) => {
        setSelectedArticleId(id)
        setOpenModalDeleteConfirm(true)

    }

    const editMesero = (mesero : Mesero) => {
        navigate(`./actualizar/${mesero.id}`, {state:mesero})
    }

    const updatePasswordSetModal = (id: Mesero['id']) => {
        setSelectedUserId(id)
        setOpenModalUpdatePassword(true)
        
    }

  return (


    <div className=" container mx-auto mt-8">

        {openModalUpdatePassword && (
            <ModalUpdateUserPassword selectedUserId = {selectedUserId} setOpenModalUpdatePassword = {setOpenModalUpdatePassword}/>
        )}

        {openModalDeleteConfirm && (
            <ModalDeleteConfirm setOpenModalDeleteConfirm = {setOpenModalDeleteConfirm} selectedArticleId={selectedArticleId} articulo={articulo}/>

        )}


        <h1 className=" text-center font-bold text-2xl">Administrar Meseros</h1>

        <table className=" w-full table-auto text-gray-800 border border-gray-200 mt-8">
            <thead className=" bg-gray-100 text-gray-600 ">
                <tr className="">
                    <th className=" p-2">Username</th>
                    <th className=" p-2">Password</th>
                    <th className=" p-2">Nombres</th>
                    <th className=" p-2">Apellidos</th>
                    <th className=" p-2">Numero de telefono</th>
                    <th className=" p-2">Acciones</th>

                </tr>
            </thead>

            <tbody>

                {meseros.map(mesero => mesero.role === 'WAITER' && (
                    <tr key={mesero.id} className=' border-b border-gray-200 odd:bg-white even:bg-gray-50'>

                        <td className=' p-2'>{mesero.username}</td>
                        <td></td>

                        <td className=" p-2 text-center">{mesero.firstName}</td>
                        <td className=" p-2 text-center">{mesero.lastName}</td>
                        <td className=" p-2 text-center">{mesero.phoneNumber}</td>
                        
                        <td className=' p-2 text-center space-x-2'>
                            <button className=' bg-indigo-600 px-4 py-2 font-bold text-white rounded-lg cursor-pointer hover:bg-blue-700' onClick={() => editMesero(mesero)}>Editar</button>
                            <button  className=' bg-red-600 px-4 py-2 font-bold text-white rounded-lg cursor-pointer hover:bg-red-700' onClick={() => eliminarMesero(mesero.id)}>Eliminar</button>
                            <button  className=' bg-emerald-300 px-4 py-2 font-bold text-white rounded-lg cursor-pointer hover:bg-emerald-400' onClick={() => updatePasswordSetModal(mesero.id)} >Cambiar contraseña</button>
                        </td>

                    </tr>
                ))}

            </tbody>
        </table>

        <div className=" mt-8 flex justify-around">
            <NavLink to="./agregar" className=" bg-gray-800 px-4 py-2 rounded-lg text-white font-bold cursor-pointer hover:bg-gray-700">Agregar nuevo Mesero</NavLink>
        </div>

        <div>
            <NavLink className=' bg-gray-800 px-4 py-2 rounded-lg text-white font-bold cursor-pointer hover:bg-gray-700' to="/admin">Regresar</NavLink>
        </div>
    </div>
  )
}
