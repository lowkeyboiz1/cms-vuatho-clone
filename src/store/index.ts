import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import siderSlice from './slices/loggedSlice/siderSlice';
import breadcrumbSlice from './slices/loggedSlice/breadcrumbSlice'

import { createWrapper } from 'next-redux-wrapper'

const store = () =>
  configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: {
      auth: authSlice,
      sider: siderSlice,
      breadcrumb: breadcrumbSlice
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
// export type AppDispatch = typeof store.dispatch
export const wrapper = createWrapper<AppStore>(store)

// ***
