import { useState } from 'react'
import axios from 'axios'
const Registers = () => {
  const [isRegister, setIsRegister] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios.post('http://localhost:4002/store/register', {
      email: isRegister.email,
      password: isRegister.password,
    })

    setIsRegister({
      email: '',
      password: '',
    })
  }

  const handleChange = (e) => {
    setIsRegister({ ...isRegister, [e.target.name]: e.target.value })
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='email'
        value={isRegister.email}
        onChange={handleChange}
        style={{ background: 'red' }}
      />
      <input
        type='password'
        name='password'
        value={isRegister.password}
        onChange={handleChange}
        style={{ background: 'blue' }}
      />
      <button>submit</button>
    </form>
  )
}

export default Registers
