import React from 'react'
import style from './MainSlider.module.css'
import slider1 from '../../assets/Slider/slider-image-1.jpeg'
import slider2 from '../../assets/Slider/slider-image-2.jpeg'
import slider3 from '../../assets/Slider/slider-image-3.jpeg'
import banner1 from '../../assets/Slider/grocery-banner.png'
import banner2 from '../../assets/Slider/grocery-banner-2.jpeg'
import Slider from 'react-slick';


export default function MainSlider() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <>
            <div className='flex shadow-2xl rounded-3xl '>
                <div className='w-2/3 md:w-3/4 '>
                    <Slider {...settings}>
                        <img src={slider1} className='rounded-s-3xl w-full h-[200px] md:h-[300px] lg:h-[400px] xl:h-[500px]   object-cover object-right' alt="slider1" />
                        <img src={slider2} className='rounded-s-3xl w-full h-[200px] md:h-[300px] lg:h-[400px] xl:h-[500px]   object-cover object-right' alt="slider2" />
                        <img src={slider3} className='rounded-s-3xl w-full h-[200px] md:h-[300px] lg:h-[400px] xl:h-[500px]   object-cover object-right' alt="slider3" />

                    </Slider>
                </div>
                <div className='w-1/3 md:1/4'>
                    <img src={banner1} className='rounded-tr-3xl w-full h-[100px] md:h-[150px] lg:h-[200px] xl:h-[250px]   object-cover ' alt="banner1" />
                    <img src={banner2} className='rounded-br-3xl w-full h-[100px] md:h-[150px] lg:h-[200px] xl:h-[250px]   object-cover ' alt="banner2" />
                </div>
            </div>
        </>
    )
}
