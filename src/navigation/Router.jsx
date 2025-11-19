import { BrowserRouter, Route, Routes } from 'react-router'
import App from '../App'
import RestaurantsPage from '../pages/RestaurantsPage'
import Header from './Header'
import RestaurantDetailsPage from '../pages/RestaurantDetailsPage'
import ContactPage from '../pages/ContactPage'
import AuthPage from '../pages/AuthPage'

function Router () {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index path='/' element={<App />} />
        <Route path='/restaurants' element={<RestaurantsPage />} />
        <Route path='/restaurant/:id' element={<RestaurantDetailsPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/auth' element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
