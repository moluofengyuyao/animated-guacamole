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
          min-width="40px"
          prop="id"
          label="序号"
        >
        </el-table-column>
        <el-table-column
          align="center"
          min-width="460px"
          show-overflow-tooltip
          prop="tittle"
          label="标题"
        >
          <template #default="{row,$index}">
            <span class="task_mc" @click="detail(row)">
              {{
              row.tittle
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          min-width="200px"
          prop="source"
          label="来源"
          align="center"
        >
        </el-table-column>

        <el-table-column
          min-width="120px"
          prop="public_at"
          label="发布时间"
          align="center"
        >
          <template #default="{row,$index}">
            <span v-if="row.notice_at">{{
              row.notice_at.substr(0, 10)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          min-width="160px"
          prop="public_jg_name"
          label="发布机构名称"
          align="center"
        >
        </el-table-column>
        <el-table-column
          min-width="160px"
          prop="see_count"
          label="浏览次数"
          align="center"
        >
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
    name: 'QuestionAnswerDetail',
    query: { uuid: row.uuid, type: 2 }
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