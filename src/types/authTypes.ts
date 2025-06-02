import { z } from "zod"
import type { UserLoginAPI } from "../schemas/auth-schema"

export type UserLogin = z.infer<typeof UserLoginAPI>