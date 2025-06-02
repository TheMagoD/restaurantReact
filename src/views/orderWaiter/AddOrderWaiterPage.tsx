import React, { useEffect, useState } from 'react'
import { useAppStore } from '../../stores/useAppStore'
import type { itemOrder, Orden } from '../../types/adminTypes'

export default function AddOrderWaiterPage() {

    const { fetchComidasWaiter, comidasWaiter } = useAppStore()

    useEffect(() => {
        try {
            fetchComidasWaiter()
        } catch (error) {
            console.log(error)
            
        }

    }, [])

    const [ orderCreated, setOrderCreated ] = useState<Orden>({
        mesaId: 0,
        meseroId: 0,
        comidas: [],
        bebidas: []
    })

    const [ selectComidaId, setSelectComidaId ] = useState<itemOrder>({
        id: 0,
        cantidad: 0
    })

    const [ selectBebidaId, setSelectBebidaId ] = useState<itemOrder>({
        id: 0,
        cantidad: 0
    })

    const agregarItem = () => {
        if(selectComidaId.id === 0){
            console.log('Seleccione comida')
        } else if(selectComidaId.cantidad === 0){
            
        }
    }

  return (
    <>
    <h2 className=' font-bold text-black text-center text-4xl mt-8'>Crear orden</h2>
    <section className=' container mx-auto grid grid-cols-2 mt-8'>
        <div>
            <div>
                <h3>Selecciona la comida</h3>
                
                <select
                onChange={e => setSelectComidaId(prev => ({...prev, id: Number(e.target.value)}))}
                className="block w-full max-w-sm px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                    <option value="">Selecciona comida</option>

                    {comidasWaiter.map(comida => (
                        <option value={comida.id} key={comida.id}>{comida.nombre}</option>
                    ))}
                    
                
                </select>

                <button onClick={() => agregarItem()} className=' text-white px-4 py-2 bg-amber-600 rounded-lg mt-4 cursor-pointer'>Agregar comida</button>
            </div>


            <div>

            </div>




        </div>

        <div>

        </div>


    </section>
    </>
  )
}
