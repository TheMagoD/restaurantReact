import type { StateCreator } from "zustand"
import type { Bebida, Comida, Mesa } from "../types/adminTypes"
import { getBebidasWaiter, getComidasWaiter, getMesasWaiter } from "../services/waiterService"

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



}

export const createWaiterSlice: StateCreator<WaiterSliceType> = (set, get) => ({

    mesasWaiter: [],

    comidasWaiter:[],

    bebidasWaiter:[],

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
        
    }
})