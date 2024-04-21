import { useEffect, useState } from 'react'

import {
  Filter,
  ProductsContainer,
  PaginationContainer,
  Loading,
} from '../components'
import { useContextProvider } from '../contextProvider/ProductsContext'
import { useDispatch } from 'react-redux'
import { renderItemCart } from '../feature/cart/cartSlice'
import { useNavigate } from 'react-router-dom'

// import { useNavigate, useLocation } from 'react-router-dom'
// import useAxiosPrivate from '../token/useAxiosPrivate'

const url = '/products'
const Products = () => {
  const {
    customeFetchData,
    loading,
    isMeta,
    setIsMeta,
    setIsProducts,
    isPagination,
    isProducts,
    paginPageFilterSort,
    selectedPrice,
  } = useContextProvider()

  const { errors } = customeFetchData({
    url,
    method: 'get',
  })

  const dataProps = (data) => {
    setIsProducts(data)
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

  const dataPropsSort = (data) => {
    setIsProducts(data)
  }

  const metaPropsSort = (meta) => {
    setIsMeta(meta)
  }

  return (
    <>
      <Filter
        meta={isMeta}
        dataProps={dataProps}
        dataPropsSort={dataPropsSort}
        metaProps={metaProps}
        metaPropsSort={metaPropsSort}
        setIsProducts={setIsProducts}
      />
      {loading ? (
        <Loading />
      ) : (
        <ProductsContainer
          products={isProducts}
          errors={errors}
          meta={isMeta}
          selectedPrice={selectedPrice}
        />
      )}
      <PaginationContainer
        pagination={isPagination}
        paginPageProps={paginPageFilterSort ? dataPropsSort : paginPageProps}
        paginPageMetaProps={paginPageMetaProps}
      />
    </>
  )
}

export default Products
