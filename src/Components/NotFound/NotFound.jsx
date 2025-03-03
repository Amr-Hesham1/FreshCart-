import React from 'react'
import style from './NotFound.module.css'
import notfound from '../../assets/Oops! 404 Error with a broken robot-rafiki.png' 

export default function NotFound() {
    return (
        <>
            <img className='w-5/12 m-auto' src={notfound} alt="NotFound" />
        </>
    )
}
