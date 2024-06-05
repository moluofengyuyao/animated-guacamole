<template>
  <div class="taskBuild">
    <div class="mainBox">
      <div class="tableBox commomElTab">
        <el-button type="primary" :disabled="addSuc" size="small" @click="submit" class="del"
          >保存</el-button
        >
        <el-tabs v-model="activeName">
          <el-tab-pane style="overflow-y: scroll" label="创建任务信息" name="first">
            <el-row style="margin-top: 10px">
              <el-form
                ref="formRef"
                size="small"
                label-position="right"
                :rules="rules"
                :model="form"
                label-width="140px"
              >
                <el-col class="elcol" :offset="5" :span="14">
                  <el-form-item class="name" prop="task_na" label="任务名称:">
                    <el-input v-model="form.task_na" placeholder="请输入任务名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="5" :span="14">
                  <el-form-item class="name" label="任务时间:" prop="task_time">
                    <el-date-picker
                      format="YYYY-MM-DD hh:mm:ss"
                      value-format="YYYY-MM-DD hh:mm:ss"
                      v-model="form.task_time"
                      class="eldate"
                      style="width: 100%"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      placeholder="请选择任务时间"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-row>
                  <el-col class="elcol" :offset="5" :span="10">
                    <el-form-item class="name name-upload" label="下发级别:" prop="lev">
                      <template v-for="item in optionsJb" :key="item.value">
                        <el-radio
                          v-show="
                            lev == 1
                              ? item.label != '国家'
                              : lev == 2
                              ? item.label != '国家' && item.label != '省级'
                              : item.label != '国家' && item.label != '省级' && item.label != '市级'
                          "
                          v-model="radioObj[item.name]"
                          @click.native="radio0Click(item.name, item.value)"
                          :value="item.value"
                          >{{ item.label }}</el-radio
                        >
                      </template>
                    </el-form-item>

                  </el-col>
                  <el-col :span="4">
                    <el-form-item
                      v-if="checkXfhyVis"
                      class="name name-upload"
                      label-width="90px"
                      label="下发行业:"
                      prop="dep_type"
                    >
                      <el-select
                        class="eldate"
                        style="width: 100%"
                        clearable
                        v-model="form.dep_type"
                        placeholder="请选择下发行业"
                      >
                        <el-option
                          v-for="item in optionshy"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-col v-if="lev == 1" class="elcol" :offset="5" :span="14">
                  <el-form-item class="name" label="下发省份:">
                    <el-select
                      class="eldate"
                      style="width: 100%"
                      multiple
                      collapse-tags
                      v-model="form.include_code"
                      placeholder="请选择下发省份"
                    >
                      <el-option
                        v-for="item in optionsSheng"
                        :key="item.value"
                        :label="item.code_name"
                        :value="item.simcode"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="5" :span="14">
                  <el-form-item
                    class="name name-upload"
                    prop="need_materials"
                    label="填写附件材料信息:"
                  >
                    <div class="filesLists">
                      <template v-if="metFileLists.length != 0">
                        <div
                          class="filesLists-con"
                          v-for="(item, index) in metFileLists"
                          :key="item.usetype"
                        >
                          <span :title="item.materials_name">{{ item.materials_name }}</span>
                          <div class="edit-img">
                            <el-icon title="编辑" @click="editFile(index)"><Edit /></el-icon>
                            <el-icon title="新增" @click="addMtgFile" v-if="index == metFileLists.length - 1"><CirclePlusFilled /></el-icon>
                            <el-icon title="删除" @click="deleteFile(index)"  v-if="index != 0"><DeleteFilled /></el-icon>
                          </div>
                        </div>
                      </template>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="5" :span="14">
                  <el-form-item label="任务内容:">
                    <div class="formItem">
                      <div class="content">
                        <quill-editor
                          v-model="form.task_details"
                          ref="myQuillEditor"
                          class="editer"
                          style="width: 100%"
                          :options="editorOption"
                        >
                        </quill-editor>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="5" :span="14">
                  <el-form-item label="工作要求:">
                    <div class="formItem">
                      <div class="content">
                        <quill-editor
                          v-model="form.ask"
                          ref="myQuillEditor"
                          class="editer"
                          style="width: 100%"
                          :options="editorOption"
                        >
                        </quill-editor>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <!-- <el-col class="elcol" :offset="5" :span="6">
                  <el-form-item class="name" label="收集附件:" prop="need_annex">
                    <el-radio-group v-model="form.need_annex">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col v-if="form.need_annex" class="elcol" :span="8">
                  <el-form-item class="name" label-width="80px" label="附件类型:" prop="doc_type">
                    <el-select
                      class="eldate"
                      style="width: 100%"
                      multiple
                      collapse-tags
                      clearable
                      v-model="form.doc_type"
                      placeholder="请选择附件类型"
                    >
                      <el-option
                        v-for="item in optionsFile"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col> -->
                <el-col class="elcol" :offset="5" :span="14">
                  <el-form-item label="备注说明:">
                    <div class="formItem">
                      <div class="content">
                        <quill-editor
                          v-model="form.remarks"
                          ref="myQuillEditor"
                          class="editer"
                          style="width: 100%"
                          :options="editorOption"
                        >
                        </quill-editor>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="5" :span="14">
                  <el-form-item label="上传附件:">
                    <div>
                      <el-upload
                        class="upload-demo"
                        :action="`${actionUrl}/upload`"
                        :headers="{
                          token: token
                        }"
                        ref="upload"
                        :show-file-list="false"
                        :on-success="uploadfl"
                        :before-upload="beforeupload"
                        :on-error="onError"
                      >
                        <el-button size="small" plain>点击上传</el-button>
                      </el-upload>
                      <!-- <div v-if="fileList && fileList.length" class="fileBox">
                        <div v-for="(v, ind) in fileList" :key="ind" class="fileItem">
                          <div class="clostBtn" @click="handleRemove(ind)">×</div>
                          <a :href="`${actionUrl}/${v}`">
                            <img src="@/assets/images/taskCenter/fileicon/zip.png" style="width: 125px" />
                            <p style="text-align: center; color: #959595">附件{{ ind + 1 }}</p>
                          </a>
                        </div>
                      </div> @click="zxyl(v.uuid, v.filename)" -->
                      <div class="file-list" v-if="fileList && fileList.length">
                        <div v-for="(v, ind) in fileList" :key="ind" class="file-list-item">
                          <i class="el-icon-paperclip"></i>
                          <span
                            :title="v.filename"
                            style="
                                display: inline-block;
                                width: 50%;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                overflow: hidden;"
                            >{{ v.filename }}</span
                          ><i @click.stop="handleRemove(ind)" class="el-icon-delete"></i
                          ><span style="color: #c0c4cc">下载次数&nbsp;{{ v.dow_count }}</span>
                        </div>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-row>
          </el-tab-pane>
        </el-tabs>
        <el-dialog
          class="huiyi-file"
          title="会议材料信息"
          :close-on-click-modal="false"
          v-model="fileVisable"
          top="30vh"
          width="60%"
        >
          <div style="padding:20px">
            <el-form size="small" label-position="right" :model="metFileForm" label-width="140px">
              <el-row>
                <el-col class="elcol" :offset="2" :span="20">
                  <el-form-item
                    class="name name-upload"
                    prop="materials_name"
                    label="附件材料名称:"
                  >
                    <el-input
                      v-model="metFileForm.materials_name"
                      placeholder="附件材料名称"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="2" :span="20">
                  <el-form-item
                    style="margin-left:-20px"
                    label-width="160px"
                    class="name name-upload"
                    prop="sheng"
                    label="需要上传材料的省份:"
                  >
                    <el-select
                      class="eldate"
                      style="width: 100%"
                      multiple
                      collapse-tags
                      v-model="metFileForm.sheng"
                      placeholder="请选择需要上传材料的省份"
                    >
                      <el-option
                        v-for="item in optionsSheng"
                        :key="item.value"
                        :label="item.code_name"
                        :value="item.simcode"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col class="elcol" :offset="2" :span="20">
                  <el-form-item
                    class="name name-upload"
                    label="上传材料的格式:"
                    prop="materials_type"
                  >
                    <el-select
                      class="eldate"
                      style="width: 100%"
                      multiple
                      collapse-tags
                      clearable
                      v-model="metFileForm.materials_type"
                      placeholder="请选择附件类型"
                    >
                      <el-option
                        v-for="item in optionsFile"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <template #footer>
            <el-button size="small" @click="closeFile">取 消</el-button>
            <el-button size="small" type="primary" @click="pushFile">确 定</el-button>
          </template>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, nextTick, watch, onMounted,computed } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.core.css'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import dayjs from 'dayjs'
