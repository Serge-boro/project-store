import { useRef, useState, useEffect } from 'react'
import axios from '../axios/axios'
import { useLocation, useNavigate, Link } from 'react-router-dom'

import { toast } from 'react-toastify'

const LOGIN_URL = '/store/login'

const Login = () => {
  const navigate = useNavigate()

  const userRef = useRef()

  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')

  useEffect(() => {
    userRef.current.focus()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        LOGIN_URL,
        { user, pwd },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: false,
        }
      )

      if (response.data) {
        setUser('')
        setPwd('')
        toast.success('Login success')
        redirect()
      }
      // const accessToken = response?.data?.accessToken
      // const role = response?.data?.role

      // console.log(JSON.stringify(response?.data))
      // console.log(accessToken)
      // console.log(role)

      // setAuth({ user, pwd, role, accessToken })

      // setSuccess(true)
      // navigate(from, { replace: true })
    } catch (err) {
      console.log(err.response)
      if (!err?.response) {
        toast('No server Response')
      } else if (err.response?.status === 400) {
        toast(err.response.data.message)
      } else if (err.response?.status === 401) {
        toast(err.response.data.message)
      } else {
        toast('Login failed')
      }
      // errRef.current.focus()
    }
  }

  const redirect = () => {
    const timeOut = setTimeout(() => {
      navigate('/')
    }, 3000)
    return () => clearTimeout(timeOut)
  }

  return (
    <section className='h-screen grid place-items-center'>
      <form
        className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4 mt-32'
        onSubmit={handleSubmit}
      >
        <h4 className='text-center text-3xl fond-bold'>Login</h4>
        <label htmlFor='username'>UserName:</label>
        <input
          type='text'
          id='username'
          ref={userRef}
          autoComplete='off'
          onChange={(e) => setUser(e.target.value)}
          value={user}
          className='input input-bordered'
        />

        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          className='input input-bordered'
        />
        <button className='btn btn-primary btn-block'>login</button>
      </form>
      <button className='w-80 p-4 shadow-lg btn btn-primary btn-block mb-24'>
        guest user
      </button>
      <p className='text-center mb-48'>
        Not a member yet?
        <Link
          to='/register'
          className='ml-2 link link-hover link-primary capitalize'
        >
          register
        </Link>
      </p>
    </section>
  )
}

export default Login
