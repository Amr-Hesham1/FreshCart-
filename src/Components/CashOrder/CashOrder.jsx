import React, { useContext, useState } from 'react'
import style from './CashOrder.module.css'
import cashOrder from '../../assets/Self checkout-rafiki.png'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Alert } from "@heroui/react";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { CartContext } from '../Context/CartContext';
import { cite, details } from 'framer-motion/client';
import toast from 'react-hot-toast';

export default function CashOrder() {
    const [IsLoading, setIsLoading] = useState(false)
    const [isVisible, setIsVisible] = React.useState(false);
    const [isInVisible, setIsInVisible] = React.useState(false);
    const [ApiError, setApiError] = useState(null);
    const headers = {
        token: localStorage.getItem("UserToken")
    }
    let { Cart } = useContext(CartContext);

    async function request(shippingAddress) {
        try {
            setIsLoading(true);
            setApiError(null);
            setIsInVisible(false);
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${Cart.cartId}`, { shippingAddress }, { headers })
            console.log(data);
            setIsVisible(true);
            setIsLoading(false);
            toast.success(`Payment ${data.status}`)
            setTimeout(() => { location.href = data.session.url }, 500);
        } catch (err) {
            setApiError(err.response.data.message);
            setIsInVisible(true);
            setIsLoading(false);
        }
    }
    let validationSchema = Yup.object().shape({
        phone: Yup.string().required("Phone Is Required").matches(/^01[0125][0-9]{8}$/, "accept only egypt phone numbers"),
    })


    const Formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: ""
        }, validationSchema
        , onSubmit: request
    })

    return (
        <>
            <div className='my-10 m-auto lg:gap-10 grid md:grid-cols-5'>

                <img src={cashOrder} className='md:col-span-2 w-full ' alt="CheckOut" />
                <form onSubmit={Formik.handleSubmit} className=" w-4/5 m-auto md:col-span-3">
                    <h1 className='text-center font-extrabold text-5xl text-sky-600 italic font-serif pb-9 lg:py-16'>CashOrder      <i className="fa-solid fa-credit-card"></i></h1>
                    {<Alert className='col-span-2 md:mx-6 my-6' color="success" description="Your action has been completed successfully. We'll notify you when updates are available." isVisible={isVisible} title="Success Notification" variant="faded" onClose={() => setIsVisible(false)} />}
                    {ApiError && <Alert className='col-span-2 md:mx-6 my-6' color="danger" description="Your action hasn't been completed successfully. We'll notify you when updates are available." isInVisible={isInVisible} title={ApiError} variant="faded" onClose={() => setIsInVisible(false)} />}
                    <Input value={Formik.values.details} onChange={Formik.handleChange} onBlur={Formik.handleBlur} className='col-span-2 md:mx-6 my-8 ' name='details' label="Details" type="text" />
                    <Input value={Formik.values.phone} onChange={Formik.handleChange} onBlur={Formik.handleBlur} className='col-span-2 md:mx-6 my-6 ' name='phone' label="Phone" type="tel" />
                    {/* {Formik.touched.phone && Formik.errors.phone && <div className="col-span-2 w-full m-6"><div ><Alert color="danger" title={Formik.errors.phone} /></div></div>} */}
                    <Input value={Formik.values.city} onChange={Formik.handleChange} onBlur={Formik.handleBlur} className='col-span-2 md:mx-6 my-6 ' name='city' label="City" type="text" />
                    <Button isLoading={IsLoading} type='submit' className='hover:shadow-xl hover:shadow-sky-600/50 hover:transition-all bg-sky-600 col-span-2 text-white w-full mt-5 md:mx-6  hover:-translate-y-1 transition-all '>
                        {IsLoading ? "Loading" : "Pay Now"}
                    </Button>
                </form>
            </div>
        </>
    )
}
