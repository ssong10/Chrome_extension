export const timeFormat = (time) => {
  const h = time.getHours()
  const m = time.getMinutes()
  const s = time.getSeconds()
  return {
    hours : h < 10 ? '0' + h : h,
    minutes : m < 10 ? '0' + m : m,
    seconds : s < 10 ? '0' + s : s, 
  }
}

export const setStorage = (key, value) => {
  window.localStorage.setItem(key,JSON.stringify(value))
}

export const getStorage = (key) => {
  return JSON.parse(window.localStorage.getItem(key))
}
