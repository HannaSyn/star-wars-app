export const getConvertedDateTime = (dateString: string) => {
  const date = new Date(dateString)
  return `${getDecimal(date.getDay())}/${getDecimal(
    date.getMonth() + 1
  )}/${date.getFullYear()} ${getDecimal(date.getHours())}:${getDecimal(
    date.getMinutes()
  )}:${getDecimal(date.getSeconds())}.${getDecimal(date.getMilliseconds())}`
}

export const getDecimal = (number: number) => {
  return number >= 10 ? number : `0${number}`
}
