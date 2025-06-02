import { useState } from "react";
import { useAppStore } from "../stores/useAppStore";
import type { Comida, Mesero, PasswordMesero } from "../types/adminTypes";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import ErrorFormMessage from "./ErrorFormMessage";


export default function ModalUpdateUserPassword({selectedUserId, setOpenModalUpdatePassword}:{selectedUserId: Mesero['id'], setOpenModalUpdatePassword:React.Dispatch<React.SetStateAction<boolean>>}) {

    const { actualizarPasswordMesero } = useAppStore()

    const { register, handleSubmit, formState: { errors }} = useForm<PasswordMesero>();
    


  const updatePassword = async(data:PasswordMesero) => {
    try {
        await actualizarPasswordMesero(data, selectedUserId)
        toast.success('Mesero actualizada correctamente')
        setOpenModalUpdatePassword(false)
        
        }catch (error) {
        console.log(error)
        
    }


  }



  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Cambiar contraseña</h2>

        <form onSubmit={handleSubmit(updatePassword)} className=' mt-8 space-y-4 bg-slate-200 p-4 rounded-lg'>
            <div className=' '>
                <label className=' text-2xl'>Nueva contraseña</label>
                <input type="password" className=' w-full border-2 border-slate-200 rounded-lg p-4 bg-white' placeholder='Digite la nueva contraseña'
                {...register("newPassword", {required: "El nombre de usuario es obligatorio"
                })}
                />

                {errors.newPassword && (
                    <ErrorFormMessage>{errors.newPassword.message?.toString()}</ErrorFormMessage>

                )}


                
            </div>

            <div className=" overflow-hidden">
                <input type="submit" value="Confirmar" className=" bg-gray-700 w-full p-2 rounded-lg text-white font-bold cursor-pointer hover:bg-gray-800 hover:scale-105 duration-200"/>


            </div>
            
            


        </form>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setOpenModalUpdatePassword(false)}
          >
            Cancelar
          </button>
        </div>
      </div>




    </div>
  )
}
