import { useEffect, useState } from "react"
import Image from "next/image"
import Head from "next/head"
import Link from "next/link"
import useAuthProvider from "../hooks/useAuthProvider"
import { useRouter } from "next/router"

const LayoutPrivate = ({children, page}) => {

    const router = useRouter()
    const { auth } = useAuthProvider()

    const [ menu, setMenu ] = useState(false)
    const [ accountModal, setAccountModal ] = useState(false)

    useEffect( () => {
        const redirect = () => {
            if(!auth._id) {
                router.push('/')
            }
        }
        redirect()
    }, [auth])

    return (
        auth._id && (
            <>
                <Head>
                    <title>Evolution | {page}</title>
                    <meta name='description' content='Sitio web de intercambio de criptomonedas' />
                </Head>
                <div className='flex'>
                    <div className='relative'>
                        <div className='absolute left-10 top-4 block md:hidden z-10' onClick={() => {setMenu(!menu); setAccountModal(false)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </div>
                        <div className={`${menu ? 'block fixed bg-white z-10 w-full h-screen md:block' : 'hidden'} md:static md:block w-26 xl:w-80 border-gray-200 md:h-screen md:border-r 2xl:w-96`}>
                            {menu && (
                                <div className='absolute right-5 top-7' onClick={() => setMenu(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            )}
                            <Link href={'/dashboard'}>
                                <div className={`flex items-center gap-2 py-8 mx-3 2xl:mx-6 md:text-3xl text-sky-600 px-3 2xl:px-4 font-bold cursor-default tooltip ${menu && 'text-4xl w-fit'}`}>
                                    <div className='tooltiptext xl:hidden'>Inicio</div>
                                    <i className="fas fa-copyright"></i>
                                    <p className={`${menu && 'block'} md:hidden xl:block`}>Evolution</p>
                                </div>
                            </Link>
                            <div>
                                <Link href='/dashboard'>
                                    <div className={`${page === 'Dashboard' && 'bg-zinc-100 text-sky-600'} mt-5 flex gap-2 items-center md:text-xl font-semibold select-none cursor-pointer mx-3 2xl:mx-6 px-3 2xl:px-4 py-3 transition-all rounded-full tooltip ${menu && 'text-3xl'}`}>
                                        <div className='tooltiptext xl:hidden'>Activos</div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                                            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                                        </svg>
                                        <p className={`${menu && 'block'} md:hidden xl:block`}>Activos</p>
                                    </div>
                                </Link>
                                <Link href='/trade'>
                                    <div className={`${page === 'Intercambiar' && 'bg-zinc-100 text-sky-600'} mt-5 flex gap-2 items-center md:text-xl font-semibold select-none cursor-pointer mx-3 2xl:mx-6 px-3 2xl:px-4 py-3 transition-all rounded-full tooltip ${menu && 'text-3xl'}`}>
                                        <div className='tooltiptext xl:hidden'>Intercambiar</div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z" clipRule="evenodd" />
                                        </svg>
                                        <p className={`${menu && 'block'} md:hidden xl:block`}>Intercambiar</p>
                                    </div>
                                </Link>
                                <Link href='/trade/convert'>
                                    <div className={`${page === 'Convertir' && 'bg-zinc-100 text-sky-600'} mt-5 flex gap-2 items-center md:text-xl font-semibold select-none cursor-pointer mx-3 2xl:mx-6 px-3 2xl:px-4 py-3 transition-all rounded-full tooltip ${menu && 'text-3xl'}`}>
                                        <div className='tooltiptext xl:hidden'>Convertir</div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                        </svg>
                                        <p className={`${menu && 'block'} md:hidden xl:block`}>Convertir</p>
                                    </div>
                                </Link>
                                <Link href='/deposit'>
                                    <div className={`${page === 'Depositar' && 'bg-zinc-100 text-sky-600'} mt-5 flex gap-2 items-center md:text-xl font-semibold select-none cursor-pointer mx-3 2xl:mx-6 px-3 2xl:px-4 py-3 transition-all rounded-full tooltip ${menu && 'text-3xl'}`}>
                                        <div className='tooltiptext xl:hidden'>Depositar</div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className={`${menu && 'block'} md:hidden xl:block`}>Depositar</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='w-full select-none'>
                        <div className='flex items-center h-20 border-b border-gray-200 pl-28 pr-10 md:px-10 justify-between relative'>
                            <div className='text-2xl md:text-xl font-semibold'>{page}</div>
                            <div>
                                <div className='flex items-center gap-5 sm:hover:bg-zinc-200 sm:pl-3 sm:pr-1 cursor-pointer rounded-md transition-colors select-none' onClick={() => setAccountModal(!accountModal)}>
                                    <div className='text-lg font-semibold hidden sm:block'>{auth.name}</div>
                                    <div><Image src={'/img/user.png'} width={55} height={55} /></div>
                                </div>
                                { accountModal && (
                                    <div className='absolute z-10 p-4 shadow-xl rounded-b-md border-t border-sky-600 bg-white right-10 flex flex-col gap-2 private-account'>
                                        <div className='p-3 px-8 hover:bg-gray-100 transition-colors cursor-pointer rounded-md whitespace-nowrap select-none'>Cuenta</div>
                                        <div className='p-3 px-8 hover:bg-gray-100 transition-colors cursor-pointer rounded-md whitespace-nowrap select-none'>Apariencia</div>
                                        <div className='p-3 px-8 hover:bg-red-400 hover:text-white transition-colors cursor-pointer rounded-md whitespace-nowrap select-none'>Cerrar sesión</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='relative select-text'>{children}</div>
                    </div>
                </div>
            </>
        )
    )
}

export default LayoutPrivate