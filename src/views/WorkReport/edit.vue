<template>
  <div class="taskBuild">
    <div class="mainBox">
      <div class="tableBox commomElTab">
        <div class="btnGroup">
            <el-button
              type="primary"
              v-if="edit"
              :disabled="addSuc || routerQuery.edits != 1"
              size="small"
              @click="submit"
              >保存</el-button
            >
            <el-button
              v-if="$route.query.isShowg == 0"
              :type="form.state == 2 ? 'info' : 'primary'"
              size="small"
              @click="toSingleReport"
              >上报</el-button
            >
            <el-button
              v-if="$route.query.isShowg == 0"
              :type="form.state != 2 ? 'info' : 'primary'"
              :disabled="addSuc"
              size="small"
              @click="toSingleDel"
              >撤销</el-button
            >
        </div>
        <el-tabs v-model="activeName">
          <el-tab-pane style="overflow-y: scroll" label="创建任务信息" name="first">
            <el-row style="margin-top: 10px">
              <el-form
                ref="formRef"
                size="small"
                label-position="right"
                :rules="edit && lev === 1 ? rules : {}"
                :model="form"
                label-width="140px"
              >
                <el-col class="elcol" :offset="5" :span="14">
                  <el-form-item class="name" prop="task_na" label="任务名称:">
                    <el-input
                      v-model="form.task_na"
                      placeholder="请输入任务名称"
                      v-if="edit && $route.query.isShowg == 1"
                    ></el-input>
                    <span v-if="!edit || $route.query.isShowg == 0" style="margin: 0; line-height: 32px">{{
                      form.task_na
                    }}</span>
                  </el-form-item>
                </el-col>
                <!-- <el-col v-if="lev > 1" class="elcol" :offset="5" :span="14">
                  <el-form-item
                    class="name "
                    :class="{ 'name-upload': edit }"
                    prop="edit_addr"
                    label="填报单位:"
                  >
                    <el-input
                      v-model="form.edit_addr"
                      placeholder="请输入填报单位"
                      v-if="edit && lev > 1"
                    ></el-input>
                    <span v-if="!edit && lev !== 1" style="margin: 0; line-height: 32px">{{
                      form.edit_addr
                    }}</span>
                  </el-form-item>
                </el-col> -->
                <el-col class="elcol" :offset="5" :span="14">
                  <el-form-item class="name" label="任务时间:" prop="task_time">
                    <el-date-picker
                      v-if="edit && $route.query.isShowg == 1"
                      format="YYYY/MM/DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss"
                      v-model="form.task_time"
                      class="eldate"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      placeholder="请选择任务时间"
                    >
                    </el-date-picker>
                    <span v-if="!edit || $route.query.isShowg == 0" style="margin: 0; line-height: 32px">{{
                      form.start_time + '——' + form.end_time
                    }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="5" :span="10">
                  <el-form-item
                    v-if="$route.query.isShowg == 1"
                    :class="{ 'name-upload': false }"
                    class="name"
                    label="下发级别:"
                    prop="lev"
                  >
                    <span style="margin: 0; line-height: 32px">{{
                       levName(form.include_lev ,user_code)
                    }}</span>
                  </el-form-item>
                </el-col>
                <el-col
                  v-if="form.include_lev && form.include_lev.length > 0 && $route.query.isShowg == 1"
                  class="elcol"
                  :offset="5" :span="10"
                >
                  <el-form-item
                    class="name"
                    :class="{ 'name-upload': false }"
                    label="下发行业:"
                    prop="levhy"
                  >
                    <span style="margin: 0; line-height: 32px">{{
                      hyName( form.dep_type)
                    }}</span>
                  </el-form-item>
                </el-col>
                <el-col v-if="lev == 1" class="elcol" :offset="5" :span="14">
                  <el-form-item class="name" label="下发省份:">
                    <span style="margin: 0; line-height: 32px">{{
                     codeName( form.include_code )
                    }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" v-if="$route.query.isShowg == 1" :offset="5" :span="14">
                  <el-form-item
                    class="name"
                    :class="{ 'name-upload': edit }"
                    prop="need_materials"
                    label="附件材料信息:"
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
                            <el-icon title="新增" @click="addMtgFile" v-if="index == metFileLists.length - 1&&$route.query.edits == 1"><CirclePlusFilled /></el-icon>
                            <el-icon title="删除" @click="deleteFile(index)"  v-if="index != 0"><DeleteFilled /></el-icon>
                          </div>
                        </div>
                      </template>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col v-if="!edit || $route.query.isShowg == 0" class="elcol" :offset="5" :span="14">
                  <el-form-item label="任务内容:">
                    <div class="formItem">
                      <div class="content">
                        <p style="margin: 0; line-height: 32px" class="remarks">
                          {{ form.task_details1 }}
                        </p>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col v-if="edit && $route.query.isShowg == 1" class="elcol" :offset="5" :span="14">
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
                <el-col v-if="!edit || $route.query.isShowg == 0" class="elcol" :offset="5" :span="14">
                  <el-form-item label="工作要求:">
                    <div class="formItem">
                      <div class="content">
                        <p style="margin: 0; line-height: 32px" class="remarks">
                          {{ form.ask1 }}
                        </p>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col v-if="edit && $route.query.isShowg == 1" class="elcol" :offset="5" :span="14">
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
                    <el-radio-group v-if="false" v-model="form.need_annex">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                    <span v-if="true" style="margin: 0; line-height: 32px">{{
                      form.need_annex === 1 ? '是' : form.need_annex === 0 ? '否' : '——'
                    }}</span>
                  </el-form-item>
                </el-col>
                <el-col v-if="form.need_annex" class="elcol" :span="8">
                  <el-form-item class="name" label-width="80px" label="附件类型:" prop="levhy">
                    <span v-if="true" style="margin: 0; line-height: 32px">{{
                      form.doc_type
                    }}</span>
                    <el-select
                      v-if="false"
                      class="eldate"
                      style="width: 100%"
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
                <el-col v-if="!edit || $route.query.isShowg == 0" class="elcol" :offset="5" :span="14">
                  <el-form-item label="备注说明:">
                    <div class="formItem">
                      <div class="content">
                        <p style="margin: 0; line-height: 32px" class="remarks">
                          {{ form.remarks1 }}
                        </p>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col v-if="$route.query.isShowg == 0" class="elcol" :offset="5" :span="14">
                  <el-form-item label="上级单位附件:">
                    <div>
                      <el-upload
                        v-if="false"
                        class="upload-demo"
                        style="padding-bottom: 10px"
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
                      <div class="file-list" v-if="fileListGj && fileListGj.length">
                        <template v-if="false">
                          <div v-for="(v, ind) in fileList" :key="ind" class="file-list-item">
                            <el-icon><Paperclip /></el-icon>
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
                            <el-icon @click.stop="handleRemove(ind)">
                                <Delete />
                              </el-icon>
                            <span style="color: #c0c4cc">下载次数&nbsp;{{ v.dow_count }}</span>
                          </div>
                        </template>
                        <template v-if="$isViewer">
                          <div
                            title="下载"
                            @click.stop="download(v.uuid, v.ext, v.filename)"
                            v-for="(v, ind) in fileListGj"
                            :key="ind"
                            class="file-list-item"
                          >
                            <el-icon><Paperclip /></el-icon>
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
                            <el-icon><UploadFilled /></el-icon>
                            <span style="color: #c0c4cc">下载次数&nbsp;{{ v.dow_count }}</span>
                          </div>
                        </template>
                      </div>
                      <div v-if="!fileListGj.length" style="color: #c0c4cc">
                        暂无上级附件
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col v-if="edit && $route.query.isShowg == 1" class="elcol" :offset="5" :span="14">
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
                <el-col v-if="$route.query.isShowg == 1" class="elcol" :offset="5" :span="14">
                  <el-form-item label="上传附件:">
                    <div>
                      <el-upload
                        v-if="edit"
                        class="upload-demo"
                        style="padding-bottom: 10px"
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
                        <el-button size="small" plain >点击上传</el-button>
                      </el-upload>
                      <div class="file-list" v-if="fileList && fileList.length">
                        <template v-if="edit">
                          <div v-for="(v, ind) in fileList" :key="ind" class="file-list-item">
                            <el-icon><Paperclip /></el-icon>
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
                            <el-icon @click.stop="handleRemove(ind)"><Delete /></el-icon>

                            <span style="color: #c0c4cc">下载次数&nbsp;{{ v.dow_count }}</span>
                          </div>
                        </template>
                        <template v-if="!edit && $isViewer">
                          <div
                            @click.stop="download(v.uuid, v.ext, v.filename)"
                            title="下载"
                            v-for="(v, ind) in fileList"
                            :key="ind"
                            class="file-list-item"
                          >
                            <el-icon><Paperclip /></el-icon>
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
                            <el-icon><UploadFilled /></el-icon>
                            <span style="color: #c0c4cc">下载次数&nbsp;{{ v.dow_count }}</span>
                          </div>
                        </template>
                      </div>
                      <div v-if="!edit && !fileList.length" style="color: #c0c4cc">
                        还未上传文件
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <template v-if="arrFile.length">
                  <el-col
                    v-for="(item, i) in arrFile"
                    :key="item.usetype"
                    class="elcol"
                    :offset="5"
                    :span="14"
                  >
                    <el-form-item
                      class="dtsc"
                      :class="{ 'name-upload': edit }"
                      :label="'附件' + (i + 1) + ':'"
                    >
                      <div>
                        <el-upload
                          v-if="edit"
                          class="upload-demo gztj-upload"
                          :action="`${actionUrl}/upload`"
                          :headers="{
                            token: token
                          }"
                          ref="upload"
                          :show-file-list="false"
                          :on-success="uploadfl1"
                          :before-upload="beforeupload1"
                          :on-error="onError"
                        >
                          <el-tooltip
                            class="item"
                            effect="dark"
                            :content="
                              '仅支持上传1个文件，文件格式为' +
                                item.materials_type.join('、') +
                                '。'
                            "
                            placement="top-start"
                          >
                            <el-button
                              style="float:left"
                              @click="getfileListName(item.usetype)"
                              size="small"
                              plain
                              >点击上传</el-button
                            >
                          </el-tooltip>
                          <span
                            @click="getfileListName(item.usetype)"
                            :title="item.materials_name"
                            style="margin-left:12px;font-weight: bold;color: #000;display:inline-block;width:80%;float:left;text-align:left;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;"
                            >请上传{{ item.materials_name }}</span
                          >
                        </el-upload>
                        <div
                          class="file-list"
                          v-if="
                            fileListObj['fileListZl' + item.usetype] &&
                              fileListObj['fileListZl' + item.usetype].length
                          "
                        >
                          <template v-if="edit">
                            <div
                              v-for="(v, ind) in fileListObj['fileListZl' + item.usetype]"
                              :key="v.uuid"
                              class="file-list-item"
                            >
                            <el-icon><Paperclip /></el-icon>
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
                              <el-icon @click="handleRemoves(ind, 'fileListZl' + item.usetype, 'hyzl')">
                                  <Delete />
                                </el-icon>

                              <span style="color: #c0c4cc">下载次数&nbsp;{{ v.dow_count }}</span>
                            </div>
                          </template>
                          <template v-if="!edit && $isViewer">
                            <div
                              v-for="(v, ind) in fileListObj['fileListZl' + item.usetype]"
                              :key="ind"
                              class="file-list-item"
                              title="下载"
                              @click="download(v.uuid, v.ext, v.filename)"
                            >
                            <el-icon><Paperclip /></el-icon>
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
                              <el-icon><UploadFilled /></el-icon>
                              <span style="color: #c0c4cc">下载次数&nbsp;{{ v.dow_count }}</span>
                            </div>
                          </template>
                        </div>
                        <div
                          v-if="!edit && !fileListObj['fileListZl' + item.usetype].length"
                          style="color: #c0c4cc"
                        >
                          还未上传文件
                        </div>
                      </div>
                    </el-form-item>
                  </el-col>
                </template>
              </el-form>
            </el-row>
          </el-tab-pane>
        </el-tabs>
        <el-dialog
          class="huiyi-file"
          title="材料信息"
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
                    class="name  eldilog-huiyi"
                    :class="{ 'name-upload': edit }"
                    prop="materials_name"
                    label="材料名称:"
                  >
                    <el-input
                      v-if="edit"
                      v-model="metFileForm.materials_name"
                      placeholder="材料名称"
                    ></el-input>
                    <span v-if="!edit" style="margin: 0; line-height: 32px">{{
                      metFileForm.materials_name
                    }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="2" :span="20">
                  <el-form-item
                    style="margin-left:-20px"
                    label-width="160px"
                    class="name  eldilog-huiyi"
                    :class="{ 'name-upload': edit }"
                    prop="sheng"
                    label="需要上传材料的省份:"
                  >
                    <el-select
                      v-if="edit"
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
                    <span v-if="!edit" style="margin: 0; line-height: 32px">{{
                      codeName( metFileForm.sheng)
                    }}</span>
                  </el-form-item>
                </el-col>

                <el-col class="elcol" :offset="2" :span="20">
                  <el-form-item
                    class="name eldilog-huiyi"
                    :class="{ 'name-upload': edit }"
                    label="上传材料的格式:"
                    prop="materials_type"
                  >
                    <el-select
                      v-if="edit"
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
                    <span v-if="!edit" style="margin: 0; line-height: 32px">{{
                      metFileForm.materials_type.join('、')
                    }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
            <template v-if="edit" #footer>
              <div class="dialog-footer">
                <el-button size="small" @click="closeFile">取 消</el-button>
                <el-button size="small" type="primary" @click="pushFile">确 定</el-button>
              </div>
            </template>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch, onMounted,computed } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.core.css'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import dayjs from 'dayjs'
import router from '@/router'
import { mime } from '@/utils/mime.js'
import { userStore ,loadStore } from '@/store'
import {  withFile ,regionData ,reportMeetingDetail ,delFile,editMeetingDetail,editMeetingDetailGj,getWithFile,getMeetingDetail,downloadFile} from '@/api'
import { ElMessage ,ElMessageBox  } from 'element-plus'
import { DeleteFilled,CirclePlusFilled,Edit ,UploadFilled ,Paperclip,Delete } from '@element-plus/icons-vue' // 引入 Edit 这个 svg组件
const user = userStore()
const useLoad = loadStore()
const UserInfo = user.userInfo

const optionsSheng = ref([])
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
const  isQb = ref(false)
const  isQbtp = ref(false)
const  usetype = ref(null)
const  radioFile = ref(0)
const  countRadio = ref(1)
const  fileListGj = ref([])
const  radioObj = ref({
  radio1: null,
  radio2: null,
  radio3: null,
  radio4: null,
  radio5: null
})
const  user_code = ref(UserInfo.department.simcode)
const  dep_type = ref(UserInfo.department.dep_type)
const  lev = ref(UserInfo.department.dep_lev)
const  addSuc = ref(false)
const  pcfaName = ref(null)
const  rules = ref({
  task_na: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
  task_time: [{ required: true, message: '请选择任务时间', trigger: 'change' }]

})
const token = sessionStorage.getItem('access_token')
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
  include_lev: []
})
const formRef = ref(null)
const editorOption = ref(
{
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
}
)
const arrFile = ref([])
const treeData = ref([])
const edit = ref(true)
let routerQuery = router.currentRoute.value.query
console.log(routerQuery);


