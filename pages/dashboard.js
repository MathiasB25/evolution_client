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
    const [ images, setImages ] = useState([])

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

    useEffect( () => {
        if(wallet?.length > 0) {
            const images = currencies.filter((currency, i) => currency.symbol === wallet.map(token => token.symbol)[i])
            setImages(images)
        }
    }, [currencies])

    return (
        <LayoutPrivate page='Dashboard'>
            <div className='m-10'>
                <div className='text-4xl mb-2'>Balance estimado</div>
                <div className='text-2xl'>{priceFormatter(balance)} USD</div>
                <div className='border-b w-full bg-gray-300 my-10'></div>
                { wallet?.length > 0 && (
                    <div className='flex items-center bg-gray-100 rounded-md p-3 font-semibold'>
                        <div className='w-1/3'>Moneda</div>
                        <div className='px-6'></div>
                        <div className='w-1/3'>Cantidad</div>
                        <div className='w-1/3 text-right'>Acción</div>
                    </div>
                )}
                { wallet?.length > 0 ? (
                    <div className='flex items-center px-3'>
                        <div className='flex flex-col gap-1'>
                            {images.map(image => (
                                <div key={image.symbol} className='h-20 dashboard-img border-b pr-3'>
                                    <Image src={image.logo_url} width={35} height={35} />
                                </div>
                            ))}
                        </div>
                        <div className='flex flex-col gap-1 w-full'>
                            {wallet.map(token => (
                                <div key={token.symbol} className='flex items-center h-20 border-b'>
                                    <div className='flex flex-col w-1/3'>
                                        <div className='text-lg font-semibold'>{token.symbol}</div>
                                        <Link href='trade'><div type='button' className='underline cursor-pointer w-fit text-gray-500'>{token.name}</div></Link>
                                    </div>
                                    {String(parseInt(token.amount)).length > 1 ? (
                                        <div className='w-1/3'>{Number(token.amount).toFixed(2)}</div>
                                    ) : (
                                        <div className='w-1/3'>{Number(token.amount).toFixed(8)}</div>
                                    )}
                                    <div className='flex gap-2 w-1/3 justify-end'>
                                        <Link href='/trade'><button type='button' className='cursor-pointer hover:text-sky-600 transition-colors'>Comprar</button></Link>
                                        <Link href='/trade'><button type='button' className='cursor-pointer hover:text-sky-600 transition-colors'>Vender</button></Link>
                                        <Link href='/convert'><button type='button' className='cursor-pointer hover:text-sky-600 transition-colors'>Convertir</button></Link>
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