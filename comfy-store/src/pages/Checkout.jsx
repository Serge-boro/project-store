import { useSelector } from 'react-redux'
import { CheckoutForm, SectionTitle, CartTotal } from '../components'

const Checkout = () => {
  const cartItems = useSelector((state) => state.cartState.cartItems)
  if (cartItems.length === 0) {
    return <SectionTitle text='Your cart is empty' />
  }
  return (
    <>
      <SectionTitle text='Place your order' />
      <div className='mt-8 grid gap-8  md:grid-cols-2 items-start'>
        <CheckoutForm />
        <CartTotal />
      </div>
    </>
  )
}
export default Checkout
