import axiosInstance from "../api/axiosInstance";
import { BebidaAPIResponse, BebidasAPIResponse, ComidaAPIResponse, ComidasAPIResponse, MesasAPIResponse, MeseroAPIResponse, MeserosAPIResponse } from "../schemas/admin-schema";
import { OrdenesAPIResponse } from "../schemas/orderView-shema";
import type { Bebida, BebidaFormValues, Comida, ComidaFormValues, Mesa, MesaFormValues, Mesero, MeseroFormValues, MeseroFormValuesUpdate, PasswordMesero } from "../types/adminTypes";

//Comidas
export async function getComidas() {
    const { data } = await axiosInstance.get('/admin/comidas');
    
    const result = ComidasAPIResponse.safeParse(data)

    if(result.success){
        return result.data
    }

}

export async function getComida(id:Comida['id']) {
    const { data } = await axiosInstance.get(`/admin/comidas/${id}`);
    
    const result = ComidaAPIResponse.safeParse(data)

    if(result.success){
        return result.data
    }

}

export async function deleteComidaService(id: Comida['id']) {
  try {
    await axiosInstance.delete(`/admin/comidas/${id}`);
  } catch (error) {
    throw error;
  }
}

export async function saveComidaService(comida: ComidaFormValues) {
  try {
    console.log(comida)

    await axiosInstance.post(`/admin/comidas`,comida)
  } catch (error) {
    throw error;
  }
}

export async function actualizarComidaService(comida:ComidaFormValues, id:Comida['id']) {
    try {
    console.log(comida)

    await axiosInstance.put(`/admin/comidas/${id}`,comida)
  } catch (error) {
    throw error;
  }
  
}


//Bebidas
export async function getBebidas() {
    const { data } = await axiosInstance.get('/admin/bebidas');
    
    const result = BebidasAPIResponse.safeParse(data)


    if(result.success){
        return result.data
    }

}

export async function getBebida(id:Bebida['id']) {
    const { data } = await axiosInstance.get(`/admin/bebidas/${id}`);

    console.log(data)
    
    const result = BebidaAPIResponse.safeParse(data)

    

    if(result.success){
        return result.data
    }

}

export async function deleteBebidaService(id: Bebida['id']) {
  try {
    await axiosInstance.delete(`/admin/bebidas/${id}`);
  } catch (error) {
    throw error;
  }
}

export async function saveBebidaService(bebida: BebidaFormValues) {
  try {
    await axiosInstance.post(`/admin/bebidas`,bebida)
  } catch (error) {
    throw error;
  }
}

export async function actualizarBebidaService(bebida:BebidaFormValues, id:Bebida['id']) {
    try {

    await axiosInstance.put(`/admin/bebidas/${id}`,bebida)
  } catch (error) {
    throw error;
  }
  
}

//Meseros
export async function getMeseros() {
    const { data } = await axiosInstance.get('/admin/meseros');
    console.log(data)
    
    const result = MeserosAPIResponse.safeParse(data)
    console.log(result)


    if(result.success){
        return result.data
    }

}

export async function getMesero(id:Mesero['id']) {
    const { data } = await axiosInstance.get(`/admin/meseros/${id}`);

    console.log(data)
    
    const result = MeseroAPIResponse.safeParse(data)

    console.log(result)

    if(result.success){
        return result.data
    }

}

export async function saveMeseroService(mesero: MeseroFormValues) {
  try {
    await axiosInstance.post(`/admin/meseros`,mesero)
  } catch (error) {
    throw error;
  }
}

export async function deleteMeseroService(id: Mesero['id']) {
  try {
    await axiosInstance.delete(`/admin/meseros/${id}`);
  } catch (error) {
    throw error;
  }
}

export async function actualizarMeseroService(mesero:MeseroFormValuesUpdate, id:Mesero['id']) {
    try {

    await axiosInstance.put(`/admin/meseros/${id}`,mesero)
  } catch (error) {
    throw error;
  }
  
}

export async function updatePasswordUserService(newPassword:PasswordMesero, id: Mesero['id']) {
  try {
    await axiosInstance.put(`/admin/meseros/${id}/password`,newPassword)
  } catch (error) {
    throw error;
  }
}

//Mesas
export async function getMesas() {
    const { data } = await axiosInstance.get('/admin/mesas');
    
    const result = MesasAPIResponse.safeParse(data)


    if(result.success){
      return result.data
    }

}

export async function saveMesaService(mesa: MesaFormValues) {
  try {
    await axiosInstance.post(`/admin/mesas`,mesa)
  } catch (error) {
    throw error;
  }
}

export async function deleteMesaService(id: Mesa['id']) {
  try {
    await axiosInstance.delete(`/admin/mesas/${id}`);
  } catch (error) {
    throw error;
  }
}



//Ordenes
export async function getOrdenesAdmin() {
    const { data } = await axiosInstance.get('/admin/ordenes');
    
    const result = OrdenesAPIResponse.safeParse(data)


    if(result.success){
        return result.data
    }

}