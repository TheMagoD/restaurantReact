import { useNavigate, useParams } from 'react-router-dom';
import { useOrderWaiter } from '../../hooks/useOrder';
import { useAppStore } from '../../stores/useAppStore';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function EditOrderWaiter() {

    const navigate = useNavigate()

    const mesaParamId = useParams().id; 
    const mesaId = Number(mesaParamId)

    const { fetchOrdenWaiter, ordenesWaiter, actualizarOrdenWaiter } = useAppStore()
    
    useEffect(() => {
        const fetchOrden = async () => {
            try {
                await fetchOrdenWaiter(mesaId);
            } catch (error) {
                console.error('Error al obtener la orden:', error);
            }
        };

        resetStates()
    
        fetchOrden();
    }, []);

    


  const {
    comidasWaiter,
    bebidasWaiter,
    meserosWaiter,
    orderList,
    selectComidaId,
    selectBebidaId,
    selectMeseroId,
    handleComidaChange,
    handleBebidaChange,
    handleMeseroChange,
    agregarComida,
    agregarBebida,
    aumentarCantidadComida,
    disminuirCantidadComida,
    eliminarComida,
    aumentarCantidadBebida,
    disminuirCantidadBebida,
    eliminarBebida,
    cargarOrden,
    orderCreated,
    resetStates
  } = useOrderWaiter(mesaId, navigate)


    useEffect(() => {
        if (ordenesWaiter.length > 0) {
            cargarOrden(ordenesWaiter[0]);
        }
    }, [ordenesWaiter]);

  const updateOrder = () => {
    try {
        actualizarOrdenWaiter(orderCreated, mesaId)
        toast.success('Orden actualizada')
        navigate('/waiter')
        
    } catch (error) {
        console.log(error)
        
    }


  }


  return (
    <>
    <section className=' container mx-auto grid grid-cols-2 mt-8 gap-4'>
        <div className=' space-y-8'>
            <div className=' '>
                <h2 className=' font-bold text-black text-center text-4xl mb-8'>Crear orden</h2>
                <h3>Selecciona las comidas</h3>
                
                <select
                onChange={handleComidaChange}
                className="block w-full max-w-sm px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                    <option value="">-- Selecciona comida --</option>

                    {comidasWaiter.map(comida => (
                        <option value={comida.id} key={comida.id}>{comida.nombre}</option>
                    ))}
                    
                
                </select>

                <button onClick={() => agregarComida()} className=' text-white px-4 py-2 bg-black rounded-lg mt-4 cursor-pointer'>Agregar comida</button>
            </div>


            <div>
                <h3>Selecciona las bebidas</h3>
                
                <select
                onChange={handleBebidaChange}
                className="block w-full max-w-sm px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                    <option value="">-- Selecciona bebidas --</option>

                    {bebidasWaiter.map(bebida => (
                        <option value={bebida.id} key={bebida.id}>{bebida.nombre}</option>
                    ))}
                    
                
                </select>

                <button onClick={() => agregarBebida()} className=' text-white px-4 py-2 bg-black rounded-lg mt-4 cursor-pointer'>Agregar Bebida</button>



            </div>


            <div>
                <h3>Selecciona el mesero</h3>

                <select
                    onChange={(e) => handleMeseroChange(e)}
                    className="block w-full max-w-sm px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                    <option value="">-- Selecciona mesero --</option>
                    {meserosWaiter.map(mesero => ( mesero.role==="WAITER" &&
                        <option value={mesero.id} key={mesero.id}>
                        {mesero.firstName} {mesero.lastName}
                    </option>

                    ))}
                </select>
            </div>


            <div className=' '>
                <button onClick={() => updateOrder()} className=' rounded-lg cursor-pointer px-8 py-2 bg-orange-400 hover:bg-orange-400 text-white hover:scale-105 duration-200'>Agregar orden</button>
            </div>




        </div>

        <div>
            <h3 className=' text-center font-bold text-4xl mb-8'>Orden</h3>

            <div>
                <h3 className=' text-2xl'>Comidas</h3>
                {orderList.comidas.map(comida => (
                    <div key={comida.id} className=' rounded-lg shadow-lg p-4 space-y-8'>
                        <p className=' font-bold text-center bg-black py-2 text-white rounded-lg'>{comida.nombre}</p>
                        <p><span className=' font-bold'>Descripcion: </span>{comida.descripcion}</p>
                        <p><span className=' font-bold'>Precio: </span>{comida.precio}</p>
                        <p><span className=' font-bold'>Cantidad: </span>{comida.cantidad}</p>

                        <div className=' flex justify-between'>
                            <div className=' space-x-4'>
                                <button className=' bg-indigo-400 rounded-lg px-2 text-2xl cursor-pointer' onClick={() => disminuirCantidadComida(comida.id)}>-</button>
                                <button className=' bg-indigo-400 rounded-lg px-2 text-2xl' onClick={() => aumentarCantidadComida(comida.id)}>+</button>
                            </div>

                            <div>
                                <button className=' bg-red-400 rounded-lg px-2 text-2xl cursor-pointer' onClick={() => eliminarComida(comida.id)}>x</button>
                            </div>


                        </div>

                    </div>
                ))}
            </div>

            <div className=' mt-20 mb-10'>
                <h3 className=' text-2xl'>Bebidas</h3>
                {orderList.bebidas.map(bebida => (
                    <div key={bebida.id} className=' rounded-lg shadow-lg p-4 space-y-8'>
                        <p className=' font-bold text-center bg-black py-2 text-white rounded-lg'>{bebida.nombre}</p>
                        <p><span className=' font-bold'>Descripcion: </span>{bebida.descripcion}</p>
                        <p><span className=' font-bold'>Precio: </span>{bebida.precio}</p>
                        <p><span className=' font-bold'>Cantidad: </span>{bebida.cantidad}</p>

                        <div className=' space-x-4'>
                            <button
                                onClick={() => disminuirCantidadBebida(bebida.id)}
                                className=' bg-indigo-400 rounded-lg px-2 text-2xl cursor-pointer'
                            >
                                -
                            </button>
                            <button
                                onClick={() => aumentarCantidadBebida(bebida.id)}
                                className=' bg-indigo-400 rounded-lg px-2 text-2xl cursor-pointer'
                            >
                                +
                            </button>
                        </div>

                        <div>
                            <button
                                onClick={() => eliminarBebida(bebida.id)}
                                className=' bg-red-400 rounded-lg px-2 text-2xl cursor-pointer'
                            >
                                x
                            </button>
                        </div>

                    </div>
                ))}
            </div>






        </div>


    </section>
    </>
  )
}
