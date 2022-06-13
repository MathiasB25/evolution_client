import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import LayoutPrivate from '../components/LayoutPrivate'
import useCryptoProvider from '../hooks/useCryptoProvider'
import { priceFormatter } from '../helpers'

export default function Dashboard() {

    const { wallet, currencies } = useCryptoProvider()
    const [ balance, setBalance ] = useState(0)
    const [ mobileModal, setMobileModal ] = useState(false)
    const [ modalToken, setModalToken ] = useState({})

    useEffect(() => {
        const calculateBalance = () => {
            if(wallet.length > 0) {
                const balance = 0
                wallet.map( token => {
                    const calc = (token.amount * token.price)
                    balance = balance + calc
                })
                setBalance(balance)
            }
        }
        calculateBalance()
    }, [wallet])

    const handleModal = token => {
        setMobileModal(!mobileModal)
        setModalToken(token)
    }

    return (
        <LayoutPrivate page='Dashboard'>
            <div className='my-10 mx-4 sm:m-10'>
                <div className='text-4xl mb-2'>Balance estimado</div>
                <div className='text-2xl'>{priceFormatter(balance)} USD</div>
                <div className='border-b w-full bg-gray-300 my-10'></div>
                { wallet?.length > 0 && (
                    <div className='flex items-center bg-gray-100 rounded-md p-3 font-semibold'>
                        <div className='w-2/4 sm:w-5/12 lg:w-1/4'>Moneda</div>
                        <div className='w-1/4 sm:w-3/12 lg:w-1/4'>Cantidad</div>
                        <div className='hidden lg:block lg:w-1/4'>Cantidad en USD</div>
                        <div className='w-1/4 sm:w-4/12 lg:w-1/4 text-right'>Acción</div>
                    </div>
                )}
                { wallet?.length > 0 ? (
                    <div className='flex items-center px-3'>
                        <div className='flex flex-col gap-1 w-full relative'>
                            {wallet.map(token => (
                                <div key={token?.symbol} className='flex items-center h-20 border-b'>
                                    <div className='flex gap-4 items-center w-2/4 sm:w-5/12 lg:w-1/4'>
                                        <div>
                                            {currencies.map(image => (
                                                image.symbol === token.symbol && <div key={image.symbol}><Image src={image?.logo_url} width={30} height={30} className='img-draggable' /></div>
                                            ))}
                                        </div>
                                        <div>
                                            <div className='text-lg font-semibold'>{token.symbol}</div>
                                            <Link href='trade'><div type='button' className='underline cursor-pointer w-fit text-gray-500'>{token.name}</div></Link>
                                        </div>
                                    </div>
                                    {String(parseInt(token.amount)).length > 1 ? (
                                        <div className='w-1/4 sm:w-3/12 lg:w-1/4'>{Number(token.amount).toFixed(2)}</div>
                                    ) : (
                                        <div className='w-1/4 sm:w-3/12 lg:w-1/4'>{Number(token.amount).toFixed(8)}</div>
                                    )}
                                    <div className='hidden lg:block lg:w-1/4'>{priceFormatter(Number(token.amount * token.price))}</div>
                                    <div className='flex gap-2 w-1/4 sm:w-4/12 lg:w-1/4 justify-end relative'>
                                        <div className='block sm:hidden text-gray-700' onClick={() => handleModal(token)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                            </svg>
                                        </div>
                                        { mobileModal && modalToken.symbol === token.symbol && (
                                            <div className='flex flex-col gap-5 text-xl bg-white shadow-lg border border-gray-200 p-3 px-4 rounded-lg absolute top-8 z-10'>
                                                <Link href='/trade'><button type='button'>Comprar</button></Link>
                                                <Link href='/trade'><button type='button'>Vender</button></Link>
                                                <Link href='/convert'><button type='button'>Convertir</button></Link>
                                            </div>
                                        )}
                                        <Link href='/trade'><button type='button' className='cursor-pointer hover:text-sky-600 transition-colors hidden sm:block'>Comprar</button></Link>
                                        <Link href='/trade'><button type='button' className='cursor-pointer hover:text-sky-600 transition-colors hidden sm:block'>Vender</button></Link>
                                        <Link href='/convert'><button type='button' className='cursor-pointer hover:text-sky-600 transition-colors hidden sm:block'>Convertir</button></Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <>                    
                        <div className='text-center text-4xl mt-20'>Tu billetera está vacía</div>
                        <Link href='/buy'>
                            <div className='p-3 px-5 bg-sky-600 rounded-lg text-xl mt-5 hover:bg-gradient-to-r from-sky-700 to-sky-500 text-white transition-colors cursor-pointer w-fit mx-auto'>Depositar</div>
                        </Link>
                    </>
                )}
            </div>
        </LayoutPrivate>
    )
}