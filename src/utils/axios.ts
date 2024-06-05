import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { message } from 'ant-design-vue'
import { userStore, loadStore } from '@/store'
import errorHandle from './status-code'
import getURLDelay from './URLDelay'
let timer: any = null
class HttpRequest {
  baseURL?: string
  timeout: number
  queue: Record<string, boolean>
  useLoad: any
  constructor() {
    //延长时间用于下载文件
    this.timeout = 10000
    //loading
    this.queue = {} //专门用来维护请求的队列
    //页面切换我需要取消请求
  }
  setInterceptor(instance: AxiosInstance, url: string) {
    this.useLoad = loadStore()
    instance.interceptors.request.use((config) => {
      if (Object.keys(this.queue).length === 0) {
        //开启loading前确认该请求是否需要立即loading，不需要立即loading的接口设置延时，解决调接口页面闪烁的问题
        const spinDelay = getURLDelay(url)
        //开启loading
        if (spinDelay == 0) {
          this.useLoad.spinState = true
        } else {
          timer = setTimeout(() => {
            this.useLoad.spinState = true
          }, spinDelay)
        }
      }
      const useUser = userStore()
      const token = useUser.token
      if (token) {
        // 每次请求都会携带一个 权限访问服务器
        config.headers!.token = token
        // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTU5MTA5NTEsInVzZXJfaWQiOiI3OTA2YjczNjIwZmI0NGRhYjIzYmE3OTNkYjEzYzExZiIsInVzZXJfbmFtZSI6IuW8oOS4veWonCIsInlobHgiOjAsImNvZGUiOiIwMDAwMDAiLCJpc2FkbWluIjowLCJjb2RlX25hbWUiOiLlm73lrrYiLCJkZXBfaWQiOiI3YTE5ZjVmMC1lZjQxLTQ4NzctYmJiNS0zNTY5MjA0ZjM5N2IiLCJkZXBfbmFtZSI6IuWbveWKoemZouaZruafpeWKniIsImRlcF9sZXYiOjEsImRlcF90eXBlIjowLCJkZXBfcmVsbmFtZSI6IuWbveWKoemZouaZruafpeWKniIsImFsbGNvZGUiOiIwMDAwMDAwMDAwMDAiLCJzaW1jb2RlIjoiMCIsImNqYWRtaW4iOjAsImNqY29kZSI6IjAiLCJjal9sZXYiOjEsImNqY29kZV9uYW1lIjoi5Zu95a62Iiwic2ZzZCI6MCwia2V5IjoiRUQ2OTkyNkRGQkQwNjg5MjFBMUY3NDgwQUJGM0I2NjAiLCJsb2dfbmFtZSI6IuW8oOS4veWonCIsImlhdCI6MTcxNTgyNDU1MX0.Ev6kySvRGxzfA8vmpVvrGQETvM9vjY-tv95xHzZ9mVI'
      }
      this.queue[url] = true
      return config
    })

    instance.interceptors.response.use(
      (res) => {
        Reflect.deleteProperty(this.queue, url)
        if (Object.keys(this.queue).length === 0) {
          //关闭loading
          clearTimeout(timer) //可能会有开启loading的定时器所以先关闭定时器
          this.useLoad.spinState = false
        }
        // console.log(res.headers['content-type'],'content-type')
        // console.log(res,'服务端res')
        if(res.request&&res.request.responseType === 'arraybuffer'){
          return res //下载文件的arraybuffer类型
        }
        //如果服务端 返回的是二进制流 则直接返回
        if (res.headers['content-type'] === 'application/octet-stream')
          return res
        if (res.headers['content-type'] === 'text/html; charset=utf-8')
          return res.data
        // ArrayBuffer下载文件
        if (res.headers['content-type'] === 'application/x-protobuf')
          return res
        
        if (res.data.code === 1) {
          if(res.data.result!=undefined){//区划树返回结果
            return res.data.result // 请求成功返回数据
          }
          return res.data.data // 请求成功返回数据
        } else {
          message.error({ content: res.data.msg })
          return null // 失败返回null 方便判断
        }
      },
      (err) => {
        Reflect.deleteProperty(this.queue, url)
        if (Object.keys(this.queue).length === 0) {
          //关闭loading
          clearTimeout(timer) //可能会有开启loading的定时器所以先关闭定时器
          this.useLoad.spinState = false
        }
        if (err && err.response) {
          errorHandle(err.response.status)
          return null
        } else {
          if (!window.navigator.onLine) {
            message.warning('网络不稳定，请检查网络连接')
          } else {
            message.error('网络请求超时')
          }
          return null
        }
      }
    )
  }
  setBaseUrl(url: string) {
    const mapUrl = 'apiUrl'
    //baseUrl 全局url /static/base-url.js ENV代表环境
    this.baseURL = baseUrl[ENV][mapUrl]
    return this.baseURL
  }
  request(options: AxiosRequestConfig) {
    // 通过request方法来进行请求操作
    // 每次请求可以创建一个新的实例， 如果业务不复杂你可以不创建实例  直接使用axios
    const instance = axios.create()
    this.setBaseUrl(options.url!)
    const config = {
      baseURL: this.baseURL,
      timeout: this.timeout,
      ...options
    }
    this.setInterceptor(instance, config.url!)
    const res = instance.request<any>(config)
    return res // 产生的是一个 promise  axios()
  }
  get(url: string, data = {}) {
    //   axios.get('/xxx',{params:xxx})
    return this.request({
      url,
      method: 'get',
      ...data
    })
  }
  post(url: string, data = {}, config = {}) {
    // axios.post('/xxx',{data})
    return this.request({
      url,
      method: 'post',
      ...data,
      ...config
    })
  }
  patch(url: string, config = {}) {
    return this.request({
      ...config,
      url,
      method: 'patch'
    })
  }
  delete(url: string, config = {}) {
    return this.request({
      ...config,
      url,
      method: 'delete'
    })
  }
  // 需要别的方法还可以接续扩展
}

export default new HttpRequest()
