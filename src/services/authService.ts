import axios from "axios"
import type { UserLogin } from "../types/authTypes";
import { UserAPIResponseSchema } from "../schemas/auth-schema";

export async function authUser(user:UserLogin) {
    const url = 'http://localhost:8080/auth/login'
    const { data } = await axios.post(url, user);
    

    const result = UserAPIResponseSchema.safeParse(data)

    if(result.success){
        const expirationTime = Date.now() + 1000*60*24; // 30 minutos
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('role', result.data.role);
        localStorage.setItem('token_expiration', expirationTime.toString());

    }



}
