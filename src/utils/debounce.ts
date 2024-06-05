export default function debounce(
  func: (...args: any[]) => void,
  wait: number,
  immediate = false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  callback: (a?: any, b?: any) => void = () => {}
) {
  let timer: any
  //是否第一次调用过了
  let immediateInvoked = false
  const debounced = function (this: any, ...args: any[]) {
    return new Promise((resolve, reject) => {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      if (immediate && !immediateInvoked) {
        try {
          const result = func.apply(this, args)
          callback(null, result)
          resolve(result)
        } catch (error) {
          callback(error)
          reject(error)
        }
        immediateInvoked = true
      }
      timer = setTimeout(() => {
        try {
          const result = func.apply(this, args)
          callback(null, result)
          resolve(result)
        } catch (error) {
          callback(error)
          reject(error)
        }
        immediateInvoked = false
      }, wait)
    })
  }
  debounced.cancel = function () {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }
  return debounced
}
