import { Routes, Route } from "react-router-dom"
import LogIn from "../login/Login";
import SignUp from "../signup/Signup";
import Home from "../home/Home";
import AdminLogIn from "../adminLogin/AdminLogin";
import AdminDashBoard from "../adminDashBoard/AdminDashBoard";
import ItemUpdate from '../itemUpdate/ItemUpdate';
import Cart from "../cart/Cart";
import Order from "../order/Order";
import Payments from "../payments/Payments";
import Checkout from "../checkout/Checkout";

export const RouteHandler = () =>{
    return(
        <>   
            <Routes>
            <Route path="/" element={<Home/>}/>
              <Route path="/Home" element={<Home/>}/>
              <Route path="/Login" element={<LogIn/>}/>
              <Route path="/SignUp" element={<SignUp/>}/>
              <Route path='/admin' element={<AdminLogIn/>}/>
              <Route path="/admindash" element={<AdminDashBoard/>}/>
              <Route path='/itemUpdate/:id' element={<ItemUpdate/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/order' element={<Order/>}/>
              <Route path='/payments' element={<Payments/>}/>
              <Route path='/checkOrders' element={<Checkout/>}/>

            </Routes>
        </>
    );
}