watch(() => metFileForm.value.sheng,(newVal, oldVal)=> {
    if (newVal !== null) {
      if (!isQb.value) {
        if (newVal[newVal.length - 1] == 'qb' && newVal.length <= optionsSheng.value.length - 1) {
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
    }
},{
  deep:true
})

watch(() => metFileForm.value.materials_type,(newVal, oldVal)=> {
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
      console.log(newVal)
},{
  deep:true
})
   const uploadfl1 = async(response, file)=> {
      useLoad.spinState = true
      if (response && response.code == '1') {
        fileListObj.value[fileListName.value].push({
          filename: response.data[0].filename,
          dow_count: response.data[0].dow_count,
          uuid: response.data[0].uuid,
          ext: response.data[0].ext,
          enable: response.data[0].enable
        })
      }
      let res:any = await withFile({
          planuuid: routerQuery.id,
          fileuuid: response.data[0].uuid,
          plantype: 41,
          usetype: usetype.value
        })
      if(res){
        ElMessage({
              type: 'success',
              message: '文件上传成功'
            })
      }else{
        ElMessage({
          type: 'error',
          message: '服务器出错，请稍后重试'
        })
      }
      useLoad.spinState = false
    }
   const  beforeupload1 = async(file)=> {
      let types = arrFile.value.filter(item => item.usetype == usetype.value)[0]
      if (fileListObj.value[fileListName.value].length >= 1) {
        ElMessage({
          type: 'error',
          message: `仅支持上传1个文件，文件格式为${types.materials_type.join('、')}。`
        })
        return false
      }
      let filename = file.name.slice(file.name.lastIndexOf('.')).toLowerCase()

      const isLt2M = file.size / 1024 / 1024 <= 1000
      let mimes = {}

      if (types.materials_type.length != 0) {
        types.materials_type.forEach(item => {
          mimes[item] = mime[item]
        })
        if (!mimes[filename]) {
          ElMessage.error('上传附件不符合格式,附件类型为: ' + types.materials_type.join('、'))
          return false
        }
      }

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
   const getfileListName =(usetype)=> {
      usetype.value = usetype
      fileListName.value = 'fileListZl' + usetype
    }
    const closeFile= async()=> {
      fileVisable.value = false
    }
   const deleteFile =(index)=> {
      ElMessageBox.confirm('您确认要删除此会议材料的相关信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          metFileLists.value.splice(index, 1)
          ElMessage({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
        });
    }
    const pushFile = async()=> {
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
   const  addMtgFile = async()=> {
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
    const  getTreeData = async()=> {
      let res:any = await regionData({ simcode: UserInfo.department.simcode })
      if (res) {
        let data = JSON.parse(JSON.stringify(res))
        optionsSheng.value = res
        optionsSheng.value.unshift({ simcode: 'qb', code_name: '全部' })
        console.log(optionsSheng.value,'optionsSheng.value');
        
      }
    }
   const editFile =(index)=> {
      editFileIndex.value = index
      let obj = {}
      for (const key in metFileLists.value[index]) {
        if (key !== 'materials_name' || key !== 'usetype') {
          obj[key] = JSON.parse(JSON.stringify(metFileLists.value[index][key]))
        } else {
          obj[key] = metFileLists.value[index][key]
        }
      }

      metFileForm.value = obj
      fileVisable.value = true
    }
    const toSingleDel= async()=> {
      if (form.value.state == 1) {
        return ElMessage({
          type: 'warning',
          message: '未上报的不能撤销。'
        })
      }
      if (dayjs().isAfter(form.value.end_at)) {
        return ElMessage({
          type: 'warning',
          message: '任务时间已过,不能撤销'
        })
      }
      let params = {
        task_uuid: [routerQuery.task_uuid],
        type: 1,
        dep_type: dep_type.value,
        state: 1,
        user_code: user_code.value
      }
      let res = await reportMeetingDetail(params)
      if (res) {
        ElMessage.success('撤销成功!')
        edit.value = true
        router.push({
          name: 'WorkReportEdit',
          query: {
            task_uuid: routerQuery.task_uuid,
            edits: 1,
            id:routerQuery.id,
          }
        })

        getMeetingDetailList()
      }
    }
    const toSingleReport =async()=> {
      if (form.value.state == 2) {
        return ElMessage({
          type: 'warning',
          message: '请撤销后再上报!'
        })
      }
      for (const key in fileListObj.value) {
        const element = fileListObj.value[key]
        if (!element.length) {
          ElMessage({
            type: 'error',
            message: `附件为必填项。`
          })
          return
        }
      }
      addSuc.value = true
      let data = {
        task_uuid: [form.value.task_uuid],
        user_code: user_code.value,
        dep_type: dep_type.value,
        type: 1,
        // edit_addr: form.value.edit_addr,
        state: 2
      }
      let res = await reportMeetingDetail(data)
      if (res) {
        edit.value = false
        router.push({
          path: 'WorkReportEdit',
          query: {
            task_uuid: routerQuery.task_uuid,
            edits: 0,
            id:routerQuery.id,
          }
        })
        getMeetingDetailList()

        addSuc.value = false
        ElMessage({
          type: 'success',
          message: '上报成功'
        })
      } else {
        ElMessage({
          type: 'error',
          message: '服务器出错，请稍后重试'
        })
      }
    }
    const radio0Click =(name, val)=> {
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
            form.value.lev = ''
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
          form.value.lev = levArr[levArr.length - 1]
        }
      }
    }
    const download = async(fileuuid, ext, filename)=> {
      useLoad.spinState = true
      let fileext = ext.toLowerCase()
      if (mime[fileext]) {
        let res:any = await downloadFile(fileuuid, 41)
        useLoad.spinState = false
        if(res){
          let blob = new Blob([res], { type: mime[fileext] }) // type为所需要下载的文件格式，以xls文件为例
          let link = document.createElement('a') // 创建a标签
          link.style.display = 'none'
          let objectUrl = URL.createObjectURL(blob)
          link.href = objectUrl
          link.setAttribute('download', filename)
          link.click()
          URL.revokeObjectURL(objectUrl)
          // getSomeData()
        }
      }
    }
    const uploadfl = async(response, file) =>{
      // console.log("response, file: ", response, file);
      if (response && response.code == '1') {
        fileList.value.push({
          filename: response.data[0].filename,
          dow_count: response.data[0].dow_count,
          uuid: response.data[0].uuid,
          ext: response.data[0].ext,
          enable: response.data[0].enable
        })
        let res:any = await withFile({
            planuuid: lev.value === 1 ? routerQuery.task_uuid : routerQuery.id,
            fileuuid: response.data[0].uuid,
            plantype: 41
        })
        useLoad.spinState = false
        if(res){
              ElMessage({
                type: 'success',
                message: '文件上传成功'
              })

        }else{
              ElMessage({
                type: 'error',
                message: '服务器出错，请稍后重试'
              })
        }
      } else {
        useLoad.spinState = false
        ElMessage({
          type: 'error',
          message: '文件上传失败'
        })
      }
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
    const handleRemoves =(index, fileList, hyzl)=> {
      ElMessageBox.confirm('您确认要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
          let data
          if (hyzl) {
            data = { fileuuid: fileListObj.value[fileList][index].uuid, plantype: 41 }
          } else {
            data = { fileuuid: fileList[index].uuid, plantype: 41 }
          }
          let res:any = delFile(data)
            if (res) {
              if (hyzl) {
                fileListObj.value[fileList].splice(index, 1)
              } else {
                fileList.splice(index, 1)
              }

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
        }).catch(() => {})
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
    const submit = async()=> {
      formRef.value.validate(valid => {
        if (valid) {
          if (lev.value != 1) {
            addOverPlan()
          } else if (lev.value == 1 && dep_type.value == 0) {
            addOverPlanGj()
          }
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
      for (const key in fileListObj.value) {
        const element = fileListObj.value[key]
        if (!element.length) {
          ElMessage({
            type: 'error',
            message: `附件为必填项。`
          })
          return
        }
      }
      addSuc.value = true
      form.value.materials_data = metFileLists.value
      form.value.type = 1
      form.value.start_at = form.value.task_time[0]
      form.value.end_at = form.value.task_time[1]
      form.value.user_code = user_code.value
      form.value.dep_type = dep_type.value

      form.value.jsonData = {
        task_na: form.value.task_na,
        start_at: form.value.start_at,
        end_at: form.value.end_at,
        task_details: form.value.task_details,
        ask: form.value.ask,
        remarks: form.value.remarks,
        materials_data: form.value.materials_data
      }
      let res = await editMeetingDetail(form.value)
      if (res) {
        getMeetingDetailList()
        ElMessage({
          type: 'success',
          message: '编辑任务成功'
        })
      } else {
        ElMessage({
          type: 'error',
          message: '服务器出错，请稍后重试'
        })
      }

      addSuc.value = false
    }
    const  addOverPlanGj= async()=> {
      for (let index = 0; index < metFileLists.value.length; index++) {
        const item = metFileLists.value[index]
        for (const key in item) {
          const element = item[key]
          if (key === 'materials_name' && !element) {
            ElMessage({
              type: 'error',
              message: '请把附件材料的相关信息填写完整。'
            })
            return
          } else if (key !== 'usetype') {
            if (!element.length) {
              ElMessage({
                type: 'error',
                message: '请把附件材料的相关信息填写完整。'
              })
              return
            }
          }
        }
      }
      form.value.materials_data = metFileLists.value
      form.value.type = 1
      form.value.start_at = form.value.task_time[0]
      form.value.end_at = form.value.task_time[1]
      form.value.user_code = user_code.value
      form.value.dep_type = dep_type.value

      form.value.jsonData = {
        task_na: form.value.task_na,
        start_at: form.value.start_at,
        end_at: form.value.end_at,
        task_details: form.value.task_details,
        ask: form.value.ask,
        remarks: form.value.remarks,
        materials_data: form.value.materials_data
      }
      // debugger
      addSuc.value = true
      let res = await editMeetingDetailGj(form.value)
      if (res) {
        getMeetingDetailList()
        ElMessage({
          type: 'success',
          message: '编辑会议成功'
        })
      } else {
        ElMessage({
          type: 'error',
          message: '服务器出错，请稍后重试'
        })
      }
      addSuc.value = false
    }
    const getMeetingDetailList = async()=> {
      const param = {
        dep_type: dep_type.value,
        task_uuid: routerQuery.task_uuid,
        user_code: user_code.value
      }
      let res = await getMeetingDetail(param)
      if (res) {
        if (routerQuery.isShowg != 1) {
          arrFile.value = res.materials_data.filter(item => {
            if (res.created_user_code.length == 1) {
              if (lev.value == 2 && res.include_lev.includes(lev.value)) {
                return item.sheng.includes(user_code.value)
              } else if (lev.value == 3 && res.include_lev.includes(lev.value)) {
                return item.sheng.includes(user_code.value.substring(0, 2))
              } else if (lev.value == 4 && res.include_lev.includes(lev.value)) {
                return item.sheng.includes(user_code.value.substring(0, 2))
              }
            } else if (res.created_user_code.length == 2) {
              if (lev.value == 3 && res.include_lev.includes(lev.value)) {
                return item.sheng.includes(user_code.value.substring(0, 4))
              } else if (lev.value == 4 && res.include_lev.includes(lev.value)) {
                if (['11', '12', '31', '50'].includes(res.created_user_code)) {
                  return item.sheng.includes(user_code.value)
                }
                return item.sheng.includes(user_code.value.substring(0, 4))
              }
            } else if (res.created_user_code.length == 4) {
              return item.sheng.includes(user_code.value)
            }
          })
          arrFile.value.forEach(item => {
            fileListObj.value['fileListZl' + item.usetype] = []
          })
        }
        // console.log(arrFile.value)
        // console.log(dayjs(data.start_at).format('YYYY-MM-DD HH:mm:ss'));
        // console.log(dayjs(data.start_at).format('YYYY-MM-DD HH:mm:ss'));
        // debugger
        let data = JSON.parse(JSON.stringify(res))
        data.start_time = dayjs(data.start_at).format('YYYY-MM-DD HH:mm:ss')
        data.end_time = dayjs(data.end_at).format('YYYY-MM-DD HH:mm:ss')
        // data.doc_type = data.doc_type.join('、')
        data.task_details1 = data.task_details
          ? data.task_details.replace(/<[^>]+>|&[^>]+;/g, '')
          : '——'
        data.remarks1 = data.remarks ? data.remarks.replace(/<[^>]+>|&[^>]+;/g, '') : '——'
        data.ask1 = data.ask ? data.ask.replace(/<[^>]+>|&[^>]+;/g, '') : '——'

        data.include_lev.forEach(item => {
          radioObj.value['radio' + item] = item
        })
        form.value = data

        if (form.value.materials_data && form.value.materials_data.length) {
          metFileLists.value = form.value.materials_data
        } else {
          metFileLists.value = metFileLists.value
        }

        form.value.task_time = [data.start_time, data.end_time]
        if (routerQuery.isShowg == 0) {
          if (form.value.state == 1) {
            edit.value = true
          } else if (form.value.state == 2) {
            edit.value = false
          }
        }
      }
      useLoad.spinState = false
      let res1 = await getWithFile({
          planuuid: routerQuery.task_uuid,
          plantype: 41,
          usetype: 1
        })
      if (res1) {
        if (routerQuery.isShowg == 1) {
          fileList.value = res1|| []
        } else {
          fileListGj.value = res1|| []
        }
      }

      if (lev.value > 1) {
        for (let index = 0; index < arrFile.value.length; index++) {
          const element = arrFile.value[index]

          let res3 = await getWithFile({
            planuuid: routerQuery.id,
            plantype: 41,
            usetype: element.usetype
          })

          if (res3) {
            fileListObj.value['fileListZl' + element.usetype] = res3|| []
          }
        }
      }
    }
const codeName = computed(() => {
  return function(val){
      if (val) {
        let codename = ''
        val.forEach(item => {
          optionsSheng.value.forEach(val => {
            if (item == val.simcode) {
              codename += val.code_name + '、'
            }
          })
        })
        return codename.slice(0, -1)
      }
      return '——'
  }
})
const levName = computed(() => {
  return function(val,code){
      if (val) {
        const obj = { 1: '国家级', 2: '省级', 3: '市级', 4: '县级' }
        let str = ''
        val.forEach(item => {
          if (code.length == 2) {
            if (item != 2 && item != 1) {
              str += obj[item] + '、'
            }
          } else if (code.length == 1) {
            if (item != 1) {
              str += obj[item] + '、'
            }
          } else {
            if (item != 2 && item != 1 && item != 3) {
              str += obj[item] + '、'
            }
          }
        })
        // debugger
        return str.slice(0, -1)
      } else {
        return '——'
      }
  }
})
const hyName = computed(() => {
  return function(val){
      if (typeof val == 'number') {
        const optionshy = [
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
        ]
        if (val == -1) {
          return '全行业'
        } else {
          return optionshy[val + 1].label
        }
      } else {
        return '——'
      }
  }
})
   const  momentTime =(val)=> {
      if (val) {
        return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
      } else {
        return '——'
      }
    }
  onMounted(()=>{
    nextTick(() => {
    routerQuery = router.currentRoute.value.query
    console.log(routerQuery);
  
    let lev = UserInfo.department.dep_lev
    const type = UserInfo.department.dep_type
    if (routerQuery.isShowg == 1) {
      getTreeData()
      if (routerQuery.edits == 1) {
        edit.value = true
      } else if (routerQuery.edits == 0) {
        edit.value = false
      }
    }
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

    useLoad.spinState = true
    getMeetingDetailList()

    })

  })
</script>

<style lang="scss" scoped>
.eldilog-huiyi {
  text-align: left;
}
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

.btnGroup {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
  text-align: right
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
</style>
