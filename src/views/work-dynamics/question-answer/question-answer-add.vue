<template>
  <!-- 新增消息 -->
  <div class="taskBuild">
    <div class="mainBox">
      <div class="tableBox commomElTab">
        <el-button
          type="primary"
          :disabled="!addSucRef"
          size="small"
          @click="clickSave"
          class="tab-new-submit-btn"
          >保存</el-button
        >
        <el-tabs v-model="activeNameRef">
          <el-tab-pane style="overflow-y: scroll" label="直播答疑新增" name="first">
            <!-- <el-row>
              <el-col class="m-form-item" :offset="4" :span="16">
                <div class="title">
                  <span>基本信息</span>
                  <div class="line"></div>
                  <div class="triangle-right1"></div>
                  <div class="triangle-right2"></div>
                </div>
              </el-col>
            </el-row> -->
            <el-row>
              <el-col class="elcol" :offset="4" :span="16">
                <el-form 
                  size="small" 
                  label-position="right" 
                  :model="formListRef" 
                  label-width="140px"
                  :rules="rulesRef"
                  ref="ruleFormRef"
                >
                  <el-row>
                    <el-col class="elcol" :offset="0" :span="24">
                      <el-form-item class="name" prop="tittle" :label="`${headTitleRef}标题:`">
                        <el-input v-model="formListRef.tittle" placeholder="请输入标题"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col class="elcol" :offset="0" :span="24">
                      <el-form-item class="m-label" label="来源:" prop="source">
                        <el-input v-model="formListRef.source" placeholder="请输入来源"></el-input> 
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col class="elcol" :offset="0" :span="24">
                      <el-form-item class="name" label="查看级别:" prop="find_lev">
                        <el-select class="eldate" style="width: 100%" v-model="formListRef.find_lev" placeholder="请选择查看级别">
                          <el-option v-for="item in optionsRef" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col class="elcol" :offset="0" :span="24">
                      <el-form-item class="name" label="发布人:" prop="duty">
                        <el-input v-model="formListRef.duty" placeholder="请输入发布人"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col class="elcol" :offset="0" :span="24">
                      <el-form-item class="name" label="发布机构名称:" prop="public_jg_name">
                        <el-input v-model="formListRef.public_jg_name" placeholder="请输入发布机构名称"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <!-- <el-row><el-col class="elcol" :offset="0" :span="24">
                    <el-form-item class="name" label="是否置顶:" prop="istop">
                      <el-switch v-model="formListRef.istop"></el-switch>
                    </el-form-item>
                  </el-col></el-row> -->
                  <el-row>
                    <el-col class="elcol quill-elcol-form" :offset="0" :span="24" v-if="!formListRef.isout">
                      <el-form-item label="正文内容:" prop="content">
                        <div class="content">
                          <!-- 富文本编辑器暂时注释-zyt -->
                          <QuillEditor ref="myQuillEditorRef" class="editer"
                            v-model:content="formListRef.content"
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
                      <!-- 上传图片 -->
                      <el-upload
                        class="uploadImg"
                        style="display: none"
                        :action="`${actionUrlRef}/upload`"
                        :headers="{
                          token: tokenRef,
                        }"
                        :show-file-list="false"
                        :on-success="uploadImgFinish"
                        :before-upload="beforeupload"
                        multiple
                        :on-change="uploadImg"
                      >
                      <el-button size="small" plain :icon="Upload">点击上传</el-button>
                      </el-upload>
                    </el-col>
                  </el-row>
                  <el-row>
                    <!-- 上传附件 -->
                    <el-col class="elcol" :offset="0" :span="24" v-if="!formListRef.isout">
                      <el-form-item class="name" label="上传附件">
                        <el-upload
                          class="upload-demo"
                          style="padding-bottom: 10px"
                          :action="`${actionUrlRef}/upload`"
                          :headers="{
                            token: tokenRef,
                          }"
                          ref="upload"
                          :show-file-list="false"
                          :on-success="uploadfl"
                          :before-upload="beforeupload"
                        >
                          <el-button size="small" plain :icon="Upload">点击上传</el-button>
                        </el-upload>
                        <div class="file-list" v-if="fileListRef && fileListRef.length">
                          <div v-for="(v, ind) in fileListRef" :key="ind" class="file-list-item">
                            <el-icon class="el-icon-paperclip"><Paperclip /></el-icon>
                            <span :title="v.filename" style="display: inline-block; width: 50%; white-space: nowrap; text-overflow: ellipsis; overflow: hidden">{{ v.filename }}</span>
                            <el-icon class="el-icon-delete" @click="handleRemoveFile(ind)"><Delete /></el-icon>
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

