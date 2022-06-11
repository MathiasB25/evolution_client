import Head from 'next/head'
import Navbar from './Navbar'

const Layout = ({children, page}) => {
  return (
    <div>
        <Head>
          <title>Evolution | {page}</title>
              <meta name='description' content='Sitio web de intercambio de criptomonedas' />
          <link href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" rel="stylesheet" />
        </Head>

        <Navbar />
        {children}
    </div>
  )
}

export default Layout