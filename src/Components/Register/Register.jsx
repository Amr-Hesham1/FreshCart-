import React, { useContext, useState } from 'react'
import style from './Register.module.css'
import { Button, Input, Alert } from '@heroui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'

export default function Register() {

    const [IsLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = React.useState(false);
    const [isInVisible, setIsInVisible] = React.useState(false);
    const [ApiError, setApiError] = useState(null);
    const Navigate = useNavigate();
    let { setUserToken } = useContext(UserContext);

    async function register(values) {
        try {
            setIsLoading(true)
            setApiError(null);
            setIsInVisible(false);
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values);
            console.log(data);
            localStorage.setItem("UserToken", data.token);
            setUserToken(data.token);
            setIsVisible(true);
            setIsLoading(false);
            setTimeout(() => { Navigate("/") }, 500);
        } catch (err) {
            console.log(err)
            console.log(err.response.data.message);
            setApiError(err.response.data.message);
            setIsInVisible(true);
            setIsLoading(false);
        }
        // console.log(values);
    }
    let validationSchema = Yup.object().shape({
        name: Yup.string().required("Name Is Required").min(3, "Min Is 3").max(15, "Max Is 15"),
        email: Yup.string().required("Email Is Required").email("Email Invalid"),
        password: Yup.string().required("Password Is Required").matches(/^[A-Z]\w{4,10}/, "Password Invalid"),
        rePassword: Yup.string().required("RePassword Is Required").oneOf([Yup.ref("password")], "Password and RePassword don't Match"),
        phone: Yup.string().required("Phone Is Required").matches(/^01[0125][0-9]{8}$/, "accept only egypt phone numbers"),
    })

    const Formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''
        }, validationSchema
        , onSubmit: register
    })

    return (
        <>
            <div className='sm:my-10 m-auto '>
                <h1 className='text-center font-extrabold text-5xl text-sky-700 italic font-serif p-12'>Register   <i className="fa-solid fa-address-card" /></h1>
                <form onSubmit={Formik.handleSubmit} className="w-10/12 md:w-3/5 m-auto gap-6 grid grid-cols-2">
                    {<Alert className='col-span-2' color="success" description="Your action has been completed successfully. We'll notify you when updates are available." isVisible={isVisible} title="Success Notification" variant="faded" onClose={() => setIsVisible(false)} />}
                    {ApiError && <Alert className='col-span-2' color="danger" description="Your action hasn't been completed successfully. We'll notify you when updates are available." isInVisible={isInVisible} title={ApiError} variant="faded" onClose={() => setIsInVisible(false)} />}
                    <Input /*required errorMessage={Formik.touched.name && Formik.errors.name ? Formik.errors.name : ""}*/ value={Formik.values.name} onChange={Formik.handleChange} onBlur={Formik.handleBlur} className='col-span-2' name='name' label="Name" type="name" />
                    {Formik.touched.name && Formik.errors.name && <div className="col-span-2"><div ><Alert color="danger" title={Formik.errors.name} /></div></div>}
                    <Input /*required errorMessage={Formik.touched.email && Formik.errors.email ? Formik.errors.email : ""} */ value={Formik.values.email} onChange={Formik.handleChange} onBlur={Formik.handleBlur} className='col-span-2' name='email' label="Email" type="email" />
                    {Formik.touched.email && Formik.errors.email && <div className="col-span-2"><div ><Alert color="danger" title={Formik.errors.email} /></div></div>}
                    <Input /*required errorMessage={Formik.touched.password && Formik.errors.password ? Formik.errors.password : ""} */ value={Formik.values.password} onChange={Formik.handleChange} onBlur={Formik.handleBlur} className='col-span-2 md:col-span-1' name='password' label="Password" type="password" />
                    <Input /*required errorMessage={Formik.touched.rePassword && Formik.errors.rePassword ? Formik.errors.rePassword : ""} */ value={Formik.values.rePassword} onChange={Formik.handleChange} onBlur={Formik.handleBlur} className='col-span-2 md:col-span-1' name='rePassword' label="rePassword" type="password" />
                    {Formik.touched.password && Formik.errors.password && <div className="col-span-1"><div ><Alert color="danger" title={Formik.errors.password} /></div></div>}
                    {Formik.touched.rePassword && Formik.errors.rePassword && <div className="col-span-1"><div ><Alert color="danger" title={Formik.errors.rePassword} /></div></div>}
                    <Input /*required errorMessage={Formik.touched.phone && Formik.errors.phone ? Formik.errors.phone : ""} */ value={Formik.values.phone} onChange={Formik.handleChange} onBlur={Formik.handleBlur} className='col-span-2' name='phone' label="Phone" type="tel" />
                    {Formik.touched.phone && Formik.errors.phone && <div className="col-span-2"><div ><Alert color="danger" title={Formik.errors.phone} /></div></div>}
                    <Button isLoading={IsLoading} type='submit' className='hover:shadow-xl hover:shadow-sky-600/50 hover:transition-all bg-sky-600 col-span-2 text-white hover:-translate-y-1 transition-all'>
                        {IsLoading ? "Loading" : "Register"}
                    </Button>
                </form>
            </div>
        </>
    )
}
