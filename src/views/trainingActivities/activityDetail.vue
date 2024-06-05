<template>
  <!-- 活动播放详情 -->
  <div class="play_main">
    <div style="background: rgb(51, 51, 51);" >
      <div class="play">
        <div class="video-offline" v-if="!videoPlay">

        </div>
        <video-player
          v-if="videoPlay"
          class="video-player vjs-custom-skin play"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
        >
        </video-player>
      </div>
    </div>

    <div style="width:100%;background:#f5f5f5;height: calc(100% - 520px);">
      <el-tabs v-model="activeName" style="width:900px;margin:0 auto;">
        <el-tab-pane label="课程介绍" name="first" style="padding:20px" >
          <div class="downVideo" @click="download(fileuuid, ext, courseData.course_title)"
              v-if="(login_name == 'gpbadmin'  || login_name == '综合组负责人') && $isViewer ">下载视频</div>
          <div class="m-info_item">
            <span class="m-info_label">课程类型：</span>
            {{ $route.query.train_form === "1"
                        ? '技术规范解读'
                        :$route.query.train_form === "2"
                        ? '线下培训'
                        :$route.query.train_form === "3"
                        ? '专题培训'
                        :$route.query.train_form === "4"
                        ? '软件系统操作'
                        : $route.query.train_form === "5"
                        ? '直播答疑'
                        : $route.query.train_form === "6"
                        ? '地方培训': '暂无' }}
          </div>
          <div class="m-info_item">
            <span class="m-info_label">培训主题：</span>
            {{$route.query.train_name}}
          </div>
          <div class="m-info_item">
            <span class="m-info_label">课程名称：</span>
            {{courseData.course_title}}
          </div>
          <div class="m-info_item">
            <span class="m-info_label">主讲人：</span>
            {{ courseData.course_speaker }}  {{ !courseData.speaker_util || courseData.speaker_util=='-'?'':courseData.speaker_util }}  {{ !courseData.speaker_post ||courseData.speaker_post=='-'?'':courseData.speaker_post }}
          </div>
          <div class="m-info_item " v-if="filepptList.length">
            <span class="m-info_label wenzi">PPT课件：</span>
             <div v-if="$isViewer" class="wenzi-cl" style="display:inline-block">
              <a v-for="item in filepptList" :key="item.uuid" @click="clickDownload(item)" class="download_a">{{item.filename}}</a>
             </div>
             <div v-else class="wenzi-cl" style="display:inline-block">
              <span v-for="item in filepptList" :key="item.uuid" class="download_a">{{item.filename}}</span>
             </div>
          </div>

          <div class="m-info_item" v-if="filetextList.length">
            <span class="m-info_label wenzi">文字材料：</span>
            <div v-if="$isViewer" class="wenzi-cl" style="display:inline-block">
              <a v-for="item in filetextList" :key="item.uuid" @click="clickDownload(item)" class="download_a">{{item.filename}}</a>
            </div>
            <div v-else class="wenzi-cl" style="display:inline-block">
              <span v-for="item in filetextList" :key="item.uuid" class="download_a">{{item.filename}}</span>
            </div>
          </div>
        </el-tab-pane>

      </el-tabs>

    </div>
  </div>
</template>

