import useCryptoProvider from "../../hooks/useCryptoProvider";
import Image from "next/image";

const List = ({ token }) => {

    const { setToken } = useCryptoProvider()

    return (
        token && (
            <div className='flex items-center'>
                <div className='flex items-center p-4 text-lg font-semibold w-full sm:w-2/3 lg:w-9/12'>
                    <div className='flex items-center gap-3 w-full sm:w-7/12 lg:w-6/12 table-market-name'>
                        <Image src={token.logo_url} width={35} height={35} />
                        <div className='flex flex-col w-full'>
                            <p className='trade-ellipsis'>{token.name}</p>
                            <p>{token.symbol}/BUSD</p>
                            <p className='block sm:hidden font-bold'>Precio: {Number(token.price).toFixed(2)}</p>
                        </div>
                    </div>
                    <div className='hidden sm:block text-right w-5/12 lg:text-left lg:w-4/12 table-market-price'>{Number(token.price).toFixed(2)}</div>
                    <div className={`text-right lg:w-2/12 hidden lg:block ${token['1d'].price_change_pct?.toString().includes('-') ? 'text-red-700' : 'text-green-700'}`}>{token['1d'].price_change_pct?.toString().includes('-') ? '' : '+'}{Number(token['1d'].price_change_pct * 100).toFixed(2)}<span>%</span></div>
                </div>
                <div className='w-1/3 lg:w-3/12 text-right'>
                    {token.id !== 'USDT' && token.id !== 'BUSD' && token.id !== 'USDC' && token.id !== 'DAI' && (
                        <button className='p-3 bg-sky-600 text-white rounded-md hover:bg-gradient-to-r from-sky-700 to-sky-500' onClick={() => setToken(token)}>Comprar</button>
                    )}
                </div>
            </div>
        )
    )
}

export default List