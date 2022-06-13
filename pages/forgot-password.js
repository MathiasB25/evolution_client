import Layout from "../components/Layout"
import Link from 'next/link'

const forgotPassword = () => {
    return (
        <Layout page={'Recuperar cuenta'}>
            <div className='mx-10 my-10 md:container md:my-20 sm:mx-auto sm:w-2/3 md:w-1/2 lg:w-5/12 xl:w-1/3'>
                <h1 className='text-center text-4xl font-semibold text-gray-800'>Recupera tu cuenta en Evolution</h1>
                <form className='flex flex-col mx-auto mt-5'>
                    <label htmlFor='email'>Correo electrónico</label>
                    <input id='email' type='email' className='p-2 py-3 border rounded-md' />
                    <button type='button' className='p-3 block bg-sky-600 hover:bg-sky-700 transition-all text-white rounded mt-10 text-lg'>Enviar instrucciones</button>
                </form>

                <div className='flex flex-col mt-10 mx-auto'>
                    <Link href={'/signin'}>
                        <a className='hover:text-sky-600 transition-all'>¿Ya tienes una cuenta? Inicia sesión</a>
                    </Link>
                    <Link href={'/signup'}>
                        <a className='hover:text-sky-600 mt-2 transition-all'>Registrar cuenta</a>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}

export default forgotPassword