import axios from '@/utils/axios'

export const listUnion = async (params: any) => {
  return axios.get('/listUnion', {
    params,
    baseURL: baseUrl[ENV]['overPlanUrl']
  })
}
export const editPlan = async (data?: any) => {
  return axios.post(`${baseUrl[ENV]['overPlanUrl']}/changePlan/editPlan`, { data })
}

export const GetAllXzqh = async (params: any) => {
  return axios.get('/common/GetAllXzqh', {
    params,
    baseURL: baseUrl[ENV]['userUrl']
  })
}
export const regionData = async (params: any) => {
  return axios.get('/common/GetXzqhTree', {
    params,
    baseURL: baseUrl[ENV]['userUrl']
  })
}
// 跨行业获取本级及下级
export const getNextDeptTrees = async (simcode: any) => {
  let url
  if (Number(simcode) >= 0) {
    url = `${baseUrl[ENV]['userUrl']}/common/GetXzqhTree?simcode=${simcode}`
  } else {
    url = `${baseUrl[ENV]['userUrl']}/common/GetXzqhTree`
  }
  return axios.get(url)
}

export const downloadFiles = async (params: any) => {
  return axios.get('/downFiles', {
    params,
    baseURL: baseUrl[ENV]['fileUrl'],
    responseType:"arraybuffer"
  })
}
export const getdeptypelist = async (params: any) => {
  return axios.get('/common/getdeptypelist', {
    params,
    baseURL: baseUrl[ENV]['userUrl']
  })
}