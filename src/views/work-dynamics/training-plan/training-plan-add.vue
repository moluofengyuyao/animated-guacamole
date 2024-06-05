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
          size="small"
          @click="submit"
          class="tab-new-submit-btn"
          >提交</el-button
        >

        <el-tabs v-model="activeNameRef">
          <el-tab-pane
            style="overflow-y: scroll"
            label="培训计划新增"
            name="first"
          >
            <!-- 培训概述 -->
            <el-row style="margin: 18px 0">
              <el-col class="m-head_title" :offset="4" :span="16">
                <div class="m-title">
                  <span>培训概述</span>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="elcol m-height" :offset="4" :span="16">
                <el-form
                  ref="elFormRef"
                  size="small"
                  label-position="right"
                  :rules="editRef ? {} : rulesRef"
                  :model="formDataRef"
                  label-width="100px"
                >
                  <el-row>
                    <el-col class="elcol" :offset="0" :span="24">
                      <el-form-item
                        class="name"
                        label="培训名称:"
                        prop="train_name"
                      >
                        <el-input
                          style="width: 80%;"
                          placeholder="请输入培训名称"
                          v-model="formDataRef.train_name"
                          size="small"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col v-if="isCountryCensusOfficeRef == 1"  class="elcol" :offset="0" :span="24">
                      <el-form-item
                        class="name"
                        label="工作（活动）编码:"
                        label-width="128px"
                      >
                        <span>{{ getFillWorkNum() }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col v-if="isCountryCensusOfficeRef == 1"  class="elcol" :offset="0" :span="24">
                      <el-form-item
                        class="name"
                        label="工作活动分类:"
                      >
                        <span>{{ formDataRef.work_type }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col class="elcol" :offset="0" :span="6">
                      <el-form-item
                        class="name"
                        label="组织单位:"
                        prop="organize_unit"
                      >
                        <el-input
                          style="width: 90%;"
                          placeholder="请填写组织单位"
                          v-model="formDataRef.organize_unit"
                          size="small"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col
                      class="elcol" :offset="0" :span="6"
                    >
                      <el-form-item
                        class="name"
                        label="培训类型:"
                        prop="train_form"
                      >
                        <el-select
                          class="eldate"
                          style="width: 90%;"
                          v-model="formDataRef.train_form"
                          placeholder="请选择培训类型"
                          size="small"
                        >
                          <el-option
                            v-for="item in optionRef"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col
                      class="elcol"
                      :offset="0"
                      :span="6"
                    >
                      <el-form-item
                        class="name"
                        label="课程数量:"
                      >
                        <span>{{ courseNumRef }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col
                      class="elcol"
                      :offset="0"
                      :span="6"
                    >
                      <el-form-item
                        class="name"
                        label="课时长度:"
                      >
                        <span v-if="courseLongSumRef"
                          >{{
                            parseInt(courseLongSumRef / 60)
                              ? `${parseInt(courseLongSumRef / 60)}小时`
                              : ''
                          }}{{
                            courseLongSumRef % 60 ? `${courseLongSumRef % 60}分钟` : ''
                          }}</span
                        >
                        <span v-else>0</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col class="elcol" :offset="0" :span="6">
                      <el-form-item
                        class="name"
                        label="培训人数:"
                        prop="student_count"
                      >
                        <el-input-number
                          style="width: 90%;"
                          placeholder="请选择培训人数"
                          v-model="formDataRef.student_count"
                          size="small"
                        ></el-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col class="elcol" :offset="0" :span="6">
                      <el-form-item
                        class="name"
                        label="培训对象:"
                        prop="train_to"
                      >
                        <el-input
                          style="width: 90%;"
                          placeholder="请选择培训对象"
                          v-model="formDataRef.train_to"
                          size="small"
                        ></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col class="elcol" :offset="0" :span="6">
                      <el-form-item
                        class="name"
                        label="开始时间:"
                        prop="train_start"
                      >
                        <el-date-picker
                          type="date"
                          class="eldate"
                          style="width: 90%;"
                          placeholder="请选择开始时间"
                          value-format="YYYY-MM-DD"
                          v-model="formDataRef.train_start"
                          size="small"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>

                    <el-col class="elcol" :offset="0" :span="6">
                      <el-form-item
                        class="name"
                        label="结束时间:"
                        prop="train_end"
                      >
                        <el-date-picker
                          type="date"
                          class="eldate"
                          style="width: 90%;"
                          placeholder="请选择结束时间"
                          value-format="YYYY-MM-DD"
                          v-model="formDataRef.train_end"
                          size="small"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col class="elcol" :span="24">
                      <el-form-item
                        class="name"
                        label="课程分类:"
                        prop="cateGory"
                      >
                        <el-select
                          class="eldate"
                          style="width: 43%;"
                          clearable
                          size="small"
                          multiple
                          v-model="formDataRef.cateGory"
                        >
                          <el-option
                            v-for="item in optionkclxRef"
                            :key="item"
                            :label="item"
                            :value="item"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col
                      class="elcol"
                      :offset="0"
                      :span="18"
                    >
                      <el-form-item
                        class="name"
                        label="查看级别:"
                      >
                        <template v-for="item in optionsRef">
                          <el-radio
                            v-model="radioObjRef[item.name]"
                            @click.native="radio0Click(item.name, item.value)"
                            :value="item.value"
                            >{{ item.label }}</el-radio
                          >
                        </template>
                      </el-form-item>
                    </el-col>
                    <!-- <el-col
                      class="elcol"
                      :offset="0"
                      :span="6"
                      v-if="formDataRef.lev"
                    >
                      <el-form-item
                        class="name"
                        label="查看行业:"
                        prop="levhy_na"
                      >
                        <el-select
                          class="eldate"
                          style="width: 90%;"
                          clearable
                          size="small"
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
                  <el-row>
                    <el-col
                      class="elcol"
                      :offset="0"
                      :span="24"
                    >
                      <el-form-item
                        class="name"
                        label="活动简介:"
                        prop="train_content"
                      >
                        <!-- 富文本编辑器-zyt -->
                        <div style="margin-right:20px;">
                          <QuillEditor
                            ref="myQuillEditor" class="editer"
                            v-model:content="formDataRef.train_content"
                            :options="editorOptionRef"
                            contentType="html"
                            style="width: 100%;background: #fff;"
                          />
                        </div>	
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <!-- <el-row>
                      <el-col v-if="isCountryCensusOfficeRef == 1"  class="elcol"
                      :offset="0"
                      :span="24">
                      <span class="m-desc_tit">是否添加大事记：</span>

                      <el-radio-group v-model="formDataRef.isjoinevent">
                        <el-radio :value="1">是</el-radio>
                        <el-radio :value="0">否</el-radio>
                      </el-radio-group>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col v-show="formDataRef.isjoinevent == 1 && isCountryCensusOfficeRef == 1" class="elcol"
                      :offset="0"
                      :span="24">

                      <span class="m-desc_tit"  style="width: 150px;text-align: left;">大事记主要内容：</span>
                      <div class="content">
                          <quill-editor
                            v-model="formDataRef.event_content"
                            ref="myQuillEditor"
                            class="editer"
                            :options="editorOptionRef"
                            style="width: 100%"
                        >
                        </quill-editor>
                        </div>
                      </el-col>
                      <el-col v-if="isCountryCensusOfficeRef == 1" class="elcol"
                      :offset="0"
                      :span="24">
                        <span class="m-desc_tit" style="width: 100px;">归档资料清单：</span>
                        <span v-for="item in optionsGdzlqdRef">
                          <el-radio
                            v-model="formDataRef.sfygdqd"
                            @click.native="gdzlqdClick(item.label, item.value)"
                            :value="item.value"
                            >{{ item.label }}</el-radio
                          >
                        </span>
                    </el-col>
                  </el-row> -->
                  <el-row>
                    <el-col
                      class="elcol"
                      :offset="0"
                      :span="24"
                      style="margin-bottom: 8px;display: flex;"
                    >
                      <el-form-item
                        class="name"
                        label="附件:"
                      >
                        <el-upload
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
                          <span style="margin-left:10px;color:#FF0000">仅支持PDF格式</span>
                        </el-upload>
                      </el-form-item>
                    </el-col>
                    <div
                      class="file-list"
                      v-if="fileListRef && fileListRef.length"
                      style="margin-left: 95px;margin-top: -20px;width: 60%;"
                    >
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
                    </div>
                  </el-row>
                  <el-row>
                    <el-col
                      class="elcol"
                      :offset="0"
                      :span="24"
                      style="margin-bottom: 8px;display: flex;"
                    >
                      <el-form-item
                        class="name"
                        label="培训资料:"
                      >
                        <el-upload
                          :action="`${actionUrlRef}/upload`"
                          :headers="{
                            token: tokenRef
                          }"
                          ref="upload"
                          :show-file-list="false"
                          :on-success="uploadflZl"
                          :before-upload="beforeupload"
                        >
                          <el-button size="small" plain :icon="Upload"
                            >点击上传</el-button
                          >
                          <span style="margin-left:10px;color:#FF0000">仅支持PDF格式</span>
                        </el-upload>
                      </el-form-item>
                    </el-col>
                    <div
                      class="file-list"
                      v-if="fileListZlRef && fileListZlRef.length"
                      style="margin-left: 95px;margin-top: -20px;width: 60%;"
                    >
                      <div
                        v-for="(v, ind) in fileListZlRef"
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
                        <el-icon class="el-icon-delete" @click.stop="handleRemoveZl(ind)"><Delete /></el-icon>
                        <span style="color: #c0c4cc"
                          >下载次数&nbsp;{{ v.dow_count }}</span
                        >
                      </div>
                    </div>
                  </el-row>
                
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <gdzlqd v-if="formDataRef.sfygdqd === '1'" :form="formDataRef" :workTypeAcronym="workTypeAcronymRef"
                :workType="`培训活动`"
                :workName="formDataRef['train_name']"
                :fillWorkNum="fillWorkNumRef" :plantype="plantypeRef" ref="gdzlqdRef" :mode="`add`"></gdzlqd>
            </el-row>

            <!-- 课程列表 -->
            <el-row style="margin: 18px 0">
              <el-col class="m-head_title" :offset="4" :span="16">
                <div class="m-title">
                  <span>课程列表</span>
                </div>
                <el-button style="float: right;"
                  type="primary"
                  size="small"
                  @click="workStore.mutIfShowAddCourse(true)"
                  >新增</el-button
                >
              </el-col>
            </el-row>
            <el-row style="margin: 18px 0">
              <el-col class="m-head_title" :offset="4" :span="16">
                <!-- 课程列表 -->
                <CourseTable
                  :editAble="true"
                  @courseNum="getCourseNum"
                  :cateGory="formDataRef.cateGory"
                  :getUuid="formDataRef.clientUuid"
                  @courseLongSum="getCourseLongSum"
                />
              </el-col>
            </el-row>
            <AddCourseModal
              :cateGory="formDataRef.cateGory"
              :getUuid="formDataRef.clientUuid"
            />

          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script setup name="TrainingPlanAdd">
import { ref, watch, onMounted, onBeforeUnmount, computed, nextTick } from 'vue'
import { workDynamicsStore } from '@/store'
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import AddCourseModal from './course/addCourseModal.vue'
import CourseTable from './course/courceTable.vue'
import { mime } from '../components/mime.js'
import gdzlqd from '../components/gdzlqd.vue'
import { delFile, addOverPlan, withFile, getWorkNum } from '@/api'
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'
import { Upload, Paperclip, Delete } from '@element-plus/icons-vue'
import * as UUID from 'node-uuid'

const workStore = workDynamicsStore()
const router = useRouter()
const route = useRoute()

const gdzlqdRef = ref(null)

const loadingRef = ref(null)
const editRef = ref(false)

const elFormRef = ref(null)
const rulesRef = ref({
  train_name: [
    { required: true, message: '请输入培训名称', trigger: 'blur' }
  ],
  organize_unit: [
    { required: true, message: '请输入组织单位', trigger: 'blur' }
  ],
  train_to: [
    { required: true, message: '请输入培训对象', trigger: 'blur' }
  ],
  train_start: [
    { required: true, message: '请输入开始时间', trigger: 'change' }
  ],
  train_end: [
    { required: true, message: '请输入结束时间', trigger: 'change' }
  ],
  student_count: [
    { required: true, message: '请输入培训人数', trigger: 'change' }
  ],
})

// 属性
const plantypeRef = ref(`5`)
const countRadioRef = ref(1)
const radioObjRef = ref({
  radio1: null,
  radio2: null,
  radio3: null,
  radio4: null,
  radio5: null
})
const addSucRef = ref(true)
const tokenRef = ref(sessionStorage.getItem('access_token'))
const fileListRef = ref([])
const fileListZlRef = ref([])
const actionUrlRef = ref(`${baseUrl[ENV]['fileUrl']}`)
const optionsRef = ref([])
const optionRef = ref([
  // { label: '技术规范解读', value: 1 },
  // { label: '线下培训', value: 2 },
  { label: '软件系统操作', value: 4 },
  { label: '专题培训', value: 3 },
  { label: '直播答疑', value: 5 },
  { label: '地方培训', value: 6 }
])
const activeNameRef = ref('first')

const UserInfo = JSON.parse(decodeURIComponent(atob(sessionStorage.getItem('UserInfo'))))
const formDataRef = ref({
  created_code: UserInfo.department.code,
  created_code_name: UserInfo.department.code_name,
  jg_id: UserInfo.user.dep_id,
  jg_name: UserInfo.department.dep_name,
  created_user:UserInfo.user.id,
  train_content:'',
  isjoinevent: 0,
  sfygdqd:'0',
  work_type:`培训活动`,
  clientUuid:''
})
const editorOptionRef = ref({
  placeholder: '',
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
const courseNumRef = ref(0) // 课程数量
const courseLongSumRef = ref(0) // 课时长度
// const optionkclxRef = ref(['调查', '评估','软件','宣传','组织实施']) //课程分类
const optionkclxRef = ref(['调查', '评估','软件','组织实施']) //课程分类
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
const typeRef = ref(UserInfo.department.dep_type)
const levRef = ref(UserInfo.department.dep_lev)
const workTypeAcronymRef = ref('PXHD')
const fillWorkNumRef = ref('')
// 归档资料清单
const optionsGdzlqdRef = ref([
  { label: '是', value: "1" },
  { label: '否', value: '0' },
])

// 计算
const isCountryCensusOfficeRef = computed(() => {
  return workStore.isCountryCensusOffice()
})

// tipsBeforeLeavePage
const isAddPageRef = computed(() => {
  return route.path.includes('add') || route.path.includes('Add')
})

// 方法
// 获取完整的编号 工作（活动）编码：首字母缩写（如会议:HY+会议召开日期+001(3位编号)）
const getFillWorkNum = () => {
  return `${workTypeAcronymRef.value}_${getTimeForWorkNum('train_start')}_${typeof formDataRef.value.work_num === 'string'? formDataRef.value.work_num.split('_').at(-1) :''}`
}


const getFillWorkNumPrefix = () => {
  return `${workTypeAcronymRef.value}_${getTimeForWorkNum('train_start')}_`
}

//组织编号格式
const getTimeForWorkNum = (timeField) => {
  return Array.isArray(formDataRef.value[timeField])?formDataRef.value[timeField][0].substring(0,10):formDataRef.value[timeField]?formDataRef.value[timeField].substring(0,10):''
}

const validateEventContent = (rule) => {
  if(isCountryCensusOfficeRef.value != 1) return
  if (formDataRef.value.isjoinevent == 1 && !formDataRef.value.event_content) {
    return ElMessage.error('请输入大事记主要内容')
  }
}

const validateWorkNum = (value) => {
  // debugger
  if(isCountryCensusOfficeRef.value != 1) return
  if (!/^\d{3}$/.test(formDataRef.value.work_num.padStart(3, 0))) {
    formDataRef.value.work_num = ''
    return ElMessage.error('请输入3位以内的数字')
  }
}

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

const getCourseNum = (data) => {
  courseNumRef.value = data
}

const getCourseLongSum = (data) => {
  courseLongSumRef.value = data
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

const uploadflZl = (response, file) => {
  if (response && response.code == '1') {
    fileListZlRef.value.push({
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
  const isLt2M = file.size / 1024 / 1024 <= 2000

  if (!mime[filename]) {
    // ElMessage.error('上传文件不符合格式!')
    ElMessage.error('仅支持.pdf格式上传!')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('上传文件大小不能超过 2GB!')
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
    .then(async () => {
      try{
        let res = await delFile({ fileuuid: fileListRef.value[index].uuid, plantype: plantypeRef.value })
        if (res!=null) {
          fileListRef.value.splice(index, 1)
          ElMessage.success('文件删除成功')
        } else {
          ElMessage.error('服务器出错，请稍后重试')
        }
      }catch(err){
        ElMessage.info('已取消删除')
      }
    })

}

const handleRemoveZl = (index) => {
  ElMessageBox.confirm('此操作将删除文件, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      try{
        let res = await delFile({ fileuuid: fileListZlRef.value[index].uuid, plantype: plantypeRef.value });
        if (res!=null) {
          fileListZlRef.value.splice(index, 1)
          ElMessage.success('文件删除成功')
        } else {
          ElMessage.error('服务器出错，请稍后重试')
        }
      }catch(err){
        ElMessage.info('已取消删除')
      }
    })
}

const submit = (validate = true, routing = true) => {
  if (!validate) {
    //不校验
    if (!formDataRef.value.train_name) {
      ElMessage.warning('请输入培训名称')
      return
    }
    addOverPlanFunction(validate, routing)
    return
  } else {
    if (!formDataRef.value.organize_unit) {
      ElMessage.warning('请输入组织单位')
      return
    }
    if (!formDataRef.value.train_to) {
      ElMessage.warning('请输入培训对象')
      return
    }
    if (!formDataRef.value.train_start) {
      ElMessage.warning('请输入开始时间')
      return
    }
    if (!formDataRef.value.train_end) {
      ElMessage.warning('请输入结束时间')
      return
    }
    if (!formDataRef.value.student_count) {
      ElMessage.warning('请输入培训人数')
      return
    }
    if (fileListRef.value && fileListRef.value.length == 0) {
      ElMessage.error('附件为必填项，上传后才能提交')
      return
    }

    // if (
    //   (formDataRef.value.levhy >= 0 &&
    //     formDataRef.value.levhy !== '' &&
    //     formDataRef.value.lev) ||
    //   (!formDataRef.value.levhy && !formDataRef.value.lev)
    // ) {
    // } else {
    //     ElMessage.error('下发级别与下发行业必须同时填写')
    //     return
    // }
    if (formDataRef.value.sfygdqd === "1" && isCountryCensusOfficeRef.value == 1 && !gdzlqdRef.value.validateGdzlqd()) {
      return
    }
    addOverPlanFunction(validate, routing)
  }
}

// 点击提交活动概要编辑
const addOverPlanFunction = async (validate = true, routing=true) => {
  if (levRef.value !== 1) {
    formDataRef.value.train_form = 6
  }
  if (levRef.value == 1 && typeRef.value != 0) {
    formDataRef.value.train_form = 7
  }
  // let obj = {}
  // formDataRef.value.cateGory &&
  //   formDataRef.value.cateGory.forEach((item, index) => {
  //     if (item) {
  //       debugger
  //       // obj[index + 1] = item
  //     }
  //   })
  //   console.log(formDataRef.value.cateGory.toString() );
  // debugger
  formDataRef.value.course_type_info = formDataRef.value.cateGory.toString()
  formDataRef.value.lev_hy = [
    {
      lev_hy: formDataRef.value.levhy,
      lev_qh: formDataRef.value.lev,
      lev_code: UserInfo
        .department.simcode
    }
  ]

  formDataRef.value.plantype = plantypeRef.value
  if (isCountryCensusOfficeRef.value) {
    formDataRef.value.group_id = UserInfo
    .group[0].group_id
  }
  formDataRef.value.train_long = courseLongSumRef.value
  formDataRef.value.work_num =  getFillWorkNum() //组织编号格式
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
  const res = await addOverPlan(formDataRef.value)
    if (res!=null) {
      if (fileListRef.value && fileListRef.value.length > 0) {
        let fileData = []
        fileListRef.value.forEach(item => {
          fileData.push(item.uuid)
        })
        let fileuuid = fileData.join(',')
        withFile({
          planuuid: formDataRef.value.clientUuid,
          fileuuid: fileuuid,
          plantype: plantypeRef.value,
          usetype: 1
        })
      }

      if (fileListZlRef.value && fileListZlRef.value.length > 0) {
        let fileData = []
        fileListZlRef.value.forEach(item => {
          fileData.push(item.uuid)
        })
        let fileuuid = fileData.join(',')
        withFile({
          planuuid: formDataRef.value.clientUuid,
          fileuuid: fileuuid,
          plantype: plantypeRef.value,
          usetype: 15
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
      ElMessage.success('新增培训计划成功!')
      if (routing) {
        router.push({
          name: 'TrainingPlanDetail',
          query: { uuid: formDataRef.value.clientUuid }
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
  () => formDataRef.value.train_start,
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
  // 前端传uuid
  formDataRef.value.clientUuid = UUID.v1()
  let lev = UserInfo
    .department.dep_lev
  // if (typeRef.value != 0) {
  //   optionshyRef.value = [optionshyRef.value.find(val => val.value == typeRef.value)]
  // }
  // optionshyRef.value = optionshyRef.value.filter(val => val.value !== 1)
  if (lev == 1) {
    optionsRef.value = [
      { label: '国家', value: 1, name: 'radio1' },
      { label: '省级', value: 2, name: 'radio2' },
      { label: '市级', value: 3, name: 'radio3' },
      { label: '县级', value: 4, name: 'radio4' },
      { label: '无', value: '', name: 'radio5' }
    ]
  } else if (lev == 2) {
    optionsRef.value = [
      { label: '省级', value: 2, name: 'radio2' },
      { label: '市级', value: 3, name: 'radio3' },
      { label: '县级', value: 4, name: 'radio4' },
      { label: '无', value: '', name: 'radio5' }
    ]
  } else if (lev == 3) {
    optionsRef.value = [
      { label: '市级', value: 3, name: 'radio3' },
      { label: '县级', value: 4, name: 'radio4' },
      { label: '无', value: '', name: 'radio5' }
    ]
  } else if (lev == 4) {
    optionsRef.value = [
      { label: '县级', value: 4, name: 'radio4' },
      { label: '无', value: '', name: 'radio5' }
    ]
  }

  // tipsBeforeLeavePage
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
.m-head_title {
  min-width: 945px;
  .m-title {
    width: 30%;
    height: 25px;
    line-height: 25px;
    // border-left: 4px solid #4083e7;
    border-left: 4px solid var(--theme-color);
    float: left;
    span {
      font-size: 18px;
      font-weight: 400;
      line-height: 23px;
      // color: #4083e7;
      color: var(--theme-color);
      margin-left: 8px;
    }
  }
  .el-button--mini {
    float: right;
  }
  .el-button--mini:nth-of-type(1) {
    margin-left: 10px;
  }
}
.m-height {
  min-width: 945px;
  min-height: 230px;
  padding: 20px 0 20px 20px;
  background: #f4f4f4;
  border-radius: 5px;
  :deep(.el-form-item__label) {
    font-weight: normal!important;
  }
}
</style>
