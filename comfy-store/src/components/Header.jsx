import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { clearCart, deleteCartItems } from '../feature/cart/cartSlice'
import { logoutUser } from '../feature/user/userSlice'
import { useContextProvider } from '../contextProvider/ProductsContext'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useContextProvider()
  // const { user } = useSelector((state) => state.userState.user)

  const handleLogout = () => {
    console.log(user)
    navigate('/')
    dispatch(clearCart())
    dispatch(deleteCartItems())
    dispatch(logoutUser())
    localStorage.removeItem('user')
    navigate(0)
  }

  return (
    <header className='bg-neutral py-2 text-neutral-content'>
      <div className='align-element flex justify-center sm:justify-end'>
        {user ? (
          <div className='flex gap-x-2 sm:gap-x-8 items-center'>
            <p className='text-xs sm:text-sm'>Hello, {user}</p>
            <button
              className='btn btn-xs btn-outline btn-primary'
              onClick={handleLogout}
            >
              LOGOUT
            </button>
          </div>
        ) : (
          <div className='flex gap-x-6 justify-center items-center'>
            <Link className='link link-hover text-xs sm:text-sm' to='/login'>
              Sign in / Guest
            </Link>
            <Link className='link link-hover text-xs sm:text-sm' to='/register'>
              Create Account
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
