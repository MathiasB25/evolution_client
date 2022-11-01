import axios from 'axios';
import Image from "next/image";

const List = ({token}) => {

    function separator(numb) {
        var str = numb.toString().split(".");
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return str.join(".");
    }

    return (
        token && (
            <div key={token.symbol} className='flex items-center p-4 hover:bg-gray-100 transition-all cursor-pointer rounded-lg text-lg font-semibold'>
                <div className='flex items-center gap-2 w-1/2 md:w-3/6 lg:w-4/12 table-market-name'>
                    <Image src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${token.id}.png`} width={35} height={35} />
                    <p>{token.name}</p>
                    <p className='text-sm text-gray-600'>{token.symbol}</p>
                </div>
                <div className='w-1/2 text-right md:w-2/6 lg:w-4/12 md:text-left table-market-price'>{Number(token.price).toFixed(2)}</div>
                <div className={`w-1/6 text-right lg:w-3/12 lg:text-left hidden md:block ${token.price_change_pct?.toString().includes('-') ? 'text-red-700' : 'text-green-700'}`}>{token.price_change_pct?.toString().includes('-') ? '' : '+'}{Number(token.price_change_pct).toFixed(2)}<span>%</span></div>
                <div className='w-2/12 text-right hidden lg:block'>{separator(parseInt(token.market_cap))}</div>
            </div>
        )
    )
}

export default List