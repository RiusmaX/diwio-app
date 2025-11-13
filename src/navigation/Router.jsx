import { BrowserRouter, Route, Routes } from 'react-router'
import App from '../App'
import RestaurantsPage from '../pages/RestaurantsPage'
import Header from './Header'
import RestaurantDetailsPage from '../pages/RestaurantDetailsPage'

function Router () {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index path='/' element={<App />} />
        <Route path='/restaurants' element={<RestaurantsPage />} />
        <Route path='/restaurant/:id' element={<RestaurantDetailsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
