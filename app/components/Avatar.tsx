'use client'

import React from 'react'
import Image from 'next/image'
export default function Avatar({
  src
}:{
  src?: string
}) {
  return (
    <Image
        className='rounded-full'
        height={30}
        width={30}
        alt='Avatar'
        src={'/images/placeholder.jpg'}
    />
  )
}
