export default function LoadingV2({animation}) {

    return(
        <div className={`${animation === 'start' ? 'loadingStart' : 'loadingEnd'} w-screen h-screen bg-white fixed z-50 top-0 left-0`}>
            <div className="flex gap-2 text-6xl justify-center items-center h-screen">
                <div><i className="fas fa-copyright"></i></div>
                <div className="font-light">Evolution</div>
            </div>
        </div>
    )
}