<script setup lang='ts'>
import dayjs from 'dayjs'
import { View ,UploadFilled ,Paperclip,Delete } from '@element-plus/icons-vue' // 引入 Edit 这个 svg组件
import { reactive, ref, nextTick, watch, onMounted, computed } from 'vue'
import router from '@/router'
import { loadStore,userStore } from '@/store'
import { ElMessage } from 'element-plus'
import { mime } from '@/utils/mime.js'
import { getWithFile ,detailOverPlan ,downloadFile } from '@/api'
// 视频插件
import { VideoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
// import "vue-video-player/node_modules/video.js/dist/video-js.css";


const useLoad = loadStore()
const user = userStore()
const UserInfo = user.userInfo
const login_name = ref(UserInfo.user.log_name)
const videoPlay = ref(true) // 视频是否播放- 下线不显示
const activeName = ref('first')
const filepptList = ref([])// ppt附件
const filetextList = ref([])// text附件
const courseData = ref({})
const videoPlayer = ref()
const ext = ref()
const fileuuid = ref()

const  playerOptions = ref({
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选择的播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: '',
            src: '' // url地址
          }
        ],
        poster: '', // 你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: ' ', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true, // 全屏按钮
          volumeControl: true
        },
    })
    
  const player = computed(()=>{
    return videoPlayer.value.player
  })
  
  
    // 获取附件信息
  const  getWithFileList = async()=> {
      let params3 = {
        planuuid: router.currentRoute.value.query.uuid,
        plantype: '36',
        usetype: '9'
      }
      let res:any = await getWithFile(params3)
      if (res) {
          if (!res.length) {
            playerOptions.value.notSupportedMessage = '该课程暂无视频！'
            return
          }
          ext.value = res[0].ext
          fileuuid.value = res[0].uuid
          console.log(res)
          let vedio = {
            '.mp4': 'video/mp4',
            '.webm': 'video/webm',
            '.ogg': 'video/ogg',
            '.3gp': 'video/3gpp'
          }
          res[0] && (playerOptions.value.sources[0].src = CONFIG.ServiceFile.replace('/fileserver/api/v1', '/study/fileserver/') + res[0].path)
          res[0] && (playerOptions.value.sources[0].type = vedio[res[0].ext])
      }
    }
   const getWithFiles = async () =>{
      let params = {
        planuuid: router.currentRoute.value.query.uuid,
        plantype: '36',
        usetype: '5'
      }
      let res1:any = await getWithFile(params)
      if(res1){
        filepptList.value = res1
      }

      let params2 = {
        planuuid: router.currentRoute.value.query.uuid,
        plantype: '36',
        usetype: '6'
      }
      let res2:any = await getWithFile(params2)
      if(res2){
          if (Array.isArray(res2)) {
            filetextList.value = res2.sort((a, b) => {
              return dayjs(b.up_at).valueOf() - dayjs(a.up_at).valueOf()
            })
          }

      }
    }
   const getOne = async()=> {
      let res:any = await detailOverPlan(router.currentRoute.value.query.uuid, 36)
      if(res){
          getWithFiles()
          courseData.value = res

          if (res.is_online === 1 || login_name.value === '综合组负责人') {
            getWithFileList()
          } else {
            videoPlay.value = false
            ElMessage.warning('该课程已下线！')
          }

      }
    }
  const previewUrlRef = ref(`${baseUrl[ENV]['previewUrl']}`)
    // 下载
   const clickDownload = async(info: { ext?: any; path?: any }) =>{
      let { path} = info
      //预览文件服务地址+文件相对路径
      let src = previewUrlRef.value
      if (info.ext === '.pdf') {
        // window.open(`./static/pdfJs/web/viewer.html?file=https://fxpc.mem.gov.cn/fileserver/${encodeURIComponent(path)}#toolbar=0`, '_blank')
        window.open(`./static/pdfJs/web/viewer.html?file=${encodeURIComponent(src + path)}#toolbar=0`, '_blank')
      } else {
        // window.open('https://fxpc.mem.gov.cn/fileserver/' + path + '#toolbar=0', '_blank')
        window.open(src + path + '#toolbar=0', '_blank')
      }
    }
   const download = async(fileuuid: any, ext: string, filename: string) =>{
      let fileext = ext.toLowerCase()
      if (mime[fileext]) {
        useLoad.spinState = true
        let res:any = await downloadFile(fileuuid, 6)
        if(res){
          let blob = new Blob([res], { type: mime[fileext] }) // type为所需要下载的文件格式，以xls文件为例
          let link = document.createElement('a') // 创建a标签
          link.style.display = 'none'
          let objectUrl = URL.createObjectURL(blob)
          link.href = objectUrl
          link.setAttribute('download', filename)
          link.click()
          URL.revokeObjectURL(objectUrl)

        }
        useLoad.spinState = false
      }
    }
    onMounted(()=>{
      getOne()
    })
</script>
<style lang="scss" scoped>
.play_main {
  height: calc(100vh - 80px);
  overflow: auto;
}
@media only screen and (max-width: 1366px) {
  .play_main {
    height: calc(100vh - 60px);
  }
}
.play_main .play {
  width: 900px;
  height: 520px;
  margin: 0 auto;
  .video-js .vjs-tech {
    top: 6px!important;
  }
}
.video-offline{
  height: 100%;
  width: 100%;
  background: url('../../assets/images/home/kc_video_offline.jpg');
}
.download_a {
  display: block;
  cursor: pointer;
  color: var(--theme-color);
}
.m-info_item {
  // height: 30px;
  overflow: hidden;
  line-height: 30px;
  font-size: 14px;
  .wenzi{
    float: left;
  }
  .wenzi-cl{
    float: left;
  }
  .m-info_label {
    display: inline-block;
    width: 70px;
    text-align: right;
    color: var(--theme-color);
    font-weight: bold;
  }
}

.downVideo{
  position: absolute;
  top: -55px;
  right: 10px;
  color: var(--theme-color);
  font-weight: 600;
  font-size: 16px;
  z-index: 99;
  cursor:pointer
}

</style>
