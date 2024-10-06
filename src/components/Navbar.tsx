"use client"
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <>
            <div className='w-full h-16 bg-black flex justify-between items-center px-5'>
                <div className='text-white text-3xl font-bold'>Logo</div>
                <div className='flex gap-5'>
                    <Link href="/" className='text-white hover:text-gray-300 text-lg'>Home</Link>
                    <Link href="/browse" className='text-white hover:text-gray-300 text-lg'>Browse</Link>
                    <Link href="/genre" className='text-white hover:text-gray-300 text-lg'>Genre</Link>
                    <Link href="/tahun" className='text-white hover:text-gray-300 text-lg'>Tahun</Link>
                    <Link href="/country" className='text-white hover:text-gray-300 text-lg'>Country</Link>
                    <Link href="/about" className='text-white hover:text-gray-300 text-lg'>About</Link>
                </div>
                <div className='flex gap-5'>
                    <div className='flex items-center justify-center'>
                        <input type="text" placeholder='Search' className='bg-white text-black px-5 py-2 rounded-lg'
                            style={{ outline: 'none' }}
                        />
                        <svg xmlns="XXXXXXXXXXXXXXXXXXXXXXXXXX" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>

                    </div>
                    <button className='bg-white text-black px-5 py-2 rounded-lg'>Sign Up</button>
                </div>

            </div>
        </>
    )
}

export default Navbar