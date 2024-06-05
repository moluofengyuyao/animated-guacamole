<template>
  <!-- 新增课程 -->
  <el-dialog class="m-form-dialog"
    title="新增课程"
    v-model="workStore.staIfShowAddCourse"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    width="566px"
    top="15vh"
    style="margin: 0 auto"
    :before-close="beforeClose"
  >
    <div class="m-formDiv">
      <el-form
        ref="elFormRef"
        size="small"
        label-position="right"
        :rules="rulesRef"
        :model="formDataRef"
        label-width="120px"
      >
        <el-form-item
          class="name"
          label="课程题目:"
          prop="course_title"
        >
          <el-input
            style="width: 100%"
            v-model="formDataRef.course_title"
            size="small"
            placeholder="请填写课程题目"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item
          class="name"
          label="课程分类:"
          prop="course_type"
        >
          <el-select
            class="eldate"
            style="width: 100%"
            v-model="formDataRef.course_type"
            placeholder="请选择课程分类"
            size="small"
            allow-create
          >
            <el-option
              v-for="(item, index) in cateGoryArrsRef"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item
          class="name"
          label="主讲人:"
          prop="course_speaker"
        >
          <el-input
            style="width: 100%"
            v-model="formDataRef.course_speaker"
            size="small"
            placeholder="请填写课程主讲人"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="name"
          label="主讲人单位:"
          prop="speaker_util"
        >
          <el-input
            style="width: 100%"
            v-model="formDataRef.speaker_util"
            size="small"
            placeholder="请填写主讲人单位"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="name"
          label="职务/职称:"
          prop="speaker_post"
        >
          <el-input
            style="width: 100%"
            v-model="formDataRef.speaker_post"
            size="small"
            placeholder="请填写职务/职称"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="name"
          label="课程长度(分钟):"
          prop="course_long"
        >
          <el-input-number
            style="width: 100%"
            v-model="formDataRef.course_long"
            size="small"
            placeholder="请填写课程长度(分钟)"
          ></el-input-number>
        </el-form-item>
        <el-form-item
          class="name"
          label="录制时长(分钟):"
          prop="record_long"
        >
          <el-input-number
            style="width: 100%"
            v-model="formDataRef.record_long"
            size="small"
            placeholder="请填写录制时长(分钟)"
          ></el-input-number>
        </el-form-item>
        <el-form-item
          class="name"
          label="录制类型:"
          prop="record_type"
        >
          <el-select
            class="eldate"
            style="width: 100%;"
            clearable
            size="small"
            v-model="formDataRef.record_type"
          >
            <el-option label="培训现场录制" value="1" />
            <el-option label="专门录制" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item
          class="name"
          label="PPT课件附件:"
        >
          <el-upload
            style="padding-bottom: 10px"
            :action="`${actionUrlRef}/upload`"
            :headers="{
              token: tokenRef
            }"
            ref="upload"
            :show-file-list="false"
            :on-success="uploadSuccess1"
            :before-upload="beforeupload1"
          >
            <el-button size="small" plain :icon="Upload">点击上传</el-button>
            <span style="margin-left:10px;color:#FF0000">仅支持PDF格式</span>
          </el-upload>
        </el-form-item>
        <div class="file-list" v-if="fileList1Ref.length">
          <div v-for="(v, ind) in fileList1Ref" :key="ind" class="file-list-item">
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
            <el-icon class="el-icon-delete" @click.stop="handleRemove(ind, 1)"><Delete /></el-icon>
          </div>
        </div>
        <el-form-item
          class="name"
          label="文字材料附件:"
        >
          <el-upload
            style="padding-bottom: 10px"
            :action="`${actionUrlRef}/upload`"
            :headers="{
              token: tokenRef
            }"
            ref="upload"
            :show-file-list="false"
            :on-success="uploadSuccess2"
            :before-upload="beforeupload2"
          >
            <el-button size="small" plain :icon="Upload">点击上传</el-button>
            <span style="margin-left:10px;color:#FF0000">仅支持PDF格式</span>
          </el-upload>
        </el-form-item>
        <div class="file-list" v-if="fileList2Ref.length">
          <div v-for="(v, ind) in fileList2Ref" :key="ind" class="file-list-item">
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
            <el-icon class="el-icon-delete" @click.stop="handleRemove(ind, 2)"><Delete /></el-icon>
          </div>
        </div>
        <el-form-item
          class="name"
          label="培训视频:"
        >
          <el-upload
            style="padding-bottom: 10px"
            :action="`${actionUrlRef}/upload`"
            :headers="{
              token: tokenRef
            }"
            ref="upload"
            :show-file-list="false"
            :on-success="uploadSuccess3"
            :before-upload="beforeupload3"
          >
            <el-button size="small" plain :icon="Upload">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <div class="file-list" v-if="fileList3Ref.length">
          <div v-for="(v, ind) in fileList3Ref" :key="ind" class="file-list-item">
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
            <el-icon class="el-icon-delete" @click.stop="handleRemove(ind, 3)"><Delete /></el-icon>
          </div>
        </div>
      </el-form>
    </div>
    <template #footer class="dialog-footer">
      <el-button @click="workStore.mutIfShowAddCourse(false)" link size="small"
        >取 消</el-button
      >
      <el-button type="primary" @click="sumbitAddCourse" size="small"
        >确 定</el-button
      >
    </template>
  </el-dialog>
</template>

<script setup name="AddCourseModal">
import { ref, watch, computed, nextTick } from 'vue'
import { workDynamicsStore } from '@/store'
import { useRoute } from 'vue-router'
import { addOverPlan, withFile, delFile } from '@/api'
import { mime } from '../../components/mime.js'
import { mimes } from '../../components/mimes.js'
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'
import { Upload, Paperclip, Delete } from '@element-plus/icons-vue'

const workStore = workDynamicsStore()
const route = useRoute()

const props = defineProps({
  getUuid: {
    type: String,
  },
  cateGory: {
    type: [ Array , String],
  }
});

const loadingRef = ref(null)

const elFormRef = ref(null)
const rulesRef = ref({
  course_title: [
    { required: true, message: '请输入课程题目', trigger: 'blur' }
  ],
  // course_type: [
  //   { required: true, message: '请选择课程分类', trigger: 'change' }
  // ],
  course_speaker: [
    { required: true, message: '请输入主讲人', trigger: 'blur' }
  ],
  speaker_util: [
    { required: true, message: '请输入主讲人单位', trigger: 'blur' }
  ],
  speaker_post: [
    { required: true, message: '请输入主讲人职务/职称', trigger: 'blur' }
  ],
  course_long: [
    { required: true, message: '请输入课程长度(分钟)', trigger: 'change' }
  ],
  record_long: [
    { required: true, message: '请输入录制时长(分钟)', trigger: 'change' }
  ],
  record_type: [
    { required: true, message: '请选择录制类型', trigger: 'change' }
  ],
})

// 属性
const formDataRef = ref({ course_long: 60,record_long : 60 })
// const speacalOptionRef = ref([
//   '组织统筹专题',
//   '调查工作专题',
//   '评估区划专题',
//   '数据管理工作专题',
//   '软件系统建设专题',
//   '普查办工作专题',
//   '减灾资源能力调查',
//   '重点隐患调查',
//   '房屋建筑与市政设施调查',
//   '历史灾害调查',
//   '气象灾害调查',
//   '地质灾害调查灾害调查',
//   '地震灾害调查',
//   '森林和草原灾害调查',
//   '水旱灾害调查',
//   '海洋灾害调查',
//   '公路与水运设施调查',
//   '民用核设施专题'
// ])
const actionUrlRef = ref(`${baseUrl[ENV]['fileUrl']}`)
const tokenRef = ref(sessionStorage.getItem('access_token'))
const fileList1Ref = ref([])
const fileList2Ref = ref([])
const fileList3Ref = ref([])
const timerRef = ref(null)
// const optionkclxRef = ref(['调查', '评估','软件','宣传','组织实施']) //课程分类
const cateGoryArrsRef = ref([])

// store
const staIfShowAddCourseRef = computed(() => {
  return workStore.staIfShowAddCourse
})

const cateGoryArrRef = computed(() => {
  if (props.cateGory) {
    let arr = props.cateGory
    if (arr[arr.length - 1]) {
      return arr
    } else {
      arr.pop()
      return arr
    }
  } else {
    return []
  }
})

