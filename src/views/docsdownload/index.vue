<template>
  <div class="zlxz">
    <el-row style="height: 100%">
      <div class="zlxz-con">
        <div class="con-top">
          <el-col
            :offset="4"
            :span="16"
            v-if="roleIsShow('培训学习', '资料下载', '资料检索', '关键字检索')"
          >
            <h1 class="zlxz-title">普查资料检索</h1>
          </el-col>
          <el-col
            style="margin-top: 34px"
            :offset="6"
            :span="12"
            v-if="roleIsShow('培训学习', '资料下载', '资料检索', '关键字检索')"
          >
            <el-input
              size="default"
              placeholder="请输入关键字快捷查询"
              suffix-icon="el-icon-search"
              v-model="keywords"
            ></el-input>
          </el-col>
          <el-col class="list-img" :offset="4" :span="16">
            <div v-for="(e, i) in nameObj" :key="e.value" class="list-img-con">
              <div  
                v-if="roleIsShow('培训学习', '资料下载', '资料检索', e.name)"
                class="selectImg"
              >
                <img
                  style="width: 100%"
                  :src="activeName == e.value? e.imgCheck: e.img"
                  :alt="e.name"
                  @click="selectList(e.value)"
                />
              </div>
            </div>
          </el-col>
        </div>
        <div class="zlxz-list">
          <div
            :class="{
              'height-jsgf': activeName == 'jsgf' && dep_type == '0',
            }"
            style="vertical-align: middle; overflow: hidden;margin-bottom: 8px;"
          >
            <!-- 区划树 -->
            <el-radio-group
              style="float: left"
              v-if="activeName != 'qjss'"
              class="m-date-btn"
              :class="{
                'm-date-btn-jsgf': activeName == 'jsgf' && dep_type == '0',
              }"
              v-model="selectCode"
              size="small"
            >
              <el-radio-button :value="0">国家</el-radio-button>
              <el-radio-button
                :value="1"
                @click="clickShowCodeSelect"
                >{{ selectName ? selectName : "省级" }}</el-radio-button
              >
              <el-radio-button
                v-if="
                  !['11', '12', '31', '50'].includes(xzcodestr) &&
                  !['11', '12', '31', '50'].includes(selectCodeS)
                "
                :value="2"
                @click="clickShowCodeSelects"
                >{{ selectNames ? selectNames : "市级" }}</el-radio-button
              >
              <el-radio-button
                :value="3"
                @click="clickShowCodeSelectx"
                >{{ selectNamex ? selectNamex : "县级" }}</el-radio-button
              >
            </el-radio-group>

            <div class="m-code-select" v-if="!closeCodeSelect">
              <div
                class="m-line"
                v-for="(item, index) in shengList"
                :key="index"
                @click="clickName(item),hide1"
              >
                {{ item.code_name }}
              </div>
            </div>
            <div
              class="m-code-selects"
              :class="{ len1: shengLists.length == 1 }"
              v-show="!closeCodeSelectSj"
            >
              <div
                class="m-line"
                v-for="(item, index) in shengLists"
                :key="index"
                @click ="clickNames(item,''),hide2"
              >
               {{ item.code_name }}
              </div>
            </div>
            <div
              class="m-code-selectx"
              :class="{
                'm-code-selects': !(
                  !['11', '12', '31', '50'].includes(xzcode) &&
                  !['11', '12', '31', '50'].includes(selectCodeS)
                ),
                len1: shengListx.length == 1,
              }"
              v-if="!closeCodeSelectXj"
            >
              <div
                class="m-line"
                v-for="(item, index) in shengListx"
                :key="index"
                @click="clickNamex(item,''),hide3"
              >
                {{ item.code_name }}
              </div>
            </div>
            <!-- <el-radio-group
              v-if="activeName == 'wjtz'"
              style="margin-left: 1rem; float: left"
              size="small"
              v-model="plantypeWj"
            >
              <el-radio-button value="12">文件</el-radio-button>
              <el-radio-button value="11">函件</el-radio-button>
            </el-radio-group> -->
            <el-radio-group
              style="margin-left: 1rem; float: left"
              v-if="activeName == 'wjtz'"
              size="small"
              v-model="year"
            >
              <el-radio-button :value="null">全部</el-radio-button>
              <el-radio-button value="2020">2020</el-radio-button>
              <el-radio-button value="2021">2021</el-radio-button>
              <el-radio-button value="2022">2022</el-radio-button>
            </el-radio-group>
            <el-radio-group
              v-if="activeName == 'gzjb'"
              size="small"
              style="margin-left: 1rem; float: left"
              v-model="brief_type"
            >
              <el-radio-button :value="null">全部</el-radio-button>
              <el-radio-button value="1">普查综合信息</el-radio-button>
              <el-radio-button value="2">月度工作进展</el-radio-button>
              <el-radio-button value="3">每周工作动态</el-radio-button>
            </el-radio-group>
            <el-radio-group
              style="margin-left: 1rem; float: left"
              v-if="activeName == 'gzjb'"
              size="small"
              v-model="yeargzjb"
            >
              <el-radio-button :value="null">全部</el-radio-button>
              <el-radio-button value="2020">2020</el-radio-button>
              <el-radio-button value="2021">2021</el-radio-button>
              <el-radio-button value="2022">2022</el-radio-button>
            </el-radio-group>

            <!-- 技术规范筛选行业 -->
            <el-radio-group
              v-model="seeLev"
              v-if="activeName == 'jsgf'"
              style="float: left"
              size="small"
            >
              <el-radio-button
                v-for="item in optionsOrg"
                :key="item.bmz"
                :value="item.bmz"
                >{{ item.bmmc }}</el-radio-button
              >
            </el-radio-group>
            <el-button
              v-if="$isViewer"
              style="float: right;"
              size="small"
              @click="batchDownload"
              type="primary"
              >批量下载</el-button
            >
          </div>
          <div
            class="zlxz-list-con"
            :class="{ 'zlxz-list-con-jsgf': activeName == 'jsgf' }"
          >
            <template v-if="listData && listData.length > 0">
              <div
                class="list-con"
                style="margin-top: 8px"
                v-for="v in listData"
                :key="v.uuid"
              >
                <div class="list-con-one">
                  <div>
                    <div class="circle"></div>
                    <span
                      class="content"
                      :title="
                        v.jg_name
                          ? `【${v.jg_name}】${v.name}${
                              v.fb_at && '/' + v.fb_at.substr(0, 10)
                            }`
                          : `${v.name}${v.fb_at && '/' + v.fb_at.substr(0, 10)}`
                      "
                      ><span v-if="v.jg_name">【{{ v.jg_name }}】</span>{{ v.name
                      }}{{ v.fb_at && "/" + v.fb_at.substr(0, 10) }}
                    </span>

                  </div>
                  <div style="margin-right: 10px">
                      <div
                        class="handle"
                        @click="toDetail(v.plantype, v.uuid)"
                        v-if="roleIsShow('培训学习', '资料下载', '查看详情', '查看详情')"
                      >
                        <svg-icon :icon-class="'详情'" icon-home style="width: 1rem;"></svg-icon>
                        <span class="text">详情</span>
                      </div>
                      <div
                        class="handle"
                        @click="downloads(v.uuid, v.plantype, 1, v.name, v.isdown)"
                        v-if="roleIsShow('培训学习', '资料下载', '下载附件', '下载附件') && $isViewer && ![`国家级评估成果1.0版（征求意见）`].find(name=>v.name.includes(name))"
                      >
                        <svg-icon :icon-class="'下载'" icon-home style="width: 1rem;"></svg-icon>
                        <span class="text">下载</span>
                      </div>
                      <div
                        class="handle"
                        style="margin-top: -3px; cursor: default"
                        v-if="
                          activeName == 'gzjb' &&
                          deplev == 1 &&
                          userid == 'a69380f4-4773-4665-9976-95124c1640dc'
                        "
                      >
                        <el-tag v-if="v.isdown" size="small" style="border-radius: 8px">
                          已下载
                        </el-tag>
                        <el-tag
                          v-if="!v.isdown"
                          style="border-radius: 8px"
                          type="info"
                          size="small"
                        >
                          未下载
                        </el-tag>
                      </div>
                    </div>
                </div>
              </div>
            </template>
            <div
              v-if="listData && listData.length == 0"
              style="text-align: center; margin-top: 1rem"
            >
              <span style="color: #c1c1c1">暂无文件</span>
            </div>
          </div>
          <div style="display: flex;justify-content: center;">
            
            <el-button @click="pageid++,getListUnion(true)" size="large" type="primary" plain
              >查看更多+</el-button
            >
              <!-- <el-pagination
                @size-change="getListUnion"
                @current-change="getListUnion"
                :page-sizes="[10, 20, 30, 40, 50]"
                v-model:current-page="pageid"
                v-model:page-size="pagesize"
                layout="total, sizes, prev, pager, next"
                :total="allSize"
              >
              </el-pagination> -->
          </div>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick, watch, onMounted } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import router from '@/router'
