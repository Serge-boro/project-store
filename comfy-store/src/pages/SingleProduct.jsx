import { useEffect, useState } from 'react'
import { useContextProvider } from '../contextProvider/ProductsContext'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { formatPrice } from '../utils'
import { Loading } from '../components'
import { useDispatch } from 'react-redux'
import { addItem } from '../feature/cart/CartSlice'

const url = '/products'

const SingleProduct = () => {
  const [isSingleProduct, setIsSingleProduct] = useState({})
  const { customeFetchData, loading } = useContextProvider()
  let { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    id: productID,
    attributes: { title, company, description, image, price, colors } = {},
  } = isSingleProduct
  const [productColor, setProductColor] = useState('')
  const [colorData, setColorData] = useState([])
  const [amount, setAmount] = useState(1)

  const cartProduct = {
    cartID: productID + colorData[0],
    productID,
    image,
    title,
    price,
    company,
    productColor: productColor || colorData[0],
    amount,
  }

  const addToCart = () => {
    dispatch(addItem({ cartProduct }))
    setAmount(1)
    navigate('/products')
  }

  const { doRequest: doRequestSingleProduct } = customeFetchData({
    url: `${url}/${id}`,
    method: 'get',
    body: {},
  })

  const getData = async () => {
    const { data } = await doRequestSingleProduct()
    setColorData(data?.attributes?.colors)
    setIsSingleProduct(data)
  }

  useEffect(() => {
    getData()
  }, [])

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value))
  }

  const generateAmountOptions = (number) => {
    return Array.from({ length: number }, (_, idx) => {
      const amounts = idx + 1

      return (
        <option key={amounts} value={amounts}>
          {amounts}
        </option>
      )
    })
  }

  return (
    <>
      {loading ? (
        <Loading style='absolute inset-0' />
      ) : (
        <section>
          <div className='text-md breadcrumbs'>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/products'>Products</Link>
              </li>
            </ul>
          </div>

          <div className='mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16'>
            <img
              src={image}
              alt={title}
              className='w-96 h-96 object-cover rounded-lg lg:w-full'
            />
            <div>
              <h1 className='capitalize text-3xl font-bold'>{title}</h1>
              <h4 className='text-xl text-neutral-content font-bold mt-2'>
                {company}
              </h4>
              <p className='mt-3 text-xl'>{formatPrice(price)}</p>
              <p className='mt-6 leading-8'>{description}</p>
              <div className='mt-6'>
                <h4 className='text-md font-medium tracking-wider capitalize'>
                  <div className='mt-2'>
                    {colors?.map((item, idx) => {
                      return (
                        <button
                          className={`badge w-6 h-6 mr-2 ${
                            item === productColor && 'border-2 border-secondary'
                          }`}
                          key={`prefix-${idx}`}
                          type='button'
                          style={{ background: item }}
                          onClick={() => setProductColor(item)}
                        ></button>
                      )
                    })}
                  </div>
                </h4>
              </div>
              <div className='form-control w-full max-w-xs'>
                <label className='label' htmlFor='amount'>
                  <h4 className='text-md font-medium -tracking-wider capitalize'>
                    amount
                  </h4>
                </label>
                <select
                  id='amount'
                  className='select select-secondary select-bordered select-md'
                  value={amount}
                  onChange={handleAmount}
                >
                  {generateAmountOptions(20)}
                </select>
              </div>
              <div className='mt-10'>
                <button
                  className='btn btn-secondary btn-md'
                  onClick={addToCart}
                >
                  Add to bag
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default SingleProduct
