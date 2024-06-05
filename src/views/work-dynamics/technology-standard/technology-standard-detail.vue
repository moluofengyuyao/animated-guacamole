<template>
  <div id="detailOverPlan">
    <div class="taskBuild">
      <div class="mainBox">
        <div class="tableBox commomElTab">
          <el-button
            type="primary"
            size="small"
            v-if="
              !editRef &&
                editIsShowRef &&
                roleIsShow('常态工作管理', '工作动态', '技术规范', '编辑')
            "
            class="close"
            @click="closeEdit"
            >取消</el-button
          >
          <el-button
            type="primary"
            size="small"
            v-if="
              editRef &&
                editIsShowRef &&
                roleIsShow('常态工作管理', '工作动态', '技术规范', '编辑')
            "
            class="stopUse"
            @click="editDom"
            >编辑</el-button
          >
          <el-button
            type="primary"
            size="small"
            v-if="
              !editRef &&
                editIsShowRef &&
                roleIsShow('常态工作管理', '工作动态', '技术规范', '编辑')
            "
            @click="submit"
            class="stopUse"
            >保存</el-button
          >
          <el-button
            v-if="
              formDataRef.enable &&
                editIsShowRef &&
                roleIsShow('常态工作管理', '工作动态', '技术规范', '禁用/启用')
            "
            type="info"
            size="small"
            class="editDom"
            @click="stopDom"
            >禁用</el-button
          >
          <el-button
            v-if="
              !formDataRef.enable &&
                editIsShowRef &&
                roleIsShow('常态工作管理', '工作动态', '技术规范', '禁用/启用')
            "
            type="primary"
            size="small"
            class="editDom"
            @click="stopDom"
            >启用</el-button
          >

          <el-button
            type="primary"
            v-if="
              editIsShowRef &&
                roleIsShow('常态工作管理', '工作动态', '技术规范', '删除')
            "
            plain
            size="small"
            class="del"
            @click="open"
            >删除</el-button
          >
          <el-dialog
            title="删除提示"
            class="del-dialog"
            v-model="dialogVisibleRef"
            width="20%"
            top="30vh"
          >
            <span style="padding-left: 26%">是否确认删除该条技术规范？</span>
            <template #footer class="dialog-footer">
              <el-button @click="dialogVisibleRef = false" link size="small"
                >取 消</el-button
              >
              <el-button type="primary" @click="delOverPlanHandler" size="small"
                >确 定</el-button
              >
            </template>
          </el-dialog>
          <el-tabs v-model="activeNameRef">
            <el-tab-pane
              style="overflow-y: scroll"
              label="技术规范详情"
              name="first"
            >
              <!-- <el-row>
                <el-col class="elcol" :offset="4" :span="15">
                  <div class="title">
                    <span>基本信息</span>
                    <div class="line"></div>
                    <div class="triangle-right1"></div>
                    <div class="triangle-right2"></div>
                  </div>
                </el-col>
              </el-row> -->
              <el-row style="margin-top: 10px;display: block;">
                <el-form
                  ref="elFormRef"
                  label-position="right"
                  size="small"
                  :rules="editRef ? {} : rulesRef"
                  :model="formDataRef"
                  :disabled="editRef"
                  label-width="140px"
                >
                  <el-col class="elcol" :offset="5" :span="14">
                    <el-form-item
                      class="name"
                      label="技术规范名称:"
                      prop="plan_name"
                    >
                      <el-input
                        v-if="!editRef"
                        v-model="formDataRef.plan_name"
                        placeholder="请输入技术规范名称"
                      ></el-input>
                      <span v-if="editRef" style="margin: 0;">{{
                        formDataRef.plan_name
                      }}</span>
                    </el-form-item>
                  </el-col>
                  <!-- <el-col class="elcol" :offset="5" :span="14">
                    <el-form-item class="name" label="所属机构:" prop="jg_name">
                      <el-input v-if="!editRef" v-model="formDataRef.jg_name" disabled></el-input>
                      <span v-if="editRef" style="margin: 0;">{{
                        formDataRef.jg_name
                      }}</span>
                    </el-form-item>
                  </el-col> -->
                  <el-col class="elcol" :offset="5" :span="14">
                    <el-form-item
                      class="name"
                      label="编制单位:"
                      prop="make_unit"
                    >
                      <el-input
                        v-if="!editRef"
                        v-model="formDataRef.make_unit"
                        placeholder="请输入编制单位"
                      ></el-input>
                      <span v-if="editRef" style="margin: 0;">{{
                        formDataRef.make_unit
                      }}</span>
                    </el-form-item>
                  </el-col>
                  <!-- <el-col class="elcol" :offset="5" :span="14">
                    <el-form-item class="name" label="版本:" prop="version">
                      <el-input
                        v-if="editRef"
                        v-model="formDataRef.version"
                        placeholder="请输入版本"
                      ></el-input>
                      <span v-if="editRef" style="margin: 0;">{{
                        formDataRef.version
                      }}</span>
                    </el-form-item>
                  </el-col> -->
                  <el-col class="elcol" :offset="5" :span="14">
                    <el-form-item
                      class="name"
                      label="印发/上传时间:"
                      prop="print_at"
                    >
                      <span v-if="editRef" style="margin: 0;">{{
                        formDataRef.print_at != undefined
                          ? formDataRef.print_at.substr(0, 10)
                          : ''
                      }}</span>
                      <el-date-picker
                        v-if="!editRef"
                        type="date"
                        class="eldate"
                        style="width: 100%"
                        placeholder="请选择印发/上传时间"
                        value-format="YYYY-MM-DD"
                        v-model="formDataRef.print_at"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <!-- <el-col class="elcol" :offset="5" :span="14">
                    <el-form-item class="name" label="文号:" prop="doc_num">
                      <span v-if="editRef" style="margin: 0;">{{
                        formDataRef.doc_num
                      }}</span>
                      <el-input
                        v-if="!editRef"
                        v-model="formDataRef.doc_num"
                        placeholder="请输入文号"
                      ></el-input>
                    </el-form-item>
                  </el-col> -->
                  <el-col class="elcol" :offset="5" :span="14">
                    <el-form-item class="name" label="类型:" prop="tech_type">
                      <span v-if="editRef" style="margin: 0;">{{
                        formDataRef.tech_type == 1
                          ? '调查'
                          : formDataRef.tech_type == 2
                          ? '区划评估'
                          : '暂无'
                      }}</span>
                      <el-select
                        v-if="!editRef"
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
                  <!-- <el-col class="elcol" :offset="5" :span="14">
                    <el-form-item class="name" label="所属行业:" prop="in_hy">
                      <span v-if="editRef" style="margin: 0;">{{
                        formDataRef.type_na
                      }}</span>
                      <el-select
                        v-if="!editRef"
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
                  </el-col> -->
                  <el-col class="elcol" :offset="5" :span="14">
                    <el-form-item
                      class="name"
                      label="印发单位:"
                      prop="print_unit"
                    >
                      <span v-if="editRef" style="margin: 0;">{{
                        formDataRef.print_unit
                      }}</span>
                      <el-input
                        v-if="!editRef"
                        v-model="formDataRef.print_unit"
                        placeholder="请输入印发单位"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <!-- <el-col class="elcol" :offset="5" :span="14">
                    <el-form-item class="name" label="查看级别:" prop="lev">
                      <span v-if="editRef" style="margin: 0;">{{
                        formDataRef.lev === 1
                          ? "国家"
                          : formDataRef.lev === 2
                          ? "省级"
                          : formDataRef.lev === 3
                          ? "市级"
                          : "县级"
                      }}</span>

                      <el-select
                        v-if="!editRef"
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
                  </el-col> -->
                  <!-- <el-col class="elcol" :offset="5" :span="14">
                    <el-form-item class="name" label="所属普查机构名称:" prop="jg_name">
                      <span v-if="editRef" style="margin: 0;">{{
                        formDataRef.jg_name
                      }}</span>
                      <el-input
                        v-if="!editRef"
                        v-model="formDataRef.jg_name"
                        placeholder="请输入所属普查机构名称"
                      ></el-input>
                    </el-form-item>
                  </el-col> -->
                  <!-- <el-col class="elcol" :offset="5" :span="14">
                    <el-form-item class="name" label="上传人员:" prop="up_user_name">
                      <span v-if="editRef" style="margin: 0;">{{
                        formDataRef.up_user_name
                      }}</span>
                      <el-input
                        v-if="!editRef"
                        v-model="formDataRef.up_user_name"
                        placeholder="请输入上传人员"
                      ></el-input>
                    </el-form-item>
                  </el-col> -->
                  <el-col v-if="editRef" class="elcol" :offset="5" :span="14">
                    <el-form-item label="摘要:">
                      <div class="formItem">
                        <div class="content">
                          <p class="content ql-snow ql-editor" style="min-height:0px;" v-html="formDataRef.remarks"></p>
                        </div>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col v-if="!editRef" class="elcol" :offset="5" :span="14">
                    <el-form-item label="摘要:">
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
                  <el-col class="elcol" :offset="5" :span="14">
                    <el-form-item
                      :class="{ name: true, 'name-upload': !editRef }"
                      :label="editRef == true ? '附件查看:' : '上传附件:'"
                    >
                      <div>
                        <el-upload
                          v-if="!editRef"
                          class="upload-demo"
                          style="padding-bottom: 10px"
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
                        <div
                          class="file-list"
                          v-if="fileListRef && fileListRef.length"
                        >
                          <template v-if="!editRef">
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
                                  overflow: hidden;
                                "
                                >{{ v.filename }}</span
                              >
                              <el-icon class="el-icon-delete" @click.stop="handleRemove(ind)"><Delete /></el-icon>
                              <span style="color: #c0c4cc"
                                >下载次数&nbsp;{{ v.dow_count }}</span
                              >
                            </div>
                          </template>
                          <template v-if="editRef">
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
                                  overflow: hidden;
                                "
                                >{{ v.filename }}</span
                              >
                              <el-icon class="el-icon-upload"
                                title="下载"
                                v-if="$isViewer"
                                @click.stop="download(v.uuid, v.ext, v.filename)">
                                <UploadFilled />
                              </el-icon>
                              <span style="color: #c0c4cc"
                                >下载次数&nbsp;{{ v.dow_count }}</span
                              >
                            </div>
                          </template>
                        </div>
                        <div
                          v-if="editRef && !fileListRef.length"
                          style="color: #c0c4cc"
                        >
                          还未上传文件
                        </div>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-form>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="TechnologyStandardDetail">
