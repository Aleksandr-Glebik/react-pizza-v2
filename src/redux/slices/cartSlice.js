import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  totalCountPizzas: 0,
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, actions) {
        const findItem = state.items.find(item => item.id === actions.payload.id)

        if (findItem) {
            findItem.count++
        } else {
            state.items.push({
                ...actions.payload,
                count: 1
            })
        }

        state.totalPrice = state.items.reduce((sum, obj) => {
            return (obj.price * obj.count) + sum
        }, 0)
        state.totalCountPizzas = state.items.reduce((sum, obj) => {
            return obj.count + sum
        }, 0)
    },
    removeItem(state, actions) {
        state.items = state.items.filter(obj => obj.id !== actions.payload)
        state.totalPrice = state.items.reduce((sum, obj) => {
            return (obj.price * obj.count) + sum
        }, 0)
        state.totalCountPizzas = state.items.reduce((sum, obj) => {
            return obj.count + sum
        }, 0)
    },
    clearItems(state) {
        state.items = []
        state.totalPrice = 0
        state.totalCountPizzas = 0
    }
  },
})

export const { addItem, removeItem, clearItems } = cartSlice.actions

export default cartSlice.reducer