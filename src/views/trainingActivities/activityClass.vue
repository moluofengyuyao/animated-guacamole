<template>
  <div class="activity-class">
    <div class="activity-class-con">
      <!-- <ul>
        <li title="重点解读国务院普查办印发的调查、评估与区划等技术规范文件" @click="jumpList(1,'技术规范解读')"><span>技术规范解读</span></li>
        <li title="记录国务院普查办主办的线下培训课程及资料" @click="jumpList(2,'线下培训')"><span style="margin-top: 80px;">线下培训</span></li>
        <li title="记录国务院普查办主办的线上培训课程及资料" @click="jumpList(3,'专题培训')"><span style="margin-top: 50px;">专题培训</span></li>
        <li title="讲解普查软件系统操作方法及流程" @click="jumpList(4,'软件系统操作')"><span>软件系统操作</span></li>
        <li title="每周四直播答疑普查实施中的重难点问题" @click="jumpList(5,'直播答疑')"><span style="margin-top: 50px;">直播答疑</span></li>
         <li  @click="jumpList(7,'行业培训')"><span style="margin-top: 50px;">行业培训</span></li>
        <li  title="记录地方普查办及行业部门主办的培训课程及资料" @click="jumpList(6,'地方培训')"><span style="margin-top: 60px;">地方培训</span></li>
      </ul> -->
      <div class="activeTitle">
          <span>培训活动</span>
      </div>
      <div class="activity-class-list">
        <div v-for="(e,i) in activeList" :key="e.type" 
          class="activity-class-item" 
          @click="jumpList(e.type, e.title)"
          :style="{backgroundImage:`url(${getAssetsFile(`trainingActivities/active_bg${(i+1)}.png`)})`}" 
        >
          <img :src="getAssetsFile(`trainingActivities/${e.title}.png`)" alt="">
          <div>
            {{ e.title }}
          </div>
        </div>
      
      </div>
      <div class="activeBottom"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { reactive, ref, nextTick, watch, onMounted } from 'vue'
  import router from '@/router'
import getAssetsFile from '@/utils/pub-use'
  const activeList  = ref([
    { title: '软件系统操作', type: 4,  },
    { title: '专题培训', type: 3, },
    { title: '直播答疑', type: 5, },
    { title: '地方培训', type: 6, },

  ])
  const jumpList = (type: number, title: string) => {
    let listInfo
    if (type == 5) {
        listInfo = router.resolve({
          path: '/activityList',
          query: {
            uuid: '1f36866e-0a67-4708-9e2f-86ddceb648ad'
          }
        })
    }else{
        listInfo = router.resolve({
          path: '/trainingActivities',
          query: { train_form: type, title: encodeURI(title) }
        })
    }
        window.open(listInfo.href, '_blank')

}
</script>
<style lang="scss" scoped>
  .activity-class{
    background: var(--main-bg-color);
    width: 100%;
    height: calc(100% - 80px);
    display: flex;
    flex-direction: column;
    
    .activity-class-con{
      width: 1200px;
      height: calc(100% - 2rem);
      background-color: #fff;
      margin: 0 auto;
      margin-top: 12px;
      position: relative;
      .activeTitle{
        width: 100%;
        color: var(--theme-color);
        font-size: 28px;
        font-weight: 600;
        text-align: center;
        margin: 2rem 0 4rem 0;
        span{
          display: inline-block;
          padding: 1rem 0;
          border-bottom:  2px solid var(--theme-color);
        }
      }
      .activity-class-list{
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 1rem;
        .activity-class-item{
          width: 262px;
          height: 411px;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          font-size: 18px;
          font-weight: 600;
          color: #fff;
          img{
            margin-bottom: 20px;
          }
          &:hover{
            -webkit-transform: translateY(-8px);
            transform: translateY(-8px);
          }
        }
      }
      .activeBottom{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background-image: url('@/assets/images/trainingActivities/bottom_bg.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        height: 100px;
      // }
      }
    }
  }
  @media only screen and (max-width: 1366px) {
    .activity-class {
      height: calc(100% - 60px);
    }
  }

</style>>
