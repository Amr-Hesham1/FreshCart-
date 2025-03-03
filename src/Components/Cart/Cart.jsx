import React, { useContext } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../Context/CartContext'
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {

    const Navigate = useNavigate();
    let { Cart, UpdateProductToCart, DeleteProductToCart, DeleteAllProductInCart } = useContext(CartContext)

    return (
        <>
            {
                Cart ? <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                                    Qty
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>


                        <thead className="text-sm text-center text-gray-700 bg-gray-50 uppercase border-b-2 border-solid border-gray-100">
                            <tr>
                                <th scope="col" className="">
                                </th>
                                <th scope="col" className=" flex justify-evenly py-4 ">
                                    <div className='pe-10'>total price : <span className='text-base px-2 text-sky-600'> {`${Cart.data.totalCartPrice} EGP`}</span></div>
                                    <div >total number of items :<span className='text-base px-2 text-sky-600'> {Cart.numOfCartItems}</span></div>
                                </th>
                                {Cart.numOfCartItems ? <>
                                    <th scope="col" className="">
                                        <Link to={'/cashOrder'}>
                                            <button className="relative  py-1 px-7 text-black text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-sky-600 before:to-sky-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
                                                CashOrder
                                            </button>
                                        </Link>

                                    </th>
                                    <th scope="col" className="">
                                        <Link to={'/CheckOut'}>
                                            <button className="relative py-1 px-7 text-black text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-sky-600 before:to-sky-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
                                                CheckOut
                                            </button>
                                        </Link>
                                    </th></> : <>
                                    <th scope="col" className="">

                                    </th>
                                    <th scope="col" className="">

                                    </th></>}
                                <th scope="col" className="">

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Cart.data.products.map((item, index) => <tr key={index} onClick={() => Navigate(`/ProductDetails/${item.product.id}/${item.product.category.name}`)} className="bg-white  border-b border-solid dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="p-4">
                                        <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={item.product.title} />
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {item.product.title}
                                    </td>
                                    <td onClick={(e) => e.stopPropagation()} className="px-6 py-4">
                                        <div className="flex items-center">
                                            <button disabled={item.count == 1} onClick={() => { UpdateProductToCart(item.product.id, item.count - 1) }} className="disabled:bg-gray-100  inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-solid border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                                <span className="sr-only">Quantity button</span>
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                                </svg>
                                            </button>
                                            <div>
                                                <span className="bg-gray-50 w-14 text-center border border-solid border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ">
                                                    {item.count}
                                                </span>
                                            </div>
                                            <button onClick={() => { UpdateProductToCart(item.product.id, item.count + 1) }} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-solid border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                                <span className="sr-only">Quantity button</span>
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {item.price * item.count} EGP
                                    </td>
                                    <td onClick={(e) => e.stopPropagation()} className="px-6 py-4">
                                        <button onClick={(e) => { e.stopPropagation(); DeleteProductToCart(item.product.id) }} className=" font-semibold border-solid  flex px-6 justify-center items-center py-2 rounded-3xl text-red-500 hover:bg-red-500 hover:text-white transition-all border-red-500 border-2"><i className="pe-3 fa-solid fa-trash" />Remove</button>

                                    </td>
                                </tr>
                                )
                            }


                        </tbody>

                    </table>
                    {Cart.numOfCartItems ?


                        <>
                            <div className='flex items-center justify-center gap-10 py-6 border-solid border-b-2 border-gray-200 hover:bg-gray-50 transition-all'>
                                <Link to={'/cashOrder'}>
                                    <button className="relative  py-2 px-8 text-black text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-sky-600 before:to-sky-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
                                        Cash Order
                                    </button>
                                </Link>
                                <Link to={'/checkOut'}>
                                    <button className="relative  py-2 px-8 text-black text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-sky-600 before:to-sky-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
                                        Check Out
                                    </button>
                                </Link>

                            </div>

                            <div className='py-6 hover:bg-gray-50 transition-all'>
                                <button onClick={() => { DeleteAllProductInCart(), Navigate("/") }} className={`${style.btn} m-auto `}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 69 14" className={`${style.svgIcon} ${style.bin_top}`}>
                                        <g clipPath="url(#clip0_35_24)">
                                            <path fill="black" d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z" />
                                        </g>
                                        <defs>
                                            <clipPath id={style.clip0_35_24}>
                                                <rect fill="white" height={14} width={69} />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 69 57" className={`${style.svgIcon} ${style.bin_bottom}`}>
                                        <g clipPath="url(#clip0_35_22)">
                                            <path fill="black" d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z" />
                                        </g>
                                        <defs>
                                            <clipPath id={style.clip0_35_22}>
                                                <rect fill="white" height={57} width={69} />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                            </div></> : <h1 className='text-center py-5 font-semibold text-gray-500'>Your Cart is empty</h1>
                    }
                </div>
                    :
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
                                        <circle className={style.cart__wheel} cx={43} cy={111} r={13} strokeDasharray="81.68 81.68" strokeDashoffset="81.68" />
                                    </g>
                                    <g className={style.cart__wheel2} transform="rotate(90,102,111)">
                                        <circle className={style.cart__wheel} cx={102} cy={111} r={13} strokeDasharray="81.68 81.68" strokeDashoffset="81.68" />
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
            }
        </>
    )
}
