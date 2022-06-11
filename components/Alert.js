import useCryptoProvider from '../hooks/useCryptoProvider'

const Alert = ({alert}) => {

    return (
        <div className={`px-5 py-2 w-full text-white text-center rounded-lg uppercase font-semibold ${alert.error ? 'bg-red-600' : 'from-sky-600 to-sky-500 bg-gradient-to-l'}`}>{alert.msg}</div>
    )
}

export default Alert