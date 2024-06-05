<template>
  <div class="taskBuild">
    <div class="mainBox">
      <div class="tableBox commomElTab">
        <el-button
          type="primary"
          size="small"
          v-if="
            isEditRef &&
            editRef &&
            roleIsShow('常态工作管理', '工作动态', '直播答疑', '编辑')
          "
          class="tab-edit-btn"
          @click="editDom"
          >编辑</el-button
        >
        <el-button
          type="primary"
          size="small"
          v-if="
            isEditRef && !editRef && roleIsShow('常态工作管理', '工作动态', '直播答疑', '编辑')
          "
          class="tab-edit-cancel-btn"
          @click="closeEdit"
          >取消</el-button
        >
        <el-button
          type="primary"
          size="small"
          v-if="
            isEditRef && !editRef && roleIsShow('常态工作管理', '工作动态', '直播答疑', '编辑')
          "
          @click="submitSave(false)"
          class="tab-edit-save-btn"
          >保存</el-button
        >
        <el-button
          type="primary"
          size="small"
          v-if="
            isEditRef && !editRef && roleIsShow('常态工作管理', '工作动态', '直播答疑', '编辑')
          "
          @click="submitSave"
          class="tab-edit-submit-btn"
          >提交</el-button
        >
        <el-button
          type="primary"
          v-if="
            isEditRef && roleIsShow('常态工作管理', '工作动态', '直播答疑', '删除')
          "
          plain
          size="small"
          class="tab-del-btn"
          @click="openDeleteModal"
          >删除</el-button
        >
        <el-dialog
          title="删除提示"
          class="del-dialog"
          v-model="dialogVisibleRef"
          width="20%"
          top="30vh"
        >
          <span style="padding-left: 26%">是否确认删除该条文件详情？</span>
          <template #footer class="dialog-footer">
            <el-button @click="dialogVisibleRef = false" link size="small"
              >取 消</el-button
            >
            <el-button type="primary" @click="delOverPlanHandler" size="small"
              >确 定</el-button
            >
          </template>
        </el-dialog>

        <!-- 编辑主内容 -->
        <el-tabs v-model="activeNameRef">
          <el-tab-pane style="overflow-y: scroll;height:75vh;" :label="`${headTitleRef}详情`" name="first">
            <!-- <el-row>
              <el-col class="elcol" :offset="4" :span="16">
                <div class="title">
                  <span>基本信息</span>
                  <div class="line"></div>
                  <div class="triangle-right1"></div>
                  <div class="triangle-right2"></div>
                </div>
              </el-col>
              <i class="m-top" title="设置置顶" @click="setTop" v-if="!formDataRef.istop && isEditRef"></i>
              <i class="m-top-active" title="取消置顶" @click="concelTop" v-if="formDataRef.istop && isEditRef"></i>
            </el-row> -->
            <el-row>
              <el-col class="elcol" :offset="4" :span="16">
                <el-form
                  ref="elFormRef"
                  label-position="right"
                  size="small"
                  :rules="rulesRef"
                  :model="formDataRef"
                  :disabled="editRef"
                  label-width="140px"
                >
                  <el-row>
                    <el-col class="elcol" :offset="0" :span="24">
                      <el-form-item class="m-label" :label="`${headTitleRef}标题:`" prop="tittle">
                        <el-input v-if="!editRef" v-model="formDataRef.tittle"></el-input>
                        <span v-if="editRef" style="margin: 0;">{{
                          formDataRef.tittle
                        }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col class="elcol" :offset="0" :span="24">
                      <el-form-item class="m-label" label="来源:" prop="source">
                        <el-input v-if="!editRef" v-model="formDataRef.source"></el-input>
                        <span v-if="editRef" style="margin: 0;">{{
                          formDataRef.source
                        }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col class="elcol" :offset="0" :span="24">
                      <el-form-item class="m-label" label="查看级别:" prop="find_lev">
                        <span v-if="editRef" style="margin: 0;">{{
                          formDataRef.find_lev === 1
                            ? "国家"
                            : formDataRef.find_lev === 2
                            ? "省级"
                            : formDataRef.find_lev === 3
                            ? "市级"
                            : "县级"
                        }}</span>
                        <el-select
                          v-if="!editRef"
                          class="eldate"
                          style="width: 100%"
                          v-model="formDataRef.find_lev"
                          placeholder="请选择"
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
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col class="elcol" :offset="0" :span="24">
                      <el-form-item class="m-label" label="发布机构名称:" prop="public_jg_name">
                        <span v-if="editRef" style="margin: 0;">{{
                          formDataRef.public_jg_name
                        }}</span>
                        <el-input v-if="!editRef" v-model="formDataRef.public_jg_name"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col class="elcol" :offset="0" :span="24">
                      <el-form-item class="m-label" label="发布人:" prop="duty">
                        <span v-if="editRef" style="margin: 0;">{{
                          formDataRef.duty
                        }}</span>
                        <el-input v-if="!editRef" v-model="formDataRef.duty"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col v-if="editRef && !formDataRef.isout" class="elcol" :offset="0" :span="24">
                      <el-form-item label="正文内容:">
                        <div class="formItem">
                          <div class="content">
                            <p class="content ql-snow ql-editor" style="min-height:0px;" v-html="formDataRef.content"></p>
                          </div>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col v-if="!editRef && !formDataRef.isout" class="elcol" :offset="0" :span="24">
                      <el-form-item label="正文内容:">
                        <div style="width:100%;">
                          <!-- 富文本编辑器-zyt -->
                          <QuillEditor
                            ref="myQuillEditorRef" class="editer"
                            v-model:content="formDataRef.content"
                            :options="editorOptionRef"
                            contentType="html"
                            style="width: 100%;"
                          />
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col v-if="editRef" class="elcol" :offset="0" :span="24">
                      <el-form-item label="浏览次数:">
                        <div class="formItem">
                          <div class="content">
                            <p style="margin: 0;" class="content">
                              {{ formDataRef.see_count }}
                            </p>
                          </div>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <!-- 上传图片 -->
                    <el-upload
                      v-if="!editRef && !formDataRef.isout"
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
                  </el-row>
                  <el-row>
                    <!-- 上传文件 -->
                    <el-col class="elcol" :offset="0" :span="24" v-if="!formDataRef.isout">
                      <el-form-item
                        class="m-label"
                        :label="editRef == true ? '附件查看:' : '上传附件:'"
                      >
                        <div>
                          <el-upload
                            v-if="!editRef"
                            style="padding-bottom: 10px"
                            :action="`${actionUrlRef}/upload`"
                            :headers="{
                              token: tokenRef,
                            }"
                            :show-file-list="false"
                            :on-success="uploadfl"
                            :before-upload="beforeupload"
                            multiple
                          >
                            <el-button size="small" plain :icon="Upload">点击上传</el-button>
                          </el-upload>
                          <div class="file-list" v-if="fileListRef && fileListRef.length">
                            <template v-if="!editRef">
                              <div v-for="(v, ind) in fileListRef" :key="ind" class="file-list-item">
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
                              <div v-for="(v, ind) in fileListRef" :key="ind" class="file-list-item">
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
                          <div v-if="editRef && !fileListRef.length" style="color: #c0c4cc">
                            还未上传文件
                          </div>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-col>
            </el-row>
            <!-- 删除模态 -->
            <el-dialog title="删除提示" class="del-dialog"
            v-model="dialogVisibleRef" width="20%" top="30vh">
              <span style="padding-left: 26%">是否确认删除该条信息？</span>
              <template #footer class="dialog-footer">
                <el-button @click="dialogVisibleRef = false" link size="small"
                  >取 消</el-button
                >
                <el-button type="primary" @click="clickSubmitDel" size="small"
                  >确 定</el-button
                >
              </template>
            </el-dialog>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

  </div>
</template>

<script setup name="QuestionAnswerDetail">
import { ref, watch, onMounted, onBeforeUnmount, computed, nextTick, toRaw } from 'vue'
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'
import { QuillEditor, Quill } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { getNewsDetail, downloadFile, delNews, withFile, saveNews, delFile } from '@/api'
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'
import { Upload, UploadFilled, Paperclip, Delete } from '@element-plus/icons-vue'
import { mime } from '../components/mime.js'

const router = useRouter()
const route = useRoute()

const elFormRef = ref(null)
const myQuillEditorRef = ref(null)

const loadingRef = ref(null)

const headTitleRef = ref("直播答疑")
const rulesRef = ref({
  tittle: [
    { required: true, message: '请输入系统通知标题', trigger: 'blur' },
    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
  ],
  find_lev: [{ required: true, message: '请选择查看级别', trigger: 'change' }],
  public_jg_name: [{ required: true, message: "请输入发布机构名称", trigger: "blur" }],
  duty: [{ required: true, message: "请输入发布人", trigger: "blur" }]
})
const tokenRef = ref(sessionStorage.getItem("access_token"))
const dialogVisibleRef = ref(false)
const editRef = ref(true) // 未编辑
const fileListRef = ref([]) // 上传附件文件列表
const uploadImgListRef = ref([]) // 上传正文图片列表
const actionUrlRef = ref(`${baseUrl[ENV]['fileUrl']}`) // 服务地址
//预览文件服务地址+文件相对路径
const previewUrlRef = ref(`${baseUrl[ENV]['previewUrl']}`)
const optionsRef = ref([
  { label: "国家", value: 1 },
  { label: "省级", value: 2 },
  { label: "市级", value: 3 },
  { label: "县级", value: 4 },
])
const activeNameRef = ref("first")
const formDataRef = ref({
  content:''
})
const editorOptionRef = ref({
  placeholder: "请在这里输入正文内容",
  modules: {
    toolbar: {
      container: [
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
        ["image"],
      ],
      handlers: {
        image: (value) => {
          //编辑器-上传图片
          if (value) {
            // 调用antd图片上传upload
            document.querySelector(".uploadImg .el-upload .el-button").click();
          } else {
            Quill.format("image", false);
          }
        },
      },
    },
  },
})
const isEditRef = ref(false)
const UserInfoRef = ref(JSON.parse(decodeURIComponent(atob(sessionStorage.getItem('UserInfo')))))

// 获得该条数据
const getDetail = async () => {
  let type = route.query.type;
  let data = {
    uuid: route.query.uuid,
    table_type: type === 1 ? 17 : type === 2 ? 15 : type === 3 ? 16 : 18,
  };
  let res = await getNewsDetail(data);
  if (res!=null) {
    formDataRef.value = res[0];
    // 只有创建管理员才可以编辑 删除
    if (UserInfoRef.value.user.id === formDataRef.value.updated_user|| UserInfoRef.value.user.log_name === "gpbadmin" ||
      UserInfoRef.value.user.log_name === "gxsnadmin" || 
      UserInfoRef.value.user.log_name === "综合组负责人") {
      isEditRef.value = true;
    }
    //zyt--测试
    // isEditRef.value = true;
    fileListRef.value = res[0].files;
  }
}

const download = async (fileuuid, ext, filename) => {
  loadingRef.value = ElLoading.service({
    text: "正在下载中..."
  });

  let fileext = ext.toLowerCase();
  if (mime[fileext]) {
    let res = await downloadFile(fileuuid);
    if(res!=null){
      nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loadingRef.value.close();
      });
      
      let blob = new Blob([res.data], { type: mime[fileext] }); //type为所需要下载的文件格式，以xls文件为例
      let link = document.createElement("a"); // 创建a标签
      link.style.display = "none";
      let objectUrl = URL.createObjectURL(blob);
      link.href = objectUrl;
      link.setAttribute("download", filename);
      link.click();
      URL.revokeObjectURL(objectUrl);
      getDetail();
    }else{
      nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loadingRef.value.close()
      })
      ElMessage.error('服务器出错，请稍后重试')
    }
  }
}

