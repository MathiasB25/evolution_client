import { useState, useEffect } from "react"
import useCryptoProvider from "../../hooks/useCryptoProvider"
import Image from "next/image"
import Loading from '../Loading'
import Link from 'next/link'

export default function Convert () {

    const { currencies } = useCryptoProvider()

    const [ loading, setLoading ] = useState(false)
    const [ tokens, setTokens ] = useState([])
    const [ fromToken, setFromToken ] = useState({})
    const [ toToken, setToToken ] = useState({})
    const [ fromModal, setFromModal ] = useState(false)
    const [ toModal, setToModal ] = useState(false)
    const [ fromValue, setFromValue ] = useState('')
    const [ convert, setConvert ] = useState('')
    const [ price, setPrice ] = useState('')
    const [ reverse, setReverse ] = useState('')
    
    useEffect( () => {
        toToken?.id && setLoading(false)
    }, [toToken])

    useEffect( () => {
        if(currencies.length > 0) {
            setLoading(true)
            storeTokens()
            setConvert('')
            setFromValue('')
        }
    }, [])

    const handleModal = modal => {
        if(modal === 'from') {
            setFromModal(!fromModal)
            setToModal(false)
        } else {
            setToModal(!toModal)
            setFromModal(false)
        }
    }

    const storeTokens = () => {
        let tokensState = []
        for(let i = 0; i < 10; i++) {
            tokensState = [...tokensState, currencies[i]]
        }
        setTokens(tokensState)
        setFromToken(tokensState.filter(token => token?.id === 'USDT')[0])
        setToToken(tokensState.filter(token => token?.id === 'BTC')[0])
    }

    const handleSubmit = e => {
        setConvert('')
        setPrice('')
        setReverse('')
        if(fromValue == 0) return
        const first = fromValue * fromToken.price
        const second = parseFloat(toToken.price)
        const convert = parseFloat(first.toFixed(2)) / parseFloat(second.toFixed(2))
        const price = fromToken.price / toToken.price
        const reverse = toToken.price / fromToken.price
        if (parseInt(price).toString().length === 1) {
            setPrice(price.toFixed(8))
        } else if (parseInt(price).toString().length === 2) {
            setPrice(price.toFixed(2))
        } else if (parseInt(price).toString().length >= 3) {
            setPrice(price.toFixed(1))
        }
        if (parseInt(reverse).toString().length === 1) {
            setReverse(reverse.toFixed(8))
        } else if (parseInt(reverse).toString().length === 2) {
            setReverse(reverse.toFixed(2))
        } else if (parseInt(reverse).toString().length >= 3) {
            setReverse(reverse.toFixed(1))
        }
        if (parseInt(convert).toString().length === 1) {
            setConvert(convert.toFixed(8))
        } else if (parseInt(convert).toString().length === 2) {
            setConvert(convert.toFixed(2))
        } else if (parseInt(convert).toString().length >= 3) {
            setConvert(convert.toFixed(1))
        }
    }

    const handleSwap = () => {
        const from = fromToken
        const to = toToken
        setFromToken(to)
        setToToken(from)
        setConvert('')
    }

    const handleConvert = () => {
        setConvert('')
        setFromValue('')
    }

    const handleCancel = () => {
        setConvert('')
        setFromValue('')
    }

    return (
        loading ? <div className='absolute top-20 left-0 right-0 mx-auto'><Loading /></div> : tokens.length > 0 && fromToken?.id && toToken?.id && (
            <div className='my-20'>
                <div className='px-5'>
                    <h1 className='text-6xl font-semibold text-center'>Convertir</h1>
                    <p className='font-semibold mt-2 text-xl text-center mb-10'>La forma más rápida y sencilla de comprar y vender criptomonedas</p>
                </div>
                <div className='px-8 md:px-0 md:w-4/6 lg:w-1/2 xl:w-1/3 md:mx-auto'>
                    <div className='text-lg font-semibold'>
                        <label className='block mb-2'>De</label>
                        <div className='flex bg-gray-100 relative'>
                            <input type='number' className='w-3/5 lg:w-3/4 bg-transparent outline-none p-3 font-semibold' placeholder='Introduce un valor' value={fromValue} onChange={e => setFromValue(e.target.value)} />
                            <div className=' flex items-center gap-2 w-2/5 lg:w-1/4 bg-transparent cursor-pointer select-none' onClick={() => handleModal('from')}>
                                <Image src={fromToken?.logo_url} width={25} height={25} />
                                <p>{fromToken?.id}</p>
                                {fromModal && (
                                    <div className='absolute w-full bg-gray-100 left-0 top-12 z-10 h-60 overflow-y-scroll'>
                                        {currencies.map(token => (
                                            <div key={token?.id} className='flex gap-3 items-center p-2 hover:bg-gray-300 cursor-pointer' onClick={() => setFromToken(token)}>
                                                <Image src={token.logo_url} width={25} height={25} />
                                                <p>{token.id}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <i className="fas fa-sort-down ml-auto mr-2"></i>
                            </div>
                        </div>
                    </div>
                    <div className='my-5 mx-auto w-fit'>
                        <button type='button' className='cursor-pointer p-2 rounded-full bg-gray-200 text-gray-600' onClick={handleSwap}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                            </svg>
                        </button>
                    </div>
                    <div className='text-lg font-semibold'>
                        <label className='block mb-2'>A</label>
                        <div className='flex bg-gray-100 relative'>
                            <input type='number' className='w-3/5 lg:w-3/4 bg-transparent outline-none p-3 font-semibold' disabled />
                            <div className=' flex items-center gap-2 w-2/5 lg:w-1/4 bg-transparent cursor-pointer select-none' onClick={() => handleModal('to')}>
                                <Image src={toToken?.logo_url} width={25} height={25} />
                                <p>{toToken?.id}</p>
                                {toModal && (
                                    <div className='absolute w-full bg-gray-100 left-0 top-12 z-10 h-60 overflow-y-scroll'>
                                        {tokens.length >= 1 && currencies.map(token => (
                                            <div key={token?.id} className='flex gap-3 items-center p-2 hover:bg-gray-300 cursor-pointer' onClick={() => setToToken(token)}>
                                                <Image src={token.logo_url} width={25} height={25} />
                                                <p>{token?.id}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <i className="fas fa-sort-down ml-auto mr-2"></i>
                            </div>
                        </div>
                    </div>
                    {loading ? <div className='mt-10 mb-5'><Loading /></div> : convert != 0 && (
                        <div className='flex items-center justify-between mt-10 text-lg font-semibold'>
                            <div>
                                <p className='mt-1'>Precio:</p>
                                <p className='mt-1'>Tipo inverso:</p>
                                <p className='mt-1'>Recibirás:</p>
                            </div>
                            <div className='flex flex-col items-end'>
                                <p className='mt-1'>1 {fromToken.symbol} = {price} {toToken.symbol}</p>
                                <p className='mt-1'>1 {toToken.symbol} = {reverse} {fromToken.symbol}</p>
                                <p className='mt-1 text-3xl text-sky-600'>{convert} {toToken.symbol}</p>
                            </div>
                        </div>
                    )}
                    {convert != 0 ? (
                        !loading && (
                            <div className='flex gap-10 text-lg'>
                                <input type='button' value='Cancelar' className='p-3 bg-gray-300 text-black rounded-md w-full mt-5 cursor-pointer hover:bg-gray-400 transition-colors font-semibold' onClick={handleCancel} />
                                <input type='button' value='Comprar' className='p-3 bg-sky-600 text-white rounded-md w-full mt-5 cursor-pointer hover:bg-sky-700 transition-colors font-semibold' onClick={handleConvert} />
                            </div>
                        )
                    ) : <input type='button' value='Previsualizar conversión' className='p-3 bg-sky-600 text-white rounded-md w-full mt-5 cursor-pointer hover:bg-sky-700 transition-colors text-lg font-semibold' onClick={handleSubmit} />}
                </div>
            </div>
        )
    )
}