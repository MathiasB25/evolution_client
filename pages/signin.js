import axios from 'axios'
import { useEffect, useState } from 'react'
import React from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import Alert from '../components/Alert'
import { useRouter } from 'next/router'
import useAuthProvider from '../hooks/useAuthProvider'

const Signin = () => {

    const router = useRouter()

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ alert, setAlert ] = useState('')

    const { auth, setLoggingin } = useAuthProvider() 

    useEffect( () => {
        if(auth?._id) {
            router.push('/dashboard')
        }
    }, [auth])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if([email, password].includes('')) {
            setAlert({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            setTimeout( () => {

            }, 4000)
            return
        }

        try {
            const { data } = await axios.post('/api/signin', { email, password })
            localStorage.setItem('XpDZcaMrAgjT3D8u', data.token)
            setLoggingin(true);
            setLoadingLayout(true);
            setTimeout(() => {
                setLoadingDelay(true)
                router.push('/dashboard')
            }, 1000)
            setTimeout(() => {
                setLoadingLayout(false);
            }, 1650)
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alert

    return (
        <Layout page={'Iniciar sesión'}>
            <div className='mx-10 my-10 md:container md:my-20 sm:mx-auto sm:w-2/3 md:w-1/2 lg:w-5/12 xl:w-1/3'>
                <h1 className='text-center text-4xl font-semibold text-gray-800 mb-10'>Inicia sesión en Evolution</h1>
                { msg && <Alert alert={alert} />}
                <form className='flex flex-col mx-auto mt-5' onSubmit={handleSubmit}>
                    <label htmlFor='email'>Correo electrónico</label>
                    <input id='email' type='email' className='p-2 py-3 border rounded-md' placeholder='Correo electrónico' value={email} onChange={e => setEmail(e.target.value)} />
                    <label htmlFor='password' className='mt-4'>Contraseña</label>
                    <input id='password' type='password' className='p-2 py-3 border rounded-md' placeholder='Contraseña' value={password} onChange={e => setPassword(e.target.value)} />
                    <button type='submit' className='p-3 block bg-sky-600 hover:bg-sky-700 transition-all text-white rounded mt-14 text-lg'>Iniciar sesión</button>
                </form>

                <div className='flex flex-col mt-10 mx-auto'>
                    <Link href={'/forgot-password'}>
                        <a className='hover:text-sky-600 transition-all'>Olvidaste tu contraseña?</a>
                    </Link>
                    <Link href={'/signup'}>
                        <a className='hover:text-sky-600 mt-2 transition-all'>Registrar cuenta</a>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}

export default Signin