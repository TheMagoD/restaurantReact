import { z } from "zod"

export const UserLoginAPI = z.object({
    username:z.string(),
    password:z.string()
})


export const UserAPIResponseSchema = z.object({
    token: z.string(),
    role: z.string()
})

