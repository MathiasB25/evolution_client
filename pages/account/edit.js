import axios from "axios"
import { useState } from "react"
import LayoutPrivate from "../../components/LayoutPrivate"
import useAuthProvider from "../../hooks/useAuthProvider"
import Alert from '../../components/Alert'
import Link from "next/link"
import { useRouter } from "next/router"

export default function EditAccount () {

    const router = useRouter()

    const { auth, setAuth } = useAuthProvider()
    const { name, email, _id } = auth

    const [ userName, setUser ] = useState(name)
    const [ userEmail, setEmail ] = useState(email)
    const [ password, setPassword ] = useState('')
    const [ alert, setAlert ] = useState({})

    const handleSubmit = async e => {
        e.preventDefault()

        if([userName, userEmail, password].includes('')) {
            setAlert({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            setTimeout( () => {
                setAlert({})
            }, 3000)
            return
        }

        const authToken = localStorage.getItem('XpDZcaMrAgjT3D8u')
        if (!authToken) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`
            }
        }

        try {
            const { data } = await axios.post('/api/edit', { name: userName, email: userEmail, password, _id, config })
            setAuth({ name: data.name, email: data.email, _id: data._id })
            setUser('')
            setEmail('')
            setPassword('')
            setAlert({})
            router.push('/account')
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alert

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
                <div className='text-4xl 2xl:text-5xl font-semibold text-center mb-6'>Ajustes de tu cuenta</div>
                {msg && <div className='w-fit mx-auto'><Alert alert={alert} /></div> }
                <form className='mx-auto w-10/12 sm:w-2/3 md:w-7/12 lg:w-1/2 2xl:w-1/2 mt-6' onSubmit={e => handleSubmit(e)}>
                    <div className='text-lg'>
                        <label htmlFor='name' className='block'>Nombre</label>
                        <input id='name' type='text' className='border w-full p-3 rounded-md outline-none' placeholder={name} value={userName} onChange={e => setUser(e.target.value)} />
                    </div>
                    <div className='text-lg mt-5'>
                        <label htmlFor='email' className='block'>Email</label>
                        <input id='email' type='text' className='border w-full p-3 rounded-md outline-none' placeholder={email} value={userEmail} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className='text-lg mt-5'>
                        <label htmlFor='password' className='block'>Contraseña</label>
                        <input id='password' type='password' className='border w-full p-3 rounded-md outline-none' placeholder='••••••••' value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button type='submit' className='w-full py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-lg font-semibold mt-10 transition-colors'>Guardar cambios</button>
                </form>
            </div>
        </LayoutPrivate>
    )
}