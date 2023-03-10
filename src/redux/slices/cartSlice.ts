import { getCartItemsFromLS } from './../../utils/getCartItemsFromLS';
import { countTotalPrice } from './../../utils/countTotalPrice';
import { countTotalPizzas } from './../../utils/countTotalPizzas';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

export type CartSliceItemType = {
    id: string
    name: string
    imageUrl: string
    type: string
    size: string
    price: number
    count: number
}

interface CartSliceState {
    totalPrice: number
    totalCountPizzas: number
    items: CartSliceItemType[]
}

const cartData = getCartItemsFromLS()

const initialState: CartSliceState = {
  totalPrice: countTotalPrice(cartData),
  totalCountPizzas: countTotalPizzas(cartData),
  items: cartData
}


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, actions: PayloadAction<CartSliceItemType>) {
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
    removeItem(state, actions: PayloadAction<string>) {
        state.items = state.items.filter(obj => obj.id !== actions.payload)
        state.totalPrice = countTotalPrice(state.items)
        state.totalCountPizzas = countTotalPizzas(state.items)
    },
    clearItems(state) {
        state.items = []
        state.totalPrice = 0
        state.totalCountPizzas = 0
    },
    plusItem(state, actions: PayloadAction<string>) {
        const addedItem = state.items.find(item => item.id === actions.payload)
        if (addedItem) {
        addedItem.count++
        }
        state.totalPrice = countTotalPrice(state.items)
        state.totalCountPizzas = countTotalPizzas(state.items)
    },
    minusItem(state, actions: PayloadAction<string>) {
        const deletedItem = state.items.find(item => item.id === actions.payload)
        if (deletedItem) {
            if (deletedItem.count > 1) {
                deletedItem.count--
            }
        }
        state.totalPrice = countTotalPrice(state.items)
        state.totalCountPizzas = countTotalPizzas(state.items)
    }
  },
})

export const selectCart = (state: RootState) => state.cart
export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find(obj => obj.id === id)

export const { addItem, removeItem, clearItems, plusItem, minusItem } = cartSlice.actions

export default cartSlice.reducer

