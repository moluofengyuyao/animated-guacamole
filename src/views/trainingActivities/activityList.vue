<template>
  <!-- 培训活动列表 -->
  <div class="list_main">
    <div class="list_content">
      <div class="bg-img">
        {{listInfos.train_name}}
      </div>
      <!-- 培训概述 -->
      <div class="list_content_top">
        <div class="list_title">
          <label class="label_bg"></label>
          <span class="dt_span_title">培训概述</span>
        </div>
        <div class="list_top_text">
          <dl>
            <dd>
              <el-row :gutter="20">
                <el-col :span="10"
                  ><span class="span_title">培训主题：</span
                  >{{ listInfos.train_name }}</el-col
                >
                <!-- <el-col :span="8"
                v-if="listInfos.train_start"
                  ><span class="span_title">课程上线时间：</span
                  >{{ listInfos.train_start.substring(0,11) }}</el-col
                > -->
                <el-col :span="6"
                  ><span class="span_title">活动类型：</span
                  >{{ listInfos.train_form === 1
                        ? '技术规范解读'
                        : listInfos.train_form === 2
                        ? '线下培训'
                        : listInfos.train_form === 3
                        ? '专题培训'
                        : listInfos.train_form === 4
                        ? '软件系统操作'
                        : listInfos.train_form === 5
                        ? '直播答疑'
                        : listInfos.train_form === 6
                        ? '地方培训': '暂无' }}</el-col
                >
                <!-- <el-col :span="12"><span class="span_title">培训时间：</span>{{listInfo.date}}</el-col> -->
              </el-row>
            </dd>
            <dd>
              <el-row :gutter="20">
                <el-col :span="10"
                  ><span class="span_title">组织单位：</span
                  >{{ listInfos.organize_unit }}</el-col
                >
                <el-col :span="12"
                  ><span class="span_title">培训对象：</span
                  >{{ listInfos.train_to }}</el-col
                >

                <!-- <el-col :span="6"><span class="span_title">开始时间：</span>{{listInfo.kssj}}</el-col> -->
              </el-row>
            </dd>
            <dd>
              <el-row :gutter="20">
                <el-col :span="10"
                  ><span class="span_title">课程数量：</span
                  >{{ listInfos.course_count || 0 }}讲</el-col
                >
                 <el-col :span="7"
                  ><span class="span_title">在线课程数量：</span
                  >{{ listInfos.oncount || 0}}讲</el-col
                >
                 <el-col :span="7"
                  ><span class="span_title">下线课程数量：</span
                  >{{ listInfos.offcount || 0 }}讲</el-col
                >
                <!-- <el-col :span="6"><span class="span_title">培训人数：</span>{{listInfo.pxrs}}</el-col> -->

                <!-- <el-col :span="6"><span class="span_title">结束时间：</span>{{listInfo.jssj}}</el-col> -->
              </el-row>
            </dd>
            <dd>
               <el-row :gutter="20">
               <el-col :span="6"
                  ><span class="span_title">课程长度：</span
                  >{{ Math.floor(listInfos.train_long / 60)}}小时{{listInfos.train_long % 60}}分钟</el-col
                >
              </el-row>
            </dd>
            <dd>
              <p class="describe_text" v-html="listInfos.train_content"></p>
            </dd>
            <dd >
              <el-row>
                <el-col class="elcol" :span="24">
                  <span class="span_title">附件：</span>
                    <div v-if="fileList && fileList.length > 0" >
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
                            <span style="color: #c0c4cc">
                              下载次数&nbsp;{{ v.dow_count }}</span
                            >
                            <el-icon 
                              v-if="$isViewer"
                              title="下载"
                              @click="clickDownload(v.uuid, v.ext, v.filename)">
                              <UploadFilled />
                            </el-icon>
                          </span>
                        </div>
                    </div>
                    <div v-else style="color: #c0c4cc">还未上传文件</div>
                </el-col>
              </el-row>
            </dd>
          </dl>
        </div>
      </div>

      <!-- 课程列表 -->
      <div v-if="kcLists.length" class="list_content_mian">
        <div class="list_content_title">
          <label class="label_bg"></label>
          <span class="dt_span_title">课程列表</span>
        </div>
        <ul class="tab_ul" v-if="Object.keys(course_type_info).length">
          <li
            :class="key == index ? 'active' : ''"
            v-for="(item,key) in course_type_info"
            :key="key"
            @click="getCourse(key)"
          >
            {{ item }}
          </li>
        </ul>
        <dl class="list_dl">
          <dd v-for="item in kcLists" :key="item.uuid">
            <div class="dd_left" :class="item.is_online==1 ? 'kc_online':'kc_offline'" @click="checkPlay(item.uuid)">
                <span :title="item.course_title" v-if="item.is_online==1">{{item.course_title }}</span>
                <!-- <span v-else style="color:#ccc">该课程已下线</span> -->
              </div>
            <div class="dd_right">
              <h3 @click="checkPlay(item.uuid)">{{ item.course_title }}</h3>
              <p>
                <el-row :gutter="20">
                  <el-col :span="11"
                    ><span class="span_title">主讲人：</span
                    >{{ item.course_speaker }}  {{ !item.speaker_util || item.speaker_util=='-'?'':item.speaker_util }}  {{ !item.speaker_post ||item.speaker_post=='-'?'':item.speaker_post }}</el-col
                  >
                  <!-- <el-col :span="8"><span class="span_title">职务/职称：</span>{{item.zwzc}}</el-col> -->
                  <el-col :span="4"
                    ><span class="span_title">课程长度：</span
                    >{{ item.course_long }}分钟</el-col
                  >
                  <el-col :span="5"
                    ><span class="span_title">课程上线时间：</span
                    >{{ item.on_at.substring(0,11) }}</el-col
                  >
                  <el-col :span="4"
                    ><span class="span_title">学习次数：</span
                    >{{ item.study_count }}次</el-col
                  >
                </el-row>
              </p>
            </div>
          </dd>
        </dl>
        <div class="list_content_title">
          <label class="label_bg"></label>
          <span class="dt_span_title">培训资料</span>
        </div>
        <el-row style="margin-top:10px">
                <el-col class="elcol" :span="24">
                  <span class="span_title">培训资料：</span>
                    <div v-if="fileListPx && fileListPx.length > 0" >
                        <div
                          v-for="(v, ind) in fileListPx"
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
                            <span style="color: #c0c4cc">
                              下载次数&nbsp;{{ v.dow_count }}</span
                            >
                            <el-icon 
                              v-if="$isViewer"
                              title="下载"
                              @click="clickDownload(v.uuid, v.ext, v.filename)">
                              <UploadFilled />
                            </el-icon>
                          </span>
                        </div>
                    </div>
                    <div v-else style="color: #c0c4cc">还未上传资料</div>
                </el-col>
              </el-row>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { View ,UploadFilled ,Paperclip } from '@element-plus/icons-vue' // 引入 Edit 这个 svg组件
