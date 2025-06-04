import { useEffect, useState } from 'react'
import type { itemOrderFormValues, Mesero, Orden, OrderFormValues, OrderUpdate, viewOrder } from '../types/adminTypes'
import { toast } from 'react-toastify'
import { useAppStore } from '../stores/useAppStore'

export function useOrderWaiter(mesaId: number, navigate: any) {
  const { 
    fetchComidasWaiter, 
    comidasWaiter, 
    bebidasWaiter, 
    fetchBebidasWaiter, 
    saveOrden, 
    meserosWaiter, 
    fetchMeserosWaiter 
  } = useAppStore()

  // Estados
  const [orderCreated, setOrderCreated] = useState<Orden>({
    mesaId,
    meseroId: 0,
    comidas: [],
    bebidas: []
  })

  const [orderList, setOrderList] = useState<OrderFormValues>({
    mesaId,
    meseroId: 0,
    comidas: [],
    bebidas: []
  })

  const [selectComidaId, setSelectComidaId] = useState<itemOrderFormValues>({
    id: 0,
    cantidad: 0,
    nombre: '',
    precio: 0,
    descripcion: ''
  })

  const [selectBebidaId, setSelectBebidaId] = useState<itemOrderFormValues>({
    id: 0,
    cantidad: 0,
    nombre: '',
    precio: 0,
    descripcion: ''
  })

  const [selectMeseroId, setSelectMeseroId] = useState<Mesero>({
    id: 0,
    username: '',
    firstName: '',
    lastName: '',
    phoneNumber: 0,
    role:'WAITER'
  })

  // Carga inicial de datos
  useEffect(() => {
    try {
      fetchComidasWaiter()
      fetchMeserosWaiter()
      fetchBebidasWaiter()
    } catch (error) {
      console.error(error)
    }
  }, [])

  // Funciones de selección
  const handleComidaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value)
    const selectedComida = comidasWaiter.find(c => c.id === selectedId)
    if(selectedComida){
      setSelectComidaId({
        id: selectedComida.id,
        nombre: selectedComida.nombre,
        precio: selectedComida.precio,
        descripcion: selectedComida.descripcion,
        cantidad: 1
      })
    }
  }

  const handleBebidaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value)
    const selectedBebida = bebidasWaiter.find(b => b.id === selectedId)
    if(selectedBebida){
      setSelectBebidaId({
        id: selectedBebida.id,
        nombre: selectedBebida.nombre,
        precio: selectedBebida.precio,
        descripcion: selectedBebida.descripcion,
        cantidad: 1
      })
    }
  }

  const handleMeseroChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value)
    const meseroSeleccionado = meserosWaiter.find(m => m.id === selectedId)
    if (meseroSeleccionado) {
      setSelectMeseroId(meseroSeleccionado)
      setOrderCreated(prev => ({ ...prev, meseroId: meseroSeleccionado.id }))
      setOrderList(prev => ({ ...prev, meseroId: meseroSeleccionado.id }))
    }
  }

  // Funciones agregar alimentos/bebidas
  const agregarComida = () => {
    if (selectComidaId.id === 0) {
      console.log('Seleccione comida');
      return;
    }
    const comidaExistente = orderCreated.comidas.find(item => item.id === selectComidaId.id);
    if (comidaExistente) {
      setOrderCreated(prev => ({
        ...prev,
        comidas: prev.comidas.map(c => c.id === comidaExistente.id ? { ...c, cantidad: c.cantidad + 1 } : c)
      }));
      setOrderList(prev => ({
        ...prev,
        comidas: prev.comidas.map(c => c.id === comidaExistente.id ? { ...c, cantidad: c.cantidad + 1 } : c)
      }));
    } else {
      setOrderCreated(prev => ({
        ...prev,
        comidas: [...prev.comidas, { id: selectComidaId.id, cantidad: 1 }]
      }));
      setOrderList(prev => ({
        ...prev,
        comidas: [...prev.comidas, { ...selectComidaId, cantidad: 1 }]
      }));
    }
  }

  const agregarBebida = () => {
    if (selectBebidaId.id === 0) {
      console.log('Seleccione bebida');
      return;
    }
    const bebidaExistente = orderCreated.bebidas.find(item => item.id === selectBebidaId.id);
    if (bebidaExistente) {
      setOrderCreated(prev => ({
        ...prev,
        bebidas: prev.bebidas.map(b => b.id === bebidaExistente.id ? { ...b, cantidad: b.cantidad + 1 } : b)
      }));
      setOrderList(prev => ({
        ...prev,
        bebidas: prev.bebidas.map(b => b.id === bebidaExistente.id ? { ...b, cantidad: b.cantidad + 1 } : b)
      }));
    } else {
      setOrderCreated(prev => ({
        ...prev,
        bebidas: [...prev.bebidas, { id: selectBebidaId.id, cantidad: 1 }]
      }));
      setOrderList(prev => ({
        ...prev,
        bebidas: [...prev.bebidas, { ...selectBebidaId, cantidad: 1 }]
      }));
    }
  }

  // Funciones para aumentar/disminuir/eliminar comidas y bebidas
  const aumentarCantidadComida = (id: number) => {
    setOrderCreated(prev => ({
      ...prev,
      comidas: prev.comidas.map(c => c.id === id ? { ...c, cantidad: c.cantidad + 1 } : c)
    }));
    setOrderList(prev => ({
      ...prev,
      comidas: prev.comidas.map(c => c.id === id ? { ...c, cantidad: c.cantidad + 1 } : c)
    }));
  }

  const disminuirCantidadComida = (id: number) => {
    const comida = orderList.comidas.find(c => c.id === id);
    if (comida && comida.cantidad > 1) {
      setOrderCreated(prev => ({
        ...prev,
        comidas: prev.comidas.map(c => c.id === id ? { ...c, cantidad: c.cantidad - 1 } : c)
      }));
      setOrderList(prev => ({
        ...prev,
        comidas: prev.comidas.map(c => c.id === id ? { ...c, cantidad: c.cantidad - 1 } : c)
      }));
    }
  }

  const eliminarComida = (id: number) => {
    setOrderCreated(prev => ({
      ...prev,
      comidas: prev.comidas.filter(c => c.id !== id)
    }));
    setOrderList(prev => ({
      ...prev,
      comidas: prev.comidas.filter(c => c.id !== id)
    }));
  }

  const aumentarCantidadBebida = (id: number) => {
    setOrderCreated(prev => ({
      ...prev,
      bebidas: prev.bebidas.map(b => b.id === id ? { ...b, cantidad: b.cantidad + 1 } : b)
    }));
    setOrderList(prev => ({
      ...prev,
      bebidas: prev.bebidas.map(b => b.id === id ? { ...b, cantidad: b.cantidad + 1 } : b)
    }));
  }

  const disminuirCantidadBebida = (id: number) => {
    const bebida = orderList.bebidas.find(b => b.id === id);
    if (bebida && bebida.cantidad > 1) {
      setOrderCreated(prev => ({
        ...prev,
        bebidas: prev.bebidas.map(b => b.id === id ? { ...b, cantidad: b.cantidad - 1 } : b)
      }));
      setOrderList(prev => ({
        ...prev,
        bebidas: prev.bebidas.map(b => b.id === id ? { ...b, cantidad: b.cantidad - 1 } : b)
      }));
    }
  }

  const eliminarBebida = (id: number) => {
    setOrderCreated(prev => ({
      ...prev,
      bebidas: prev.bebidas.filter(b => b.id !== id)
    }));
    setOrderList(prev => ({
      ...prev,
      bebidas: prev.bebidas.filter(b => b.id !== id)
    }));
  }

  // Crear nueva orden
  const createNewOrder = async() => {
    if (orderCreated.comidas.length === 0 && orderCreated.bebidas.length === 0) {
      toast.error('Debes agregar al menos una comida o bebida a la orden');
      return;
    }
    if (orderCreated.meseroId === 0) {
      toast.error('Debes seleccionar un mesero');
      return;
    }
    try {
      await saveOrden(orderCreated)
      toast.success('Orden creada correctamente')
      navigate('/waiter')
    } catch (error) {
      console.error(error)
    }
  }

    // Función para resetear estados
  function resetStates() {
    setOrderCreated({
      mesaId,
      meseroId: 0,
      comidas: [],
      bebidas: []
    })
    setOrderList({
      mesaId,
      meseroId: 0,
      comidas: [],
      bebidas: []
    })
    setSelectComidaId({
      id: 0,
      cantidad: 0,
      nombre: '',
      precio: 0,
      descripcion: ''
    })
    setSelectBebidaId({
      id: 0,
      cantidad: 0,
      nombre: '',
      precio: 0,
      descripcion: ''
    })
    setSelectMeseroId({
      id: 0,
      username: '',
      firstName: '',
      lastName: '',
      phoneNumber: 0,
      role: 'WAITER'
    })
  }

    const cargarOrden = (orden:OrderUpdate) => {
        setOrderList({
            comidas: orden.comidas.map(item => ({
                id: item.comida.id,
                nombre: item.comida.nombre,
                precio: item.comida.precio,
                descripcion: item.comida.descripcion,
                cantidad: item.cantidad
            })),


            bebidas: orden.bebidas.map(item => ({
                id: item.bebida.id,
                nombre: item.bebida.nombre,
                precio: item.bebida.precio,
                descripcion: item.bebida.descripcion,
                cantidad: item.cantidad
            })),
            mesaId: orden.mesa.id,
            meseroId: orden.mesero.id
        })

        setOrderCreated ({
            comidas: orden.comidas.map(item => ({
                id: item.comida.id,
                cantidad: item.cantidad
            })),


            bebidas: orden.bebidas.map(item => ({
                id: item.bebida.id,
                cantidad: item.cantidad
            })),
            mesaId: orden.mesa.id,
            meseroId: orden.mesero.id
        })
    }


  // Retorno con todos los estados y funciones necesarios
  return {
    comidasWaiter,
    bebidasWaiter,
    meserosWaiter,
    orderList,
    orderCreated,
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
    createNewOrder,
    setOrderCreated,
    setOrderList,
    setSelectMeseroId,
    saveOrden,
    resetStates,
    cargarOrden
  }
}
