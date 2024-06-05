import axios from '@/utils/axios'

export const getTaskList = async (params: any) => {
  return axios.get('/get', {
    params,
    baseURL: baseUrl[ENV]['taskUrl']
  })
}
// 上报
export const reportMeetingDetail = async (params: any) => {
  return axios.patch(`${baseUrl[ENV]['taskUrl']}/update_pro`,{
    params,
    baseURL: baseUrl[ENV]['taskUrl']
  })
}
export const editMeetingDetail = async (params: any) => {
  return axios.patch(`${baseUrl[ENV]['taskUrl']}/edit`,{
    params,
    baseURL: baseUrl[ENV]['taskUrl']
  })
}
export const editMeetingDetailGj = async (params: any) => {
  return axios.patch(`${baseUrl[ENV]['taskUrl']}/edit_task`,{
    params,
    baseURL: baseUrl[ENV]['taskUrl']
  })
}

// 导出
export const exportData = async (params: any) => {
  return axios.get('/export_mem', {
    params,
    baseURL: baseUrl[ENV]['taskUrl']
  })
}
// 获取报名统计表
export const getBMTJB = async (params: any) => {
  return axios.get('/get_mtg_data', {
    params,
    baseURL: baseUrl[ENV]['taskUrl']
  })
}
// 获取会议报名列表--会议报名情况
export const getHYBMList = async (params: any) => {
  return axios.get('/get_task', {
    params,
    baseURL: baseUrl[ENV]['taskUrl']
  })
}

// 获取会议报名列表
export const getOtherList = async (data?: any) => {
  return axios.post(`${baseUrl[ENV]['fileUrl']}/getFileByplanuuid`, { data })
}
export const taskWorkAdd = async (data?: any) => {
  return axios.post(`${baseUrl[ENV]['taskUrl']}/add`, { data })
}

export const getMeetingDetail = async (params: any) => {
  return axios.get('/get_data', {
    params,
    baseURL: baseUrl[ENV]['taskUrl']
  })
}
export const deleteMeetingDetail =async (data?: any) => {
  return axios.delete(`${baseUrl[ENV]['taskUrl']}/del`, {data})
}