import React, { useEffect, useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios'

export default function Brands() {
    const [Brands, setBrands] = useState(null)
    const [SubBrand, setSubBrand] = useState(null)
    const [Loading, setLoading] = useState(true)



    async function getBrands() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
        setBrands(data.data)
        setLoading(false)

    }

    async function getSubBrand(brandId) {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`)
        setSubBrand(data.data)
        setLoading(false)
    }

    useEffect(() => {
        getBrands()
    }, [])

    return (
        <>
            {Loading ? <div className={`${style.preloader}  ${style.all} `}>
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
                                <circle className={style.cart__wheel} cx={102} cy={111} r={13} strokeDasharray="81.68 81.68" strokeDashoffset="81.68" />
                            </g>
                        </g>
                    </g>
                </svg>
            </div> :
                <div className='flex flex-wrap py-8 items-center justify-center '>
                    {Brands.map((brand) =>
                        <div key={brand._id} onClick={() => { getSubBrand(brand._id); setLoading(true) }} className='w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/5'>
                            <div className='m-2 p-2 shadow-lg rounded-3xl  hover:shadow-md focus:outline-none transition-all focus:shadow-sky-600 focus:shadow-md hover:shadow-sky-600'>
                                <img src={brand.image} alt={brand.name} className='w-full h-[150px] md:h-[200px]   object-cover rounded-3xl' />
                                <h3 className='text-center text-sm md:text-lg font-semibold'>{brand.name}</h3>
                            </div>
                        </div>
                    )}
                </div>

            }

{
                SubBrand&&<div onClick={()=>setSubBrand(null)} className='flex justify-center items-center  w-screen h-screen fixed inset-0 backdrop-blur-sm  z-10 '>
                <div onClick={(e)=> e.stopPropagation()} className="flex flex-col max-w-xs items-center bg-gray-100 rounded-3xl shadow-2xl md:flex-row md:max-w-xl ">
                    <img className="object-cover w-full rounded-3xl" src={SubBrand.image} alt />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight">{SubBrand.name}</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    </div>
                </div>
            </div>
}




        </>
    )
}
