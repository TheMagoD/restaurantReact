import { useState } from "react";
import { useAppStore } from "../stores/useAppStore";
import type { Comida } from "../types/adminTypes";
import { toast } from 'react-toastify';


export default function ModalDeleteConfirm({setOpenModalDeleteConfirm, selectedArticleId, articulo}:{setOpenModalDeleteConfirm:React.Dispatch<React.SetStateAction<boolean>>, selectedArticleId:Comida['id'], articulo:String}) {
  const [ errorMessage,setErrorMessage ] = useState(false)

  const { deleteComida, deleteBebida, deleteMesero, deleteMesa } = useAppStore()

  const [message, setMessage] = useState('');

  const cerrarModal = () => {
  setErrorMessage(false);
  setMessage('');
  setOpenModalDeleteConfirm(false);
  };

  const eliminarComida = async() => {

    if(articulo === 'comida'){
      try {
        await deleteComida(selectedArticleId);
        setOpenModalDeleteConfirm(false)
        toast.success('Comida eliminado correctamente')
      } catch (error: any) {
        setMessage(error?.response?.data?.message || 'Ocurrió un error al eliminar la comida.');
        setErrorMessage(true);
    }


    }

    if(articulo === 'bebida'){
      try {
        await deleteBebida(selectedArticleId);
        setOpenModalDeleteConfirm(false)
        toast.success('Bebida eliminada correctamente')
        
      } catch (error:any) {
        setMessage(error?.response?.data?.message || 'Ocurrió un error al eliminar la comida.');
        setErrorMessage(true);
        
      }
      
    }

    if(articulo === 'mesa'){
      try {
        await deleteMesa(selectedArticleId);
        setOpenModalDeleteConfirm(false)
        toast.success('Mesa eliminada correctamente')
        
      } catch (error:any) {
        setMessage(error?.response?.data?.message || 'Ocurrió un error al eliminar la comida.');
        setErrorMessage(true);
        
      }

      
    }

    if(articulo === 'mesero'){
      try {
        await deleteMesero(selectedArticleId);
        setOpenModalDeleteConfirm(false)
        toast.success('Comida eliminada correctamente')
        
      } catch (error: any) {
        setMessage(error?.response?.data?.message || 'Ocurrió un error al eliminar la comida.');
        setErrorMessage(true);
        
      }
    }


  }



  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      {errorMessage ? (
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Error al eliminar articulo</h2>
        <p className="text-sm text-gray-600 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            onClick={() => cerrarModal()}
          >
            Ok
          </button>

        </div>
      </div>


      ):(
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Seguro que deseas eliminar este articulo?</h2>
        <p className="text-sm text-gray-600 mb-6">Esta acción no se puede deshacer.</p>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setOpenModalDeleteConfirm(false)}
          >
            Cancelar
          </button>

          <button
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
            onClick={() => eliminarComida()}
          >
            Confirmar eliminación
          </button>
        </div>
      </div>


      )
      }


    </div>
  )
}
