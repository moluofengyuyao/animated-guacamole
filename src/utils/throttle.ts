/**
 *
 * @param {*} func
 * @param {*} wait
 * @param {*} options
 *   leading 是否要执行第一次，第一次触发的事情的时候必须执行回调
 *   trailing 是否要执行最后一次
 * @returns
 */
export default function throttle(
  func: (...args: any[]) => any,
  wait: number,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  options = { leading: true, trailing: true, callback: (...args: any[]) => {} }
) {
  const { leading, trailing, callback } = options
  //上次回调的执行时间
  let lastExecTime = 0
  let timer: any
  const throttled = function (this: any, ...args: any[]) {
    return new Promise((resolve, reject) => {
      //当前的时间戳
      const currentTime = Date.now()
      //如果说lastExecTime为0说明是第1次，并且第1次不要执行
      if (lastExecTime === 0 && !leading) {
        lastExecTime = currentTime
      }
      //上次执行的时间加上等待的时间就是下一次要执行的时候
      //0s  3s  3s  6s 9s 10s
      const nextExecTime = lastExecTime + wait
      // currentTime=当前时间 nextExecTime=3000 1642773517446>=3000
      if (currentTime >= nextExecTime) {
        if (timer) {
          clearTimeout(timer)
          timer = null
        }
        try {
          const result = func.apply(this, args)
          resolve(result)
        } catch (error) {
          callback(error)
          reject(error)
        }
        lastExecTime = currentTime
      } else {
        if (trailing) {
          if (timer) {
            clearTimeout(timer)
            timer = null
          }
          timer = setTimeout(() => {
            try {
              const result = func.apply(this, args)
              resolve(result)
            } catch (error) {
              callback(error)
              reject(error)
            }
            lastExecTime = Date.now()
          }, nextExecTime - currentTime)
        }
      }
    })
  }
  throttled.cancel = function () {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }
  return throttled
}
