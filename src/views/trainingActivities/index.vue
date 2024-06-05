<template>
  <!-- 培训活动 -->
  <div class="activeIndex">
    <div class="con_list">
      <!-- <div v-if="$route.query.train_form==6" class="home_banner">
          <el-select
            class="eldate"
            style="width:120px"
            v-if="user_hy == 0"
            v-model="dep_type"
            :clearable="true"
            size="small"
            placeholder="按行业筛选"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
            <el-radio-group
              v-model="selectCode"
              size="small"
              class="eldate"
            >
              <el-radio-button  :value="1" @click.native="clickShowCodeSelect">{{selectName ? selectName :'省级'}}</el-radio-button>
              <el-radio-button  v-if="!['11', '12', '31', '50'].includes(xzcodestr) && !['11', '12', '31', '50'].includes(selectCodeS)" :value="2" @click.native="clickShowCodeSelects">{{selectNames ? selectNames :'市级'}}</el-radio-button>
              <el-radio-button  :value="3" @click.native="clickShowCodeSelectx">{{selectNamex ? selectNamex :'县级'}}</el-radio-button>
          </el-radio-group>

          <div class="m-code-select" v-if="!closeCodeSelect">
            <div class="m-line" v-for="(item,index) in shengList" :key="index" @click="clickName(item),hide1">
              {{item.code_name}}
            </div>
          </div>
          <div class="m-code-select" :class="{'len1':shengLists.length==1}"  v-if="!closeCodeSelectSj">
            <div class="m-line" v-for="(item,index) in shengLists" :key="index" @click="clickNames(item),hide2">
              {{item.code_name}}
            </div>
          </div>
          <div class="m-code-select" :class="{'m-code-selects':!(!['11', '12', '31', '50'].includes(xzcode) && !['11', '12', '31', '50'].includes(selectCodeS)),'len1':shengListx.length==1}" v-if="!closeCodeSelectXj">
            <div class="m-line" v-for="(item,index) in shengListx" :key="index" @click="clickNamex(item),hide3">
              {{item.code_name}}
            </div>
          </div>
          <el-input
              placeholder="请输入内容"
              :clearable="true"
              size="small"
              class="eldate"
              style="width: 200px;"
              v-model="searchKey"
            >
            </el-input>
          <!== <el-select
          style="margin-left:12px;margin-top:12px"
            class="eldate"
            v-if="dep_lev < 4"
            :clearable="true"
            v-model="xzcode"
            size="small"
            placeholder="按区划筛选"
          >
            <el-option
              v-for="item in optionsSheng"
              :key="item.value"
              :label="item.code_name"
              :value="item.simcode"
            >
            </el-option>
          </el-select> ==>
          <!== 区划树 ==>
      </div> -->
      <div class="bg-img">
        {{ decodeURI($route.query.title)}}
      </div>
      <div :class="train_form ? 'heigthStyle' : ''" class="home_content">

        <div class="list_mian">
          <dl class="list_dl" v-for="(item, index) in listDatas" :key="index">
            <dd>
              <div class="dd_left" @click="goListInfo(item.uuid)">
                <p :title="item.train_name">{{ item.train_name }}</p>
              </div>
              <div class="list_text">
                <h2 @click="goListInfo(item.uuid)">{{ item.train_name }}</h2>
                <div class="text_center">
                  <span class="text_zzdw">组织单位：{{ item.organize_unit }}</span>
                  <span>课程更新时间：{{item.course_max_update? item.course_max_update.substring(0,11):'-' }}</span>
                  <!-- <span class="text_ts">课程时长：{{item.kscd}}</span> -->
                </div>
                <div class="text_center" style="margin-top: 12px;">
                  <span class="text_zzdw">课程数量：{{ item.course_count || 0 }}讲</span>
                  <span>培训对象：{{ item.train_to }}</span>
                  <span class="text_ts">课程时长：{{ Math.floor(item.train_long / 60)}}小时{{item.train_long % 60}}分钟</span>
                </div>
              </div>
            </dd>
          </dl>
        </div>
      </div>
      <div class="home_footer">
          <el-pagination
            @size-change="getActive"
            @current-change="getActive"
            v-model:current-pag="currentPage1"
            v-model:page-size="pageSize1"
            :page-sizes="[10, 20, 30, 40, 50]"
            layout="total, sizes, prev, pager, next"
            :total="total1"
          >
          </el-pagination>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick, watch, onMounted } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { userStore } from '@/store'
import {getNextDeptTrees , regionData ,getOverPlanList} from '@/api'

