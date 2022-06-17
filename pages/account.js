import Link from "next/link"
import LayoutPrivate from "../components/LayoutPrivate"

export default function Account () {

    return (
        <LayoutPrivate page='Cuenta'>
            <div className='flex items-center justify-between bg-zinc-50 py-16 p-5 sm:px-28 text-zinc-900'>
                <div className='text-4xl font-semibold'>Ajustes</div>
            </div>
            <div className='px-5 sm:px-28'>
                <div className='mt-10 text-xl font-semibold'>Mi Perfil</div>
                <div className='flex items-center justify-between mt-5 border-b py-6'>
                    <div className='flex gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className='flex flex-col gap-1'>
                            <div className='font-semibold text-lg'>Información personal</div>
                            <div className='text-zinc-500'>Cambiar información personal</div>
                        </div>
                    </div>
                    <Link href='/account/edit'><div className='py-2 p-3 sm:px-5 bg-zinc-200 hover:bg-zinc-300 rounded-md cursor-pointer transition-colors'>Cambiar</div></Link>
                </div>
                <div className='px-5 py-3 bg-red-500 text-white rounded-md cursor-pointer w-fit mt-20'>Eliminar cuenta</div>
            </div>
        </LayoutPrivate>
    )
}