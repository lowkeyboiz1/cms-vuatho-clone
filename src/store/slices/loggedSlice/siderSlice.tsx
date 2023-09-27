import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Type for our state
export interface SiderState {
  hiddenSider: boolean
}

// Initial state
const initialState: SiderState = {
    hiddenSider: false
}

// Actual Slice
export const SiderSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSider: () => initialState,
    updateSider: (state, action: PayloadAction<boolean>) => {
        state.hiddenSider = action.payload;
    },
  },
})

// Reducer
const SiderSliceReducer = SiderSlice.reducer

export const siderAction = SiderSlice.actions

export default SiderSliceReducer
