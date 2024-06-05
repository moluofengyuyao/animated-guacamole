<template>
  <div class="mainBoxTable taskExecuteTable">
    <!-- 表格部分 -->
    <div class="tableBox commomElementTable">
      <el-table
        ref="table"
        :data="tableData"
        :stripe="true"
        style="width: 100%"
        :height="tableHeight"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="task_na" min-width="350" label="任务名称" align="left">
          <template #default="scope">
            <span class="task_click" @click="jumpEdit(scope.row, 0)">{{ scope.row.task_na }}</span>
          </template>
        </el-table-column>
        <el-table-column width="200" prop="include_lev" align="center" label="下发级别">
          <template #default="scope">
            <span v-if="scope.row.include_lev">{{
               levName(scope.row.include_lev ,scope.row.created_user_code)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column width="200" prop="end_at" align="center" label="截止时间">
          <template #default="scope">
            <span v-if="scope.row.end_at">{{ scope.row.end_at | momentTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          align="center"
          label="本级上报状态"
          v-if="tableData.length && tableData[0].created_user_code != simcode"
        >
          <template #default="scope">
            <el-tag size="medium" type="danger" v-if="scope.row.state === 1">未上报</el-tag>
            <el-tag size="medium" type="success" v-else-if="scope.row.state === 2">已上报</el-tag>
            <!-- <el-tag size="medium" type="danger" v-else-if="scope.row.state === 2 && scope.row.state === 2">已报名</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column prop="task_pro" width="150" align="center" label="下级上报进度">
          <template #default="scope">
            <span v-if="scope.row.finish !== null && scope.row.count !== null"
              >{{ scope.row.finish }}/{{ scope.row.count }}</span
            >
            <span v-else>——</span>
          </template>
        </el-table-column>
        <el-table-column width="260px" label="操作">
          <template #default="scope">
            <div class="action-con">
              <span @click="jumpEdit(scope.row, 1)" class="handel"
                >
                <el-icon><Edit /></el-icon>
                {{ scope.row.created_user_code == simcode ? '编辑' : '上报' }}</span
              >
              <span
                v-if="lev !== 4"
                @click="jumpTj(scope.row)"
                :class="Math.max(...scope.row.include_lev) > lev ? 'handel' : 'handelGray'"
                ><el-icon><TrendCharts /></el-icon>统计</span
              >
              <span 
                class="handel"
                style="color: red;"
                @click="toSingleDele(scope.row)"
                v-if="scope.row.created_user_code == simcode"
                > <el-icon> <Delete /></el-icon>删除</span
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-row v-if="tableData.length" style="margin-top:4px">
        <el-col :offset="8" :span="8">
          <el-pagination
            @size-change="getTaskList_list"
            @current-change="getTaskList_list"
            :page-sizes="[10, 20, 30, 40, 50]"
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            layout="total, sizes, prev, pager, next"
            :total="total"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TrendCharts,Delete,Edit } from '@element-plus/icons-vue' // 引入 Edit 这个 svg组件
import {  ref, nextTick, watch, onMounted ,onUnmounted,computed} from 'vue'
import router from '@/router'
import { userStore ,loadStore } from '@/store'
// import getAssetsFile from '@/utils/pub-use'
import { ElMessage ,ElMessageBox  } from 'element-plus'
import {  getTaskList ,deleteMeetingDetail} from '@/api'
import dayjs from 'dayjs'
import  debounce from '@/utils/debounce'

const user = userStore()
const UserInfo = user.userInfo
const tableHeight = ref(800)
const lev = ref(UserInfo.department.dep_lev) 
const simcode = ref(UserInfo.user.simcode) 
const pageSize = ref(10)
const total = ref(400)
const currentPage = ref(1)
const tableData = ref([])
const selectSomeTable = ref([]) //表格多选中的数据


const props = defineProps<{ dep_lev?: Number}>()
const emit = defineEmits(['fun'])


const levName = computed(() => {
  return function(val, code){
    if (val.length > 0) {
      const obj = { 1: '国家级', 2: '省级', 3: '市级', 4: '县级' }
      let str = ''
      val.forEach(item => {
        if (code.length == 2) {
          if (item != 2 && item != 1) {
            str += obj[item] + '、'
          }
        } else if (code.length == 1) {
          if (item != 1) {
            str += obj[item] + '、'
          }
        } else {
          if (item != 2 && item != 1 && item != 3) {
            str += obj[item] + '、'
          }
        }
      })
      return str.slice(0, -1)
    } else {
      return '——'
    }
  }
})
const hyName = computed(() => {
  return function(val){
      const optionshy = [
        { label: '全行业', value: -1 },
        { label: '普查办', value: 0 },
        { label: '应急管理', value: 1 },
        { label: '生态环境', value: 2 },
        { label: '交通运输', value: 3 },
        { label: '海洋', value: 4 },
        { label: '住建', value: 5 },
        { label: '水利', value: 6 },
        { label: '气象', value: 7 },
        { label: '林草', value: 8 },
        { label: '地震', value: 9 },
        { label: '地质', value: 10 }
      ]
      if (val == -1) {
        return '全行业'
      } else {
        return optionshy[val + 1].label
      }
  }
})
const  momentTime =(val)=> {
  return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
}
// 批量选中表格数据
const handleSelectionChange =(val)=> {
  selectSomeTable.value = val
  emit('fun', selectSomeTable.value)
}
// 单个删除
const toSingleDele = async(row)=> {
  ElMessageBox.confirm('您确认要删除吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      let params = {
        uuids: [row.task_uuid]
      }
      let res:any = await deleteMeetingDetail(params)
      if (res) {
        ElMessage.success('删除成功')
        getTaskList_list(props.dep_lev)
      }
    }).catch((err) => {
        ElMessage.success(err)
    });
}
const jumpEdit =(row, edit)=> {
  const href = router.resolve({
    name: 'WorkReportEdit',
    query: {
      task_uuid: row.task_uuid,
      edits: edit,
      id: row.id,
      isShowg: row.created_user_code == simcode.value ? 1 : 0
    }
  })
  window.open(href.href, '_blank')
}
const jumpTj=(row)=> {
  if (!(Math.max(...row.include_lev) > lev.value)) {
    ElMessage.warning('暂无统计！')
    return
  }
  const href = router.resolve({
    name: 'WorkReportTj',
    query: {
      task_uuid: row.task_uuid,
      include_lev: JSON.stringify(row.include_lev),
      title: encodeURI(row.task_na),
      created_user_code: row.created_user_code
    }
  })
  window.open(href.href, '_blank')
}
const  getTaskList_list =async()=> {
  let data = {
    user_code:UserInfo.user.simcode,
    dep_type:UserInfo.user.dep_type,
    type: 1,
    limit: pageSize.value,
    offset: currentPage.value - 1,
    created_lev: props.dep_lev
  }
  let res :any = await getTaskList(data)
  if (res) {
    total.value = res.count * 1
    tableData.value = res.taskData
  }
}
defineExpose({getTaskList_list})

    // 调节高度
// const autoHeight =()=> {
//   tableHeight.value = $(window).height() - 210
//   nextTick(() => {
//     $('.el-table').css('height', tableHeight.value)
//   })
// }
onMounted(() => {
    getTaskList_list()
    // autoHeight()
    // window.addEventListener('resize', () =>{debounce(autoHeight(),500)})
})

onUnmounted(() => {
  // window.removeEventListener('resize', () =>{debounce(autoHeight(),500)})
})
</script>

<style scoped lang="scss">
.handel {
  vertical-align: middle;
  font-size: 14px;
  color: var(--theme-color);
  cursor: pointer;
}
.handelGray {
  font-size: 14px;
  color: lightgray;
  cursor: pointer;
}
.mainBoxTable {
  width: calc(100% - 26px);
  margin-left: 13px;
  height: calc(100% - 26px);
  margin-bottom: 12px;
  margin-top: 13px;
  position: relative;
  display: flex;
  flex-direction: column;
}
.tableBox {
  height: 100%;
  width: 100%;
}
.haveUp,
.pass,
.nopass {
  border-radius: 12px;
  height: 24px;
  line-height: 24px;
  width: 8 2px;
  display: inline-block;
  text-align: center;
}
.nopass {
  color: #fb5853;
  background: #ffeae7;
}
.pass {
  color: #44b330;
  background: #f1ffe7;
}
.haveUp {
  color: #0d59af;
  background: #e7f0fe;
}
.btn {
  cursor: pointer;
  color: var(--theme-color);
}
.task_click {
  cursor: pointer;
  color: var(--theme-color);
}
.action-con {
  display: flex;
  justify-content: space-around;
}
.el-icon{
  vertical-align: middle;
  margin-right:4px;
}
</style>
