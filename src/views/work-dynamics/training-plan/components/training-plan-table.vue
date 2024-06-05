<template>
  <div class="mainBoxTable taskExecuteTable">
    <!-- 表格部分 -->
    <div class="tableBox commomElementTable">
      <el-table
        ref="tableRef"
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        :height="tableHeightRef"
      >
        <el-table-column
          min-width="330px"
          show-overflow-tooltip
          prop="train_name"
          label="培训活动名称"
        >
          <template #default="{row,$index}">
            <span class="task_mc" @click="detail(row)">{{
              row.train_name
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          min-width="120px"
          prop="organize_unit"
          label="组织单位"
          align="center"
        >
        </el-table-column>
        <el-table-column
          min-width="260px"
          prop="train_to"
          label="培训对象"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="student_count"
          width="110px"
          label="培训人数"
          align="center"
        >
          <template #default="{row,$index}">
            <span>{{ row.student_count }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="train_form"
          width="80px"
          label="活动类型"
          align="center"
        >
          <template #default="{row,$index}">
            <span>{{
              row.train_form === 1
                ? '技术规范解读'
                : row.train_form === 2
                ? '线下培训'
                : row.train_form === 3
                ? '专题培训'
                : row.train_form === 4
                ? '软件系统操作'
                : row.train_form === 5
                ? '直播答疑'
                : row.train_form === 6
                ? '地方培训'
                : row.train_form === 7
                ? '行业培训'
                : '暂无'
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="course_count"
          width="110px"
          label="课程节数(节)"
          align="center"
        >
          <template #default="{row,$index}">
            <span>{{
              row.course_count ? row.course_count : 0
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="train_start"
          width="120px"
          label="开始时间"
          align="center"
        >
          <template #default="{row,$index}">
            <span v-if="row.train_start">{{
              row.train_start.substr(0, 10)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="train_end"
          width="120px"
          label="结束时间"
          align="center"
        >
          <template #default="{row,$index}">
            <span v-if="row.train_end">{{
              row.train_end.substr(0, 10)
            }}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column prop="see_count" width="80px" label="查看次数">
        </el-table-column> -->

        <el-table-column
          min-width="100px"
          prop="lev"
          label="下发级别"
          align="center"
        >
          <template #default="{row,$index}">
            <span>{{
              row.lev == 1
                ? '国家'
                : row.lev == 2
                ? '省级及以上'
                : row.lev == 3
                ? '市级及以上'
                : row.lev == 4
                ? '县级及以上'
                : '无下发级别'
            }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="设置查看级别"
        custom-class="dialogTable"
        v-model="dialogVisibleRef"
        width="20%"
        top="30vh"
      >
        <el-select
          class="eldate"
          style="width: 40%; margin-left: 30%"
          v-model="lev"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <template #footer class="dialog-footer">
          <el-button @click="dialogVisibleRef = false" link size="small"
            >取 消</el-button
          >
          <el-button type="primary" @click="levOverPlan" size="small"
            >确 定</el-button
          >
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { editOverPlan } from '@/api'
import { ElMessage } from 'element-plus'

const router = useRouter()

const props = defineProps({
  tableData: {
    type: Array
  },
  taskCode: {
    type: String
  }
});
const emit = defineEmits(['updateData'])

const tableRef = ref(null)
const tableHeightRef = ref(800)
const optionsRef = ref([
  { label: '国家', value: 1 },
  { label: '省级', value: 2 },
  { label: '市级', value: 3 },
  { label: '县级', value: 4 }
])
const dialogVisibleRef = ref(false)
const levRef = ref(null)
const uuidRef = ref('')

// 调节高度
const autoHeight = () => {
  tableHeightRef.value = window.innerHeight - 220
  nextTick(() => {
    if(tableRef.value!=null){
      tableRef.value.style.height = tableHeightRef.value;
    }
  })
}

// 查看详情
const detail = (row) => {
  let href = router.resolve({
    name: 'TrainingPlanDetail',
    query: { uuid: row.uuid }
  })
  window.open(href.href, '_blank')
  emit('updateData', null)
}

const tableRowClassName = ({ row, rowIndex }) => {
  let indexArr = []
  props.tableData.forEach((item, index) => {
    if (item.enable == 0) {
      indexArr.push(index)
    }
  })
  if (indexArr.includes(rowIndex)) {
    return 'disable-row'
  }
}

const levOverPlan = async () => {
  let res = await editOverPlan({ uuid: uuidRef.value, lev: levRef.value, plantype: '5' });
  if (res!=null) {
    dialogVisibleRef.value = false
    ElMessage.success('设置级别成功')
    emit('updateData', props.taskCode)
  }
}

onMounted(() => {
  autoHeight()
  window.addEventListener('resize', () => autoHeight(), false)
  
  let lev = JSON.parse(decodeURIComponent(atob(sessionStorage.getItem('UserInfo')))).department.dep_lev
  if (lev == 1) {
    optionsRef.value = [
      { label: '国家', value: 1 },
      { label: '省级', value: 2 },
      { label: '市级', value: 3 },
      { label: '县级', value: 4 }
    ]
  } else if (lev == 2) {
    optionsRef.value = [
      { label: '省级', value: 2 },
      { label: '市级', value: 3 },
      { label: '县级', value: 4 }
    ]
  } else if (lev == 3) {
    optionsRef.value = [
      { label: '市级', value: 3 },
      { label: '县级', value: 4 }
    ]
  } else if (lev == 4) {
    optionsRef.value = [{ label: '县级', value: 4 }]
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', () => autoHeight(), false)
})
</script>

<style lang="scss" scoped>
.mainBoxTable {
  width: calc(100% - 26px);
  margin-left: 13px;
  height: calc(100% - 60px);
  margin-bottom: 6px;
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
  color: #4083e7;
}
.task_mc {
  // margin-left: 20px;
  cursor: pointer;
  color: var(--theme-dep-color)
}
</style>
