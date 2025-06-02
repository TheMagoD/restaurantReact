import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import LoginPage from './views/LoginPage'
import WaiterPage from './views/WaiterPage'
import AdminPage from './views/AdminPage'
import PrivateRoute from './components/PrivateRoute'
import ComidasAdminPage from './views/ComidasAdminPage'
import AdminAddComida from './views/comidasAdmin/AdminAddComida'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import TokenExpirationWatcher from './components/TokenExpirationWatcher'
import AdminEditComidas from './views/comidasAdmin/AdminEditComidas'
import BebidasAdminPage from './views/bebidasAdmin/BebidasAdminPage'
import AdminAddBebida from './views/bebidasAdmin/AdminAddBebida'
import AdminEditBebida from './views/bebidasAdmin/AdminEditBebida'
import MeserosAdminPage from './views/meserosAdmin/MeserosAdminPage'
import AdminAddMesero from './views/meserosAdmin/AdminAddMesero'
import AdminEditMesero from './views/meserosAdmin/AdminEditMesero'
import MesasAdminPage from './views/mesasAdmin/MesasAdminPage'
import AdminAddMesa from './views/mesasAdmin/AdminAddMesa'
import AddOrderWaiterPage from './views/orderWaiter/AddOrderWaiterPage'

export default function AppRouter() {
  return (
    <BrowserRouter>
        <TokenExpirationWatcher/>
        <ToastContainer position='top-right' autoClose={3000}/>
        <Routes>
            <Route element={<Layout/>}>
                <Route path='/' element={<LoginPage/>} index/>


                <Route path='/waiter' element={
                  <PrivateRoute role={"WAITER"}>
                    <WaiterPage/>

                  </PrivateRoute>
                  
                }
      
                />

                
                <Route path='/admin'  element={
                  <PrivateRoute role={"ADMIN"}>
                    <AdminPage/>

                  </PrivateRoute>
                  
                }/>

                <Route path='/admin/comidas'  element={
                  <PrivateRoute role={"ADMIN"}>
                    <ComidasAdminPage/>

                  </PrivateRoute>
                  
                }/>   

                <Route path='/admin/comidas/agregar'  element={
                  <PrivateRoute role={"ADMIN"}>
                    <AdminAddComida/>

                  </PrivateRoute>
                  
                }/>    
                
                <Route path='/admin/comidas/actualizar/:id'  element={
                  <PrivateRoute role={"ADMIN"}>
                    <AdminEditComidas/>

                  </PrivateRoute>
                  
                }/>   

                <Route path='/admin/bebidas'  element={
                  <PrivateRoute role={"ADMIN"}>
                    <BebidasAdminPage/>

                  </PrivateRoute>
                  
                }/>               

                <Route path='/admin/bebidas/agregar'  element={
                  <PrivateRoute role={"ADMIN"}>
                    <AdminAddBebida/>

                  </PrivateRoute>
                  
                }/>    

                <Route path='/admin/bebidas/actualizar/:id'  element={
                  <PrivateRoute role={"ADMIN"}>
                    <AdminEditBebida/>

                  </PrivateRoute>
                  
                }/> 

                <Route path='/admin/meseros'  element={
                  <PrivateRoute role={"ADMIN"}>
                    <MeserosAdminPage/>

                  </PrivateRoute>
                  
                }/>     

                <Route path='/admin/meseros/agregar'  element={
                  <PrivateRoute role={"ADMIN"}>
                    <AdminAddMesero/>

                  </PrivateRoute>
                  
                }/>    

                <Route path='/admin/meseros/actualizar/:id'  element={
                  <PrivateRoute role={"ADMIN"}>
                    <AdminEditMesero/>

                  </PrivateRoute>
                  
                }/>

                <Route path='/admin/mesas'  element={
                  <PrivateRoute role={"ADMIN"}>
                    <MesasAdminPage/>

                  </PrivateRoute>
                  
                }/>

                <Route path='/admin/mesas/agregar'  element={
                  <PrivateRoute role={"ADMIN"}>
                    <AdminAddMesa/>

                  </PrivateRoute>
                  
                }/>     









                <Route path='/waiter/addorder'  element={
                  <PrivateRoute role={"WAITER"}>
                    <AddOrderWaiterPage/>

                  </PrivateRoute>
                  
                }/>

            </Route>
        </Routes>
    
    </BrowserRouter>
  )
}
