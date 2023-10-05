import axiosClient from '@/services/axiosConfig'

const prefixAPI = '/auth'

const authService = {
  async authLogin(payload: any): Promise<any> {
    try {
      const data = await axiosClient.post(prefixAPI, payload)
      return data
    } catch (error) {
      throw error
    }
  },
  async authGetMe(): Promise<any> {
    console.log(axiosClient)

    try {
      const data = await axiosClient.get(`${prefixAPI}/get-me`)
      return data
    } catch (error) {
      throw error
    }
  },
}

export default authService
