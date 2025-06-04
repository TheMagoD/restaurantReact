import type { StateCreator } from "zustand"
import type { Bebida, Comida, Mesa, Mesero, Orden, viewOrder } from "../types/adminTypes"
import { actualizarOrdenService, finalizarOrdenWaiterService, getBebidasWaiter, getComidasWaiter, getMesasWaiter, getMeserosWaiterService, getOrdenService, saveOrderService } from "../services/waiterService"

export type WaiterSliceType = {
    //Mesas
    mesasWaiter:Mesa[],
    fetchMesasWaiter: () => Promise<void>

    //Comidas
    comidasWaiter:Comida[],
    fetchComidasWaiter: () => Promise<void>

    //Bebidas
    bebidasWaiter:Bebida[],
    fetchBebidasWaiter: () => Promise<void>

    //Ordenes
    saveOrden: (payload:Orden) => Promise<void>
    fetchOrdenWaiter: (id:Number) => Promise<void>
    ordenesWaiter: viewOrder

    //Meseros
    meserosWaiter: Mesero[],
    fetchMeserosWaiter: () => Promise<void>

    actualizarOrdenWaiter: (payload: Orden, id: number) => Promise<void>
    
    finalizarOrdenWaiter: (id:number) => Promise<void>



}

export const createWaiterSlice: StateCreator<WaiterSliceType> = (set, get) => ({

    mesasWaiter: [],

    comidasWaiter:[],

    bebidasWaiter:[],

    ordenesWaiter:[],

    meserosWaiter:[],

    fetchMesasWaiter: async () => {
        const mesasWaiter = await getMesasWaiter()

        set({
            mesasWaiter:mesasWaiter
        })
        
    },

    fetchComidasWaiter: async () => {
        const comidasWaiter = await getComidasWaiter()

        set({
            comidasWaiter:comidasWaiter
        })
        
    },

    fetchBebidasWaiter: async () => {
        const bebidasWaiter = await getBebidasWaiter()

        set({
            bebidasWaiter: bebidasWaiter
        })
        
    },

    saveOrden: async (payload) => {
        await saveOrderService(payload)
    },

    fetchOrdenWaiter: async (id) => {
        const ordenesWaiter = await getOrdenService(id)

        set({
            ordenesWaiter:ordenesWaiter
        })
        
    },

    fetchMeserosWaiter: async () => {
        const meserosWaiter = await getMeserosWaiterService()

        set({
            meserosWaiter:meserosWaiter
        })
        
    },

    actualizarOrdenWaiter: async (payload, id) => {
        await actualizarOrdenService(payload, id)
    },

    finalizarOrdenWaiter: async (id) => {
        await finalizarOrdenWaiterService(id)
    },
    

    
})