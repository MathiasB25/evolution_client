import Link from "next/link"
import LayoutPrivate from "../../components/LayoutPrivate"
import useAuthProvider from "../../hooks/useAuthProvider"

export default function EditAccount () {

    const { auth } = useAuthProvider()
    const { name, email } = auth

    return (
        <LayoutPrivate>
            <Link href='/account'>
                <div className='absolute left-10 -top-12 flex items-center gap-2 cursor-pointer w-fit hover:text-sky-600 transition-colors'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                    </svg>
                    <div className='font-semibold text-lg'>Atras</div>
                </div>
            </Link>
            <div className='mt-20'>
                <div className='text-4xl 2xl:text-5xl font-semibold text-center'>Ajustes de tu cuenta</div>
                <form className='mx-auto w-10/12 sm:w-2/3 md:w-7/12 lg:w-1/2 2xl:w-1/2 mt-12'>
                    <div className='text-lg'>
                        <label htmlFor='name' className='block'>Nombre</label>
                        <input id='name' type='text' className='border w-full p-3 rounded-md outline-none' value={name} />
                    </div>
                    <div className='text-lg mt-5'>
                        <label htmlFor='email' className='block'>Email</label>
                        <input id='email' type='text' className='border w-full p-3 rounded-md outline-none' value={email} />
                    </div>
                    <div className='text-lg mt-5'>
                        <label htmlFor='password' className='block'>Cambiar contraseña</label>
                        <input id='password' type='password' className='border w-full p-3 rounded-md outline-none' placeholder='••••••••' />
                    </div>
                    <button className='w-full py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-lg font-semibold mt-10 transition-colors'>Guardar cambios</button>
                </form>
            </div>
        </LayoutPrivate>
    )
}