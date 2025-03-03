import React from 'react'
import { Button, Input, Alert } from '@heroui/react'
import { useFormik } from 'formik'

export default function test() {
    const [IsLoading, setIsLoading] = useState(false)

    function register(values) {
        console.log(values);
        setIsLoading(true)
    }
    function validateForm(values) {
        let errors = {};
        if (!values.name /* = values.name = "" */) {
            errors.name = "Name Is Required"
        } else if (/^[A-z]\w{3,15}$/.test(values.name)) {
            errors.name = "Name Must Be At Least 3 Chars"
        }
        else if (!values.email) {
            errors.email = "Email Is Required"
        }
        else if (!values.password) {
            errors.password = "Password Is Required"
        }
        else if (!values.rePassword) {
            errors.rePassword = "RePassword Is Required"
        }
        else if (!values.phone) {
            errors.phone = "Phone Is Required"
        } else if (!/^01[0125][0-9]{8}$/.test(values.phone)) {
            errors.phone = "accept only egypt phone numbers"
        }

        return errors
    }

    const Formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''
        }, validate: validateForm
        , onSubmit: register
    })
    return (
        <div>
            <div className='my-14 m-auto'>
                <form onSubmit={Formik.handleSubmit} className="w-3/5 m-auto gap-5 grid grid-cols-2">
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
                    <Button isLoading={IsLoading} type='submit' className='bg-sky-600 col-span-2 text-white'>
                        {IsLoading ? "Loading" : "Register"}
                    </Button>
                </form>
            </div>

        </div>
    )
}