//删除
const clickSubmitDel = async () => {
  let data = {
    uuid: route.query.uuid,
    table_type: 15,
  };
  let res = await delNews(data)
  if (res!=null) {
    dialogVisibleRef.value = false;
    ElMessage.success('删除成功!')
    router.push({
      path: 'WorkDynamicsList',
      query: { activeName: 'third' }
    })
  }
}

const submitSave = (validate = true) => {
  if (!validate) {
    //不校验
    if (!formDataRef.value.tittle) {
      ElMessage.warning('请输入直播答疑标题')
      return
    }
    editSubmit()
    return
  } else {
    elFormRef.value.validate((valid) => {
      if (valid) {
        editSubmit();
      } else {
        ElMessage.error('验证不通过，请按要求填写')
        return false;
      }
    });
  }
}

const Format = (fmt) => {
  // author: meizz
  let myDate = new Date();
  let o = {
    "M+": myDate.getMonth() + 1, // 月份
    "d+": myDate.getDate(), // 日
    "h+": myDate.getHours(), // 小时
    "m+": myDate.getMinutes(), // 分
    "s+": myDate.getSeconds(), // 秒
    "q+": Math.floor((myDate.getMonth() + 3) / 3), // 季度
    S: myDate.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (myDate.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
}

// 编辑提交
const editSubmit = async () => {
  loadingRef.value = ElLoading.service({
    text: '正在保存中...'
  })
  formDataRef.value.public_at = Format("yyyy-M-d h:m:s.S");
  let type = route.query.type;
  type = type === 1 ? 17 : type === 2 ? 15 : type === 3 ? 16 : 18;

  // 1.关联正文图片
  for (let i = 0; i < uploadImgListRef.value.length; i++) {
    let data = {
      planuuid: route.query.uuid,
      fileuuid: uploadImgListRef.value[i].uuid,
      plantype: String(type),
      usetype: "4",
    };
    withFile(data);
  }

  // 2.关联附件
  for (let i = 0; i < fileListRef.value.length; i++) {
    let data = {
      planuuid: route.query.uuid,
      fileuuid: fileListRef.value[i].uuid,
      plantype: String(type),
      usetype: "1",
    };
    withFile(data);
  }

  // 3.提交更改
  try{
    let res = await saveNews(formDataRef.value)
    if (res!=null) {
      getDetail();
      editRef.value = true;
      ElMessage.success('编辑成功!')
      nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loadingRef.value.close()
      })
    } else {
      nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loadingRef.value.close()
      })
      ElMessage.warning('保存失败')
    }
  }catch(err){
    nextTick(() => {
      // 以服务的方式调用的 Loading 需要异步关闭
      loadingRef.value.close()
    })
    ElMessage.warning('保存失败')
  }
}

