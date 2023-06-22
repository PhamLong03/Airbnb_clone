'use client'
import {signIn} from 'next-auth/react'
import {useCallback, useState} from 'react'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form'
import useLoginModal from '../hooks/useLoginModal'
import useRegisterModal from '../hooks/useRegisterModal'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../Input/Input'
import {toast} from 'react-hot-toast'
import Button from '../Button'
import {useRouter} from 'next/navigation'

export default function LoginModal() {
    const router = useRouter()
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback)=>{
            setIsLoading(false)
            if(callback?.ok) {
               toast.success('Logged in') 
               router.refresh()
               loginModal.onClose()
            }
            
            if(callback?.error) {
                console.log('err', callback.error)
            }
        }).then()
    }
    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='Welcom back'
                subtitle='Login to your account!'
            />
            <Input
                id='email'
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id='password'
                label='Password'
                type='password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <div className='relative flex flex-row'>
                <Button
                    outline
                    label='Continue to Google'
                    onClick={()=>{return}}
                />
                <FcGoogle size={25} className='absolute left-4 top-3 '/>
            </div>
            <div className='relative flex flex-row'>
                <Button
                outline
                label='Continue to Github'
                onClick={()=>{return}}
                />
                <AiFillGithub size={25} className='absolute left-4 top-3 '/>
            </div>
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='justify-center flex flex-row items-center gap-2'>
                    <div>
                        Already have an account?
                    </div>
                    <div 
                        className='text-neutral-800 cursor-pointer hover:underline hover:font-semibold'
                        onClick={registerModal.onClose}
                    >
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )
    return (
    <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title='Login'
        actionLabel='Continue'
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}
