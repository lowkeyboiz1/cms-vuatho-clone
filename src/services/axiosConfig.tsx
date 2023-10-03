// import { CommonToast } from '@/components/common'
// import { localStorageKey } from '@/constants'
// import { useTranslation } from '@/context/TranslationProvider'
// import { notification } from 'antd'
import axios, { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'

const apiConfig = {
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
}

const instance = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    Accept: 'application/json',
  },
  timeout: 30000, // 30 seconds
})

const urlExceptAuthorization = ['Authenticate']

const authorization = async () => {
  // const token = localStorage.getItem('access_token')
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJodXluZ3V5ZW5AZ21haWwuY29tIiwicGVybWlzc2lvbnMiOm51bGwsImZ1bGxfbmFtZSI6bnVsbCwicGhvbmUiOm51bGwsImlzX2FjdGl2ZSI6MSwiaWF0IjoxNjk1MzU4ODc5fQ.08D9M1nol6HVypQOS4BT1NujyZKZNxODbaWPtCI-sNk'
  if (token) {
    return { Authorization: 'Bearer ' + token }
  } else {
    return {}
  }
}

const getUrl = (config: any) => {
  if (config?.baseURL) {
    return config?.url.replace(config?.baseURL, '')
  }
  return config?.url
}

// Intercept all request
instance.interceptors.request.use(
  async (config: any) => {
    const url = getUrl(config)

    if (!urlExceptAuthorization.includes(url)) {
      const authHeader = await authorization()

      config.headers = {
        ...config.headers,
        ...authHeader,
      } as any
    }
    if (process.env.NODE_ENV !== 'production') {
      console.log(
        `%c Request: ${config?.method?.toUpperCase()} - ${getUrl(config)}:`,
        'color: #0086b3; font-weight: bold',
        config,
      )
    }
    return config
  },
  error => Promise.reject(error),
)

// Intercept all responses
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(
        `%c Response: ${response?.status} - ${getUrl(response?.config)}:`,
        'color: #008000; font-weight: bold',
        response,
      )
    }

    return response.data
  },
  error => {
    if (process.env.NODE_ENV !== 'production') {
      if (error?.response) {
        console.log('====== Server Error =====')
      } else if (error?.request) {
        console.log('====== Timeout =====')
      } else {
        console.log('====== Internal Server Error! =====')
      }
    }

    return Promise.reject(error)
  },
)

export default instance
