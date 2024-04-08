import { useNavigate } from 'react-router-dom'
import FormInput from '../CustomeForm/CusromeFormInput'
import SubmitBtn from '../SubmitBtn'
import { formatPrice } from '../../utils'
import { toast } from 'react-toastify'
import { clearCart } from '../../feature/cart/cartSlice'
import { useContextProvider } from '../../contextProvider/ProductsContext'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import day from 'dayjs'

const CheckoutForm = () => {
  const { setIsOrderItemsList } = useContextProvider()

  const { user } = useSelector((state) => state.userState.user)
  const { cartItems, orderTotal, numItemsInCart } = useSelector(
    (state) => state.cartState
  )

  const [name, setName] = useState(user)
  const [address, setAddress] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const redirect = () => {
    const timeOut = setTimeout(() => {
      navigate('/orders')
    }, 3000)

    return () => clearTimeout(timeOut)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const date = day(new Date().getTime()).format('hh:mm a - MMM Do, YYYY ')

    const info = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
      numItemsInCart,
      date,
      cartItems,
    }

    setIsOrderItemsList(info)
    setName('')
    setAddress('')
    dispatch(clearCart())
    redirect()
    toast.success('order placed successfully')
  }

  return (
    <form className='flex flex-col gap-y-4' onSubmit={handleSubmit}>
      <h4 className='font-medium text-xl'>Shipping Information</h4>
      <FormInput
        htmlFor='name'
        label='first name'
        name='name'
        type='text'
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <FormInput
        htmlFor='address'
        label='address'
        name='address'
        type='text'
        onChange={(e) => setAddress(e.target.value)}
        value={address}
        required
      />
      <div className='mt-4'>
        {!user || user === 'guest' ? (
          <SubmitBtn
            text='Please do login before place the order'
            canSave={false}
          />
        ) : (
          <SubmitBtn text='Place Your Order' canSave={true} />
        )}
      </div>
    </form>
  )
}
export default CheckoutForm