const user = userStore()
const UserInfo = user.userInfo
const closeCodeSelectSj = ref<boolean>(true)
const closeCodeSelectXj = ref<boolean>(true)
const closeCodeSelect = ref<boolean>(true)
const selectName = ref<string>('')
const selectNames = ref<string>('')
const selectNamex = ref<string>('')
// const bgtitle = ref<string>('')
const currentPage1 = ref<number>(1)
const pageSize1 = ref<number>(10)
const total1 = ref<number>(0)
const searchKey = ref<string>('')

const code = ref<string>(UserInfo.department.simcode)
const user_hy = ref<any>(UserInfo.department.dep_type)
const dep_lev = ref<any>(UserInfo.department.dep_lev)
const simcode = ref<string>(UserInfo.user.simcode)
const dep_type = ref<any>(UserInfo.user.dep_type)

const xzcode = ref<any>(UserInfo.department.simcode)
const shengList = ref<any>([])
const shengLists = ref<any>([])
const shengListx = ref<any>([])

const selectCode = ref(0)
const selectCodeS = ref(null)
const selectCodes = ref(null)
const selectCodex = ref(null)
const xzcodestr = ref()
const optionsSheng = ref<any>([])
const options = ref<any>([
        {
          label: '普查办',
          value: '0'
        },
        // {
        //   label: '应急部门',
        //   value: 1
        // },
        {
          label: '生态部门',
          value: '2'
        },
        {
          label: '交通部门',
          value: '3'
        },
        {
          label: '自然资源部门',
          value: '4'
        },
        {
          label: '住建部门',
          value: '5'
        },
        {
          label: '水利部门',
          value: '6'
        },
        {
          label: '气象部门',
          value:'7'
        },
        {
          label: '林业部门',
          value: '8'
        },
        {
          label: '地震部门',
          value: '9'
        }
      ])
