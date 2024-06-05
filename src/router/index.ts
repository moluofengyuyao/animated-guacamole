/*
 * @Author: zhuangyating 2114380985@qq.com
 * @Date: 2024-05-13 09:15:51
 * @LastEditors: zhuangyating 2114380985@qq.com
 * @LastEditTime: 2024-05-22 10:37:05
 * @FilePath: \cth-ddgl-web\src\router\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import hooks from './hook'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/index/index.vue'),
    redirect: { name: 'docsdownload' },
    children: [
     
      {
        path: 'docsdownload',
        component: () => import('@/views/docsdownload/index.vue'), //资料下载
        name: 'docsdownload'
      },
      {
        path: 'docsdetail',
        component: () => import('@/views/docsdownload/detail.vue'), //资料下载
        name: 'docsdetail'
      },
      {
        path: 'onLineAnswer',
        component: () => import('@/views/onLineAnswer/index.vue'),//线上答疑
        name: 'onLineAnswer'
      },
      {
        path: 'trainingActivities',
        component: () => import('@/views/trainingActivities/index.vue'), //课程培训
        name: 'trainingActivities'
      },
      {
        path: 'activityClass',
        component: () => import('@/views/trainingActivities/activityClass.vue'), //课程培训的
        name: 'activityClass'
      },
      {
        path: 'activityList',
        component: () => import('@/views/trainingActivities/activityList.vue'), //课程培训的
        name: 'activityList'
      },
      {
        path: 'activityDetail',
        component: () => import('@/views/trainingActivities/activityDetail.vue'), //课程培训的
        name: 'activityDetail'
      },
    ]
  },
  {
    path: '/WorkDynamics',
    component: () => import('@/views/index/work-dynamics/index.vue'),
    redirect: { name: 'WorkDynamicsList' },
    children: [
      // 工作动态
      {
        path: 'WorkDynamicsList',
        name: 'WorkDynamicsList',
        component: () => import('@/views/work-dynamics/index.vue')
      },
      // 通知文件
      {
        path: 'NoticeFileAdd',
        name: 'NoticeFileAdd',
        component: () => import('@/views/work-dynamics/notice-file/notice-file-add.vue')
      },
      {
        path: 'NoticeFileDetail',
        name: 'NoticeFileDetail',
        component: () => import('@/views/work-dynamics/notice-file/notice-file-detail.vue')
      },
      // 培训计划
      {
        path: 'TrainingPlanAdd',
        name: 'TrainingPlanAdd',
        component: () => import('@/views/work-dynamics/training-plan/training-plan-add.vue')
      },
      {
        path: 'TrainingPlanDetail',
        name: 'TrainingPlanDetail',
        component: () => import('@/views/work-dynamics/training-plan/training-plan-detail.vue')
      },  
      // 直播答疑
      {
        path: 'QuestionAnswerAdd',
        name: 'QuestionAnswerAdd',
        component: () => import('@/views/work-dynamics/question-answer/question-answer-add.vue')
      },{
        path: 'QuestionAnswerDetail',
        name: 'QuestionAnswerDetail',
        component: () => import('@/views/work-dynamics/question-answer/question-answer-detail.vue')
      },
      // 技术规范
      {
        path: 'TechnologyStandardAdd',
        name: 'TechnologyStandardAdd',
        component: () => import('@/views/work-dynamics/technology-standard/technology-standard-add.vue')
      },
      {
        path: 'TechnologyStandardDetail',
        name: 'TechnologyStandardDetail',
        component: () => import('@/views/work-dynamics/technology-standard/technology-standard-detail.vue')
      },
      {
        path: 'WorkReport',
        name: 'WorkReport',
        component: () => import('@/views/WorkReport/index.vue')
      },
      {
        path: 'WorkReportAdd',
        name: 'WorkReportAdd',
        component: () => import('@/views/WorkReport/add.vue')
      },
      {
        path: 'WorkReportEdit',
        name: 'WorkReportEdit',
        component: () => import('@/views/WorkReport/edit.vue')
      },
      {
        path: 'WorkReportTj',
        name: 'WorkReportTj',
        component: () => import('@/views/WorkReport/tj.vue')
      },
    ]
  },
  {
    path: '/',
    name: '/',
    redirect:'/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

Object.keys(hooks).forEach((hook) => {
  router.beforeEach(hooks[hook])
})
router.afterEach((to, from, next) => {})

export default router
