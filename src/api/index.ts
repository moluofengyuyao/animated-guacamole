/*
 * @Author: zhuangyating 2114380985@qq.com
 * @Date: 2024-05-14 15:28:37
 * @LastEditors: zhuangyating 2114380985@qq.com
 * @LastEditTime: 2024-05-28 17:35:53
 * @FilePath: \cth-ddgl-web\src\api\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export { courseTyCountByTrainId ,getOnOffCourse } from './trainingActivies'
export { listUnion ,editPlan,GetAllXzqh ,regionData ,getNextDeptTrees , downloadFiles ,getdeptypelist} from './zlxz'
export {login ,getFunctionList ,VerifyTk} from './user'
// import 

export {
    getOverPlanList,
    getOverPlanLists,
    exportListTableExcle,
    exportListTableExcles,
    addOverPlan,
    editOverPlan,
    delOverPlan,
    getWorkNum,
    detailOverPlan,
    getCourseList,
    getLevHy,
    getLevJg,
    deleteFileMenu,
    queryDataListCommon,
    createCommon,
    getNewsList,
    getNewsDetail,
    saveNews,
    delNews,
    getDeptTreesOld,
    getDeptTreesUp,
    getDeptTrees,
    getWorkGroup,
    getHyRootTaskTree,
    getHyNextTaskTree,
    getQhTree,
    getQhTreeBj
  } from './overPlan'

  export {
    withFile,
    delFile,
    downloadFile,
    downTreeFilesZip,
    getWithFile,
    getFileLists
  } from './file'
  
  export {
    deleteMeetingDetail,
    getTaskList,
    reportMeetingDetail,
    editMeetingDetail,
    editMeetingDetailGj,
    exportData,
    getBMTJB,
    getHYBMList,
    getOtherList,
    taskWorkAdd,
    getMeetingDetail
  } from './workReport'