import router from '@/router'
import { mime } from '@/utils/mime.js'
import { userStore ,loadStore } from '@/store'
import {  withFile ,regionData ,reportMeetingDetail ,delFile,editMeetingDetail,editMeetingDetailGj,getWithFile ,taskWorkAdd} from '@/api'
import { ElMessage ,ElMessageBox  } from 'element-plus'
import { DeleteFilled,CirclePlusFilled,Edit} from '@element-plus/icons-vue' // 引入 Edit 这个 svg组件
const user = userStore()
const useLoad = loadStore()
const UserInfo = user.userInfo

const selectLen = ref(0)
const isQbtp = ref(false)
const isQb = ref(false)
const isQbs = ref(false)
const fileVisable = ref(false)
const editFileIndex = ref(null)
const metFileLists = ref([
  {
    materials_name: '',
    sheng: [],
    materials_type: [],
    usetype: 2
  }
])
const metFileForm = ref({
  materials_type: [],
  sheng: []
})
const optionsSheng = ref([])
const countRadio = ref(1)
const radioObj = ref({
  radio1: null,
  radio2: null,
  radio3: null,
  radio4: null,
  radio5: null
})
const addSuc = ref(false)
const pcfaName = ref(null)
const rules = ref({
  task_na: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
  task_time: [{ required: true, message: '请选择任务时间', trigger: 'change' }]
  // need_annex: [{ required: true, message: '请选择是否收集附件', trigger: 'change' }]
})
const token  = sessionStorage.getItem('access_token')
const fileList = ref([])
const actionUrl = ref(baseUrl[ENV]['fileUrl'])
const optionsJb = ref([])
const optionshy = ref([
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
      ])
