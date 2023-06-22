'use client'

import { useCallback, useState } from 'react'
import {AiOutlineMenu} from 'react-icons/ai'
import Avatar from '../Avatar'
import MenutItems from './MenutItems'
import useRegisterModal from '../hooks/useRegisterModal'
import useLoginModal from '../hooks/useLoginModal'
import {signOut} from 'next-auth/react'
import { SafeUser } from '@/app/types/safeUser'
export default function UserMenu({
    currentUser
}:{
    currentUser?: SafeUser | null
}) {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = useCallback(()=>{
        console.log('clicked')
        setIsOpen((value) => !value)
    }, [])
    return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
            Airbnb your home
        </div>
        <div 
            onClick={toggleOpen}
            className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
        >
            <AiOutlineMenu/>
            <div className='hidden md:block'>
                <Avatar/>
            </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute rounded-xl shadow-md w-[20vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm text-start'>
            <div className='flex flex-col cursor-pointer'>
                {currentUser ? (
                    <>
                        <MenutItems
                            onClick={()=>{}}
                            label="My trips"
                        />
                        <MenutItems
                            onClick={()=>{}}
                            label="My favorites"
                        />
                        <MenutItems
                            onClick={()=>{}}
                            label="My reservations"
                        />
                        <MenutItems
                            onClick={()=>{}}
                            label="My properties"
                        />
                        <MenutItems
                            onClick={()=>{}}
                            label="Airbnb my home"
                        />
                        <hr/>
                        <MenutItems
                            onClick={()=>signOut()}
                            label="Logout"
                        />
                    </>
                ) : (
                    <>
                        <MenutItems
                            onClick={loginModal.onOpen}
                            label="Login"
                        />
                        <MenutItems
                            onClick={registerModal.onOpen}
                            label="Signup"
                        />
                    </>
                )}
            </div>
        </div>
      )}
    </div>
  )
}
