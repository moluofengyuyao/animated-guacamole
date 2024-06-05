<template>
  <div class="taskBuild">
    <div class="mainBox">
      <div class="tableBox commomElTab">
        <el-button
          type="primary"
          size="small"
          v-if="
            editRef &&
              editIsShowRef &&
              groupRestrictionRef && roleIsShow('常态工作管理', '工作动态', '通知文件', '编辑')
          "
          class="tab-edit-btn"
          @click="editDom"
          >编辑</el-button
        >
        <el-button
          type="primary"
          size="small"
          v-if="
            !editRef &&
              editIsShowRef && roleIsShow('常态工作管理', '工作动态', '通知文件', '编辑')
          "
          class="tab-edit-cancel-btn"
          @click="closeEdit"
          >取消</el-button
        >
        <el-button
          type="primary"
          size="small"
          v-if="
            !editRef &&
              editIsShowRef && roleIsShow('常态工作管理', '工作动态', '通知文件', '编辑')
          "
          @click="submit(false)"
          class="tab-edit-save-btn"
          >保存</el-button
        >
        <el-button
          type="primary"
          size="small"
          v-if="
            !editRef &&
              editIsShowRef && roleIsShow('常态工作管理', '工作动态', '通知文件', '编辑')
          "
          @click="submit"
          class="tab-edit-submit-btn"
          >提交</el-button
        >
        <el-button
          type="primary"
          v-if="
            editIsShowRef && groupRestrictionRef && roleIsShow('常态工作管理', '工作动态', '通知文件', '删除')
          "
          plain
          size="small"
          class="tab-del-btn"
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
        <el-dialog
          class="zlxzxp"
          :close-on-click-modal="false"
          v-model="dialogVisibleimgRef"
        >
          <img class="elimg" :src="dialogImageUrlRef" alt="" />
        </el-dialog>
        <el-dialog
          class="zlxzxp"
          :close-on-click-modal="false"
          v-model="dialogVisibleVUrlRef"
        >
          <video
            :src="dialogVUrlRef"
            controls="controls"
            controlslist="nodownload"
            class="elimg"
          ></video>
        </el-dialog>
        <el-tabs v-model="activeNameRef">
          <el-tab-pane style="overflow-y: scroll" label="文件详情" name="first">
            <!-- <el-row>
              <el-col class="elcol" :offset="4" :span="16">
                <div class="title">
                  <span>基本信息</span>
                  <div class="line"></div>
                  <div class="triangle-right1"></div>
                  <div class="triangle-right2"></div>
                </div>
              </el-col>
            </el-row> -->
            <el-row style="margin-top: 10px">
              <el-col class="elcol" :offset="0" :span="24">
              <el-form
                ref="elFormRef"
                size="small"
                label-position="right"
                :rules="editRef ? {} : rulesRef"
                :model="formDataRef"
                label-width="130px"
              >
                <el-row>
                  <el-col class="elcol" :offset="4" :span="16">
                    <el-form-item
                      class="name"
                      label="文件名称:"
                      prop="notice_name"
                    >
                      <span v-if="editRef" style="margin: 0;">{{
                        formDataRef.notice_name
                      }}</span>
                      <el-input
                        v-if="!editRef"
                        v-model="formDataRef.notice_name"
                        placeholder="请输入文件名称"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col v-if="isCountryCensusOfficeTesterRef == 1 && isNewVersionRef" class="elcol" :offset="4" :span="16">
                    <el-form-item class="name" label="文件编码:" prop="work_num">
                      <!-- <span v-if="editRef" style="margin: 0;">{{
                        formDataRef.work_num
                      }}</span>
                      <el-input
                        v-if="!editRef"
                        v-model="formDataRef.work_num"
                        placeholder="请输入工作（活动）编码"
                      ></el-input> -->
                      <span>{{ getFillWorkNum() }}</span>
                      <!--
                        <span>{{ getFillWorkNumPrefix() }}</span>
                      <el-input placeholder="请输入工作（活动）编码" style="width: calc(100% - 100px);" v-model="formDataRef.work_num"></el-input>
                      -->
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                <!-- <el-col v-if="isCountryCensusOfficeTesterRef == 1 && isNewVersionRef" class="elcol" :offset="4" :span="16">
                  <el-form-item class="name" label="工作活动分类:" prop="work_type">
                    <span>{{ formDataRef.work_type }}</span>
                  </el-form-item>
                </el-col> -->
                </el-row>
                <el-row>
                  <el-col class="elcol" :offset="4" :span="16">
                    <el-form-item class="name" label="文件类型:" prop="type">
                      <span v-if="editRef" style="margin: 0;">{{
                        formDataRef.type === 1
                            ? '工作通知'
                            : formDataRef.type === 2
                            ? '情况通报'
                            : formDataRef.type === 3
                            ? '工作方案'
                            : '——'
                      }}</span>
                      <el-radio-group v-if="!editRef" v-model="formDataRef.type">
                        <el-radio
                          v-for="v in optionsRef"
                          :key="v.value"
                          :value="v.value"
                          >{{ v.label }}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- <el-row><el-col class="elcol" :offset="4" :span="16">
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
                </el-col></el-row> -->
                <el-row>
                  <el-col class="elcol" :offset="4" :span="16">
                    <el-form-item class="name" label="发布时间:" prop="notice_at">
                      <span
                        v-if="editRef && formDataRef.notice_at"
                        style="margin: 0;"
                        >{{
                          formDataRef.notice_at ? formDataRef.notice_at.substring(0, 10) : '——'
                        }}</span
                      >
                      <el-date-picker
                        v-if="!editRef"
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
                  <el-col class="elcol" :offset="4" :span="16">
                    <el-form-item class="name" label="发布单位:" prop="iss_unit">
                      <span v-if="editRef" style="margin: 0;">{{
                        formDataRef.iss_unit
                      }}</span>
                      <el-input
                        v-if="!editRef"
                        v-model="formDataRef.iss_unit"
                        placeholder="请输入发布单位"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- <el-row><el-col class="elcol" :offset="4" :span="16">
                  <el-form-item class="name" label="类型:" prop="type">
                    <span v-if="editRef" style="margin: 0;">{{
                      formDataRef.type === 1 ? "会议函件" : "工作函件"
                    }}</span>
                    <el-select
                      v-if="!editRef"
                      class="eldate"
                      style="width: 100%"
                      v-model="formDataRef.type"
                      placeholder="请选择类型"
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
                <el-row>
                  <el-col class="elcol" :offset="4" :span="12">
                    <el-form-item class="name" label="查看级别:" prop="lev">
                      <span v-if="editRef">{{
                        formDataRef.lev == 1
                          ? '国家'
                          : formDataRef.lev == 2
                          ? '省级及以上'
                          : formDataRef.lev == 3
                          ? '市级及以上'
                          : formDataRef.lev == 4
                          ? '县级及以上'
                          : '无查看级别'
                      }}</span>
                      <template v-if="!editRef">
                        <template v-for="item in optionsJbRef">
                          <el-radio
                            v-model="radioObjRef[item.name]"
                            @click.native="radio0Click(item.name, item.value)"
                            :value="item.value"
                            >{{ item.label }}</el-radio
                          >
                        </template>
                      </template>
                    </el-form-item>
                  </el-col>
                  <!-- <el-col class="elcol" :span="4" v-if="!formDataRef.lev && editRef">
                    <el-form-item class="name" label="查看行业:" prop="lev">
                      <span v-if="editRef">{{ formDataRef.levhy_na }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col class="elcol" :span="4" v-if="formDataRef.lev">
                    <el-form-item
                      class="name"
                      label-width="80px"
                      label="查看行业:"
                      prop="levhy"
                    >
                      <span v-if="editRef">{{ formDataRef.levhy_na }}</span>
                      <el-select
                        v-if="!editRef"
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
                <el-col v-if="editRef" class="elcol" :offset="4" :span="16">
                  <el-form-item class="name nameorg" label="查看机构:">
                    <template v-if="showOrgDataRef.length > 0">
                      <span
                        v-for="v in showOrgDataRef"
                        :key="v.id"
                        style="
                          position: relative;
                          z-index: 10;
                          margin: 0;
                          padding-right: 10px;
                        "
                        >{{ v.jg_name }}</span
                      >
                    </template>
                    <span v-else style="color:#c6c6c6">暂无查看机构</span>
                  </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                <el-col v-if="!editRef" class="elcol" :offset="4" :span="16">
                  <el-form-item
                    class="name nameorg"
                    label="查看机构:"
                    prop="value2"
                  >
                    <a-tree-select
                      :defaultValue="defaultValueRef"
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
                </el-row>
                <el-row>
                <el-col class="elcol" :offset="4" :span="16">
                  <el-form-item label="是否添加大事记:" prop="isjoinevent">
                    <el-radio-group v-model="formDataRef.isjoinevent" v-if="!editRef">
                      <el-radio :value="1">是</el-radio>
                      <el-radio :value="0">否</el-radio>
                    </el-radio-group>

                    <span v-else>{{ formDataRef.isjoinevent ? '是' : '否' }}</span>
                  </el-form-item>
                </el-col>
                </el-row> -->
             
                <el-row>
                  <el-col v-show="formDataRef.isjoinevent == 1 && isCountryCensusOfficeTesterRef == 1 && isNewVersionRef" 
                    class="elcol" :offset="4" :span="16">
                    <el-form-item label="备注说明:">
                      <div v-if="editRef" class="formItem">
                        <div class="content">
                          <p class="content ql-snow ql-editor" style="min-height:0px;" v-html="formDataRef.event_content"></p>
                        </div>
                      </div>
                      <div v-if="!editRef" style="width:100%;">
                          <!-- 富文本编辑器-zyt -->
                          <QuillEditor ref="myQuillEditor" class="editer"
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
                  <el-col v-if="isCountryCensusOfficeTesterRef == 1 && isNewVersionRef" class="elcol" :offset="4" :span="16">
                  <el-form-item class="name" label="主送单位:" prop="zsdw">
                    <span v-if="editRef" style="margin: 0;">{{
                      formDataRef.zsdw
                    }}</span>
                    <el-input
                    v-if="!editRef"
                      v-model="formDataRef.zsdw"
                      placeholder="请输入主送单位"
                    ></el-input>
                  </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                <el-col v-if="isCountryCensusOfficeTesterRef == 1 && isNewVersionRef" class="elcol" :offset="4" :span="16">
                  <el-form-item class="name" label="签发人:" prop="qfr">
                    <span v-if="editRef" style="margin: 0;">{{
                      formDataRef.qfr
                    }}</span>
                    <el-input
                    v-if="!editRef"
                      v-model="formDataRef.qfr"
                      placeholder="请输入签发人"
                    ></el-input>
                  </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                <el-col v-if="isCountryCensusOfficeTesterRef == 1 && isNewVersionRef" class="elcol" :offset="4" :span="16">
                  <el-form-item class="name" label="经办人:" prop="jbr">
                    <span v-if="editRef" style="margin: 0;">{{
                      formDataRef.jbr
                    }}</span>
                    <el-input
                    v-if="!editRef"
                      v-model="formDataRef.jbr"
                      placeholder="请输入经办人"
                    ></el-input>
                  </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                <el-col v-if="isCountryCensusOfficeTesterRef == 1 && isNewVersionRef" class="elcol" :offset="4" :span="16">
                  <el-form-item
                    :class="{ 'name-upload': true }"
                    label="归档资料清单:"
                  >
                  <span v-if="editRef">
                    {{ formDataRef.sfygdqd== 1?'是':'否' }}
                  </span>
                    <span v-if="!editRef">
                      <template  v-for="item in optionsGdzlqdRef">
                      <el-radio
                        v-model="formDataRef.sfygdqd"
                        @click.native="gdzlqdClick(item.label, item.value)"
                        :value="item.value"
                        >{{ item.label }}</el-radio
                      >
                    </template>
                    </span>
                  </el-form-item>
                </el-col></el-row> -->
                <el-row>
                  <el-col class="elcol" :offset="4" :span="16">
                    <el-form-item
                      :class="{ name: true, 'name-upload': !editRef }"
                      :label="editRef == true ? '附件查看:' : '上传附件:'"
                      v-if="(editRef) || !editRef"
                    >
                      <div>
                        <el-upload
                          v-if="!editRef"
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

                              <span v-if="![`国家级评估成果1.0版（征求意见）`].find(name=>v.filename.includes(name))" style="color: #c0c4cc"
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
                                style="display: inline-block;width: 50%; white-space: nowrap;text-overflow: ellipsis;overflow: hidden;"
                                >{{ v.filename }}</span
                              >
                              <el-icon class="el-icon-upload"
                                title="下载"
                                v-if="$isViewer && ![`国家级评估成果1.0版（征求意见）`].find(name=>v.filename.includes(name))"
                                @click="download(v.uuid, v.ext, v.filename)">
                                <UploadFilled />
                              </el-icon>
                              <el-icon class="el-icon-view"
                                @click="preview( v.ext, v.path)"
                                title="预览">
                                <View />
                              </el-icon>
                              <span v-if="![`国家级评估成果1.0版（征求意见）`].find(name=>v.filename.includes(name))" style="color: #c0c4cc"
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
                </el-row>
                <gdzlqd v-if="isCountryCensusOfficeTesterRef == 1 && isNewVersionRef" v-show="formDataRef.sfygdqd === '1'" 
                  :form="formDataRef" :workTypeAcronym="workTypeAcronymRef"
                  :workType="`函件`"
                  :workName="formDataRef['notice_name']"
                  :fillWorkNum="fillWorkNumRef" :plantype="plantypeRef" ref="gdzlqdRef" :mode="editRef==true?'view':'edit'"></gdzlqd>
              </el-form>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup name="NoticeFileDetail">
import { ref, watch, onMounted, onBeforeUnmount, computed, nextTick } from 'vue'
import { workDynamicsStore } from '@/store'
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import gdzlqd from '../components/gdzlqd.vue'
import { getWorkGroup, downloadFile, withFile, delFile, delOverPlan, 
  editOverPlan, detailOverPlan, getLevHy, getLevJg, getDeptTreesOld } from '@/api'
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'
import { View, Upload, UploadFilled, Paperclip, Delete } from '@element-plus/icons-vue'
import { mime } from '../components/mime.js'

const workStore = workDynamicsStore()
const router = useRouter()
const route = useRoute()

const elFormRef = ref(null)
const gdzlqdRef = ref(null)

const loadingRef = ref(null)

const plantypeRef = ref(`11`)
const isSameGroupRef = ref(false)
const workTypeAcronymRef = ref('HJ')
const fillWorkNumRef = ref('')
// 归档资料清单
const optionsGdzlqdRef = ref([
  { label: '是', value: "1" },
  { label: '否', value: '0' },
])
const countRadioRef = ref(1)
const radioObjRef = ref({
  radio1: null,
  radio2: null,
  radio3: null,
  radio4: null,
  radio5: null
})
const defaultPropsRef = ref({
  // 替换 treeNode 中 title,value,key,children 字段为 treeData 中对应的字段
  children: 'children',
  title: 'dep_name',
  key: 'id',
  value: 'id'
})
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
const editIsShowRef = ref(false)
const validateEventContent = (rule, value, callback) => {
  if(isCountryCensusOfficeTesterRef.value != 1 && !isNewVersionRef.value) return callback()
  if (formDataRef.value.isjoinevent == 1 && !formDataRef.value.event_content) {
    // return callback(new Error('请输入大事记主要内容'))
    // return callback(new Error('请输入备注说明'))
    callback()
  } else {
    callback()
  }
}
const validateWorkNum = (rule, value, callback) => {
  if(isCountryCensusOfficeTesterRef.value != 1 && !isNewVersionRef.value) return callback()
  if (!/^\d{3}$/.test(value.padStart(3, 0))) {
    return callback(new Error('请输入3位以内的数字'))
  } else {
    callback()
  }
}
const rulesRef = ref({
  doc_num: [
    { required: true, message: '请输入函件文号', trigger: 'blur' }
  ],
  // work_num: [
  //   { required: true, message: '请输入工作（活动）编码', trigger: 'blur' },
  //   { validator: validateWorkNum,message:'请输入3位以内的数字', trigger: 'blur' }
  // ],
  event_content: [
    // { validator: validateEventContent,message:'请输入大事记主要内容', trigger: 'blur' }
    { validator: validateEventContent,message:'请输入备注说明', trigger: 'blur' }
  ],
  notice_name: [
    { required: true, message: '请输入函件名称', trigger: 'blur' }
  ],
  iss_unit: [
    { required: true, message: '请输入发布单位', trigger: 'blur' }
  ],
  notice_at: [
    { required: true, message: '请选择发布时间', trigger: 'change' }
  ],
  type: [{ required: true, message: '请选择类型', trigger: 'change' }]
  // notice_content: [{ required: true, message: "请输入函件内容", trigger: "blur" }],
})
const value2Ref = ref(null)
const tokenRef = ref(sessionStorage.getItem('access_token'))
const saveShowOrgDataRef = ref([])
const showOrgDataRef = ref([])
const showOrgDataOptRef = ref([])
const editRef = ref(true)
const dialogVisibleRef = ref(false)
const treeDataRef = ref([])
const fileListRef = ref([])
const actionUrlRef = ref(`${baseUrl[ENV]['fileUrl']}`)
const previewUrlRef = ref(`${baseUrl[ENV]['previewUrl']}`)
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
  lev: null,
  value2: [],
  isjoinevent:1,//是否添加大事记（可显示备注说明）
  sfygdqd:'0',
  work_type:`函件`,
  event_content:''
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
const sonArrRef = ref([])
const formArrRef = ref([])
const defaultValueRef = ref([])
const typeRef = ref(UserInfo.department.dep_type)
const dialogVisibleVUrlRef = ref(false)
const dialogVUrlRef = ref('')
const dialogVisibleimgRef = ref(false)
const dialogImageUrlRef = ref('')

// store
const isCountryCensusOfficeRef = computed(() => {
  return workStore.isCountryCensusOffice()
})

const isCountryCensusOfficeTesterRef = computed(() => {
  return workStore.isCountryCensusOfficeTester()
})

// 同组
const belongToTheSameGroupRef = computed(() => {
  return isSameGroupRef.value
})

// 组别限制
const groupRestrictionRef = computed(() => {
  return workStore.isCountryCensusOffice() ? (belongToTheSameGroupRef.value && workStore.isAdminGroup && workStore.isNotOtherGroup() && isNewDataRef.value) : true
})

// 新创建的信息
const isNewVersionRef = computed(() => {
  return true
})

const isNewDataRef = computed(() => {
  return formDataRef.value.created_at ? new Date(formDataRef.value.created_at).getTime() > new Date('2023-05-23 00:00:00.000').getTime() : false
})

// tipsBeforeLeavePage
const isAddPageRef = computed(() => {
  return route.path.includes('add') || route.path.includes('Add')
})

const isEditPageRef = computed(() => {
  return route.path.includes('detail') || route.path.includes('Detail')
})

// 事件
const judgeSameGroup = async () => {
  return isSameGroupRef.value = (formDataRef.value.group_id === null || !isCountryCensusOfficeRef.value) ? true : (formDataRef.value.group_id == UserInfo.group[0].group_id);
  // const group = UserInfo
  //   .group
  // let groupId
  // if ((Array.isArray(group) && group.length)) {
  //   groupId = group[0].group_id
  // } else {
  //   groupId = ''
  //   // 本人创建不判断同组问题
  //   if(formDataRef.value.created_user === UserInfo
  //     .user.id) {
  //     return isSameGroupRef.value = true
  //   }
  // }
  // const data = {
  //   tablename: 'dd_user_group',
  //   conds: [{field: 'group_id', value: groupId, operator: 'EQ'}, {field: 'user_id', value: formDataRef.value.created_user, operator: 'EQ'}]
  // }
  // const res = await getWorkGroup(data)
  // if (res!=null) {
  //   if (res.list.length) {
  //     isSameGroupRef.value = true
  //   } else {
  //     isSameGroupRef.value = false
  //   }
  // } else {
  //   ElMessage.error('判断同组别失败')
  //   isSameGroupRef.value = false
  // }
}

// 获取完整的编号 工作（活动）编码：首字母缩写（如会议:HY+会议召开日期+001(3位编号)）
const getFillWorkNum = () => {
  return `${workTypeAcronymRef.value}_${getTimeForWorkNum('notice_at')}_${typeof formDataRef.value.work_num === 'string'? formDataRef.value.work_num.split('_').at(-1) :''}`
}

const getFillWorkNumPrefix = () => {
  return `${workTypeAcronymRef.value}_${getTimeForWorkNum('notice_at')}_`
}

const getTimeForWorkNum = (timeField) => {
  return Array.isArray(formDataRef.value[timeField])?formDataRef.value[timeField][0].substring(0,10):formDataRef.value[timeField]?formDataRef.value[timeField].substring(0,10):''
}

const gdzlqdClick = (name, val) => {

}

const preview = (ext, path) => {
  let arrExt = [
    '.pdf',
    '.png',
    '.jpeg',
    '.jpg',
    '.bmp',
    '.mp4',
    '.avi',
    '.webm',
    '.ogg',
    '.3gp'
  ]
  // console.log(arrExt.slice(-1))
  if (!arrExt.includes(ext)) {
    return ElMessage.warning('只支持图片、PDF、视频、预览！')
  }
  //获取文件服务器路径
  // let src = actionUrlRef.value.split('fileserver')[0] + 'fileserver/'
  // let src = actionUrlRef.value.split(`api/v1`)[0]
  //预览文件服务地址+文件相对路径
  let src = previewUrlRef.value
  // let src = window.location.host.includes('ddglyh.geo-compass')
  //   ? 'http://ddglyh.geo-compass.com/fileserver/'
  //   : 'https://fxpc.mem.gov.cn/fileserver/'
  if (ext.toLowerCase() == '.pdf') {
    window.open(
      `./static/pdfJs/web/viewer.html?file=${encodeURIComponent(
        src + path
      )}&filename=${encodeURIComponent(
        formDataRef.value.notice_name
      )}`,// 2022年6月6日加,解决当PDF文件属性标题与文件本身标题不一致时,直接显示错误的PDF属性标题的问题
      '_blank'
    )
    // window.open(`./static/pdfJs/web/viewer.html?file=${encodeURIComponent('https://fxpc.mem.gov.cn/fileserver/' + path)}`, '_blank')
  } else if (arrExt.slice(1, 5).includes(ext)) {
    // window.open(encodeURIComponent('https://fxpc.mem.gov.cn/fileserver/' + path), '_blank')http://ddglyh.geo-compass.com/
    dialogVisibleimgRef.value = true
    dialogImageUrlRef.value = src + path
  } else if (arrExt.slice(5).includes(ext)) {
    // window.open(encodeURIComponent('https://fxpc.mem.gov.cn/fileserver/' + path), '_blank')http://ddglyh.geo-compass.com/
    dialogVisibleVUrlRef.value = true
    dialogVUrlRef.value = src + path
  }
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

    countRadioRef.value = 1

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

const zxyl = (fileuuid, filename) => {
  var originUrl =
    actionUrlRef.value +
    '/downFile?fileuuid=' +
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
    downloadFile(fileuuid, plantypeRef.value).then(res => {
      if(res!=null){
        nextTick(() => {
          // 以服务的方式调用的 Loading 需要异步关闭
          loadingRef.value.close()
        })
        let blob = new Blob([res.data], { type: mime[fileext] }) // type为所需要下载的文件格式，以xls文件为例
        let link = document.createElement('a') // 创建a标签
        link.style.display = 'none'
        let objectUrl = URL.createObjectURL(blob)
        link.href = objectUrl
        link.setAttribute('download', filename)
        link.click()
        URL.revokeObjectURL(objectUrl)
        getSomeData()
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

const cascaderChange = (node) => {
  formDataRef.value.lev_jg = node.map((item, index) => {
    return {
      jg_id: item.value,
      jg_name: item.label
    }
  })
}

const lazy = (treeNode) => {
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

// 改为编辑
const editDom = () => {
  editRef.value = false
  // this.$forceUpdate()
}

// 删除提示弹框
const open = () => {
  dialogVisibleRef.value = true
}

// 获得机构数据
const getTableData = async () => {
  let deptid = ''
  let res = await getDeptTreesOld(deptid)
  if (res!=null) {
    treeDataRef.value = res
    defaultValueRef.value = formArrRef.value
  }
}

const uploadfl = async (response, file) => {
  if (response && response.code == '1') {
    fileListRef.value.push({
      filename: response.data[0].filename,
      dow_count: response.data[0].dow_count,
      uuid: response.data[0].uuid,
      ext: response.data[0].ext,
      filename: response.data[0].filename
    })

    let res = await withFile({
      planuuid: route.query.uuid,
      fileuuid: response.data[0].uuid,
      plantype: plantypeRef.value
    });
    if (res!=null) {
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

const handleRemove = async (index) => {
  let res = await delFile({ fileuuid: fileListRef.value[index].uuid, plantype:plantypeRef.value })
  if (res!=null) {
    fileListRef.value.splice(index, 1)
    ElMessage.success('文件删除成功')
  } else {
    ElMessage.error('服务器出错，请稍后重试')
  }
}

// 删除
const delOverPlanHandler = async () => {
  let delGdzlqd = false
  if (isCountryCensusOfficeTesterRef.value == 1 && formDataRef.value.sfygdqd === '1' && isNewVersionRef.value) {
    delGdzlqd = true
  }
  let res = await delOverPlan({ uuid: formDataRef.value.uuid, plantype: plantypeRef.value })
  if (res!=null) {
    if (delGdzlqd) {
      await gdzlqdRef.value.delGdzlqd('clearAll')
    }
    dialogVisibleRef.value = false
    ElMessage.success('删除成功!')
    router.push({
      name: 'WorkDynamicsList',
      query: { activeName: 'first' }
    })
  } else {
    ElMessage.error('服务器出错，请稍后重试')
  }
}

const submit = (validate = true) => {
  if (!validate) {//不校验
    if (!formDataRef.value.notice_name) {
      ElMessage.error('请填写名称')
      return
    }
    editSubmit()
    return
  }
  elFormRef.value.validate(valid => {
    if (valid) {
      if (elFormRef.value.sfygdqd === "1" && isCountryCensusOfficeTesterRef.value == 1 && isNewVersionRef.value && !gdzlqdRef.value.validateGdzlqd()) {
        return
      }
      if ((isCountryCensusOfficeTesterRef.value != 1 && !isNewVersionRef.value) && fileListRef.value && fileListRef.value.length == 0) {
        ElMessage.error('附件为必填项，上传后才能提交')
        return
      }
      editSubmit()
    } else {
      ElMessage.error('验证不通过，请按要求填写')
      return false
    }
  })
}

// 编辑提交
const editSubmit = async () => {
  // if (!formDataRef.value.lev) {
  //   formDataRef.value.levhy = ''
  // }
  // if (
  //   (formDataRef.value.levhy >= 0 && formDataRef.value.levhy !== '' && formDataRef.value.lev) ||
  //   (!formDataRef.value.levhy && !formDataRef.value.lev)
  // ) {
  // } else {
  //   ElMessage.error('下发级别与下发行业必须同时填写')
  //   return
  // }
  loadingRef.value = ElLoading.service({
    text: '正在保存中...'
  })
  formDataRef.value.plantype = plantypeRef.value
  formDataRef.value.work_num = getFillWorkNum()
  // let levJson = [];
  // if (showOrgDataOptRef.value.length > 0) {
  //   showOrgDataOptRef.value.forEach((item, index) => {
  //     levJson.push(item.data);
  //   });
  // }
  // if (levJson.length === 0) {
  //   levJson = saveShowOrgDataRef.value;
  // }
  if (!formDataRef.value.value2) {
    formDataRef.value.lev_jg = defaultValueRef.value.map((item, index) => {
      return {
        jg_id: item.value,
        jg_name: item.label
      }
    })
  }
  formDataRef.value.lev_hy = [
    {
      lev_hy: formDataRef.value.levhy,
      lev_qh: formDataRef.value.lev,
      lev_code: UserInfo
        .department.simcode
    }
  ]
  let res1 = await editOverPlan(formDataRef.value)
  if (formDataRef.value.sfygdqd === '1' && isCountryCensusOfficeTesterRef.value == 1 && isNewVersionRef.value) {
    let res2 = await gdzlqdRef.value.addGdzlqd([res1])
    await gdzlqdRef.value.delGdzlqd()
  } else if (formDataRef.value.sfygdqd === '0' && isCountryCensusOfficeTesterRef.value == 1 && isNewVersionRef.value) {
    let res2 = await gdzlqdRef.value.delGdzlqd('clearAll')
  }
  
  if (res1!=null) {
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
}

const closeEdit = () => {
  editRef.value = true
  getSomeData()
}

// 获得该条数据
const getSomeData = async () => {
  let res = await detailOverPlan(route.query.uuid, plantypeRef.value)
  // console.log(res,'获得该条数据')
  if (res!=null) {
    formDataRef.value = res
    if (formDataRef.value.work_num) {
      formDataRef.value.work_num = formDataRef.value.work_num.split('_')[2]
    }
    nextTick(async() => {
      if (formDataRef.value.sfygdqd === '1' && isCountryCensusOfficeTesterRef.value == 1 && isNewVersionRef.value) {
        await gdzlqdRef.value.queryGdzlqd(route.query.uuid)
      }
      await judgeSameGroup()
    })
    // 获取行业与级别
    let res1 = await getLevHy(route.query.uuid)
    if (res1!=null && res1.length === 1) {
      formDataRef.value.levhy = res1[0].lev_hy
      formDataRef.value.lev = res1[0].lev_qh
      // let optionshy = optionshyRef.value
      // if (typeRef.value != 0) {
      //   formDataRef.value.levhy_na = optionshy[0].label
      // } else {
      //   if (formDataRef.value.levhy <= 0) {
      //     formDataRef.value.levhy_na = optionshy[
      //       formDataRef.value.levhy + 1
      //     ].label
      //   } else {
      //     formDataRef.value.levhy_na = optionshy[formDataRef.value.levhy].label
      //   }
      // }
      //zyt--设置行业为应急管理
      formDataRef.value.levhy_na = '应急管理'
    } else if (res1!=null && res1.length > 1) {
      formDataRef.value.levhy = 11
      formDataRef.value.lev = res1[0].lev_qh
      formDataRef.value.levhy_na = '全行业'
    } else {
      formDataRef.value.levhy = ''
      formDataRef.value.lev = ''
      formDataRef.value.levhy_na = '无下发行业'
    }

    if (!formDataRef.value.lev) {
      radioObjRef.value.radio5 = ''
    } else {
      for (let index = 1; index < 6; index++) {
        if (index <= formDataRef.value.lev) {
          radioObjRef.value['radio' + index] = index
        }
      }
    }

    // if (formDataRef.value.notice_content) {//zyt注释后可展示富文本样式
    //   formDataRef.value.notice_content = formDataRef.value.notice_content.replace(
    //     /<[^>]+>|&[^>]+;/g,
    //     ''
    //   )
    // }

    fileListRef.value = res.files || []

    // 获取机构
    let res2 = await getLevJg(route.query.uuid)
    // console.log(res2,'获取机构')
    if (res2!=null) {
      showOrgDataRef.value = res2
      let obj = JSON.parse(JSON.stringify(res2))
      // console.log(obj)
      formArrRef.value = obj.map(item => {
        return {
          value: item.jg_id,
          label: item.jg_name
        }
      })
      getTableData()
    }

    if (
      (formDataRef.value.created_user &&
        formDataRef.value.created_user == UserInfo.user.id) ||
        editIsShowFn(formDataRef.value.created_code,formDataRef.value.created_user_hy)
    ) {
      editIsShowRef.value = true
    }
  } else {
    ElMessage.error('服务器出错，请稍后重试')
  }
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

onMounted(() => {
  getSomeData()
  let lev = UserInfo.department.dep_lev
  // if (typeRef.value != 0) {
  //   optionshyRef.value = [optionshyRef.value.find(val => val.value == typeRef.value)]
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
.elimg {
  width: calc(100% - 26px);
  margin: 13px;
}
</style>
