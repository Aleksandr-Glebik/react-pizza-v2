import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  totalCountPizzas: 0,
  items: []
}

const countTotalPrice = (items) => {
    return items.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum
    }, 0)
}

const countTotalPizzas = (items) => {
    return items.reduce((sum, obj) => {
        return obj.count + sum
    }, 0)
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
        state.totalPrice = countTotalPrice(state.items)
        state.totalCountPizzas = countTotalPizzas(state.items)
    },
    removeItem(state, actions) {
        state.items = state.items.filter(obj => obj.id !== actions.payload)
        state.totalPrice = countTotalPrice(state.items)
        state.totalCountPizzas = countTotalPizzas(state.items)
    },
    clearItems(state) {
        state.items = []
        state.totalPrice = 0
        state.totalCountPizzas = 0
    },
    plusItem(state, actions) {
        const addedItem = state.items.find(item => item.id === actions.payload)
        addedItem.count++
        state.totalPrice = countTotalPrice(state.items)
        state.totalCountPizzas = countTotalPizzas(state.items)
    },
    minusItem(state, actions) {
        const deletedItem = state.items.find(item => item.id === actions.payload)
        if (deletedItem.count > 1) {
            deletedItem.count--
        }
        state.totalPrice = countTotalPrice(state.items)
        state.totalCountPizzas = countTotalPizzas(state.items)
    }
  },
})

export const { addItem, removeItem, clearItems, plusItem, minusItem } = cartSlice.actions

export default cartSlice.reducer