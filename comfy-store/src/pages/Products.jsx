import { useEffect, useState } from 'react'
import {
  Filter,
  ProductsContainer,
  PaginationContainer,
  Loading,
} from '../components'
import { useContextProvider } from '../contextProvider/ProductsContext'

const url = '/products'
const Products = () => {
  const [isProducts, setIsProducts] = useState([])
  const [isMeta, setIsMeta] = useState({})
  const [isPagination, setIsPagination] = useState({})
  const [disablesButton, setDisablesButton] = useState(false)

  const { customeFetchData, loading } = useContextProvider()

  const totalProducts = isMeta?.pagination?.total

  const { doRequest: doRequestProducts, errors } = customeFetchData({
    url,
    method: 'get',
    body: {},
  })
  const getData = async () => {
    const { data, meta } = await doRequestProducts()

    setIsProducts(data)
    setIsMeta(meta)
    setIsPagination(meta?.pagination)
  }

  useEffect(() => {
    getData()
  }, [])

  const dataProps = (data) => {
    setIsProducts(data)
    data.length < 10 ? setDisablesButton(true) : setDisablesButton(false)
  }

  const metaProps = (meta) => {
    setIsMeta(meta)
  }

  const paginPageProps = (data) => {
    setIsProducts(data)
  }

  const paginPageMetaProps = (meta) => {
    setIsMeta(meta)
  }

  const pagesProps = (page) => {
    if (totalProducts < 10) {
      return page.slice(0, 1)
    } else {
      return page
    }
  }

  return (
    <>
      <Filter
        meta={isMeta}
        dataProps={dataProps}
        metaProps={metaProps}
        isProducts={isProducts}
        setIsProducts={setIsProducts}
        pagessProps={pagesProps}
        setDisablesButton={setDisablesButton}
      />
      {loading ? (
        <Loading />
      ) : (
        <ProductsContainer
          products={isProducts}
          errors={errors}
          meta={isMeta}
        />
      )}
      <PaginationContainer
        pagination={isPagination}
        paginPageProps={paginPageProps}
        paginPageMetaProps={paginPageMetaProps}
        pagesProps={pagesProps}
        disablesButton={disablesButton}
      />
    </>
  )
}

export default Products
