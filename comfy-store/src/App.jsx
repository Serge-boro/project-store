import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import {
  About,
  Cart,
  Checkout,
  HomeLayout,
  Landing,
  Orders,
  Products,
  Registers,
  SingleProduct,
  Login,
} from './pages'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomeLayout />}>
        <Route index element={<Landing />} />
        <Route path='products'>
          <Route index element={<Products />} />
          <Route path=':id' element={<SingleProduct />} />
        </Route>
        <Route path='cart'>
          <Route index element={<Cart />} />
        </Route>
        <Route path='about'>
          <Route index element={<About />} />
        </Route>
        <Route path='checkout'>
          <Route index element={<Checkout />} />
        </Route>
        <Route path='orders'>
          <Route index element={<Orders />} />
        </Route>
      </Route>
      <Route path='/'>
        <Route path='login'>
          <Route index element={<Login />} />
        </Route>
        <Route path='register'>
          <Route index element={<Registers />} />
        </Route>
      </Route>
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  )
}

export default App
