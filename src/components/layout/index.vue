<!--
 * @Author: zhuangyating 2114380985@qq.com
 * @Date: 2024-05-17 10:46:39
 * @LastEditors: zhuangyating 2114380985@qq.com
 * @LastEditTime: 2024-05-22 15:26:30
 * @FilePath: \cth-ddgl-web\src\components\layout\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="layoutStyle">
    <header>
      <div class="header-left">
        <div class="logo-wrapper">
          <img src="~@/assets/images/header/yhbzLogo.png" />
          <!-- <img v-else src="~@/assets/images/header/ctgzLogo.png" /> -->
        </div>
      </div>
      <div class="header-center">
        <div class="nav-wrapper">
          <el-button
            v-for="(v, i) in navList"
            :key="`navItem${i}`"
            :class="[useNav.activeName == v.router ? 'acted' : '', 'navItem']"
            @click="changeZT(v)"
          >
            <!-- <i class="iconfont fa navIcon" v-html="v.icon"></i> -->
            <svg-icon :icon-class="v.icon" icon-home></svg-icon>
            {{ v.name }}
          </el-button>
        </div>
      </div>
      <div class="header-right">
        <div class="toMenu">
            <div @click="jumpMneu" style="margin-right: 4px">
              <svg-icon :icon-class="'home'" icon-home></svg-icon>
              <span>主页</span>
            </div>
            <div @click="jumpUserHelp">
              <svg-icon :icon-class="'help'" icon-home></svg-icon>
               <!-- <i class="iconfont fa navIcon" v-html="'&#xe769;'"></i> -->
               <span>帮助</span>
            </div>
        </div>
        <div class="user-wrapper">
          <img
            src="@/assets/icons/svg/avatar.svg"
            class="img-in-text"
            alt=""
          />
          <a-dropdown
            class="user-dropdown"
            placement="bottomRight"
            :trigger="['click']"
          >
            <div class="user">
              <span class="user-name">{{ user.userInfo?.user?.dep_name }}</span>
              <caret-down-filled class="img-in-text" />
            </div>
            <template #overlay>
              <a-menu class="user-menu">
                <a-menu-item>
                  <div class="m-user-menu-nav" @click="logoutOut">
                    <span class="info">退出账号</span>
                  </div>
                </a-menu-item>
                <a-menu-item>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
    </header>
  </div>
</template>

<script lang="ts" setup>
// import { cnName } from '../../../package.json'
import { reactive, ref, nextTick, watch, onMounted, computed } from 'vue'
// import router from '@/router'
import { clearStorage } from '@/utils/status-code'
import { getNavList } from './nav'
import { useNavStore,userStore } from '@/store'
import { env } from '@/utils/base-url'
import { useRouter, useRoute } from 'vue-router'
const systemType = window.systemType
const router = useRouter()
const route = useRoute()
const useNav = useNavStore()
const user = userStore()
const navList =  getNavList()
//退出登录
const logoutOut = () => {
  clearStorage()
}
const changeZT = (item: any) => {
  console.log(item,useNav.activeName)
  useNav.changeActiveName(item.router)
  router.push({name:item.router})
}
const jumpMneu = () => {
  window.location.href = baseUrl[ENV]['login'] + 
  `/pcxt/#/homePage?enter=pc&hyxx=1&isUser=1&typename=cj&token=${sessionStorage.getItem('zj_access_token')}`
}
const jumpUserHelp = () => {
  //http://ddglyh.geo-compass.com/help/index.html#/UserHelp?token=
  let url = window.location.origin + '/help/index.html#/UserHelp?token=' + user.userInfo?.token
  window.open(url,'_blank')
}

// 监听
watch(
  () => route.name,
  () => {
    useNav.changeActiveName(route.name)
  },
  {
    deep: true,immediate: true
  }
)
</script>

<style lang="scss" scoped>
.layoutStyle {
  width: 100%;
  header {
    width: calc(100% - 2rem);
    padding: 0 1rem;
    height: 80px;
    border-bottom: 1px solid var(--theme-color-transparency);
    background-size: cover;
    background-repeat: no-repeat;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-left {
      height: 100%;
      display: flex;
      align-items: center;
      .logo-wrapper {
        height: 52px;
        cursor: pointer;
        display: flex;
        align-items: center;
        font-size: 20px;
        font-family: Microsoft YaHei UI-Regular, Microsoft YaHei UI;
        font-weight: 400;
        color: #666666;
        line-height: 16px;
        img {
          height: 100%;
          margin-right: 16px;
          user-select: none;
        }
      }
    }
    .header-center {
      flex: 1;
      display: flex;
      justify-content: center;
      .nav-wrapper {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        .navItem {
          border: unset;
          font-size: 18px;
          height: 40px;
          width: 140px;
          // margin:0 5px;
          // padding: 0 8px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          cursor: pointer;
          color: var(--theme-color);
          background-color: transparent;
        }
        .navIcon{
          vertical-align: middle;
          margin-right: 5px;
        }
        .acted{
          background-image: url('@/assets/images/header/navCheckedOn.png') ;
          background-size: 100% 100% ;
          background-repeat: no-repeat ;
          color: #fff ;
          .navIcon{
            color: #fff ;
          }
        
        }
      }
    }
    .header-right {
      // width: 30%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .toMenu{
        height: 40px;
        display: flex;
        align-items: center;
        color: var(--theme-color);
        cursor: pointer;
        margin: 0 1rem;
        padding: 0 1rem;
        font-size: 14px;
        position: relative;
        // img,i{
        //  width: 20px;
        //  vertical-align: middle;
        //  margin-right: 4px;
        //  color: var(--theme-color);
        // }
        span{
          vertical-align: middle;
        }
        &::before,
        &::after{
          content: '';
          width: 1px;
          height: 100%;
          background-color: var(--theme-color-transparency);
          position: absolute;
         }
        &::before{
          left: 0;
          }
         &::after{
          right: 0;
         }
      }
      .user-wrapper {
        // width: 128px;
        min-width: 100px;
        height: 20px;
        cursor: pointer;
        text-align: right;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 2rem;
          height: 2rem;
          margin-right: 5px;
        }

        .user {
          font-size: 14px;
          line-height: 20px;
          font-weight: 400;
          color: var(--theme-color);
          display: flex;
          align-items: center;
          .user-name {
            display: inline-block;
            max-width: 300px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .user-menu {
          .m-user-menu-nav {
            .info {
              display: inline-block !important;
            }
          }
        }
      }
      .application-center {
        width: 164px;
      }
    }
  }
  @media only screen and (max-width: 1366px){
    header {
      height: 60px;
    }
  }
}
</style>
