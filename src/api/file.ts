import axios from '@/utils/axios'

// 编辑文件关联
export const withFile = async (data: any) => {
    return axios.post(`${baseUrl[ENV]['fileUrl']}/planWithFile`, { data })
}

// 删除附件
export const delFile = async (data: any) => {
    return axios.post(`${baseUrl[ENV]['fileUrl']}/deleteFile`, { data })
}

// 下载附件
export const downloadFile = async (uuid: any, plantype: any) => {
    return axios.get(
        `${baseUrl[ENV]['fileUrl']}/downFile?fileuuid=${uuid}&plantype=${plantype}`,
        {responseType: 'arraybuffer'}
    )
}

// 批量下载附件
export const downTreeFilesZip = async (data: any) => {
    return axios.get(
        `${baseUrl[ENV]['fileUrl']}/downTreeFilesZip?eachWhere=`+ JSON.stringify(data.eachWhere),
        {responseType: 'arraybuffer'}
    )
}

//获取一批记录的附件列表--培训课程
export const getWithFile = async (data: any) => {
    return axios.get(
        `${baseUrl[ENV]['fileUrl']}/getWithFile?plantype=${data.plantype}&usetype=${data.usetype}&planuuid=${data.planuuid}`
    )
}

// 培训课程附件列表
export const getFileLists = async (data: any) => {
    return axios.post(`${baseUrl[ENV]['fileUrl']}/getFileByplanuuid`, { data })
}