// 方法
const beforeClose = () => {
  workStore.mutIfShowAddCourse(false)
}

const sumbitAddCourse = () => {
  elFormRef.value.validate(valid => {
    if (valid) {
      formDataRef.value.plantype = '36'
      // 前端传uuid
      formDataRef.value.in_public = props.getUuid || route.query.uuid
      console.log( formDataRef.value);
      // debugger
      // formDataRef.value.in_public = route.query.uuid
      addOverPlan(formDataRef.value).then(res => {
        workStore.mutIfShowAddCourse(false)
        if (res!=null) {
          let courseId = res[0].uuid
          for (let i = 0; i < fileList1Ref.value.length; i++) {
            let data = {
              planuuid: courseId,
              fileuuid: fileList1Ref.value[i].uuid,
              plantype: '36',
              usetype: '5'
            }
            withFile(data)
          }

          for (let i = 0; i < fileList2Ref.value.length; i++) {
            let data = {
              planuuid: courseId,
              fileuuid: fileList2Ref.value[i].uuid,
              plantype: '36',
              usetype: '6'
            }
            withFile(data)
          }
          for (let i = 0; i < fileList3Ref.value.length; i++) {
            let data = {
              planuuid: courseId,
              fileuuid: fileList3Ref.value[i].uuid,
              plantype: '36',
              usetype: '9'
            }
            withFile(data)
          }
          ElMessage.success('新增课程成功')
        } else {
          ElMessage.error('服务器出错，请稍后重试')
        }
      })
    } else {
      ElMessage.error('验证不通过，请按要求填写')
      return false
    }
  })
}

