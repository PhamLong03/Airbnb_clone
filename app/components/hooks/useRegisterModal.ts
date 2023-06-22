import {create} from 'zustand'

const useRegisterModal = create<{
    isOpen: boolean, onOpen: ()=> void, onClose:()=>void
}>((set) => ({
    isOpen: false,
    onOpen: ()=> set({isOpen: true}),
    onClose: ()=> set({isOpen: false})
}))

export default useRegisterModal