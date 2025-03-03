import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import Slider from "react-slick";
import axios from 'axios'
import { CartContext } from '../Context/CartContext';
import { filter } from 'framer-motion/client';
import { WishlistContext } from '../Context/WishlistContext';
import { Heart } from 'lucide-react';

export default function ProductDetails() {
    let { addProductToCart } = useContext(CartContext)
    let { addProductToWishlist, DeleteProductWishlist, wishedProduct, wishedItems } = useContext(WishlistContext)
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    const [Product, setProduct] = useState([]);
    const Navigate = useNavigate()
    const [RelatedProduct, setRelatedProduct] = useState([]);
    const [Loading, setLoading] = useState(true);
    const { id, category } = useParams()

    async function getProduct(productId) {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
        setProduct(data.data)
        setLoading(false);
    }


    async function getRelatedProduct(category) {
        setLoading(true)
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
        let allProducts = data.data;
        let Related = allProducts.filter((Product) => Product.category.name == category)
        setRelatedProduct(Related)
        setLoading(false);
    }

    useEffect(() => {
        getProduct(id)
        getRelatedProduct(category)
    }, [id, category])
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
                    <div className='sm:flex justify-center  items-center gap-5 border-b-2 border-gray-200 border-solid pt-5 pb-20 '>
                        <div className='w-full sm:w-1/3 lg:w-1/4 sm:pe-1 border-gray-200 sm:border-solid border-e-2'>
                            <Slider {...settings}>
                                {Product.images.map((image, index) => <img key={index} src={image} className='w-full rounded-3xl' alt={Product.title} />)}
                            </Slider>
                        </div>
                        <div className='w-full sm:2/3 lg:w-3/4 p-10'>
                            <h2 className=' text-4xl font-bold'>{Product.title}</h2>
                            <p className='py-4 text-slate-600 font-normal'>{Product.description}</p>
                            <div className='flex justify-between'>
                                <p className='pb-4 text-sm font-medium text-sky-700'>{Product.category.name}</p>

                                {!wishedItems.includes(Product._id) ? <>
                                    <button onClick={() => addProductToWishlist(Product._id)}><Heart color='#f13' /></button>
                                </> : <>
                                    <button onClick={() => DeleteProductWishlist(Product._id)}><Heart fill='#f13' color='#f13' /></button>
                                </>}
                                {/* <div onClick={(e) => { e.stopPropagation() }} className={`${style.heart} ${wishedProduct(Product._id) ? style.loved : style.notLoved}`} title="Like">
                                    <input type="checkbox" className={style.checkbox} id="Give-It-An-Id" />
                                    <div className={style.container}>
                                        <svg viewBox="0 0 24 24" className={style.outline} xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
                                            </path>
                                        </svg>
                                        <svg viewBox="0 0 24 24" className={style.filled} xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
                                            </path>
                                        </svg>
                                        <svg className={style.celebrate} width={100} height={100} xmlns="http://www.w3.org/2000/svg">
                                            <polygon points="10,10 20,20" />
                                            <polygon points="10,50 20,50" />
                                            <polygon points="20,80 30,70" />
                                            <polygon points="90,10 80,20" />
                                            <polygon points="90,50 80,50" />
                                            <polygon points="80,80 70,70" />
                                        </svg>
                                    </div>
                                </div> */}

                            </div>
                            <div className='flex justify-between items-center pt-1 pb-5'>
                                <span className=' text-sm font-medium text-red-500'>{Product.price} EGP</span>
                                <span className=' text-sm  font-medium '><i className="text-yellow-400 fa-solid fa-star"></i>{Product.ratingsAverage}</span>

                            </div>
                            <button onClick={() => addProductToCart(Product.id)} className={`${style.btn} w-full `}>
                                <div className={style.default_btn}>
                                    <svg viewBox="0 0 24 24" width={20} height={20} stroke="#ffffff" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" className="cart-icon">
                                        <circle cx={9} cy={21} r={1} />
                                        <circle cx={20} cy={21} r={1} />
                                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                    </svg>
                                    <span>Add to Cart</span>
                                </div>
                                <div className={style.hover_btn}>
                                    <span >{Product.price} EGP</span>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-wrap pt-10 items-center justify-center'>
                        {RelatedProduct.map((product) =>
                            <div className='w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 px-2 py-5 group overflow-hidden '>
                                <div onClick={() => { Navigate(`/ProductDetails/${product.id}/${product.category.name}`) }} >
                                    <div className='rounded-3xl shadow-lg transition-all p-3  hover:shadow-sky-600'>
                                        <img src={product.imageCover} className='w-full rounded-2xl' alt={product.title} />
                                        <div className='flex justify-between pt-2'>
                                            <h3 className='pt-1 text-sm font-medium text-sky-700'>{product.category.name}</h3>
                                            <div onClick={(e) => { e.stopPropagation() }} className={style.heart} title="Like">
                                                <input type="checkbox" className={style.checkbox} id="Give-It-An-Id" />
                                                <div className={style.container}>
                                                    <svg viewBox="0 0 24 24" className={style.outline} xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
                                                        </path>
                                                    </svg>
                                                    <svg viewBox="0 0 24 24" className={style.filled} xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
                                                        </path>
                                                    </svg>
                                                    <svg className={style.celebrate} width={100} height={100} xmlns="http://www.w3.org/2000/svg">
                                                        <polygon points="10,10 20,20" />
                                                        <polygon points="10,50 20,50" />
                                                        <polygon points="20,80 30,70" />
                                                        <polygon points="90,10 80,20" />
                                                        <polygon points="90,50 80,50" />
                                                        <polygon points="80,80 70,70" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <h3 className=' text-lg font-medium '>{product.title.split(" ", 2).join(" ")}...</h3>
                                        <div className='flex justify-between items-center pt-1 pb-5'>
                                            <span className=' text-sm font-medium text-red-500'>{product.price} EGP</span>
                                            <span className=' text-sm  font-medium'><i className="text-yellow-400 fa-solid fa-star "></i>{product.ratingsAverage}</span>
                                        </div>
                                        <button onClick={(e) => { e.stopPropagation(); addProductToCart(product.id); }} className={`${style.cartBtn} w-full py-3 translate-y-28 group-hover:translate-y-0 transition-all`}>
                                            <svg id={style.cart} className='flex justify-center items-center' fill="white" viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" /></svg>
                                            ADD TO CART
                                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512" className={style.product}><path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3L628.5 127.4c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>)}
                    </div>


                </>
            }
        </>
    )
}
