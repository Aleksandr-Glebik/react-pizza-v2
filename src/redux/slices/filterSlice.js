import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryInd: 0,
  sort: {
    name: 'популярности (desc)',
    sortTypeProps: 'rating'
  }
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryInd(state, actions) {
        state.categoryInd = actions.payload
    },
    setSortType(state, actions) {
        state.sort = actions.payload
    }
  },
})

export const { setCategoryInd, setSortType } = filterSlice.actions

export default filterSlice.reducer