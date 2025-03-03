import React, { useState } from 'react'
import style from './ResetCode.module.css'
import code from '../../assets/Enter OTP-amico.png'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Alert, InputOtp } from "@heroui/react";
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

export default function ResetCode() {
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
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values)
            console.log(data);
            setIsVisible(true);
            setIsLoading(false);
            setTimeout(() => { Navigate("/resetPassword") }, 500);
        } catch (err) {
            setApiError(err.response.data.message);
            setIsInVisible(true);
            setIsLoading(false);
        }
    }

    let validationSchema = Yup.object().shape({
        resetCode: Yup.string().required("Code Is Required"),
    })

    const Formik = useFormik({
        initialValues: {
            resetCode: 535863,
        }, validationSchema
        , onSubmit: request
    })
    return (
        <>
            <>
                <div className='my-10 m-auto lg:gap-10 grid md:grid-cols-5'>
                    <img src={code} className='md:col-span-2 w-full ' alt="ResetCode" />
                    <form onSubmit={Formik.handleSubmit} className=" w-4/5 m-auto md:col-span-3">
                        <h1 className='text-center font-extrabold text-5xl text-sky-700 italic font-serif py-9 lg:py-16'>ResetCode   <i class="fa-solid fa-key"></i></h1>
                        {<Alert className='col-span-2 md:mx-6 my-6' color="success" description="Your action has been completed successfully. We'll notify you when updates are available." isVisible={isVisible} title="Success Notification" variant="faded" onClose={() => setIsVisible(false)} />}
                        {ApiError && <Alert className='col-span-2 md:mx-6 my-6' color="danger" description="Your action hasn't been completed successfully. We'll notify you when updates are available." isInVisible={isInVisible} title={ApiError} variant="faded" onClose={() => setIsInVisible(false)} />}
                        <div className='flex flex-col items-center justify-center w-full'>
                            <p className="text-default-500 text-small mb-2">6 digits OTP</p>
                            <InputOtp isRequired={false} value={Formik.values.resetCode} onChange={Formik.handleChange} onBlur={Formik.handleBlur} name='resetCode' length={6} />
                        </div>
                        <Button isLoading={IsLoading} type='submit' className='hover:shadow-xl hover:shadow-sky-600/50 hover:transition-all bg-sky-600 col-span-2 text-white w-full mt-5 md:mx-6  hover:-translate-y-1 transition-all'>
                            {IsLoading ? "Loading" : "Verify"}
                        </Button>
                    </form>
                </div>
            </>
        </>
    )
}
{/* <div className='w-11/12 my-10 m-auto gap-10 grid grid-cols-2'>
<img src={code} className='col-span-1' alt="Login" />
<form onSubmit={Formik.handleSubmit} className=" w-4/5 m-auto col-span-1">
    <h1 className='text-center font-extrabold text-5xl text-sky-700 italic font-serif pb-16'>ResetCode   <i class="fa-solid fa-key"></i></h1>
    {<Alert className='col-span-2 mx-6 my-8' color="success" description="Your action has been completed successfully. We'll notify you when updates are available." isVisible={isVisible} title="Success Notification" variant="faded" onClose={() => setIsVisible(false)} />}
    {ApiError && <Alert className='col-span-2 mx-6 my-8' color="danger" description="Your action hasn't been completed successfully. We'll notify you when updates are available." isInVisible={isInVisible} title={ApiError} variant="faded" onClose={() => setIsInVisible(false)} />}

    <div>
        <p className="text-default-500 text-small col-span-2 m-au mx-6 my-8">6 digits OTP</p>
        <InputOtp length={6} />
    </div>
    <Button value={Formik.values.email} onChange={Formik.handleChange} onBlur={Formik.handleBlur} isLoading={IsLoading} type='submit' className='bg-sky-600 col-span-2 text-white w-full m-6  hover:-translate-y-1 transition-all'>
        {IsLoading ? "Loading" : "Verify"}
    </Button>
</form>
</div> */}