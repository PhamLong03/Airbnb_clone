'use client'

import React from 'react'

export default function MenutItems({
    label, onClick
}:{
    label: string,
    onClick: ()=>void
}) {
  return (
    <div 
        onClick={onClick}
        className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'>
            {label}
    </div>
  )
}
