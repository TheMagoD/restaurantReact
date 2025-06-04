import { z } from "zod";
import { BebidaAPIResponse, ComidaAPIResponse, MesaAPIResponse } from "./admin-schema";

// Autoridad
const AuthoritySchema = z.object({
  authority: z.string()
});

// Mesero extendido
const MeseroCompletoSchema = z.object({
  id: z.number(),
  username: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.number(),
  role: z.literal("WAITER"), // o z.enum(["ADMIN", "WAITER"]) si es más flexible
  authorities: z.array(
    z.object({
      authority: z.string()
    })
  ),
  accountNonExpired: z.boolean(),
  accountNonLocked: z.boolean(),
  credentialsNonExpired: z.boolean(),
  enabled: z.boolean()
});


// Relación comida en orden
const ComidaOrdenadaSchema = z.object({
  id: z.number(),
  comida: ComidaAPIResponse,
  cantidad: z.number()
});

// Relación bebida en orden
const BebidaOrdenadaSchema = z.object({
  id: z.number(),
  bebida: BebidaAPIResponse,
  cantidad: z.number()
});

// Orden completa
export const OrdenAPIResponse = z.object({
  id: z.number(),
  fecha: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Fecha inválida"
  }),
  finalizada: z.boolean(),
  total: z.number(),
  mesero: MeseroCompletoSchema,
  mesa: MesaAPIResponse.nullable(),
  comidas: z.array(ComidaOrdenadaSchema),
  bebidas: z.array(BebidaOrdenadaSchema)
});

// Arreglo de órdenes
export const OrdenesAPIResponse = z.array(OrdenAPIResponse);