const listDatas = ref<any>([])
const timer = ref()
const train_form = router.currentRoute.value.query.train_form

    watch(searchKey, (newVal, oldVal) => {
        if (timer.value) {
          clearTimeout(timer.value)
        }

        timer.value = setTimeout(() => {
          getActive()
        }, 300)
      })
      watch(xzcode, (newVal, oldVal) => {
          if (xzcode.value && xzcode.value.length < 6) {
            xzcodestr.value = (xzcode.value + '').substring(0, 2)
          } else{
            xzcodestr.value = ''
          }
          getActive()
      })
      watch(dep_type, (newVal, oldVal) => {
          getActive()
      })

    const  hide1 = ()=>{
        closeCodeSelect.value = true
      }
    const  hide2 = ()=>{
      closeCodeSelectSj.value = true
    }
    const  hide3 = ()=>{
          closeCodeSelectXj.value = true
    }
   const clickShowCodeSelect =(e:any)=> {
      if (dep_lev.value >= 2) {
        xzcode.value = selectCodeS.value
        return
      }
      if (dep_lev.value == 1 ) {
        closeCodeSelectSj.value = true
        shengLists.value.length = 0
        closeCodeSelectXj.value = true
        shengListx.value.length = 0

        if (!closeCodeSelect.value) {
          shengListx.value.length = 0
        } else {
          initCodeTree()
        }
        closeCodeSelect.value = false
      }
    }
   const clickShowCodeSelects =(e:any)=> {
      if (dep_lev.value >= 3) {
        xzcode.value = selectCodes.value
        return
      }

    // if (deplev.value == 1 && e.target.className === 'el-radio-button__orig-radio') {
      if (dep_lev.value < 3) {
        if (!shengLists.value.length) {
          ElMessage.warning('请先选择省级')
          return
        }
        closeCodeSelectXj.value = true
        closeCodeSelect.value = true
        closeCodeSelectSj.value = false
      }
    }
    const clickShowCodeSelectx  =(e:any)=> {
      if (dep_lev.value >= 4) {
        xzcode.value = selectCodex.value
        return
      }

      if (dep_lev.value < 4) {
        if (!shengListx.value.length) {
          ElMessage.warning('请先选择市级')
          return
        }
        closeCodeSelectSj.value = true
        closeCodeSelect.value = true
        closeCodeSelectXj.value = false
      }
    }
   const clickName =async(info: { code_name: any; simcode: any }, flag ='') =>{
      closeCodeSelect.value = true
      selectName.value = info.code_name
      selectNames.value = ''
      selectNamex.value = ''
      if (flag !== 'flag') xzcode.value = info.simcode
      selectCodeS.value = info.simcode
      
      if (info.code_name=='全部') {
        
        shengLists.value = [{
            code_name: '全部',
            simcode: 'sjqb'
          }]
        return
      }
      let res:any = await getNextDeptTrees(info.simcode)
      if(res){
          let str = res.reduce((memo: string,item: { simcode: string }) => {
            return memo += item.simcode + ','
          },'')
          let obj  = {
            code_name: '全部',
            simcode: str.slice(0,-1)
          }
          res.splice(0, 0, obj)
          if (['11', '12', '31', '50'].includes(info.simcode)) {
            shengListx.value = res || []
            return
          }
          shengLists.value = res || []


      }
    }
   const clickNames = async(info: { code_name: string; simcode: null }, flag='')=> {
      closeCodeSelectSj.value = true
      selectNames.value = info.code_name
      selectNamex.value = ''
      if (flag !== 'flag') xzcode.value = info.simcode
      selectCodes.value = info.simcode

      
      if (info.code_name=='全部') {
        shengListx.value = [{
            code_name: '全部',
            simcode: 'xjqb'
          }]
        return
      }
      let res:any = await getNextDeptTrees(info.simcode)
      if(res){
          let str = res.reduce((memo: string,item: { simcode: string }) => {
            return memo += item.simcode + ','
          },'')
          let obj  = {
            code_name: '全部',
            simcode: str.slice(0,-1)
          }
          res.splice(0, 0, obj)
          shengListx.value = res || []


      }
    }
    const clickNamex = (info: { code_name: any; simcode: any }, flag='')=> {
      closeCodeSelectXj.value = true
      selectNamex.value = info.code_name
      if (flag !== 'flag') xzcode.value = info.simcode
      selectCodex.value = info.simcode
    }
   const initCodeTree = async()=> {
      // 获取省级
      let res:any = await getNextDeptTrees('0')
      if(res){
          let str = res.reduce((memo: string,item: { simcode: string }) => {
            return memo += item.simcode + ','
          },'')
          let obj  = {
            code_name: '全部',
            simcode: str.slice(0,-1)
          }
          res.splice(0, 0, obj)
          shengList.value = res || []
      }
    }
   const getTreeData =async()=> {
      let res:any = await regionData({ simcode: code.value })
      if(res){
          optionsSheng.value = res

      }
    }
    const goListInfo = async(id: any)=> {
      const listInfo =router.resolve({
        name: 'activityList',
        query: {
          uuid: id
        }
      })
      window.open(listInfo.href, '_blank')
    }
    const getActive =async ()=> {
      let code = xzcode.value
      let xzcodelev = ''
      if (selectName.value=='全部' && selectNames.value=='全部' && selectNamex.value=='全部') {
        code = ''
        xzcodelev = '2,3,4'
      }else if (selectName.value=='全部' && selectNames.value=='全部') {
        code = ''
        xzcodelev = '2,3'
      }
      let data
      if (router.currentRoute.value.query.train_form == 6) {
        data = {
          code: code,
          xzcodelev,
          keywords: searchKey.value,
          isSelf: code===''? '' : 1,
          orderByJson: [{"orderBy":"created_code","orderAsc":"asc"},{"orderBy":"train_start","orderAsc":"desc"}],
          seeLev: '',
          plantype: 5,
          user_hy: dep_type.value,
          diffInfo: JSON.stringify({
            train_form: router.currentRoute.value.query.train_form,
            course_max_update: 1
          }),
          pagesize: pageSize1.value,
          pageid: currentPage1.value
        }
      } else {
        data = {
          code: 0,
          keywords: '',
          xzcodelev:'',
          isSelf: 1,
          orderByJson: [{ orderBy: 'train_start' }],
          seeLev: '',
          plantype: 5,
          user_hy: '',
          diffInfo: JSON.stringify({
            train_form: router.currentRoute.value.query.train_form,
            course_max_update: 1
          }),
          pagesize: pageSize1.value,
          pageid: currentPage1.value
        }
      }
      debugger
      let res:any = await getOverPlanList(data)
      if(res){
            listDatas.value = res.list
            total1.value = res.count * 1
            if (!listDatas.value.length) {
              return ElMessage({
                type: 'warning',
                message: '暂无专题'
              })
            }
      }
    }
  onMounted (()=> {
    getActive()
    // this.getTreeData()
    initCodeTree()
    if (dep_lev.value == 2) {
      selectCode.value = 1
      selectName.value = UserInfo.department.xzq_sheng
      selectCodeS.value = UserInfo.department.simcode
      clickName({code_name: selectName.value, simcode: selectCodeS.value}, 'flag')
    }
    if (dep_lev.value == 3) {
      selectCode.value = 2
      selectName.value = UserInfo.department.xzq_sheng
      selectCodeS.value = UserInfo.department.simcode.substring(0, 2)
      selectNames.value = UserInfo.department.xzq_shi
      selectCodes.value = UserInfo.department.simcode
      clickNamex({code_name: selectNames.value, simcode: selectCodes.value}, 'flag')
    }
    if (dep_lev.value == 4) {
      selectCode.value = 3
      selectName.value = UserInfo.department.xzq_sheng
      selectCodeS.value = UserInfo.department.simcode.substring(0, 2)
      selectNames.value = UserInfo.department.xzq_shi
      selectCodes.value = UserInfo.department.simcode.substring(0, 4)
      selectNamex.value = UserInfo.department.xzq_name
      selectCodex.value = UserInfo.department.simcode
    }
  })
