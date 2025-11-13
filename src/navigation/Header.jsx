import { NavLink, useLocation } from 'react-router'

const navItems = [
  {
    label: 'Accueil',
    link: '/'
  },
  {
    label: 'Restaurants',
    link: '/restaurants'
  }
]

function Header () {
  const { pathname } = useLocation()
  return (
    <header className='flex flex-row w-full bg-slate-200 min-h-16 mb-6 shadow-sm'>
      <nav className='flex w-full'>
        <ul className='flex flex-row w-full items-center justify-center gap-4'>
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
      </nav>
    </header>
  )
}

export default Header
