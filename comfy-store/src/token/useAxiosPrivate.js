import { axiosPrivate } from '../axios/axios'
import { useEffect } from 'react'
import useRefreshToken from './useRefreshToken'
import { useSelector } from 'react-redux'

const useAxiosPrivate = () => {
  const refresh = useRefreshToken()

  const user = useSelector((state) => state.userState)

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${user?.accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log(error)
        const prevRequest = error?.config
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true
          const newAccessToken = await refresh()
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return axiosPrivate(prevRequest)
        }
        if (error.code === 'ERR_CANCELED') {
          return Promise.resolve({ status: 499 })
        }
        return Promise.reject(
          (error.response && error.response.data) || 'Error'
        )
      }
    )

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [user, refresh])

  return axiosPrivate
}

export default useAxiosPrivate
