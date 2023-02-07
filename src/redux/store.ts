import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import filterReducer from './slices/filterSlice'
import cartSlice from './slices/cartSlice'
import pizzasSlice from './slices/pizzasSlice'

const store = configureStore({
  reducer: {
    filters: filterReducer,
    cart: cartSlice,
    pizzas: pizzasSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store