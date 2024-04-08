const SchemaProduct = require('../moduleDB/moduleProducts')

const getProductsData = async (req, res) => {
  const { featured, search, company, category, order, price, shipping, page } =
    req.query

  function split(array, n) {
    let [...arr] = array
    var res = []
    while (arr.length) {
      res.push(arr.splice(0, n))
    }
    return res
  }

  const limit = Number(req.query.limit) || 9
  Number(page) || 1

  let result = await SchemaProduct.find({})
  result = Object.assign({}, result)[0]

  // let returnAll = { meta: result.meta, data: result.data }

  if (featured) {
    result.data = result?.data?.filter((item) => item.attributes.featured)
  }

  if (shipping && shipping !== 'false') {
    result.data = result?.data?.filter((item) => item.attributes.shipping)
  }

  if (search) {
    result.data = result.data.filter((item) => {
      const regex = new RegExp(search, 'i')
      return item.attributes.title.match(regex)
    })
  }

  if (category && category !== 'all') {
    result.data = result.data.filter((item) => {
      return item.attributes.category == category
    })
  }

  if (company && company !== 'all') {
    result.data = result.data.filter(
      (item) => item.attributes.company == company
    )
  }
  const min = Math.min(...result.data.map((item) => item.attributes.price))
  const max = Math.max(...result.data.map((item) => item.attributes.price))

  if (price && price < max) {
    result.data = result.data.filter((item) => {
      if (price < min || (price > 7000 && price < 10000)) return
      return item.attributes.price <= price
    })

    // console.log(result.data)
    // if (priceData.length > 9) {
    //   split(priceData, limit)[page - 1]
    //   console.log(priceData)
    //   result.data = priceData
    // }
  }

  const sortBy = (str) => {
    return (a, b) => (a[str] - b[str] ? 1 : -1)
  }

  if (order === 'z-a') {
    result.data = result.data.sort(sortBy('title'))
  }
  // const sortByPrice = (str) => {
  //   return (a, b) => b[str] - a[str]
  // }

  // const usersDubl2 = [...result.data]
  // console.log(usersDubl2.sort(sortByPrice('attributes.price')))

  // console.log(usersDubl2)
  // if (order === 'high') {
  //   result.data = usersDubl2.sort(sortByPrice('attributes.price'))
  // }

  // const sortOrder = 'desc'
  // dataObjects.sort((a, b) => {
  //   const valueA = getCostValue(a)
  //   const valueB = getCostValue(b)

  //   const reverseOrder = sortOrder === 'asc' ? 1 : -1

  //   if (typeof valueA === 'string')
  //     return valueA.localeCompare(valueB) * reverseOrder

  //   //return valueA - valueB  // ^ up
  //   // return (valueA - valueB) * -1 //down

  //   return (valueA - valueB) * reverseOrder
  // })

  // function getCostValue(value) {
  //   return value.attributes.price
  // }

  // if (order) {
  //   result.data = result.data.sort((a, b) => {
  //     const valueA = getCostValue(a)
  //     const valueB = getCostValue(b)

  //     const reverseOrder = order === 'low' ? 1 : -1

  //     if (typeof valueA === 'string')
  //       return valueA.localeCompare(valueB) * reverseOrder

  //     return (valueA - valueB) * reverseOrder
  //   })
  // }

  if (page) {
    result.data = split(result.data, limit)[page - 1]
    result.meta.pagination.page = page
  }
  result.meta.pagination.total = result.meta.pagination.total =
    result.data.length
  // result.meta.pagination.total = result.meta.pagination.total = 22

  res.status(200).json(result)
}

const getSingleProductsData = async (req, res) => {
  const { id: productId } = req.params

  let result = await SchemaProduct.find({})
  result = Object.assign({}, result)[0]
  result.data = result?.data?.filter((item) => {
    if (item.id === +productId) {
      return item
    }
  })

  res.status(200).json(result)
}

module.exports = { getProductsData, getSingleProductsData }
