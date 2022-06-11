import useCryptoProvider from '../hooks/useCryptoProvider'
import Layout from '../components/Layout'
import List from '../components/List'
import ListMarket from '../components/skeleton/ListMarket'

export default function Market () {

    const { currencies, loading } = useCryptoProvider()

    return (
        <Layout page={'Mercado'}>
            <div className='py-20 px-10 md:px-10 lg:px-32 table-market'>
                <div className='flex flex-col md:flex-row items-center justify-between'>
                    <p className='text-3xl md:text-4xl lg:text-5xl font-semibold'>Tendencia del mercado</p>
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
                            <ListMarket />
                            <ListMarket />
                            <ListMarket />
                            <ListMarket />
                            <ListMarket />
                        </>
                    ) : currencies.length > 0 && currencies.map(token => (
                        <List key={token?.id} token={token} />
                    ))}
                </div>
            </div>
        </Layout>
    )
}