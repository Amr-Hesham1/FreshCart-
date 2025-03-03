import React, { useEffect, useState } from 'react'
import style from './AllOrders.module.css'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';

export default function AllOrders() {
    let token = localStorage.getItem('UserToken');
    let decode = jwtDecode(token);
    const [Order, setOrder] = useState(null);
    const [Loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null); // Track the selected order


    async function allUserOrders() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${decode.id}`)
        setOrder(data);
        console.log(data);

        setLoading(false);

    }
    useEffect(() => {
        allUserOrders()
    }, [])
    return (
        <>
            {
                Loading ? <div className={`${style.preloader}  ${style.all} `}>
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
                </div> :
                    <>
                        <div>
                            <div className='flex flex-wrap  '>
                                {Order?.map((order) => (
                                    <div key={order.id} className='w-full md:w-1/2 lg:w-1/2 xl:w-1/3   '>
                                        <div className='m-2 rounded-3xl hover:shadow-sky-600 hover:shadow-lg    shadow-2xl bg-gray-200'>
                                            <div className='flex justify-between py-2 px-4  rounded-t-3xl bg-sky-600 border-solid border-gray-600 border-b-2 text-white'>
                                                <p className=' font-semibold'>Order ID : <span className='text-gray-700 font-bold' > {order.id}</span></p>
                                                <p className='font-semibold'>{order.paidAt?.substring(0,10)}</p>
                                            </div>
                                            <div className='px-2 p-4'>
                                                <p className=' font-bold'>Order Price : <span className='font-semibold text-red-600'>{order.totalOrderPrice} EGP</span></p>
                                                <p className=' font-bold'>Payment Method : <span className='font-semibold text-sky-600'>{order.paymentMethodType} </span>
                                                    <span className='font-bold mx-1 text-xs'>{order.isPaid ? <span className=' bg-green-500 uppercase rounded-lg p-1 shadow-md shadow-green-500'>Paid</span> : <span className=' bg-red-600 rounded-lg uppercase p-1 shadow-md shadow-red-600'>Not Paid</span>}</span>
                                                    <span className='font-bold mx-1 text-xs'>{order.isDelivered ? <span className=' bg-green-500 uppercase rounded-lg p-1 shadow-md shadow-green-500'>Is Delivered</span> : <span className=' bg-red-600 uppercase rounded-lg p-1 shadow-md shadow-red-600'>Not Delivered</span>}</span>

                                                </p>
                                                <button onClick={() => setSelectedOrder(order)} className="w-full font-bold border-solid  flex mt-7 justify-center items-center py-2 rounded-3xl text-sky-600 hover:bg-sky-600 hover:text-white transition-all border-sky-600 border-2">Order Details</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {selectedOrder && (
                            <div onClick={() => setSelectedOrder(null)} className='flex justify-center items-center  w-screen h-screen fixed inset-0 backdrop-blur-sm  z-20'>
                                <div onClick={(e) => e.stopPropagation()} className='xl:w-5/12 w-10/12 md:w-3/5 bg-white shadow-2xl  p-5 rounded-3xl'>
                                    <p className='font-bold text-sky-600 text-xl my-3'>Order Items :</p>
                                    {selectedOrder?.cartItems?.map((item, index) => (
                                        <div key={index} className='my-3 md:px-7'>
                                            <div className='flex p-2 justify-between'>
                                                <p className='font-semibold'>- {item.product.title.split(' ', 3).join(' ')}</p>
                                                <p className=' font-semibold text-red-600'>{item.price} EGP</p>
                                            </div>
                                            <hr />
                                        </div>
                                    ))}
                                    <div className='py-6 text-center'>
                                        <p className='font-bold text-lg  text-sky-600'>Total Price : <span className=' text-red-600'>{selectedOrder.totalOrderPrice} EGP</span> </p>
                                    </div>
                                </div>
                            </div>
                        )}

                    </>


            }
        </>
    )
}
