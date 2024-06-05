//在这里配置，需要立即开启loading的接口都配置进atOnceList，其他接口都返回500毫秒的延时
// （为了防止每次都弹出加载框导致的页面闪烁，所以只给需要的接口配置立即开启loading，防止重复点击）
const atOnceList: any = [
  // '/codeMap/check',
]
export default function getURLDelay(url: string) {
  let delay = 500
  if (atOnceList.includes(url)) delay = 0
  return delay
}
