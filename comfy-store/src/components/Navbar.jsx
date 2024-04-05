import { BsCart3, BsMoonFill, BsSunFill } from 'react-icons/bs'
import { FaBarsStaggered } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'
import { logo } from '../assets'
import NavLinks from './NavLinks'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const themes = {
  winter: 'winter',
  dracula: 'dracula',
}

/*
html teg styling=> 
document.documentElement.setAttribute('style', `background: ${theme}`)
localStorage.setItem('style', theme)
LocalStorage.getItem('style') || 'red'
*/

const getThemeFromLocalStorage = () => {
  return localStorage.getItem('theme') || themes.dracula
}

const Navbar = () => {
  const [theme, setTheme] = useState(getThemeFromLocalStorage)

  const handleTheme = () => {
    const { winter, dracula } = themes
    setTheme(theme === dracula ? winter : dracula)
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart)

  return (
    <nav className='bg-base-200'>
      <div className='navbar align-element '>
        <div className='navbar-start'>
          {/* Title */}
          <NavLink
            to='/'
            className='hidden lg:flex btn bg-red-500 hover:bg-red-400 text-3xl items-center'
            // onClick={() => window.scrollTo(0, 0)}
          >
            <img src={logo} alt='logo' className='w-10 object-contain' />
          </NavLink>
          {/* DROPDOWN */}
          <div className='dropdown'>
            <label tabIndex={0} className='btn btn-ghost lg:hidden'>
              <FaBarsStaggered className='h-6 w-6' />
            </label>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52'
            >
              <NavLinks />
            </ul>
          </div>
        </div>

        {/* horizontal */}
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal '>
            <NavLinks />
          </ul>
        </div>
        <div className='navbar-end'>
          <label className='swap swap-rotate'>
            <input type='checkbox' onChange={handleTheme} />
            <BsSunFill className='swap-on h-4 w-4' />
            <BsMoonFill className='swap-off h-4 w-4' />
          </label>

          {/* CART LINK*/}
          <NavLink to='cart' className='btn btn-ghost btn-circle btn-md ml-4'>
            <div className='indicator'>
              <BsCart3 className='h-6 w-6' />
              <span className='badge badge-sm badge-primary indicator-item'>
                {numItemsInCart}
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
