import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import useAuthProvider from '../hooks/useAuthProvider'
import Link from 'next/link'
import Alert from '../components/Alert'
import { useRouter } from 'next/router'

const Signup = () => {

    const router = useRouter()

    const { email, setEmail, auth } = useAuthProvider()

    const [ name, setName ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ repeatPassword, setRepeatPassword ] = useState('')
    const [ alert, setAlert ] = useState('')

    useEffect(() => {
        if (auth?._id) {
            router.push('/dashboard')
        }
    }, [auth])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if([name, email, password, repeatPassword].includes('')) {
            setAlert({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            setTimeout( () => {
                setAlert({})
            }, 4000)
            return
        }

        if(password !== repeatPassword) {
            setAlert({
                msg: 'Las contraseñas no son iguales',
                error: true
            })
            setTimeout(() => {
                setAlert({})
            }, 4000)
            return
        }
        
        try {
            const { data } = await axios.post(`/api/signup`, { name, email, password })
            setAlert({
                msg: data.msg,
                error: false
            })
            setTimeout( () => {
                setAlert({})
                router.push('/signin')
            }, 3000)
            setName('')
            setEmail('')
            setPassword('')
            setRepeatPassword('')
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alert

    return (
        <Layout page={'Registrar cuenta'}>
            <div className='mx-10 my-10 md:container md:my-20 sm:mx-auto sm:w-2/3 md:w-1/2 lg:w-5/12 xl:w-1/3'>
                <h1 className='text-center text-4xl font-semibold text-gray-800 mb-10'>Registra una cuenta en Evolution</h1>
                { msg && <Alert alert={alert} />}
                <form className='flex flex-col mx-auto mt-5' onSubmit={handleSubmit}>
                    <label htmlFor='name'>Nombre</label>
                    <input id='name' type='text' className='p-2 py-3 border rounded-md' placeholder='Tu nombre' value={name} onChange={e => setName(e.target.value)} />
                    <label htmlFor='email' className='mt-4'>Correo electrónico</label>
                    <input id='email' type='email' className='p-2 py-3 border rounded-md' placeholder='Correo electrónico' value={email} onChange={e => setEmail(e.target.value)} />
                    <label htmlFor='password' className='mt-4'>Contraseña</label>
                    <input id='password' type='password' className='p-2 py-3 border rounded-md' placeholder='Contraseña' value={password} onChange={e => setPassword(e.target.value)} />
                    <label htmlFor='repeatPass' className='mt-4'>Repetir contraseña</label>
                    <input id='repeatPass' type='password' className='p-2 py-3 border rounded-md' placeholder='Repetir contraseña' value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} />
                    <button type='submit' className='p-3 block bg-sky-600 hover:bg-sky-700 transition-all text-white rounded mt-14 text-lg'>Crear cuenta</button>
                </form>

                <div className='flex flex-col mt-10 mx-auto'>
                    <Link href={'/signin'}>
                        <a className='hover:text-sky-600 transition-all'>¿Ya tienes una cuenta? Inicia sesión</a>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}

export default Signup