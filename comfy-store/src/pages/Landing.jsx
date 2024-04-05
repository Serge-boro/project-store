import { useEffect, useState } from 'react'
import { FeatureProducts, Hero } from '../components'
import { useContextProvider } from '../contextProvider/ProductsContext'
import { Loading } from '../components'

const url = '/products'

const Landing = () => {
  const [isProductsHome, setIsProductsHome] = useState([])
  const { customeFetchData, loading } = useContextProvider()

  const { doRequest: doRequestHome, errors } = customeFetchData({
    url,
    method: 'get',
    params: { featured: 'true' },
    body: {},
  })

  const getData = async () => {
    const { data } = await doRequestHome()
    setIsProductsHome(data)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Hero />
      {loading ? (
        <Loading />
      ) : (
        <FeatureProducts products={isProductsHome} errors={errors} />
      )}
    </>
  )
}

export default Landing
