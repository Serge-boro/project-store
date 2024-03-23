// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import {
  About,
  Cart,
  Checkout,
  Error,
  HomeLayout,
  Landing,
  Orders,
  Products,
  Registers,
  SingleProduct,
  Login,
} from './pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'products', element: <Products /> },
      { path: 'products/:id', element: <SingleProduct /> },
    ],
  },
  { path: '/login', element: <Login />, errorElement: <Error /> },
  { path: '/register', element: <Registers />, errorElement: <Error /> },
])

function App() {
  return <RouterProvider router={router} />
  // return (
  //   <Routes>
  //     <Route path='/' element={<HomeLayout />}>
  //       <Route index element={<Landing />} />
  //       <Route path='products'>
  //         <Route index element={<Products />} />
  //         <Route path=':id' element={<SingleProduct />} />
  //       </Route>
  //       <Route path='cart'>
  //         <Route index element={<Cart />} />
  //       </Route>
  //       <Route path='about'>
  //         <Route index element={<About />} />
  //       </Route>
  //       <Route path='checkout'>
  //         <Route index element={<Checkout />} />
  //       </Route>
  //       <Route path='orders'>
  //         <Route index element={<Orders />} />
  //       </Route>
  //       {/* <Route path='*' element={<Navigate to='/' replace />} /> */}
  //     </Route>
  //     <Route path='/'>
  //       <Route path='login'>
  //         <Route index element={<Login />} />
  //       </Route>
  //       <Route path='register'>
  //         <Route index element={<Registers />} />
  //       </Route>
  //     </Route>
  //     <Route path='*' element={<Error />} />
  //   </Routes>
  // )
}

export default App