import { ref, watch, onMounted, onBeforeUnmount, computed, nextTick } from 'vue'
import { workDynamicsStore } from '@/store'
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { getWorkGroup, downloadFile, withFile, delFile, delOverPlan, 
  editOverPlan, detailOverPlan, getLevHy, getLevJg, getDeptTreesOld } from '@/api'
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'
import { View, Upload, UploadFilled, Paperclip, Delete } from '@element-plus/icons-vue'
import { mime } from '../components/mime.js'

const workStore = workDynamicsStore()
const router = useRouter()
const route = useRoute()

const elFormRef = ref(null)

const loadingRef = ref(null)

const UserInfo = JSON.parse(decodeURIComponent(atob(sessionStorage.getItem('UserInfo'))))
// 属性
const editIsShowRef = ref(false)
const rulesRef = ref({
  plan_name: [
    { required: true, message: '请输入技术规范名称', trigger: 'blur' }
  ],
  print_at: [
    { required: true, message: '请选择印发时间', trigger: 'change' }
  ],
  // doc_num: [{ required: true, message: '请输入文号', trigger: 'blur' }],
  print_unit: [
    { required: true, message: '请输入印发单位', trigger: 'blur' }
  ],
  make_unit: [
    { required: true, message: '请输入编制单位', trigger: 'blur' }
  ],
  // in_hy: [
  //   { required: true, message: '请选择所属行业', trigger: 'change' }
  // ],
  version: [{ required: true, message: '请输入版本', trigger: 'blur' }],
  // lev: [{ required: true, message: "请选择查看级别", trigger: "change" }],
  tech_type: [
    { required: true, message: '请选择类型', trigger: 'change' }
  ],
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
const dialogVisibleRef = ref(false)
const editRef = ref(true)
const fileListRef = ref([])
const actionUrlRef = ref(`${baseUrl[ENV]['fileUrl']}`)
const optionsCateRef = ref([
  { label: '调查', value: 1 },
  { label: '区划评估', value: 2 }
])
const optionsin_hyRef = ref([
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
  placeholder: '请在这里输入',
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

const download = (fileuuid, ext, filename) => {
  loadingRef.value = ElLoading.service({
    text: '正在下载中...'
  })
  let fileext = ext.toLowerCase()
  if (mime[fileext]) {
    downloadFile(fileuuid, 3).then(res => {
      if(res!=null){
        nextTick(() => {
          // 以服务的方式调用的 Loading 需要异步关闭
          loadingRef.value.close()
        })
        let blob = new Blob([res.data], { type: mime[fileext] }) // type为所需要下载的文件格式，以xls文件为例

        // 浏览器兼容，Google和火狐支持a标签的download，IE不支持
        // if (window.navigator && window.navigator.msSaveBlob) {
        //   //IE浏览器、微软浏览器
        //   /* 经过测试，微软浏览器Microsoft Edge下载文件时必须要重命名文件才可以打开，
        //       IE可不重命名，以防万一，所以都写上比较好 */
        //   window.navigator.msSaveBlob(blob, "文件.doc");
        // } else {
        // 其他浏览器
        let link = document.createElement('a') // 创建a标签
        link.style.display = 'none'
        let objectUrl = URL.createObjectURL(blob)
        link.href = objectUrl
        link.setAttribute('download', filename)
        link.click()
        URL.revokeObjectURL(objectUrl)
        getSomeData()
        // }
      }else{
        nextTick(() => {
          // 以服务的方式调用的 Loading 需要异步关闭
          loadingRef.value.close()
        })
        ElMessage.error('服务器出错，请稍后重试')
      }
    })
  }
}

const stopDom = () => {
  if (formDataRef.value.enable) {
    editOverPlan({
        uuid: route.query.uuid,
        enable: 0,
        plantype: '3'
      })
      .then(res => {
        if (res!=null) {
          ElMessage.success('该技术方案已经被禁用')
          formDataRef.value.enable = res.enable
        } else {
          ElMessage.error('服务器出错，请稍后重试')
        }
      })
  } else {
    editOverPlan({
        uuid: route.query.uuid,
        enable: 1,
        plantype: '3'
      })
      .then(res => {
        if (res!=null) {
          ElMessage.success('该技术方案已经被启用')
          formDataRef.value.enable = res.enable
        } else {
          ElMessage.error('服务器出错，请稍后重试')
        }
      })
  }
}

// 删除
const delOverPlanHandler = () => {
  delOverPlan({ uuid: formDataRef.value.uuid, plantype: '3' })
    .then(res => {
      if (res!=null) {
        dialogVisibleRef.value = false
        ElMessage.success('删除成功!')
        router.push({
          name: 'WorkDynamicsList',
          query: { activeName: 'fourth' }
        })
      } else {
        ElMessage.error('服务器出错，请稍后重试')
      }
    })
}

const submit = () => {
  elFormRef.value.validate(valid => {
    if (valid) {
      editSubmit()
    } else {
      ElMessage.error('验证不通过，请按要求填写')
      return false
    }
  })
}

// 编辑提交
const editSubmit = () => {
  if (fileListRef.value && fileListRef.value.length == 0) {
    ElMessage.error('附件为必填项，上传后才能提交')
    return
  }
  loadingRef.value = ElLoading.service({
    text: '正在保存中...'
  })
  formDataRef.value.plantype = '3'
  delete formDataRef.value.enable
  editOverPlan(formDataRef.value).then(res => {
    if (res!=null) {
      getSomeData()
      editRef.value = true
      nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loadingRef.value.close()
      })
      ElMessage.success('编辑成功!')
    } else {
      nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loadingRef.value.close()
      })
      ElMessage.error('服务器出错，请稍后重试')
    }
  })
}