<script setup name="QuestionAnswerAdd">
import { ref, onMounted, onBeforeUnmount, computed, nextTick, toRaw  } from 'vue'
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'
import { QuillEditor, Quill } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { delFile, saveNews, withFile } from '@/api'
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'
import { Upload, Paperclip, Delete } from '@element-plus/icons-vue'
import { mime } from '../components/mime.js'

const router = useRouter()
const route = useRoute()

const ruleFormRef = ref(null)
const myQuillEditorRef = ref(null)

const loadingRef = ref(null)
const editRef = ref(false)

const activeNameRef = ref('first')

const addSucRef = ref(true)

const formListRef = ref({
  tittle: '',
  source: '',
  find_lev: '',
  public_jg_name: '',
  duty: '',
  content: '',
  public_at: '',
  istop: false,
  isout: false,
  out_url: ''
})
const optionsRef = ref([
  { label: "国家", value: 1 },
  { label: "省级", value: 2 },
  { label: "市级", value: 3 },
  { label: "县级", value: 4 },
])
const tokenRef = ref(sessionStorage.getItem("access_token"))
const actionUrlRef = ref(`${baseUrl[ENV]['fileUrl']}`) // 服务地址
//预览文件服务地址+文件相对路径
const previewUrlRef = ref(`${baseUrl[ENV]['previewUrl']}`)
const editorOptionRef = ref({
  placeholder: "请输入详细内容",
  modules: {
    toolbar: {
      container:[
        ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
        [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
        [{ list: "ordered" }, { list: "bullet" }], //列表
        [{ script: "sub" }, { script: "super" }], // 上下标
        [{ indent: "-1" }, { indent: "+1" }], // 缩进
        [{ direction: "rtl" }], // 文本方向
        [{ size: ["small", false, "large", "huge"] }], // 字体大小
        [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
        [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
        [{ font: [] }], //字体
        [{ align: [] }], //对齐方式
        ["clean"], //清除字体样式
        ["image"]
      ],
      handlers: {
        image: (value) => { //编辑器-上传图片
          if (value) {
            // 调用antd图片上传upload
            document.querySelector('.uploadImg .el-upload .el-button').click()
          } else {
            Quill.format('image', false)
          }
        }
      }
    }
  },
})
const rulesRef = ref({
  tittle: [
    { required: true, message: '请输入系统通知标题', trigger: 'blur' },
    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
  ],
  find_lev: [{ required: true, message: '请选择查看级别', trigger: 'change' }],
  public_jg_name: [{ required: true, message: "请输入发布机构名称", trigger: "blur" }],
  duty: [{ required: true, message: "请输入发布人", trigger: "blur" }]
})
const headTitleRef = ref('直播答疑')
const uploadImgListRef = ref([]) // 上传正文图片列表
const fileListRef = ref([]) // 上传附件文件列表

const clickSave = () => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      addNews()
    } else {
      ElMessage.error('验证不通过，请按要求填写')
      return false
    }
  })
}

const beforeupload = (file) => {
  let filename = file.name.slice(file.name.lastIndexOf(".")).toLowerCase()
  // let fileCate = ["jpg", "jpeg", "png", "gif", "bmp", "pdf", "ppt", "txt", "doc", "docx", "xls", "xlsx", "pptx", "mpeg", "3gp", "mp4", "avi", "flv", "zip", "rar", "7z", "bz2", "gz"];
  const isLt2M = file.size / 1024 / 1024 / 1024 <= 1;
  if (!mime[filename]) {
    ElMessage.error('上传文件不符合格式!')
  }
  if (!isLt2M) {
    ElMessage.error('上传文件大小不能超过 1GB!')
  }
  loadingRef.value = ElLoading.service({
    text: '正在上传中...'
  })
}