import { userStore ,loadStore } from '@/store'
import getAssetsFile from '@/utils/pub-use'
import { ElMessage } from 'element-plus'
import {  listUnion ,editPlan,GetAllXzqh ,regionData ,getNextDeptTrees,downloadFiles ,getdeptypelist } from '@/api'

  // const useLoad = loadStore()
  const user = userStore()
  const UserInfo = user.userInfo
  const closeCodeSelectSj = ref(true)
  const closeCodeSelectXj = ref(true)
  //   pcfa: '普查方案',
  //   jsgf: '技术方案',
  //   wjtz: '文件/函件',
  //   gzjb: '工作简报',
  //   xccp: '宣传产品'
  const nameObj :any =[
    {
     name:'通知文件',
     value:'wjtz',
     img: getAssetsFile('index/通知文件.png'),
     imgCheck: getAssetsFile('index/通知文件选中.png'),
    },
    {
     name:'技术规范',
     value:'jsgf',
     img: getAssetsFile('index/技术规范.png'),
     imgCheck: getAssetsFile('index/技术规范选中.png'),
    },
    {
     name:'培训素材',
     value:'pxsc',
     img: getAssetsFile('index/培训素材.png'),
     imgCheck: getAssetsFile('index/培训素材选中.png'),
    }

  ]
  const timer = ref()
  const seeLev = ref('')
  const year = ref(null)
  const yeargzjb = ref(null)
  const brief_type = ref(null)
  const optionsOrg = ref([] as any[])
  const keywords = ref('')
  const radio1 = ref(1)
  const activeName = ref<string>('wjtz')
  // const isSelf = ref('')
  const pageid = ref(1)
  const allSize = ref(1)
  // const time_at = ref([] as any[])
  const listData = ref([] as any[])
  const pagesize = ref(10)
  const start_at = ref('')
  const end_at = ref('')
  const xzcode = ref()
  const xzqhData = ref()
  const deplev = ref(UserInfo?.department.dep_lev)
  const userid = ref(UserInfo?.department.id)
  const simcode = ref(UserInfo?.user.simcode)
  const dep_type = ref(UserInfo?.user.dep_type)
  const codeLev = ref('')
  const selectName = ref('') // 选择的区划名称
  const selectNames = ref('') // 选择的区划名称
  const selectNamex = ref('') // 选择的区划名称
  const closeCodeSelect = ref(true) // 关闭区划树
  const shengList = ref([] as any[])
  const shengLists = ref([] as any[])
  const shengListx = ref([] as any[])
  const selectCode = ref(0) // 国家和地方筛选
  const selectCodeS = ref()
  // const selectCodes = ref(null)
  const selectCodex = ref(null)
  const xzcodestr = ref()
  const plantypeWj = ref('11')
  
  onMounted(() => {
    initCodeTree()
    getTypeData()
    if (router.currentRoute.value.query.activeName) {
      activeName.value = router.currentRoute.value.query.activeName
    }
    if (deplev.value == 2) {
      selectName.value = UserInfo.department?.xzq_sheng
      selectCodeS.value = UserInfo.department?.simcode
      clickName({ code_name: selectName.value, simcode: selectCodeS.value }, 'flag')
    }
    if (deplev.value == 3) {
      selectName.value = UserInfo.department?.xzq_sheng
      selectCodeS.value = UserInfo.department?.simcode.substring(0, 2)
      selectNames.value = UserInfo.department?.xzq_shi
      selectCodeS.value = UserInfo.department?.simcode
      clickNamex({ code_name: selectNames.value, simcode: selectCodeS.value }, 'flag')
    }
    if (deplev.value == 4) {
      selectName.value = UserInfo.department?.xzq_sheng
      selectCodeS.value = UserInfo.department?.simcode.substring(0, 2)
      selectNames.value = UserInfo.department?.xzq_shi
      selectCodeS.value = UserInfo.department?.simcode.substring(0, 4)
      selectNamex.value = UserInfo.department?.xzq_name
      selectCodex.value = UserInfo.department?.simcode
    }
  })
 watch(
    () => keywords.value,
    (newValue, oldValue) => {
      if (keywords.value) {
        if (timer.value)  clearTimeout(timer.value)
        timer.value = setTimeout(() => {
          if (activeName.value == 'qjss') {
            pageid.value = 1
            listData.value = []
            getListUnion()
          } else {
            activeName.value = 'qjss'
          }
        }, 300)
      }
    }
  )
 watch(
    () => activeName.value,
    (newValue, oldValue) => {
        pageid.value = 1
        listData.value = []
        // if (newValue == 'wjtz' && plantypeWj.value == '11') {
        //   plantypeWj.value = '12'
        //   return
        // }
        if (xzcode.value !== null) {
          getListUnion()
        }
    }
  )
 watch(
    () => codeLev.value,
    (newValue, oldValue) => {
      if (!codeLev.value) {
        return
      }
      pageid.value = 1
      listData.value = []
      getListUnion()
    }
  )
  watch([year, yeargzjb,brief_type,radio1,seeLev,plantypeWj], (newValues, oldValues) => {  
      pageid.value = 1
      listData.value = []
      getListUnion()
  }); 
 watch(
    () => xzcode.value,
    (newValue, oldValue) => {
      if (xzcode.value === null || xzcode.value === '') {
        return
      }
      if (xzcode.value && xzcode.value.length < 6) {
        xzcodestr.value = (xzcode.value + '').substring(0, 2)
      } else {
        xzcodestr.value = ''
      }
      if (xzcode.value == '1') {
        if (deplev.value >= 2) {
          getListUnion()
        }

      } else if (xzcode.value == '2') {
        codeLev.value = '2'
      } else {
        closeCodeSelect.value = true
        if (codeLev.value) {
          codeLev.value = ''
        }
        pageid.value = 1
        listData.value = []
        getListUnion()
      }
    }
  )
  
 watch(
    () => selectCode.value,
    (newValue, oldValue) => {
        if (newValue == 0) {
          xzcode.value = newValue
        }
    },{immediate: true,}
  )

  const hide1 = () =>{
    closeCodeSelect.value = true
  }
  const hide2 = () =>{
    closeCodeSelectSj.value = true
  }
  const hide3 = () =>{
    closeCodeSelectXj.value = true
  }
  const clickShowCodeSelect = (e: { target: { className: string } }) =>{
    if (deplev.value >= 2) {
      xzcode.value = selectCodeS.value
      return
    }
    if (deplev.value == 1 ) {
        closeCodeSelectSj.value = true
        shengLists.value.length = 0
        closeCodeSelectXj.value = true
        shengListx.value.length = 0

        if (!closeCodeSelect.value) {
          shengListx.value.length = 0
        } else {
          initCodeTree()
        }
        closeCodeSelect.value = !closeCodeSelect.value
      }
  }
  const clickShowCodeSelects = (e: { target: { className: string } }) =>{
      if (deplev.value >= 3) {
        xzcode.value = selectCodeS.value
        return
      }
    // if (deplev.value == 1 && e.target.className === 'el-radio-button__orig-radio') {
      if (deplev.value < 3 ) {
        if (!shengLists.value.length) {
          ElMessage.warning('请先选择省级')
          return
        }
        closeCodeSelectXj.value = true
        closeCodeSelect.value = true
        closeCodeSelectSj.value = !closeCodeSelectSj.value
      }
  }
  const clickShowCodeSelectx =(e: { target: { className: string } })=> {
    if (deplev.value >= 4) {
      xzcode.value = selectCodex.value
      return
    }
  // if (deplev.value == 1 && e.target.className === 'el-radio-button__orig-radio') {
    if (deplev.value < 4 ) {
      if (!shengListx.value.length) {
        ElMessage.warning('请先选择市级')
        return
      }
      closeCodeSelectSj.value = true
      closeCodeSelect.value = true
      closeCodeSelectXj.value = !closeCodeSelectXj.value
    }
  }
  const clickName = async (info: any, flag = '') => {
    closeCodeSelect.value = true
    selectName.value = info.code_name
    selectNames.value = ''
    selectNamex.value = ''
    if (flag !== 'flag') xzcode.value = info.simcode
    selectCodeS.value = info.simcode
    if (info.code_name == '全部') {
      shengLists.value = [ {
        code_name: '全部',
        simcode: 'sjqb',
      }]
      return
    }
    let res:any = await getNextDeptTrees(info.simcode)
    if (res) {
        let str = res.reduce((memo: string, item: { simcode: string }) => {
          return (memo += item.simcode + ',')
        }, '')
        let obj = {
          code_name: '全部',
          simcode: str.slice(0, -1)
        }
        res.splice(0, 0, obj)
        if (['11', '12', '31', '50'].includes(info.simcode)) {
          shengListx.value = res || []
          return
        }

        shengLists.value = res || []
    }
  }
  const clickNames = async (info: any, flag = '') => {
      closeCodeSelectSj.value = true
      selectNames.value = info.code_name
      selectNamex.value = ''
      if (flag !== 'flag') xzcode.value = info.simcode
      selectCodeS.value = info.simcode

      if (info.code_name == '全部') {
        shengListx.value = [
          {
            code_name: '全部',
            simcode: 'xjqb'
          }
        ]
        return
      }
      let res:any = await getNextDeptTrees(info.simcode)
      if(res){
          let str = res.reduce((memo: string, item: { simcode: string }) => {
            return (memo += item.simcode + ',')
          }, '')
          let obj = {
            code_name: '全部',
            simcode: str.slice(0, -1)
          }
          res.splice(0, 0, obj)
          shengListx.value = res || []
      }
  }
  const clickNamex = async (info: any, flag = '') =>{
      closeCodeSelectXj.value = true
      selectNamex.value = info.code_name
      if (flag !== 'flag') xzcode.value = info.simcode
      selectCodex.value = info.simcode

  }
  const batchDownload =()=> {
        if (!listData.value.length) {
          ElMessage.error('暂无文件，无法下载！')
          return
        }

        let strs = listData.value.reduce((memo, item) => {
          memo = memo + item.uuid + ','
          return memo
        }, '')
        let name = nameObj.filter(e=>e.value == activeName.value)[0].name
        // debugger
        downloads(
          strs,
          listData.value[0].plantype,
          1,
          `${name}第${pageid.value}页批量附件`,
          ''
        )
  }
   const downloads = async(uuid: any, plantype: any, usertype: number, filename: string, isdown: string|number) =>{
      // this.$loading({
      //   spinner: 'el-icon-loading',
      //   text: '正在下载中...',
      //   background: 'rgba(0, 0, 0, 0.8)'
      // })
      let params = {
        planuuid:uuid, 
        plantype, 
        usertype
      }
      let res :any= await downloadFiles(params)
        // .then((res: { data: BlobPart }) => {
        //   this.$nextTick(() => {
        //     // 以服务的方式调用的 Loading 需要异步关闭
        //     this.$loading().close()
        //   })
        if(res){

          let blob = new Blob([res], { type: 'application/zip' }) // type为所需要下载的文件格式，以xls文件为例
          let link = document.createElement('a') // 创建a标签
          link.style.display = 'none'
          let objectUrl = URL.createObjectURL(blob)
          link.href = objectUrl
          link.setAttribute('download', filename)
          link.click()
          URL.revokeObjectURL(objectUrl)

          if (
            isdown == 0 &&
            activeName.value == 'gzjb' &&
            deplev.value == 1 &&
            userid.value == 'a69380f4-4773-4665-9976-95124c1640dc'
          ) {
            const data = { plantype: plantype, uuid: uuid, isdown: 1 }
            let res =await editPlan(data)
          }

        }else{
          ElMessage.warning('无可下载附件')
        }
    }
   const toDetail= (plantype: any, uuid: any)=> {
      router.push({
          path: '/docsdetail',
          query: { pageName: activeName.value, plantype: plantype, uuid: uuid }
        }
      )
    }
    // 获取行业类别
   const  getTypeData = async ()=> {
    let res:any = await getdeptypelist({}) 
      if(res){
          res = [...res.splice(0, 11)]
          optionsOrg.value = res
          let obj = {
            bmz: '',
            bmmc: '全部'
          }
          optionsOrg.value.splice(0, 0, obj)

          if (dep_type.value != 0) {
            optionsOrg.value = optionsOrg.value.filter((item: { bmz: any }) => {
              return item.bmz == dep_type.value
            })
            seeLev.value = dep_type.value
          }
      }
    }
    // 获取总体的列表
   const getListUnion = async (flag=false)=> {
      let code = xzcode.value
      let xzcodelev = ''
      if (
        selectName.value == '全部' &&
        selectNames.value == '全部' &&
        selectNamex.value == '全部'
      ) {
        code = ''
        xzcodelev = '2,3,4'
      } else if (selectName.value == '全部' && selectNames.value == '全部') {
        code = ''
        xzcodelev = '2,3'
      }
      let data : any = {}
      if (activeName.value == 'pcfa') {
        data = {
          keywords: '',
          jg_hy: '',
          plantypes: '1',
          brief_type: '',
          isSelf: code === '' ? '' : 1,
          year: null,
          orderByJson: [
            { orderBy: 'created_code', orderAsc: 'asc' },
            { orderBy: 'fb_at' }
          ],
          pageid: pageid.value,
          pagesize: pagesize.value,
          end_at: '',
          start_at: '',
          xzcode: code,
          codeLev: xzcodelev
        }
      } else if (activeName.value == 'jsgf') {
        data = {
          diffInfo: JSON.stringify({ in_hy: seeLev.value }),
          keywords: '',
          year: null,
          jg_hy: '',
          plantypes: '3',
          brief_type: '',
          isSelf: code === '' ? '' : 1,
          orderByJson: [
            { orderBy: 'created_code', orderAsc: 'asc' },
            { orderBy: 'fb_at' },
            { orderBy: 'name', orderAsc: 'asc' }
          ],
          pageid: pageid.value,
          pagesize: pagesize.value,
          end_at: '',
          start_at: '',
          xzcode: code,
          codeLev: xzcodelev
        }
      } else if (activeName.value == 'wjtz') {
        data = {
          keywords: '',
          year: year.value,
          brief_type: '',
          jg_hy: '',
          plantypes: plantypeWj.value,
          isSelf: code === '' ? '' : 1,
          orderByJson: [
            { orderBy: 'created_code', orderAsc: 'asc' },
            { orderBy: 'fb_at' }
          ],
          pageid: pageid.value,
          pagesize: pagesize.value,
          end_at: end_at.value,
          start_at: start_at.value,
          xzcode: code,
          codeLev: xzcodelev
        }
      } else if (activeName.value == 'gzjb') {
        data = {
          keywords: '',
          year: yeargzjb.value,
          jg_hy: '',
          brief_type: brief_type.value,
          plantypes: '13',
          isSelf: code === '' ? '' : 1,
          orderByJson: [
            { orderBy: 'created_code', orderAsc: 'asc' },
            { orderBy: 'fb_at' }
          ],
          pageid: pageid.value,
          pagesize: pagesize.value,
          end_at: end_at.value,
          start_at: start_at.value,
          xzcode: code,
          codeLev: xzcodelev
        }
      } else if (activeName.value == 'xccp') {
        data = {
          year: null,
          jg_hy: '',
          keywords: '',
          brief_type: '',
          plantypes: '7',
          isSelf: code === '' ? '' : 1,
          orderByJson: [
            { orderBy: 'created_code', orderAsc: 'asc' },
            { orderBy: 'fb_at' }
          ],
          pageid: pageid.value,
          pagesize: pagesize.value,
          end_at: '',
          start_at: '',
          xzcode: code,
          codeLev: xzcodelev
        }
      } else if (activeName.value == 'qjss') {
        data = {
          year: null,
          brief_type: '',
          jg_hy: '',
          keywords: keywords.value,
          plantypes: '1,3,5,7,11,12,13',
          isSelf: code === '' ? '' : 1,
          orderByJson: [
            { orderBy: 'created_code', orderAsc: 'asc' },
            { orderBy: 'fb_at' }
          ],
          pageid: pageid.value,
          pagesize: pagesize.value,
          end_at: '',
          start_at: '',
          xzcode: code,
          codeLev: xzcodelev
        }
      } else if(activeName.value == 'pxsc'){
        data = {
          year: null,
          brief_type: '',
          jg_hy: '',
          keywords: keywords.value,
          plantypes: '5',
          isSelf: code === '' ? '' : 1,
          orderByJson: [
            { orderBy: 'created_code', orderAsc: 'asc' },
            { orderBy: 'fb_at' }
          ],
          pageid: pageid.value,
          pagesize: pagesize.value,
          end_at: '',
          start_at: '',
          xzcode: code,
          codeLev: xzcodelev
        }


      }
      let res:any = await listUnion(data)
      if (res) {
        // debugger
        if(flag){ 
          listData.value = [... listData.value,...res.list]
          if(res.list.length === 0) ElMessage.warning('已到底')
        }else{
          allSize.value = res.count * 1
          listData.value = res.list
        }
      }
    }
    const  selectList= (active: string) =>{
      activeName.value = active
    }
   const getAllXzqh =async()=> {
      let res = await GetAllXzqh({})
      if(res){
           let arr = res[0].children
          let arr1 = {
            simcode: res[0].simcode,
            code_name: res[0].code_name
          }
          let arrMap = arr.map((item: { simcode: any; code_name: any }) => {
            return {
              simcode: item.simcode,
              code_name: item.code_name
            }
          })

          arrMap.unshift({
            simcode: '2',
            code_name: '全部'
          })
          if (deplev.value == 1) {
            let arrTree = [
              arr1,
              {
                simcode: '#',
                code_name: '省级',
                disabled: true,
                children: arrMap
              }
            ]
            xzqhData.value = arrTree
            xzcode.value = '0'
          } else {
            let arrs = [arr1]
            arrMap.forEach((item: { code: any; code_name?: any }) => {
              // let simcode :string = simcode.value.substring(0, 2)
              if (item.code == simcode.value.substring(0, 2)) {
                arrs.push(item)
              }
            })
            xzqhData.value = arrs
            xzcode.value = simcode.value.substring(0, 2)
          }

      }
    }
    // 初始获得区划树的数据
   const initCodeTree= async ()=> {
      // 获取省级
      let res :any= await getNextDeptTrees('0')
      if(res){
          let str = res.reduce((memo: string, item: { simcode: string }) => {
            return (memo += item.simcode + ',')
          }, '')
          let obj = {
            code_name: '全部',
            simcode: str.slice(0, -1)
          }
          res.splice(0, 0, obj)
          shengList.value = res || []


      }
    }
