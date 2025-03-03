import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let WishlistContext = createContext()

export default function WishlistContextProvider({ children }) {
    const [Wishlist, setWishlist] = useState(null);
    const [wishedItems, setWishedItems] = useState([])
    const headers = {
        token: localStorage.getItem("UserToken")
    }

    async function addProductToWishlist(productId) {
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId }, { headers });
            getProductWishlist();
            toast.success(`Added To Wishlist ${data.status}`)
        } catch (err) {
            console.log(err);
        }
    }

    async function getProductWishlist() {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers });
            setWishlist(data);
            const wishedlist = data.data.map((product) => (product._id))
            setWishedItems(wishedlist)
        } catch (err) {
            console.log(err);
        }
    }


    async function DeleteProductWishlist(productId) {
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers });
            getProductWishlist()
            // setWishlist(data);
            toast.success(`Deleted ${data.status}`)
        } catch (err) {
            console.log(err);
        }
    }

    function wishedProduct(productId) {
        return wishedItems.includes(productId);
    }

    useEffect(() => {
        getProductWishlist();
    }, [])

    return <WishlistContext.Provider value={{ addProductToWishlist, Wishlist, DeleteProductWishlist, wishedProduct, wishedItems, setWishedItems }}>
        {children}
    </WishlistContext.Provider>
}