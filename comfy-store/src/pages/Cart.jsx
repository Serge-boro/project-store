import { useSelector } from 'react-redux'
import { CartItemsList, SectionTitle, CartTotal } from '../components'
import { Link } from 'react-router-dom'
import { renderItemCart } from '../feature/cart/cartSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

const Cart = () => {
  const { user } = useSelector((user) => user.userState.user)
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(renderItemCart())
  }, [])

  if (numItemsInCart === 0) {
    return <SectionTitle text='Your cart is empty' />
  }

  return (
    <>
      <SectionTitle text='Shopping Cart' />
      <div className='mt-8 grid gap-8  lg:grid-cols-12'>
        <div className='lg:col-span-8'>
          <CartItemsList />
        </div>
        <div className='lg:col-span-4 lg:pl-4'>
          <CartTotal />
          {user ? (
            <Link to='/checkout' className='btn btn-primary btn-block mt-8'>
              Proceed to checkout
            </Link>
          ) : (
            <Link to='/login' className='btn btn-primary btn-block mt-8'>
              Login to checkout
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
export default Cart
