import { IUserInfo } from '@/types/auth'
import { createSlice } from '@reduxjs/toolkit'

// Type for our state
export interface AuthState {
  userInfo: IUserInfo
}

// Initial state
const initialState: AuthState = {
  userInfo: {
    isAuth: false,
    isLoading: true,
    email: '',
    full_name: ""
  },
}

// Actual Slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogout: () => initialState,
    updateUserInfo(state, action) {
      state.userInfo = {
        ...state.userInfo,
        ...action.payload,
      }
    },
  },
})

// Reducer
const authSliceReducer = authSlice.reducer
// const { actions, reducer } = authSlice;
export const authAction = authSlice.actions

export default authSliceReducer