// 删除提示弹框
const open = () => {
  dialogVisibleRef.value = true
}

// 改为编辑
const editDom = () => {
  editRef.value = false
  // this.$forceUpdate()
}

const closeEdit = () => {
  editRef.value = true
  getSomeData()
}

// 获得该条数据
const getSomeData = () => {
  detailOverPlan(route.query.uuid, 3)
    .then(res => {
      if (res!=null) {
        formDataRef.value = res
        // if (formDataRef.value.remarks) {//zyt注释后可展示富文本样式
        //   formDataRef.value.remarks = formDataRef.value.remarks.replace(
        //     /<[^>]+>|&[^>]+;/g,
        //     ''
        //   )
        // }

        fileListRef.value = res.files || []
        if (typeof formDataRef.value.in_hy !== 'undefined') {
          if(formDataRef.value.in_hy!=null){
            formDataRef.value.type_na = optionsin_hyRef.value[formDataRef.value.in_hy].label
          }
        }

        if (
          (formDataRef.value.created_user &&
            formDataRef.value.created_user ==
            UserInfo.user.id) ||
            editIsShowFn(
              formDataRef.value.created_code,
              formDataRef.value.created_user_hy
            )
        ) {
          editIsShowRef.value = true
        }
      } else {
        ElMessage.error('服务器出错，请稍后重试')
      }
    })
}

