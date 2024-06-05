<template>
  <div class="taskBuild">
    <div class="mainBox">
      <div class="tableBox commomElTab">
        <el-button
          type="primary"
          size="small"
          v-if="
            editIsShowRef &&
            editRef &&
            roleIsShow('常态工作管理', '工作动态', '培训计划', '编辑') && groupRestrictionRef
          "
          class="tab-edit-btn"
          @click="editRef = false"
          >编辑</el-button
        >
        <el-button
          type="primary"
          size="small"
          v-if="
            editIsShowRef && !editRef && roleIsShow('常态工作管理', '工作动态', '培训计划', '编辑')
          "
          class="tab-edit-cancel-btn"
          @click="concelEdit"
          >取消</el-button
        >
        <el-button
          type="primary"
          size="small"
          v-if="
            editIsShowRef && !editRef && roleIsShow('常态工作管理', '工作动态', '培训计划', '编辑')
          "
          @click="submit(false)"
          class="tab-edit-save-btn"
          >保存</el-button
        >
        <el-button
          type="primary"
          size="small"
          v-if="
            editIsShowRef && !editRef && roleIsShow('常态工作管理', '工作动态', '培训计划', '编辑')
          "
          @click="submit"
          class="tab-edit-submit-btn"
          >提交</el-button
        >
        <el-button
          type="primary"
          v-if="
            editIsShowRef && roleIsShow('常态工作管理', '工作动态', '培训计划', '删除') && groupRestrictionRef
          "
          plain
          size="small"
          class="tab-del-btn"
          @click="isShowDelModalRef = true"
          >删除</el-button
        >

        <!-- 删除培训活动 -->
        <el-dialog
          title="删除提示"
          class="del-dialog"
          v-model="isShowDelModalRef"
          width="20%"
          top="30vh"
        >
          <span style="padding-left: 10%">是否删除当前培训活动及其对应的课程信息？</span>
          <template #footer class="dialog-footer">
            <el-button @click="isShowDelModalRef = false" link size="small"
              >取 消</el-button
            >
            <el-button type="primary" @click="delOverPlanHandler" size="small"
              >确 定</el-button
            >
          </template>
        </el-dialog>

        <el-tabs v-model="activeNameRef">
          <el-tab-pane style="overflow-y: scroll" label="培训详情" name="first">
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
                        <span v-if="editRef">{{ overviewObjRef.train_name }}</span>
                        <el-input
                          v-else
                          style="width: 80%;"
                          v-model="formDataRef.train_name"
                          size="small"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col v-if="isCountryCensusOfficeTesterRef == 1 && isNewVersionRef" class="elcol" :offset="0" :span="24">
                      <el-form-item
                        class="name"
                        label="工作（活动）编码:"
                        label-width="128px"
                      >
                        <span v-if="editRef">{{ getFillWorkNum() }}</span>
                        <span v-else>{{ getFillWorkNum() }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col v-if="isCountryCensusOfficeTesterRef == 1 && isNewVersionRef" class="elcol" :offset="0" :span="24">
                      <el-form-item
                        class="name"
                        label="工作活动分类:"
                      >
                        <span v-if="editRef">{{ overviewObjRef.work_type }}</span>
                        <span v-else>{{ formDataRef.work_type }}</span>
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
                        <span v-if="editRef">{{ overviewObjRef.organize_unit }}</span>
                        <el-input
                          v-else
                          style="width: 90%;"
                          v-model="formDataRef.organize_unit"
                          size="small"
                        ></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col class="elcol" :offset="0" :span="6">
                      <el-form-item
                        class="name"
                        label="培训类型:"
                        prop="train_form"
                      >
                        <span v-if="editRef || (!editRef && levRef !== 1)">{{
                          overviewObjRef.train_form === 1
                            ? '技术规范解读'
                            : overviewObjRef.train_form === 2
                            ? '线下培训'
                            : overviewObjRef.train_form === 3
                            ? '专题培训'
                            : overviewObjRef.train_form === 4
                            ? '软件系统操作'
                            : overviewObjRef.train_form === 5
                            ? '直播答疑'
                            : overviewObjRef.train_form === 6
                            ? '地方培训'
                            : '暂无'
                        }}</span>
                        <el-select
                          v-if="!editRef && levRef == 1"
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
                        <span v-if="editRef">{{ overviewObjRef.student_count }}</span>
                        <el-input-number
                          v-else
                          style="width: 90%;"
                          v-model="formDataRef.student_count"
                          size="small"
                          placeholder="请填写培训人数"
                        ></el-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col class="elcol" :offset="0" :span="6">
                      <el-form-item
                        class="name"
                        label="培训对象:"
                        prop="train_to"
                      >
                        <span v-if="editRef">{{ overviewObjRef.train_to }}</span>
                        <el-input
                          v-else
                          style="width: 90%;"
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
                        <span v-if="editRef">{{
                          overviewObjRef.train_start
                            ? overviewObjRef.train_start.substr(0, 10)
                            : ''
                        }}</span>
                        <el-date-picker
                          v-else
                          type="date"
                          class="eldate"
                          style="width: 90%;"
                          placeholder="请选择培训开始时间"
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
                        <span v-if="editRef">{{
                          overviewObjRef.train_end
                            ? overviewObjRef.train_end.substr(0, 10)
                            : ''
                        }}</span>
                        <el-date-picker
                          v-else
                          type="date"
                          class="eldate"
                          style="width: 90%;"
                          placeholder="请选择培训结束时间"
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
                        <span v-if="editRef">
                          {{ overviewObjRef.cateGory && overviewObjRef.cateGory.toString() }}
                        </span>
                        <el-select v-else
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
                    <el-col class="elcol" :offset="0" :span="18">
                      <el-form-item
                        class="name"
                        label="查看级别:"
                      >
                        <span v-if="editRef">{{
                          overviewObjRef.lev == 1
                            ? '国家'
                            : overviewObjRef.lev == 2
                            ? '省级及以上'
                            : overviewObjRef.lev == 3
                            ? '市级及以上'
                            : overviewObjRef.lev == 4
                            ? '县级及以上'
                            : '无查看级别'
                        }}</span>
                        <template v-else>
                          <template v-for="item in optionsRef" >
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

                    <!-- <el-col
                      class="elcol" :offset="0" :span="6"
                      v-if="!formDataRef.lev && editRef"
                    >
                      <el-form-item
                        class="name"
                        label="查看行业:"
                        prop="levhy_na"
                      >
                        <span v-if="editRef">{{ overviewObjRef.levhy_na }}</span>
                      </el-form-item>
                    </el-col>
                  
                    <el-col
                      class="elcol" :offset="0" :span="6"
                      v-if="formDataRef.lev"
                    >
                      <el-form-item
                        class="name"
                        label="查看行业:"
                        prop="levhy"
                      >
                        <span v-if="editRef">{{ overviewObjRef.levhy_na }}</span>
                        <el-select v-else
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
                    <el-col class="elcol" :offset="0" :span="24">
                      <el-form-item
                        class="name"
                        label="活动简介:"
                        prop="train_content"
                      >
                        <div v-if="editRef" class="formItem">
                          <div class="content">
                            <p class="content ql-snow ql-editor" style="min-height:0px;" v-html="overviewObjRef.train_content"></p>
                          </div>
                        </div>
                        <!-- 富文本编辑器-zyt -->
                        <div v-if="!editRef" style="margin-right:20px;">
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
                      <el-col v-if="isCountryCensusOfficeTesterRef == 1 && isNewVersionRef"  class="elcol"
                        :offset="0"
                        :span="24">
                      <span class="m-desc_tit">是否添加大事记：</span>
                      <span v-if="editRef">{{formDataRef.isjoinevent== 1?'是':'否'}}</span>
                      <el-radio-group v-else v-model="formDataRef.isjoinevent">
                        <el-radio :value="1">是</el-radio>
                        <el-radio :value="0">否</el-radio>
                      </el-radio-group>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col v-show="formDataRef.isjoinevent == 1 && isCountryCensusOfficeTesterRef == 1 && isNewVersionRef" class="elcol"
                      :offset="0"
                      :span="24">

                      <span class="m-desc_tit"  style="width: 150px;text-align: left;">大事记主要内容：</span>
                      <span
                        v-if="editRef"
                        v-html="overviewObjRef.event_content"
                        style="display: flex;"
                      ></span>
                      <div v-else class="content">
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
                  </el-row>
                  <el-row>
                    <el-col v-if="isCountryCensusOfficeTesterRef == 1 && isNewVersionRef" class="elcol"
                    :offset="0"
                    :span="24">
                      <span class="m-desc_tit" style="width: 100px;">归档资料清单：</span>
                      <span v-if="editRef">{{formDataRef.sfygdqd== 1?'是':'否'}}</span>

                      <span v-else v-for="item in optionsGdzlqdRef">
                        <el-radio
                          v-model="formDataRef.sfygdqd"
                          @click.native="gdzlqdClick(item.label, item.value)"
                          :key="item.value"
                          :value="item.value"
                          >{{ item.label }}</el-radio
                        >
                      </span>
                    </el-col>
                  </el-row> -->
                  <el-row>
                    <el-col class="elcol" :offset="0" :span="24">
                      <el-form-item
                        class="name"
                        label="附件:"
                      >
                        <template v-if="editRef">
                          <span
                            v-if="!fileListRef || !fileListRef.length"
                            style="color: #c0c4cc"
                            >还未上传文件</span
                          >
                          <div v-else class="file-list">
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
                                  width: 60%;
                                  white-space: nowrap;
                                  text-overflow: ellipsis;
                                  overflow: hidden;
                                "
                                >{{ v.filename }}</span
                              >
                              <el-icon class="el-icon-upload"
                                title="下载"
                                v-if="$isViewer"
                                @click.stop="clickDownload(v.uuid, v.ext, v.filename)">
                                <UploadFilled />
                              </el-icon>
                              <span style="color: #c0c4cc"
                                >下载次数&nbsp;{{ v.dow_count }}</span
                              >
                            </div>
                          </div>
                        </template>

                        <template v-else>
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
                          </el-upload>
                        </template>
                      </el-form-item>
                    </el-col>
                    <div
                      class="file-list"
                      v-if="!editRef && fileListRef && fileListRef.length"
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
                    <el-col class="elcol" :offset="0" :span="24">
                      <el-form-item
                        class="name"
                        label="培训资料:"
                      >
                        <template v-if="editRef">
                          <span
                            v-if="!fileListZlRef || !fileListZlRef.length"
                            style="color: #c0c4cc"
                            >还未上传文件</span
                          >
                          <div v-else class="file-list">
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
                                  width: 60%;
                                  white-space: nowrap;
                                  text-overflow: ellipsis;
                                  overflow: hidden;
                                "
                                >{{ v.filename }}</span
                              >
                              <el-icon class="el-icon-upload"
                                title="下载"
                                v-if="$isViewer"
                                @click.stop="clickDownload(v.uuid, v.ext, v.filename)">
                                <UploadFilled />
                              </el-icon>
                              <span style="color: #c0c4cc"
                                >下载次数&nbsp;{{ v.dow_count }}</span
                              >
                            </div>
                          </div>
                        </template>

                        <template v-else>
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
                          </el-upload>
                        </template>
                      </el-form-item>
                    </el-col>
                    <div
                      class="file-list"
                      v-if="!editRef && fileListZlRef && fileListZlRef.length"
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
              <gdzlqd v-if="isCountryCensusOfficeTesterRef == 1 && isNewVersionRef" v-show="formDataRef.sfygdqd === '1'" :form="formDataRef"
                    :workTypeAcronym="workTypeAcronymRef"
                    :workType="`培训活动`"
                    :workName="formDataRef['train_name']"
                    :fillWorkNum="fillWorkNumRef" :plantype="plantypeRef" ref="gdzlqdRef" :mode="editRef==true?'view':'edit'">
              </gdzlqd>
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
                  @click="addCourse"
                  v-if="editIsShowRef && !editRef"
                  >新增</el-button
                >
              </el-col>
            </el-row>
            <el-row style="margin: 18px 0">
              <el-col class="m-head_title" :offset="4" :span="16">
                <!-- 课程列表 -->
                <CourseTable
                  :editAble="
                    !!(
                      editIsShowRef &&
                      roleIsShow('常态工作管理', '工作动态', '培训计划', '编辑')
                    )
                  "
                  :cateGory="formDataRef.cateGory"
                  @courseNum="getCourseNum"
                  @courseLongSum="getCourseLongSum"
                />
              </el-col>
            </el-row>
            <AddCourseModal :cateGory="formDataRef.cateGory" />

          </el-tab-pane>
        </el-tabs>
        <!-- 编辑培训活动 -->
        <!-- <el-dialog
          title="编辑概述"
          v-model="editSummaryVisibleRef"
          :close-on-press-escape="false"
          :close-on-click-modal="false"
          width="45%"
          top="3vh"
          style="margin: 0 auto"
          :before-close="beforeClose"
        >
          <div class="m-form-item">
            <div class="m-form-label">
              <span style="color: red">* </span>活动名称
            </div>
            <el-input
              style="width: 60%"
              v-model="formDataRef.train_name"
              size="small"
            ></el-input>
          </div>

          <div class="m-form-item">
            <div class="m-form-label">
              <span style="color: red">* </span>组织单位
            </div>
            <el-input
              style="width: 60%"
              v-model="formDataRef.organize_unit"
              size="small"
            ></el-input>
          </div>
          <div class="m-form-item">
            <div class="m-form-label">
              <span style="color: red">* </span>培训对象
            </div>
            <el-input
              style="width: 60%"
              v-model="formDataRef.train_to"
              size="small"
            ></el-input>
          </div>
          <div class="m-form-item">
            <div class="m-form-label">
              <span style="color: red">* </span>开始时间
            </div>
            <el-date-picker
              type="date"
              class="eldate"
              style="width: 60%"
              placeholder="请选择培训开始时间"
              value-format="YYYY-MM-DD"
              v-model="formDataRef.train_start"
              size="small"
            ></el-date-picker>
          </div>

          <div class="m-form-item">
            <div class="m-form-label">
              <span style="color: red">* </span>结束时间
            </div>
            <el-date-picker
              type="date"
              class="eldate"
              style="width: 60%"
              placeholder="请选择培训结束时间"
              value-format="YYYY-MM-DD"
              v-model="formDataRef.train_end"
              size="small"
            ></el-date-picker>
          </div>

          <div class="m-form-item">
            <div class="m-form-label">
              <span style="color: red">* </span>活动类型
            </div>
            <el-select
              class="eldate"
              style="width: 60%"
              v-model="formDataRef.train_form"
              placeholder="请选择活动类型"
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
          </div>

          <div class="m-form-item">
            <div class="m-form-label">
              <span style="color: red">* </span>培训人数
            </div>
            <el-input-number
              style="width: 60%"
              v-model="formDataRef.student_count"
              size="small"
              placeholder="请填写培训人数"
            ></el-input-number>
          </div>
          <div class="m-form-item">
            <div class="m-form-label">
              <span style="color: red">* </span>查看级别
            </div>
            <el-select
              class="eldate"
              style="width: 60%"
              v-model="formDataRef.lev"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in optionsRef"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>

          <div class="m-form-item">
            <div class="m-form-label">
              <span style="color: red">* </span>活动简介
            </div>
          </div>

          <div class="m-form-item">
            <div class="m-form-label">
              <span style="color: red">* </span>培训附件
            </div>
            <el-upload
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
          </div>
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
                  width: 60%;
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

          <template #footer class="dialog-footer">
            <el-button @click="editSummaryVisibleRef = false" link size="small"
              >取 消</el-button
            >
            <el-button type="primary" @click="submit" size="small"
              >确 定</el-button
            >
          </template>
        </el-dialog> -->
      </div>
    </div>
  </div>
</template>

<script setup name="TrainingPlanDetail">
import { ref, watch, onMounted, onBeforeUnmount, computed, nextTick } from 'vue'
import { workDynamicsStore } from '@/store'
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import AddCourseModal from './course/addCourseModal.vue'
import CourseTable from './course/courceTable.vue'
import gdzlqd from '../components/gdzlqd.vue'
import { mime } from '../components/mime.js'
import { delOverPlan, detailOverPlan, getLevHy, getWithFile, 
  editOverPlan, withFile, delFile, downloadFile } from '@/api'
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'
import { Upload, UploadFilled, Paperclip, Delete } from '@element-plus/icons-vue'

const workStore = workDynamicsStore()
const router = useRouter()
const route = useRoute()

const loadingRef = ref(null)
const gdzlqdRef = ref(null)

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
const workTypeAcronymRef = ref('PXHD')
const fillWorkNumRef = ref('')
// 归档资料清单
const optionsGdzlqdRef = ref([
  { label: '是', value: "1" },
  { label: '否', value: '0' },
])
const activeNameRef = ref('first')
const UserInfo = JSON.parse(decodeURIComponent(atob(sessionStorage.getItem('UserInfo'))))
const overviewObjRef = ref({
  created_user:UserInfo
    .user.id,
  isjoinevent: 0,
  sfygdqd:'0',
  work_type:`培训活动`
})
// const optionkclxRef = ref(['调查', '评估','软件','宣传','组织实施'])//课程分类
const optionkclxRef = ref(['调查', '评估','软件','组织实施']) //课程分类
const editSummaryVisibleRef = ref(false)
const formDataRef = ref({
    train_content:'',
    created_user:UserInfo
      .user.id,
    isjoinevent: 0,
    sfygdqd:'0',
    work_type:`培训活动`
})
const fileListRef = ref([])
const fileListZlRef = ref([])
const optionsRef = ref([])
const optionRef = ref([
  // { label: '技术规范解读', value: 1 },
  // { label: '线下培训', value: 2 },
  { label: '专题培训', value: 3 },
  { label: '软件系统操作', value: 4 },
  { label: '直播答疑', value: 5 },
  { label: '地方培训', value: 6 }
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
const actionUrlRef = ref(`${baseUrl[ENV]['fileUrl']}`)
const tokenRef = ref(sessionStorage.getItem('access_token'))
const editorOptionRef = ref({
  placeholder: '请在这里输入活动简介',
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
const isShowAddModalRef = ref(false)
const editRef = ref(true) // 未编辑
const editIsShowRef = ref(false)
const isShowDelModalRef = ref(false)
const courseNumRef = ref(0)
const courseLongSumRef = ref(0)
const typeRef = ref(UserInfo.department.dep_type)
const levRef = ref(UserInfo.department.dep_lev)
const isSameGroupRef = ref(false)

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
  // return formDataRef.value.created_at ? new Date(formDataRef.value.created_at).getTime() > new Date('2023-05-23 00:00:00.000').getTime() : false
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

// 方法
const judgeSameGroup = async () => {
  return isSameGroupRef.value = formDataRef.value.group_id === null || !isCountryCensusOfficeRef.value ? true : formDataRef.value.group_id === UserInfo
    .group[0].group_id
}
  
// 获取完整的编号 工作（活动）编码：首字母缩写（如会议:HY+会议召开日期+001(3位编号)）
const getFillWorkNum = () => {
  return `${workTypeAcronymRef.value}_${getTimeForWorkNum('train_start')}_${typeof formDataRef.value.work_num === 'string'? formDataRef.value.work_num.split('_').at(-1) :''}`
}

const getFillWorkNumPrefix = () => {
  return `${workTypeAcronymRef.value}_${getTimeForWorkNum('train_start')}_`
}

const getTimeForWorkNum = (timeField) => {
  return Array.isArray(formDataRef.value[timeField])?formDataRef.value[timeField][0].substring(0,10):formDataRef.value[timeField]?formDataRef.value[timeField].substring(0,10):''
}

const validateEventContent = (rule) => {
  if(isCountryCensusOfficeTesterRef.value != 1 && !isNewVersionRef.value) return callback()
  if (formDataRef.value.isjoinevent == 1 && !formDataRef.value.event_content) {
    return ElMessage.error('请输入大事记主要内容')
  }
}

const validateWorkNum = (value) => {
  if(isCountryCensusOfficeTesterRef.value != 1 && !isNewVersionRef.value) return callback()
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

// 取消编辑
const concelEdit = () => {
  editRef.value = true
  getSomeData()
}
// 删除
const delOverPlanHandler = async () => {
  let delGdzlqd = false
  if (isCountryCensusOfficeTesterRef.value == 1 && formDataRef.value.sfygdqd === '1' && isNewVersionRef.value) {
    delGdzlqd = true
  }
  let res = await delOverPlan({ uuid: formDataRef.value.uuid, plantype: plantypeRef.value });
  if (delGdzlqd) {
      await gdzlqdRef.value.delGdzlqd('clearAll')
  }
  if (res!=null) {
    isShowDelModalRef.value = false
    ElMessage.success('删除成功!')
    router.push({ name: 'training' })
  } else {
    ElMessage.error('服务器出错，请稍后重试')
  }
}

// 获得该条数据
const getSomeData = async () => {
  let res = await detailOverPlan(route.query.uuid, plantypeRef.value);
  console.log(res,'res')
  if (res!=null) {
    let res1 = await getLevHy(route.query.uuid);
    if (res1!=null && res1.length === 1) {
      res.levhy = res1[0].lev_hy
      res.lev = res1[0].lev_qh
      // if (typeRef.value != 0) {
      //   res.levhy_na = optionshyRef.value[0].label
      // } else {
      //   if (res.levhy <= 0) {
      //     res.levhy_na = optionshyRef.value[
      //     res.levhy + 1
      //     ].label
      //   } else {
      //     res.levhy_na = optionshyRef.value[
      //     res.levhy
      //     ].label
      //   }
      // }
      //zyt--设置行业为应急管理
      res.levhy_na = '应急管理'
    } else if (res1!=null && res1.length > 1) {
      res.levhy = 11
      res.lev = res1[0].lev_qh
      res.levhy_na = '全行业'
    } else {
      res.levhy = ''
      res.lev = ''
      res.levhy_na = '无下发行业'
    }
    if (!res.lev) {
      radioObjRef.value.radio5 = ''
    } else {
      for (let index = 1; index < 6; index++) {
        if (index <= res.lev) {
          radioObjRef.value['radio' + index] = index
        }
      }
    }

    let cateArr = []
    if (typeof res.course_type_info === 'string') {
      res.cateGory = res.course_type_info.split(',')
    } else {
      res.cateGory = res.course_type_info
    }

    overviewObjRef.value = res
    formDataRef.value = res
    if (formDataRef.value.work_num) {
      formDataRef.value.work_num = formDataRef.value.work_num.split('_')[2]
    }
    nextTick(async() => {
      if (formDataRef.value.sfygdqd === '1' && isCountryCensusOfficeTesterRef.value == 1 && isNewVersionRef.value) {
      let res2 = await gdzlqdRef.value.queryGdzlqd(route.query.uuid)
      }
      await judgeSameGroup()
    })
    // if (formDataRef.value.train_content) {//zyt注释后可展示富文本样式
    //   // 活动简介
    //   formDataRef.value.train_content = formDataRef.value.train_content.replace(
    //     /<[^>]+>|&[^>]+;/g,
    //     ''
    //   )
    // }

    fileListRef.value = res.files || []
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
    console.log(formDataRef.value,'formDataRef.value')
    console.log(UserInfo.user.id,'UserInfo')
    console.log(editIsShowRef.value,'editIsShowRef')
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

const getFilesByType1 = async () => {
  let res = await getWithFile({
      planuuid: route.query.uuid,
      plantype: plantypeRef.value,
      usetype: 1
    });
  if (res!=null) {
    fileListRef.value = res
  }
}

const getFilesByType15 = async () => {
  let res = await getWithFile({
      planuuid: route.query.uuid,
      plantype: plantypeRef.value,
      usetype: 15
    });
  if (res!=null) {
    fileListZlRef.value = res
  }
}

const getFiles = () => {
  getFilesByType1();
  getFilesByType15();
}

const beforeClose = () => {
  editSummaryVisibleRef.value = false
  formDataRef.value = overviewObjRef.value
}

const submit = (validate = true) => {
  if (!validate) {
    //不校验
    if (!formDataRef.value.train_name) {
      ElMessage.warning('请输入培训名称')
      return
    }
    editSubmit()
    return
  } else {
    elFormRef.value.validate(valid => {
      if (valid) {
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
        //   //校验级别和行业通过
        // } else {
        //   ElMessage.error('下发级别与下发行业必须同时填写')
        //   return
        // }
        if (formDataRef.value.sfygdqd === "1" && isCountryCensusOfficeTesterRef.value == 1 && isNewVersionRef.value && !gdzlqdRef.value.validateGdzlqd()) {
          return
        }
        editSubmit()
      } else {
        ElMessage.error('验证不通过，请按要求填写')
        return false
      }
    })
  }
}

// 点击提交活动概要编辑
const editSubmit = async () => {
  loadingRef.value = ElLoading.service({
    text: '正在保存中...'
  })
  if (!formDataRef.value.lev) {
    formDataRef.value.levhy = ''
  }
  if (levRef.value !== 1) {
    formDataRef.value.train_form = 6
  }

  // let obj = {}
  // formDataRef.value.cateGory &&
  //   formDataRef.value.cateGory.split('；').forEach((item, index) => {
  //     if (item) {
  //       obj[index + 1] = item
  //     }
  //   })
  formDataRef.value.course_type_info = formDataRef.value.cateGory.toString() //  JSON.stringify(obj)
  formDataRef.value.lev_hy = [
    {
      lev_hy: formDataRef.value.levhy,
      lev_qh: formDataRef.value.lev,
      lev_code: UserInfo
        .department.simcode
    }
  ]
  formDataRef.value.work_num =  getFillWorkNum()
  formDataRef.value.plantype = plantypeRef.value
  formDataRef.value.train_long = courseLongSumRef.value
  const res = await editOverPlan(formDataRef.value)
  if (formDataRef.value.sfygdqd === '1' && isCountryCensusOfficeTesterRef.value == 1 && isNewVersionRef.value) {
    let res2 = await gdzlqdRef.value.addGdzlqd([res])
    await gdzlqdRef.value.delGdzlqd()
  }  else if (formDataRef.value.sfygdqd === '0' && isCountryCensusOfficeTesterRef.value == 1 && isNewVersionRef.value) {
    let res2 = await gdzlqdRef.value.delGdzlqd('clearAll')
  }
  
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
}

const beforeupload = (file) => {
  let filename = file.name.slice(file.name.lastIndexOf('.'))
  // let fileCate = ["jpg", "jpeg", "png", "gif", "bmp", "pdf", "ppt", "txt", "doc", "docx", "xls", "xlsx", "pptx", "mpeg", "3gp", "mp4", "avi", "flv", "zip", "rar", "7z", "bz2", "gz"];

  const isLt2M = file.size / 1024 / 1024 <= 2000

  if (!mime[filename]) {
    ElMessage.error('上传文件不符合格式!')
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

const uploadfl = async (response, file) => {
  if (response && response.code == '1') {
    fileListRef.value.push({
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
      ElMessage.error('文件上传失败')
    }
  }
}

const uploadflZl = async (response, file) => {
  if (response && response.code == '1') {
    fileListZlRef.value.push({
      uuid: response.data[0].uuid,
      ext: response.data[0].ext,
      filename: response.data[0].filename
    })

    let res = await withFile({
      planuuid: route.query.uuid,
      fileuuid: response.data[0].uuid,
      plantype: plantypeRef.value,
      usetype: 15
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
      ElMessage.error('文件上传失败')
    }
  }
}

const addCourse = () => {
  workStore.mutIfShowAddCourse(true)
}

const handleRemove = (index) => {
 ElMessageBox.confirm('此操作将删除文件, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      let res = await delFile({ fileuuid: fileListRef.value[index].uuid, plantype: plantypeRef.value })//附件删除
      if (res!=null) {
        fileListRef.value.splice(index, 1)
        ElMessage.success('文件删除成功')
      } else {
        ElMessage.error('服务器出错，请稍后重试')
      }
    })
    .catch(() => {
      ElMessage.info('已取消删除')
    })

}

const handleRemoveZl = (index) => {
 ElMessageBox.confirm('此操作将删除文件, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      let res = await delFile({ fileuuid: fileListZlRef.value[index].uuid, plantype: plantypeRef.value })//资料删除
      if (res!=null) {
        fileListZlRef.value.splice(index, 1)
        ElMessage.success('文件删除成功')
      } else {
        ElMessage.error('服务器出错，请稍后重试')
      }
    })
    .catch(() => {
      ElMessage.info('已取消删除')
    })

}

const clickDownload = async (fileuuid, ext, filename) => {
  loadingRef.value = ElLoading.service({
    text: '正在下载中...'
  })
  let fileext = ext.toLowerCase()
  if (mime[fileext]) {
    let res = await downloadFile(fileuuid, 12);
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

onMounted(() => {
  getSomeData()
  getFiles()
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
// :deep(.el-table__body-wrapper){
//   height:200px;
//   overflow-y:auto;
// }

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
