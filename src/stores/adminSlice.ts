import type { StateCreator } from "zustand"
import type { Bebida, BebidaFormValues, Comida, ComidaFormValues, Mesa, MesaFormValues, Mesero, MeseroFormValues, MeseroFormValuesUpdate, Orden, PasswordMesero, viewOrder } from "../types/adminTypes"
import { actualizarBebidaService, actualizarComidaService, actualizarMeseroService, deleteBebidaService, deleteComidaService, deleteMesaService, deleteMeseroService, getBebida, getBebidas, getComida, getComidas, getMesas, getMesero, getMeseros, getOrdenesAdmin, saveBebidaService, saveComidaService, saveMesaService, saveMeseroService, updatePasswordUserService } from "../services/adminService"

export type AdminSliceType = {

    //Comidas
    comidas: Comida[],
    comida:Comida,
    fetchComidas: () => Promise<void>
    fetchComida: (id: Comida['id']) => Promise<void>
    deleteComida: (id: Comida['id']) => Promise<void>
    saveComida: (payload:ComidaFormValues) => Promise<void>
    actualizarComida: (payload: ComidaFormValues, id: Comida['id']) => Promise<void>
    
    //Bebidas
    bebidas:Bebida[],
    bebida:Bebida,
    fetchBebidas: () => Promise<void>
    fetchBebida: (id: Bebida['id']) => Promise<void>
    deleteBebida: (id: Bebida['id']) => Promise<void>
    saveBebida: (payload:BebidaFormValues) => Promise<void>
    actualizarBebida: (payload: BebidaFormValues, id: Bebida['id']) => Promise<void>

    //Meseros
    meseros:Mesero[],
    mesero:Mesero,
    fetchMeseros: () => Promise<void>
    fetchMesero: (id: Mesero['id']) => Promise<void>
    saveMesero: (payload:MeseroFormValues) => Promise<void>
    deleteMesero: (id: Mesero['id']) => Promise<void>
    actualizarMesero: (payload: MeseroFormValuesUpdate, id: Comida['id']) => Promise<void>
    actualizarPasswordMesero: (payload: PasswordMesero, id: Mesero['id']) => Promise<void>

    //Mesas
    mesas:Mesa[],
    fetchMesas: () => Promise<void>
    saveMesa: (payload:MesaFormValues) => Promise<void>
    deleteMesa: (id: Mesa['id']) => Promise<void>

    //Ordenes
    ordenesAdmin: viewOrder
    fetchOrdenesAdmin: () => Promise<void>





}

export const createAdminSlice:StateCreator<AdminSliceType> = (set,get) => ({
    //Variables
    ////Comidas
    comidas:[],
    comida:{
        id:0,
        nombre:'',
        precio:0,
        descripcion:''
    },

    ////Bebidas
    bebidas:[],
    
    bebida:{
        id:0,
        nombre:'',
        precio:0,
        descripcion:''
    },

    ////Meseros
    meseros:[],
    mesero: {
            id: 0,
            username: '',
            firstName: '',
            lastName: '',
            phoneNumber: 0,
            role: "WAITER"

    },

    ////Mesas
    mesas:[],

    ////Ordenes
    ordenesAdmin:[],



    fetchComidas: async () => {
        const comidas = await getComidas()

        set({
            comidas:comidas
        })
        
    },
    fetchComida: async (id) => {
        const comida = await getComida(id)

        set({
            comida:comida
        })
        
    },

    deleteComida: async (id) => {
        await deleteComidaService(id)
        await get().fetchComidas()
        
    },

    saveComida: async (payload) => {
        await saveComidaService(payload)
    },

    actualizarComida: async (payload, id) => {
        await actualizarComidaService(payload, id)
    },

    //Bebidas

    fetchBebidas: async () => {
        const bebidas = await getBebidas()

        set({
            bebidas:bebidas
        })
        
    },

    fetchBebida: async (id) => {
        const bebida = await getBebida(id)

        set({
            bebida:bebida
        })
        
    },

    deleteBebida: async (id) => {
        await deleteBebidaService(id)
        await get().fetchBebidas()
        
    },

    saveBebida: async (payload) => {
        await saveBebidaService(payload)
    },

    actualizarBebida: async (payload, id) => {
        await actualizarBebidaService(payload, id)
    },

    //Meseros

    fetchMeseros: async () => {
        const meseros = await getMeseros()

        set({
            meseros:meseros
        })
        
    },

    fetchMesero: async (id) => {
        const mesero = await getMesero(id)

        set({
            mesero:mesero
        })
        
    },

    saveMesero: async (payload) => {
        await saveMeseroService(payload)
    },

    deleteMesero: async (id) => {
        await deleteMeseroService(id)
        await get().fetchMeseros()
        
    },


    actualizarMesero: async (payload, id) => {
        await actualizarMeseroService(payload, id)
    },

    actualizarPasswordMesero: async (payload, id) => {
        await updatePasswordUserService(payload, id)
    },

    fetchMesas: async () => {
        const mesas = await getMesas()

        set({
            mesas:mesas
        })
        
    },

    saveMesa: async (payload) => {
        await saveMesaService(payload)
    },
    
    deleteMesa: async (id) => {
        await deleteMesaService(id)
        await get().fetchMesas()
        
    },

    //Ordenes
    fetchOrdenesAdmin: async () => {
        const ordenesAdmin = await getOrdenesAdmin()

        set({
            ordenesAdmin:ordenesAdmin
        })
        
    },




})
