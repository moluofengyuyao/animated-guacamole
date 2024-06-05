import axios from '@/utils/axios'
//填写导出

export const login = async (data?: any) => {
  return axios.post(`${baseUrl[ENV]['userUrl']}/login/login`, { data })
}
export const getFunctionList = async (params: any) => {
  return axios.get('/permission/getFunctionList', {
    params,
    baseURL: baseUrl[ENV]['userUrl'] //userid
  })
}

/**
 * @description: 根据token获取用户信息-新版
 * @param {string} access_token 传token
 * @param {string} info 传false只返token验证结果（true或者false），传true返用户相关信息
 * @return: res
 */
export const VerifyTk = async (data?: any) => {
  return axios.post(`${baseUrl[ENV]['userUrl']}/login/VerifyTk`, { data })
}