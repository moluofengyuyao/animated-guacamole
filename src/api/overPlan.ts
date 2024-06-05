/*
 * @Author: zhuangyating 2114380985@qq.com
 * @Date: 2024-05-15 18:15:52
 * @LastEditors: zhuangyating 2114380985@qq.com
 * @LastEditTime: 2024-05-29 11:25:45
 * @FilePath: \cth-ddgl-web\src\api\overPlan.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from '@/utils/axios'

// 获取培训活动列表、技术规范列表
export const getOverPlanList = async (data: any) => {
  return axios.get(
    `${baseUrl[ENV]['overPlanUrl']}/list?xzcode=${data.code}&plantype=${data.plantype
    }&keywords=${data.keywords}&isSelf=${data.isSelf
    }&orderByJson=${JSON.stringify(data.orderByJson)}&seeLev=${data.seeLev
    }&user_hy=${data.user_hy}&customCode=${data.customCode}&customLev=${data.customLev
    }&diffInfo=${data.diffInfo}&pageid=${data.pageid}&pagesize=${data.pagesize}`
  )
}

// 获取函件（通知文件）、培训活动列表
export const getOverPlanLists = async (data: any) => {
    return axios.get(
        `${baseUrl[ENV]['overPlanUrl']}/listByJgId?xzcode=${data.code}&plantype=${data.plantype
        }&keywords=${data.keywords}&isSelf=${data.isSelf
        }&orderByJson=${JSON.stringify(data.orderByJson)}&seeLev=${data.seeLev
        }&user_hy=${data.user_hy}&diffInfo=${data.diffInfo}&pageid=${data.pageid
        }&pagesize=${data.pagesize}`
    )
}

// 导出表格
export const exportListTableExcle = async (data: any) => {
    return axios.get(
        `${baseUrl[ENV]['overPlanUrl']}/exportListTableExcle?plantype=${data.plantype}&uuids=${data.uuids}&orderByJson=${data.orderByJson}`,
        {responseType: 'arraybuffer'}
    )
}

// 批量导出表格
export const exportListTableExcles = async (data: any) => {
    return axios.get(
        `${baseUrl[ENV]['overPlanUrl']}/exportListTableExcle?xzcode=${data.code}&keywords=${data.keywords}&isSelf=${data.isSelf}&orderByJson=${data.orderByJson}&seeLev=${data.seeLev}&plantype=${data.plantype}&user_hy=${data.user_hy}`,
        {responseType: 'arraybuffer'}
    )
}

// 新建函件（通知文件）、培训活动、技术规范
export const addOverPlan = async (data: any) => {
    return axios.post(`${baseUrl[ENV]['overPlanUrl']}/changePlan`, { data })
}

// 修改函件（通知文件）、培训活动、技术规范
export const editOverPlan = async (data: any) => {
    return axios.post(`${baseUrl[ENV]['overPlanUrl']}/changePlan`, { data })
}

// 删除函件（通知文件）、培训活动、技术规范
export const delOverPlan = async (data: any) => {
    return axios.post(`${baseUrl[ENV]['overPlanUrl']}/delete`, { data })
}

// 获取工作（活动）编码
export const getWorkNum = async (params: any) => {
    return axios.get(
        `${baseUrl[ENV]['overPlanUrl']}/getWorknum?plantype=${params.plantype}`
    )
}

// 获取函件（通知文件）、培训活动、技术规范详情
export const detailOverPlan = async (uuid: any, plantype: any) => {
    return axios.get(
        `${baseUrl[ENV]['overPlanUrl']}/getOne?uuid=${uuid}&plantype=${plantype}`
    )
}

// 获取课程列表
export const getCourseList = async (data: any) => {
    return axios.get(
        `${baseUrl[ENV]['overPlanUrl']}/courseList?plantype=36&publicId=${data.publicId}&pageid=${data.pageid}&pagesize=${data.pagesize}&orderByJson=${data.orderByJson}`
    )
}

// 获取行业与级别
export const getLevHy = async (uuid: any) => {
    return axios.get(
        `${baseUrl[ENV]['overPlanUrl']}/getLevHy?uuid=${uuid}`
    )
}

// 获取机构
export const getLevJg = async (uuid: any) => {
    return axios.get(
        `${baseUrl[ENV]['overPlanUrl']}/getLevJg?uuid=${uuid}`
    )
}

// 删除文件目录
export const deleteFileMenu = async (data: any) => {
    return axios.post(`${baseUrl[ENV]['overPlanUrl']}/deleteFileMenu`, { data })
}

// 查询文件列表
export const queryDataListCommon = async (data: any) => {
    return axios.post(`${baseUrl[ENV]['workUrl']}/common/queryDataListCommon`, { data })
}

// 创建
export const createCommon = async (data: any) => {
    return axios.post(`${baseUrl[ENV]['workUrl']}/common/createCommon`, { data })
}

// 获取系统通知（直播答疑）列表
export const getNewsList = async (data: any) => {
    return axios.get(
        `${baseUrl[ENV]['newsUrl']}/list?keywords=${data.keywords}&table_type=${data.table_type}&pageid=${data.pageid}&pagesize=${data.pagesize}&xzcodelev=${data.xzcodelev?data.xzcodelev:''}`
    )
}

// 获取系统通知（直播答疑）详情
export const getNewsDetail = async (data: any) => {
    return axios.get(
        `${baseUrl[ENV]['newsUrl']}/getOne?uuid=${data.uuid}&table_type=${data.table_type}`
    )
}

// 保存系统通知（直播答疑）
export const saveNews = async (data: any) => {
    return axios.post(`${baseUrl[ENV]['newsUrl']}/save`, { data })
}

// 删除系统通知（直播答疑）
export const delNews = async (data: any) => {
    return axios.post(`${baseUrl[ENV]['newsUrl']}/delete`, { data })
}

// 老服务-获取机构树
export const getDeptTreesOld = async (deptid: any) => {
    return axios.get(
        `${baseUrl[ENV]['userUrl']}/department/getDeptTree?deptid=${deptid}`
    )
}

// 获取上级
export const getDeptTreesUp = async (dep_type: any) => {
    return axios.get(
        `${baseUrl[ENV]['userUrl']}/department/getRCDepartmentTree?dep_type=${dep_type}`
    )
}

// 获取本级及下级
export const getDeptTrees = async ({ dep_id, dep_type, logdep_type }: any) => {
    return axios.get(
        `${baseUrl[ENV]['userUrl']}/department/getDepartmentTree?dep_id=${dep_id}&dep_type=${dep_type}&logdep_type=${logdep_type}`
    )
}

// 获取工作组
export const getWorkGroup = async (data: any) => {
    return axios.post(`${baseUrl[ENV]['userUrl']}/queryDataListCommon`, { data })
}

export const getHyRootTaskTree = async () => {
    return axios.get(
        `${baseUrl[ENV]['userUrl']}/department/getHyRootTaskTree`
    )
}

export const getHyNextTaskTree = async (data: any) => {
    return axios.get(
        `${baseUrl[ENV]['userUrl']}/department/getHyNextTaskTree`,
        {params: data}
    )
}

// 获取区划树-下级
export const getQhTree = async (code: any) => {
    return axios.get(
        `${baseUrl[ENV]['qhTreeUrl']}/qhTreeNew?code=${code}&op=2`
    )
}

// 获取区划树-本级
export const getQhTreeBj = async (code: any) => {
    return axios.get(
        `${baseUrl[ENV]['qhTreeUrl']}/getPcqListById_bj?code=${code}`
    )
}