import axios from "axios"
import { useState, useEffect } from "react"
import LayoutPrivate from "../components/LayoutPrivate"
import useCryptoProvider from "../hooks/useCryptoProvider"
import List from "../components/trade/List"
import Alert from "../components/Alert"
import ListTrade from "../components/skeleton/ListTrade"
import useAuthProvider from "../hooks/useAuthProvider"
import { priceFormatter } from '../helpers'

export default function Trade() {

    const { currencies, token, loading, busd, setBusd } = useCryptoProvider()
    const { auth } = useAuthProvider()

    const [ alert, setAlert ] = useState({})
    const [ option, setOption ] = useState(true)
    const [ price, setPrice ] = useState(0)
    const [ reverse, setReverse ] = useState(0)
    const [ value, setValue ] = useState(0)
    const [ convert, setConvert ] = useState(0)

    useEffect( () => {
        const price = token?.price / 1
        const reverse = 1 / token?.price
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
    }, [token])

    const handleOption = (boolean) => {
        setOption(boolean)
        setValue(0)
        setConvert(0)
        setAlert({})
    }
    
    const handleConvert = () => {
        if(value == 0) {
            setAlert({
                msg: 'Debes ingresar un valor',
                error: true
            })
            return
        }
        setAlert({})
        const convertState = value / token?.price
        if (parseInt(convertState).toString().length === 1) {
            setConvert(convertState.toFixed(8))
        } else if (parseInt(convertState).toString().length === 2) {
            setConvert(convertState.toFixed(2))
        } else if (parseInt(convertState).toString().length >= 3) {
            setConvert(convertState.toFixed(1))
        }
    }

    const handleCancel = () => {
        setConvert(0)
        setValue(0)
    }

    const handleBuy = async () => {
        const authToken = localStorage.getItem('XpDZcaMrAgjT3D8u')
        if(!authToken) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`
            }
        }

        if(value > busd) {
            setAlert({
                msg: 'Fondos insuficientes',
                error: true
            })
            return
        } 

        const { price, name, symbol } = token
        const { _id } = auth

        try {
            await axios.post('/api/buy', { symbol, name, price, amount: convert, user: _id, config })
            setBusd(busd - value)
            setValue(0)
            setConvert(0)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSell = async () => {
        const authToken = localStorage.getItem('XpDZcaMrAgjT3D8u')
        if (!authToken) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`
            }
        }

        const { name, symbol, price } = token
        const { _id } = auth

        try {
            const { data } = await axios.post('/api/sell', { symbol, name, amount: convert, user: _id, price, config })
            setAlert({
                msg: data.msg,
                error: true
            })
            setValue(0)
            setConvert(0)
        } catch (error) {
            console.log(error)
        }
    }

    const { msg } = alert

    return (
        <LayoutPrivate page='Intercambiar'>
            <div className='flex flex-col-reverse lg:flex-row layout-children-height'>
                <div className='w-full lg:w-2/3 border-r border-gray-200 px-0 sm:px-5 overflow-y-scroll'>
                    <div className='text-5xl px-4 py-10 font-semibold'>Mercado</div>
                    <div className='flex items-center'>
                        <div className='flex mx-4 text-lg font-semibold mb-5 w-2/3 lg:w-9/12'>
                            <div className='w-7/12 lg:w-6/12 table-market-name'>Nombre</div>
                            <div className='hidden sm:block text-right w-5/12 lg:text-left lg:w-4/12 table-market-price'>Último precio</div>
                            <div className='text-right lg:w-2/12 hidden lg:block'>Cambio 24hs</div>
                        </div>
                        <div className='text-lg font-semibold mb-5 w-1/3 lg:w-3/12 text-right'>Operar</div>
                    </div>
                    {loading ? (
                        <>
                            <ListTrade />
                            <ListTrade />
                            <ListTrade />
                            <ListTrade />
                            <ListTrade />
                            <ListTrade />
                            <ListTrade />
                            <ListTrade />
                            <ListTrade />
                            <ListTrade />
                        </>
                    ) : currencies.map( token => (
                        <List key={token.id} token={token} />
                    ))}
                </div>
                <div className='w-full mx-auto px-10 py-10 lg:w-1/3 lg:p-5'>
                    <div className='flex items-center'>
                        <button className={`${option ? 'bg-sky-600 text-white' : 'bg-none text-black'} w-1/2 py-2 text-xl rounded-t-lg transition-colors`} onClick={() => handleOption(true)}>Comprar</button>
                        <button className={`${!option ? 'bg-red-600 text-white' : 'bg-none text-black'} w-1/2 py-2 text-xl  rounded-t-lg transition-colors`} onClick={() => handleOption(false)}>Vender</button>
                    </div>
                    { option ? (
                        <div className='mt-5'>
                            {msg && <div className='mb-4'><Alert alert={alert} /></div>}
                            <div className='text-4xl font-semibold'>{token?.symbol}/BUSD</div>
                            <div className='flex gap-2 text-xl mt-2'>
                                <div>Billetera:</div>
                                <div>{priceFormatter(busd)} BUSD</div>
                            </div>
                            <div>
                                <div className='flex justify-between mt-10 mb-2 flex-col 2xl:flex-row 2xl:items-center'>
                                    <div className='font-semibold'>1 BUSD = {reverse} {token?.symbol}</div>
                                    <div className='font-semibold'>1 {token?.symbol} = {price} BUSD</div>
                                </div>
                                <input type='number' placeholder='Monto' className='w-full py-3 pl-4 border outline-none rounded-md' value={value} onChange={e => setValue(e.target.value)} />
                                { convert !== 0 ? (
                                    <>
                                        <div className='flex justify-between items-center mt-10 mb-3 text-lg'>
                                            <div>Recibiras:</div>
                                            <div className='text-2xl text-sky-600'>{convert} {token.symbol}</div>
                                        </div>
                                        <div className='flex gap-2'>
                                            <button className='bg-slate-300 py-3 text-black rounded-lg w-full text-lg font-semibold' onClick={handleCancel}>Atras</button>
                                            <button className='bg-sky-600 py-3 text-white rounded-lg w-full text-lg' onClick={handleBuy}>Comprar</button>
                                        </div>
                                    </>
                                ) : <button className='py-3 bg-sky-600 w-full text-lg text-white rounded-md hover:bg-sky-700 transition-colors mt-10' onClick={handleConvert}>Previsualizar compra</button> }
                            </div>
                        </div>
                    ) : (
                        <div className='mt-5'>
                            {msg && <div className='mb-4'><Alert alert={alert} /></div>}
                            <div className='text-4xl font-semibold'>{token?.symbol}/BUSD</div>
                            <div className='flex gap-2 text-xl mt-2'>
                                <div>Billetera:</div>
                                <div>{priceFormatter(busd)} BUSD</div>
                            </div>
                            <div>
                                    <div className='flex justify-between mt-10 mb-2 flex-col 2xl:flex-row 2xl:items-center'>
                                    <div className='font-semibold'>1 BUSD = {reverse} {token?.symbol}</div>
                                    <div className='font-semibold'>1 {token?.symbol} = {price} BUSD</div>
                                </div>
                                <input type='number' placeholder='Monto' className='w-full py-3 pl-4 border outline-none rounded-md' value={value} onChange={e => setValue(e.target.value)} />
                                {convert !== 0 ? (
                                    <>
                                        <div className='flex justify-between items-center mt-10 mb-3 text-lg'>
                                            <div>Recibiras:</div>
                                            <div className='text-2xl text-sky-600'>{convert} {token.symbol}</div>
                                        </div>
                                        <div className='flex gap-2'>
                                            <button className='bg-slate-300 py-3 text-black rounded-lg w-full text-lg font-semibold' onClick={handleCancel}>Atras</button>
                                            <button className='bg-red-600 py-3 text-white rounded-lg w-full text-lg' onClick={handleSell}>Vender</button>
                                        </div>
                                    </>
                                ) : <button className='py-3 bg-red-600 w-full text-lg text-white rounded-md hover:bg-red-900 transition-colors mt-10' onClick={handleConvert}>Previsualizar Venta</button>}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </LayoutPrivate>
    )
}