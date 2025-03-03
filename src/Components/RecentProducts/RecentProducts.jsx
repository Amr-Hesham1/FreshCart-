import React, { useContext, useEffect, useState } from 'react'
import style from './RecentProducts.module.css'
import axios from 'axios'
import { CartContext } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { WishlistContext } from '../Context/WishlistContext';
import { Heart } from 'lucide-react';

export default function RecentProducts() {
    const Navigate = useNavigate();
    const [Products, setProducts] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    let { addProductToCart } = useContext(CartContext)
    let { addProductToWishlist, DeleteProductWishlist, wishedProduct, wishedItems } = useContext(WishlistContext)

    const filteredProducts = Products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    async function getProducts() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
        // console.log(data.data);
        setProducts(data.data)
        setLoading(false)

    }
    useEffect(() => {
        getProducts()
    }, [])
    return (
        <>
            {Loading ? <div className={`${style.preloader}  ${style.all} `}>
                <svg className={style.cart} role="img" aria-label="Shopping cart line animation" viewBox="0 0 128 128" width="128px" height="128px" xmlns="http://www.w3.org/2000/svg">
                    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={8}>
                        <g className={style.cart__track} stroke="hsla(0,10%,10%,0.1)">
                            <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
                            <circle cx={43} cy={111} r={13} />
                            <circle cx={102} cy={111} r={13} />
                        </g>
                        <g className={style.cart__lines} stroke="currentColor">
                            <polyline className={style.cart__top} points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" strokeDasharray="338 338" strokeDashoffset={-338} />
                            <g className={style.cart__wheel1} transform="rotate(-90,43,111)">
                                <circle className={style.cart__wheel} cx={43} cy={111} r={13} strokeDasharray="81.68 81.68" strokeDashoffset="81.68" />
                            </g>
                            <g className={style.cart__wheel2} transform="rotate(90,102,111)">
                                <circle className={style.cart__wheel} cx={102} cy={111} r={13} strokeDasharray="81.68 81.68" strokeDashoffset="81.68" />
                            </g>
                        </g>
                    </g>
                </svg>
            </div> :
                <>
                    <form onSubmit={(e) => e.preventDefault()} className="w-11/12 md:w-10/12 lg:w-9/12 m-auto pt-10 ">
                        <label htmlFor="default-search" className=" text-sm font-medium sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-sky-600 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" value={searchTerm} id="default-search" onChange={(e) => setSearchTerm(e.target.value)} className="rounded-3xl  block w-full p-4 ps-10 text-sm border border-gray-300 focus:outline-sky-600 shadow-md bg-gray-100 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" placeholder="Search..." required />
                            <button type="submit" className="rounded-3xl  text-white absolute end-2 bottom-2 bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus: font-medium text-sm px-6 py-2 dark:bg-sky-600 dark:hover:bg-sky-600 dark:focus:ring-sky-700">Search</button>
                        </div>
                    </form>

                    <div className='flex flex-wrap py-8 items-center justify-center'>
                        {filteredProducts.map((product) =>
                            <div key={product.id} className='w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 px-2 py-5 group overflow-hidden '>
                                <div onClick={() => { Navigate(`/ProductDetails/${product.id}/${product.category.name}`) }} >
                                    <div className='rounded-3xl shadow-lg transition-all p-3  hover:shadow-sky-600'>
                                        <img src={product.imageCover} className='w-full rounded-2xl' alt={product.title} />
                                        <div className='flex justify-between pt-2'>
                                            <h3 className='pt-1 text-sm font-medium text-sky-700'>{product.category.name}</h3>
                                            {!wishedItems.includes(product._id) ? <>
                                                <button onClick={(e) => { addProductToWishlist(product._id); e.stopPropagation() }}><Heart color='#f13' /></button>
                                            </> : <>
                                                <button onClick={(e) => { DeleteProductWishlist(product._id); e.stopPropagation() }}><Heart fill='#f13' color='#f13' /></button>
                                            </>}
                                            {/* <div onClick={(e) => { e.stopPropagation(); addProductToWishlist(product.id) }} className={style.heart} title="Like">
                                                <input type="checkbox" className={style.checkbox} id="Give-It-An-Id" />
                                                <div className={style.container}>
                                                    <svg viewBox="0 0 24 24" className={style.outline} xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
                                                        </path>
                                                    </svg>
                                                    <svg viewBox="0 0 24 24" className={style.filled} xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
                                                        </path>
                                                    </svg>
                                                    <svg className={style.celebrate} width={100} height={100} xmlns="http://www.w3.org/2000/svg">
                                                        <polygon points="10,10 20,20" />
                                                        <polygon points="10,50 20,50" />
                                                        <polygon points="20,80 30,70" />
                                                        <polygon points="90,10 80,20" />
                                                        <polygon points="90,50 80,50" />
                                                        <polygon points="80,80 70,70" />
                                                    </svg>
                                                </div>
                                            </div> */}
                                        </div>
                                        <h3 className=' text-lg font-medium '>{product.title.split(" ", 2).join(" ")}...</h3>
                                        <div className='flex justify-between items-center pt-1 pb-5'>
                                            <span className=' text-sm font-medium text-red-500'>{product.price} EGP</span>
                                            <span className=' text-sm  font-medium'><i className="text-yellow-400 fa-solid fa-star "></i>{product.ratingsAverage}</span>
                                        </div>
                                        <button onClick={(e) => { e.stopPropagation(); addProductToCart(product.id); }} className={`${style.cartBtn} w-full py-3 translate-y-28 group-hover:translate-y-0 transition-all`}>
                                            <svg id={style.cart} className='flex justify-center items-center' fill="white" viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" /></svg>
                                            ADD TO CART
                                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512" className={style.product}><path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3L628.5 127.4c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>)}
                    </div>

                </>


            }


        </>
    )
}
