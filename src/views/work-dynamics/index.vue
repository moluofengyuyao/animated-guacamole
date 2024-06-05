<template>
  <div class="taskBuild">
    <div class="mainBox">
      <div
        class="leftTree"
        style=""
      >
        <tree title="普查机构列表" ref="treesRef" @getDepId="getDepId">
          <!-- <a-icon slot="switcherIcon" type="down" /> -->
        </tree>
      </div>
      <div class="tableBox commomElTab query">
        <el-tabs v-model="activeNameRef">
          <el-tab-pane
            label="通知文件"
            v-if="showTabsRef.includes('通知文件')"
            name="first"
          >
            <el-input
              placeholder="请输入内容"
              :prefix-icon="Search"
              :clearable="true"
              @clear="getOverPlanListByActiveName"
              size="small"
              style="width: 187px;height:24px!important;"
              v-model="searchKeyRef"
              :class="{
                'input-with-select': true,
                addDom: true,
                batch: false
              }"
            >
            </el-input>
            <el-button
              type="primary"
              v-if="roleIsShow('常态工作管理', '工作动态', '通知文件', '新增') && isShowAddButton==true"
              plain
              size="small"
              class="batch"
              @click="addDom"
              >新增</el-button
            >
            <noticeFileTable :tableData="tableDataRef"></noticeFileTable>
            <el-row>
              <el-col :offset="7" :span="8">
                <el-pagination
                  @size-change="getOverPlanListByActiveName"
                  @current-change="getOverPlanListByActiveName"
                  v-model:current-page="currentPage1Ref"
                  v-model:page-size="pageSize1Ref"
                  :page-sizes="[10, 20, 30, 40, 50]"
                  layout="total, sizes, prev, pager, next"
                  :total="total1Ref"
                >
                </el-pagination>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane
            label="培训计划"
            v-if="showTabsRef.includes('培训计划')"
            name="second"
          >
            <el-input
              placeholder="请输入内容"
              :prefix-icon="Search"
              :clearable="true"
              @clear="getOverPlanListByActiveName"
              size="small"
              style="width: 187px;height:24px!important;"
              v-model="searchKeyPxjhRef"
              :class="{
                'input-with-select': true,
                addDom: true,
                batch: false
              }"
            >
            </el-input>
            <el-button
              type="primary"
              v-if="roleIsShow('常态工作管理', '工作动态', '培训计划', '新增') && isShowAddButton==true"
              plain
              size="small"
              class="batch"
              @click="addDomPxjh"
              >新增</el-button
            >
            <trainingPlanTable
              :tableData="tableDataPxjhRef"
              :taskCode="xzcodeRef"
              @updateData="getOverPlanListByActiveName"
            ></trainingPlanTable>
            <el-row>
              <el-col :offset="7" :span="8">
                <el-pagination
                  @size-change="getOverPlanListByActiveName"
                  @current-change="getOverPlanListByActiveName"
                  v-model:current-page="currentPage2Ref"
                  v-model:page-size="pageSize2Ref"
                  :page-sizes="[10, 20, 30, 40, 50]"
                  layout="total, sizes, prev, pager, next"
                  :total="total2Ref"
                >
                </el-pagination>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane
            label="直播答疑"
            v-if="showTabsRef.includes('直播答疑')"
            name="third"
          >
            <el-input
              placeholder="请输入内容"
              :prefix-icon="Search"
              :clearable="true"
              @clear="getOverPlanListByActiveName"
              size="small"
              style="width: 187px;height:24px!important;"
              v-model="searchKeyZbdyRef"
              :class="{
                'input-with-select': true,
                addDom: true,
                batch: false
              }"
            >
            </el-input>
            <el-button
              type="primary"
              plain
              v-if="roleIsShow('常态工作管理', '工作动态', '直播答疑', '新增') && isShowAddButton==true"
              size="small"
              class="batch"
              @click="addDomZbdy"
              >新增</el-button
            >
            <questionAnswerTable :tableData="tableDataZbdyRef"></questionAnswerTable>
            <el-row>
              <el-col :offset="7" :span="8">
                <el-pagination
                  @size-change="getOverPlanListByActiveName"
                  @current-change="getOverPlanListByActiveName"
                  v-model:current-page="currentPage3Ref"
                  v-model:page-size="pageSize3Ref"
                  :page-sizes="[10, 20, 30, 40, 50]"
                  layout="total, sizes, prev, pager, next"
                  :total="total3Ref"
                >
                </el-pagination>
              </el-col>
            </el-row>
          </el-tab-pane>    
          <el-tab-pane
            label="技术规范"
            v-if="showTabsRef.includes('技术规范')"
            name="fourth"
          >
            <el-input
              placeholder="请输入内容"
              :prefix-icon="Search"
              :clearable="true"
              @clear="getOverPlanListByActiveName"
              size="small"
              style="width: 187px;height:24px!important;"
              v-model="searchKeyJsgfRef"
              :class="{
                'input-with-select': true,
                addDom: true,
                batch: false
              }"
            >
            </el-input>
            <el-button
              type="primary"
              plain
              v-if="roleIsShow('常态工作管理', '工作动态', '技术规范', '新增') && isShowAddButton==true"
              size="small"
              class="batch"
              @click="addDomJsgf"
              >新增</el-button
            >
            <technologyStandardTable
              :tableData="tableDataJsgfRef"
              :taskCode="xzcodeRef"
              @updateData="getOverPlanListByActiveName"
            ></technologyStandardTable>
            <el-row>
              <el-col :offset="7" :span="8">
                <el-pagination
                  @size-change="getOverPlanListByActiveName"
                  @current-change="getOverPlanListByActiveName"
                  v-model:current-page="currentPage4Ref"
                  v-model:page-size="pageSize4Ref"
                  :page-sizes="[10, 20, 30, 40, 50]"
                  layout="total, sizes, prev, pager, next"
                  :total="total4Ref"
                >
                </el-pagination>
              </el-col>
            </el-row>
          </el-tab-pane>    
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup name="WorkDynamicsList">
import { ref, watch, onMounted, computed } from 'vue'
import { workDynamicsStore, userStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import noticeFileTable from './notice-file/components/notice-file-table.vue'
import trainingPlanTable from './training-plan/components/training-plan-table.vue'
import questionAnswerTable from './question-answer/components/question-answer-table.vue'
import technologyStandardTable from './technology-standard/components/technology-standard-table.vue'
import tree from './components/task-tree.vue'
import { getOverPlanList, getOverPlanLists, getNewsList } from '@/api'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

const workStore = workDynamicsStore()
const router = useRouter()
const route = useRoute()

const treesRef = ref(null)
const treeSelectedKeyRef = ref([])

const user = userStore()
const UserInfo = user.userInfo
const dep_levRef = ref(UserInfo.lev)

const activeNameRef = ref('first')
const timerRef = ref(null)
const seeLevRef = ref('')
const xzcodeRef = ref(UserInfo.department.simcode)
const hyCodeRef = ref('')
const showTabsRef = ref([])
// 通知文件
const currentPage1Ref = ref(1)
const pageSize1Ref = ref(10)
const total1Ref = ref(1)
const tableDataRef = ref([])
const searchKeyRef = ref('')
// 培训计划
const currentPage2Ref = ref(1)
const pageSize2Ref = ref(10)
const total2Ref = ref(1)
const tableDataPxjhRef = ref([])
const searchKeyPxjhRef = ref('')
// 直播答疑
const currentPage3Ref = ref(1)
const pageSize3Ref = ref(10)
const total3Ref = ref(1)
const tableDataZbdyRef = ref([])
const searchKeyZbdyRef = ref('')
// 技术规范
const currentPage4Ref = ref(1)
const pageSize4Ref = ref(10)
const total4Ref = ref(1)
const tableDataJsgfRef = ref([])
const searchKeyJsgfRef = ref('')

// 组别限制
const groupRestrictionRef = computed(() => {
  return workStore.isNotOtherGroup()
})

const isSelfNodeRef = computed(() => {
  if(xzcodeRef.value === UserInfo.department.simcode){
    return true
  }else{
    return false
  }
})

const isCountryCensusOfficeRef = computed(() => {
  return workStore.isCountryCensusOffice()
})
// 是否显示新建按钮
const isShowAddButton = computed(() => {
  return isSelfNodeRef.value && (isCountryCensusOfficeRef.value ? groupRestrictionRef.value : true)
})

// 监听树是否被点击
const getDepId = (code) => {
  xzcodeRef.value = code
  // 获取总体方案列表
  getOverPlanListByActiveName()
}

// const gethyType = (data) => {
//   hyCodeRef.value = data
// }

// 获取总体方案列表
const getOverPlanListByActiveName = async () => {
  if (activeNameRef.value == 'first') {//通知文件
    var code = xzcodeRef.value
    var keywords = searchKeyRef.value
    var isSelf = 1
    var orderByJson = [
      { orderBy: 'notice_at' },
      { orderBy: 'doc_num', orderAsc: 'desc' }
    ]
    var seeLev = seeLevRef.value
    var user_hy = hyCodeRef.value
    var plantype = 11
    var diffInfo = undefined
    var pageid = currentPage1Ref.value
    var pagesize = pageSize1Ref.value
  } else if (activeNameRef.value == 'second') {//培训计划
    var code = xzcodeRef.value
    var keywords = searchKeyPxjhRef.value
    var isSelf = 1
    var orderByJson = [{ orderBy: 'train_start' }]
    var seeLev = seeLevRef.value
    var user_hy = hyCodeRef.value
    var plantype = 5
    var diffInfo = undefined
    var pageid = currentPage2Ref.value
    var pagesize = pageSize2Ref.value
  } else if (activeNameRef.value == 'third') {//直播答疑
    var code = xzcodeRef.value
    var keywords = searchKeyZbdyRef.value
    var isSelf = 1
    var orderByJson = [
      { orderBy: 'notice_at' },
      { orderBy: 'doc_num', orderAsc: 'desc' }
    ]
    var seeLev = seeLevRef.value
    var user_hy = hyCodeRef.value
    var tableType = 15
    var diffInfo = undefined
    var pageid = currentPage3Ref.value
    var pagesize = pageSize3Ref.value
  } else if (activeNameRef.value == 'fourth') {//技术规范
    var code = xzcodeRef.value
    var keywords = searchKeyJsgfRef.value
    var isSelf = 1
    var orderByJson = [
      { orderBy: 'print_at' },
      { orderBy: 'plan_name', orderAsc: 'asc' }
    ]
    var seeLev = seeLevRef.value
    var user_hy = hyCodeRef.value
    var plantype = 3
    var customLev = ''
    var customCode = ''
    var diffInfo = undefined
    var pageid = currentPage4Ref.value
    var pagesize = pageSize4Ref.value
  }
  let res = null
  if(activeNameRef.value == 'first' || activeNameRef.value == 'second'){//通知文件、培训计划
    res = await getOverPlanLists({
      code,
      keywords,
      isSelf,
      orderByJson,
      seeLev,
      plantype,
      user_hy,
      diffInfo,
      pageid,
      pagesize
    });
  }else if(activeNameRef.value == 'third'){//直播答疑
    let lev = dep_levRef.value
    let xzcodelev = 1
    if(lev>2){//市级
      xzcodelev = 3
    }else if(lev>1){//省级
      xzcodelev = 2
    }else{//国家
      xzcodelev = 1
    }
    // 查看全部级别
    xzcodelev = null
    let data = {
      keywords: keywords,
      table_type: tableType,
      pageid: pageid,
      pagesize: pagesize,
      xzcodelev:xzcodelev
    };
    
    res = await getNewsList(data);
  }else if(activeNameRef.value == 'fourth'){//技术规范
    res = await getOverPlanList({
      code,
      keywords,
      isSelf,
      orderByJson,
      seeLev,
      plantype,
      user_hy,
      customCode,
      customLev,
      diffInfo,
      pageid,
      pagesize
    });
  }
  if (res!=null) {
    if (activeNameRef.value == 'first') {
      tableDataRef.value = res.list || []
      total1Ref.value = res.count * 1
    } else if (activeNameRef.value == 'second') {
      tableDataPxjhRef.value = res.list || []
      total2Ref.value = res.count * 1
    } else if (activeNameRef.value == 'third') {
      tableDataZbdyRef.value = []
      if(res.list.length){
        tableDataZbdyRef.value = res.list.map((item, index) => {
          return {
            ...item,
            public_at: item.public_at.split(" ")[0],
            id: index + 1,
          };
        });
      }
      total3Ref.value = res.count * 1
    } else if (activeNameRef.value == 'fourth') {
      tableDataJsgfRef.value = res.list || []
      total4Ref.value = res.count * 1
    }
  } else {
    ElMessage.error('服务器出错，请稍后重试')
  }
}

// 跳转新增页面
const addDom = () => {
  let href = router.resolve({ name: 'NoticeFileAdd' })
  window.open(href.href, '_blank')
}

const addDomPxjh = () => {
  let href = router.resolve({ name: 'TrainingPlanAdd' })
  window.open(href.href, '_blank')
}

const addDomZbdy = () => {
  let href = router.resolve({ name: 'QuestionAnswerAdd' })
  window.open(href.href, '_blank')
}

const addDomJsgf = () => {
  let href = router.resolve({ name: 'TechnologyStandardAdd' })
  window.open(href.href, '_blank')
}

// 监听
watch(
  () => activeNameRef.value,
  () => {
    tableDataRef.value = []
    tableDataPxjhRef.value = []
    tableDataZbdyRef.value = []
    tableDataJsgfRef.value = []
    getOverPlanListByActiveName()
  },
  {
    deep: true,immediate: true
  }
)

watch(
  () => searchKeyRef.value,
  () => {
    if (timerRef.value) {
      clearTimeout(timerRef.value)
    }

    timerRef.value = setTimeout(() => {
      getOverPlanListByActiveName()
    }, 300)
  },
  {
    deep: true,immediate: true
  }
)

watch(
  () => searchKeyPxjhRef.value,
  () => {
    if (timerRef.value) {
      clearTimeout(timerRef.value)
    }

    timerRef.value = setTimeout(() => {
      getOverPlanListByActiveName()
    }, 300)
  },
  {
    deep: true,immediate: true
  }
)

watch(
  () => searchKeyZbdyRef.value,
  () => {
    if (timerRef.value) {
      clearTimeout(timerRef.value)
    }

    timerRef.value = setTimeout(() => {
      getOverPlanListByActiveName()
    }, 300)
  },
  {
    deep: true,immediate: true
  }
)

watch(
  () => searchKeyJsgfRef.value,
  () => {
    if (timerRef.value) {
      clearTimeout(timerRef.value)
    }

    timerRef.value = setTimeout(() => {
      getOverPlanListByActiveName()
    }, 300)
  },
  {
    deep: true,immediate: true
  }
)

onMounted(() => {
  showTabsRef.value = ['通知文件','培训计划','直播答疑','技术规范']
  if (route.query.activeName) {
    activeNameRef.value = route.query.activeName
  }
})
</script>

<style lang="scss" scoped>
.batch {
  position: absolute;
  top: -47px;
  right: 11px;
  z-index: 10;
}
.addDom {
  width: 187px;
  position: absolute;
  top: -47px;
  right: 80px;
  z-index: 10;
}
.taskBuild {
  position: absolute;
  bottom: 0;
  right: 0;
  top: 80px;
  background: var(--main-bg-color);
  width: calc(100% - 68px);
  .mainBox {
    width: calc(100% - 26px);
    margin-left: 13px;
    height: calc(100% - 26px);
    margin-bottom: 12px;
    margin-top: 13px;
    position: relative;
    display: flex;
    .leftTree {
      height: 100%;
      width: 301px;
      border-right: 13px solid var(--main-bg-color)
    }
    .tableBox {
      width: 0;
      height: 100%;
      flex: 1;
      background: #fff;
      position: relative;
    }
  }
}
</style>
