import AllUsers from './components/AllUsers'
import Userdetails from './components/Userdetails'
import AllOrders from './components/AllOrders'
import OrderDetails from './components/OrderDetails'

import { NavLink, Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import './App.css'

function App() {
  return (
    <>
    <Routes>
    <Route path='/users' element={<AllUsers />}/>
    <Route path='/users/:id' element={<Userdetails />}/>
    <Route path='/orders' element={<AllOrders />}/>
    <Route path='/orders/:id' element={<OrderDetails />}/>

    </Routes>
     
    </>
  )
}

export default App
