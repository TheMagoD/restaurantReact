import { useEffect } from 'react'
import { useAppStore } from '../../stores/useAppStore'

export default function OrdenAdminList() {

    const { fetchOrdenesAdmin, ordenesAdmin } = useAppStore()

    useEffect(() => {
        const fetchOrdenes = async () => {
            try {
                await fetchOrdenesAdmin();
            } catch (error) {
                console.error('Error al obtener la orden:', error);
            }
        };

        fetchOrdenes()

    },[])

  return (
    <div className=' container mx-auto grid grid-cols-3 gap-4 mt-8'>
    {ordenesAdmin.map(orden => (
        <div key={orden.id} className=' rounded-lg p-4 space-y-4 bg-slate-400'>
            <h3 className=' text-white text-center font-bold text-2xl'>Orden {orden.id}</h3> 

            <div className=' bg-white rounded-lg p-4 space-y-4'>
                <p>{new Date(orden.fecha).toLocaleString()}</p>
                
                {orden.mesa ? (
                    <p><span className=' font-bold'>Estado:</span> Activa</p>
                ): (
                    <p><span className=' font-bold'>Estado:</span> Inactiva</p>

                )}


                

                <p className=' mb-8'>Atendida por: {orden.mesero.firstName} {orden.mesero.lastName}</p>

                <p className=' font-bold'>Comidas:</p>
                {orden.comidas.map(comida => (
                    <div key={comida.id} className=' flex justify-between border-b-2 border-b-black'>


                        <div className=' flex gap-2'>
                            <p>{comida.cantidad}</p>
                            <p>{comida.comida.nombre}</p>

                        </div>

                        <p>${comida.comida.precio}</p>


                    </div>
                ))}

                <p className=' font-bold'>Bebidas:</p>
                {orden.bebidas.map(bebida => (
                    <div key={bebida.id} className=' flex justify-between border-b-2 border-b-black'>


                        <div className=' flex gap-2'>
                            <p>{bebida.cantidad}</p>
                            <p>{bebida.bebida.nombre}</p>

                        </div>

                        <p>${bebida.bebida.precio}</p>


                    </div>
                ))}

                <div className=' flex justify-between'>
                    <p className=' font-bold'>Total: </p>
                    <p className=' '>${orden.total}</p>
                </div>
                


            </div>



        </div>
    ))}
    </div>
  )
}
