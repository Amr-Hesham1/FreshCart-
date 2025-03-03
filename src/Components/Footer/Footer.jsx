import React, { useState } from 'react'
import style from './Footer.module.css'
import { Button, Input, Alert } from "@heroui/react";
import { small } from 'framer-motion/client';
import amazon from '../../assets/AmazonPay.png'
import express from '../../assets/AmericanExpress.png'
import visa from '../../assets/Visa&mastercard.png'
import paypal from '../../assets/Paypal.png'
import appleStor from '../../assets/AppleApp.png'
import googlePlay from '../../assets/download.webp'
import { Link } from 'react-router-dom';


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


export default function Footer() {
    const [IsLoading, setIsLoading] = useState(false);
    return (
        <>
            <div className='bg-gray-100/80 p-6 pb-14 '>
                <h2 className='font-bold text-2xl text-gray-700 group hover:text-gray-900 cursor-pointer w-fit'>Get The FreshCart App <i className="text-sky-600 group-hover:text-sky-500 fa-solid fa-mobile-screen-button"></i></h2>
                <p className='text-gray-500  text-sm'>We will send you a link, open it on your phone to download the app.</p>
                <div className='flex items-center sm:gap-6 gap-1 py-6 sm:px-4 px-0 border-gray-200 border-solid border-b-2'>
                    <Input className='w-2/3 sm:w-[75%] md:w-[85%]' variant={"bordered"} size={small} name='email' label="Email.." type="email" endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0 -translate-y-1.5 " />} />
                    <Button isLoading={IsLoading} onPress={() => { setIsLoading(true), setTimeout(() => { setIsLoading(false) }, 2000) }} type='submit' color="" variant="ghost" className='w-1/3  sm:w-[25%] md:w-[15%] py-3 border-solid border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white transition-all '>
                        {IsLoading ? "Loading" : "Share App Link"}
                    </Button>
                </div>
                <div className='lg:flex justify-between items-center px-4 border-gray-200 border-solid border-b-2'>
                    <div className='flex justify-between items-center py-3 lg:py-0'>
                        <span className='font-semibold text-gray-600 pe-3'>Payment Partners</span>
                        <div className='flex justify-between items-center'>
                            <Link to={"https://pay.amazon.com/"} ><img className='w-11 p-1' src={amazon} alt="Amazon" /></Link>
                            <Link to={"https://www.americanexpress.com/"} ><img className='w-11 p-1' src={express} alt="express" /></Link>
                            <Link to={"https://www.mastercard.us/"} ><img className='w-11 p-1' src={visa} alt="visa" /></Link>
                            <Link to={"https://www.paypal.com/"} ><img className='w-11 p-1' src={paypal} alt="paypal" /></Link>
                        </div>
                    </div>
                    <div className='flex  justify-between items-center py-3 lg:py-0'>
                        <span className='font-semibold text-gray-600 pe-3'>Get deliveries with FreshCart</span>
                        <div className='flex justify-between items-center'>
                            <Link to={"https://www.apple.com/"} ><img className='w-24 p-1' src={appleStor} alt="appleStor" /></Link>
                            <Link to={"https://play.google.com/"} ><img className='w-24' src={googlePlay} alt="googlePlay" /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
