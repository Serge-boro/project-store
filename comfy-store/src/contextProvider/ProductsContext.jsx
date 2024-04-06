import { createContext, useContext, useState } from 'react'
import { customFetch } from '../utils'

const ProductsProvider = createContext()
export const ProductsContext = ({ children }) => {
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isNavlink, setIsNavlink] = useState(false)
  const [isSearch, setIsSearch] = useState('')
  const [isCompany, setIsCompany] = useState('all')
  const [isCategory, setIsCategory] = useState('all')
  const [isOrder, setIsOrder] = useState('a-z')
  const [selectedPrice, setSelectedPrice] = useState(100000)
  const [selectCheckbox, setSelectCheckbox] = useState(false)
  const [spinnerButton, setSpinnerButton] = useState(false)
  const [orderItemsList, setIsOrderItemsList] = useState({})

  const cleanUpInputs = () => {
    setIsSearch('')
    setIsCompany('all')
    setIsCategory('all')
    setIsOrder('a-z')
    setSelectedPrice(100000)
    setSelectCheckbox(false)
  }

  const customeFetchData = ({ url, params, method, body }) => {
    const doRequest = async () => {
      try {
        setLoading(true)
        setErrors(null)
        const { data } = await customFetch[method](url, { params }, body)
        data?.data && setLoading(false)
        return data
      } catch (err) {
        console.log(err)
        setErrors(
          <div className='flex'>
            <h4>Ooops....something went wrong: {err.message}</h4>
          </div>
        )
        setLoading(false)
      }
    }
    return { doRequest, errors }
  }

  return (
    <ProductsProvider.Provider
      value={{
        customeFetchData,
        loading,
        isNavlink,
        setIsNavlink,
        isSearch,
        setIsSearch,
        isCompany,
        setIsCompany,
        isCategory,
        setIsCategory,
        isOrder,
        setIsOrder,
        selectedPrice,
        setSelectedPrice,
        selectCheckbox,
        setSelectCheckbox,
        cleanUpInputs,
        spinnerButton,
        setSpinnerButton,
        orderItemsList,
        setIsOrderItemsList,
      }}
    >
      {children}
    </ProductsProvider.Provider>
  )
}

export const useContextProvider = () => {
  return useContext(ProductsProvider)
}
