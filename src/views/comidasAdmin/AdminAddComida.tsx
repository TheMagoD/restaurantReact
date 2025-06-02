import { useForm } from "react-hook-form";
import ErrorFormMessage from "../../components/ErrorFormMessage";
import type { ComidaFormValues } from "../../types/adminTypes";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../stores/useAppStore";
import { toast } from 'react-toastify';


export default function AdminAddComida() {

  const { saveComida } = useAppStore()

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors }} = useForm<ComidaFormValues>();

  const registerComida = async(data:ComidaFormValues) => {
    try {
      await saveComida(data)
      toast.success('Comida agregada correctamente')
      navigate('/admin/comidas')
      
    } catch (error) {
      console.log(error)
      
    }
  }
  

  return (
    <div className=' container mx-auto'>
        <h2 className=' text-center font-bold text-4xl mt-8'>Agregar producto</h2>

        <form onSubmit={handleSubmit(registerComida)} className=' mt-8 space-y-4 bg-slate-200 p-4 rounded-lg'>
            <div className=' '>
                <label className=' text-2xl'>Nombre</label>
                <input type="text" className=' w-full border-2 border-slate-200 rounded-lg p-4 bg-white' placeholder='Digite nombre del producto'
                {...register("nombre", {required: "El nombre es obligatorio"
                })}
                />

                {errors.nombre && (
                    <ErrorFormMessage>{errors.nombre.message?.toString()}</ErrorFormMessage>

                )}


                
            </div>

            <div>
                <label className=' text-2xl'>Precio</label>
                <input type="number" className=' w-full border-2 border-slate-200 rounded-lg p-4 bg-white' placeholder='Digite el precio del producto'
                    {...register("precio", {required: "El precio es obligatorio",
                        min: {
                            value: 0.001,
                            message: "El precio debe ser mayor a 0",
                        },
                    })}
                />

                {errors.precio && (
                    <ErrorFormMessage>{errors.precio.message?.toString()}</ErrorFormMessage>
                )}


            </div>
            <div className=' '>
                <label className=' text-2xl'>Descripcion</label>
                <input type="text" className=' w-full border-2 border-slate-200 rounded-lg p-4 bg-white' placeholder='Digite la descripcion del producto'
                {...register("descripcion", {required: "La descripcion es obligatoria"
                })}
                />

                {errors.descripcion && (
                    <ErrorFormMessage>{errors.descripcion.message?.toString()}</ErrorFormMessage>

                )}


                
            </div>

            <div className=" overflow-hidden">
                <input type="submit" value="Agregar producto" className=" bg-gray-700 w-full p-2 rounded-lg text-white font-bold cursor-pointer hover:bg-gray-800 hover:scale-105 duration-200"/>


            </div>
            

          

            


        </form>
    </div>
  )
}
