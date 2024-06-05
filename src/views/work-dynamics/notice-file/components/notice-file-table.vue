<!--
 * @Author: zhuangyating 2114380985@qq.com
 * @Date: 2024-05-21 20:31:08
 * @LastEditors: zhuangyating 2114380985@qq.com
 * @LastEditTime: 2024-05-27 10:57:45
 * @FilePath: \cth-ddgl-web\src\views\work-dynamics\notice-file\components\notice-file-table.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="mainBoxTable taskExecuteTable">
    <!-- 表格部分 -->
    <div class="tableBox commomElementTable">
      <el-table
        ref="tableRef"
        :data="tableData"
        style="width: 100%"
        :height="tableHeightRef"
      >
        <el-table-column
          min-width="360px"
          show-overflow-tooltip
          prop="notice_name"
          label="名称"
        >
          <template #default="{row,$index}">
            <span class="task_mc" @click="detail(row)">{{
              row.notice_name
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="140px"
          prop="type"
          label="类型"
        >
          <template #default="{row,$index}">
            <span>{{
              row.type === 1
                ? '工作通知'
                : row.type === 2
                ? '情况通报'
                : row.type === 3
                ? '工作方案'
                : '——'
            }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          min-width="200px"
          prop="doc_num"
          label="文号"
          align="center"
        >
        </el-table-column> -->

        <el-table-column
          min-width="160px"
          prop="iss_unit"
          label="发布单位"
          align="center"
        >
        </el-table-column>
        <el-table-column
          min-width="120px"
          prop="notice_at"
          label="发布时间"
          align="center"
        >
          <template #default="{row,$index}">
            <span v-if="row.notice_at">{{
              row.notice_at.substr(0, 10)
            }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  tableData: {
    type: Array
  }
});
const emit = defineEmits(['updateData'])

const tableRef = ref(null)
const tableHeightRef = ref(800)
const optionsRef = ref([
  // { label: '会议/培训通知', value: 1 },
  // { label: '工作通知', value: 2 },
  // { label: '征求意见', value: 3 },
  // { label: '情况通报', value: 4 },
  { label: '工作通知', value: 1 },
  { label: '情况通报', value: 2 },
  { label: '工作方案', value: 3 }
])

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
    name: 'NoticeFileDetail',
    query: { uuid: row.uuid }
  })
  window.open(href.href, '_blank')
  emit('updateData', null)
}

onMounted(() => {
  autoHeight()
  window.addEventListener('resize', () => autoHeight(), false)
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
  cursor: pointer;
  color: var(--theme-dep-color)
}
</style>
