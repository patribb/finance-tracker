import { useContext } from 'react'
import {FcGoogle} from 'react-icons/fc'
import { authContext } from '@/lib/store/auth-context'

const SignIn = () => {
    const {googleLoginHandler} = useContext(authContext)

  return (
    <main className="container flex flex-col items-center justify-center max-w-2xl px-6 mx-auto">
        <h1 className="text-6xl font-black mb-6 text-cenetr">Welcome!</h1>
        <div className="flex flex-col overflow-hidden shadow-md shadow-slate-500 bg-slate-800 rounded-xl">
            <div className="h-60">
                <img src="/images/finance.png" alt="Finance Tracker" className="object-cover w-full h-full" />
            </div>
            <div className="px-4 py-4">
                <h3 className="text-2xl text-center">Please, Sign In to continue!</h3>
                <button 
                   onClick={googleLoginHandler}
                   className='flex self-start gap-2 px-4 py-2 mx-auto mt-6 font-md text-white align-middle bg-gray-700 rounded-full'>
                    <FcGoogle size={25} /> Google
                </button>
            </div>
        </div>
    </main>
  )
}
export default SignIn