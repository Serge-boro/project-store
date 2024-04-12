import { useState } from 'react'
import ProductsList from '../HomeProducts/ProductList'
import ProductsGrid from '../HomeProducts/ProductsGrid'
import { BsFillGridFill, BsList } from 'react-icons/bs'

const ProductsContainer = ({ products, errors, meta }) => {
  const [layout, setLayout] = useState('grid')

  const totalProducts = meta?.pagination?.total

  // console.log(totalProducts)

  const setActiveStyles = (pattern) => {
    return `text-xl btn btn-circle btn-sm ${
      pattern === layout
        ? 'btn-primary text-primary-content'
        : 'btn-ghost text-based-content'
    }`
  }

  return (
    <>
      <div className='flex justify-between items-center mt-8 border-b border-base-300 pb-5'>
        <h4 className='font-medium text-md'>
          {products?.length > 0 ? totalProducts : 0} product
          {totalProducts > 1 && 's'}
        </h4>
        <div className='flex gap-x-2'>
          <button
            className={setActiveStyles('grid')}
            onClick={() => setLayout('grid')}
            type='button'
          >
            <BsFillGridFill />
          </button>
          <button
            className={setActiveStyles('list')}
            onClick={() => setLayout('list')}
            type='button'
          >
            <BsList />
          </button>
        </div>
      </div>
      <div>
        {layout === 'grid' ? (
          <ProductsGrid products={products} errors={errors} />
        ) : (
          <ProductsList products={products} errors={errors} />
        )}
      </div>
    </>
  )
}

export default ProductsContainer
