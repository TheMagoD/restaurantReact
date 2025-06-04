import { useEffect, useState } from "react"
import { useAppStore } from "../stores/useAppStore"
import type { Mesa } from "../types/adminTypes"
import { useNavigate } from "react-router-dom"
import ModalViewOrder from "../components/ModalViewOrder"
import { toast } from "react-toastify"

export default function WaiterPage() {

  const navigate = useNavigate()

  const { fetchMesasWaiter, mesasWaiter, finalizarOrdenWaiter } = useAppStore()

  const [ openModalOrder, setOpenModalOrder ] = useState(false)

  const [ selectedMesaId, setSelectedMesaId ] = useState(0)

  useEffect(() => {
    try {
      fetchMesasWaiter()
      
    } catch (error) {
      console.log(error)
      
    }

  }, [mesasWaiter])

  const agregarOrden = (id : Mesa['id']) => {
    navigate(`/waiter/addorder/${id}`)

  }

  const viewOrder = (id : Mesa['id']) => {
    setSelectedMesaId(id)
    setOpenModalOrder(true)


  }

  const desocuparMesa = async(id:number) => {

    try {
      finalizarOrdenWaiter(id)
      toast.success('Mesa desocupada')

      await fetchMesasWaiter()
      
    } catch (error) {
      console.log(error)
      
    }


  }

  return (
    <>

    {openModalOrder && (
      <ModalViewOrder selectedMesaId={selectedMesaId} setOpenModalOrder={setOpenModalOrder}/>

    )}

    <div className=" text-center text-black font-bold text-4xl mt-8">
      Administrador de ordenes
    </div>

    <section className=" container mx-auto grid grid-cols-5 text-center p-4 gap-4">
      {mesasWaiter.map(mesa => (

        <div className=" border shadow-lg cursor-pointer p-2 flex flex-col items-center" key={mesa.id}>
            <div className=" overflow-hidden h-40 w-40">
                <img className=" hover:scale-105 duration-200 hover:rotate-2" src='/public/icons/mesas.png' alt="" />
            </div>


            <div className=" p-5">
                <h2 className=" text-2xl truncate font-black">Mesa {mesa.numero}</h2>
                <p className=" text-2xl truncate font-black">Estado: {mesa.ocupada ? <span className=" text-red-400">Ocupado</span> : <span className=" text-green-500">Disponible</span>}</p>
                {mesa.ocupada ? (
                  <div>
                    <button onClick={() => desocuparMesa(mesa.id)} className=" bg-indigo-400 hover:bg-indigo-700 mt-5 w-full p-3 font-bold text-white text-lg cursor-pointer rounded-lg">Desocupar mesa</button>
                    <button onClick={() => viewOrder(mesa.id)} className=" bg-indigo-400 hover:bg-indigo-700 mt-5 w-full p-3 font-bold text-white text-lg cursor-pointer rounded-lg">Ver orden</button>
                    <button onClick={() => navigate(`/waiter/editorder/actualizar/${mesa.id}`)} className=" bg-green-400 hover:bg-green-700 mt-5 w-full p-3 font-bold text-white text-lg cursor-pointer rounded-lg">Editar Orden</button>

                  </div>
                ): (
                  <button onClick={() => agregarOrden(mesa.id)} type="button" className=" bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg cursor-pointer rounded-lg">Usar mesa</button>

                  
                )}
            </div>
        </div>

      ))}



    </section>
    </>
  )
}
