import type { z } from "zod";
import { ItemDTOSchema, type BebidaAPIResponse, type ComidaAPIResponse, type ItemSchema, type ItemsSchema, type MesaAPIResponse, type MesasAPIResponse, type MeseroAPIResponse, type MeseroWithPassword, type OrdenDTOSchema } from "../schemas/admin-schema";

export type Items = z.infer<typeof ItemsSchema>

export type Item = z.infer<typeof ItemSchema>

export type Comida = z.infer<typeof ComidaAPIResponse>

export type ComidaFormValues = Omit<Comida, 'id'>;

//Bebidas
export type Bebida = z.infer<typeof BebidaAPIResponse>
export type BebidaFormValues = Omit<Bebida, 'id'>;

//Meseros
export type Mesero = z.infer<typeof MeseroAPIResponse>

export type MeseroOpt = z.infer<typeof MeseroWithPassword>
export type MeseroFormValues = Omit<MeseroOpt, 'id'>
export type MeseroFormValuesUpdate = Omit<Mesero, 'id'>

//Password para actualizar
export type PasswordMesero = {
    newPassword: string
}


//Mesas
export type Mesa =z.infer<typeof MesaAPIResponse>
export type MesaFormValues = Omit<Mesa, 'id'>;

//Ordenes
export type Orden = z.infer<typeof OrdenDTOSchema>
export type itemOrder = z.infer<typeof ItemDTOSchema>