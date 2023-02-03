import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchValue: '',
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
    },
    setSearchValue(state, actions) {
      state.searchValue = actions.payload
    }
  },
})

export const selectFilters = (state) => state.filters

export const { setCategoryInd, setSortType, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer