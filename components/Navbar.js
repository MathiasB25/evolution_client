import useAuthProvider from '../hooks/useAuthProvider'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const Navbar = () => {

    const { auth } = useAuthProvider()

    const [ accountModal, setAccountModal ] = useState(false)

    return (
        <header className='pb-3 md:pb-0 flex flex-col md:flex-row shadow-sm items-center mx-auto md:px-5 lg:px-28 justify-between font-semibold relative z-10'>
            <Link href={'/'}>
                <div className='flex text-sky-600 text-2xl uppercase gap-1 font-semibold h-10 my-2 md:my-0 md:h-16 items-center cursor-pointer'>
                    <div><i className="fas fa-copyright"></i></div>
                    <p className='font-bold'>Evolution</p>
                </div>
            </Link>
            <div className='flex gap-3 sm:gap-5'>
                <Link href={'/'}>
                    <div className='cursor-pointer p-1 hover:text-sky-600 transition-colors text-lg'>Inicio</div>
                </Link>
                <Link href={`${auth._id ? '/deposit' : '/signin'}`}>
                    <div className='cursor-pointer p-1 hover:text-sky-600 transition-colors text-lg'>Comprar Cripto</div>
                </Link>
                <Link href='/market'>
                    <div className='cursor-pointer p-1 hover:text-sky-600 transition-colors text-lg'>Mercado</div>
                </Link>
                <Link href={`${auth._id ? '/trade' : '/signin'}`}>
                    <div className='cursor-pointer p-1 hover:text-sky-600 transition-colors text-lg'>Trade</div>
                </Link>
            </div>
            { auth._id ? (
                <>
                    <div className='flex items-center gap-2 sm:hover:bg-zinc-200 sm:pl-3 sm:pr-1 cursor-pointer rounded-md transition-colors select-none' onClick={() => setAccountModal(!accountModal)}>
                        <div className='text-lg font-semibold'>{auth.name}</div>
                        <div className='h-12'><Image src={'/img/user.png'} width={50} height={50} /></div>
                    </div>
                    { accountModal && (
                        <div className='absolute z-10 p-4 shadow-xl rounded-b-md bg-white border-t border-sky-600 md:right-5 lg:right-28 flex flex-col gap-2 index-account'>
                            <div className='p-3 px-8 hover:bg-gray-100 transition-colors cursor-pointer rounded-md whitespace-nowrap select-none'>Cuenta</div>
                            <div className='p-3 px-8 hover:bg-gray-100 transition-colors cursor-pointer rounded-md whitespace-nowrap select-none'>Apariencia</div>
                            <div className='p-3 px-8 hover:bg-red-400 hover:text-white transition-colors cursor-pointer rounded-md whitespace-nowrap select-none'>Cerrar sesión</div>
                        </div>
                    )}
                </>
            ) : (
                <div className='flex my-5 md:my-0 gap-4 items-center'>
                    <Link href={'/signin'}>
                        <div className='cursor-pointer hover:text-sky-600 transition-colors'>Iniciar sesion</div>
                    </Link>
                    <Link href={'/signup'}>
                        <div className='cursor-pointer p-2 bg-sky-600 text-white rounded-md hover:bg-gradient-to-r from-sky-700 to-sky-500'>Registrarse</div>
                    </Link>
                </div>
            )}
        </header>
    )
}

export default Navbar