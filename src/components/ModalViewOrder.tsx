import React, { useEffect } from 'react'
import { useAppStore } from '../stores/useAppStore'

export default function ModalViewOrder({selectedMesaId, setOpenModalOrder}:{selectedMesaId:Number, setOpenModalOrder:React.Dispatch<React.SetStateAction<boolean>>}) {

    const { fetchOrdenWaiter, ordenesWaiter } = useAppStore()

    useEffect(() => {
        const fetchOrden = async () => {
            try {
                await fetchOrdenWaiter(selectedMesaId);
            } catch (error) {
            console.error('Error al obtener la orden:', error);
            }
        };

        fetchOrden();
    }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 border-indigo-400 border-4">
            <div className=' flex justify-end p-0 m-0'>
                <button onClick={() => setOpenModalOrder(false)} className=' p-4 m-0 text-sm text-gray-400 cursor-pointer'>x</button>
            </div>
            <h3 className=' text-center font-bold text-2xl mb-8'>Orden</h3>

                {ordenesWaiter.map(orden => (

                    

                    <div key={orden.id} className=' space-y-8'>
                        <p><span className=' font-bold'>Fecha: </span> {new Date(orden.fecha).toLocaleString()}</p>

                        <p><span className=' font-bold'>Atendido por: </span> {orden.mesero.firstName} {orden.mesero.lastName}</p>

                        {orden.comidas.map(comida => (
                            <div key={comida.comida.id} className=' '>
                                <div className=' border-b-2 border-b-black space-y-4 flex justify-between'>
                                    <p>{comida.cantidad} {comida.comida.nombre}</p>
                                    <p>${comida.comida.precio*comida.cantidad}</p>
                                    


                                </div>
                                

                            </div>
                        ))}

                        {orden.bebidas.map(bebida => (
                            <div key={bebida.id}>
                                <div className=' border-b-2 border-b-black flex justify-between space-y-4'>
                                    <p>{bebida.cantidad} {bebida.bebida.nombre}</p>
                                    <p>${bebida.bebida.precio*bebida.cantidad}</p>
                                    


                                </div>


                            </div>
                        ))}

                        <div className=' flex justify-between mt-4'>
                            <p className=' font-bold'>Total: </p>
                            <p>${orden.total}</p>

                        </div>


                    </div>

                ))}

            

        </div>


    
    
    
    
    </div>
  )
}