</script>
<style lang="scss" scoped>
.zlxz {
  position: absolute;
  bottom: 0;
  right: 0;
  top: 80px;
  background: var(--main-bg-color);
  width: 100%;
}
.m-date-btn-jsgf {
  position: absolute;
  top: 60px;
}
.height-jsgf {
  height: 70px;
}
.zlxz-con {
  width: 1200px;
  margin: auto;
  height: calc(100% - 24px);
  margin-top: 12px;
  background: #eaeaea;
  display: flex;
  flex-direction: column;
}
.zlxz-list {
  width: calc(100% - 2rem);
  height: calc(100% - 280px - 2rem);
  background: #fff;
  padding: 1rem;
  position: relative;
  /* top: 30px; */
}
.zlxz-list .m-code-select {
  width: 160px;
  height: 280px;
  overflow: auto;
  position: absolute;
  top: 56px;
  left: 105px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  z-index: 20;
}

.zlxz-list .m-code-selectx {
  width: 160px;
  height: 280px;
  overflow: auto;
  position: absolute;
  top: 56px;
  left: 273px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  z-index: 20;
}
.zlxz-list .m-code-selects {
  width: 160px;
  height: 280px;
  overflow: auto;
  position: absolute;
  top: 56px;
  left: 173px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  z-index: 20;
}
.m-line {
  height: 32px;
  line-height: 32px;
  padding-left: 1rem;
  cursor: pointer;
}
.m-line:hover {
  background: #eee;
}
.btn {
  width: 211px;
  height: 40px;
  background: #ffffff;
  border: 1px solid var(--theme-color);
  border-radius: 6px;
  margin: auto;
  color: var(--theme-color);
  font-size: 16px;
  font-weight: 400;
  line-height: 40px;
  text-align: center;
  margin-top: 25px;
  cursor: pointer;
}
.zlxz-list-con {
  width: 100%;
  // height: calc(100% - 68px);
  height: calc(100% - 110px);
  overflow-y: overlay;
}
.zlxz-list-con-jsgf {
  // height: calc(100% - 68px);
}
.con-top {
  width: 100%;
  height: 280px;
  background-image: url("../../assets/images/zlxz/head_back.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
.list-con-one {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // padding: 12px 0;
  border-bottom: 1px solid #ececec;
}
.content {
  float: left;
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
  margin-left: 6px;
  // width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: default;
}
.handle {
  float: right;
  // height: 100%;
  /* overflow: hidden; */
  cursor: pointer;
  margin-left: 16px;
  color: var(--theme-color);
}
// .handle img {
//   float: left;
// }
.text {
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
  vertical-align: middle;
  // float: left;
}
.circle {
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background: var(--theme-color);
  float: left;
  margin-top: 6px;
}
.zlxz-title {
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  color: var(--theme-color);
  line-height: 32px;
  margin: 0;
  margin-top: 30px;
  position: relative;
}
.zlxz-title::after {
  content: "";
  display: block;
  width: 107px;
  height: 4px;
  background: var(--theme-color);
  position: absolute;
  left: 0;
  right: 0;
  margin: 12px auto 0 auto;
}
.list-img {
  display: flex;
  justify-content: space-evenly;
  margin-top: 28px;
  margin-bottom: 28px;
}
.list-img .list-img-con{
  height: 100%;
}
.selectImg {
  width: 150px;
  height:90px;
  cursor: pointer;
  img{
    height: 100%;
    width: 100%;
  }
}
@media only screen and (max-width: 1366px) {
  .zlxz {
    top: 60px;
  }
}
.len1 {
  height: 35px !important;
}
</style>