const activeName = ref('first')
const optionsFile = ref([
        { label: '全部', value: '.all' },
        { label: '.zip', value: '.zip' },
        { label: '.rar', value: '.rar' },
        { label: '.jpg', value: '.jpg' },
        { label: '.jpeg', value: '.jpeg' },
        { label: '.png', value: '.png' },
        { label: '.bmp', value: '.bmp' },
        { label: '.docx', value: '.docx' },
        { label: '.doc', value: '.doc' },
        { label: '.xls', value: '.xls' },
        { label: '.xlsx', value: '.xlsx' },
        { label: '.pdf', value: '.pdf' },
        { label: '.ppt', value: '.ppt' },
        { label: '.pptx', value: '.pptx' },
        { label: '.mp4', value: '.mp4' }
      ])
const form = ref({
  include_lev: [],
  materials_type: [],
  sheng: []
})
const editorOption = ref({
        placeholder: '请输入',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: 'ordered' }, { list: 'bullet' }], // 列表
            [{ script: 'sub' }, { script: 'super' }], // 上下标
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            [{ direction: 'rtl' }], // 文本方向
            [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 几级标题
            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], // 字体
            [{ align: [] }], // 对齐方式
            ['clean'] // 清除字体样式
          ]
        }
      })
const formRef = ref(null)
const checkXfhyVis = ref(false)
const level = ref(UserInfo)
const lev = ref(UserInfo.department.dep_lev)

