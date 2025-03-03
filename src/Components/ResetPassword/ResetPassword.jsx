import React, { useState } from 'react'
import style from './ResetPassword.module.css'
import reset from '../../assets/Reset password-amico.png'
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

export const LockIcon = (props) => {
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
                d="M12.0011 17.3498C12.9013 17.3498 13.6311 16.6201 13.6311 15.7198C13.6311 14.8196 12.9013 14.0898 12.0011 14.0898C11.1009 14.0898 10.3711 14.8196 10.3711 15.7198C10.3711 16.6201 11.1009 17.3498 12.0011 17.3498Z"
                fill="currentColor"
            />
            <path
                d="M18.28 9.53V8.28C18.28 5.58 17.63 2 12 2C6.37 2 5.72 5.58 5.72 8.28V9.53C2.92 9.88 2 11.3 2 14.79V16.65C2 20.75 3.25 22 7.35 22H16.65C20.75 22 22 20.75 22 16.65V14.79C22 11.3 21.08 9.88 18.28 9.53ZM12 18.74C10.33 18.74 8.98 17.38 8.98 15.72C8.98 14.05 10.34 12.7 12 12.7C13.66 12.7 15.02 14.06 15.02 15.72C15.02 17.39 13.67 18.74 12 18.74ZM7.35 9.44C7.27 9.44 7.2 9.44 7.12 9.44V8.28C7.12 5.35 7.95 3.4 12 3.4C16.05 3.4 16.88 5.35 16.88 8.28V9.45C16.8 9.45 16.73 9.45 16.65 9.45H7.35V9.44Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default function ResetPassword() {
    const [IsLoading, setIsLoading] = useState(false)
    const [isVisible, setIsVisible] = React.useState(false);
    const [isInVisible, setIsInVisible] = React.useState(false);
    const [ApiError, setApiError] = useState(null);
    const Navigate = useNavigate();

    async function request(values) {
        console.log("Hi")
        try {
            setIsLoading(true);
            setApiError(null);
            setIsInVisible(false);
            let { data }  = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
            console.log(data);
            localStorage.setItem("UserToken", data.token);
            setIsVisible(true);
            setIsLoading(false);
            setTimeout(() => { Navigate('/') }, 500);
        } catch (err) {
            setApiError(err.response.data.message);
            setIsInVisible(true);
            setIsLoading(false);
        }
    }

    let validationSchema = Yup.object().shape({
        email: Yup.string().required("Email Is Required").email("Email Invalid"),
        newPassword: Yup.string().required("Password Is Required").matches(/^[A-Z]\w{4,10}/, "Password Invalid"),
    })

    const Formik = useFormik({
        initialValues: {
            email: "",
            newPassword: ""
        }, validationSchema
        , onSubmit: request
    })
    return (
        <>
            <div className='my-10 m-auto lg:gap-10 grid md:grid-cols-5'>

                <img src={reset} className='md:col-span-2 w-full' alt="ResetPassword" />
                <form onSubmit={Formik.handleSubmit} className="w-4/5 m-auto md:col-span-3">
                    <h1 className='text-center font-extrabold text-5xl text-sky-700 italic font-serif pb-16'>Reset Password   <i class="fa-solid fa-unlock"></i></h1>
                    {<Alert className='col-span-2 md:mx-6 my-6' color="success" description="Your action has been completed successfully. We'll notify you when updates are available." isVisible={isVisible} title="Success Notification" variant="faded" onClose={() => setIsVisible(false)} />}
                    {ApiError && <Alert className='col-span-2 md:mx-6 my-6' color="danger" description="Your action hasn't been completed successfully. We'll notify you when updates are available." isInVisible={isInVisible} title={ApiError} variant="faded" onClose={() => setIsInVisible(false)} />}
                    <Input value={Formik.values.email} onChange={Formik.handleChange} onBlur={Formik.handleBlur} className='col-span-2 md:mx-6 my-6 ' name='email' label="Email" type="email" endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />} />
                    <Input value={Formik.values.newPassword} onChange={Formik.handleChange} onBlur={Formik.handleBlur} className='col-span-2 md:mx-6 my-6 ' name='newPassword' label="Password" type="password" endContent={<LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />} />
                    <Button isLoading={IsLoading} type='submit' className='hover:shadow-xl hover:shadow-sky-600/50 hover:transition-all bg-sky-600 col-span-2 text-white w-full mt-5 md:mx-6  hover:-translate-y-1 transition-all'>
                        {IsLoading ? "Loading" : "Reset Password"}
                    </Button>
                </form>
            </div>
        </>
    )
}
