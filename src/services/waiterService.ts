import axiosInstance from "../api/axiosInstance";
import { BebidasAPIResponse, ComidasAPIResponse, MesasAPIResponse } from "../schemas/admin-schema";

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

