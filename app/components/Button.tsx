'use client'

import { Icon } from 'next/dist/lib/metadata/types/metadata-types'
import React from 'react'
import { IconBase, IconType } from 'react-icons/lib'

export default function Button({
    label, disable, onClick, outline, small, icon
}:{
    label: string, 
    disable?: boolean,
    onClick: (e: React.MouseEvent<HTMLButtonElement>)=> void,  
    outline?: boolean, 
    small?: boolean,
    icon?: IconType
}) {
  return (
    <button className={
      `relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full 
      ${outline ? 'bg-white border-black text-black':'bg-rose-500 border-rose-500 text-white'}
      ${small ? 'py-1 text-sm font-light border-[1px]':'py-3 text-md font-semibold border-2'}
      `}
      onClick={onClick}
      disabled={disable}
      >
        {label}
    </button>
  )
}
