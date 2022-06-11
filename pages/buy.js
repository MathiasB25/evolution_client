import axios from "axios"
import { useEffect, useState } from "react"
import LayoutPrivate from "../components/LayoutPrivate"
import useCryptoProvider from "../hooks/useCryptoProvider"
import Alert from '../components/Alert'
import useAuthProvider from "../hooks/useAuthProvider"

export default function Buy () {

    const { btcPrice } = useCryptoProvider()
    const [ amount, setAmount ] = useState('')
    const [ receive, setReceive ] = useState('')
    const [ alert, setAlert ] = useState({})
    const [ step, setStep ] = useState(1)

    const [ cardNumber, setCardNumber ] = useState('')
    const [ cardDate, setCardDate ] = useState('')
    const [ cardPin, setCardPin ] = useState('')

    const { auth } = useAuthProvider()

    useEffect( () => {
        if(amount != 0) {
            setReceive(Number(amount / btcPrice).toFixed(6))
        }
    }, [amount])

    const handleContinue = () => {
        if ([amount].includes('')) {
            setAlert({
                msg: 'Ingresa un monto',
                error: true
            })
            return
        }
        setAlert({})
        setStep(2)
    }

    const handlePay = async e => {
        e.preventDefault()

        if([cardNumber, cardDate, cardPin].includes('')) {
            setAlert({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
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

        try {
            const { data } = await axios.post('/api/buy', { symbol: 'BUSD', name: 'Binance USD', price: 1, amount, user: auth._id, config })
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const { msg } = alert

    return (
        <LayoutPrivate page='Depositar'>
            <div className='text-center mt-20'>
                <div className='text-3xl mb-5'>Comprar criptomonedas con tarjeta de crédito o débito</div>
                {msg && <div className='md:w-8/12 lg:w-7/12 xl:w-6/12 2xl:w-1/2 mx-auto'><Alert alert={alert} /></div> }
                { step === 1 ? (
                    <div className='md:w-8/12 lg:w-7/12 xl:w-6/12 2xl:w-1/2 mx-auto'>
                        <div className='flex items-center gap-3 w-fit mx-auto my-5'>
                            <div>1 BTC ≈ {Number(btcPrice).toFixed(2)} USD</div>
                            <button type='button' className='w-7 h-7 bg-gray-200 rounded-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                </svg>
                            </button>
                        </div>
                        <div className='bg-gray-100 rounded-lg px-4 py-3 pb-4'>
                            <label className='block text-left mb-2'>Cantidad</label>
                            <input type='number' placeholder='15.00 - 12500.00' className='w-full text-xl bg-transparent outline-none' value={amount} onChange={e => setAmount(e.target.value)} />
                        </div>
                        <div className='bg-gray-100 rounded-lg px-4 py-3 pb-4 mt-10'>
                            <label className='block text-left mb-2'>Recibir</label>
                            <input type='number' placeholder='0.00' className='w-full text-xl bg-transparent outline-none' value={receive} onChange={e => setReceive(e.target.value)} />
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
                            <input type='number' placeholder='Introduce el número de la tarjeta' className='w-full outline-none p-3 border rounded-md' value={cardNumber} onChange={e => setCardNumber(e.target.value)} />
                        </div>
                        <div className='flex items-center gap-10 justify-between mt-5'>
                            <div className='w-1/2'>
                                <label className='block text-left mb-2'>Fecha de vencimiento</label>
                                <input type='number' placeholder='Introduce el número de la tarjeta' className='w-full outline-none p-3 border rounded-md' value={cardDate} onChange={e => setCardDate(e.target.value)} />
                            </div>
                            <div className='w-1/2'>
                                    <label className='block text-left mb-2'>{'Código de seguridad (CVV)'}</label>
                                <input type='number' placeholder='Introduce el número de la tarjeta' className='w-full outline-none p-3 border rounded-md' value={cardPin} onChange={e => setCardPin(e.target.value)} />
                            </div>
                        </div>
                        <button type='submit' className='w-full p-3 rounded-md bg-sky-600 text-white mt-10 font-semibold hover:bg-sky-700'>Pagar</button>
                    </form>
                )}
            </div>
        </LayoutPrivate>
    )
}