import { useEffect, useState } from "react"
import { useAppStore } from "../stores/useAppStore"
import type { Mesa } from "../types/adminTypes"
import { useNavigate } from "react-router-dom"

export default function WaiterPage() {

  const navigate = useNavigate()

  const { fetchMesasWaiter, mesasWaiter } = useAppStore()

  useEffect(() => {
    try {
      fetchMesasWaiter()
      
    } catch (error) {
      console.log(error)
      
    }

  }, [])

  const agregarOrden = (id : Mesa['id']) => {
    navigate('/waiter/addorder')

  }

  return (
    <>

    <div className=" text-center text-black font-bold text-4xl mt-8">
      Administrador de ordenes
    </div>

    <section className=" container mx-auto grid grid-cols-3 text-center p-4 gap-4">
      {mesasWaiter.map(mesa => (

        <div className=" border shadow-lg cursor-pointer p-2" key={mesa.id}>
            <div className=" overflow-hidden">
                <img className=" hover:scale-105 duration-200 hover:rotate-2" src='/public/icons/mesas.png' alt="" />
            </div>


            <div className=" p-5">
                <h2 className=" text-2xl truncate font-black">Mesa {mesa.numero}</h2>
                <p className=" text-2xl truncate font-black">Estado: {mesa.ocupado ? <span className=" text-red-400">Ocupado</span> : <span className=" text-green-500">Disponible</span>}</p>
                <button onClick={() => agregarOrden(mesa.id)} type="button" className=" bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg cursor-pointer rounded-lg"> {mesa.ocupado ? 'Desocupar mesa' : 'Usar mesa'}</button>
            </div>
        </div>

      ))}


    </section>
    </>
  )
}
