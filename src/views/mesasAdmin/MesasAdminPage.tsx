import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppStore } from "../../stores/useAppStore";
import ModalDeleteConfirm from "../../components/ModalDeleteConfirm";
import type { Mesa } from "../../types/adminTypes";
import { toast } from 'react-toastify';


export default function MesasAdminPage() {
    const [selectedArticleId, setSelectedArticleId] = useState(0)

    const { mesas, fetchMesas, saveMesa } = useAppStore()

    const [ openModalDeleteConfirm, setOpenModalDeleteConfirm ] = useState(false)

    const navigate = useNavigate()

    const articulo = 'mesa'
    
    

    useEffect(() => {
        try {
            fetchMesas()
        } catch (error) {

            console.log(error)
        }

    },[mesas])

    const eliminarMesa = (id : Mesa['id']) => {
        setSelectedArticleId(id)
        setOpenModalDeleteConfirm(true)

    }

    const editMesa = (mesa : Mesa) => {
        navigate(`./actualizar/${mesa.id}`, {state:mesa})
    }

    const agregarMesa = async() => {


        const ultimoId = mesas.length > 0 
        ? Math.max(...mesas.map(m => m.id)) 
        : 0

        const nuevoNumeroMesa = ultimoId + 1


        try {
            await saveMesa({
                numero: nuevoNumeroMesa,
                ocupada:false,

            })
            toast.success('Mesa agregada correctamente')
            navigate('/admin/mesas')
            
        } catch (error) {
            console.log(error)
            
        }
    }

  return (


    <div className=" container mx-auto mt-8">
        {openModalDeleteConfirm && (
            <ModalDeleteConfirm setOpenModalDeleteConfirm = {setOpenModalDeleteConfirm} selectedArticleId={selectedArticleId} articulo={articulo}/>

        )}


        <h1 className=" text-center font-bold text-2xl">Administrar Mesas</h1>

        <table className=" w-full table-auto text-gray-800 border border-gray-200 mt-8">
            <thead className=" bg-gray-100 text-gray-600 ">
                <tr className="">
                    <th className=" p-2">Numero de mesa</th>
                    <th className=" p-2">Estado</th>
                    <th className=" p-2">Acciones</th>

                </tr>
            </thead>

            <tbody>

                {mesas.map(mesa => (
                    <tr key={mesa.id} className=' border-b border-gray-200 odd:bg-white even:bg-gray-50'>

                        <td className=' p-2'>{mesa.numero}</td>
                        <td className=' p-2 text-center'>{mesa.ocupada ? `Ocupada` : `Disponible`}</td>

                        <td className=' p-2 text-center space-x-2'>
                            <button  className=' bg-red-600 px-4 py-2 font-bold text-white rounded-lg cursor-pointer hover:bg-red-700' onClick={() => eliminarMesa(mesa.id)}>Eliminar</button>
                        </td>

                    </tr>
                ))}

            </tbody>
        </table>

        <div className=" mt-8 flex justify-around">
            <button onClick={() => agregarMesa()} className=" bg-gray-800 px-4 py-2 rounded-lg text-white font-bold cursor-pointer hover:bg-gray-700">Agregar mesa</button>
        </div>

        <div>
            <NavLink className=' bg-gray-800 px-4 py-2 rounded-lg text-white font-bold cursor-pointer hover:bg-gray-700' to="/admin">Regresar</NavLink>
        </div>
    </div>
  )
}
