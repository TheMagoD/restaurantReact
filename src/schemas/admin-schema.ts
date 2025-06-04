import { z } from "zod"

//Items
export const ItemSchema = z.object({
    id:z.number(),
    img: z.string(),
    name: z.string()
})

export const ItemsSchema = z.array(ItemSchema)

//Comidas
export const ComidaAPIResponse = z.object({
    id: z.number(),
    nombre: z.string(),
    precio: z.number(),
    descripcion: z.string()
})

export const ComidasAPIResponse = z.array(ComidaAPIResponse)


//Bebidas
export const BebidaAPIResponse = z.object({
    id: z.number(),
    nombre: z.string(),
    precio: z.number(),
    descripcion: z.string()
})

export const BebidasAPIResponse = z.array(BebidaAPIResponse)

//Meseros
export const MeseroAPIResponse = z.object({
    id: z.number(),
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.number(),
    role: z.enum(["ADMIN", "WAITER"]), 
})

export const MeserosAPIResponse = z.array(MeseroAPIResponse)

export const MeseroWithPassword = z.object({
    id: z.number(),
    password: z.string(),
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.number(),
    role: z.enum(["ADMIN", "WAITER"])

}) 

//Mesas

export const MesaAPIResponse: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.number(),
    numero: z.number(),
    ocupada: z.boolean(),
  })
)

export const MesasAPIResponse = z.array(MesaAPIResponse)



//Ordenes

export const ItemDTOSchema = z.object({
  id: z.number().int().positive(),
  cantidad: z.number().int().positive(),
});

export const OrdenDTOSchema = z.object({
  mesaId: z.number().int().positive(),
  meseroId: z.number().int().positive(),
  comidas: z.array(ItemDTOSchema).optional().default([]),
  bebidas: z.array(ItemDTOSchema).optional().default([]),
});

export const ItemDTOSchemaFormValues =  z.object({
  id: z.number().int().positive(),
  cantidad: z.number().int().positive(),
  nombre: z.string(),
  precio:z.number(),
  descripcion: z.string()
});

export const OrdenDTOSchemaFormValues = z.object({
  mesaId: z.number().int().positive(),
  meseroId: z.number().int().positive(),
  comidas: z.array(ItemDTOSchemaFormValues).optional().default([]),
  bebidas: z.array(ItemDTOSchemaFormValues).optional().default([]),
});

