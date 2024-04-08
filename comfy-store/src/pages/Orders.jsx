import { SectionTitle } from '../components'
import OrdersList from '../components/OrderPage/OrderList'
import { useContextProvider } from '../contextProvider/ProductsContext'
const Orders = () => {
  const { orderItemsList, setIsOrderItemsList } = useContextProvider()

  if (Object.keys(orderItemsList).length === 0) {
    return <SectionTitle text='Please make an order' />
  }
  return (
    <>
      <SectionTitle text='Your Orders' />
      <OrdersList order={orderItemsList} setOrder={setIsOrderItemsList} />
    </>
  )
}
export default Orders
