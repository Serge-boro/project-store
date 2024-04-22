import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import axios from '../../axios/axios'
import { axiosPrivate } from '../../axios/axios'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const CART_URL = '/order'
const CART_REMOTE_URL = '/removeItemCart'
const CART_UPDATE_URL = '/updateItemCart'
const CART_DELETE_ALL = '/deleteCartAll'

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
}

export const addItemCart = createAsyncThunk(
  'user/addCart',
  async (initialPost) => {
    try {
      const { data } = await axiosPrivate.post(CART_URL, initialPost, {
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        withCredentials: true,
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

export const removeItemCart = createAsyncThunk(
  'user/removeCart',
  async (initialPost) => {
    try {
      const { data } = await axiosPrivate.post(CART_REMOTE_URL, initialPost, {
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        withCredentials: true,
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

export const updateItemCart = createAsyncThunk(
  'user/updateCart',
  async (initialPost) => {
    try {
      const { data } = await axiosPrivate.patch(CART_UPDATE_URL, initialPost, {
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        withCredentials: true,
      })
      console.log(data)
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

export const deleteCartItems = createAsyncThunk('user/deleteCart', async () => {
  try {
    const { data } = await axiosPrivate.delete(CART_DELETE_ALL, {
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      withCredentials: true,
    })
    console.log(data)
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
})

export const renderItemCart = createAsyncThunk('user/renderCart', async () => {
  try {
    const { data } = await axiosPrivate.get(CART_URL, {
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      withCredentials: true,
    })
    console.log(data)
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
})

const cartSlice = createSlice({
  name: 'cart',
  initialState: defaultState,
  reducers: {
    cartRender: (state, action) => {
      // console.log(state.cartItems)
      // state.numItemsInCart = state.cartItems.reduce(
      //   (previosValue, cartItem) => {
      //     return previosValue + cartItem.amount
      //   },
      //   0
      // )

      console.log(state.numItemsInCart)
    },
    clearCart: () => {
      return defaultState
    },
    removeCartItem: (state, action) => {
      const { cartID } = action.payload
      console.log(state.cartItems)
      const product = state.cartItems.find((item) => item.cartID === cartID)
      state.cartItems = state.cartItems.filter((item) => item.cartID !== cartID)
      state.numItemsInCart -= product.amount
      state.cartTotal -= product.price * product.amount
      state.tax = 0.1 * state.cartTotal
      state.orderTotal = state.cartTotal + state.shipping + state.tax
      toast.error('Item removed from cart')
    },
    editCartItem: (state, action) => {
      const { cartID, amount } = action.payload
      const item = state.cartItems.find((item) => item.cartID === cartID)
      state.numItemsInCart += amount - item.amount

      state.cartTotal += item.price * (amount - item.amount)
      item.amount = amount
      state.tax = 0.1 * state.cartTotal
      state.orderTotal = state.cartTotal + state.shipping + state.tax
      toast.success('Cart updated')
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addItemCart.fulfilled, (state, action) => {
        state.numItemsInCart += action.payload.cartProduct.amount
        toast.success('Item added to cart')
      })
      .addCase(renderItemCart.fulfilled, (state, action) => {
        state.cartItems = action.payload
        state.numItemsInCart = action.payload.reduce(
          (previosValue, cartItem) => {
            return previosValue + cartItem.amount
          },
          0
        )
        state.cartTotal = action.payload.reduce((previosValue, cartItem) => {
          return previosValue + cartItem.price * cartItem.amount
        }, 0)
        state.tax = 0.1 * state.cartTotal
        state.orderTotal = state.cartTotal + state.shipping + state.tax
      })
  },
})

export const { clearCart, editCartItem, removeCartItem, cartRender } =
  cartSlice.actions

export default cartSlice.reducer
