let role = sessionStorage.getItem('userRole')
let userRole = role && JSON.parse(decodeURIComponent(atob(role)))

export const roleIsShow = (xtmc,mkmc,zmkmc,anmc)=>{
 

  let xtmcArr =userRole&&userRole.find(v=>{return v.name == xtmc});
  // debugger
  if(typeof xtmcArr == 'undefined' || xtmcArr == null){
    return true;
    // return false;
  }
  let zmkmcArr = xtmcArr.children.find(v=>{return v.name == mkmc})
  if(typeof zmkmcArr == 'undefined'){
    return true;
    // return false;
  }
  let anmcObj = zmkmcArr.children.find(v=>{return v.name == zmkmc})
  if(typeof anmcObj == 'undefined'){
    return true;
    // return false;
  }
  return true;
  // return (anmcObj.children && anmcObj.children.find(v=>{return v.name == anmc})) || false
}
export const $isViewer = ()=>{
  let isViewer = userRole && userRole.role.some(item => {
    return item.roleid == '77be09e0-8d2e-46fc-b096-04fc6db775e6'
  })
  return true
  // return !isViewer
}

export const clickOutside = {
    beforeMount(el, binding) {
    // 当前的 DOM 元素可能存在多个处理好函数
    // 1.确定监听的 DOM 元素中是否存在当前 el，若不存在，初始化为空数组[]
    if (!nodeList.has(el)) {
        nodeList.set(el, [])
    }
    // 将事件处理函数添加到 el 对应的处理函数列表中
    nodeList.get(el).push({
        // 调用 createDocumentHandler 方法返回处理函数，内部会对是否校验各种边界情况，判断是否需要执行 binding.value 绑定的处理函数
        documentHandler: createDocumentHandler(el, binding),
        bindingFn: binding.value,
    })
  },

  updated(el, binding) {
    if (!nodeList.has(el)) {
        nodeList.set(el, [])
    }
    // 获取当前 el 绑定的所有处理函数
    const handlers = nodeList.get(el)
    // 获取更新前的处理函数索引
    const oldHandlerIndex = handlers.findIndex(
        (item) => item.bindingFn === binding.oldValue
    )
    // 设置新的处理函数，用于替换旧的处理函数
    const newHandler = {
        documentHandler: createDocumentHandler(el, binding),
        bindingFn: binding.value,
    }
    // 若原先存在处理函数，替换；若不存在，添加；
    if (oldHandlerIndex >= 0) {
        // replace the old handler to the new handler
        handlers.splice(oldHandlerIndex, 1, newHandler)
    } else {
        handlers.push(newHandler)
    }
  },
  unmounted(el) {
    // 移除 el 绑定的所有监听事件处理函数
    nodeList.delete(el)
  },
}