import {useForm} from 'react-hook-form'
import ErrorFormMessage from './ErrorFormMessage';
import type { UserLogin } from '../types/authTypes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../stores/useAppStore';

export default function FormLogin() {

  const { auth } = useAppStore()

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }} = useForm<UserLogin>();
  const [loginFailed, setLoginFailed]= useState(false)

  const loginUser = async(data:UserLogin) => {

    try {
      await auth(data)

      let role = localStorage.getItem('role')
      
      if(role === 'ADMIN'){
        navigate('/admin')
  
      }else{
        navigate('/waiter')
      }
      
    } catch (error) {
      setLoginFailed(true)
      
    }


  }

  return (
    <form action="" className=' mt-20 space-y-8' onSubmit={handleSubmit(loginUser)}>

        {loginFailed && (
          <ErrorFormMessage>{"El usuario o contraseña son incorrectos"}</ErrorFormMessage>
        )}

        <div className=''>
            <label className=' text-white font-bold'>Nombre de usuario</label>
            <input className=' w-full bg-white rounded-lg p-4 mt-2' type="text" placeholder='Digita tu nombrde  de usuario' 
            {...register('username',{required:"El nombre de usuario es requerido"})}

            />
            
            {errors.username && (
              <ErrorFormMessage>{errors.username.message?.toString()}</ErrorFormMessage>
            )}
        </div>

        <div>
            <label className=' text-white font-bold' >Contraseña</label>
            <input className=' w-full bg-white rounded-lg p-4 mt-2' type="password" placeholder=' Digita tu contraseña'
            {...register('password', {required:"El password es requerido"})}
            />

            {errors.password && (
              <ErrorFormMessage>{errors.password.message?.toString()}</ErrorFormMessage>
            )}
        </div>

        <input type="submit" value="Inciar sesion" className=' mt-8 w-full bg-black text-white py-2 rounded-lg font-bold cursor-pointer hover:scale-105 duration-200'/>
    </form>
  )
}
