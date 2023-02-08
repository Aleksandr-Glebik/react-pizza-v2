import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { RootState } from '../store';
export type PizzaSliceItemsType = {
    id: string
    imageUrl: string
    name: string
    types: number[]
    sizes: number[]
    price: number
    category: number
    rating: number
    count: number
}

export type FetchPizzaArgsType = {
    currentPage: number
    category: string
    sortBy: string
    order: string
    search: string
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface PizzaSliceState {
    items: PizzaSliceItemsType[]
    status: Status
}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING
}

export const fetchPizzasAT = createAsyncThunk<PizzaSliceItemsType[], FetchPizzaArgsType>(
    'pizzas/fetchPizzasStatus',
    async (params) => {
        const { currentPage, category, sortBy, order, search } = params
        const {data} = await axios.get<PizzaSliceItemsType[]>(`https://63d776045c4274b136f4ac47.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        return data
    }
)

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, actions: PayloadAction<PizzaSliceItemsType[]>) {
        state.items = actions.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzasAT.pending, (state) => {
        state.status = Status.LOADING
        state.items = []
    })
    builder.addCase(fetchPizzasAT.fulfilled, (state, actions: PayloadAction<PizzaSliceItemsType[]>) => {
        state.items = actions.payload
        state.status = Status.SUCCESS
    })
    builder.addCase(fetchPizzasAT.rejected, (state) => {
        state.status = Status.ERROR
        state.items = []
    })
  }
})

export const selectPizzas = (state: RootState) => state.pizzas

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer