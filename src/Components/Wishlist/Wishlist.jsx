import React, { useContext } from 'react'
import style from './Wishlist.module.css'
import axios from 'axios'
import { WishlistContext } from '../Context/WishlistContext'
import { CartContext } from '../Context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function Wishlist() {
    const Navigate = useNavigate();
    let { Wishlist, DeleteProductWishlist } = useContext(WishlistContext)
    let{addProductToCart} = useContext(CartContext)
    const headers = {
        token: localStorage.getItem("UserToken")
    }

    return (
        <>



            {Wishlist ? <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-white uppercase border-b-2 border-solid border-gray-100  dark:bg-gray-700 bg-sky-600 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-16 py-3">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Wishlist?.data.map((item) =>
                                <tr key={item._id} onClick={() => Navigate(`/ProductDetails/${item._id}/${item.category.name}`)} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="p-4">
                                        <img src={item.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {item.title}
                                        <button onClick={(e) => { e.stopPropagation(); DeleteProductWishlist(item._id) }} className=" font-semibold border-solid  flex md:px-6 px-3 justify-center items-center py-1 mt-5 rounded-3xl text-red-500 hover:bg-red-500 hover:text-white transition-all border-red-500 border-2"><i className="pe-3 fa-solid fa-trash" />Remove</button>

                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {item.price} EGP
                                    </td>
                                    <td className="px-3 py-4">
                                        <button onClick={(e) => { e.stopPropagation(); addProductToCart(item._id); }} className={`${style.cartBtn} w-36 md:w-48 py-3 `}>
                                            <svg id={style.cart} className='flex justify-center items-center' fill="white" viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" /></svg>
                                            ADD TO CART
                                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512" className={style.product}><path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3L628.5 127.4c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z" /></svg>
                                        </button>
                                    </td>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div> :
                <div className={`${style.preloader}  ${style.all} `}>
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
                                    <circle class={style.cart__wheel} cx={43} cy={111} r={13} strokeDasharray="81.68 81.68" strokeDashoffset="81.68" />
                                </g>
                                <g className={style.cart__wheel2} transform="rotate(90,102,111)">
                                    <circle class={style.cart__wheel} cx={102} cy={111} r={13} strokeDasharray="81.68 81.68" strokeDashoffset="81.68" />
                                </g>
                            </g>
                        </g>
                    </svg>
                </div>
            }



        </>
    )
}
