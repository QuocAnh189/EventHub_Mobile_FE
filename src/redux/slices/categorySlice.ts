import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ICategory } from '../../interfaces/contents/category'

export const CategorySliceKey = 'category'

type InitialType = {
  categories: ICategory[]
}

const initialState = {
  categories: [],
} as InitialType

const categorySlice = createSlice({
  name: CategorySliceKey,
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload
    },
  },
})

export const { setCategories } = categorySlice.actions

const categoryReducer = categorySlice.reducer
export default categoryReducer
