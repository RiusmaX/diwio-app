import { useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import Button from '../components/Button'
import { useCart } from '../contexts/CartContext'
import CartModal from '../components/cart/CartModal'

const navItems = [
  {
    label: 'Accueil',
    link: '/'
  },
  {
    label: 'Restaurants',
    link: '/restaurants'
  },
  {
    label: 'Contact',
    link: '/contact'
  },
  {
    label: 'Mon compte',
    link: '/auth'
  }
]

function Header () {
  const { pathname } = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const { state: { user }, logout } = useAuth()

  const { state: { cart, total } } = useCart()

  return (
    <header className='flex flex-row w-full bg-slate-200 min-h-16 mb-6 shadow-sm justify-center items-center relative z-50'>
      <nav className='flex items-center w-full justify-between px-12'>
        <span className='flex w-48'>
          LOGO
        </span>
        <ul className='hidden md:flex flex-row items-center justify-center gap-4'>
          {
            navItems.map((item) => {
              const isCurrent = pathname === item.link
              return (
                <li key={item.label} className={`group text-slate-900 ${isCurrent ? 'font-bold' : 'font-semibold'} transition duration-300 cursor-pointer`}>
                  <NavLink
                    to={item.link}
                  >
                    {item.label}
                  </NavLink>
                  <span className={`block ${isCurrent ? 'max-w-full' : 'max-w-0'} group-hover:max-w-full transition-all duration-500 h-0.5 bg-slate-900`} />
                </li>
              )
            })
          }
        </ul>
        {user &&
        (
          <div className='hidden md:flex flex-row justify-end items-center w-48 gap-4'>
            <span
              className='flex flex-col justify-center items-center rounded-full h-10 w-10 bg-amber-500 font-bold'
            >
              {user.username[0]}
            </span>
            <Button onClick={logout}>
              Logout
            </Button>
          </div>
        )}

        {
          cart && (
            <>
              <div className='flex flex-row justify-end items-center w-64 mr-4 gap-2 cursor-pointer hover:opacity-90' onClick={() => setIsCartOpen(!isCartOpen)}>
                <span className='font-semibold'>Panier: </span>
                <span className='font-bold'>{cart.length} article(s) - {total}€</span>
              </div>
              {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}
            </>
          )
        }

        {/* Mobile Hamburger Button */}
        <button
          className='flex flex-col justify-center items-center md:hidden w-8 h-8 space-y-1.5 z-20 focus:outline-none'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className={`block w-6 h-0.5 bg-slate-900 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-slate-900 transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-slate-900 transition-transform duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Mobile Menu Panel */}
        <div className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-slate-200 shadow-xl z-40 transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col pt-24 px-8 gap-8`}>
          <ul className='flex flex-col gap-6'>
            {
              navItems.map((item) => {
                const isCurrent = pathname === item.link
                return (
                  <li key={item.label} className={`text-slate-900 ${isCurrent ? 'font-bold' : 'font-semibold'} text-lg`}>
                    <NavLink
                      to={item.link}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                )
              })
            }
          </ul>
          {user && (
            <div className='flex flex-col gap-4 pt-6 border-t border-slate-300'>
              <div className='flex items-center gap-3'>
                <span className='flex flex-col justify-center items-center rounded-full h-10 w-10 bg-amber-500 font-bold'>
                  {user.username[0]}
                </span>
                <span className='font-medium'>{user.username}</span>
              </div>
              <Button onClick={() => { logout(); setIsMenuOpen(false) }}>
                Logout
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
