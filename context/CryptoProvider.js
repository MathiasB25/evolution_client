import axios from 'axios'
import { useState, useEffect, createContext } from "react";
import useAuthProvider from '../hooks/useAuthProvider';

const CryptoContext = createContext()

const CryptoProvider = ({ children }) => {
    
    const { auth } = useAuthProvider()

    const [ currencies, setCurrencies ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ theme, setTheme ] = useState(true)
    const [ wallet, setWallet ] = useState([])
    const [ token, setToken ] = useState({})
    const [ btcPrice, setBtcPrice ] = useState(0)
    const [ busd, setBusd ] = useState(0)
    
    useEffect( () => {
        const fetchAPI = async () => {
            setLoading(true)
            const { data } = await axios('/api/tokens')
            setCurrencies(data)
            setLoading(false)
        }
        fetchAPI()
    }, [])

    useEffect(() => {
        const getWallet = async () => {
            try {
                const { data } = await axios.post('/api/getWallet', { auth })
                setWallet(data)
            } catch (error) {
                console.log(error.response)
            }
        }
        getWallet()
    }, [auth])

    useEffect( () => {
        const getBusd = () => {
            if (wallet.length > 0) {
                const busdToken = wallet.filter(token => token.symbol === 'BUSD')
                setBusd(busdToken[0].amount)
            }
        }
        getBusd()
    }, [wallet])
    
    useEffect( () => {
        const btc = currencies[0]
        setToken(btc)
        setBtcPrice(btc?.price)
    }, [currencies])

    return (
        <CryptoContext.Provider value={{
            currencies,
            loading,
            theme,
            token,
            setToken,
            wallet,
            setWallet,
            btcPrice,
            busd,
            setBusd
        }}>
            {children}
        </CryptoContext.Provider>
    )
}

export {
    CryptoProvider
}

export default CryptoContext