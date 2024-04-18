import { useRef, useState, useEffect } from 'react'
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from '../axios/axios'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import { toast } from 'react-toastify'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const REGISTER_URL = '/register'

import SubmitBtnRegister from '../components/SubmitBtn'
import { useContextProvider } from '../contextProvider/ProductsContext'

const Registers = () => {
  const { spinnerButton, setSpinnerButton } = useContextProvider()
  const navigate = useNavigate()
  const location = useLocation()
  const userRef = useRef()

  const [user, setUser] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setValidName(USER_REGEX.test(user))
    setSpinnerButton(false)
  }, [user])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd))
    setValidMatch(pwd === matchPwd)
    setSpinnerButton(false)
  }, [pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        REGISTER_URL,
        { user, pwd },
        {
          // headers: { 'Content-Type': 'application/json' },
          // withCredentials: false,
        }
      )
      if (response.data) {
        setUser('')
        setPwd('')
        setMatchPwd('')
        toast.success('Registration success')
        redirect()
      }

      // console.log(spinnerButton)
      // console.log(response.data)
      // console.log(response.accessToken)
      // console.log(JSON.stringify(response))
    } catch (err) {
      console.log(err)
      if (!err?.response) {
        toast.error('No server Response')
      } else if (err.response?.status === 409) {
        toast.error('UserName Taken')
      } else {
        toast.error(err.response.data.message)
        setSpinnerButton(true)
      }
    }
  }

  const redirect = () => {
    const timeOut = setTimeout(() => {
      navigate('/login', { state: { from: location }, replace: true })
    }, 4000)

    return () => clearTimeout(timeOut)
  }

  const canSave = [user, pwd, validMatch].every(Boolean)

  return (
    <>
      <section className='h-screen grid place-items-center'>
        <form
          onSubmit={handleSubmit}
          className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4 mt-32'
        >
          <h4 className='text-center text-3xl fond-bold'>Registration</h4>
          <label htmlFor='username'>
            UserName:
            <span className={validName ? 'valid' : 'hide'}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validName || !user ? 'hide' : 'invalid'}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            className='input input-bordered'
            type='text'
            id='username'
            ref={userRef}
            autoComplete='off'
            onChange={(e) => setUser(e.target.value)}
            required
            aria-invalid={validName ? 'false' : 'true'}
            aria-describedby='uidnote'
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />

          <p
            id='uidnote'
            className={
              userFocus && user && !validName ? 'instructions' : 'offscreen'
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24 characters. <br />
            Must being with a letter.
            <br />
            Letters,numbers,underscores, hyphens allowed.
          </p>

          <label htmlFor='password'>
            Password:
            <span className={validPwd ? 'valid' : 'hide'}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            className='input input-bordered'
            type='password'
            id='password'
            onChange={(e) => setPwd(e.target.value)}
            required
            aria-invalid={validPwd ? 'false' : 'true'}
            aria-describedby='pwdnote'
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p
            id='pwdnote'
            className={
              pwdFocus && pwd && !validPwd ? 'instructions' : 'offscreen'
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters. <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters:
            <span aria-label='exclamation mark'>!</span>
            <span aria-label='at symbol'>@</span>
            <span aria-label='hashtag'>#</span>
            <span aria-label='dollar sign'>$</span>
            <span aria-label='percent'>%</span>
          </p>

          <label htmlFor='confirm_password'>
            Password:
            <span className={validMatch && matchPwd ? 'valid' : 'hide'}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validMatch || !matchPwd ? 'hide' : 'invalid'}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            className='input input-bordered'
            type='password'
            id='confirm_password'
            onChange={(e) => setMatchPwd(e.target.value)}
            required
            aria-invalid={validMatch ? 'false' : 'true'}
            aria-describedby='confirmnote'
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <p
            id='confirmnote'
            className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password input field.
          </p>
          <SubmitBtnRegister
            text='register'
            canSave={canSave}
            spinnerButton={spinnerButton}
          />
        </form>
        <p className='text-center mb-48'>
          Already a member?
          <Link to='/login' className='ml-2 link link-primary capitalize'>
            login
          </Link>
        </p>
      </section>
    </>
  )
}

export default Registers
