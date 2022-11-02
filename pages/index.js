import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/Layout'
import List from '../components/List'
import useCryptoProvider from '../hooks/useCryptoProvider'
import useAuthProvider from '../hooks/useAuthProvider'
import ListMarket from '../components/skeleton/ListMarket'
import LoadingV2 from '../components/LoadingV2'

export default function Home() {

    const router = useRouter()

    const { currencies } = useCryptoProvider()
    const { setEmail } = useAuthProvider()

    const [ tokens, setTokens ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ emailState, setEmailState ] = useState('')

    useEffect( () => {
        storeTokens()
    }, [currencies])

    const storeTokens = () => {
        let tokensState = []
        for (let i = 0; i < 5; i++) {
            tokensState = [...tokensState, currencies[i]]
        }
        setTokens(tokensState)
    }

    const handleEmail = (e) => {
        e.preventDefault()
        if(emailState === '') return
        setEmail(emailState)
        router.push('/signup')
    }

    useEffect( () => {
        if(tokens.length > 0) {
            tokens.map( token => token?.symbol && (
                setLoading(false)
            ))
        }
    }, [tokens])

    return (
        <Layout page='Inicio'>
            <div className='home-section flex items-center py-20'>
                <div className='flex items-center mx-auto text-center lg:text-left'>
                    <div className='home-section-flex h-fit'>
                        <p className='home-section-lh text-zinc-800 font-semibold text-5xl md:text-6xl xl:text-7xl leading-snug'>Compra, haz trading y holdea criptomonedas en<span className='ml-2 text-zin-800 font-bold text-5xl md:text-6xl xl:text-7xl'>Evolution</span></p>
                        <p className='text-zing-800 text-lg lg:text-xl font-semibold mt-5'>Evolution es el lugar más sencillo para comprar y vender criptomonedas. Regístrate y comienza hoy mismo.</p>
                        <div className='flex gap-2 mt-10'>
                            <input placeholder='Dirección de correo electrónico' className='bg-white py-5 pl-5 lg:py-6 w-full rounded-md outline-none' value={emailState} onChange={e => setEmailState(e.target.value)} />
                            <button type='button' className='p-5 px-6 bg-sky-600 hover:bg-gradient-to-r from-sky-700 to-sky-500 rounded-md text-white font-semibold' onClick={handleEmail}>Empezar</button>
                        </div>
                    </div>
                    <div className='home-section-flex hidden md:hidden lg:block'>
                        <div className='relative flex items-center ml-auto w-96'>
                            <div className='bg-gray-300 w-96 h-96 rounded-full absolute right-0'></div>
                            <div className='mx-auto'><Image width={250} height={500} src="/img/Light.png" alt={"Market img"} /></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='py-20 px-10 md:px-10 lg:px-32 table-market'>
                <div className='flex flex-col md:flex-row items-center justify-between'>
                    <p className='text-3xl md:text-4xl lg:text-5xl font-semibold'>Tendencia del mercado</p>
                    <Link href={'/market'}>
                        <p className='cursor-pointer hover:text-sky-600 lg:text-lg'>Ver mercado <i className="fas fa-angle-right ml-1"></i></p>
                    </Link>
                </div>
                <div className='flex mt-10 mx-4 text-lg font-semibold'>
                    <div className='w-1/2 md:w-3/6 lg:w-4/12 table-market-name'>Nombre</div>
                    <div className='w-1/2 text-right md:w-2/6 lg:w-4/12 md:text-left table-market-price'>Último precio</div>
                    <div className='w-1/6 text-right lg:w-3/12 lg:text-left hidden md:block'>Cambio 24hs</div>
                    <div className='w-2/12 text-right hidden lg:block'>Cap. de mercado</div>
                </div>
                <div className='mt-5'>
                    {loading ? (
                        <>
                            <ListMarket />
                            <ListMarket />
                            <ListMarket />
                            <ListMarket />
                            <ListMarket />
                        </>
                    ) : tokens.length > 0 && tokens.map(token => (
                        <List key={token?.symbol} token={token} />
                    ))}
                </div>
                <div className='flex flex-col gap-5 mt-10'>
                    <p className='text-center md:text-left text-3xl md:text-3xl lg:text-4xl'>Registrate ahora para empezar a comprar</p>
                    <Link href={'/signup'}>
                        <button type='button' className='mx-auto md:mx-0 px-10 py-3 bg-sky-600 text-white w-fit rounded-md text-lg hover:bg-gradient-to-r from-sky-700 to-sky-500'>Crear cuenta</button>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}