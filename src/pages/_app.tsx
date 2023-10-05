import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'

import { ThemeProvider } from '@/providers'
import { wrapper } from '@/store'

import '@/styles/globals.scss'

import NextNProgress from 'nextjs-progressbar'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <ThemeProvider>
      {getLayout(
        <>
          <NextNProgress
            color="#29D"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
          />
          <Component {...pageProps} />
        </>,
      )}
    </ThemeProvider>
  )
}
export default wrapper.withRedux(App)