//上传文件
const uploadfl = (response, file) => {
  // console.log("response, file: ", response, file);
  if (response && response.code == '1') {
    fileListRef.value.push({
      filename: response.data[0].filename,
      dow_count: response.data[0].dow_count,
      uuid: response.data[0].uuid,
      ext: response.data[0].ext
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

// 成功上传图片
const uploadImgFinish = (response, file) => {
  if (response && response.code === 1) {
    uploadImgListRef.value.push(
      { 
        filename: response.data[0].filename, 
        dow_count: response.data[0].dow_count, 
        uuid: response.data[0].uuid, ext: response.data[0].ext 
      }
    )
    nextTick(() => {
      // 以服务的方式调用的 Loading 需要异步关闭
      loadingRef.value.close()
    })
    ElMessage.success('图片上传成功')
  } else {
    nextTick(() => {
      // 以服务的方式调用的 Loading 需要异步关闭
      loadingRef.value.close()
    })
    ElMessage.error('图片上传失败')
  }
}

// 监听改变上传图片--编辑器 
const uploadImg = (info) => {
  let quill = toRaw(myQuillEditorRef.value).getQuill();
  if (info.status === 'success' && info.response.code) {
    // 获取光标所在位置
    let length = quill.getSelection().index
    // 插入图片，res为服务器返回的图片链接地址!!!
    let pictUrl = previewUrlRef.value
    pictUrl = pictUrl.concat(info.response.data[0].path)
    quill.insertEmbed(length, 'image', pictUrl)
    // 调整光标到最后
    quill.setSelection(length + 1)
  }
}

// 删除附件
const handleRemoveFile = async (index) => {
  let res = await delFile({ fileuuid: fileListRef.value[index].uuid })
  if (res!=null) {
    fileListRef.value.splice(index, 1);
    ElMessage.success('文件删除成功')
  }
}

const Format = (fmt) => { // author: meizz
  let myDate = new Date()
    let o = {
        "M+": myDate.getMonth() + 1, // 月份
        "d+": myDate.getDate(), // 日
        "h+": myDate.getHours(), // 小时
        "m+": myDate.getMinutes(), // 分
        "s+": myDate.getSeconds(), // 秒
        "q+": Math.floor((myDate.getMonth() + 3) / 3), // 季度
        "S": myDate.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (myDate.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
}

// 确定提交新闻
const addNews = async () => {
  formListRef.value.table_type = '15'
  formListRef.value.public_at = Format("yyyy-M-d h:m:s.S")
  formListRef.value.isout = formListRef.value.isout ? 1 : 0
  formListRef.value.istop = 0
  loadingRef.value = ElLoading.service({
    text: '正在保存中...'
  })
  try {
    addSucRef.value = false
    let res = await saveNews(formListRef.value)
    if (res!=null) {
      formListRef.value.isout = formListRef.value.isout ? true : false
      formListRef.value.istop = formListRef.value.istop ? true : false
      // 1.关联正文图片
      for (let i = 0; i < uploadImgListRef.value.length; i++) {
        let data = {
          planuuid: res[0].uuid,
          fileuuid: uploadImgListRef.value[i].uuid,
          plantype: '15',
          usetype: '4'
        }
        withFile(data)
      }

      // 2.关联附件
      for (let i = 0; i < fileListRef.value.length; i++) {
        let data = {
          planuuid: res[0].uuid,
          fileuuid: fileListRef.value[i].uuid,
          plantype: '15',
          usetype: '1'
        }
        withFile(data)
      }
      // addSucRef.value = true
      nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loadingRef.value.close()
      })
      ElMessage.success('新增成功')
      router.push({
        path: 'WorkDynamicsList',
        query: { activeName: 'third' }
      })
    } else {
      nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loadingRef.value.close()
      })
      ElMessage.warning('保存失败')
    }
  } catch (error) {
    nextTick(() => {
      // 以服务的方式调用的 Loading 需要异步关闭
      loadingRef.value.close()
    })
    ElMessage.warning('保存失败')
  }
}

onMounted(() => {
  let dep_lev = JSON.parse(decodeURIComponent(atob(sessionStorage.getItem('UserInfo')))).department.dep_lev
  if (dep_lev === 2) {
    optionsRef.value.splice(0, 1)
  } else if (dep_lev === 3) {
    optionsRef.value.splice(0, 2)
  } else if (dep_lev === 4) {
    optionsRef.value.splice(0, 3)
  }
})
</script>

<style lang="scss" scoped>
/* 富文本编辑器表单样式 */
.quill-elcol-form {
  :deep(.el-col){
    display: block;
  }
  :deep(.el-form-item){
    display: block;
    margin-bottom: 0px;
  }
  :deep(.el-form-item__label) {
    float: left;
  }
  :deep(.el-form-item__content){
    display: inline-block;
    width:calc(100% - 140px)
  }
}
</style>