// 监听
watch(
  () => form.value.include_lev,
  (newVal, oldVal) => {
    checkXfhy()
  },
  {deep: true}
)
watch(
   () => form.value.include_code,
   (newVal, oldVal) => {
      if (!isQbs.value) {
        if (newVal[newVal.length - 1] == 'qb' && newVal.length <= selectLen.value) {
          let arr = []
          optionsSheng.value.forEach(item => {
            if (item.simcode != 'qb') {
              arr.push(item.simcode)
            }
          })
          form.value.include_code = arr
          isQbs.value = true
        } else if (newVal[newVal.length - 1] == 'qb') {
          form.value.include_code = []
          isQbs.value = false
        }
      } else {
        if (newVal[newVal.length - 1] == 'qb') {
          form.value.include_code = []
          isQbs.value = false
        } else {
          isQbs.value = false
        }
      }
  }, {
  deep: true
})
watch(
   () => metFileForm.value.sheng,
  (newVal, oldVal) => {
      console.log(selectLen.value)
      if (!isQb.value) {
        if (newVal[newVal.length - 1] == 'qb' && newVal.length <= selectLen.value) {
          let arr = []
          optionsSheng.value.forEach(item => {
            if (item.simcode != 'qb') {
              arr.push(item.simcode)
            }
          })
          metFileForm.value.sheng = arr
          isQb.value = true
        } else if (newVal[newVal.length - 1] == 'qb') {
          metFileForm.value.sheng = []
          isQb.value = false
        }
      } else {
        if (newVal[newVal.length - 1] == 'qb') {
          metFileForm.value.sheng = []
          isQb.value = false
        } else {
          isQb.value = false
        }
      }
}, {
  deep: true
})

watch(
   () => metFileForm.value.materials_type,
(newVal, oldVal) => {
      if (!isQbtp.value) {
        if (newVal[newVal.length - 1] == '.all' && newVal.length <= 14) {
          let arr = []
          optionsFile.value.forEach(item => {
            if (item.value != '.all') {
              arr.push(item.value)
            }
          })
          metFileForm.value.materials_type = arr
          isQbtp.value = true
        } else if (newVal[newVal.length - 1] == '.all') {
          metFileForm.value.materials_type = []
          isQbtp.value = false
        }
      } else {
        if (newVal[newVal.length - 1] == '.all') {
          metFileForm.value.materials_type = []
          isQbtp.value = false
        } else {
          isQbtp.value = false
        }
      }
}, {deep: true}
)

