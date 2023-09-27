import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Type for our state
export interface BreadCrumbState {
  breadcrumbPage: string[]
}

// Initial state
const initialState: BreadCrumbState = {
    breadcrumbPage: ['Trang chủ']
}

// Actual Slice
export const BreadcrumbSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setBreadcrumb: () => initialState,
    updateBreadcrumb: (state, action: PayloadAction<string[]>) => {
        state.breadcrumbPage = action.payload;
    },
  },
})

// Reducer
const BreadcrumbSliceReducer = BreadcrumbSlice.reducer

export const breadcrumbAction = BreadcrumbSlice.actions

export default BreadcrumbSliceReducer