import { CryptoProvider } from '../context/CryptoProvider'
import { AuthProvider } from '../context/AuthProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CryptoProvider>
        <Component {...pageProps} />
      </CryptoProvider>
    </AuthProvider>
  )
}

export default MyApp
