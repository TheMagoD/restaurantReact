import { useForm } from "react-hook-form";
import ErrorFormMessage from "../../components/ErrorFormMessage";
import type { MeseroFormValues } from "../../types/adminTypes";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../stores/useAppStore";
import { toast } from 'react-toastify';


export default function AdminAddMesero() {

  const { saveMesero } = useAppStore()

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors }} = useForm<MeseroFormValues>();

  const registerMesero = async(data:MeseroFormValues) => {
    try {
      await saveMesero({
        ...data,
        role: "WAITER"
      })
      toast.success('Mesero agregado correctamente')
      navigate('/admin/meseros')
      
    } catch (error) {
      console.log(error)
      
    }
  }
  

  return (
    <div className=' container mx-auto'>
        <h2 className=' text-center font-bold text-4xl mt-8'>Agregar Mesero</h2>

        <form onSubmit={handleSubmit(registerMesero)} className=' mt-8 space-y-4 bg-slate-200 p-4 rounded-lg'>
            <div className=' '>
                <label className=' text-2xl'>Username</label>
                <input type="text" className=' w-full border-2 border-slate-200 rounded-lg p-4 bg-white' placeholder='Digite nombre del producto'
                {...register("username", {required: "El nombre de usuario es obligatorio"
                })}
                />

                {errors.username && (
                    <ErrorFormMessage>{errors.username.message?.toString()}</ErrorFormMessage>

                )}


                
            </div>

            <div>
                <label className=' text-2xl'>Contraseña</label>
                <input type="password" className=' w-full border-2 border-slate-200 rounded-lg p-4 bg-white' placeholder='Digite la contraseña'
                    {...register("password", {required: "La contraseña es obligatoria"
                    })}
                />

                {errors.password && (
                    <ErrorFormMessage>{errors.password?.message?.toString()}</ErrorFormMessage>
                )}


            </div>
            <div className=' '>
                <label className=' text-2xl'>Nombres</label>
                <input type="text" className=' w-full border-2 border-slate-200 rounded-lg p-4 bg-white' placeholder='Digite la descripcion del producto'
                {...register("firstName", {required: "Los nombres son obligatorios"
                })}
                />

                {errors.firstName && (
                    <ErrorFormMessage>{errors.firstName.message?.toString()}</ErrorFormMessage>

                )}


                
            </div>
            
            <div className=' '>
                <label className=' text-2xl'>Apellidos</label>
                <input type="text" className=' w-full border-2 border-slate-200 rounded-lg p-4 bg-white' placeholder='Digite la descripcion del producto'
                {...register("lastName", {required: "Los apellidos son obligatorios"
                })}
                />

                {errors.lastName && (
                    <ErrorFormMessage>{errors.lastName.message?.toString()}</ErrorFormMessage>

                )}


                
            </div>

            <div className=' '>
                <label className=' text-2xl'>Numero de telefono</label>
                <input type="number" className=' w-full border-2 border-slate-200 rounded-lg p-4 bg-white' placeholder='Digite numero telefonico'
                {...register("phoneNumber", {required: "El numero es obligatorio",
                            pattern: {
                                value: /^\d{10}$/,
                                message: "El número debe tener exactamente 10 dígitos"
                            }
                })}
                />

                {errors.phoneNumber && (
                    <ErrorFormMessage>{errors.phoneNumber.message?.toString()}</ErrorFormMessage>

                )}


                
            </div>

            <div className=" overflow-hidden">
                <input type="submit" value="Agregar mesero" className=" bg-gray-700 w-full p-2 rounded-lg text-white font-bold cursor-pointer hover:bg-gray-800 hover:scale-105 duration-200"/>


            </div>
            

          

            


        </form>
    </div>
  )
}
