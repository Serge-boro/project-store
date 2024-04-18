import { useSelector } from 'react-redux'
import axios from '../axios/axios'

const useRefreshToken = () => {
  let user = useSelector((state) => state?.userState)
  const refresh = async () => {
    const response = await axios.get('/refresh', {
      withCredentials: true,
    })
    // setAuth((prev) => {
    //   console.log(prev)
    //   console.log(response.data.accessToken)
    //   return { ...prev, accessToken: response.data.accessToken }
    // })
    user = { ...user, accessToken: response.data.accessToken }
    return response?.data?.accessToken
  }
  return refresh
}

export default useRefreshToken