import zxkc from './zxkc'
// import { mime } from '@/utils/mime'
import { reactive, ref, nextTick, watch, onMounted } from 'vue'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { getCourseList,courseTyCountByTrainId,getOnOffCourse,detailOverPlan,getWithFile} from '@/api'
const fileList = ref([])
const fileListPx = ref([])
const kcList = ref([])
const kcLists = ref([])
const keyword = ref(null)
const listInfo = ref(zxkc.homeList[0])
const listInfos = ref<any>({})
const course_type_info = ref<any>({})
const index = ref<any>(1)
const queryUuid = ref<any>(router.currentRoute.value.query.uuid) 

watch(() => keyword,
  (newVal, oldVal) => {
      kcList.value = keyword.value
        ? listInfo.value.kcList.filter((item: { name: null[] }) => item.name.includes(keyword.value))
        : listInfo.value.kcList
  }
)

    const  checkPlay = (uuid: any)=> {
      if (uuid) {
        const addUser = router.resolve({
          name: 'activityDetail',
          query: {
            uuid,
            train_form: listInfos.value.train_form,
            train_name: listInfos.value.train_name
          }
        })
        window.open(addUser.href, '_blank')
      } else {
        ElMessage.info('课程暂未上线，敬请关注…… ')
      }
    }
  const previewUrlRef = ref(`${baseUrl[ENV]['previewUrl']}`)
   const clickDownload =(fileuuid: any, ext: string, filename: any, path='')=> {
      //预览文件服务地址+文件相对路径
      let src = previewUrlRef.value
      if (ext === '.pdf') {
        // window.open(`./static/pdfJs/web/viewer.html?${baseUrl[ENV]['fileUrl']}${encodeURIComponent(path)}#toolbar=0`, '_blank')
        window.open(`./static/pdfJs/web/viewer.html?file=${encodeURIComponent(src + path)}#toolbar=0`, '_blank')
      } else {
        // window.open(baseUrl[ENV]['fileUrl'] + path + '#toolbar=0', '_blank')
        window.open(src + path + '#toolbar=0', '_blank')
      }
    }
    const getFiles = async()=> {
      const data = {
        planuuid: queryUuid.value,
        plantype: 5,
        usetype: 1
      }
      const datas = {
        planuuid: queryUuid.value,
        plantype: 5,
        usetype: 9
      }
      let res1:any = await getWithFile(data)
      let res2:any = await getWithFile(datas)
      if(res1){
        fileList.value = res1

      }
      if(res2){
        fileListPx.value = res2
      }
    }
    const getOne =async()=> {
      let res:any = await detailOverPlan(queryUuid.value, 5)
      if(res){
          listInfos.value = res
          getOnOffCourseList()
          if (res.course_type_info &&
            Object.prototype.toString.call(res.course_type_info) === '[object Object]' &&
            Object.keys(JSON.parse(res.course_type_info)).length > 0) {
            course_type_info.value = JSON.parse(res.course_type_info)
            getCourseCount()
          } else {
            getCourse('')
          }

      }
    }
    const getOnOffCourseList = async()=> {
      let res:any = await getOnOffCourse({publicId: queryUuid.value, plantype: 36})
      if(res){
        listInfos.value.oncount = res[0].oncount
        listInfos.value.offcount = res[0].offcount
        }
    }
    const getCourseCount =async()=> {
      console.log(queryUuid.value);
      
      debugger
      let res:any = await courseTyCountByTrainId(queryUuid.value, 36)
      if(res){
          let arr = res

          arr.forEach((val: { course_type: string | number; count: any }) => {
            if (val.course_type) {
              course_type_info.value[val.course_type] = `${course_type_info.value[val.course_type]}（${val.count}）`
            }
          })
          for (const key in course_type_info.value) {
            if (!/（\d+）/.test(course_type_info.value[key])) {
              delete course_type_info.value[key]
            }
          }
          getCourse(arr[0].course_type)

      }
    }
    const getCourse =async(key: string | number)=> {
      index.value = key
      let data = {
          publicId: queryUuid.value,
          course_type: key || '', 
          orderByJson: JSON.stringify(
          [
            {'orderBy': 'is_online', 'orderAsc': 'asc'}, 
            {'orderBy': 'on_at', 'orderAsc': 'desc'}, {'orderBy': 'off_at', 'orderAsc': 'desc'}
          ]
        )
      }
      let res:any = await getCourseList(data)
      if(res){
        kcLists.value = res
      }
    }
    onMounted(() => {
      getOne()

      getFiles()
    })
</script>
<style lang="scss" scoped>
.bg-img{
  width: 100%;
  height: 220px;
  margin: auto;
  background-image: url('@/assets/images/trainingActivities/pcbg.png');
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 12px;
}
.list_content_top{
  margin-top: 12px;
}
.elcol:nth-last-of-type(1),
    .elcol:nth-last-of-type(2) {
      display: flex;
      align-items: center;
    }
.elcol:nth-last-of-type(1){
  align-items: inherit;
}

// .file-list {
//   width: 70%;
//   overflow: hidden;
  .file-list-item:hover {
    background-color: #e5f7ff;
    cursor: pointer;
    border-radius: 4px;
  }
  .file-list-item {
    width: 100%;
    height: 30px;
    padding: 2px 4px;
    color: #5f5f5f;
    display: flex;
    justify-content: space-between;
    align-items: center;
    >span:first-child{
      max-width: 70%;
    }
    .name{    
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
// }
.list_main {
  background: #f5f5f5;
  height: calc(100vh - 80px);
  width: 100%;
  overflow: auto;
}
.list_content {
  width: 1200px;
  margin: 10px auto;
  padding: 24px 40px;
  // min-height: 100%;
  background: #fff;
}
.dt_span_title {
  font-size: 18px;
  color: var(--theme-color);
  vertical-align: middle;
}
.label_bg {
  display: inline-block;
  width: 4px;
  height: 23px;
  margin-right: 8px;
  background: var(--theme-color);
  vertical-align: middle;
}
.span_title {
  color: var(--theme-color);
}
.list_top_text dl,
.list_top_text dd {
  margin: 0;
}
.list_top_text dd {
  margin-bottom: 10px;
  font-size: 16px;
}
.describe_text {
  text-indent: 2em;
  line-height: 25px;
}
.list_top_text {
  background: #f4f4f4;
  padding: 28px;
  margin-top: 10px;
  border-radius: 4px;
}
.tab_ul {
  overflow: hidden;
  clear: both;
  margin: 12px 0 0 0;
  padding: 0;
}
.tab_ul li {
  float: left;
  padding: 8px 2px 8px 10px;
  margin: 0 10px 10px 0;
  color: #494949;
  background: #e5e5e5;
  border-radius: 4px;
  cursor: pointer;
}
.tab_ul li.active {
  color: #fff;
  background: var(--theme-color);
}
ul li {
  list-style-type: none;
}
.list_content_title {
  margin-top: 18px;
}
.list_dl {
  margin: 0;
}
.list_dl dd {
  overflow: hidden;
  margin: 0;
  padding: 24px 0;
  border-bottom: 1px solid #e6e6e6;
}
.list_dl dd img {
  float: left;
  display: block;
  width: 150px;
  height: 85px;
  // background: url("../../../assets/images/home/kc_bg.png");
}
.list_dl dd .dd_left {
  float: left;

  width: 150px;
  height: 85px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
}
.kc_online{
  background-color:var(--theme-color);
//  background: url("@/assets/images/home/kc_bg.png");
}
.kc_offline{
 background: url("@/assets/images/home/kc_offline.png");
 background-size: cover;
}
.list_dl dd .dd_left span {
  font-weight: bold;
  padding: 6px 26px 0;
  color: #fff;
  font-size: 16px;
  text-shadow: 3px 3px 2px var(--theme-color);
  display:-webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  word-break: break-all;
  overflow: hidden;
}
.dd_right {
  margin-left: 165px;
}
.dd_right h3 {
  display: inline-block;
  margin-bottom: 0;
  color: var(--theme-color);
  font-weight: bold;
  margin: 10px 0;
  cursor: pointer;
}
.list_content_mian {
  padding-bottom: 60px;
}
</style>
