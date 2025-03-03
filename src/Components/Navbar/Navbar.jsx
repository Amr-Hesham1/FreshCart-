import React, { useContext, useState } from 'react'
import style from './Navbar.module.css'
import { Link, NavLink, replace, useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext';
import { CartContext } from '../Context/CartContext';

export default function Navbar() {
    const [IsOpen, setIsOpen] = useState(false);
    let { UserToken, setUserToken } = useContext(UserContext);
    let { Cart } = useContext(CartContext)
    const Location = useLocation();


    return (
        <>

            <header className="mx-auto bg-white  fixed inset-x-0 top-0 z-50 ">
                <nav className="flex items-center justify-between py-3  lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <Link to={'/'} className="  text-xl md:text-2xl font-bold text-gray-700 group hover:text-gray-900">
                            <h1><i className="transition-all text-sky-600 group-hover:text-sky-500 px-1 fa-solid fa-cart-shopping" />Fresh Cart</h1>
                        </Link>
                    </div>
<div className='lg:hidden'>
{UserToken ? <div className="flex lg:hidden">
                        <button onClick={() => setIsOpen(true)} type="button" className="-m-2.5 inline-flex items-center justify-center text-gray-500 hover:text-sky-600 rounded-md p-2.5 ">
                            <span className="sr-only">Open main menu</span>
                            <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div> :

                        <>
                            {Location.pathname.includes('/login') ?
                                <Link to={'/register'}>
                                    <button className=" group text-center w-28 rounded-3xl h-9 relative text-black text-xl font-semibold group" type="button">
                                        <div className="group-hover:bg-green-400 rounded-3xl h-9 w-9 flex items-center justify-center absolute left-0 top-0 group-hover:w-[103px] z-10 duration-500">
                                            <i className=" text-base text-green-400 group-hover:text-white fa-solid fa-address-card" />
                                        </div>
                                        <p className="translate-x-2 -translate-y-0.5 text-base">Register</p>
                                    </button>
                                </Link> :
                                <Link to={'/login'}>
                                    <button className=" group text-center w-28 rounded-3xl h-9 relative text-black text-xl font-semibold group" type="button">
                                        <div className="group-hover:bg-green-400 rounded-3xl h-9 w-9 flex items-center justify-center absolute left-0 top-0 group-hover:w-[103px] z-10 duration-500">
                                            {/* <i className=" text-lg text-white fa-solid fa-address-card" /> */}
                                            <i className=" text-base text-green-400 group-hover:text-white fa-solid fa-right-to-bracket" />
                                        </div>
                                        <p className="translate-x-1 -translate-y-0.5 text-base">Login</p>
                                    </button>
                                </Link>
                            }
                        </>
                    }
</div>

                    {
                        UserToken &&
                        <div className="hidden lg:flex lg:gap-x-8">
                            <NavLink to={'/'} className="text-sm/6 transition-all font-semibold text-gray-500 hover:text-sky-600 hover:text-sm hover:font-bold">Home</NavLink>
                            <NavLink to={'/cart'} className="text-sm/6 transition-all font-semibold text-gray-500 hover:text-sky-600 hover:text-sm hover:font-bold">Cart</NavLink>
                            <NavLink to={'/wishlist'} className="text-sm/6 transition-all font-semibold text-gray-500 hover:text-sky-600 hover:text-sm hover:font-bold">Wishlist</NavLink>
                            <NavLink to={'/products'} className="text-sm/6 transition-all font-semibold text-gray-500 hover:text-sky-600 hover:text-sm hover:font-bold">Products</NavLink>
                            <NavLink to={'/categories'} className="text-sm/6 transition-all font-semibold text-gray-500 hover:text-sky-600 hover:text-sm hover:font-bold">Categories</NavLink>
                            <NavLink to={'/brands'} className="text-sm/6 transition-all font-semibold text-gray-500 hover:text-sky-600 hover:text-sm hover:font-bold">Brands</NavLink>
                            <NavLink to={'/allorders'} className="text-sm/6 transition-all font-semibold text-gray-500 hover:text-sky-600 hover:text-sm hover:font-bold">AllOrders</NavLink>
                        </div>
                    }
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        {
                            UserToken ?
                                <>
                                    <div className='flex items-center'>
                                        <Link to={'/login'} onClick={() => { localStorage.removeItem("UserToken"), setUserToken(null) /* , Location.state("login")*/  /*navigator("/login")*/ }}>
                                            <button className={style.Btn}>
                                                <div className={style.sign}><svg id={style.svg1} viewBox="0 0 512 512"><path id={style.path1} d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg></div>
                                                <div className={style.text}>Logout</div>
                                            </button>
                                        </Link>

                                        <Link to={'/cart'} className='border-solid border-gray-300 border-s-2 p-2 ms-2'>
                                            <button data-quantity={Cart?.numOfCartItems} className={style.btn_cart}>
                                                <svg className={style.icon_cart} viewBox="0 0 24.38 30.52" height="30.52" width="24.38" xmlns="http://www.w3.org/2000/svg">
                                                    <path transform="translate(-3.62 -0.85)" d="M28,27.3,26.24,7.51a.75.75,0,0,0-.76-.69h-3.7a6,6,0,0,0-12,0H6.13a.76.76,0,0,0-.76.69L3.62,27.3v.07a4.29,4.29,0,0,0,4.52,4H23.48a4.29,4.29,0,0,0,4.52-4ZM15.81,2.37a4.47,4.47,0,0,1,4.46,4.45H11.35a4.47,4.47,0,0,1,4.46-4.45Zm7.67,27.48H8.13a2.79,2.79,0,0,1-3-2.45L6.83,8.34h3V11a.76.76,0,0,0,1.52,0V8.34h8.92V11a.76.76,0,0,0,1.52,0V8.34h3L26.48,27.4a2.79,2.79,0,0,1-3,2.44Zm0,0" />
                                                </svg>
                                                <span className={style.quantity}> </span>
                                            </button>

                                            {/* <i className="text-gray-500 hover:text-gray-600 text-2xl p-2 ms-2 border-solid group border-gray-300 border-s-2 fa-solid fa-cart-shopping relative transition-all "><span className='absolute transition-all -top-1 -right-1 text-white group-hover:bg-sky-500 bg-sky-600 px-1.5 py-0.5 rounded-3xl text-xs'>{Cart?.numOfCartItems}</span></i> */}
                                        </Link>                                    </div>
                                </>
                                :
                                <>
                                    {Location.pathname.includes('/login') ?
                                        <Link to={'/register'}>
                                            <button className=" group text-center w-28 rounded-3xl h-9 relative text-black text-xl font-semibold group" type="button">
                                                <div className="group-hover:bg-green-400 rounded-3xl h-9 w-9 flex items-center justify-center absolute left-0 top-0 group-hover:w-[103px] z-10 duration-500">
                                                    <i className=" text-base text-green-400 group-hover:text-white fa-solid fa-address-card" />
                                                </div>
                                                <p className="translate-x-2 -translate-y-0.5 text-base">Register</p>
                                            </button>
                                        </Link> :
                                        <Link to={'/login'}>
                                            <button className=" group text-center w-28 rounded-3xl h-9 relative text-black text-xl font-semibold group" type="button">
                                                <div className="group-hover:bg-green-400 rounded-3xl h-9 w-9 flex items-center justify-center absolute left-0 top-0 group-hover:w-[103px] z-10 duration-500">
                                                    {/* <i className=" text-lg text-white fa-solid fa-address-card" /> */}
                                                    <i className=" text-base text-green-400 group-hover:text-white fa-solid fa-right-to-bracket" />
                                                </div>
                                                <p className="translate-x-1 -translate-y-0.5 text-base">Login</p>
                                            </button>
                                        </Link>
                                    }
                                </>
                        }
                    </div>
                </nav>
                {/* Mobile menu, show/hide based on menu open state. */}
                <div className={IsOpen ? "lg:hidden" : "hidden"} role="dialog" aria-modal="true">
                    {/* Background backdrop, show/hide based on slide-over state. */}
                    <div onClick={() => setIsOpen(false)} className="fixed inset-0 z-50 transition-all duration-1000  backdrop-blur-sm bg-black bg-opacity-20 drop-shadow-2xl " />
                    <div onClick={() => setIsOpen(false)} className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <Link to="" className="-m-1.5 p-1.5 text-2xl font-bold text-gray-700 group hover:text-gray-900">
                                <span><i className=" text-sky-600 group-hover:text-sky-500 px-1 fa-solid fa-cart-shopping" />Fresh Cart</span>
                            </Link>
                            <div className='flex'>
                                {UserToken && <Link to={'/cart'} className='border-solid border-gray-300 border-e-2 p-2 me-2'>
                                    <button data-quantity={Cart?.numOfCartItems} className={style.btn_cart}>
                                        <svg className={style.icon_cart} viewBox="0 0 24.38 30.52" height="30.52" width="24.38" xmlns="http://www.w3.org/2000/svg">
                                            <path transform="translate(-3.62 -0.85)" d="M28,27.3,26.24,7.51a.75.75,0,0,0-.76-.69h-3.7a6,6,0,0,0-12,0H6.13a.76.76,0,0,0-.76.69L3.62,27.3v.07a4.29,4.29,0,0,0,4.52,4H23.48a4.29,4.29,0,0,0,4.52-4ZM15.81,2.37a4.47,4.47,0,0,1,4.46,4.45H11.35a4.47,4.47,0,0,1,4.46-4.45Zm7.67,27.48H8.13a2.79,2.79,0,0,1-3-2.45L6.83,8.34h3V11a.76.76,0,0,0,1.52,0V8.34h8.92V11a.76.76,0,0,0,1.52,0V8.34h3L26.48,27.4a2.79,2.79,0,0,1-3,2.44Zm0,0" />
                                        </svg>
                                        <span className={style.quantity}> </span>
                                    </button>

                                    {/* <i className="text-gray-500 hover:text-gray-600 text-2xl fa-solid fa-cart-shopping relative transition-all "><span className='absolute transition-all -top-4 -right-3 text-white group-hover:bg-sky-500 bg-sky-600 p-0.5  rounded-3xl text-xs'>{Cart?.numOfCartItems}</span></i> */}
                                </Link>}
                                <button onClick={() => setIsOpen(false)} type="button" className="-m-2.5 rounded-md p-2.5 text-gray-500 hover:text-red-600">
                                    <span className="sr-only">Close menu</span>
                                    <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>

                            </div>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                {
                                    UserToken &&
                                    <div className="space-y-2 py-6 border-solid border-gray-300 border-b-2">
                                        <NavLink to={'/'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-500 hover:bg-gray-50 hover:text-sky-600 hover:font-bold">Home</NavLink>
                                        <NavLink to={'/cart'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-500 hover:bg-gray-50 hover:text-sky-600 hover:font-bold">Cart</NavLink>
                                        <NavLink to={'/wishlist'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-500 hover:bg-gray-50 hover:text-sky-600 hover:font-bold">Wishlist</NavLink>
                                        <NavLink to={'/products'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-500 hover:bg-gray-50 hover:text-sky-600 hover:font-bold">Products</NavLink>
                                        <NavLink to={'/categories'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-500 hover:bg-gray-50 hover:text-sky-600 hover:font-bold">Categories</NavLink>
                                        <NavLink to={'/brands'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-500 hover:bg-gray-50 hover:text-sky-600 hover:font-bold">Brands</NavLink>
                                        <NavLink to={'/allorders'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-500 hover:bg-gray-50 hover:text-sky-600 hover:font-bold">AllOrders</NavLink>
                                    </div>
                                }
                                <div className="py-6">
                                    {
                                        UserToken ?
                                            <Link to={'/login'} onClick={() => { localStorage.removeItem("UserToken"), setUserToken(null)   /* , Location.state("login")*/ /*navigator("/login")*/ }}>
                                                <button className=" group text-center w-28 rounded-3xl h-9 relative text-black text-xl font-semibold group" type="button">
                                                    <div className="group-hover:bg-red-500 rounded-3xl h-9 w-9 flex items-center justify-center absolute left-0 top-0 group-hover:w-[103px] z-10 duration-500">
                                                        {/* <i className=" text-lg text-white fa-solid fa-address-card" /> */}
                                                        <i className=" text-base text-red-500 group-hover:text-white fa-solid fa-right-to-bracket" />
                                                    </div>
                                                    <p className="translate-x-1 -translate-y-0.5 text-base">Logout</p>
                                                </button>
                                            </Link> :
                                            <>
                                                {Location.pathname.includes('/login') ?
                                                    <Link to={'/register'} >
                                                        <button className=" group text-center w-28 rounded-3xl h-9 relative text-black text-xl font-semibold group" type="button">
                                                            <div className="group-hover:bg-green-400 rounded-3xl h-9 w-9 flex items-center justify-center absolute left-0 top-0 group-hover:w-[103px] z-10 duration-500">
                                                                <i className=" text-base text-green-400 group-hover:text-white fa-solid fa-address-card" />
                                                            </div>
                                                            <p className="translate-x-2 -translate-y-0.5 text-base">Register</p>
                                                        </button>
                                                    </Link> :
                                                    <Link to={'/login'} >
                                                        <button className=" group text-center w-28 rounded-3xl h-9 relative text-black text-xl font-semibold group" type="button">
                                                            <div className="group-hover:bg-green-400 rounded-3xl h-9 w-9 flex items-center justify-center absolute left-0 top-0 group-hover:w-[103px] z-10 duration-500">
                                                                <i class="text-base text-green-400 group-hover:text-white fa-solid fa-right-from-bracket"></i>
                                                            </div>
                                                            <p className="translate-x-1 -translate-y-0.5 text-base">Login</p>
                                                        </button>
                                                    </Link>}
                                            </>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
