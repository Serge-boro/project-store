import ProductsGrid from './ProductsGrid'
import SectionTitle from './SectionTitle'

const FeatureProducts = ({ products, errors }) => {
  return (
    <div className='pt-24'>
      <SectionTitle text='feature products' />
      <ProductsGrid products={products} errors={errors} />
    </div>
  )
}

export default FeatureProducts
