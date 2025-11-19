import { NavLink, useLocation } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import Button from '../components/Button'

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

  const { state: { user }, logout } = useAuth()

  return (
    <header className='flex flex-row w-full bg-slate-200 min-h-16 mb-6 shadow-sm justify-center items-center'>
      <nav className='flex items-center w-full justify-between px-12'>
        <span className='flex w-48'>
          LOGO
        </span>
        <ul className='flex flex-row items-center justify-center gap-4'>
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
          <div className='flex flex-row justify-end items-center w-48 gap-4'>
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
      </nav>
    </header>
  )
}

export default Header
