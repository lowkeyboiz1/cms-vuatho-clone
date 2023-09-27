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
