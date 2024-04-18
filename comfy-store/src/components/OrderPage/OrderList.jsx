import { useNavigate } from 'react-router-dom'
import { formatPrice } from '../../utils'
import { toast } from 'react-toastify'
const OrdersList = ({ order, setOrder }) => {
  const navigate = useNavigate()
  const { address, cartItems, chargeTotal, date, name, numItemsInCart } = order

  const addressOrder = address && address.slice(0, 15) + '...'

  const orderProceed = () => {
    setOrder({})
    toast.success('payments was proceeded')
    redirect()
  }

  const redirect = () => {
    const timeOut = setTimeout(() => {
      navigate('/')
    }, 3000)

    return () => clearTimeout(timeOut)
  }

  return (
    <div className='mt-8'>
      <div>
        <h4 className='mb-4 capitalize'>total orders : {numItemsInCart}</h4>
      </div>
      <article className='mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0'>
        <div className='sm:ml-16 sm:w-48'>
          <table className='table table-zebra sm:ml-[-80px]'>
            <thead className=''>
              <tr className='hidden sm:flex sm:flex-row w-[600px] sm:gap-11'>
                <th>Picture</th>
                <th>Amount</th>
                <th>Product</th>
                <th>Brand</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((item) => {
                return (
                  <tr
                    key={item.cartID}
                    className='flex flex-col items-center leading-3  sm:flex-row sm:gap-11'
                  >
                    <td>
                      <img
                        src={item.image}
                        alt=''
                        className='h-32 w-32 rounded-lg sm:w-16 sm:h-16 object-cover'
                      />
                    </td>
                    <td>{item.amount}</td>
                    <td>{item.company}</td>
                    <td>{item.title}</td>
                    <td>{formatPrice(item.price)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className='sm:ml-12'>
          <div className='form-control max-w-xs'></div>
        </div>

        <div className='font-medium sm:ml-auto'>
          <div className='card bg-base-200 sm:w-80 '>
            <div className='card-body'>
              <p className='flex justify-between text-xs border-b border-base-300 pb-2'>
                <span>Customer Name:</span>
                <span className='font-medium'>{name}</span>
              </p>
              <p className='flex justify-between text-xs border-b border-base-300 pb-2'>
                <span>Address:</span>
                <span className='font-medium'>{addressOrder}</span>
              </p>
              <p className='flex justify-between text-xs border-b border-base-300 pb-2'>
                <span>Date:</span>
                <span className='font-medium'>{date}</span>
              </p>
              <p className='mt-4 flex justify-between text-sm pb-2'>
                <span className='font-bold'>Order Total</span>
                <span className='font-bold'>{formatPrice(chargeTotal)}</span>
              </p>
            </div>
          </div>
        </div>
      </article>
      <button className='btn btn-primary w-48' onClick={orderProceed}>
        proceed your payments
      </button>
    </div>
  )
}
export default OrdersList
