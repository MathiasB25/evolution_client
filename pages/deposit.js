import axios from "axios"
import { useEffect, useState } from "react"
import LayoutPrivate from "../components/LayoutPrivate"
import useCryptoProvider from "../hooks/useCryptoProvider"
import Alert from '../components/Alert'
import useAuthProvider from "../hooks/useAuthProvider"
import { priceFormatter } from "../helpers"
import Image from "next/image"

export default function Buy () {

    const { btcPrice, setWallet, currencies } = useCryptoProvider()
    const [ amount, setAmount ] = useState('')
    const [ receive, setReceive ] = useState('')
    const [ alert, setAlert ] = useState({})
    const [ step, setStep ] = useState(1)
    const [ swap, setSwap ] = useState(false)

    const [ cardNumber, setCardNumber ] = useState('')
    const [ cardDate, setCardDate ] = useState('')
    const [ cardPin, setCardPin ] = useState('')
    const [ cardType, setCardType ] = useState('')

    const [ modalTokens, setModalTokens ] = useState(false)
    const [ depositToken, setDepositToken ] = useState({})

    const { auth } = useAuthProvider()

    useEffect( () => {
        if(currencies.length > 0) setDepositToken(currencies[0])
    }, [])

    const handleClose = () => {
        setModalTokens(false)
    }

    const handleToken = currency => {
        setDepositToken(currency)
        setModalTokens(false)
        setAmount('')
        setReceive('')
    }

    const handleAmount = e => {
        setAmount(e.target.value)
        if(e) {
            setReceive((Number(e.target.value) / Number(depositToken.price)).toFixed(8))
        }
        if(e.target.value >= 12500) {
            setAmount(12500)
            setReceive((12500 / Number(depositToken.price)).toFixed(8))
        }
        if(e.target.value === '' || e.target.value === '0') setReceive('')
    }

    const handleReceive = e => {
        setReceive(e.target.value)
        if (e) {
            setAmount((Number(e.target.value) * Number(depositToken.price)).toFixed(2))
        }
        if ((Number(e.target.value) * Number(depositToken.price)) >= 12500) {
            setAmount(12500)
            setReceive((12500 / Number(depositToken.price)).toFixed(8))
        }
        if (e.target.value === '' || e.target.value === '0') setAmount('')
    }

    const handleContinue = () => {
        if ([amount].includes('')) {
            setAlert({
                msg: 'Ingresa un monto',
                error: true
            })
            setTimeout(() => {
                setAlert({})
            }, 3000)
            return
        }
        setAlert({})
        setStep(2)
    }

    useEffect( () => {
        var visa = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
        var mastercard = /^(?:5[1-5][0-9]{14})$/;
        if (cardNumber.match(visa)) {
            setCardType('Visa')
        } else if (cardNumber.match(mastercard)) {
            setCardType('Mastercard')
        } else {
            setCardType('')
        }
    }, [cardNumber])

    const handleCardDate = e => {
        setCardDate(e.target.value.replace(/^(\d\d)(\d)$/g, '$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g, '$1/$2').replace(/[^\d\/]/g, ''))
    }

    const handlePay = async e => {
        e.preventDefault()

        if([cardNumber, cardDate, cardPin].includes('')) {
            setAlert({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            setTimeout( () => {
                setAlert({})
            }, 3000)
            return
        }

        var visa = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
        var mastercard = /^(?:5[1-5][0-9]{14})$/;
        if (!cardNumber.match(visa) && !cardNumber.match(mastercard)) {
            setCardType('')
            setAlert({
                msg: 'Tarjeta no válida',
                error: true
            })
            setTimeout( () => {
                setAlert({})
            }, 3000)
            return
        }

        if (cardNumber.match(visa)) {
            setCardType('Visa')
        } else if (cardNumber.match(mastercard)) {
            setCardType('Mastercard')
        }

        if (Number(cardDate.slice(0, 2)) > 31 || cardDate.slice(0, 2) === '00') {
            setAlert({
                msg: 'Fecha de vencimiento no válida',
                error: true
            })
            setTimeout(() => {
                setAlert({})
            }, 3000)
            return
        } else if (Number(cardDate.slice(3, 5)) > 12 || cardDate.slice(3, 5) === '00') {
            setAlert({
                msg: 'Fecha de vencimiento no válida',
                error: true
            })
            setTimeout( () => {
                setAlert({})
            }, 3000)
            return
        } else if (Number(cardDate.slice(6, 10)) < 2022) {
            setAlert({
                msg: 'Fecha de vencimiento no válida',
                error: true
            })
            setTimeout(() => {
                setAlert({})
            }, 3000)
            return
        }

        if(cardPin.length < 3 || cardPin.length > 3) {
            setAlert({
                msg: 'Pin incorrecto',
                error: true
            })
            setTimeout(() => {
                setAlert({})
            }, 3000)
            return
        }

        const authToken = localStorage.getItem('XpDZcaMrAgjT3D8u')
        if (!authToken) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`
            }
        }

        const { symbol, price, name } = depositToken

        try {
            const { data } = await axios.post('/api/deposit', { symbol, name, price, amount: receive, user: auth._id, config })
            setWallet(data)
            /* Alert */
            setAlert({
                msg: `Has comprado ${receive} ${name}`
            })
            setTimeout( () => {
                setAlert({})
            }, 3000)
            /* Reset forms */
            setStep(1)
            setCardNumber('')
            setCardDate('')
            setCardPin('')
            setAmount('')
            setReceive('')
            setCardType('')
        } catch (error) {
            console.log(error)
        }
    }

    const { msg } = alert

    return (
        <LayoutPrivate page='Depositar'>
            <div className='text-center my-20 mx-5 sm:mx-24 md:mx-0'>
                <div className='text-4xl mb-5'>Comprar criptomonedas con tarjeta de crédito o débito</div>
                {msg && <div className='md:w-8/12 lg:w-7/12 xl:w-6/12 2xl:w-1/2 mx-auto'><Alert alert={alert} /></div> }
                { step === 1 ? (
                    <div className='md:w-8/12 lg:w-7/12 xl:w-6/12 2xl:w-1/2 mx-auto'>
                        <div className='flex items-center gap-3 w-fit mx-auto my-10'>
                            <div className='text-lg'>{!swap ? `1 BTC ≈ ${priceFormatter(Number(btcPrice))} USD` : `1 USD ≈ ${(1 / btcPrice).toFixed(8)} BTC`}</div>
                            <button type='button' className='w-7 h-7 bg-gray-200 rounded-full' onClick={() => setSwap(!swap)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                </svg>
                            </button>
                        </div>
                        <div className='text-left mb-1 font-semibold'>{`Cantidad máxima de depósito: ${priceFormatter(12500)} USD`}</div>
                        <div className='bg-gray-100 rounded-lg px-4 py-3 pb-4'>
                            <label className='block text-left mb-2'>Cantidad</label>
                            <input type='number' placeholder='15.00 - 12500.00' className='w-full text-xl bg-transparent outline-none' value={amount} onChange={e => handleAmount(e)} />
                        </div>
                        <div className='bg-gray-100 rounded-lg px-4 py-3 pb-4 mt-10'>
                            <label className='block text-left mb-2'>Recibir</label>
                            <div className='flex justify-between'>
                                <input type='number' placeholder='0.00' className='w-max text-xl bg-transparent outline-none' value={receive} onChange={e => handleReceive(e)} />
                                <div className='flex gap-1 p-2 px-3 rounded-full bg-white w-fit cursor-pointer' onClick={() => setModalTokens(!modalTokens)}>
                                    { depositToken?.name && (
                                        <Image src={depositToken?.logo_url} width={25} height={25} />
                                    )}
                                    <div>{depositToken?.name}</div>
                                </div>
                            </div>
                            { modalTokens && (
                                <>
                                    <div className='modal-opacity' onClick={handleClose}></div>
                                    <div className='w-full m-10 md:w-auto deposit-modal shadow-2xl rounded-lg p-5'>
                                        <div className='flex items-center mb-5'>
                                            <div className='h-12 w-1/6 border-l border-t border-b flex items-center rounded-l-lg'>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </div>
                                            <input type='text' placeholder='Buscar' className='h-12 w-5/6 border-r border-t border-b rounded-r-lg outline-none' />
                                        </div>
                                        <div className='deposit-modal-scroll pr-2'>
                                            {currencies.map(currency => (
                                                <div key={currency?.symbol} className='flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer transition-colors rounded-md' onClick={() => handleToken(currency)} >
                                                    <Image src={currency?.logo_url} width={30} height={30} />
                                                    <div>{currency?.name}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className='w-full p-3 rounded-md bg-sky-600 text-white mt-10 font-semibold hover:bg-sky-700' onClick={handleContinue}>Contiunar</div>
                    </div>
                ) : (
                    <form className='md:w-8/12 lg:w-7/12 xl:w-6/12 2xl:w-1/2 mx-auto' onSubmit={e => handlePay(e)}>
                        <div className='mt-5'>
                            <label className='block text-left mb-2'>Nombre</label>
                            <div className='w-full p-3 bg-gray-200 outline-none text-left text-gray-500 rounded-md'>{auth.name}</div>
                        </div>
                        <div className='mt-5'>
                            <label className='block text-left mb-2'>Número de tarjeta</label>
                            <div className='flex items-center'>
                                <input type='number' placeholder='Introduce el número de la tarjeta' className='w-full outline-none p-3 border-l border-t border-b rounded-l-md' value={cardNumber} onChange={e => setCardNumber(e.target.value)} />
                                {cardType === 'Visa' && <div className='w-fit border-r border-t border-b rounded-r-md p-3'><Image src='/img/cc/visa.png' width={38} height={13} className='img-draggable' /></div> }
                                {cardType === 'Mastercard' && <div className='w-fit border-r border-t border-b rounded-r-md pt-4 pb-2 px-3'><Image src='/img/cc/master.svg' width={30} height={20} className='img-draggable' /></div> }
                            </div>
                        </div>
                        <div className='flex items-center gap-10 justify-between mt-5'>
                            <div className='w-1/2'>
                                <label className='block text-left mb-2'>Fecha de vencimiento</label>
                                <input type="text" maxLength='10' placeholder='mm-dd-yyyy' className='w-full outline-none p-3 border rounded-md' value={cardDate} onChange={e => handleCardDate(e)} />
                            </div>
                            <div className='w-1/2'>
                                <label className='block text-left mb-2'>{'Código de seguridad (CVV)'}</label>
                                <input type='number' maxLength='3' placeholder='Introduce el código de seguridad' className='w-full outline-none p-3 border rounded-md' value={cardPin} onChange={e => setCardPin(e.target.value)} />
                            </div>
                        </div>
                        <div className='mt-10 text-left text-lg font-semibold'>{`Monto de la compra: ${receive} BTC`}</div>
                        <button type='submit' className='w-full p-3 rounded-md bg-sky-600 text-white mt-2 font-semibold hover:bg-sky-700'>Pagar</button>
                    </form>
                )}
            </div>
        </LayoutPrivate>
    )
}