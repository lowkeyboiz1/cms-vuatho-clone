export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const CalculatorTime = (time: any) => {
  let minute = Math.floor(time / 60)
  let second = time % 60

  console.log(
    `${Math.floor(minute)}:${second.toString().padStart(2, '0')} Phút`,
  )
}

export function objectToFormData(obj: any) {
  const formData = new FormData()

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]
      const valueIsFile = value instanceof File

      const isArrayData = Array.isArray(value)
      const initialValue = typeof value === 'number' ? Number(value) : ''

      if (isArrayData) {
        const isFile = value.some(item => item instanceof File)
        if (isFile) {
          Array.prototype.forEach.call(value, item => {
            formData.append(key, item)
          })
        } else {
          formData.append(key, value ? JSON.stringify(value) : '')
        }
      } else {
        if (typeof value === 'object' && !isArrayData && !valueIsFile) {
          formData.append(key, JSON.stringify(value))
        } else {
          formData.append(key, value || initialValue)
        }
      }
    }
  }

  return formData
}

export const convertTypeQuestion = (data: any) => {
  const formatData = data.map((item: any) => {
    if (item.type === 0) {
      return {
        ...item,
        type: 'Quy tắc ứng xử',
      }
    } else {
      return {
        ...item,
        type: 'Nghiệp vụ',
      }
    }
  })
  return formatData
}
