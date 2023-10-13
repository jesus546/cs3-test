import { setDarkState, useDarkState } from '@/store/dark/darkSlice'
import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsMoonStarsFill, BsFillSunFill } from 'react-icons/bs';

const Nav: React.FC = () => {
    const dark = useSelector(useDarkState)
    const dispatch = useDispatch()
    return (
        <nav className="bg-white border-b fixed w-full shadow border-gray-200 dark:bg-gray-900">
            <div className=" flex flex-wrap items-center justify-between p-4 mx-4.5">
                <Link href='/' className="flex items-center">
                    <img src="https://cs3.com.co/uploads/2/2019-04/logo_cs3_2.png" className="h-8 mr-3" alt="cs3 logo" />
                    <span className="self-center text-lg md:block  sm:hidden font-semibold whitespace-nowrap dark:text-white">Comercializadora de software</span>
                </Link>
                <button data-collapse-toggle="navbar-default" type="button" className="sm:inline-flex items-center p-2 w-10 h-10 justify-center text-sm  text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li className='cursor-pointer'>
                            <Link className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" href='/'>
                             Home
                            </Link>
                        </li>
                        <li onClick={() => dispatch(setDarkState(!dark))} className='cursor-pointer flex items-center justify-center'>
                            <span  className="  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">  {!dark ? <BsMoonStarsFill/> : <BsFillSunFill/>}</span>
                        </li>
                      
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav