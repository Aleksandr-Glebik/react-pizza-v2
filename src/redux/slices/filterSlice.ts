import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../store'
import { SortPropertyEnum } from '../../components/Sort'

export type FilterSliceSortType = {
  name: string
  sortTypeProps: SortPropertyEnum
}

export interface FilterSliceState {
  searchValue: string
  categoryInd: number
  currentPage: number
  sort: FilterSliceSortType
}

const initialState: FilterSliceState = {
  searchValue: '',
  categoryInd: 0,
  currentPage: 1,
  sort: {
    name: 'популярности (desc)',
    sortTypeProps: SortPropertyEnum.RATING_DESC
  }
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryInd(state, actions: PayloadAction<number>) {
        state.categoryInd = actions.payload
    },
    setSortType(state, actions: PayloadAction<FilterSliceSortType>) {
        state.sort = actions.payload
    },
    setCurrentPage(state, actions: PayloadAction<number>) {
      state.currentPage = actions.payload
    },
    setFilters(state, actions: PayloadAction<FilterSliceState>) {
      state.categoryInd = Number(actions.payload.categoryInd)
      state.currentPage = Number(actions.payload.currentPage)
      state.sort = actions.payload.sort
    },
    setSearchValue(state, actions: PayloadAction<string>) {
      state.searchValue = actions.payload
    }
  },
})

export const selectFilters = (state: RootState) => state.filters

export const { setCategoryInd, setSortType, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer