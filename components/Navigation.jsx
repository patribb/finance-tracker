import { useContext } from 'react'
import {IoStatsChart} from 'react-icons/io5'
import { authContext } from '@/lib/store/auth-context'

const Navigation = () => {
  const {user, loading, logout} = useContext(authContext)
  return (
    <header className='container max-w-2xl px-6 py-6 mx-auto'>
    <div className="flex items-center justify-between">
      {user && !loading && (
        <div className="flex items-center gap-2">
        <div className="h-[47px] w-[47px] rounded-full overflow-hidden">
        <img className="w-full h-full object-cover" src={user.photoURL} alt={user.displayName} />
        </div>
        <small>Hi, {user.displayName}!</small>
      </div>
      )}
     {user &&!loading && (
       <nav className="flex items-center gap-4">
       <div>
         <IoStatsChart size={30} />
       </div>
       <div>
         <button onClick={logout} className="btn btn-danger">LogOut</button>
       </div>
     </nav>
     )}
    </div>
  </header>
  )
}
export default Navigation