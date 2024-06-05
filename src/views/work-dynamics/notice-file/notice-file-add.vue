<template>
  <div class="taskBuild">
    <div class="mainBox">
      <div class="tableBox commomElTab">
        <el-button
          type="primary"
          :disabled="!addSucRef"
          size="small"
          @click="submit(false)"
          class="tab-new-save-btn"
          >保存</el-button
        >
        <el-button
          type="primary"
          :disabled="!addSucRef"
          size="small"
          @click="submit"
          class="tab-new-submit-btn"
          >提交</el-button
        >
        <el-tabs v-model="activeNameRef">
          <el-tab-pane style="overflow-y: scroll" label="文件新增" name="first">
            <el-row style="margin-top: 10px">
              <el-col class="elcol" :offset="4" :span="16">
              <el-form
                ref="elFormRef"
                size="small"
                label-position="right"
                :rules="rulesRef"
                :model="formDataRef"
                label-width="130px"
              >
                <el-row>
                  <el-col class="elcol" :offset="0" :span="24">
                    <el-form-item
                      class="name"
                      label="文件名称:"
                      prop="notice_name"
                    >
                      <el-input
                        v-model="formDataRef.notice_name"
                        placeholder="请输入文件名称"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col v-if="isCountryCensusOfficeRef == 1" class="elcol" :offset="0" :span="24">
                    <el-form-item class="name" label="文件编码:" prop="work_num">
                      <span>{{ getFillWorkNum() }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- <el-row>
                  <el-col v-if="isCountryCensusOfficeRef == 1" class="elcol" :offset="0" :span="24">
                  <el-form-item class="name" label="工作活动分类:" prop="work_type">
                    <span>{{ formDataRef.work_type }}</span>
                  </el-form-item>
                </el-col>
                </el-row> -->
                <el-row>
                  <el-col class="elcol" :offset="0" :span="24">
                    <el-form-item class="name" label="文件类型:" prop="type">
                      <el-radio-group v-model="formDataRef.type">
                        <el-radio
                          v-for="v in optionsRef"
                          :key="v.value"
                          :value="v.value"
                          >{{ v.label }}</el-radio
                        >
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- <el-row>
                  <el-col class="elcol" :offset="0" :span="24">
                  <el-form-item class="name" label="文号:" prop="doc_num">
                    <el-input
                      v-model="formDataRef.doc_num"
                      placeholder="请输入文号"
                    ></el-input>
                  </el-form-item>
                </el-col>
                </el-row> -->
                <el-row>
                  <el-col class="elcol" :offset="0" :span="24">
                    <el-form-item class="name" label="发布时间:" prop="notice_at">
                      <el-date-picker
                        type="date"
                        class="eldate"
                        style="width: 100%"
                        placeholder="请选择发布时间"
                        value-format="YYYY-MM-DD"
                        v-model="formDataRef.notice_at"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col class="elcol" :offset="0" :span="24">
                    <el-form-item class="name" label="发布单位:" prop="iss_unit">
                      <el-input
                        v-model="formDataRef.iss_unit"
                        placeholder="请输入发布单位"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col class="elcol" :offset="0" :span="20">
                    <el-form-item class="name" label="查看级别:" prop="lev">
                      <template v-for="item in optionsJbRef">
                        <el-radio
                          v-model="radioObjRef[item.name]"
                          @click.native="radio0Click(item.name, item.value)"
                          :value="item.value"
                          >{{ item.label }}</el-radio
                        >
                      </template>
                    </el-form-item>
                  </el-col>
                  <!-- <el-col class="elcol" :span="4" v-if="formDataRef.lev">
                    <el-form-item
                      class="name"
                      label-width="80px"
                      label="查看行业:"
                      prop="levhy"
                    >
                      <el-select
                        class="eldate"
                        style="width: 100%"
                        clearable
                        v-model="formDataRef.levhy"
                        placeholder="请选择查看行业"
                      >
                        <el-option
                          v-for="item in optionshyRef"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col> -->
                </el-row>
                <!-- <el-row>
                  <el-col class="elcol" :offset="0" :span="24">
                  <el-form-item class="name" label="查看机构:" prop="value2">
                    <a-tree-select
                      v-model="formDataRef.value2"
                      :labelInValue="true"
                      :treeCheckStrictly="true"
                      :treeCheckable="true"
                      @change="cascaderChange"
                      style="width: 100%"
                      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                      :tree-data="treeDataRef"
                      :multiple="true"
                      :replaceFields="defaultPropsRef"
                      placeholder="请选择查看机构"
                      :load-data="lazy"
                    />
                  </el-form-item>
                </el-col>
                </el-row> -->
                <!-- <el-row>
                  <el-col class="elcol" :offset="0" :span="24">
                  <el-form-item label="是否添加大事记:" prop="isjoinevent">
                    <el-radio-group v-model="formDataRef.isjoinevent">
                      <el-radio :value="1">是</el-radio>
                      <el-radio :value="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                </el-row> -->
                <el-row>
                  <el-col v-show="formDataRef.isjoinevent == 1 && isCountryCensusOfficeRef == 1" 
                    class="elcol" :offset="0" :span="24">
                    <el-form-item label="备注说明:" prop="event_content">
                      <div style="width:100%;">
                        <!-- 富文本编辑器-zyt -->
                        <QuillEditor
                          ref="myQuillEditor" class="editer"
                          v-model:content="formDataRef.event_content"
                          :options="editorOptionRef"
                          contentType="html"
                          style="width: 100%;"
                        />
                      </div>	
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- <el-row>
                  <el-col v-if="isCountryCensusOfficeRef == 1" class="elcol" :offset="0" :span="24">
                    <el-form-item class="name" label="主送单位:" prop="zsdw">
                      <el-input
                        v-model="formDataRef.zsdw"
                        placeholder="请输入主送单位"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col v-if="isCountryCensusOfficeRef == 1" class="elcol" :offset="0" :span="24">
                    <el-form-item class="name" label="签发人:" prop="qfr">
                      <el-input
                        v-model="formDataRef.qfr"
                        placeholder="请输入签发人"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col v-if="isCountryCensusOfficeRef == 1" class="elcol" :offset="0" :span="24">
                    <el-form-item class="name" label="经办人:" prop="jbr">
                      <el-input
                        v-model="formDataRef.jbr"
                        placeholder="请输入经办人"
                      ></el-input>
                    </el-form-item>
                  </el-col>
               </el-row>
                <el-row>
                  <el-col v-if="isCountryCensusOfficeRef == 1" class="elcol" :offset="0" :span="24">
                    <el-form-item
                      :class="{ 'name-upload': true }"
                      label="归档资料清单:"
                    >
                      <template  v-for="item in optionsGdzlqdRef">
                        <el-radio
                          v-model="formDataRef.sfygdqd"
                          @click.native="gdzlqdClick(item.label, item.value)"
                          :value="item.value"
                          >{{ item.label }}</el-radio
                        >
                      </template>
                    </el-form-item>
                  </el-col>
                </el-row> -->
                <el-row>
                    <el-col class="elcol" :offset="0" :span="24">
                    <el-form-item
                      :class="{ 'name-upload': true }"
                      label="附件上传:"
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
                          :on-error="handleUploadError"
                          :before-upload="beforeupload"
                        >
                          <el-button size="small" plain :icon="Upload"
                            >点击上传</el-button
                          >
                        </el-upload>
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
                <gdzlqd v-if="formDataRef.sfygdqd === '1'" :form="formDataRef" :workTypeAcronym="workTypeAcronymRef"
                :workType="`函件`"
                :workName="formDataRef['notice_name']"
                :fillWorkNum="fillWorkNumRef" :plantype="plantypeRef" ref="gdzlqdRef" :mode="`add`"></gdzlqd>
              </el-form>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup name="NoticeFileAdd">
import { ref, watch, onMounted, onBeforeUnmount, computed, nextTick } from 'vue'
import { workDynamicsStore } from '@/store'
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import gdzlqd from '../components/gdzlqd.vue'
import { delFile, addOverPlan, withFile, getWorkNum, getDeptTreesOld } from '@/api'
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'
import { Upload, Paperclip, Delete } from '@element-plus/icons-vue'
import { mime } from '../components/mime.js'

const workStore = workDynamicsStore()
const router = useRouter()
const route = useRoute()

const elFormRef = ref(null)
const gdzlqdRef = ref(null)

const loadingRef = ref(null)
const editRef = ref(false)

const plantypeRef = ref(`11`)
// 替换 treeNode 中 title,value,key,children 字段为 treeData 中对应的字段
const defaultPropsRef = ref({
  children: 'children',
  title: 'dep_name',
  key: 'id',
  value: 'id'
})
const countRadioRef = ref(1)
const radioObjRef = ref({
  radio1: null,
  radio2: null,
  radio3: null,
  radio4: null,
  radio5: null
})
const workTypeAcronymRef = ref('HJ')
const fillWorkNumRef = ref('')
// 归档资料清单
const optionsGdzlqdRef = ref([
  { label: '是', value: "1" },
  { label: '否', value: '0' },
])
const optionsJbRef = ref([
  { label: '国家', value: 1, name: 'radio1' },
  { label: '省级', value: 2, name: 'radio2' },
  { label: '市级', value: 3, name: 'radio3' },
  { label: '县级', value: 4, name: 'radio4' },
  { label: '无', value: '', name: 'radio5' }
])
// const optionshyRef = ref([
//   { label: '全行业', value: 11 },
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
const addSucRef = ref(true)
const validateEventContent = (rule, value, callback) => {
  if(isCountryCensusOfficeRef.value != 1) return callback()
  if (formDataRef.value.isjoinevent == 1 && !formDataRef.value.event_content) {
    // return callback(new Error('请输入大事记主要内容'))
    return callback(new Error('请输入备注说明'))
  } else {
    callback()
  }
}
const validateWorkNum = (rule, value, callback) => {
  if(isCountryCensusOfficeRef.value != 1) return callback()
  if (!/^\d{3}$/.test(value.padStart(3, 0))) {
    return callback(new Error('请输入3位以内的数字'))
  } else {
    callback()
  }
}
const rulesRef = ref({
  // doc_num: [
  //   { required: true, message: '请输入函件文号', trigger: 'blur' }
  // ],
  // work_num: [
  //   { required: true, message: '请输入工作（活动）编码', trigger: 'blur' },
  //   { validator: validateWorkNum,message:'请输入3位以内的数字', trigger: 'blur' }
  // ],
  // event_content: [
  //   { validator: validateEventContent,message:'请输入备注说明', trigger: 'blur' }
  // ],
  notice_name: [
    { required: true, message: '请输入文件名称', trigger: 'blur' }
  ],
  iss_unit: [
    { required: true, message: '请输入发布单位', trigger: 'blur' }
  ],
  // value2: [{ required: true, message: "请选择查看机构", trigger: "change" }],
  notice_at: [
    { required: true, message: '请选择发布时间', trigger: 'change' }
  ],
  type: [{ required: true, message: '请选择类型', trigger: 'change' }]
  // notice_content: [{ required: true, message: "请输入函件内容", trigger: "blur" }],
})
const tokenRef = ref(sessionStorage.getItem('access_token'))
const treeDataRef = ref([])
const fileListRef = ref([])
const actionUrlRef = ref(`${baseUrl[ENV]['fileUrl']}`)
const optionsRef = ref([
  // { label: '会议/培训通知', value: 1 },
  // { label: '工作通知', value: 2 },
  // { label: '征求意见', value: 3 },
  // { label: '情况通报', value: 4 }
  { label: '工作通知', value: 1 },
  { label: '情况通报', value: 2 },
  { label: '工作方案', value: 3 }
])
const activeNameRef = ref('first')
const UserInfo = JSON.parse(decodeURIComponent(atob(sessionStorage.getItem('UserInfo'))))
const formDataRef = ref({
  created_user:UserInfo
    .user.id,
  isjoinevent: 1,//是否添加大事记（可显示备注说明）
  sfygdqd:'0',
  work_type:'函件',
  event_content:'',
})
const editorOptionRef = ref({
  placeholder: '请输入备注说明',
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

// 计算
const isCountryCensusOfficeRef = computed(() => {
  return workStore.isCountryCensusOffice()
})

// tipsBeforeLeavePage
const isAddPageRef = computed(() => {
  return route.path.includes('add') || route.path.includes('Add')
})

const isEditPageRef = computed(() => {
  return route.path.includes('detail') || route.path.includes('Detail')
})

// 事件
const gdzlqdClick = (name, val) => {

}

const radio0Click = (name, val) => {
  // zyt-注释后双击变成单击生效
  // if (countRadioRef.value < 2) {
  //   countRadioRef.value += 1
  // } else {
    for (const key in radioObjRef.value) {
      radioObjRef.value[key] = null
    }
    if (!val) {
      formDataRef.value.lev = ''
    } else {
      for (let index = 1; index < 6; index++) {
        if (index <= val) {
          radioObjRef.value['radio' + index] = index
        }
      }
    }

    if(name=='radio5'){//无级别
      formDataRef.value.levhy = null //无行业
    }else{//zyt--设置行业为应急管理，防止无行业无法保存级别
      formDataRef.value.levhy = 1
    }

    // countRadioRef.value = 1

    let arr = Object.values(radioObjRef.value)
    let levArr = []
    arr.forEach(v => {
      if (v != null && v != '') {
        levArr.push(v)
      }
    })
    if (levArr.length != 0) {
      levArr.sort((a, b) => a - b)
      formDataRef.value.lev = levArr[levArr.length - 1]
    }
  // }
}

const cascaderChange = (node) => {
  // console.log(node)
  // console.log(formDataRef.value.value2)
  // console.log(treeDataRef.value)
  formDataRef.value.lev_jg = node.map((item, index) => {
    return {
      jg_id: item.value,
      jg_name: item.label
    }
  })
}

const lazy = (treeNode) => {
  // console.log(treeNode)
  if (treeNode.dataRef.children && treeNode.dataRef.children.length > 0) {
    return new Promise(resolve => {
      resolve()
    })
  }
  let deptid = treeNode.dataRef.id
  return new Promise(resolve => {
    getDeptTreesOld(deptid).then(res => {
      if (res!=null) {
        treeNode.dataRef.children = res || []

        treeNode.dataRef.children.forEach(v => {
          if (v.islast) {
            v.isLeaf = true
          } else {
            v.isLeaf = false
          }
        })
        treeDataRef.value = [...treeDataRef.value]
        resolve()
      }
    })
  })
}

// 获得机构数据
const getTableData = () => {
  let deptid = ''
  getDeptTreesOld(deptid).then(res => {
    if (res!=null) {
      let arr = []
      arr.push(...res)
      treeDataRef.value = arr || []
    }
  })
}

const uploadfl = (response, file) => {
  // console.log("response, file: ", response, file);
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

    ElMessage.error('服务器出错，请稍后重试')
  }
}

const handleUploadError = async (err) => {
  nextTick(() => {
    // 以服务的方式调用的 Loading 需要异步关闭
    loadingRef.value.close()
  })
  ElMessage.error('服务器出错，请稍后重试')
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

//删除文件
const deleteFile = async () => {
  let res = await delFile({ fileuuid: fileListRef.value[index].uuid, plantype: plantypeRef.value })
  if (res!=null) {
    fileListRef.value.splice(index, 1)
    ElMessage.success('文件删除成功')
  } else {
    ElMessage.error('服务器出错，请稍后重试')
  }
}

const handleRemove = (index) => {
  ElMessageBox.confirm('此操作将删除文件, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteFile();
  }).catch(() => {
    ElMessage.info('已取消删除')
  });
}

const submit = (validate = true, routing = true) => {
  if (!validate) {//不校验
    if (!formDataRef.value.notice_name) {
      ElMessage.error('请填写名称')
      return
    }
    addOverPlanFunction(validate, routing)
    return
  }
  elFormRef.value.validate(valid => {
    if (valid) {
      if (formDataRef.value.sfygdqd === '1' && isCountryCensusOfficeRef.value == 1 && !gdzlqdRef.value.validateGdzlqd()) {
        return
      }
      if (isCountryCensusOfficeRef.value != 1 && fileListRef.value && fileListRef.value.length == 0) {
        ElMessage.error('附件为必填项，上传后才能提交')
        return
      }
      addOverPlanFunction(validate, routing)
    } else {
      ElMessage.error('验证不通过，请按要求填写')
      return false
    }
  })
}

const addOverPlanFunction = async (validate = true, routing=true) => {
  // if (
  //   (formDataRef.value.levhy >= 0 && formDataRef.value.levhy !== '' && formDataRef.value.lev) ||
  //   (!formDataRef.value.levhy && !formDataRef.value.lev)
  // ) {
  // } else {
  //   ElMessage.error('下发级别与下发行业必须同时填写')
  //   return
  // }
  formDataRef.value.plantype = plantypeRef.value
  if (isCountryCensusOfficeRef.value) {
    formDataRef.value.group_id = UserInfo
    .group[0].group_id
  }
  formDataRef.value.work_num =  getFillWorkNum()
  formDataRef.value.lev_hy = [
    {
      lev_hy: formDataRef.value.levhy,
      lev_qh: formDataRef.value.lev,
      lev_code: UserInfo
        .department.simcode
    }
  ]
  formDataRef.value.lev_jg = formDataRef.value.lev_jg || []
  if(validate){
    loadingRef.value = ElLoading.service({
      text: '正在提交中...'
    })
  }else{
    loadingRef.value = ElLoading.service({
      text: '正在保存中...'
    })
  }
  addSucRef.value = false
  let res = await addOverPlan(formDataRef.value)
  if (res!=null && res.length>0) {
    let fileData = []
    if (fileListRef.value && fileListRef.value.length > 0) {
      fileListRef.value.forEach(item => {
        fileData.push(item.uuid)
      })
      let fileuuid = fileData.join(',')
      let res1 = await withFile({
        planuuid: res[0].uuid,
        fileuuid: fileuuid,
        plantype: plantypeRef.value
      })
    }
    if (formDataRef.value.sfygdqd === '1' && isCountryCensusOfficeRef.value == 1) {
      let res2 = await gdzlqdRef.value.addGdzlqd(res)
    }
    
    // addSucRef.value = true
    nextTick(() => {
      // 以服务的方式调用的 Loading 需要异步关闭
      loadingRef.value.close()
    })
    // ElMessage.success('新增函件成功')
    ElMessage.success('新增成功')
    if (routing) {
      router.push({
        name: 'NoticeFileDetail',
        query: { uuid: res[0].uuid }
      })
    }
  } else {
    nextTick(() => {
      // 以服务的方式调用的 Loading 需要异步关闭
      loadingRef.value.close()
    })
    ElMessage.error('服务器出错，请稍后重试')
  }
}

// 获取完整的编号 工作（活动）编码：首字母缩写（如会议:HY+会议召开日期+001(3位编号)）
const getFillWorkNum = () => {
  return `${workTypeAcronymRef.value}_${getTimeForWorkNum('notice_at')}_${typeof formDataRef.value.work_num === 'string'? formDataRef.value.work_num.split('_').at(-1) :''}`
}

const getFillWorkNumPrefix = () => {
  return `${workTypeAcronymRef.value}_${getTimeForWorkNum('notice_at')}_`
}

const getTimeForWorkNum = (timeField) => {
  return Array.isArray(formDataRef.value[timeField]) ? formDataRef.value[timeField][0].substring(0,10) : (formDataRef.value[timeField] ? formDataRef.value[timeField].substring(0,10) : '')
}

// 监听
watch(
  () => formDataRef.value.work_num,
  () => {
    fillWorkNumRef.value = getFillWorkNum()
  },
  {
    deep: true,immediate: true
  }
)

watch(
  () => formDataRef.value.notice_at,
  () => {
    fillWorkNumRef.value = getFillWorkNum()
  },
  {
    deep: true,immediate: true
  }
)

onMounted(async () => {
  const params = {
    plantype:plantypeRef.value
  }
  formDataRef.value.work_num = await getWorkNum(params)
  getTableData()
  let lev = UserInfo
    .department.dep_lev
  const type = UserInfo
    .department.dep_type

  // if (type != 0) {
  //   optionshyRef.value = [optionshyRef.value.find(val => val.value == type)]
  // }
  // optionshyRef.value = optionshyRef.value.filter(val => val.value !== 1)
  if (lev == 1) {
    optionsJbRef.value = [
      { label: '国家', value: 1, name: 'radio1' },
      { label: '省级', value: 2, name: 'radio2' },
      { label: '市级', value: 3, name: 'radio3' },
      { label: '县级', value: 4, name: 'radio4' },
      { label: '无', value: '', name: 'radio5' }
    ]
  } else if (lev == 2) {
    optionsJbRef.value = [
      { label: '省级', value: 2, name: 'radio2' },
      { label: '市级', value: 3, name: 'radio3' },
      { label: '县级', value: 4, name: 'radio4' },
      { label: '无', value: '', name: 'radio5' }
    ]
  } else if (lev == 3) {
    optionsJbRef.value = [
      { label: '市级', value: 3, name: 'radio3' },
      { label: '县级', value: 4, name: 'radio4' },
      { label: '无', value: '', name: 'radio5' }
    ]
  } else if (lev == 4) {
    optionsJbRef.value = [
      { label: '县级', value: 4, name: 'radio4' },
      { label: '无', value: '', name: 'radio5' }
    ]
  }

  // tipsBeforeLeavePage
  // console.log('tipsBeforeLeavePage')
  window.onbeforeunload = () => { };
  window.onbeforeunload = async function (e) {
    debugger
    if ((isEditPageRef.value && editRef.value)) {
      return
    } else {
      if (isAddPageRef.value) {
        await submit(false, false)
      } else if (isEditPageRef.value) {
        await submit(false, false)
      }
      e = e || window.event;// 兼容IE8和Firefox 4之前的版本
      if (e) {
        e.returnValue = '如您填报完成, 请务必保存\\提交数据';// Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
      }
      return '如您填报完成, 请务必保存\\提交数据';
    }
  }
})

// tipsBeforeLeavePage
onBeforeUnmount(() => {
  window.onbeforeunload = () => { };
})

// 路由离开时的操作
onBeforeRouteLeave((to,from, next) => {
    // console.log(to,'路由离开时的操作')
    // to.name.includes('detail') && from.name.includes('add') 如果是正常的新增后跳转编辑,则不提示
    if ((isAddPageRef.value && (to.name.includes('detail') || to.name.includes('Detail')) && (from.name.includes('add') || from.name.includes('Add'))) || (isEditPageRef.value && editRef.value)) {
      next()
    } else {
      ElMessageBox.alert('如您填报完成, 请务必保存\\提交数据', '提示', {
        confirmButtonText: '保存',
        distinguishCancelAndClose: true
      }).then(async () => {
        if (isAddPageRef.value) {
          await submit(false, false)
          next()
        } else if (isEditPageRef.value) {
          await submit(false, false)
          next()
        } else {
          next()
        }
      }).catch(() => {
      })
    }
})
</script>

<style lang="scss" scoped>
</style>
