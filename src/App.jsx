import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout/Layout'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import ForgetPassword from './Components/forgetPassword/forgetPassword'
import ResetCode from './Components/ResetCode/ResetCode'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Products from './Components/Products/Products'
import Categories from './Components/Categories/Categories'
import NotFound from './Components/NotFound/NotFound'
import UserContextProvider from './Components/Context/UserContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import CreateContextProvider from './Components/Context/CartContext'
import { Toaster } from 'react-hot-toast'
import CheckOut from './Components/CheckOut/CheckOut'
import AllOrders from './Components/AllOrders/AllOrders'
import Wishlist from './Components/Wishlist/Wishlist'
import WishlistContextProvider from './Components/Context/WishlistContext'
import CashOrder from './Components/CashOrder/CashOrder'



const Routers = createBrowserRouter([
  {
    path: "/", element: <Layout />, children: [
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "forgetPassword", element: <ForgetPassword /> },
      { path: "resetCode", element: <ResetCode /> },
      { path: "resetPassword", element: <ResetPassword /> },
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "Cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: "ProductDetails/:id/:category", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: "checkOut", element: <ProtectedRoute><CheckOut /></ProtectedRoute> },
      { path: "cashOrder", element: <ProtectedRoute><CashOrder /></ProtectedRoute> },
      { path: "allorders", element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
      { path: "wishlist", element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
      { path: "*", element: <NotFound /> }
    ]
  }
])


function App() {


  return (
    <>
      <WishlistContextProvider>
        <CreateContextProvider>
          <UserContextProvider>
            <RouterProvider router={Routers}></RouterProvider>
            <Toaster />
          </UserContextProvider>
        </CreateContextProvider>
      </WishlistContextProvider>



    </>
  )
}

export default App
