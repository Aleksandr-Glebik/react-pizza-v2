import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    items: [],
    status: ''
}

export const fetchPizzasAT = createAsyncThunk(
    'pizzas/fetchPizzasStatus',
    async (params) => {
        const { currentPage, category, sortByType, order, search} = params
        const resp = await axios.get(`https://63d776045c4274b136f4ac47.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortByType}&order=${order}${search}`)
        return resp.data
    }
)

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, actions) {
        state.items = actions.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzasAT.pending, (state) => {
        state.status = 'loading'
        state.items = []
    })
    builder.addCase(fetchPizzasAT.fulfilled, (state, actions) => {
        state.items = actions.payload
        state.status = 'success'
    })
    builder.addCase(fetchPizzasAT.rejected, (state) => {
        state.status = 'error'
        state.items = []
    })
  }
})

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer