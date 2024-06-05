<template>
  <div class="zlxz">
    <el-row style="height: 100%">
      <el-col style="height: 100%" :offset="4" :span="16">
        <div class="zlxz-con">
          <div style="height: 14px; line-height: 14px; position: relative">
            <span style="float: left">当前位置：</span>
            <el-breadcrumb style="float: left" separator-class="el-icon-arrow-right">
              <el-breadcrumb-item
                :to="{ path: '/docsdownload', query: { activeName: $route.query.pageName } }"
                style="color: #7c7c7c"
                >{{ pageName }}</el-breadcrumb-item
              >
              <el-breadcrumb-item>详情</el-breadcrumb-item>
            </el-breadcrumb>
            <el-button class="back-btn" @click="backFn" type="primary" plain size="small"
              >返回列表</el-button
            >
          </div>
          <div v-if="$route.query.plantype == 1" class="xq-con">
            <el-row style="margin-top: 30px">
              <el-form
                ref="formEl"
                label-position="right"
                size="small"
                :model="form"
                label-width="140px"
              >
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="普查方案名称:" prop="plan_name">
                    <span >{{ form.plan_name }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" prop="im_or_over" label="普查方案类型:">
                    <span >{{
                      form.im_or_over == 1 ? "总体方案" : "实施方案"
                    }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="印发时间:" prop="print_at">
                    <span >{{
                      form.print_at != undefined ? form.print_at.substr(0, 10) : ""
                    }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="文号:" prop="doc_num">
                    <span >{{ form.doc_num }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="印发单位:" prop="print_unit">
                    <span >{{
                      form.print_unit
                    }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="编制单位:" prop="make_unit">
                    <span >{{ form.make_unit }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="14">
                  <el-form-item class="name" label="查看级别:" prop="lev">
                    <span >{{
                      form.lev == 1
                        ? "国家"
                        : form.lev == 2
                        ? "省级及以上"
                        : form.lev == 3
                        ? "市级及以上"
                        : form.lev == 4
                        ? "县级及以上"
                        : "无查看级别"
                    }}</span>
                  </el-form-item>
                </el-col>
                <el-col  class="elcol" :span="8">
                    <el-form-item
                      class="name"
                      label-width="80px"
                      label="查看行业:"
                      prop="levhy"
                    >
                    <span>{{form.levhy_na}}</span>
                    </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item label="摘要:">
                    <div class="formItem">
                      <div class="content">
                        <p  class="remarks">
                          {{ form.remarks }}
                        </p>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="附件查看:">
                    <div v-if="fileList && fileList.length>0" class="file-list">
                        <div
                          v-for="(v, ind) in fileList"
                          :key="ind"
                          class="file-list-item"

                        >
                          <span>
                              <el-icon>
                                <Paperclip />
                              </el-icon>
                              <span
                                :title="v.filename"
                                class="name"
                              >{{ v.filename }}</span >
                          </span>
                          <span>
                            <span v-if="![`国家级评估成果1.0版（征求意见）`].find(name=>v.filename.includes(name))"  style="color: #c0c4cc"
                              >下载次数&nbsp;{{ v.dow_count }}</span
                            >
                            <el-icon 
                              title="下载"
                              v-if="$isViewer && ![`国家级评估成果1.0版（征求意见）`].find(name=>v.filename.includes(name))"
                              @click="download(v.uuid, v.ext, v.filename)">
                              <UploadFilled />
                            </el-icon>
                            <el-icon 
                              @click="preview( v.ext, v.path)"
                              title="预览">
                              <View />
                            </el-icon>
                          </span>
                        </div>
                    </div>
                    <div v-else style="color: #c0c4cc">还未上传文件</div>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-row>
          </div>
          <div v-if="$route.query.plantype == 3" class="xq-con">
            <el-row style="margin-top: 30px">
              <el-form
                ref="formEl"
                label-position="right"
                size="small"
                :model="form"
                label-width="140px"
              >
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="技术规范名称:" prop="plan_name">
                    <span >{{ form.plan_name }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="编制单位:" prop="make_unit">
                    <span >{{ form.make_unit }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="印发/上传时间:" prop="print_at">
                    <span >{{
                      form.print_at != undefined ? form.print_at.substr(0, 10) : ""
                    }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="文号:" prop="doc_num">
                    <span >{{ form.doc_num }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                    <el-form-item class="name" label="类型:" prop="tech_type">
                      <span  >{{
                        form.tech_type == 1
                          ? "调查"
                          : form.tech_type == 2
                          ? "区划评估"
                          : "暂无"
                      }}</span>
                    </el-form-item>
                </el-col>
                 <el-col class="elcol" :offset="1" :span="22">
                    <el-form-item class="name" label="所属行业:" prop="in_hy">
                      <span  >{{
                        form.type_na
                      }}</span>
                    </el-form-item>
                  </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="印发单位:" prop="print_unit">
                    <span >{{
                      form.print_unit
                    }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item label="说明备注:">
                    <div class="formItem">
                      <div class="content">
                        <p  class="remarks">
                          {{ form.remarks }}
                        </p>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="附件查看:">
                    <div v-if="fileList && fileList.length>0" class="file-list">
                        <div
                          v-for="(v, ind) in fileList"
                          :key="ind"
                          class="file-list-item"

                        >
                          <span>
                              <el-icon>
                                <Paperclip />
                              </el-icon>
                              <span
                                :title="v.filename"
                                class="name"
                              >{{ v.filename }}</span >
                          </span>
                          <span>
                            <span v-if="![`国家级评估成果1.0版（征求意见）`].find(name=>v.filename.includes(name))"  style="color: #c0c4cc"
                              >下载次数&nbsp;{{ v.dow_count }}</span
                            >
                            <el-icon 
                              title="下载"
                              v-if="$isViewer && ![`国家级评估成果1.0版（征求意见）`].find(name=>v.filename.includes(name))"
                              @click="download(v.uuid, v.ext, v.filename)">
                              <UploadFilled />
                            </el-icon>
                            <el-icon 
                              @click="preview( v.ext, v.path)"
                              title="预览">
                              <View />
                            </el-icon>
                          </span>
                        </div>
                      </div>
                      <div v-else style="color: #c0c4cc">还未上传文件</div>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-row>
          </div>
          <div v-if="$route.query.plantype == 12" class="xq-con">
            <el-row style="margin-top: 30px">
              <el-form
                ref="formEl"
                size="small"
                label-position="right"
                :model="form"
                label-width="130px"
              >
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="文件名称:" prop="doc_name">
                    <span >{{ form.doc_name }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" prop="doc_num" label="文号:">
                    <span >{{ form.doc_num }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="印发单位:" prop="yf_unit">
                    <span >{{ form.yf_unit }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="印发时间:" prop="print_at">
                    <span >{{
                      form.print_at != undefined ? form.print_at.substr(0, 10) : ""
                    }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="14">
                  <el-form-item class="name" label="查看级别:" prop="lev">
                    <span >{{
                      form.lev == 1
                        ? "国家"
                        : form.lev == 2
                        ? "省级及以上"
                        : form.lev == 3
                        ? "市级及以上"
                        : form.lev == 4
                        ? "县级及以上"
                        : "无查看级别"
                    }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :span="8">
                  <el-form-item class="name" label="查看行业:" prop="lev">
                    <span >{{ form.levhy_na }}</span>
                  </el-form-item>
                </el-col>
                <el-col  class="elcol" :offset="1" :span="22">
                  <el-form-item class="name nameorg" label="查看机构:">
                    <span v-if="showOrgDatawj.length == 0" style="color:#c1c1c1">暂无查看机构</span>
                    <template v-else>
                       <span
                        v-for="v in showOrgDatawj"
                        :key="v.jg_id"
                        style="
                          position: relative;
                          z-index: 10;
                          margin: 0;
                          padding-right: 10px;
                          line-height: 32px;
                        "
                        >{{ v.jg_name }}</span
                      >
                    </template>

                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item label="备注说明:">
                    <div class="formItem">
                      <div class="content">
                        <p  class="remarks">
                          {{ form.remarks }}
                        </p>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="附件查看:">
                    <div v-if="fileList && fileList.length>0" class="file-list">
                        <div
                          v-for="(v, ind) in fileList"
                          :key="ind"
                          class="file-list-item"

                        >
                          <span>
                              <el-icon>
                                <Paperclip />
                              </el-icon>
                              <span
                                :title="v.filename"
                                class="name"
                              >{{ v.filename }}</span >
                          </span>
                          <span>
                            <span v-if="![`国家级评估成果1.0版（征求意见）`].find(name=>v.filename.includes(name))"  style="color: #c0c4cc"
                              >下载次数&nbsp;{{ v.dow_count }}</span
                            >
                            <el-icon 
                              title="下载"
                              v-if="$isViewer && ![`国家级评估成果1.0版（征求意见）`].find(name=>v.filename.includes(name))"
                              @click="download(v.uuid, v.ext, v.filename)">
                              <UploadFilled />
                            </el-icon>
                            <el-icon 
                              @click="preview( v.ext, v.path)"
                              title="预览">
                              <View />
                            </el-icon>
                          </span>
                        </div>
                      </div>
                      <div v-else style="color: #c0c4cc">还未上传文件</div>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-row>
          </div>
          <div v-if="$route.query.plantype == 11" class="xq-con">
            <el-row style="margin-top: 30px">
              <el-form
                ref="formEl"
                size="small"
                label-position="right"
                :model="form"
                label-width="130px"
              >
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="函件名称:" >
                    <span >{{form.notice_name}}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="文号:" prop="doc_num">
                    <span >{{
                      form.doc_num
                    }}</span>
                    </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="发布时间:" prop="notice_at">
                    <span >{{ form.notice_at }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="发布单位:" prop="iss_unit">
                    <span >{{ form.iss_unit }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="14">
                  <el-form-item class="name" label="查看级别:" prop="lev">
                    <span>{{
                     form.lev == 1
                        ? "国家"
                        : form.lev == 2
                        ? "省级及以上"
                        : form.lev == 3
                        ? "市级及以上"
                        : form.lev == 4
                        ? "县级及以上"
                        : "无查看级别"
                    }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="查看行业:" prop="lev">
                    <span >{{ form.levhy_na }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name nameorg" label="查看机构:">
                    <span v-if="showOrgDatawj.length == 0" style="color:#c1c1c1">暂无查看机构</span>
                    <template v-else>
                       <span
                        v-for="v in showOrgDatawj"
                        :key="v.jg_id"
                        style="
                          position: relative;
                          z-index: 10;
                          margin: 0;
                          padding-right: 10px;
                        "
                        >{{ v.jg_name }}</span
                      >
                    </template>
                  </el-form-item>
                </el-col>

                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="附件查看:">
                    <div v-if="fileList && fileList.length>0" class="file-list">
                        <div
                          v-for="(v, ind) in fileList"
                          :key="ind"
                          class="file-list-item"

                        >
                          <span>
                              <el-icon>
                                <Paperclip />
                              </el-icon>
                              <span
                                :title="v.filename"
                                class="name"
                              >{{ v.filename }}</span >
                          </span>
                          <span>
                            <span v-if="![`国家级评估成果1.0版（征求意见）`].find(name=>v.filename.includes(name))"  style="color: #c0c4cc"
                              >下载次数&nbsp;{{ v.dow_count }}</span
                            >
                            <el-icon 
                              title="下载"
                              v-if="$isViewer && ![`国家级评估成果1.0版（征求意见）`].find(name=>v.filename.includes(name))"
                              @click="download(v.uuid, v.ext, v.filename)">
                              <UploadFilled />
                            </el-icon>
                            <el-icon 
                              @click="preview( v.ext, v.path)"
                              title="预览">
                              <View />
                            </el-icon>
                          </span>
                        </div>
                      </div>
                      <div v-else style="color: #c0c4cc">还未上传文件</div>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-row>
          </div>
          <div v-if="$route.query.plantype == 13" class="xq-con">
            <el-row style="margin-top: 30px">
              <el-form
                ref="formEl"
                size="small"
                label-position="right"
                :model="form"
                label-width="130px"
              >
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="简报时间:" prop="brief_at">
                    <span >{{
                      form.brief_at != undefined ? form.brief_at.substr(0, 10) : ""
                    }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="简报名称:" prop="brief_name">
                    <span >{{
                      form.brief_name
                    }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="简报类型:" prop="brief_type">
                    <span >{{
                      form.brief_type == 1
                        ? "普查综合讯息"
                        : form.brief_type == 2
                        ? "月度工作进展"
                        : form.brief_type == 3
                        ? "每周工作动态"
                        : "暂无"
                    }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="14">
                  <el-form-item class="name" label="查看级别:" prop="lev">
                    <span >{{
                      form.lev == 1
                        ? "国家"
                        : form.lev == 2
                        ? "省级及以上"
                        : form.lev == 3
                        ? "市级及以上"
                        : form.lev == 4
                        ? "县级及以上"
                        : "无查看级别"
                    }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :span="8">
                  <el-form-item class="name" label="查看行业:" prop="lev">
                    <span >{{ form.levhy_na }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name nameorg" label="查看机构:">
                     <span v-if="showOrgDatawj.length == 0" style="color:#c1c1c1">暂无查看机构</span>
                    <template v-else>
                       <span
                        v-for="v in showOrgDatawj"
                        :key="v.jg_id"
                        style="
                          position: relative;
                          z-index: 10;
                          margin: 0;
                          padding-right: 10px;
                          line-height: 32px;
                        "
                        >{{ v.jg_name }}</span
                      >
                    </template>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="附件查看:">
                    <div v-if="fileList && fileList.length>0" class="file-list">
                        <div
                          v-for="(v, ind) in fileList"
                          :key="ind"
                          class="file-list-item"

                        >
                          <span>
                              <el-icon>
                                <Paperclip />
                              </el-icon>
                              <span
                                :title="v.filename"
                                class="name"
                              >{{ v.filename }}</span >
                          </span>
                          <span>
                            <span v-if="![`国家级评估成果1.0版（征求意见）`].find(name=>v.filename.includes(name))"  style="color: #c0c4cc"
                              >下载次数&nbsp;{{ v.dow_count }}</span
                            >
                            <el-icon 
                              title="下载"
                              v-if="$isViewer && ![`国家级评估成果1.0版（征求意见）`].find(name=>v.filename.includes(name))"
                              @click="download(v.uuid, v.ext, v.filename)">
                              <UploadFilled />
                            </el-icon>
                            <el-icon 
                              @click="preview( v.ext, v.path)"
                              title="预览">
                              <View />
                            </el-icon>
                          </span>
                        </div>
                      </div>
                      <div v-else style="color: #c0c4cc">还未上传文件</div>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-row>
          </div>
          <div v-if="$route.query.plantype == 7" class="xq-con">
            <el-row style="margin-top: 30px">
              <el-form
                ref="formEl"
                label-position="right"
                size="small"
                :model="form"
                label-width="130px"
              >
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="宣传产品名称:" prop="pubpro_name">
                    <span >{{
                      form.pubpro_name
                    }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="制作单位:" prop="make_unit">
                    <span >{{ form.make_unit }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="产品类别:" prop="pubpro_type">
                    <span >{{
                     form.pubpro_type === 1
                          ? "手册"
                          : form.pubpro_type === 2
                          ? "宣传海报"
                          : form.pubpro_type === 3
                          ? "折页纸"
                          : form.pubpro_type === 4
                          ? "视频"
                          : form.pubpro_type === 5
                          ? "新闻"
                          : form.pubpro_type === 6
                          ? "其它"
                          : form.pubpro_type === 7
                          ? "纸质材料"
                          : form.pubpro_type === 8
                          ? "音频"
                          : "暂无"
                    }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="发布时间:" prop="pubpro_at">
                    <span >{{
                      form.pubpro_at != undefined ? form.pubpro_at.substr(0, 10) : ""
                    }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="制作完成时间:" prop="finish_at">
                    <span >{{
                      form.finish_at != undefined ? form.finish_at.substr(0, 10) : ""
                    }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="查看次数:">
                    <span >{{ form.see_count }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="14">
                  <el-form-item class="name" label="查看级别:" prop="lev">
                    <span >{{
                      form.lev == 1
                        ? "国家"
                        : form.lev == 2
                        ? "省级及以上"
                        : form.lev == 3
                        ? "市级及以上"
                        : form.lev == 4
                        ? "县级及以上"
                        : "无查看级别"
                    }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :span="8">
                  <el-form-item class="name" label="查看行业:" prop="lev">
                    <span >{{ form.levhy_na }}</span>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item label="产品说明:">
                    <div class="formItem">
                      <div class="content">
                        <p  class="remarks">
                          {{ form.pubpro_content }}
                        </p>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col class="elcol" :offset="1" :span="22">
                  <el-form-item class="name" label="宣传产品附件:">
                    <div v-if="fileList && fileList.length>0" class="file-list">
                        <div
                          v-for="(v, ind) in fileList"
                          :key="ind"
                          class="file-list-item"

                        >
                          <span>
                              <el-icon>
                                <Paperclip />
                              </el-icon>
                              <span
                                :title="v.filename"
                                class="name"
                              >{{ v.filename }}</span >
                          </span>
                          <span>
                            <span v-if="![`国家级评估成果1.0版（征求意见）`].find(name=>v.filename.includes(name))"  style="color: #c0c4cc"
                              >下载次数&nbsp;{{ v.dow_count }}</span
                            >
                            <el-icon 
                              title="下载"
                              v-if="$isViewer && ![`国家级评估成果1.0版（征求意见）`].find(name=>v.filename.includes(name))"
                              @click="download(v.uuid, v.ext, v.filename)">
                              <UploadFilled />
                            </el-icon>
                            <el-icon 
                              @click="preview( v.ext, v.path)"
                              title="预览">
                              <View />
                            </el-icon>
                          </span>
                        </div>
                      </div>
                      <div v-else style="color: #c0c4cc">还未上传文件</div>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog class="zlxzxp"  v-model="dialogVisible">
      <img class="elimg" :src="dialogImageUrl" alt="加载失败">
    </el-dialog>
    <el-dialog class="zlxzxp"  v-model="dialogVisibleVUrl">
      <video
        :src="dialogVUrl"
        :controls="true"
        controlslist="nodownload"
        class="elimg"
      ></video>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { View ,UploadFilled ,Paperclip,Delete } from '@element-plus/icons-vue' // 引入 Edit 这个 svg组件
import { reactive, ref, nextTick, watch, onMounted } from 'vue'
import router from '@/router'
import { userStore } from '@/store'
import { ElMessage } from 'element-plus'
import { mime } from '@/utils/mime.js'
import {downloadFile,detailOverPlan ,getLevHy,getLevJg} from '@/api'

const user = userStore()
const UserInfo = user.userInfo
const dialogVisibleVUrl = ref(false)
const dialogVUrl = ref('')
const dialogVisible = ref(false)
const dialogImageUrl = ref('')
const pageName = ref('')
const formEl = ref<any>()
const form = ref<any>({})
const fileList = ref([])
const showOrgDatawj = ref([])
const lev = ref(UserInfo.department.dep_lev)
const type = ref(UserInfo.department.dep_type)
const queryUuid:any = ref(router.currentRoute.value.query.uuid) 
const queryPlantype:any = ref(router.currentRoute.value.query.plantype)  
const optionshy = ref([
      { label: '全行业', value: 11 },
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
    
const previewUrlRef = ref(`${baseUrl[ENV]['previewUrl']}`)
const preview =(ext: string, path: string)=> {
  let arrExt = ['.pdf', '.png', '.jpeg', '.jpg', '.bmp', '.mp4', '.avi', '.webm', '.ogg', '.3gp']
  // console.log(arrExt.slice(-1))
  if (!arrExt.includes(ext)) {
    return ElMessage.error('只支持图片、PDF、视频、预览！')
  }
  // debugger
  // let src =  'http://ddglyh.geo-compass.com/fileserver/'
  //预览文件服务地址+文件相对路径
  let src = previewUrlRef.value
  if (ext.toLowerCase() == '.pdf') {
    window.open(`./static/pdfJs/web/viewer.html?file=${encodeURIComponent(src + path)}`, '_blank')
    // window.open(`./static/pdfJs/web/viewer.html?file=${encodeURIComponent('https://fxpc.mem.gov.cn/fileserver/' + path)}`, '_blank')
  } else if (arrExt.slice(1, 5).includes(ext)) {
    // window.open(encodeURIComponent('https://fxpc.mem.gov.cn/fileserver/' + path), '_blank')http://ddglyh.geo-compass.com/
    dialogVisible.value = true
    dialogImageUrl.value = src + path
    console.log(dialogImageUrl.value);
    
  } else if (arrExt.slice(5).includes(ext)) {
    // window.open(encodeURIComponent('https://fxpc.mem.gov.cn/fileserver/' + path), '_blank')http://ddglyh.geo-compass.com/
    dialogVisibleVUrl.value = true
    dialogVUrl.value = src + path
  }
}
const download  = async (fileuuid: any, ext: string, filename: string)=> {
  let fileext = ext.toLowerCase()
  if (mime[fileext]) {
    let res:any = await downloadFile(fileuuid,6)
    if(res){
      let blob = new Blob([res.data], { type: mime[fileext] }) // type为所需要下载的文件格式，以xls文件为例
      let link = document.createElement('a') // 创建a标签
      link.style.display = 'none'
      let objectUrl = URL.createObjectURL(blob)
      link.href = objectUrl
      link.setAttribute('download', filename)
      link.click()
      URL.revokeObjectURL(objectUrl)
    }else{
      ElMessage.error(res)
    }
  }
}

const backFn =()=> {
  router.push({name:'docsdownload'})
}
const getLevHyList = async()=> {
  let res1:any = await getLevHy(queryUuid.value)
  if(res1){
    // debugger
    if ( res1.length === 1) {
      form.value.levhy = res1[0].lev_hy
      form.value.lev = res1[0].lev_qh
      if (type.value != 0) {
        form.value.levhy_na = optionshy.value[0].label
      } else {
        form.value.levhy_na = optionshy.value[form.value.levhy + 1].label
      }
    } else if (res1.length > 1) {
      form.value.levhy = 11
      form.value.lev = res1[0].lev_qh
      form.value.levhy_na = '全行业'
    } else {
      form.value.levhy =''
      form.value.lev = ''
      form.value.levhy_na = '无下发行业'
    }
  }else{
      form.value.levhy =''
      form.value.lev = ''
      form.value.levhy_na = '无下发行业'
  }
}
const getLevJgList = async ()=>{
  let res2:any = await getLevJg(queryUuid.value)
  if(res2){
    showOrgDatawj.value = res2
  // debugger
  }
}
const getOneData = async ()=> {
  form.value = {}
  // debugger
  let res:any = await detailOverPlan(queryUuid.value,queryPlantype.value)
  if(res){
    form.value = res ||{}
    fileList.value = res.files || []
    // debugger
    if (queryPlantype.value == 1) {
       console.log('queryPlantype.value == 1');
      getLevHyList()
      if (form.value.remarks) {
        form.value.remarks = form.value.remarks.replace(/<[^>]+>|&[^>]+;/g, '')
      }

    } else if (queryPlantype.value == 3) {
        if (form.value.remarks) {
          form.value.remarks = form.value.remarks.replace(/<[^>]+>|&[^>]+;/g, '')
        }

        if (form.value.tech_type == 1) {
          form.value.type_na = '应急管理'
        } else if (form.value.tech_type == 2) {
          form.value.type_na = '生态环境'
        } else if (form.value.tech_type == 3) {
          form.value.type_na = '交通运输'
        } else if (form.value.tech_type == 4) {
          form.value.type_na = '海洋'
        } else if (form.value.tech_type == 5) {
          form.value.type_na = '住建'
        } else if (form.value.tech_type == 6) {
          form.value.type_na = '水利'
        } else if (form.value.tech_type == 7) {
          form.value.type_na = '气象'
        } else if (form.value.tech_type == 8) {
          form.value.type_na = '林草'
        } else if (form.value.tech_type == 9) {
          form.value.type_na = '地震'
        } else if (form.value.tech_type == 10) {
          form.value.type_na = '地质'
        } else if (form.value.tech_type == 0) {
          form.value.type_na = '普查办'
        }
    } else if (queryPlantype.value == 11) {
       console.log('queryPlantype.value == 11');
      // debugger
      getLevHyList()
      getLevJgList()
      if (form.value.remarks) {
        form.value.remarks = form.value.remarks.replace(/<[^>]+>|&[^>]+;/g, '')
      }


    } else if (queryPlantype.value == 12) {
      getLevHyList()
      getLevJgList()
      if (form.value.remarks) {
        form.value.remarks = form.value.remarks.replace(/<[^>]+>|&[^>]+;/g, '')
      }

    } else if (queryPlantype.value == 13) {
          
      getLevHyList()
      getLevJgList()
      if (form.value.brief_content) {
        form.value.brief_content = form.value.brief_content.replace(
          /<[^>]+>|&[^>]+;/g,
          ''
        )
      }
    } else if (queryPlantype.value == 7) {
      getLevHyList()
      form.value.pubpro_type = form.value.pubpro_type * 1
      if (form.value.pubpro_content) {
        form.value.pubpro_content = form.value.pubpro_content.replace(
          /<[^>]+>|&[^>]+;/g,
          ''
        )
      }
    } 
    formEl.value.resetFields();
  // debugger
    console.log(form.value);

  }else{
    ElMessage.error('获取详情数据失败，请稍后再试')

  }
  
}
onMounted(() => {
    if (router.currentRoute.value.query.pageName == 'pcfa') {
      pageName.value = '普查方案'
    } else if (router.currentRoute.value.query.pageName == 'jsgf') {
      pageName.value = '技术规范'
    } else if (router.currentRoute.value.query.pageName == 'wjtz') {
      pageName.value = '通知文件'
    } else if (router.currentRoute.value.query.pageName == 'gzjb') {
      pageName.value = '工作简报'
    } else if (router.currentRoute.value.query.pageName == 'xccp') {
      pageName.value = '宣传产品'
    }
    queryUuid.value = router.currentRoute.value.query.uuid
    queryPlantype.value = router.currentRoute.value.query.plantype
    // debugger
    getOneData()
})
</script>

<style lang="scss" scoped>
.elimg{
  width: calc(100% - 26px);
  margin: 13px;
}

.zlxz {
  height:calc(100% - 80px);
  position: absolute;
  bottom: 0;
  right: 0;
  top: 80px;
  background: var(--main-bg-color);
  width: 100%;
}
.back-btn {
  position: absolute;
  right: 0;
  top: -4px;
  padding: 4px 10px;
}
.zlxz-con {
  width: 100%;
  height: calc(100% - 26px);
  margin-top: 12px;
  background: #fff;
  padding: 1rem;
}
.xq-con {
  width: 100%;
  height: calc(100% - 10px);
  margin-top: 10px;
  background: #fafafa;
  overflow-y: overlay;
}
@media only screen and (max-width: 1366px) {
  .zlxz {
    top: 60px;
    height:calc(100% - 60px);
  }
}
.file-list {
  // width: 70%;
  overflow: hidden;
  .file-list-item:hover {
    background-color: #e5f7ff;
    cursor: pointer;
    border-radius: 4px;
  }
  .file-list-item {
    width: 100%;
    // height: 30px;
    // padding: 2px 4px;
    color: #5f5f5f;
    display: flex;
    justify-content: space-between;
    align-items: center;
    >span:first-child{
      max-width: 70%;
    }
    .name{    
      width: 80%;
      display: inline-block;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      vertical-align: middle;
    }
    .el-icon {
      color: #5f5f5f;
      font-size: 18px;
      vertical-align: middle;
      margin: 0 4px;
    }
  }
}
.formItem {
  width: 100%;
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
.remarks {
  margin: 0;
  padding: 0;
  line-height: 32px;
  overflow: hidden;
  word-wrap: break-word;
  text-overflow: ellipsis;
}
 .el-form {
  width: 100%;
}
</style>