const beforeupload1 = (file) => {
  let filename = file.name.slice(file.name.lastIndexOf('.'))
  // let fileCate = ["jpg", "jpeg", "png", "gif", "bmp", "pdf", "ppt", "txt", "doc", "docx", "xls", "xlsx", "pptx", "mpeg", "3gp", "mp4", "avi", "flv", "zip", "rar", "7z", "bz2", "gz"];
  const isLt2M = file.size / 1024 / 1024 <= 1000

  if (!mimes[filename]) {
    // ElMessage.error('上传文件不符合格式!')
    ElMessage.error('仅支持.pdf格式上传!')
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

const beforeupload2 = (file) => {
  let filename = file.name.slice(file.name.lastIndexOf('.'))
  // let fileCate = ["jpg", "jpeg", "png", "gif", "bmp", "pdf", "ppt", "txt", "doc", "docx", "xls", "xlsx", "pptx", "mpeg", "3gp", "mp4", "avi", "flv", "zip", "rar", "7z", "bz2", "gz"];

  const isLt2M = file.size / 1024 / 1024 <= 1000

  if (!mimes[filename]) {
    // ElMessage.error('上传文件不符合格式!')
    ElMessage.error('仅支持.pdf格式上传!')
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

const beforeupload3 = (file) => {
  if (fileList3Ref.value.length >= 1) {
    ElMessage.warning('每个课程只支持上传一个视频。')
    return false
  }
  let filename = file.name.slice(file.name.lastIndexOf('.'))
  // let fileCate = ["jpg", "jpeg", "png", "gif", "bmp", "pdf", "ppt", "txt", "doc", "docx", "xls", "xlsx", "pptx", "mpeg", "3gp", "mp4", "avi", "flv", "zip", "rar", "7z", "bz2", "gz"];

  // const isLt2M = file.size / 1024 / 1024 <= 10000
  const isLt2M = file.size / 1024 / 1024 <= 2000

  if (!mime[filename]) {
    ElMessage.error('上传文件不符合格式!')
    return false
  }
  if (!isLt2M) {
    // ElMessage.error('上传文件大小不能超过 10GB!')
    ElMessage.error('上传文件大小不能超过 2GB!')
    return false
  }
  loadingRef.value = ElLoading.service({
    text: '正在上传中...'
  })
}

const uploadSuccess1 = (response, file) => {
  if (response && response.code == '1') {
    fileList1Ref.value.push({
      uuid: response.data[0].uuid,
      ext: response.data[0].ext,
      filename: response.data[0].filename
    })
    nextTick(() => {
      // 以服务的方式调用的 Loading 需要异步关闭
      loadingRef.value.close()
    })
    ElMessage.success('上传成功')
  } else {
    nextTick(() => {
      // 以服务的方式调用的 Loading 需要异步关闭
      loadingRef.value.close()
    })
    ElMessage.error('文件上传失败')
  }
}

const uploadSuccess2 = (response, file) => {
  if (response && response.code == '1') {
    fileList2Ref.value.push({
      uuid: response.data[0].uuid,
      ext: response.data[0].ext,
      filename: response.data[0].filename
    })
    nextTick(() => {
      // 以服务的方式调用的 Loading 需要异步关闭
      loadingRef.value.close()
    })
    ElMessage.success('上传成功')
  } else {
    nextTick(() => {
      // 以服务的方式调用的 Loading 需要异步关闭
      loadingRef.value.close()
    })
    ElMessage.error('文件上传失败')
  }
}

const uploadSuccess3 = (response, file) => {
  if (response && response.code == '1') {
    fileList3Ref.value.push({
      uuid: response.data[0].uuid,
      ext: response.data[0].ext,
      filename: response.data[0].filename
    })
    nextTick(() => {
      // 以服务的方式调用的 Loading 需要异步关闭
      loadingRef.value.close()
    })
    ElMessage.success('上传成功')
  } else {
    nextTick(() => {
      // 以服务的方式调用的 Loading 需要异步关闭
      loadingRef.value.close()
    })
    ElMessage.error('文件上传失败')
  }
}

// 删除上传文件
const handleRemove = async (index, type) => {
  ElMessageBox.confirm('此操作将删除文件, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      let fileuuid
      let usetype
      if (type === 1) {
        fileuuid = fileList1Ref.value[index].uuid
        usetype = '5'
      } else if (type === 2) {
        fileuuid = fileList2Ref.value[index].uuid
        usetype = '6'
      } else {
        fileuuid = fileList3Ref.value[index].uuid
        usetype = '9'
      }
      let data = {
        fileuuid: fileuuid,
        plantype: '36',
        usetype: usetype
      }
      let res = await delFile(data);
      if (res!=null) {
        if (type === 1) {
          fileList1Ref.value.splice(index, 1)
        } else if (type === 2) {
          fileList2Ref.value.splice(index, 1)
        } else {
          fileList3Ref.value.splice(index, 1)
        }
        ElMessage.success('文件删除成功')
      }
    })
    .catch(() => {
      ElMessage.info('已取消删除')
    })
}

// 监听
watch(
  () => props.cateGory,
  () => {
    if (timerRef.value) {
      clearTimeout(timerRef.value)
    }

    timerRef.value = setTimeout(() => {
      cateGoryArrsRef.value = cateGoryArrRef.value
    }, 1500)
  },
  {
    deep: true,immediate: true
  }
)

watch(
  () => staIfShowAddCourseRef.value,
  (newV) => {
    formDataRef.value = { course_long: 60,record_long:60 }
    fileList1Ref.value = []
    fileList2Ref.value = []
    fileList3Ref.value = []
  },
  {
    deep: true,immediate: true
  }
)
</script>

<style lang="scss" scoped>
// 点击模态框表单
.m-formDiv {
  padding: 20px 40px 0px;
  :deep(.el-form-item__label) {
    color:var(--el-text-color-regular)!important;
    font-weight: normal!important;
  }
}

// 上传列表
.file-list {
  width: 60%;
  margin-top: -20px;
  margin-bottom: 5px;
  margin-left: 120px;
  overflow: hidden;
  .file-list-item:hover {
    // background-color: #e5f7ff;
    background-color:#e9f3f2;
    cursor: pointer;
    border-radius: 4px;
  }
  .file-list-item {
    float: left;
    // width: 100%;
    width: 98%;
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
      color: var(--theme-color);
    }
    .el-icon-upload {
      float: right;
      line-height: 32px;
      color: var(--theme-color);
      font-size: 18px;
    }
    .el-icon-paperclip {
      float: left;
      line-height: 32px;
      color: var(--theme-color);
    }
  }
}
</style>
