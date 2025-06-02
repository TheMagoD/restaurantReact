import type { StateCreator } from "zustand"
import type { UserLogin } from "../types/authTypes"
import { authUser } from "../services/authService"

export type AuthSliceType = {
    user: UserLogin
    auth:  (payload:UserLogin) => Promise<void>

}

export const createAuthSlice:StateCreator<AuthSliceType> = () => ({
    user: {
        username:"",
        password:""
    },

    auth: async (payload) => {
        await authUser(payload)
        
        
    }


})