import { useState } from "react"
import type { Item, Items } from "../types/adminTypes"
import { useNavigate } from "react-router-dom"

export default function AdminPage() {

  const navigate = useNavigate()

  const [items] = useState<Items>([
    {
      id:1,
      img:'/public/icons/comida.png',
      name: 'Comidas',
    },

    {
      id:2,
      img:'/public/icons/bebidas.png',
      name: 'Bebidas',
    },
    {
      id:3,
      img:'/public/icons/mesas.png',
      name: 'Mesas',
    },
    {
      id:4,
      img:'/public/icons/meseros.png',
      name: 'Meseros',
    },
    {
      id:5,
      img:'/public/icons/ordenes.png',
      name: 'Historial de ordenes',
    }
  ])

  const administrarItem = (id: Item['id']) => {
    if(id === 1){
      navigate('/admin/comidas')

    }

    if(id === 2){
      navigate('/admin/bebidas')
    }

    if(id === 3){
      navigate('/admin/mesas')
    }

    if(id === 4){
      navigate('/admin/meseros')
    }

  }



  return (
    <>
    <div>
      <h2 className=" text-center text-4xl font-bold p-8">Administracion de productos</h2>
    </div>

    <section className=" container mx-auto grid grid-cols-3 gap-6 p-6">
      {items.map(item => (
        <div className=" border shadow-lg" key={item.id}>
            <div className=" overflow-hidden">
                <img className=" hover:scale-125 duration-200 hover:rotate-2" src={item.img} alt="" />
            </div>


            <div className=" p-5">
                <h2 className=" text-2xl truncate font-black">{item.name}</h2>
                <button onClick={() => administrarItem(item.id)} type="button" className=" bg-black/80 hover:bg-black mt-5 w-full p-3 font-bold text-white text-lg cursor-pointer">Administar</button>
            </div>
        </div>
      ))}
    </section>

    </>
  )
}
