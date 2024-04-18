import { useEffect } from 'react'
import { useContextProvider } from '../../contextProvider/ProductsContext'

const url = '/products'
const PaginationContainer = ({
  pagination,
  paginPageProps,
  paginPageMetaProps,
  propPages,
}) => {
  const { pageCount } = pagination

  const {
    customeFetchData,
    paginPage,
    setPaginPage,
    paginPageFilter,
    setPaginPageFilter,
    paginPageFilterSplit,
    paginPageFilterSort,
  } = useContextProvider()

  const { doRequest: doPagination } = customeFetchData({
    url,
    method: 'get',
    params: { page: paginPage },
    body: {},
  })
  const getData = async () => {
    const { data, meta } = await doPagination()
    paginPageProps(data)
    paginPageMetaProps(meta)
  }

  useEffect(() => {
    getData()
  }, [paginPage])

  const pages = Array.from({ length: pageCount }, (_, idx) => {
    return idx + 1
  })

  useEffect(() => {
    if (pages.length === 2) {
      if (paginPageFilter === 3) {
        setPaginPageFilter(pages.length - 1)
      }
    }
  }, [paginPageFilter])

  const handlePrevPage = () => {
    if (!paginPageFilterSplit) {
      setPaginPage((prev) => ((prev + 1) % pages.length) + 1)

      if (paginPageFilterSort) {
        setPaginPageFilter((prev) => ((prev + 1) % pages.length) + 1)
      }
    }
    if (paginPageFilterSplit || paginPageFilterSort) {
      setPaginPageFilter((prev) => ((prev + 1) % pages.length) + 1)
    }
    if (pages.length < 3) {
      if (paginPageFilterSort || paginPageFilterSplit) {
        setPaginPageFilter((prev) => (prev % pages.length) + 1)
      }
      if (paginPageFilterSplit || paginPageFilterSort) {
        setPaginPageFilter((prev) => ((prev + 1) % pages.length) + 1)
      }
    }
  }

  const handleNextPage = () => {
    if (!paginPageFilterSplit) {
      setPaginPage((prev) => ((prev + pages.length) % pages.length) + 1)

      if (paginPageFilterSort) {
        setPaginPageFilter((prev) => ((prev + pages.length) % pages.length) + 1)
      }
    }
    if (paginPageFilterSplit) {
      setPaginPageFilter((prev) => ((prev + pages.length) % pages.length) + 1)
    }
  }

  const setPanding = (item) => {
    if (!paginPageFilterSplit) {
      setPaginPage(item)
      if (paginPageFilterSort) {
        setPaginPageFilter(item)
      }
    }
    if (paginPageFilterSplit) {
      setPaginPageFilter(item)
    }
  }

  return (
    <div className='mt-16 flex justify-end'>
      <div className='join'>
        <button
          className='btn btn-xs sm:btn-md join-item'
          onClick={() => handlePrevPage()}
        >
          Prev
        </button>
        <div>
          {pages?.map((item) => {
            return (
              <button
                key={item}
                onClick={() => setPanding(item)}
                className={`btn btn-xs sm:btn-md border-none join-item ${
                  !paginPageFilterSplit
                    ? item === paginPage
                      ? 'bg-base-300 border-base-800'
                      : ''
                    : item === paginPageFilter
                    ? 'bg-base-300 border-base-800'
                    : ''
                }`}
              >
                {item}
              </button>
            )
          })}
        </div>
        <button
          className='btn btn-xs sm:btn-md join-item'
          onClick={() => handleNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default PaginationContainer
