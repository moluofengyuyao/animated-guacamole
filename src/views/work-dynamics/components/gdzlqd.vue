<template>
  <div>
    <el-col :offset="1" :span="22" class="gdzlqd-list" :class="mode === 'edit' ? 'noBorder' : ''">
      <el-table :height="730" :max-height="730" :data="gdzlqdArrRef" :header-cell-style="handleTableHeaderStyle" class="scroll-style" border stripe style="width: 100%">
        <el-table-column :show-overflow-tooltip="mode == 'view'?true:false" align="center" label="序号" type="index" width="50"></el-table-column>
        <el-table-column :show-overflow-tooltip="mode == 'view'?true:false" align="center" label="资料名称" width="500">
          <template #default="{row,$index}">
            <el-input placeholder="请先选择分类再输入文件名称" v-if="mode == 'add' || mode == 'edit'" v-model="row.file_name"></el-input>
            <span v-if="mode == 'view'">{{ row.file_name}}</span>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="mode == 'view'?true:false" align="center" label="资料份数" width="80">
          <template #default="{row,$index}">
            <el-input-number :controls="false" :max="9999" :min="1" :style="{width:`59px`}" v-if="mode == 'add' || mode == 'edit'" v-model="row.filenum"></el-input-number>
            <span v-if="mode == 'view'">{{ row.filenum }}</span>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="mode == 'view'?true:false" align="center" label="资料分类">
          <template #default="{row,$index}">
            <span v-if="mode == 'add' || mode == 'edit'">
              <el-select @change="handleChangeFileType($event,$index)" v-model="row.file_type" value-key="value">
                <el-option :key="index" :label="item.label" :value="item.value" v-for="(item,index) in file_typeRef">{{ item.label }}</el-option>
              </el-select>
              <span v-if="row.file_type == '其他'">
                <el-input @change="handleChangeFileType($event,$index)" placeholder="自定义文本" v-model="row.file_typename"></el-input>
              </span>
            </span>
            <span
              v-if="mode == 'view'"
            >{{ getName('file_type',row.file_type) || '-'}}{{ row.file_type == '其他' ? `(${row.file_typename})` : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="mode == 'view'?true:false" align="center" label="纸质文件归档情况">
          <template #default="{row,$index}">
            <el-select multiple v-if="mode == 'add' || mode == 'edit'" v-model="row.zzwjgdqk" value-key="value">
              <el-option
                :disabled="item.value == '无'? row.zzwjgdqk.length > 0:row.zzwjgdqk.includes('无')"
                :key="index"
                :label="item.label"
                :value="item.value"
                v-for="(item,index) in zzwjgdqkRef"
              >{{ item.label }}</el-option>
            </el-select>
            <span v-if="mode == 'view'">{{ row.zzwjgdqk.map((type)=>{return getName('zzwjgdqk',type)}).join(',') || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="mode == 'view'?true:false" align="center" label="电子文件归档情况">
          <template #default="{row,$index}">
            <el-select multiple v-if="mode == 'add' || mode == 'edit'" v-model="row.dzwjgdqk" value-key="value">
              <el-option
                :disabled="item.value == '无'? row.dzwjgdqk.length > 0:row.dzwjgdqk.includes('无')"
                :key="index"
                :label="item.label"
                :value="item.label"
                v-for="(item,index) in dzwjgdqkRef"
              >{{ item.label }}</el-option>
            </el-select>
            <span v-if="mode == 'view'">{{ row.dzwjgdqk.map((type)=>{return getName('dzwjgdqk',type)}).join(',') || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="mode == 'view'?true:false" align="center" label="图片文件归档情况">
          <template #default="{row,$index}">
            <el-select multiple v-if="mode == 'add' || mode == 'edit'" v-model="row.tpwjgdqk" value-key="value">
              <el-option
                :disabled="item.value == '无'? row.tpwjgdqk.length > 0:row.tpwjgdqk.includes('无')"
                :key="index"
                :label="item.label"
                :value="item.value"
                v-for="(item,index) in tpwjgdqkRef"
              >{{ item.label }}</el-option>
            </el-select>
            <span v-if="mode == 'view'">{{ row.tpwjgdqk.map((type)=>{return getName('tpwjgdqk',type)}).join(',') || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="mode == 'view'?true:false" align="center" label="视频文件归档情况">
          <template #default="{row,$index}">
            <el-select multiple v-if="mode == 'add' || mode == 'edit'" v-model="row.spwjgdqk" value-key="value">
              <el-option
                :disabled="item.value == '无'? row.spwjgdqk.length > 0:row.spwjgdqk.includes('无')"
                :key="index"
                :label="item.label"
                :value="item.value"
                v-for="(item,index) in spwjgdqkRef"
              >{{ item.label }}</el-option>
            </el-select>
            <span v-if="mode == 'view'">{{ row.spwjgdqk.map((type)=>{return getName('spwjgdqk',type)}).join(',') || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="mode == 'view'?true:false" align="center" label="附件" width="80">
          <template #default="{row,$index}">
            <el-button @click="handleClickForgdzlqd(row)" class="large-font-size-button" :icon="View" link></el-button>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="mode == 'view'?true:false"
          align="center"
          class="without-color"
          label
          v-if="mode == 'add' || mode == 'edit'"
          width="80"
        >
          <template #default="{row,$index}">
            <el-button
              @click="handleClickForgdzlqdAdd()"
              class="large-font-size-button"
              :icon="CirclePlus"
              link
              v-show="$index == gdzlqdArrRef.length-1"
            ></el-button>
            <el-button
              @click="handleClickForgdzlqdRmv($index)"
              class="large-font-size-button"
              :icon="Remove"
              link
              v-show="gdzlqdArrRef.length>1"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-dialog :title="`${activeRowRef.file_name || `无名称`}附件列表`" v-model="dialogVisibleRef" width="50%">
      <div class="buttons" v-if="mode == 'add' || mode == 'edit'">
        <el-upload
          :on-progress="handleProgress"
          :action="`${actionUrlRef}/upload`"
          :before-upload="handleBeforeUpload"
          :file-list="fileListRef"
          :headers="{
            token: tokenRef
          }"
          :on-success="handleSuccess"
          :show-file-list="false"
          class="upload-demo"
          multiple
          ref="uploadInGdzlqd"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <el-button @click="handleCloseDialog" size="small">关闭</el-button>
        <el-button @click="handleBatchDelFile" size="small">删除</el-button>
      </div>
      <div class="list-description">附件列表：</div>
      <div class="file-list" v-if="activeRowRef.attachment && activeRowRef.attachment.length">
        <el-checkbox-group class="file-list-item" v-model="checkedFileListRef">
          <el-checkbox :key="v.uid" :label="v.uuid" :value="v.uuid" v-for="(v, ind) in activeRowRef.attachment">
            <el-icon class="el-icon-paperclip"><Paperclip /></el-icon>
            <span
              :title="v.filename"
              style="
                    display: inline-block;
                    white-space: nowrap;
                    max-width:calc(100% - 200px);
                    text-overflow: ellipsis;
                    overflow: hidden;"
            >{{ v.filename }}</span>
            <el-icon class="el-icon-upload"
              @click.stop="v.dow_count++,download(v.uuid, v.ext, v.filename)"
              title="下载"
              v-if="$isViewer && ![`国家级评估成果1.0版（征求意见）`].find(name=>v.filename.includes(name))"
              v-show="mode == 'view' || mode == 'edit'">
              <UploadFilled />
            </el-icon>
            <el-icon class="el-icon-delete" @click.stop="handleRemoveForgdzlqd(ind)" v-if="mode == 'add' || mode == 'edit'">
              <Delete />
            </el-icon>
            <el-icon class="el-icon-view"
              @click.stop="preview(v.ext, v.path,v.filename,ind)"
              title="预览"
              v-if="mode == 'view' || mode == 'edit'"
              v-show="arrExtRef.includes(v.ext)">
              <View />
            </el-icon>
            <span style="color: #c0c4cc">下载次数&nbsp;{{ v.dow_count }}</span>
            <span @click.stop.prevent="downRow(activeRowRef.attachment,ind)">
              <el-icon class="el-icon-bottom"><Bottom /></el-icon>
            </span>
            <span @click.stop.prevent="upRow(activeRowRef.attachment,ind)">
              <el-icon class="el-icon-top"><Top /></el-icon>
            </span>
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="file-list empty" v-else>暂无附件</div>
      <template #footer class="dialog-footer"></template>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      :title="`${activeRowRef.file_name || `无名称`}附件列表-${attachmentPreviewObjRef.title}`"
      v-model="dialogVisibleimgRef"
      class="zlxzxp"
    >
      <div class="img-box">
        <div class="custom-slick-arrow" style="left: 10px" @click="PreviousAndNext('img',-1)" >
          <!-- <a-icon type="left-circle" /> -->
        </div>
        <div class="custom-slick-arrow" style="right: 10px" @click="PreviousAndNext('img',1)" >
          <!-- <a-icon type="right-circle" /> -->
        </div>
        <img :src="dialogImageUrlRef" alt class="elimg" />
      </div>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      :title="`${activeRowRef.file_name || `无名称`}附件列表-${attachmentPreviewObjRef.title}`"
      v-model="dialogVisibleVUrlRef"
      class="zlxzxp"
    >
      <div class="video-wrap">
        <div class="custom-slick-arrow" style="left: 10px" @click="PreviousAndNext('video',-1)" >
          <!-- <a-icon type="left-circle" /> -->
        </div>
        <div class="custom-slick-arrow" style="right: 10px" @click="PreviousAndNext('video',1)" >
          <!-- <a-icon type="right-circle" /> -->
        </div>
        <video :src="dialogVUrlRef" class="elimg" controls="controls" controlslist="nodownload"></video>

      </div>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, watch, computed, nextTick } from 'vue'
import { mime } from './mime.js'
import { deleteFileMenu, queryDataListCommon, createCommon, getFileLists, downloadFile, delFile } from '@/api'
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'
import { View, CirclePlus, Remove, UploadFilled, Paperclip, Delete, Bottom, Top } from '@element-plus/icons-vue'
// 归档资料清单

const props = defineProps({
  plantype: {
    type: String,
  },
  form: {
    type: Object,
  },
  mode: {
    type: String,
  },
  workTypeAcronym: {
    type: String,
    default: '无',
  },
  fillWorkNum: {
    type: String,
    default: '无',
  },
  workName: {
    type: String,
    default: '无',
  },
  workType: {
    type: String,
    default: '无',
  }
});

const currentIndexOfAttachmentListRef = ref(0)
const loadingInstanceRef = ref(null)
const fileListRef = ref([])
const attachmentPreviewObjRef = ref({
  title: '',
})
const arrExtRef = ref([
  '.pdf',
  '.png',
  '.jpeg',
  '.jpg',
  '.gif',
  '.bmp',
  '.mp4',
  '.avi',
  '.webm',
  '.ogg',
  '.3gp',
])
const dialogVisibleVUrlRef = ref(false)
const dialogVUrlRef = ref('')
const dialogVisibleimgRef = ref(false)
const dialogImageUrlRef = ref('')
const workTypeAcronymMapRef = ref({
  12: 'WJ',
})
const workTypeMapRef = ref({
  12: '文件',
})
const nameFieldMapRef = ref({
  12: 'doc_name',
})
const timeFieldMapRef = ref({
  12: 'print_at',
})
const actionUrlRef = ref(`${baseUrl[ENV]['fileUrl']}`)
const tokenRef = ref(sessionStorage.getItem('access_token'))
const checkedFileListRef = ref([])
const activeRowRef = ref({})
const dialogVisibleRef = ref(false)
const gdzlqdArrRef = ref([
  // {file_name:'测试',filenum:2,file_type:2,zzwjgdqk:1,dzwjgdqk:1,tpwjgdqk:2,spwjgdqk:2,attachment:[],file_typename:''}
])
const delGdzlqdArrRef = ref([])
const gdzlqdItemRef = ref({
  file_name: '',
  filenum: 0,
  file_type: '',
  zzwjgdqk: '',
  dzwjgdqk: '',
  tpwjgdqk: '',
  spwjgdqk: '',
  attachment: [],
  file_typename: '',
})
const file_typeRef = ref([
  // { value: '发文审批单', label: '发文审批单' },
  // { value: '正式文件', label: '正式文件' },
  // { value: '材料报送情况', label: '材料报送情况' },
  // { value: '报名情况', label: '报名情况' },
  // { value: '征求意见情况', label: '征求意见情况' },
  // { value: '其他', label: '其他', customText: '' },
])
// 电子文件保存情况
const dzwjgdqkRef = ref([
  { value: '排版电子版（word）', label: '排版电子版（word）' },
  { value: '排版电子版（PDF）', label: '排版电子版（PDF）' },
  {
    value: '红头/盖章/批示指示/签名扫描电子版（PDF）',
    label: '红头/盖章/批示指示/签名扫描电子版（PDF）',
  },
  { value: '无', label: '无' },
])
// 图片文件保存情况
const tpwjgdqkRef = ref([
  { value: '高清文件', label: '高清文件' },
  { value: '一般文件', label: '一般文件' },
  { value: '无', label: '无' },
])
// 视频文件保存情况
const spwjgdqkRef = ref([
  { value: '高清文件', label: '高清文件' },
  { value: '一般文件', label: '一般文件' },
  { value: '无', label: '无' },
])
// 纸质文件保存情况
const zzwjgdqkRef = ref([
  {
    value: '原件',
    label: '原件',
  },
  {
    value: '复印件',
    label: '复印件',
  },
  { value: '打印文档', label: '打印文档' },
  { value: '无', label: '无' },
])

// 计算
const nameFieldRef = computed(() => {
  return props.form[nameFieldMapRef.value[props.plantype]]
})

const timeFieldRef = computed(() => {
  return props.form[timeFieldMapRef.value[props.plantype]]
})

const workNumFieldRef = computed(() => {
  return props.form['work_num']
})

// 方法
const downRow = (list, index) => {
  if (index + 1 == list.length) {
    ElMessage.warning('已经是最后一条，下移失败')
  } else {
    nextTick(() => {
      let downData = list[index + 1]
      list.splice(index + 1, 1)
      list.splice(index, 0, downData)
    })
  }
}

const upRow = (list, index) => {
  if (index > 0) {
    nextTick(() => {
      let upData = list[index - 1]
      list.splice(index - 1, 1)
      list.splice(index, 0, upData)
    })
  } else {
    ElMessage.warning('已经是第一条，上移失败')
  }
}

const handleProgress = (event, file, fileList) => {
  if (loadingInstanceRef.value) {
    loadingInstanceRef.value.setText(`正在上传${file.name},上传进度:${file.percentage.toFixed(2)}%`)
  }
}

const download = (fileuuid, ext, filename) => {
  loadingInstanceRef.value = ElLoading.service({
    text: '正在下载中...'
  })
  let fileext = ext.toLowerCase()
  if (mime[fileext]) {
    downloadFile(fileuuid, 12).then((res) => {
      if(res!=null){
        nextTick(() => {
          // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstanceRef.value.close()
        })
        let blob = new Blob([res.data], { type: mime[fileext] }) // type为所需要下载的文件格式，以xls文件为例
        let link = document.createElement('a') // 创建a标签
        link.style.display = 'none'
        let objectUrl = URL.createObjectURL(blob)
        link.href = objectUrl
        link.setAttribute('download', filename)
        link.click()
        URL.revokeObjectURL(objectUrl)
        // this.getSomeData()
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

const handleTableHeaderStyle = ({ row, column, rowIndex, columnIndex }) => {
  if (column.label === '') {
    return {
      backgroundColor: `transparent !important`,
    }
  }
}

const getFileType = (plantype) => {
  switch (plantype) {
    case '11': //函件
    case '12': //文件
      return [
        { value: '发文审批单', label: '发文审批单' },
        { value: '正式文件', label: '正式文件' },
        { value: '材料报送情况', label: '材料报送情况' },
        { value: '报名情况', label: '报名情况' },
        { value: '征求意见情况', label: '征求意见情况' },
        { value: '其他', label: '其他', customText: '' },
      ]
    case '5': //培训计划
      return [
        { value: '培训方案', label: '培训方案' },
        { value: '培训通知', label: '培训通知' },
        { value: '培训资料', label: '培训资料' },
        { value: '总结报告', label: '总结报告' },
        { value: '其他', label: '其他', customText: '' },
      ]
  }
}
const previewUrlRef = ref(`${baseUrl[ENV]['previewUrl']}`)
const preview = (ext, path, name, index) => {
  currentIndexOfAttachmentListRef.value = index
  if (!arrExtRef.value.includes(ext)) {
    ElMessage.warning('只支持图片、PDF、视频、预览！')
  }
  attachmentPreviewObjRef.value.title = name
  // let src =
  //   window.location.host.includes('ddglyh.geo-compass.com') ||
  //   window.location.host.includes('localhost') ||
  //   window.location.host.includes('192.168.11.')
  //     ? 'http://ddglyh.geo-compass.com/fileserver/'
  //     : 'https://fxpc.mem.gov.cn/fileserver/'
  // let src = actionUrlRef.value.split(`api/v1`)[0]
  //预览文件服务地址+文件相对路径
  let src = previewUrlRef.value
  if (ext.toLowerCase() == '.pdf') {
    window.open(
      `./static/pdfJs/web/viewer.html?file=${encodeURIComponent(
        src + path
      )}`,
      '_blank'
    )
    // window.open(`./static/pdfJs/web/viewer.html?file=${encodeURIComponent('https://fxpc.mem.gov.cn/fileserver/' + path)}`, '_blank')
  } else if (arrExtRef.value.slice(1, 6).includes(ext)) {
    // window.open(encodeURIComponent('https://fxpc.mem.gov.cn/fileserver/' + path), '_blank')http://ddglyh.geo-compass.com/
    dialogVisibleimgRef.value = true
    dialogImageUrlRef.value = src + path
  } else if (arrExtRef.value.slice(6).includes(ext)) {
    // window.open(encodeURIComponent('https://fxpc.mem.gov.cn/fileserver/' + path), '_blank')http://ddglyh.geo-compass.com/
    dialogVisibleVUrlRef.value = true
    dialogVUrlRef.value = src + path
  }
}

const handleChangeFileType = (e, $index) => {
  autoFillZlName($index)
}

// TODO 报错的问题
// TODO 编辑时的提示问题
// TODO 新页面(4个)
// TODO 按钮控制
// 获取完整的编号 工作（活动）编码：首字母缩写（如会议:HY+会议召开日期+001(3位编号)）
const getFillWorkNum = () => {
  let workTypeAcrony = workTypeAcronymMapRef.value[props.plantype]
  let timeField = Array.isArray(props.form[timeFieldMapRef.value[props.plantype]])
    ? props.form[timeFieldMapRef.value[props.plantype]][0]
    : props.form[timeFieldMapRef.value[props.plantype]].substring(0, 10)
  let workNum = props.form['work_num']
  // return `${workTypeAcrony}_${timeField}_${workNum}`
  return `${workTypeAcrony}_${timeField}`

}

// 更新资料名称 资料名称是 详情文件名称字段+工作（活动）分类+工作活动编码+资料分类（可改可生成）
const getFillName = (row) => {
  return `${props.workName}_${
        props.workType//_${correctFillWorkNum}
      }_${
        getName('file_type', row.file_type) +
        (row.file_type == '其他' ? row.file_typename : '')
      }`
}

const autoFillZlName = (index) => {
  if (index === undefined) {
    gdzlqdArrRef.value.forEach((e) => {
      // 纠正组件错误的传参 "WJ_2023-05-16_WJ_2023-05-16_222"->"WJ_2023-05-16_222"
      let correctFillWorkNum =
        props.workName.split('_').length > 3
          ? props.workName.split('_').slice(2).join('_')
          : props.workName
      e.file_name = `${props.workName}_${
        props.workType
      }_${
        getName('file_type', e.file_type) +
        (e.file_type == '其他' ? e.file_typename : '')
      }`
    })
  } else {
    let correctFillWorkNum =
      props.workName.split('_').length > 3
        ? props.workName.split('_').slice(2).join('_')
        : props.workName
    gdzlqdArrRef.value[index].file_name = `${props.workName}_${
      props.workType
    }_${
      getName('file_type', gdzlqdArrRef.value[index].file_type) +
      (gdzlqdArrRef.value[index].file_type == '其他'
        ? gdzlqdArrRef.value[index].file_typename
        : '')
    }`
  }
}

// 返回枚举项的中文,要求枚举字段名在data中的属性名一致
const getName = (field, type) => {
  let data = null;
  if(field=='file_type'){
    data = file_typeRef.value;
  }else if(field=='zzwjgdqk'){
    data = zzwjgdqkRef.value;
  }else if(field=='dzwjgdqk'){
    data = dzwjgdqkRef.value;
  }else if(field=='tpwjgdqk'){
    data = tpwjgdqkRef.value;
  }else if(field=='spwjgdqk'){
    data = spwjgdqkRef.value;
  }
  if (Array.isArray(data)) {
    let res = data.find((enumV) => enumV.value == type)
    if (res !== undefined) {
      return res.label
    } else {
      return ''
    }
  }
  return ''
}

const handleDeleteFile = () => {
  activeRowRef.value.attachment = activeRowRef.value.attachment.filter(
    (file) => !checkedFileListRef.value.includes(file.uid)
  )
}

const handleBeforeUpload = (file) => {
  loadingInstanceRef.value = ElLoading.service({
    text: '正在上传中...'
  })
}

const handleSuccess = (response, file, fileList) => {
  if (response && response.code == '1') {
    activeRowRef.value.attachment.push({
      filename: response.data[0].filename,
      dow_count: response.data[0].dow_count,
      uuid: response.data[0].uuid,
      ext: response.data[0].ext,
      filename: response.data[0].filename,
      path:response.data[0].path
    })
    nextTick(() => {
      // 以服务的方式调用的 Loading 需要异步关闭
      loadingInstanceRef.value.close()
    })
    ElMessage.success('文件上传成功')
  } else {
    nextTick(() => {
      // 以服务的方式调用的 Loading 需要异步关闭
      loadingInstanceRef.value.close()
    })
    ElMessage.error('文件上传失败')
  }
}

const handleCloseDialog = () => {
  activeRowRef.value = {}
  checkedFileListRef.value = []
  dialogVisibleRef.value = false
}

const handleConfirm = () => {
  handleCloseDialog()
}

const handleBeforeClose = () => {}

const handleClickForgdzlqdAdd = () => {
  let addRow = JSON.parse(JSON.stringify(gdzlqdItemRef.value))
  addRow.file_name = getFillName(addRow)
  gdzlqdArrRef.value.push(addRow)
  return addRow
}

const handleClickForgdzlqdRmv = ($index) => {
  delGdzlqdArrRef.value.push(...gdzlqdArrRef.value.splice($index, 1))
}

const handleClickForgdzlqd = (row) => {
  dialogVisibleRef.value = true
  activeRowRef.value = row
}

const handleBatchDelFile = () => {
  if (checkedFileListRef.value.length == 0) {
    ElMessage.warning('请选择要删除的文件')
    return
  } else {
    ElMessageBox.confirm('此操作将删除文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      delFile({
          fileuuid: checkedFileListRef.value.join(','),
          plantype: props.plantype,
        })
        .then((res) => {
          if (res!=null) {
            activeRowRef.value.attachment = activeRowRef.value.attachment.filter(
              (file) => !checkedFileListRef.value.includes(file.uuid)
            )
            checkedFileListRef.value = []
            ElMessage.success('文件删除成功')
          } else {
            ElMessage.error('服务器出错，请稍后重试')
          }
        })
    })
    .catch(() => {
      ElMessage.info('已取消删除')
    })
  }
}

const handleRemoveForgdzlqd = (index) => {
  ElMessageBox.confirm('此操作将删除文件, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    delFile({
        fileuuid: activeRowRef.value.attachment[index].uuid,
        plantype: props.plantype,
      })
      .then((res) => {
        if (res!=null) {
          checkedFileListRef.value = checkedFileListRef.value.filter(
            (uuid) => uuid !== activeRowRef.value.attachment[index].uuid
          )
          activeRowRef.value.attachment.splice(index, 1)
          ElMessage.success('文件删除成功')
        } else {
          ElMessage.error('服务器出错，请稍后重试')
        }
      })
  })
  .catch(() => {
    ElMessage.info('已取消删除')
  })
}

const validateGdzlqd = () => {
  let result = true
  if (!gdzlqdArrRef.value.length) {
    ElMessage.warning('请填写归档资料清单')
    result = false
  } else {
    row: for (
      let i = 0, len = gdzlqdArrRef.value.length, arr = gdzlqdArrRef.value;
      i < len;
      i++
    ) {
      if (
          !arr[i].file_name
        ) {
          ElMessage.warning(`归档资料清单中第${i + 1}行未填写名称,请填写`)
          result = false
          break row
        }else if (
          arr[i].attachment.length == 0 &&  !(arr[i].file_type && arr[i].file_type.length && arr[i].file_type.includes('发文审批单')) &&
          ((arr[i].tpwjgdqk.length && !arr[i].tpwjgdqk.includes('无')) ||
            (arr[i].dzwjgdqk.length && !arr[i].dzwjgdqk.includes('无')) ||
            (arr[i].zzwjgdqk.length  && !arr[i].zzwjgdqk.includes('无')) ||
          (arr[i].spwjgdqk.length && !arr[i].spwjgdqk.includes('无')))
        ) {
          ElMessage.warning(`归档资料清单中第${i + 1}行未上传附件,请上传`)
          // result = false
          break row
        } else if (arr[i].attachment.length !== 0 && !(arr[i].tpwjgdqk.length ||
            arr[i].dzwjgdqk.length ||
            arr[i].zzwjgdqk.length ||
            arr[i].spwjgdqk.length)) {
          ElMessage.warning(`归档资料清单中第${i + 1}行已上传附件,但是未填写附件类型`)
          // result = false
          break row
        }
    }
  }
  return result
}

const addGdzlqd = async (planObj) => {
  let res = await createCommon({
    DataList: gdzlqdArrRef.value.map((qd) => {
      let obj = { planuuid: planObj[0].uuid, ...props.form, ...qd }
      if (props.mode == 'add') {
        delete obj.uuid
      } else if (props.mode == 'edit') {
        if (obj.uuid === props.form.uuid) {
          delete obj.uuid
        }
      }
      return obj
    }),
    tablename: 'file_menu',
    idkey: 'uuid',
  })
}

const delGdzlqd = async (all) => {
  let arrName = all ? 'gdzlqdArrRef' : 'delGdzlqdArrRef'
  if(arrName=='gdzlqdArrRef'){
    if (!gdzlqdArrRef.value.length) {
      return
    }
    let res = await deleteFileMenu({
      DataList: gdzlqdArrRef.value.map((qd) => {
        let obj = { ...props.form, ...qd }
        return obj
      }),
      tablename: 'file_menu',
      idkey: 'uuid',
    })
    if (res!=null) {
      gdzlqdArrRef.value = []
    }
  }else{
    if (!delGdzlqdArrRef.value.length) {
      return
    }
    let res = await deleteFileMenu({
      DataList: delGdzlqdArrRef.value.map((qd) => {
        let obj = { ...props.form, ...qd }
        return obj
      }),
      tablename: 'file_menu',
      idkey: 'uuid',
    })
    if (res!=null) {
      delGdzlqdArrRef.value = []
    }
  }
}

const queryGdzlqd = async (uuid) => {
  const res = await queryDataListCommon({
    tablename: 'file_menu',
    conds: [
      { field: 'planuuid', value: uuid, operator: 'EQ' },
      { field: 'px', operator: 'OBA' },
    ],
  })
  if (res!=null) {
    if (res.list.length) {
      const res2 = await getFileLists({
        planuuids: res.list.map((row) => row.uuid).join(','),
        plantype: props.plantype,
      })
      if (res2!=null) {
        let fileObj = {}
        /*
                    把res2 组织成一个类似下面的结构:
                    {
                      res2[i].planuuid:res2[i].files
                    }
                    利于与清单挂接
                  */
        res2.reduce(
          (obj, i) => (
            obj[i['planuuid']]
              ? obj[i['planuuid']].push(...i['files'])
              : (obj[i['planuuid']] = i['files']),
            obj
          ),
          fileObj
        )
        // 利于与清单挂接
        res.list.map((i) => {
          i.attachment = fileObj[i['uuid']] || []
          return i
        })
        gdzlqdArrRef.value = res.list
      }
    }
  }
}

const PreviousAndNext = (type,num) => {
  let nextSameFileIndex = 0
  let len = activeRowRef.value.attachment.length
  let i = (currentIndexOfAttachmentListRef.value + 1+len)%len
  while (i != currentIndexOfAttachmentListRef.value) {
    if (type == 'img') {
      if (arrExtRef.value.slice(1, 6).includes(activeRowRef.value.attachment[i].ext)) {
        break
      }
    } else if (type == 'video') {
      if (arrExtRef.value.slice(6).includes(activeRowRef.value.attachment[i].ext)) {
        break
      }
    }
    i = (i+1+len)%len
  }
  nextSameFileIndex = currentIndexOfAttachmentListRef.value = i
  let v = activeRowRef.value.attachment[nextSameFileIndex]
  preview(v.ext, v.path,v.filename,i)
}

// 监听
watch(
  () => props.mode,
  () => {
    file_typeRef.value = getFileType(props.plantype)
    if (props.mode == 'add') {
      file_typeRef.value.forEach((type,i) => {
          if (type.label !== '其他') {
            const addRow = handleClickForgdzlqdAdd()
            gdzlqdArrRef.value[i].file_type = type.label
            addRow.file_name = getFillName(addRow)
          }
        })
    } else if (props.mode == 'edit' && gdzlqdArrRef.value.length == 0) {
      file_typeRef.value.forEach((type,i) => {
          if (type.label !== '其他') {
            const addRow = handleClickForgdzlqdAdd()
            gdzlqdArrRef.value[i].file_type = type.label
            addRow.file_name = getFillName(addRow)
          }
        })
    }
  },
  {
    deep: true,immediate: true
  }
)

// 监听
watch(
  () => nameFieldRef.value,
  () => {
    // console.log('nameFieldRef-autoFillZlName')
    autoFillZlName()
  },
  {
    deep: true,immediate: true
  }
)

// 监听
watch(
  () => timeFieldRef.value,
  (nV, oV) => {
    // console.log(nV,'timeFieldRef-nV')
    // console.log(oV,'timeFieldRef-oV')
    if (nV && oV && nV.toString() === oV.toString()) {
      return
    }
    // console.log('timeFieldRef-autoFillZlName')
    autoFillZlName()
  },
  {
    deep: true,immediate: true
  }
)

// 监听
watch(
  () => workNumFieldRef.value,
  (nV, oV) => {
    // console.log(nV,'workNumFieldRef-nV')
    // console.log(oV,'workNumFieldRef-oV')
    if (nV && oV && nV.split('_').length !== oV.split('_').length) {
      return
    }
    // console.log('workNumFieldRef-autoFillZlName')
    autoFillZlName()
  },
  {
    deep: true,immediate: true
  }
)

//暴露给父组件使用方法
defineExpose({
  addGdzlqd,
  delGdzlqd,
  validateGdzlqd,
  queryGdzlqd
}) 
</script>
<style lang="scss" scoped>
:deep(.el-table--border, .el-table--group){
  border-top:none !important;
}
:deep(.el-table--border::after, .el-table--group::after){
  width:0px !important;
}
:deep(tr.el-table__row td:last-child){
  border-right: none !important;
  border-bottom: none !important;
  background-color: transparent !important;
}
.noBorder{
  :deep(tr.el-table__row td:nth-last-child(2)){
    border-right: none !important;
    border-bottom: none !important;
    background-color: transparent !important;
  }
}
:deep(thead tr th.el-table_1_column_10.is-leaf){
  background: transparent !important;
}
:deep(thead tr th.is-leaf:not(:last-child)){
  // background: #3f83e7;
  background: var(--table-header-bg);
  // color: white;
}
.large-font-size-button{
  font-size:20px
}
:deep(.el-dialog__title){
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  // width: 200px;
  display: block;
}
.list-description{
  text-indent: 2em;
  font-size: 14px;
  font-weight: 600;
  color: var(--theme-color);
}
.file-list{
  margin-left:3em;
  :deep(.el-checkbox__label){
    width:100%;
  }
}
.file-list.empty{
  margin-left:0em;
  height:50px;
  line-height:50px;
  text-align: center;
}
.buttons{
  display: flex;
  justify-content: flex-end;
}
.buttons *+*{
  margin-left: 5px;
  margin-right: 5px;
}
:deep(.el-dialog__header){
  padding: 20px 20px 0px !important;
}
.img-box{
  width:100%;
  height: 700px;
  overflow: scroll;
  position: relative;
  img{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .custom-slick-arrow {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #fff;
    background-color: rgba(31, 45, 61, 0.11);
    opacity: 0.3;
    z-index: 9;
    position: absolute;
    top: 45%;
    cursor: pointer;
  }
  .custom-slick-arrow:before {
    display: none;
  }
  .custom-slick-arrow:hover {
    opacity: 0.5;
  }
}
.video-wrap{
  width:100%;
  height: 700px;
  overflow: scroll;
  position: relative;
  video{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .custom-slick-arrow {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #fff;
    background-color: rgba(31, 45, 61, 0.11);
    opacity: 0.3;
    z-index: 9;
    position: absolute;
    top: 45%;
    cursor: pointer;
  }
  .custom-slick-arrow:before {
    display: none;
  }
  .custom-slick-arrow:hover {
    opacity: 0.5;
  }
}
.file-list-item {
  :deep(.el-checkbox){
    display: block;
    margin-bottom: 5px;
  }
}
.scroll-style {
  :deep(.el-table__body-wrapper::-webkit-scrollbar){
    width:5px;
    background: #ccc;
  }
}
:deep(.el-tag--small){
  width:95% !important;
  height: unset !important;
  .el-select__tags-text{
    overflow: hidden;
    white-space: normal;
  }
}
</style>