//删除提示弹框
const openDeleteModal = () => {
  dialogVisibleRef.value = true;
}

// 改为编辑
const editDom = () => {
  editRef.value = false;
  // this.$forceUpdate();
}

const closeEdit = () => {
  editRef.value = true;
  getDetail();
}

// 监听改变上传图片--编辑器
const uploadImg = (info) => {
  let quill = toRaw(myQuillEditorRef.value).getQuill();
  if (info.status === "success" && info.response.code) {
    // 获取光标所在位置
    let length = quill.getSelection().index;
    // 插入图片，res为服务器返回的图片链接地址!!!
    let pictUrl = previewUrlRef.value;
    pictUrl = pictUrl.concat(info.response.data[0].path);
    quill.insertEmbed(length, "image", pictUrl);
    // 调整光标到最后
    quill.setSelection(length + 1);
  }
}

// 成功上传图片
const uploadImgFinish = (response, file) => {
  if (response && response.code === 1) {
    uploadImgListRef.value.push({
      filename: response.data[0].filename,
      dow_count: response.data[0].dow_count,
      uuid: response.data[0].uuid,
      ext: response.data[0].ext,
    });
  }
}

// 成功上传文件
const uploadfl = (response, file) => {
  let type = route.query.type;
  type = type === 1 ? 17 : type === 2 ? 15 : type === 3 ? 16 : 18;
  if (response && response.code === 1) {
    fileListRef.value.push({
      filename: response.data[0].filename,
      dow_count: response.data[0].dow_count,
      uuid: response.data[0].uuid,
      ext: response.data[0].ext,
    });
  }
}