const editIsShowFn = (code, type) => {
  const logCode = UserInfo.department.simcode
  const logType = UserInfo.department.dep_type
  const isAdmin = UserInfo.user.isadmin
  const arrId = ['a69380f4-4773-4665-9976-95124c1640dc', '245a299a-9682-4f6a-8cfc-3a93dd880045']
  let flag = null
  if (code !== undefined && type !== undefined) {
    // flag = logCode == code && logType == type && isAdmin == 0
    flag = logCode == code && logType == type
  } else {
    flag = false
  }
  return (
    arrId.includes(
      UserInfo.user.id
    ) || flag
  )
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

    withFile({
        planuuid: route.query.uuid,
        fileuuid: response.data[0].uuid,
        plantype: '3'
      })
      .then(res => {
        if (res!=null) {
          ElMessage.success('文件上传成功')
          nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingRef.value.close()
          })
        } else {
          ElMessage.error('服务器出错，请稍后重试')
          nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingRef.value.close()
          })
        }
      })
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
  ElMessageBox.confirm('此操作将删除文件, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      delFile({ fileuuid: fileListRef.value[index].uuid, plantype: 3 }).then(res => {
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

onMounted(() => {
  getSomeData()
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
/* 按钮 */
.del {
  position: absolute;
  top: 7px;
  right: 11px;
  z-index: 10;
}
.stopUse {
  position: absolute;
  top: 7px;
  right: 145px;
  z-index: 10;
}
.close {
  position: absolute;
  top: 7px;
  right: 212px;
  z-index: 10;
}
.editDom {
  position: absolute;
  top: 7px;
  right: 78px;
  z-index: 10;
}
</style>
