'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Logo() {
    const router = useRouter()
  return (
    <Image
        alt='Logo'
        src={'/images/logo.png'}
        about=''
        height={100}
        width={100}
        className='hidden md:block cursor-pointer'
    />
  )
}
