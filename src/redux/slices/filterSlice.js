import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryInd: 0,
  currentPage: 1,
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
    },
    setCurrentPage(state, actions) {
      state.currentPage = actions.payload
    },
    setFilters(state, actions) {
      state.categoryInd = Number(actions.payload.categoryInd)
      state.currentPage = Number(actions.payload.currentPage)
      state.sort = actions.payload.sort
    }
  },
})

export const { setCategoryInd, setSortType, setCurrentPage, setFilters } = filterSlice.actions

export default filterSlice.reducer