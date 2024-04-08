import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import axios from '../../axios/axios'

const LOGIN_URL = '/login'

const themes = {
  winter: 'winter',
  dracula: 'dracula',
}

const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem('theme') || themes.dracula
  document.documentElement.setAttribute('data-theme', theme)
  return theme
}

export const addGuestUser = createAsyncThunk(
  'user/addGuestUser',
  async (initialPost) => {
    try {
      const { data } = await axios.post(LOGIN_URL, initialPost, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: false,
      })
      return data
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
    }
  }
)

export const addNewUser = createAsyncThunk(
  'user/addNewUser',
  async (initialPost) => {
    try {
      const { data } = await axios.post(LOGIN_URL, initialPost, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: false,
      })
      return data
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
    }
  }
)

const initialState = {
  user: {},
  theme: getThemeFromLocalStorage(),
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // loginUser: (state, action) => {
    //   console.log('login')
    // },
    logoutUser: (state) => {
      state.user = {}
      // localStorage.removeItem('user')
      toast.success('Logged out successfully')
    },
    toggleTheme: (state) => {
      const { winter, dracula } = themes
      state.theme = state.theme === dracula ? winter : dracula
      document.documentElement.setAttribute('data-theme', state.theme)
      localStorage.setItem('theme', state.theme)
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(addGuestUser.fulfilled, (state, action) => {
        state.user = action.payload
      })
  },
})

export const { logoutUser, toggleTheme } = userSlice.actions

export default userSlice.reducer
