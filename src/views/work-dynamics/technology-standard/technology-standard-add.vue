<template>
  <div class="taskBuild">
    <div class="mainBox">
      <div class="tableBox commomElTab">
        <el-button
          type="primary"
          :disabled="!addSucRef"
          size="small"
          @click="submit"
          class="tab-new-submit-btn"
          >保存</el-button
        >
        <el-tabs v-model="activeNameRef">
          <el-tab-pane
            style="overflow-y: scroll"
            label="技术规范新增"
            name="first"
          >
            <!-- <el-row>
              <el-col class="elcol" :offset="5" :span="15">
                <div class="title">
                  <span>基本信息</span>
                  <div class="line"></div>
                  <div class="triangle-right1"></div>
                  <div class="triangle-right2"></div>
                </div>
              </el-col>
            </el-row> -->
            <el-row style="margin-top: 10px">
              <el-col class="elcol" :offset="5" :span="14">
                <el-form
                  ref="elFormRef"
                  size="small"
                  :rules="rulesRef"
                  label-position="right"
                  :model="formDataRef"
                  label-width="140px"
                >
                  <el-row>
                    <el-col class="elcol" :offset="0" :span="24">
                      <el-form-item
                        class="name"
                        label="技术规范名称:"
                        prop="plan_name"
                      >
                        <el-input
                          v-model="formDataRef.plan_name"
                          placeholder="请输入技术规范名称"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                    <!-- <el-row><el-col class="elcol" :offset="0" :span="24">
                      <el-form-item class="name" label="所属机构:" prop="jg_name">
                        <el-input v-model="formDataRef.jg_name" disabled></el-input>
                      </el-form-item>
                    </el-col></el-row> -->
                  <el-row>
                    <el-col class="elcol" :offset="0" :span="24">
                      <el-form-item class="name" label="编制单位:" prop="make_unit">
                        <el-input
                          v-model="formDataRef.make_unit"
                          placeholder="请输入编制单位"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                    <!-- <el-row><el-col class="elcol" :offset="0" :span="24">
                      <el-form-item class="name" label="版本:" prop="version">
                        <el-input v-model="formDataRef.version" placeholder="请输入版本"></el-input>
                      </el-form-item>
                    </el-col></el-row> -->
                  <el-row>
                    <el-col class="elcol" :offset="0" :span="24">
                      <el-form-item
                        class="name"
                        label="印发/上传时间:"
                        prop="print_at"
                      >
                        <el-date-picker
                          type="date"
                          class="eldate"
                          style="width: 100%"
                          placeholder="请选择印发/上传时间"
                          value-format="YYYY-MM-DD"
                          v-model="formDataRef.print_at"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                    <!-- <el-row><el-col class="elcol" :offset="0" :span="24">
                      <el-form-item class="name" label="文号:" prop="doc_num">
                        <el-input
                          v-model="formDataRef.doc_num"
                          placeholder="请输入文号"
                        ></el-input>
                      </el-form-item>
                    </el-col></el-row> -->
                  <el-row>
                    <el-col class="elcol" :offset="0" :span="24">
                      <el-form-item class="name" label="类型:" prop="tech_type">
                        <el-select
                          class="eldate"
                          style="width: 100%"
                          v-model="formDataRef.tech_type"
                          placeholder="请选择类型"
                        >
                          <el-option
                            v-for="item in optionsCateRef"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <!-- <el-row>
                    <el-col class="elcol" :offset="0" :span="24">
                      <el-form-item class="name" label="所属行业:" prop="in_hy">
                        <el-select
                          class="eldate"
                          style="width: 100%"
                          v-model="formDataRef.in_hy"
                          placeholder="请选择所属行业"
                        >
                          <el-option
                            v-for="item in optionsin_hyRef"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row> -->
                  <el-row>
                    <el-col class="elcol" :offset="0" :span="24">
                      <el-form-item
                        class="name"
                        label="印发单位:"
                        prop="print_unit"
                      >
                        <el-input
                          v-model="formDataRef.print_unit"
                          placeholder="请输入印发单位"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                    <!-- <el-row><el-col class="elcol" :offset="0" :span="24">
                      <el-form-item class="name" label="查看级别:" prop="lev">
                        <el-select
                          class="eldate"
                          style="width: 100%"
                          v-model="formDataRef.lev"
                          placeholder="请选择查看级别"
                        >
                          <el-option
                            v-for="item in optionsRef"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col></el-row> -->
                    <!-- <el-row><el-col class="elcol" :offset="0" :span="24">
                      <el-form-item class="name" label="所属普查机构名称:" prop="jg_name">
                        <el-input
                          v-model="formDataRef.jg_name"
                          placeholder="请输入所属普查机构名称"
                        ></el-input>
                      </el-form-item>
                    </el-col></el-row> -->
                    <!-- <el-row><el-col class="elcol" :offset="0" :span="24">
                      <el-form-item class="name" label="上传人员:" prop="up_user_name">
                        <el-input
                          v-model="formDataRef.up_user_name"
                          placeholder="请输入上传人员"
                        ></el-input>
                      </el-form-item>
                    </el-col></el-row> -->
                  <el-row>
                      <el-col class="elcol" :offset="0" :span="24">
                      <el-form-item label="摘要:" prop="remarks">
                        <div style="width:100%;">
                          <!-- 富文本编辑器-zyt -->
                          <QuillEditor ref="myQuillEditor" class="editer"
                              v-model:content="formDataRef.remarks"
                              :options="editorOptionRef"
                              contentType="html"
                              style="width: 100%;"
                            />	
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col class="elcol" :offset="0" :span="24">
                      <el-form-item
                        :class="{ 'name-upload': true }"
                        label="上传附件:"
                      >
                        <div>
                          <el-upload
                            class="upload-demo"
                            :action="`${actionUrlRef}/upload`"
                            :headers="{
                              token: tokenRef
                            }"
                            ref="upload"
                            :show-file-list="false"
                            :on-success="uploadfl"
                            :before-upload="beforeupload"
                          >
                            <el-button size="small" plain :icon="Upload"
                              >点击上传</el-button
                            >
                          </el-upload>
                          <!-- <div v-if="fileListRef && fileListRef.length" class="fileBox">
                            <div v-for="(v, ind) in fileListRef" :key="ind" class="fileItem">
                              <div class="clostBtn" @click="handleRemove(ind)">×</div>
                              <a :href="`${actionUrlRef}/${v}`">
                                <img src="@/assets/images/taskCenter/fileicon/zip.png" style="width: 125px" />
                                <p style="text-align: center; color: #959595">附件{{ ind + 1 }}</p>
                              </a>
                            </div>
                          </div> @click="zxyl(v.uuid, v.filename)" -->
                          <div class="file-list" v-if="fileListRef && fileListRef.length">
                            <div
                              v-for="(v, ind) in fileListRef"
                              :key="ind"
                              class="file-list-item"
                            >
                              <el-icon class="el-icon-paperclip"><Paperclip /></el-icon>
                              <span
                                :title="v.filename"
                                style="
                                    display: inline-block;
                                    width: 50%;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                    overflow: hidden;"
                                >{{ v.filename }}</span
                              >
                              <el-icon class="el-icon-delete" @click.stop="handleRemove(ind)"><Delete /></el-icon>
                              <span style="color: #c0c4cc"
                                >下载次数&nbsp;{{ v.dow_count }}</span
                              >
                            </div>
                          </div>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup name="TechnologyStandardAdd">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { delFile, addOverPlan, withFile } from '@/api'
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'
import { View, Upload, UploadFilled, Paperclip, Delete } from '@element-plus/icons-vue'
import { mime } from '../components/mime.js'

