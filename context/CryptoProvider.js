import axios from 'axios'
import { useState, useEffect, createContext } from "react";
import useAuthProvider from '../hooks/useAuthProvider';

const CryptoContext = createContext()

const CryptoProvider = ({ children }) => {
    
    const { auth } = useAuthProvider()

    const [ currencies, setCurrencies ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ wallet, setWallet ] = useState([])
    const [ token, setToken ] = useState({})
    const [ btcPrice, setBtcPrice ] = useState(0)
    const [ busd, setBusd ] = useState(0)
    const [ tradeToken, setTradeToken ] = useState([])
    
    /* Get cryptocurrencies from an extarnal API */
    useEffect( () => {
        const firstFetch = async () => {
            setLoading(true)
            try {
                const { data } = await axios('/api/tokens')
                setCurrencies(data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        firstFetch()
        const fetchAPI = async () => {
            setLoading(true)
            try {
                setInterval( async () => {
                    const { data } = await axios('/api/tokens')
                    setCurrencies(data)
                }, 10000)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchAPI()
    }, [])

    /* Set wallet tokens when user is loggedin */
    useEffect(() => {
        const getWallet = async () => {
            try {
                const { data } = await axios.post('/api/getWallet', { auth })
                setWallet(data)
            } catch (error) {
                console.log(error.response)
            }
        }
        if (auth?._id) getWallet()
    }, [auth])

    /* Update BUSD value when wallet state change */
    useEffect( () => {
        const getBusd = () => {
            if (wallet.length > 0) {
                const busdToken = wallet.filter(token => token.symbol === 'BUSD')
                setBusd(busdToken[0]?.amount)
            }
        }
        getBusd()
    }, [wallet])
    
    /* Set BTC price when currencies state change */
    useEffect( () => {
        const btc = currencies[0]
        if (auth?._id && !token?.symbol) setToken(btc)
        if(auth?._id) setBtcPrice(btc?.price)
    }, [currencies])

    useEffect( () => {
        /* Set trade token */
        if (wallet.length > 0 && token?.symbol) { 
            const setToken = wallet.filter(coin => coin.symbol === token?.symbol)
            setTradeToken(setToken)
        }
    }, [token, wallet])


    return (
        <CryptoContext.Provider value={{
            currencies,
            loading,
            token,
            setToken,
            wallet,
            setWallet,
            btcPrice,
            setBtcPrice,
            busd,
            setBusd,
            tradeToken,
            setTradeToken
        }}>
            {children}
        </CryptoContext.Provider>
    )
}

export {
    CryptoProvider
}

export default CryptoContext