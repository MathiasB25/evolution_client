import Link from 'next/link'

const Page404 = () => {
    return (
        <>
            <div className='flex flex-col gap-2 page-404'>
                <div className='flex items-center gap-4 text-6xl'>
                    <div>Página no encontrada</div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className='text-2xl text-sky-600 underline'><Link href='/'>Volver al inicio</Link></div>
            </div>
        </>
    )
}

export default Page404