const getTreeData = async()=> {
  let res:any = await regionData({ simcode: UserInfo.department.simcode })
  if(res){
        let data = JSON.parse(JSON.stringify(res))
        selectLen.value = data.length
        res.unshift({ simcode: 'qb', code_name: '全部' })
        optionsSheng.value = res
  }
}
const closeFile= async()=> {
    fileVisable.value = false
}
const deleteFile= async(index)=> {
  ElMessageBox.confirm('您确认要删除此会议材料的相关信息吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        metFileLists.value.splice(index, 1)
        ElMessage({
          type: 'success',
          message: '删除成功!'
        })
      })
      .catch(() => {})
}
const pushFile= async()=> {
  if (!metFileForm.value.materials_name) {
    ElMessage({
      type: 'error',
      message: '请填写会议材料名称'
    })
    return
  }
  if (!metFileForm.value.sheng.length) {
    ElMessage({
      type: 'error',
      message: '请选择需要上传材料的省份'
    })
    return
  }
  if (!metFileForm.value.materials_type.length) {
    ElMessage({
      type: 'error',
      message: '请选择上传材料的格式'
    })
    return
  }
  let obj = {}
  for (const key in metFileForm.value) {
    if (key !== 'materials_name') {
      obj[key] = JSON.parse(JSON.stringify(metFileForm.value[key]))
    } else {
      obj[key] = metFileForm.value[key]
    }
  }
  metFileLists.value[editFileIndex.value] = obj
  fileVisable.value = false
}
const addMtgFile= async()=> {
  let obj = (() => {
    return {
      materials_name: '',
      sheng: [],
      materials_type: [],
      usetype: metFileLists.value.length + 2
    }
  })()
  metFileLists.value.push(obj)
}
const editFile= async(index)=> {
  editFileIndex.value = index
  let obj = {}
  for (const key in metFileLists.value[index]) {
    if (key !== 'materials_name') {
      obj[key] = JSON.parse(JSON.stringify(metFileLists.value[index][key]))
    } else {
      obj[key] = metFileLists.value[index][key]
    }
  }
  metFileForm.value = obj
  fileVisable.value = true
}
const checkXfhy= async()=> {
  if (
    form.value.include_lev &&
    form.value.include_lev.length == 1 &&
    form.value.include_lev[0] == 1
  ) {
    return (checkXfhyVis.value = false)
  } else if (
    form.value.include_lev &&
    form.value.include_lev.length == 1 &&
    form.value.include_lev[0] != 1
  ) {
    return (checkXfhyVis.value = true)
  } else if (form.value.include_lev && form.value.include_lev.length > 1) {
    return (checkXfhyVis.value = true)
  } else if (form.value.include_lev && form.value.include_lev.length == 0) {
    return (checkXfhyVis.value = false)
  }
}
const radio0Click = computed(()=>(name, val)=> {
  // debugger
  if (countRadio.value < 2) {
    countRadio.value += 1
  } else {
    if (radioObj.value[name]) {
      radioObj.value[name] = ''
    } else {
      for (const key in radioObj.value) {
        radioObj.value[key] = null
      }

      if (!val) {
        form.value.include_lev = []
      } else {
        for (let index = 1; index < 6; index++) {
          if (index <= val) {
            radioObj.value['radio' + index] = index
          }
        }
      }
    }

    countRadio.value = 1

    let arr = Object.values(radioObj.value)
    let levArr = []
    arr.forEach(v => {
      if (v != null && v != '') {
        levArr.push(v)
      }
    })
    if (levArr.length != 0) {
      levArr.sort((a, b) => a - b)
      form.value.include_lev = levArr
    }
    console.log(form.value.include_lev)
  }
}
)
const uploadfl= async(response, file)=> {
  if (response && response.code == '1') {
    fileList.value.push({
      filename: response.data[0].filename,
      dow_count: response.data[0].dow_count,
      uuid: response.data[0].uuid,
      ext: response.data[0].ext,
      // filename: response.data[0].filename,
      enable: response.data[0].enable
    })
    ElMessage({
      type: 'success',
      message: '文件上传成功'
    })
  } else {
    ElMessage({
      type: 'error',
      message: '文件上传失败'
    })
  }
  useLoad.spinState = false
}
const beforeupload =(file)=> {
  let filename = file.name.slice(file.name.lastIndexOf('.')).toLowerCase()

  const isLt2M = file.size / 1024 / 1024 <= 1000
  if (!mime[filename]) {
    ElMessage.error('上传文件不符合格式!')
    return false
  }

  if (!isLt2M) {
    ElMessage.error('上传文件大小不能超过 1GB!')
    return false
  }
  useLoad.spinState = true
}
const onError =(err, file, fileList)=> {
  ElMessage({
    type: 'error',
    message: '文件上传失败'
  })
  useLoad.spinState = false
}
const handleRemove =(index) =>{
  ElMessageBox.confirm('您确认删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    
    let res:any = delFile(data)({ fileuuid: fileList.value[index].uuid, plantype: 41 })
      
    if (res) {
      fileList.value.splice(index, 1)
      ElMessage({
        type: 'success',
        message: '文件删除成功'
      })
    } else {
      ElMessage({
        type: 'error',
        message: '服务器出错，请稍后重试'
      })
    }
  })
  .catch(() => {})
}
const submit =()=> {
  formRef.value.validate(valid => {
    if (valid) {
      addOverPlan()
    } else {
      ElMessage({
        type: 'error',
        message: '验证不通过，请按要求填写'
      })
      return false
    }
  })
}
const addOverPlan= async()=> {
  form.value.include_lev.length == 1 &&
    form.value.include_lev[0] == 1 &&
    (form.value.include_lev = [])
  if (!((form.value.dep_type >= 0 || form.value.dep_type == -1) && form.value.dep_type !== '')) {
    if (form.value.include_lev.length != 0) {
      ElMessage({
        type: 'error',
        message: '下发级别与下发行业为必填项,且必须同时填写'
      })
      return
    } // 排除选择无
  }
  for (let index = 0; index < metFileLists.value.length; index++) {
    const item = metFileLists.value[index]
    for (const key in item) {
      const element = item[key]
      if (key === 'materials_name' && !element) {
        ElMessage({
          type: 'error',
          message: '请把材料的相关信息填写完整。'
        })
        return
      } else if (key !== 'usetype') {
        if (!element.length) {
          ElMessage({
            type: 'error',
            message: '请把材料的相关信息填写完整。'
          })
          return
        }
      }
    }
  }
  form.value.materials_data = metFileLists.value
  form.value.type = 1
  form.value.dep_type = UserInfo.department.dep_type
  form.value.start_at = form.value.task_time[0]
  form.value.end_at = form.value.task_time[1]
  if (UserInfo.department.dep_lev == 2) {
    form.value.include_lev = form.value.include_lev.filter(item => item != 1)
  }
  if (UserInfo.department.dep_lev == 3) {
    form.value.include_lev = form.value.include_lev.filter(item => ![1, 2].includes(item))
  }
  useLoad.spinState = true
  addSuc.value = true
  let res = await taskWorkAdd(form.value)
  if (res) {
    let fileData = []
    if (fileList.value && fileList.value.length > 0) {
      fileList.value.forEach(item => {
        fileData.push(item.uuid)
      })
      let fileuuid = fileData.join(',')
      await withFile({
        planuuid: res.uuid,
        fileuuid: fileuuid,
        plantype: 41
      })
    }
    router.push({
      name: 'WorkReportEdit',
      query: {
        task_uuid: res.uuid,
        edits: 0,
        id: 6,
        isShowg: 1
      }
    })
    ElMessage({
      type: 'success',
      message: '新增任务成功'
    })
  } else {
    ElMessage({
      type: 'error',
      message: '服务器出错，请稍后重试'
    })
  }
  addSuc.value = false
  useLoad.spinState = false
}
onMounted(()=>{
  getTreeData()
  let lev = UserInfo.department.dep_lev
  const type = UserInfo.department.dep_type

  if (type != 0) {
    optionshy.value = [optionshy.value.find(val => val.value == type)]
  }
  optionshy.value = optionshy.value.filter(val => val.value !== 1)
  if (lev == 1) {
    optionsJb.value = [
      { label: '国家', value: 1, name: 'radio1' },
      { label: '省级', value: 2, name: 'radio2' },
      { label: '市级', value: 3, name: 'radio3' },
      { label: '县级', value: 4, name: 'radio4' },
      { label: '无', value: '', name: 'radio5' }
    ]
  } else if (lev == 2) {
    optionsJb.value = [
      { label: '省级', value: 2, name: 'radio2' },
      { label: '市级', value: 3, name: 'radio3' },
      { label: '县级', value: 4, name: 'radio4' },
      { label: '无', value: '', name: 'radio5' }
    ]
  } else if (lev == 3) {
    optionsJb.value = [
      { label: '市级', value: 3, name: 'radio3' },
      { label: '县级', value: 4, name: 'radio4' },
      { label: '无', value: '', name: 'radio5' }
    ]
  } else if (lev == 4) {
    optionsJb.value = [
      { label: '县级', value: 4, name: 'radio4' },
      { label: '无', value: '', name: 'radio5' }
    ]
  }

})
</script>

