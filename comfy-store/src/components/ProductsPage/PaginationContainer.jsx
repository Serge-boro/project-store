import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useContextProvider } from '../../contextProvider/ProductsContext'

const url = '/products'
const PaginationContainer = ({
  pagination,
  paginPageProps,
  paginPageMetaProps,
  pagesProps,
  disablesButton,
}) => {
  const { pageCount } = pagination

  const [page, setPage] = useState(0)
  const [paginPage, setPaginPage] = useState(1)
  const [isIndex, setIsIndex] = useState(1)
  const { customeFetchData, cleanUpInputs } = useContextProvider()

  const { doRequest: doPagination } = customeFetchData({
    url,
    method: 'get',
    params: { page: paginPage },
    body: {},
  })
  const getData = async () => {
    const { data, meta } = await doPagination()
    setPage(meta?.pagination?.page)
    paginPageProps(data)
    paginPageMetaProps(meta)
  }

  useEffect(() => {
    getData()
  }, [paginPage])

  //pages
  const pages = Array.from({ length: pageCount }, (_, idx) => {
    return idx + 1
  })

  const newPages = pagesProps(pages)

  // const handleNextPage = () => {
  //   setPaginPage(prev => (prev + 1) % pages.length)}
  // }

  const handlePrevPage = () => {
    setPaginPage((prev) => ((prev + 1) % pages.length) + 1)
  }

  const handleNextPage = () => {
    setPaginPage((prev) => ((prev + pages.length) % pages.length) + 1)
  }

  // if (pageCount < 2) return null

  return (
    <div className='mt-16 flex justify-end'>
      <div className='join'>
        <button
          disabled={disablesButton}
          className='btn btn-xs sm:btn-md join-item'
          onClick={() => handlePrevPage()}
        >
          Prev
        </button>
        <div>
          {newPages?.map((item) => {
            return (
              <button
                disabled={disablesButton}
                key={item}
                onClick={() => {
                  setPaginPage(item), cleanUpInputs()
                }}
                className={`btn btn-xs sm:btn-md border-none join-item ${
                  item === page ? 'bg-base-300 border-base-800' : ''
                }`}
              >
                {item}
              </button>
            )
          })}
        </div>
        <button
          disabled={disablesButton}
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
