<template>
  <div class="taskBuild">
    <div class="mainBox">
      <div class="tableBox commomElTab">
        <el-tabs v-model="activeName">
          <el-tab-pane :label="lev == 1 ? '任务统计' : '国家级'" name="first">
            <el-button type="primary" size="small" class="close" v-if="lev == 1" @click="jumpAdd"
              >新增</el-button
            >
            <el-button type="primary" size="small" class="batch" v-if="lev == 1" @click="someDelete"
              >删除</el-button
            >
            <tableGztj :dep_lev="1" @fun="getSelectSomeTable" ref="myChild"></tableGztj>
          </el-tab-pane>
          <el-tab-pane v-if="lev !== 1" label="省级" name="second">
            <el-button type="primary" size="small" class="close" v-if="lev == 2" @click="jumpAdd"
              >新增</el-button
            >
            <el-button type="primary" size="small" class="batch" v-if="lev == 2" @click="someDelete"
              >删除</el-button
            >
            <tableGztj :dep_lev="2" @fun="getSelectSomeTable" ref="myChild"></tableGztj>
          </el-tab-pane>
          <el-tab-pane v-if="lev !== 1 && lev !== 2" label="市级" name="third">
            <el-button type="primary" size="small" class="close" v-if="lev == 3" @click="jumpAdd"
              >新增</el-button
            >
            <el-button type="primary" size="small" class="batch" v-if="lev == 3" @click="someDelete"
              >删除</el-button
            >
            <tableGztj :dep_lev="3" @fun="getSelectSomeTable" ref="myChild"></tableGztj>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {  ref, nextTick, watch, onMounted,computed } from 'vue'
import router from '@/router'
import { userStore ,loadStore } from '@/store'
// import getAssetsFile from '@/utils/pub-use'
import { ElMessage ,ElMessageBox  } from 'element-plus'
import {  deleteMeetingDetail ,} from '@/api'
import tableGztj from './tableGztj.vue'

const user = userStore()
const UserInfo = user.userInfo
const activeName = ref('first')
const taskCode = ref('')
const taskName = ref('')
const routerName = ref('')
const searchKey = ref('')
const someUuid = ref()
const lev = ref(UserInfo.department.dep_lev)
const myChild = ref()
const selectSomeTable = ref([])

// 接收表格选中的数据
const getSelectSomeTable =(val)=> {
  selectSomeTable.value = val
}
// 批量删除
const someDelete= async()=> {
  if (selectSomeTable.value.length === 0) {
    ElMessage.warning('请先选中数据')
    return
  }
  ElMessageBox.confirm('您确认要删除吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      someUuid.value = selectSomeTable.value.map(item => {
        return item.task_uuid
      })
      let params = {
        uuids: someUuid.value
      }
      let res:any = await deleteMeetingDetail(params)
      if (res) {
        ElMessage.success('删除成功')
        myChild.value.getTaskList_list()
      }
    }).catch((err) => {
    })
}

const  jumpAdd = ()=> {
  router.push({name: 'WorkReportAdd'})
  // window.open(href.href, '_blank')
}

</script>

<style scoped lang="scss">
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
  background: #fff;
}
.batch {
  position: absolute;
  top: -45px;
  right: 11px;
  z-index: 10;
}
.close {
  position: absolute;
  top: -45px;
  right: 78px;
  z-index: 10;
}
</style>
