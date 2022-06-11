export default function ListMarket() {

    return (
        <>
            <div className='flex items-center p-4 py-3 bg-gray-100 animate-pulse transition-all cursor-pointer rounded-lg text-lg font-semibold mb-2'>
                <div className='flex items-center gap-2 w-1/2 md:w-3/6 lg:w-4/12 table-market-name'>
                    <div className='w-10 h-10 bg-gray-300 rounded-full'></div>
                    <p className='w-20 h-3 bg-gray-300 rounded-lg'></p>
                    <p className='w-8 h-3 bg-gray-300 rounded-lg'></p>
                </div>
                <div className='w-1/2 text-right md:w-2/6 lg:w-4/12 md:text-left table-market-price'>
                    <div className='ml-auto md:ml-0 w-20 h-3 bg-gray-300 rounded-lg'></div>
                </div>
                <div className='w-1/6 text-right lg:w-3/12 lg:text-left hidden md:block'>
                    <div className='ml-auto lg:ml-0 w-16 h-3 bg-gray-300 rounded-lg'></div>
                </div>
                <div className='w-2/12 text-right hidden lg:block'>
                    <div className='ml-auto w-32 h-3 bg-gray-300 rounded-lg'></div>
                </div>
            </div>
        </>
    )
}