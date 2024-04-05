import { Link } from 'react-router-dom'
import { formatPrice } from '../../utils'
const ProductsGrid = ({ products, errors }) => {
  return (
    <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {errors
        ? errors
        : products?.map((item) => {
            const { title, price, image } = item.attributes
            return (
              <Link
                to={`/products/${item.id}`}
                key={item.id}
                className='card w-full shadow-xl hover:shadow-2xl transition duration-300'
              >
                <figure className='px-4 pt-4'>
                  <img
                    src={image}
                    alt={title}
                    className='rounded-xl h-64 className="md:h-48 w-full object-cover'
                  />
                </figure>
                <div className='card-body items-center text-center'>
                  <h2 className='card-title capitalize tracking-wider'>
                    {title}
                  </h2>
                  <span className='text-secondary'>{formatPrice(price)}</span>
                </div>
              </Link>
            )
          })}
    </div>
  )
}

export default ProductsGrid
