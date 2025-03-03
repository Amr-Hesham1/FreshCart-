import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import axios from 'axios'

export default function Categories() {
    const [Categories, setCategories] = useState(null)
    const [Loading, setLoading] = useState(true);
    const [SubCategory, setSubCategory] = useState(null)
    const [Name, setName] = useState(null)

    async function getCategories() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        setCategories(data.data)
        setLoading(false)
    }
    async function getSubCategories(CategoriesId) {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${CategoriesId}/subcategories`)
        setSubCategory(data.data)
        console.log(data.data);
        setLoading(false)
    }

    useEffect(() => {
        getCategories()

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
                                <circle className={style.cart__wheel} cx={43} cy={111} r={13} strokeDasharray="81.68 81.68" strokeDashoffset="81.68" />
                            </g>
                            <g className={style.cart__wheel2} transform="rotate(90,102,111)">
                                <circle className={style.cart__wheel} cx={102} cy={111} r={13} strokeDasharray="81.68 81.68" strokeDashoffset="81.68" />
                            </g>
                        </g>
                    </g>
                </svg>
            </div> :
                <>
                    <div className='flex flex-wrap py-8 items-center justify-center '>
                        {Categories.map((category) =>

                            <div key={category._id} onClick={() => { getSubCategories(category._id); setName(category.name); setLoading(true) }} className='w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/5'>
                                <div className='m-2 p-2 shadow-lg rounded-3xl  hover:shadow-md focus:outline-none transition-all focus:shadow-sky-600 focus:shadow-md hover:shadow-sky-600'>
                                    <img src={category.image} alt={category.name} className='w-full h-[200px] sm:h-[300px] md:h-[300px] lg:h-[400px] object-cover object-top rounded-3xl' />
                                    <h3 className='text-center text-sm md:text-lg font-semibold'>{category.name}</h3>
                                </div>
                            </div>
                        )}

                    </div>
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
                                        <circle className={style.cart__wheel} cx={43} cy={111} r={13} strokeDasharray="81.68 81.68" strokeDashoffset="81.68" />
                                    </g>
                                    <g className={style.cart__wheel2} transform="rotate(90,102,111)">
                                        <circle className={style.cart__wheel} cx={102} cy={111} r={13} strokeDasharray="81.68 81.68" strokeDashoffset="81.68" />
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div> :
                        <div className='flex flex-wrap py-8 items-center justify-center'>

                            {Name && <h1 className='w-full text-center text-2xl pb-5 font-bold text-sky-600'>{`${Name} SubCategories`}</h1>}
                            {
                                SubCategory?.map((sub) =>
                                    <div key={sub._id} className='w-1/2 md:w-1/3  '>
                                        <div className='m-2 py-6 px-5 lg:px-10 shadow-lg rounded-3xl  hover:shadow-md focus:outline-none transition-all focus:shadow-sky-600 focus:shadow-md hover:shadow-sky-600'>
                                            <h3 className=' text-center text-lg md:text-xl  font-semibold'>{sub.name}</h3>
                                        </div>
                                    </div>)
                            }
                        </div>

                    }

                </>

            }
        </>
    )
}
