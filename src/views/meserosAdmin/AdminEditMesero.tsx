import { useForm } from "react-hook-form";
import ErrorFormMessage from "../../components/ErrorFormMessage";
import type { MeseroFormValuesUpdate } from "../../types/adminTypes";
import { data, useNavigate, useParams } from "react-router-dom";
import { useAppStore } from "../../stores/useAppStore";
import { toast } from 'react-toastify';
import { useEffect } from "react";


export default function AdminEditMesero() {

    const { mesero, actualizarMesero, fetchMesero } = useAppStore();

    const { id } = useParams();
    const meseroId = Number(id);


    const navigate = useNavigate()

    useEffect(() => {
        try {
            fetchMesero(meseroId)
        } catch (error) {

            console.log(error)
        }

    },[])

    const { register, handleSubmit, reset, formState: { errors }} = useForm<MeseroFormValuesUpdate>({
        defaultValues: mesero
    });



    // Cuando ya se haya cargado, reiniciamos el formulario con esos datos
    useEffect(() => {
        if (mesero?.id === meseroId) {
        reset({
            username: mesero.username,
            firstName: mesero.firstName,
            lastName: mesero.lastName,
            phoneNumber: mesero.phoneNumber
        });
        }
    }, [mesero, meseroId, reset]);







    const editMesero = async(data:MeseroFormValuesUpdate) => {
        try {
        data = {
            ...data,
            role:'WAITER'
        }
        await actualizarMesero(data, meseroId)
        toast.success('Mesero actualizada correctamente')
        navigate('/admin/meseros')
        
        } catch (error) {
        console.log(error)
        
        }
    }
    

  return (
    <div className=' container mx-auto'>
        <h2 className=' text-center font-bold text-4xl mt-8'>Editar Mesero</h2>

        <form onSubmit={handleSubmit(editMesero)} className=' mt-8 space-y-4 bg-slate-200 p-4 rounded-lg'>
            <div className=' '>
                <label className=' text-2xl'>Username</label>
                <input type="text" className=' w-full border-2 border-slate-200 rounded-lg p-4 bg-white' placeholder='Digite nombre de usuario'
                {...register("username", {required: "El nombre de usuario es obligatorio"
                })}
                />

                {errors.username && (
                    <ErrorFormMessage>{errors.username.message?.toString()}</ErrorFormMessage>

                )}


                
            </div>

            <div>
                <label className=' text-2xl'>Nombres</label>
                <input type="text" className=' w-full border-2 border-slate-200 rounded-lg p-4 bg-white' placeholder='Digite nombre(s)'
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
                <input type="text" className=' w-full border-2 border-slate-200 rounded-lg p-4 bg-white' placeholder='Digite el numero de telefono'
                {...register("phoneNumber", {required: "El numero es obligatorio"
                })}
                />

                {errors.phoneNumber && (
                    <ErrorFormMessage>{errors.phoneNumber.message?.toString()}</ErrorFormMessage>

                )}


                
            </div>


            <div className=" overflow-hidden">
                <input type="submit" value="Actualizar mesero" className=" bg-gray-700 w-full p-2 rounded-lg text-white font-bold cursor-pointer hover:bg-gray-800 hover:scale-105 duration-200"/>


            </div>
            

          

            


        </form>
    </div>
  )
}
