import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice'
import cartSlice from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    cart: cartSlice
  }
})