const beforeupload = (file) => {
  let filename = file.name.slice(file.name.lastIndexOf("."));
  // let fileCate = ["jpg", "jpeg", "png", "gif", "bmp", "pdf", "ppt", "txt", "doc", "docx", "xls", "xlsx", "pptx", "mpeg", "3gp", "mp4", "avi", "flv", "zip", "rar", "7z", "bz2", "gz"];
  const isLt2M = file.size / 1024 / 1024 / 1024 <= 1;
  if (!mime[filename]) {
    ElMessage.error('上传文件不符合格式!')
  }
  if (!isLt2M) {
    ElMessage.error('上传文件大小不能超过 1GB!')
  }
}

const handleRemove = async (index) => {
  let res = await delFile({ fileuuid: fileListRef.value[index].uuid });
  if (res!=null) {
    fileListRef.value.splice(index, 1);
    ElMessage.success('文件删除成功')
  }
}

// 设置置顶
const setTop = async () => {
  let data = {
    uuid: route.query.uuid,
    istop: 1,
  };
  let res = await saveNews(data);
  if (res!=null) {
    ElMessage.success('成功置顶')
    getDetail();
  }
}

const concelTop = async () => {
  let data = {
    uuid: route.query.uuid,
    istop: 0,
  };
  let res = await saveNews(data);
  if (res!=null) {
    ElMessage.success('取消置顶')
    getDetail();
  }
}

onMounted(() => {
  let type = route.query.type;
  getDetail();
  let dep_lev = JSON.parse(decodeURIComponent(atob(sessionStorage.getItem('UserInfo')))).department.dep_lev
  if (dep_lev === 2) {
    optionsRef.value.splice(0, 1);
  } else if (dep_lev === 3) {
    optionsRef.value.splice(0, 2);
  } else if (dep_lev === 4) {
    optionsRef.value.splice(0, 3);
  }
})
</script>

<style lang="scss" scoped>
:deep(.el-form-item__content) {
  display: inline-block!important;
}
</style>
