import React, { useState } from 'react'
import style from './ForgetPassword.module.css'
import forget from '../../assets/Forgot password-amico.png'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Alert } from "@heroui/react";
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup'


export const MailIcon = (props) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <path
                d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default function ForgetPassword() {
    const [IsLoading, setIsLoading] = useState(false)
    const [isVisible, setIsVisible] = React.useState(false);
    const [isInVisible, setIsInVisible] = React.useState(false);
    const [ApiError, setApiError] = useState(null);
    const Navigate = useNavigate();

    async function request(values) {
        try {
            setIsLoading(true);
            setApiError(null);
            setIsInVisible(false);
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
            console.log(data);
            setIsVisible(true);
            setIsLoading(false);
            setTimeout(() => { Navigate("/resetCode") }, 500);
        } catch (err) {
            setApiError(err.response.data.message);
            setIsInVisible(true);
            setIsLoading(false);
        }
    }

    let validationSchema = Yup.object().shape({
        email: Yup.string().required("Email Is Required").email("Email Invalid"),
    })

    const Formik = useFormik({
        initialValues: {
            email: "",
        }, validationSchema
        , onSubmit: request
    })
    return (
        <>
            <div className='my-10 m-auto lg:gap-10 grid md:grid-cols-5'>
                <img src={forget} className='md:col-span-2 w-full' alt="ForgetPassword" />
                <form onSubmit={Formik.handleSubmit} className="w-4/5 m-auto md:col-span-3">
                    <h1 className='text-center font-extrabold text-5xl text-sky-700 italic font-serif py-9 lg:pb-16'>Forget Password   <i className="fa-solid fa-lock"></i></h1>
                    {<Alert className='col-span-2 md:mx-6 my-6' color="success" description="Your action has been completed successfully. We'll notify you when updates are available." isVisible={isVisible} title="Success Notification" variant="faded" onClose={() => setIsVisible(false)} />}
                    {ApiError && <Alert className='col-span-2 md:mx-6 my-6' color="danger" description="Your action hasn't been completed successfully. We'll notify you when updates are available." isInVisible={isInVisible} title={ApiError} variant="faded" onClose={() => setIsInVisible(false)} />}
                    <Input value={Formik.values.email} onChange={Formik.handleChange} onBlur={Formik.handleBlur} className='col-span-2 md:mx-6 my-8 ' name='email' label="Email" type="email" endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />} />
                    <Button isLoading={IsLoading} type='submit' className='hover:shadow-xl hover:shadow-sky-600/50 hover:transition-all bg-sky-600 col-span-2 text-white w-full mt-5 md:mx-6   hover:-translate-y-1 transition-all'>
                        {IsLoading ? "Loading" : "Verify"}
                    </Button>
                </form>
            </div>
        </>
    )
}