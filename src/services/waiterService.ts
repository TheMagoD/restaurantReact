import axiosInstance from "../api/axiosInstance";
import { BebidasAPIResponse, ComidasAPIResponse, MesasAPIResponse, MeserosAPIResponse } from "../schemas/admin-schema";
import { OrdenAPIResponse, OrdenesAPIResponse } from "../schemas/orderView-shema";
import type { MeseroFormValues, Orden } from "../types/adminTypes";

export async function getMesasWaiter() {
    const { data } = await axiosInstance.get('/waiter/mesas');
    
    const result = MesasAPIResponse.safeParse(data)


    if(result.success){
        return result.data
    }

}

export async function getComidasWaiter() {
    const { data } = await axiosInstance.get('/waiter/comidas');
    
    const result = ComidasAPIResponse.safeParse(data)

    if(result.success){
        return result.data
    }

}

export async function getBebidasWaiter() {
    const { data } = await axiosInstance.get('/waiter/bebidas');
    
    const result = BebidasAPIResponse.safeParse(data)


    if(result.success){
        return result.data
    }

}

export async function saveOrderService(order: Orden) {
  try {
    await axiosInstance.post(`/waiter/ordenes`,order)
  } catch (error) {
    throw error;
  }
}

export async function getOrdenService(id:Number) {
    const { data } = await axiosInstance.get(`/waiter/ordenes/mesa/${id}`);

    const result = OrdenesAPIResponse.safeParse(data);

    if (!result.success) {
        console.error("Errores detallados:");
    } else {
       return result.data
    }



    
}

//Meseros
export async function getMeserosWaiterService() {
    const { data } = await axiosInstance.get('/waiter/meseros');
    console.log(data)
    
    const result = MeserosAPIResponse.safeParse(data)
    console.log(result)


    if(result.success){
        return result.data
    }

}

export async function actualizarOrdenService(orden:Orden, id:number) {
    try {

    await axiosInstance.put(`/waiter/ordenes/mesa/${id}`,orden)
  } catch (error) {
    throw error;
  }
  
}

export async function finalizarOrdenWaiterService(id: number) {
  try {
    await axiosInstance.post(`/waiter/ordenes/${id}/finalizar`)
  } catch (error) {
    throw error;
  }
}
