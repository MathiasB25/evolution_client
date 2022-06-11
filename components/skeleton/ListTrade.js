export default function ListTrade () {
    return (
        <>
            <div className='flex items-center bg-gray-100 py-1 rounded-lg mb-5 animate-pulse'>
                <div className='flex items-center p-4 text-lg font-semibold w-full sm:w-2/3 lg:w-9/12'>
                    <div className='flex items-center gap-3 w-full sm:w-7/12 lg:w-6/12 table-market-name'>
                        <div className='w-10 h-8 bg-gray-300 rounded-full animate-pulse'></div>
                        <div className='flex gap-3 flex-col w-full'>
                            <p className='w-20 h-4 bg-gray-300 rounded-full'></p>
                            <p className='w-24 h-4 bg-gray-300 rounded-full'></p>
                            <p className='block sm:hidden w-28 h-4 bg-gray-300 rounded-full'></p>
                        </div>
                    </div>
                    <div className='hidden sm:block text-right w-5/12 lg:text-left lg:w-4/12 table-market-price'>
                        <div className='w-20 h-4 bg-gray-300 rounded-lg ml-auto lg:ml-0'></div>
                    </div>
                    <div className={`text-right lg:w-2/12 hidden lg:block`}>
                        <div className='w-14 h-4 bg-gray-300 rounded-lg ml-auto'></div>
                    </div>
                </div>
                <div className='w-1/3 lg:w-3/12'>
                    <div className='px-10 py-5 bg-gray-300 rounded-lg w-fit ml-auto mr-5 animate-pulse'></div>
                </div>
            </div>
        </>
    )
}