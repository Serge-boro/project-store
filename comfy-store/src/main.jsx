import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { ProductsContext } from './contextProvider/ProductsContext.jsx'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { store } from './store.js'
import { Provider } from 'react-redux'

const contextClass = {
  success: 'bg-blue-600',
  error: 'bg-red-600',
  info: 'bg-gray-600',
  warning: 'bg-orange-400',
  default: 'bg-indigo-600',
  dark: 'bg-white-600 font-gray-300',
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <ProductsContext>
        <ToastContainer position='top-center' />
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </ProductsContext>
    </Provider>
  </Router>
  // <App />
)