<style lang="scss" scoped>
.filesLists {
  width: 100%;
  .filesLists-con + .filesLists-con {
    margin-top: 12px;
  }
  .filesLists-con {
    width: 100%;
    display: flex;
    span {
      width: 360px;
      // min-width: 50px;
      // max-width: 360px;
      color: var(--theme-color);
      border-bottom: 1px solid var(--theme-color);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .edit-img {
      width: 100px;
      margin-left: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--theme-color);
      i {
        font-size: 23px;
        cursor: pointer;
        // width: 23px;
        // height: 23px;
      }
    }
  }
}
.file-list {
  width: 70%;
  overflow: hidden;
  .file-list-item:hover {
    background-color: #e5f7ff;
    cursor: pointer;
    border-radius: 4px;
  }
  .file-list-item {
    float: left;
    width: 100%;
    height: 30px;
    padding: 2px 4px;
    line-height: 32px;
    color: #5f5f5f;
    span:nth-of-type(1) {
      padding-left: 10px;
    }
    span:nth-of-type(2) {
      float: right;
      padding-right: 10px;
    }
    .el-icon-delete {
      float: right;
      line-height: 32px;
      color: #5f5f5f;
    }
    .el-icon-upload {
      float: right;
      line-height: 32px;
      color: #5f5f5f;
      font-size: 18px;
    }
    .el-icon-paperclip {
      float: left;
      line-height: 32px;
      color: #5f5f5f;
    }
  }
}
.fileBox {
  .fileItem {
    width: 125px;
    height: 125px;
    padding: 0;
    position: relative;
    display: inline-block;
    .clostBtn {
      position: absolute;
      right: 5px;
      top: 10px;
      width: 20px;
      height: 20px;
      background: #fff;
      color: #000;
      font-size: 18px;
      border-radius: 10px;
      text-align: center;
      line-height: 20px;
      cursor: pointer;
    }
  }
}
.formItem {
  width: 100%;
  font-size: 14px;
  font-family: Source Han Sans CN Regular, Source Han Sans CN Regular-Regular;
  font-weight: 400;
  color: #686767;
  .content {
    width: 100%;
    line-height: 30px;
    position: relative;
  }
}
.elcol {
  padding-top: 10px;
  .sLabel {
    height: 36px;
    display: inline-block;
    line-height: 36px;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 2px solid var(--theme-color);
  }
  .name {
    .date-title {
      vertical-align: top;
      line-height: normal;
      display: inline-table;
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      position: relative;
      font-size: 14px;
      .eldate {
        width: 100%;
        .el-input__inner {
          width: 100%;
          vertical-align: middle;
          display: table-cell;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
      }
      .prepend {
        background-color: #f5f7fa;
        color: #909399;
        vertical-align: middle;
        display: table-cell;
        position: relative;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        padding: 0 20px;
        width: 1px;
        white-space: nowrap;
        border-right: 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
  }

  .title {
    width: 100%;
    height: 23px;
    border-left: 4px solid var(--theme-color);
    position: relative;
    span {
      font-size: 14px;
      font-weight: 400;
      line-height: 23px;
      color: var(--theme-color);
      margin-left: 8px;
    }
    .line {
      width: calc(100% - 78px);
      height: 1px;
      background-color: #e0e2e8;
      position: absolute;
      top: 11px;
      left: 68px;
    }
    .triangle-right1 {
      width: 0;
      height: 0;
      border-top: 3px solid transparent;
      border-bottom: 4px solid transparent;
      border-left: 4px solid var(--theme-color);
      position: absolute;
      right: 5px;
      top: 7px;
      z-index: 2;
    }
    .triangle-right2 {
      width: 0;
      height: 0;
      border-top: 5px solid transparent;
      border-bottom: 6px solid transparent;
      border-left: 6px solid #e0e2e8;
      position: absolute;
      right: 0;
      top: 5px;
    }
  }
}

.del {
  position: absolute;
  top: 11px;
  right: 11px;
  z-index: 10;
}

.taskBuild {
  position: absolute;
  bottom: 0;
  right: 0;
  top: 80px;
  background: var(--main-bg-color);
  width: calc(100% - 68px);
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
  width: 100%;
  height: 100%;
  flex: 1;
  margin-left: 13px;
  background: #fff;
  position: relative;
}

.choiseBox {
  position: absolute;
  right: 10px;
  /* width: 400px; */
  margin-top: 10px;
  display: flex;
}
.base {
  .el-tabs__content {
    overflow-y: scroll;
  }
}
.el-form-item__content{
  height: auto !important;
}
</style>
