

import axios from '@/utils/axios'

export const courseTyCountByTrainId = async (publicId: any, plantype: any) => {
  return axios.get(`/courseTyCountByTrainId?publicId=${publicId}&plantype${plantype}`, {
    baseURL: baseUrl[ENV]['overPlanUrl']
  })
}
export const getOnOffCourse = async (data:any) => {
  return axios.get(`/getOnOffCourse?publicId=${data.publicId}&plantype=${data.plantype}`, {
    baseURL: baseUrl[ENV]['overPlanUrl']
  })
}