import axiosClient from '@/services/axiosConfig'

const prefixAPI = '/input-testing/questions'

const inputTestingService = {
  async createQuestion(payload: any): Promise<any> {
    try {
      const { data } = await axiosClient.post(prefixAPI, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log('tét', data)

      return data
    } catch (error) {
      throw error
    }
  },
}

export default inputTestingService
