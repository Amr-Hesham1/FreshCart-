import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext()

export default function CartContextProvider({ children }) {
    const [Cart, setCart] = useState(null);
    const headers = {
        token: localStorage.getItem("UserToken")
    }

    async function addProductToCart(productId) {
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {productId}, {headers});
            getProductCart();
            toast.success(`Added To Cart ${data.status}`)
        } catch (err) {
            console.log(err);
        }
    }

    async function getProductCart() {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {headers});
            setCart(data);
        } catch (err) {
            console.log(err);
        }
    }

    async function UpdateProductToCart(productId , count) {
        try {
            let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {count}, {headers});
            setCart(data);
            toast.success(`Updated ${data.status}`)
        } catch (err) {
            console.log(err);
        }
    }

    async function DeleteProductToCart(productId ) {
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {headers});
            setCart(data);
            toast.success(`Deleted ${data.status}`)
        } catch (err) {
            console.log(err);
        }
    }

    async function DeleteAllProductInCart() {
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {headers});
            getProductCart();
            toast.success(`Deleted All ${data.status}`)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        getProductCart();
    } , [])

    return  <CartContext.Provider value={{ addProductToCart, Cart , UpdateProductToCart , DeleteProductToCart , DeleteAllProductInCart}}>
                {children}
            </CartContext.Provider>
}