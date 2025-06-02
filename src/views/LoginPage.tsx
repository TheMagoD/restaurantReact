import FormLogin from "../components/FormLogin";


export default function LoginPage() {
  

  return (
    <main className=" h-screen bg-[url(/public/bg-image.jpg)] bg-cover bg-center bg-no-repeat">
        <div className=" w-2xl mx-auto pt-20">

            <h2 className=" text-white text-2xl text-center font-bold">Iniciar Sesion</h2>

            <FormLogin/>



        </div>

    </main>
  )
}