const router = useRouter()

const elFormRef = ref(null)

const loadingRef = ref(null)

const UserInfo = JSON.parse(decodeURIComponent(atob(sessionStorage.getItem('UserInfo'))))

//变量
const addSucRef = ref(true)
const rulesRef = ref({
  plan_name: [
    { required: true, message: '请输入技术规范名称', trigger: 'blur' }
  ],
  print_at: [
    { required: true, message: '请选择印发时间', trigger: 'change' }
  ],
  // in_hy: [
  //   { required: true, message: '请选择所属行业', trigger: 'change' }
  // ],
  // doc_num: [{ required: true, message: '请输入文号', trigger: 'blur' }],
  print_unit: [
    { required: true, message: '请输入印发单位', trigger: 'blur' }
  ],
  make_unit: [
    { required: true, message: '请输入编制单位', trigger: 'blur' }
  ],
  version: [{ required: true, message: '请输入版本', trigger: 'blur' }],
  // lev: [{ required: true, message: "请选择查看级别", trigger: "change" }],
  tech_type: [
    { required: true, message: '请选择类型', trigger: 'change' }
  ],
  // jg_name: [{ required: true, message: "请输入所属普查机构名称", trigger: "blur" }],
  // up_user_name: [{ required: true, message: "请输入上传人员", trigger: "blur" }],
  date1: [
    {
      type: 'date',
      required: true,
      message: '请选择日期',
      trigger: 'change'
    }
  ]
})
const tokenRef = ref(sessionStorage.getItem('access_token'))
const fileListRef = ref([])
const actionUrlRef = ref(`${baseUrl[ENV]['fileUrl']}`)
const optionsCateRef = ref([
  { label: '调查', value: 1 },
  { label: '区划评估', value: 2 }
])
// const optionsin_hyRef = ref([
//   { label: '普查办', value: 0 },
//   { label: '应急管理', value: 1 },
//   { label: '生态环境', value: 2 },
//   { label: '交通运输', value: 3 },
//   { label: '海洋', value: 4 },
//   { label: '住建', value: 5 },
//   { label: '水利', value: 6 },
//   { label: '气象', value: 7 },
//   { label: '林草', value: 8 },
//   { label: '地震', value: 9 },
//   { label: '地质', value: 10 }
// ])
const optionsRef = ref([
  { label: '国家', value: 1 },
  { label: '省级', value: 2 },
  { label: '市级', value: 3 },
  { label: '县级', value: 4 }
])
const activeNameRef = ref('first')
const formDataRef = ref({
  jg_id: UserInfo.user.dep_id,
  jg_name: UserInfo.department.dep_name,
  lev: 1,
  remarks:''
})
const editorOptionRef = ref({
  placeholder: '请输入摘要',
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

// 方法
const zxyl = (fileuuid, filename) => {
  var originUrl =
    actionUrlRef.value +
    '/file/downFile?fileuuid=' +
    fileuuid +
    '&token=' +
    tokenRef.value
  var previewUrl = originUrl + '&fullfilename=' + filename
  window.open(CONFIG.yulan + '?url=' + encodeURIComponent(previewUrl))
}

const uploadfl = (response, file) => {
  if (response && response.code == '1') {
    fileListRef.value.push({
      filename: response.data[0].filename,
      dow_count: response.data[0].dow_count,
      uuid: response.data[0].uuid,
      ext: response.data[0].ext,
      filename: response.data[0].filename
    })
    nextTick(() => {
      // 以服务的方式调用的 Loading 需要异步关闭
      loadingRef.value.close()
    })
    ElMessage.success('文件上传成功')
  } else {
    nextTick(() => {
      // 以服务的方式调用的 Loading 需要异步关闭
      loadingRef.value.close()
    })
    ElMessage.error('文件上传失败')
  }
}

const beforeupload = (file) => {
  let filename = file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
  // let fileCate = ["jpg", "jpeg", "png", "gif", "bmp", "pdf", "ppt", "txt", "doc", "docx", "xls", "xlsx", "pptx", "mpeg", "3gp", "mp4", "avi", "flv", "zip", "rar", "7z", "bz2", "gz"];

  const isLt2M = file.size / 1024 / 1024 <= 1000

  if (!mime[filename]) {
    ElMessage.error('上传文件不符合格式!')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('上传文件大小不能超过 1GB!')
    return false
  }
  loadingRef.value = ElLoading.service({
    text: '正在上传中...'
  })
}

const handleRemove = (index) => {
  ElMessageBox.confirm('此操作将删除任务, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      delFile({ fileuuid: fileListRef.value[index].uuid, plantype: 3 })
    .then(res => {
      if (res!=null) {
        fileListRef.value.splice(index, 1)
        ElMessage.success('文件删除成功')
      } else {
        ElMessage.error('服务器出错，请稍后重试')
      }
    })
    })
    .catch(() => {
      ElMessage.info('已取消删除')
    })

}

const submit = () => {
  elFormRef.value.validate(valid => {
    if (valid) {
      addOverPlanFunction()
    } else {
      ElMessage.error('验证不通过，请按要求填写')
      return false
    }
  })
}

const addOverPlanFunction = async () => {
  if (fileListRef.value && fileListRef.value.length == 0) {
    ElMessage.error('附件为必填项，上传后才能提交')
    return
  }
  formDataRef.value.plantype = '3'
  formDataRef.value.lev_hy = [{ lev_hy: 11, lev_qh: 4, lev_code: '0' }]
  loadingRef.value = ElLoading.service({
    text: '正在保存中...'
  })
  addSucRef.value = false
  let res = await addOverPlan(formDataRef.value)
  if (res!=null) {
    let fileData = []
    if (fileListRef.value.length > 0) {
      fileListRef.value.forEach(item => {
        fileData.push(item.uuid)
      })
      let fileuuid = fileData.join(',')
      let res1 = await withFile({
        planuuid: res[0].uuid,
        fileuuid: fileuuid,
        plantype: '3'
      })
    }
    // addSucRef.value = true
    nextTick(() => {
      // 以服务的方式调用的 Loading 需要异步关闭
      loadingRef.value.close()
    })
    ElMessage.success('新增技术方案成功')
    router.push({
      name: 'TechnologyStandardDetail',
      query: { uuid: res[0].uuid }
    })
  } else {
    nextTick(() => {
      // 以服务的方式调用的 Loading 需要异步关闭
      loadingRef.value.close()
    })
    ElMessage.error('服务器出错，请稍后重试')
  }
}

onMounted(() => {
  let lev = UserInfo.department.dep_lev
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
</script>

<style lang="scss" scoped>
// .fileBox {
//   .fileItem {
//     width: 125px;
//     height: 125px;
//     padding: 0;
//     position: relative;
//     display: inline-block;
//     .clostBtn {
//       position: absolute;
//       right: 5px;
//       top: 10px;
//       width: 20px;
//       height: 20px;
//       background: #fff;
//       color: #000;
//       font-size: 18px;
//       border-radius: 10px;
//       text-align: center;
//       line-height: 20px;
//       cursor: pointer;
//     }
//   }
// }
</style>