</script>
<style scoped lang="scss">

.activeIndex {
  background: var(--main-bg-color);
  height: calc(100vh - 80px);
  width: 100%;
  overflow: hidden;
  .con_list {
    height: calc(100% - 26px);
    overflow: hidden;
    margin: 13px auto;
    width:1200px;
    background-color: #Fff;
    
    .home_banner{
      width: 100%;
      padding: 8px 0;
      display: flex;
      justify-content: start;
      .eldate{
        margin-left: 8px;
      }
      .m-code-select {
        width: 160px;
        height: 280px;
        overflow: auto;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 6px;
        z-index: 10000;
      }
    }
    .home_content {
      width: 100%;    
      height: calc(100% - 260px);
      margin: auto;
      clear: both;
      zoom: 0;
      .list_mian {
        padding: 0 40px;
        height:100%;
        overflow: overlay;
      }
    }
    .home_footer{
      width: 100%;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
@media only screen and (max-width: 1366px) {
  .activeIndex {
    height:calc(100% - 60px);
  }
}
.bg-img{
    width: 100%;
  height: 220px;
  margin: auto;
  background-image: url('@/assets/images/trainingActivities/pcbg.png');
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  color: #fff;
  letter-spacing: 12px;
}

.m-line {
  height: 32px;
  line-height: 32px;
  padding-left:20px;
  cursor: pointer;
}
.list_dl {
  padding: 20px 0;
  margin: 0;
  border-bottom: 1px solid #e6e6e6;
}
.list_dl dt {
  padding-bottom: 20px;
}
.list_dl dd {
  margin: 0;
  overflow: hidden;
  clear: both;
  zoom: 0;
}
.list_dl dd .dd_left {
  float: left;
  background: url("../../assets/images/home/list_bg.png");
  width: 177px;
  height: 100px;
  text-align: center;
  cursor: pointer;
}
.list_dl dd .dd_left p {
  font-weight: bold;
  padding: 13px 26px 0;
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
.list_text {
  margin-left: 198px;
}
.list_text h2 {
  margin-top: 0;
  display: inline-block!important;
  font-size: 20px;
  font-weight: bold;
  color: var(--theme-color);
  cursor: pointer;
}
.text_center {
  overflow: hidden;
  font-size: 14px;
}
.text_zzdw {
  display: inline-block;
  width: 270px;
}
.text_ts {
  float: right;
}
.text_bottom {
  margin-top: 20px;
  font-size: 14px;
}
.list_text a {
  color: var(--theme-color);
  cursor: pointer;
}
.text_bottom code {
  float: right;
  color: #787878;
}
.home_right {
  float: right;
  width: 310px;
  margin: 0;
  padding: 24px 0;
  overflow: hidden;
}
.home_right dd {
  margin: 10px 0 0 0;
  width: 100%;
  padding: 22px;
  background: #f4f4f4;
}
.right_text {
  padding-top: 20px;
}
.right_text span {
  display: inline-block;
  width: 230px;
  font-size: 16px;
  color: #787878;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}
.right_text label {
  display: inline-block;
  margin-right: 8px;
  width: 16px;
  height: 16px;
  text-align: center;
  line-height: 16px;
  font-size: 12px;
  color: #fff;
  background: #ef5e5f;
  vertical-align: middle;
}
.home_right dd img {
  width: 259px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.banner_h2 {
  position: absolute;
  color: #fff;
  left: 50%;
  top: 50%;
  font-size: 38px;
  margin-top: -28px;
  margin-left: -280px;
  letter-spacing: 18px;
}
.len1{
  height: 35px;
}
.heigthStyle{
  height: calc(100% - 252px)
}
</style>
<style>
.el-carousel__button {
  width: 8px !important;
  height: 8px !important;
  border-radius: 50%;
}
</style>
