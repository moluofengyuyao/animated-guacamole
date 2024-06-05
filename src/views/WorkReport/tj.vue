<template>
  <div class="taskBuild">
    <div class="mainBox">
      <div class="tableBox commomElTab">
        <el-tabs v-model="activeName" >
          <el-tab-pane label="统计" name="first" style="overflow: overlay;padding:0 1rem ;">
            <el-button
              v-if="$isViewer"
              type="primary"
              size="small"
              class="batch"
              @click="dialogVisible = true"
              >批量下载</el-button
            >
            <el-table
              :data="tableData"
              style="width: 100%"
              row-key="id"
              border
              lazy
              stripe
              :load="load"
              class="test"
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            >
              <el-table-column prop="user_name" label="地区" align="left"> </el-table-column>
              <el-table-column width="100px" prop="" label="上报状态" align="center">
                <template #default="scope">
                  <el-tag type="success" v-if="scope.row.state === 2"> 已上报</el-tag>
                  <el-tag type="danger" v-if="scope.row.state === 1 && scope.row.upload_at === null"
                    >未上报</el-tag
                  >
                  <el-tag
                    type="warning"
                    v-if="scope.row.state === 1 && scope.row.upload_at !== null"
                    >已撤销</el-tag
                  >
                </template>
              </el-table-column>
              <el-table-column width="260px" label="上报时间" align="center">
                <template #default="scope">
                  <span v-if="scope.row.upload_at !== null && scope.row.upload_at !== ''">{{
                      momentTime(scope.row.upload_at)
                  }}</span>
                  <span v-else>——</span>
                </template>
              </el-table-column>
              <el-table-column width="500px" label="附件列表" align="center">
                <template #default="scope">
                  <div
                    v-if="scope.row.down_count >= 0 && $isViewer"
                    @click="downloadNotify(scope.row)"
                    style=" cursor: pointer;"
                  >
                    <span style="padding-right: 20px">{{ scope.row.user_name }}统计情况</span>
                    <span><i class="el-icon-download"></i>下载次数{{ scope.row.down_count }}</span>
                  </div>
                  <span v-else>——</span>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-dialog title="批量下载" v-model="dialogVisible" class="dialogStyle">
      <el-tabs v-model="dialogActive" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first">
          <el-table
            :data="dialogData.tabData1"
            style="width: 100%"
            row-key="user_code"
            stripe
            @selection-change="handleSelectionChange"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="user_name" label="地区" align="center"></el-table-column>
            <el-table-column label="附件最新上传时间" align="center">
              <template #default="scope">
                <span>{{ momentTime(scope.row.up_at) }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="附件1" name="second" v-if="dialogData.tabData2.length > 0">
          <el-table
            :data="dialogData.tabData2"
            style="width: 100%"
            row-key="user_code"
            stripe
            @selection-change="handleSelectionChange"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="user_name" label="地区" align="center"></el-table-column>
            <el-table-column label="附件最新上传时间" align="center">
              <template #default="scope">
                <span>{{ momentTime(scope.row.up_at) }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="附件2" name="third" v-if="dialogData.tabData3.length > 0">
          <el-table
            :data="dialogData.tabData3"
            style="width: 100%"
            row-key="user_code"
            stripe
            @selection-change="handleSelectionChange"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="user_name" label="地区" align="center"></el-table-column>
            <el-table-column label="附件最新上传时间" align="center">
              <template #default="scope">
                <span>{{ momentTime(scope.row.up_at) }}</span>
              </template>
            </el-table-column>
          </el-table></el-tab-pane
        >
        <el-tab-pane label="附件3" name="fourth" v-if="dialogData.tabData4.length > 0">
          <el-table
            :data="dialogData.tabData4"
            style="width: 100%"
            row-key="user_code"
            stripe
            @selection-change="handleSelectionChange"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="user_name" label="地区" align="center"></el-table-column>
            <el-table-column label="附件最新上传时间" align="center">
              <template #default="scope">
                <span>{{ momentTime(scope.row.up_at) }}</span>
              </template>
            </el-table-column></el-table
          ></el-tab-pane
        >
      </el-tabs> 
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="someDownload1()"
            >确 定</el-button
          >
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="progressShow"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width="40%"
      class="percentage"
    >
      <div style="text-align: center;color:var(--theme-color)">
        <el-progress :percentage="percentage"  :stroke-width="10"></el-progress>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {  ref, nextTick, watch, onMounted,computed } from 'vue'
import router from '@/router'
import { userStore ,loadStore } from '@/store'
import {  exportData ,downloadFiles , downTreeFilesZip ,getBMTJB ,getHYBMList ,getOtherList } from '@/api'
import { ElMessage ,ElMessageBox  } from 'element-plus'
import { View ,UploadFilled ,Paperclip,Delete } from '@element-plus/icons-vue' // 引入 Edit 这个 svg组件
const user = userStore()
const useLoad = loadStore()
const UserInfo = user.userInfo
import dayjs from 'dayjs'

const lev = ref(UserInfo.department.dep_lev)
const activeName = ref('first')
const taskCode = ref('')
const taskName = ref('')
const routerName = ref('')
const tableData = ref([])
const searchKey = ref('')
const curUserLev = ref(null)
const includeLev = ref([])
const page = ref({
  total: 0,
  pageNum: 0,
  pageSize: 24
})
const test = ref([])
const justifyColums = ref([])
const codeName = ref([])
const codeValue = ref('')
const magazine = ref([])
const magazineValue = ref('')
const sexData = ref([
  {
    id: 1,
    label: '男'
  },
  {
    id: 2,
    label: '女'
  }
])
const sexValue = ref('')
const isShuttle = ref([
        {
          id: 1,
          label: '是'
        },
        {
          id: 2,
          label: '否'
        }])
const isShuttleValue = ref('')
const progressShow = ref(false)
const percentage = ref(0)
const dialogVisible = ref(false)
const dialogVisible1 = ref(false)
const dialogActive = ref('first')
const dialogData = ref({
  tabData1: [],
  tabData2: [],
  tabData3: [],
  tabData4: []
})
const selectedTable = ref([])
const code_type = ref({})
const routerQuery = router.currentRoute.value.query

    // 时间转化
    const momentTime = computed(() => {
      return function(val){
          return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
      }
    })

   const  toExport = async()=> {
      useLoad.spinState = true
      let data = {
        user_code: UserInfo.user.simcode,
        dep_type: UserInfo.user.dep_type,
        task_uuid: routerQuery.task_uuid,
        magazine: magazineValue.value,
        code_name: codeValue.value,
        sex: sexValue.value,
        isShuttle: isShuttleValue.value
      }
      
      let res = await exportData(data)
      useLoad.spinState = false
      if (!res) {
        ElMessage({
          type: 'error',
          message: '获取通知附件失败！'
        })
        return 
      }
      let blob = new Blob([res.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })
      let link = document.createElement('a') // 创建a标签
      link.style.display = 'none'
      let objectUrl = URL.createObjectURL(blob)
      link.href = objectUrl
      link.setAttribute('download', '报名统计表.xlsx')
      link.click()
      URL.revokeObjectURL(objectUrl)
    }
   const  handleClick= async(val)=> {
      selectedTable.value.length = 0
    }
    // 表格多选
    const handleSelectionChange = async(val)=> {
      selectedTable.value = val.filter(item => item.down_count || item.up_at)
      console.log(selectedTable.value)
    }
    // 下载
   const  downloadNotify = async(row)=> {
      let sortObj = {
        '11': { simcode: '11', sortid: '01' },
        '12': { simcode: '12', sortid: '02' },
        '13': { simcode: '13', sortid: '03' },
        '14': { simcode: '14', sortid: '04' },
        '15': { simcode: '15', sortid: '05' },
        '21': { simcode: '21', sortid: '06' },
        '22': { simcode: '22', sortid: '07' },
        '23': { simcode: '23', sortid: '08' },
        '31': { simcode: '31', sortid: '09' },
        '32': { simcode: '32', sortid: '10' },
        '33': { simcode: '33', sortid: '11' },
        '34': { simcode: '34', sortid: '12' },
        '35': { simcode: '35', sortid: '13' },
        '36': { simcode: '36', sortid: '14' },
        '37': { simcode: '37', sortid: '15' },
        '41': { simcode: '41', sortid: '16' },
        '42': { simcode: '42', sortid: '17' },
        '43': { simcode: '43', sortid: '18' },
        '44': { simcode: '44', sortid: '19' },
        '45': { simcode: '45', sortid: '20' },
        '46': { simcode: '46', sortid: '21' },
        '50': { simcode: '50', sortid: '22' },
        '51': { simcode: '51', sortid: '23' },
        '52': { simcode: '52', sortid: '24' },
        '53': { simcode: '53', sortid: '25' },
        '54': { simcode: '54', sortid: '26' },
        '61': { simcode: '61', sortid: '27' },
        '62': { simcode: '62', sortid: '28' },
        '63': { simcode: '63', sortid: '29' },
        '64': { simcode: '64', sortid: '30' },
        '65': { simcode: '65', sortid: '31' },
        '66': { simcode: '66', sortid: '32' }
      }
      useLoad.spinState = true
      let code
      if (routerQuery.created_user_code.length == 1) {
        if (lev.value == 2 && includeLev.value.includes(lev.value)) {
          code = row.user_code
        } else if (lev.value == 3 && includeLev.value.includes(lev.value)) {
          code = row.user_code.substring(0, 2)
        } else if (lev.value == 4 && includeLev.value.includes(lev.value)) {
          code = row.user_code.substring(0, 2)
        } else {
          code = row.user_code
        }
      } else if (routerQuery.created_user_code.length == 2) {
        if (lev.value == 2 && includeLev.value.includes(lev.value)) {
          code = row.user_code.substring(0, 4)
        } else if (lev.value == 3 && includeLev.value.includes(lev.value)) {
          code = row.user_code.substring(0, 4)
        } else if (lev.value == 4 && includeLev.value.includes(lev.value)) {
          code = row.user_code.substring(0, 4)
        } else {
          code = row.user_code
        }
      } else if (routerQuery.created_user_code.length == 4) {
        code = row.user_code
      }
      let params = {
        planuuid :row.id,
        plantype:41,
        usetype:code_type.value[code].join(',')
      }
      let fileInfo = await downloadFiles(params)
      useLoad.spinState = false
      debugger
      if(fileInfo){
          let blob = new Blob([fileInfo], { type: 'application/zip' })
          let link = document.createElement('a') // 创建a标签
          link.style.display = 'none'
          let objectUrl = URL.createObjectURL(blob)
          link.href = objectUrl
          link.setAttribute(
            'download',
            sortObj[row.user_code] ? sortObj[row.user_code].sortid + row.task_name : row.task_name
          )
          link.click()
          URL.revokeObjectURL(objectUrl)

      }else{
        ElMessage({
          type: 'error',
          message: '获取通知附件失败！'
        })
      }
    }
    const someDownload1 = async()=> {
      if (!selectedTable.value.length) {
        return ElMessage.warning('请先选择数据')
      }
      progressShow.value = true
      percentage.value = 0
      dialogVisible.value = false
      for (let index = 0; index < selectedTable.value.length; index++) {
        const element = selectedTable.value[index]
        if (!element.up_at) {
          return ElMessage.error(`${element.user_name}不存在附件`)
        }
      }
      useLoad.spinState = true
      let sortObj = {
        '11': { simcode: '11', sortid: '01' },
        '12': { simcode: '12', sortid: '02' },
        '13': { simcode: '13', sortid: '03' },
        '14': { simcode: '14', sortid: '04' },
        '15': { simcode: '15', sortid: '05' },
        '21': { simcode: '21', sortid: '06' },
        '22': { simcode: '22', sortid: '07' },
        '23': { simcode: '23', sortid: '08' },
        '31': { simcode: '31', sortid: '09' },
        '32': { simcode: '32', sortid: '10' },
        '33': { simcode: '33', sortid: '11' },
        '34': { simcode: '34', sortid: '12' },
        '35': { simcode: '35', sortid: '13' },
        '36': { simcode: '36', sortid: '14' },
        '37': { simcode: '37', sortid: '15' },
        '41': { simcode: '41', sortid: '16' },
        '42': { simcode: '42', sortid: '17' },
        '43': { simcode: '43', sortid: '18' },
        '44': { simcode: '44', sortid: '19' },
        '45': { simcode: '45', sortid: '20' },
        '46': { simcode: '46', sortid: '21' },
        '50': { simcode: '50', sortid: '22' },
        '51': { simcode: '51', sortid: '23' },
        '52': { simcode: '52', sortid: '24' },
        '53': { simcode: '53', sortid: '25' },
        '54': { simcode: '54', sortid: '26' },
        '61': { simcode: '61', sortid: '27' },
        '62': { simcode: '62', sortid: '28' },
        '63': { simcode: '63', sortid: '29' },
        '64': { simcode: '64', sortid: '30' },
        '65': { simcode: '65', sortid: '31' },
        '66': { simcode: '66', sortid: '32' }
      }
      //判断下载文件个数，全国的大文件限流，6个一次循环
      let newArr = []
      for (let i = 0; i < selectedTable.value.length; ) {
        //注意：这里与for循环不太一样的是，没有i++
        newArr.push(selectedTable.value.slice(i, (i += 6)))
      }
      for (let j = 0; j < newArr.length; j++) {
        percentage.value = 0 //清空进度
        const element = newArr[j]
        console.log(element, 'element')
        let data = element.map(item => {
          if (routerQuery.created_user_code.length == 1) {
            item.sort = sortObj[item.user_code].sortid
          }
          if (routerQuery.created_user_code.length == 1) {
            if (lev.value == 2 && includeLev.value.includes(lev.value)) {
              item.user_code = item.user_code
            } else if (lev.value == 3 && includeLev.value.includes(lev.value)) {
              item.user_code = item.user_code.substring(0, 2)
            } else if (lev.value == 4 && includeLev.value.includes(lev.value)) {
              item.user_code = item.user_code.substring(0, 2)
            } else {
              item.user_code = item.user_code
            }
          } else if (routerQuery.created_user_code.length == 2) {
            if (lev.value == 3 && includeLev.value.includes(lev.value)) {
              item.user_code = item.user_code.substring(0, 4)
            } else if (lev.value == 4 && includeLev.value.includes(lev.value)) {
              item.user_code = item.user_code.substring(0, 4)
            } else {
              item.user_code = item.user_code
            }
          } else if (routerQuery.created_user_code.length == 4) {
            item.user_code = item.user_code
          }
          return {
            foldername: `${item.user_code}-${item.user_name}`, // item.sort ? item.sort + item.up_user_name : item.up_user_name,
            planuuid: item.id,
            plantype: 41,
            usetype:
              dialogActive.value == 'first'
                ? '2,3,4'
                : dialogActive.value == 'second'
                ? '2'
                : dialogActive.value == 'third'
                ? '3'
                : '4' // code_type.value[item.user_code].join(',')
          }
        })
        let fileInfo = await downTreeFilesZip(data, {
          onDownloadProgress(progress) {
            percentage.value = percentage.value < 99 ? Number((percentage.value + 0.1).toFixed(2)) : 90 //进度条增加
          }
        })
        if (fileInfo) {
          let blob = new Blob([fileInfo], { type: 'application/zip' })
          // debugger
          let link = document.createElement('a') // 创建a标签
          link.style.display = 'none'
          let objectUrl = URL.createObjectURL(blob)
          link.href = objectUrl
          link.setAttribute('download', decodeURI(routerQuery.title))
          link.click()
          URL.revokeObjectURL(objectUrl)
        } else {
          ElMessage.error('获取附件失败！')
        }
        if (j + 1 == newArr.length) {
          percentage.value = 100 //编译文件完成后，进度条展示为100%
          progressShow.value = false // 关闭进度条显示层
          useLoad.spinState = false
        }
      }
    }
    // 新增
    const jumpAdd = async()=> {
      let href = router.resolve({
        name: 'WorkReportAdd'
      })
      window.open(href.href, '_blank')
    }

    // 获取报名统计表
    const  getBMTJB = async()=> {
      let data = {
        user_code: UserInfo.user.simcode,
        dep_type: UserInfo.user.dep_type,
        task_uuid: routerQuery.task_uuid,
        magazine: magazineValue.value,
        code_name: codeValue.value,
        sex: sexValue.value,
        isShuttle: isShuttleValue.value
      }
      let res = await getBMTJB(data)

      if (res && res.length > 0) {
        justifyColums.value = res[0]
        tableData.value = res.map((item, index) => {
          return {
            ...item,
            index: index + 1
          }
        })
      } else {
        justifyColums.value = []
        tableData.value = []
      }
    }

    // 获取会议报名列表第一列
    const  getList = async()=> {
      let data = {
        user_code: UserInfo.user.simcode,
        dep_type: UserInfo.user.dep_type,
        type: 1,
        task_uuid: routerQuery.task_uuid,
        limit: page.value.pageSize,
        offset: page.value.pageNum
      }
      let res = await getHYBMList(data)
      if (res && res.length > 0) {
        let firstArr = res

        if (activeName.value === 'first') {
          code_type.value = {}
          firstArr[0]?.materials_data.forEach(item => {
            item.sheng.forEach(items => {
              if (code_type.value[items]) {
                code_type.value[items].push(item.usetype)
              } else {
                code_type.value[items] = []
                code_type.value[items].push(item.usetype)
              }
            })
          })
          // console.log(code_type.value)
        }
        //判断第一级别是否有children
        curUserLev.value = UserInfo.department.dep_lev
        includeLev.value = JSON.parse(routerQuery.include_lev)
        let index = includeLev.value.indexOf(curUserLev.value + 1)
        if (
          index !== -1 &&
          includeLev.value[index + 1] &&
          !['11', '12', '31', '50'].includes(routerQuery.created_user_code)
        ) {
          firstArr.forEach(item => {
            item.hasChildren = true
            item.filesname = ''
            item.up_at = ''
          })
        } else {
          firstArr.forEach(item => {
            item.hasChildren = false
            item.filesname = ''
            item.up_at = ''
          })
        }

        let str
        if (firstArr.length == 1) {
          str = firstArr[0].id //解决只有一条数据返回数组问题
        } else if (firstArr.length > 1) {
          str = firstArr.reduce((prev, item) => {
            if (typeof prev === 'object') {
              return `${prev.id},${item.id}`
            }
            return `${prev},${item.id}`
          })
        }
        getOtherColumns(str, firstArr)
      }
    }
    // 获取会议报名列表其他列
    const  getOtherColumns = async(str, firstArr, sign)=> {
      let data = {
        planuuids: str,
        plantype: '41',
        usetype: ''
      }
      let res = await getOtherList(data)
      let dataArr = res

      if (!sign) {
        firstArr.forEach((item, index) => {
          dataArr.forEach((item1, index1) => {
            if (item.id == item1.planuuid) {
              if (item1.files.length > 0) {
                firstArr[index].up_at = item1.files[0].up_at
                firstArr[index].down_count = item1.files[0].dow_count

                dialogData.value.tabData1.push(item)
                if (item1.files) {
                  for (let j = 0; j < item1.files.length; j++) {
                    const ele = item1.files[j]
                    if (ele.usetype == 2) {
                      dialogData.value.tabData2.push(item)
                    }
                    if (ele.usetype == 3) {
                      dialogData.value.tabData3.push(item)
                    }
                    if (ele.usetype == 4) {
                      dialogData.value.tabData4.push(item)
                    }
                  }
                }
              }
            }
          })
        })
        tableData.value = firstArr
        // console.log(dialogData.value, 'dialogData.value')
      } else {
        firstArr.forEach((item, index) => {
          dataArr.forEach((item1, index1) => {
            if (item.id == item1.planuuid) {
              if (item1.files.length > 0) {
                firstArr[index].up_at = item1.files[0].up_at
                firstArr[index].down_count = item1.files[0].dow_count
              }
            }
          })
        })
        return firstArr
      }

      console.log(dialogData.value, 'dialogData.value')
    }
    // 懒加载
    const load = async(tree, treeNode, resolve) =>{
      let code = tree.user_code
      let data = {
        user_code: code,
        dep_type: UserInfo.user.dep_type,
        type: 1,
        task_uuid: routerQuery.task_uuid
      }
      let res = await getHYBMList(data)
      if (res && res.length > 0) {
        res.forEach(item => {
          if (item.user_code.length === 6) {
            item.hasChildren = false
          } else {
            item.hasChildren = true
          }

          item.children = []
        })
        let firstArr = res

        let str
        if (firstArr.length == 1) {
          str = firstArr[0].id //解决只有一条数据返回数组问题
        } else if (firstArr.length > 1) {
          str = firstArr.reduce((prev, item) => {
            if (typeof prev === 'object') {
              return `${prev.id},${item.id}`
            }
            return `${prev},${item.id}`
          })
        }
        let data = await getOtherColumns(str, firstArr, 'loadSign')
        resolve(data)
      }
    }
    onMounted(()=>{
      getList()

    })
</script>

<style scoped lang="scss">
/* .test /deep/ .el-tab-pane .el-tabs__content{
  overflow: overlay;
  padding: 1rem ;

} */
.test :deep(.el-table__body)  .el-table__row td:nth-of-type(1) {
  text-align: center;
}
.test :deep(.el-table__body-wrapper)  {
  height: calc(100vh - 200px);
  overflow-y: auto;
}
:deep(.el-dialog__body) {
  height: 500px;
  padding: 0 10px !important;
  .el-tabs__content {
    height: 450px;
    overflow-y: auto;
  }
}
.percentage :deep( .el-dialog) {
  background: transparent;
}
.taskBuild {
  position: absolute;
  bottom: 0;
  right: 0;
  top: 80px;
  background: var(--main-bg-color);
  width: 100%;
}
@media only screen and (max-width: 1366px) {
  .taskBuild {
    top: 60px;
  }
}
.taskBuild .mainBox {
  width: calc(100% - 26px);
  margin-left: 13px;
  height: calc(100% - 26px);
  margin-bottom: 12px;
  margin-top: 13px;
  position: relative;
  display: flex;
}
.taskBuild .mainBox .leftTree {
  height: 100%;
  width: 255px;
  background: #fff;
}
.taskBuild .mainBox .tableBox {
  height: 100%;
  flex: 1;
  width: 0;
  background: #fff;
}
.batch {
  position: absolute;
  top: -42px;
  right: 11px;
  z-index: 10;
}
.close {
  position: absolute;
  top: -54px;
  right: 78px;
  z-index: 10;
}
.addDom {
  width: 187px;
  position: absolute;
  top: -42px;
  right: 102px;
  z-index: 10;
}
</style>
