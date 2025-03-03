import React, { useEffect, useState } from 'react'
import style from './CategorySlider.module.css'
import axios from 'axios'
import Slider from 'react-slick';


export default function CategorySlider() {

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1536, 
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 1280, 
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1024, 
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768, 
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 3,
                }
            }
        ]
    };
    const [Categories, setCategories] = useState([]);


    async function getCategories() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        setCategories(data.data)
    }

    useEffect(() => {
        getCategories()
    }, [])
    return (
        <>
            <Slider {...settings} className='rounded-3xl'>
                {Categories.map((category) =>                         
                <div key={category._id}  className='w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/5 pt-5'>
                            <div className='m-2 p-2 shadow-lg rounded-3xl  hover:shadow-md focus:outline-none transition-all focus:shadow-sky-600 focus:shadow-md hover:shadow-sky-600'>
                                <img src={category.image} alt={category.name} className='w-full h-[200px] md:h-[300px] object-cover object-top rounded-3xl' />
                                <h3 className='text-center text-sm md:text-lg font-semibold'>{category.name}</h3>
                            </div>
                        </div>)}
            </Slider>
        </>
    )
}
