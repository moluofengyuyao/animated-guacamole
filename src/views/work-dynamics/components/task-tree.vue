<template>
  <div class="taskTree" style="height: 100%;min-height:100%;background:#ffffff;overflow: hidden;">
    <!-- <div class="headBox" v-if="title">
      <el-radio-group
        class="headBox-radio-gp"
        fill="#4083e7"
        text-color="#fff"
        @change="changeOrgRadio"
        v-model="orgRadioRef"
      >
        <el-radio-button
          v-for="item in orgListForRef"
          :value="item.value"
          :key="item.value"
          >{{ item.label }}</el-radio-button
        >
      </el-radio-group>
    </div> -->
    <div class="qh-tree-headDiv">
      <div class="qh-tree-titleDiv">
      </div>
      <span>区划目录</span>
    </div>
    <a-tree
      :key="keysRef"
      class="leftTree"
      :default-selected-keys="selectedKeysRef"
      :defaultExpandedKeys="defaultExpandedKeysRef"
      v-model:selectedKeys="selectedKeyRef"
      v-model:expandedKeys="expandedKeysRef"
      v-model="checkedKeysRef"
      v-if="treeDataRef && treeDataRef.length"
      :show-line="true"
      show-icon
      :loadData="loadNode"
      :tree-data="treeDataRef"
      :fieldNames ="defaultPropsRef"
      @click="onCheck"
      @expand="onExpand"
      @select="onSelect"
    >
      <template #switcherIcon="{ expanded  }">
        <!-- expanded折叠为true,展开为false -->
        <DownOutlined v-if="expanded" style="width:10px;" />
        <RightOutlined v-else style="width:10px;" />
      </template>
    </a-tree>
  </div>
</template>

<script setup name="taskTree">
import { ref, watch, onMounted, createVNode } from 'vue'
import { getQhTreeBj, getQhTree, getHyRootTaskTree, getHyNextTaskTree, getDeptTrees, getDeptTreesUp } from '@/api'
import {DownOutlined, RightOutlined} from '@ant-design/icons-vue'

const props = defineProps({
  title: {
    type: String,
    default: '任务清单'
  },
  defaultSelect: {
    type: Boolean,
    default: true
  }
});
const emit = defineEmits(['getDepId', 'gethyType'])
const UserInfo = JSON.parse(decodeURIComponent(atob(sessionStorage.getItem('UserInfo'))))
const expandedKeysRef = ref([])
const orgRadioRef = ref(null)
const keysRef = ref(0)
const dep_typeRef = ref(0)
const levRef = ref(Number(UserInfo.department.dep_lev))
const simcodeRef = ref(UserInfo.department.simcode)
const selectedKeysRef = ref([])
const selectedKeyRef = ref([])
const defaultExpandedKeysRef = ref([])// 默认展开父节点
const checkedKeysRef = ref([])
const treeDataRef = ref([])
const depIdRef = ref(null)
const dep_levRef = ref(1)
const nRef = ref(0)
// 替换 treeNode 中 title,value,key,children 字段为 treeData 中对应的字段
// const defaultPropsRef = ref({
//   children: 'children',
//   // title: 'dep_name',
//   title: 'code_name',//区划名
//   key: 'id'
// })
const defaultPropsRef = ref({
  children: 'children',
  title: 'xzqh_name',//区划名
  key: 'id'
})
const orgListRef = ref([
  { bmz: 0, bmmc: '普查办' },
  // { bmz: 1, bmmc: '行业部门' },
  { bmz: 2, bmmc: '生态部门' },
  { bmz: 3, bmmc: '交通部门' },
  { bmz: 4, bmmc: '海洋部门' },
  { bmz: 5, bmmc: '住建部门' },
  { bmz: 6, bmmc: '水利部门' },
  { bmz: 7, bmmc: '气象部门' },
  { bmz: 8, bmmc: '林草部门' },
  { bmz: 9, bmmc: '地震部门' },
  { bmz: 10, bmmc: '地质部门' }
])
// const orgListForRef = ref([])

// 切换机构树事件--zyt注释
// const changeOrgRadio = async (val) => {
//   sessionStorage.setItem('treeRadio', val)
//   if (val == 0) {
//     getTableData()
//   } else if (val != 0) {
//     if (levRef.value == 1) {
//       getHyNextTaskTreeData()
//     } else {
//       let res = await getHyRootTaskTree()
//       if (res!=null && res.length>0) {
//         let treeData = res.map(item => {
//           if (item.dep_type == '*') {
//             return {
//               ...item,
//               dep_name: item.code_name + item.dep_type_name,
//               isLeaf: !!item.is_dep,
//               disableds: !item.is_dep
//             }
//           } else {
//             return {
//               ...item,
//               dep_name: item.is_dep
//                 ? item.dep_name
//                 : `${item.code_name}-${item.dep_type_name}`,
//               isLeaf: !!item.is_dep,
//               disableds: !item.is_dep
//             }
//           }
//         })
//         treeDataRef.value = treeData
//         let treeExpand = JSON.parse(sessionStorage.getItem('treeExpand'))
//         if (treeExpand && treeExpand.length) {
//           expandedKeysRef.value = treeExpand
//         } else {
//           let expande = treeData.find(v => v.simcode == simcodeRef.value)
//           if (expande) {
//             expandedKeysRef.value = [expande.id]
//           }
//         }

//         keysRef.value++

//         if (treeDataRef.value.length) {
//           if (treeDataRef.value.length && props.defaultSelect) {
//             let treeSelect = JSON.parse(
//               sessionStorage.getItem('treeSelect')
//             )
//             if (
//               !treeSelect ||
//               (treeSelect &&
//                 treeSelect.length > 0 &&
//                 treeSelect[0] == UserInfo.user.dep_id)
//             ) {
//               let uuid = ''
//               let indexs = ''
//               let id = UserInfo.user.dep_id
//               let simcode = ''
//               let dep_type = ''
//               nRef.value = 0
//               treeDataRef.value.forEach((v, i) => {
//                 if (v.id == id) {
//                   uuid = v.uuid
//                   simcode = v.simcode
//                   dep_type = v.dep_type
//                   indexs = i
//                   nRef.value++
//                 }
//               })

//               if (nRef.value > 0) {
//                 if (treeDataRef.value[indexs].isLeaf) {
//                   selectedKeyRef.value = [treeDataRef.value[indexs].id]
//                   emit('getDepId', simcode)
//                   emit('gethyType', dep_type)
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//     if (val != -2) {
//       emit('gethyType', val)
//     }
//   }
// }

// const getHyNextTaskTreeData = async () => {
//   let params
//   if (dep_typeRef.value == 0) {
//     params = JSON.stringify([
//       {
//         simcode: '0',
//         dep_lev: 1,
//         taskOrDep: 't',
//         dep_type: dep_typeRef.value == 0 ? '*' : dep_typeRef.value,
//         dep_isleader: 1
//       }
//     ])
//   } else {
//     params = JSON.stringify([
//       {
//         simcode: '0',
//         dep_lev: 1,
//         taskOrDep: 'd',
//         dep_type: dep_typeRef.value,
//         dep_isleader: 1
//       },
//       {
//         simcode: '0',
//         dep_lev: 2,
//         taskOrDep: 't',
//         dep_type: dep_typeRef.value,
//         dep_isleader: 1
//       }
//     ])
//   }
//   let res = await getHyNextTaskTree({ tj: params });
//   if (res!=null && res.length>0) {
//       res = res.filter(item => item.dep_type !== 11 && item.dep_type !== 12)
//       let treeData = res.map(item => {
//         if (item.dep_type == '*') {
//           return {
//             ...item,
//             dep_name: item.code_name + item.dep_type_name,
//             is_self: 1,
//             isLeaf: !!item.is_dep,
//             disableds: !item.is_dep
//           }
//         } else {
//           return {
//             ...item,
//             id: item.is_dep ? item.id : item.id + '*',
//             dep_name: item.is_dep
//               ? item.dep_name
//               : `${item.code_name}-${item.dep_type_name}`,
//             isLeaf: !!item.is_dep,
//             is_self: 1,
//             disableds: !item.is_dep
//           }
//         }
//       })
//       treeDataRef.value = treeData
//       let treeExpand = JSON.parse(sessionStorage.getItem('treeExpand'))
//       if (treeExpand && treeExpand.length) {
//         expandedKeysRef.value = treeExpand
//       }

//       if (dep_typeRef.value != 0) {
//         depIdRef.value = treeDataRef.value[0].id
//         if (treeDataRef.value.length && props.defaultSelect) {
//           let treeSelect = JSON.parse(
//             sessionStorage.getItem('treeSelect')
//           )
//           let uuid = ''
//           let indexs = ''
//           let id = UserInfo.user.dep_id
//           let simcode = ''
//           let dep_type = ''
//           nRef.value = 0
//           if (
//             !treeSelect ||
//             (treeSelect &&
//               treeSelect.length > 0 &&
//               treeSelect[0] == UserInfo.user.dep_id)
//           ) {
//             treeDataRef.value.forEach((v, i) => {
//               if (v.id == id) {
//                 uuid = v.uuid
//                 simcode = v.simcode
//                 dep_type = v.dep_type
//                 indexs = i
//                 nRef.value++
//               }
//             })

//             if (nRef.value > 0) {
//               selectedKeyRef.value = [id]
//             } else {
//               selectedKeyRef.value = [
//                 treeDataRef.value[treeDataRef.value.length - 1].id
//               ]
//               indexs = 0
//             }
//           }
//           emit('gethyType', dep_type)
//           emit('getDepId', simcode)
//         }
//       }
//     }
// }

// 展开/收起节点时触发
const onExpand = (expandedKeys, { expanded }) => {
  let expandedKey = JSON.stringify(expandedKeys)
  if (orgRadioRef.value == 0) {
    sessionStorage.setItem('treeExpandp', expandedKey)
  } else {
    sessionStorage.setItem('treeExpand', expandedKey)
  }
}

// const onSelect = (selectedKeys, { node }) => {
//   if (!node.dataRef.isLeaf) {
//     node.onExpand()
//   }
// }

//点击节点文字展开/收缩节点
const onSelect = (selectedKeys, { node }) => {
  selectedKeyRef.value = [node.id]
  if(node.islast==false){//有下级节点
    if(node.expanded){//已展开节点
      expandedKeysRef.value = expandedKeysRef.value.filter(item => item !== node.id) //收起节点
    }else{//已收起节点
      expandedKeysRef.value.push(node.id) //展开节点  
    }
  }
  onExpand(expandedKeysRef.value,{}) // 展开/收起节点时触发
}

const onCheck = (checkedKeys, info) => {
  let newcode = info.dataRef.xzqh_code
  emit('getDepId', newcode)
  selectedKeyRef.value = [info.dataRef.id]
  if (orgRadioRef.value == 0) {
    sessionStorage.setItem('treeSelectp', JSON.stringify(selectedKeyRef.value))
  } else {
    sessionStorage.setItem('treeSelect', JSON.stringify(selectedKeyRef.value))
  }
  //zyt--存储选择的区划simcode
  sessionStorage.setItem('simcode', newcode)
}

const tempTreeArrRef = ref([])
const tempTreeArrUpRef = ref([])
// zyt--获取上级区划
const getTreeUpByPid = (pid) => {
  let arrUp = []
  //获取区划信息
  getQhTreeBj(pid).then(res => {
    if (res!=null && res.length>0) {
      let upTreeData = res[0]
      // 设置无子节点
      upTreeData.isLeaf = true
      upTreeData.islast = true
      arrUp = [upTreeData]
      tempTreeArrUpRef.value = arrUp.concat(tempTreeArrUpRef.value)
      if(pid!=='0'){
        // 获取上级区划
        getTreeUpByPid(upTreeData.pid)
      }else{//完成查询
        //区划树--上级+本级
        treeDataRef.value = tempTreeArrUpRef.value.concat(tempTreeArrRef.value)
        // 完成查询区划树
        completeQhTree()
      }
    }
  })
}

// zyt--获取区划树
const getTableData = () => {
  treeDataRef.value = []
  tempTreeArrRef.value = []
  tempTreeArrUpRef.value = []
  //获取区划树（本级）
  getQhTreeBj(UserInfo.department.simcode).then(res1 => {
    if (res1!=null && res1.length>0) {
      let bjTreeData = res1[0]
      // 设置有子节点
      bjTreeData.isLeaf = false
      bjTreeData.islast = false
      if(bjTreeData.id!=='0'){
        tempTreeArrRef.value = [bjTreeData]
        // 获取上级区划
        getTreeUpByPid(bjTreeData.pid)
      }else{//全国
        treeDataRef.value = [bjTreeData]
        // 完成查询区划树
        completeQhTree()
      }
    }
  })
}

// 完成查询区划树
const completeQhTree = () => {
  let uuid = ''
  let indexs = ''
  let id = null
  let simcode = ''
  nRef.value = 0
  if (treeDataRef.value.length && props.defaultSelect) {
    let treeSelect = []
    if (orgRadioRef.value == 0) {
      treeSelect = JSON.parse(sessionStorage.getItem('treeSelectp'))
    } else {
      treeSelect = JSON.parse(sessionStorage.getItem('treeSelect'))
    }
    //zyt--获取存储选择的区划simcode
    let selectSimcode = sessionStorage.getItem('simcode')
    if(selectSimcode==undefined || selectSimcode==null){//默认选择登录用户所属区划
      selectSimcode = UserInfo.department.simcode
      sessionStorage.setItem('simcode',selectSimcode)
    }
    treeDataRef.value.forEach((v, i) => {
      if (v.xzqh_code === selectSimcode) {
        id = v.id
        uuid = v.pid
        simcode = v.xzqh_code
        indexs = i
        nRef.value++
      }
    })

    if (id!=null && nRef.value > 0) {
      selectedKeyRef.value = [id]
    } else {
      selectedKeyRef.value = [
        treeDataRef.value[treeDataRef.value.length - 1].id
      ]
      indexs = 0
    }
  }
  emit('getDepId', simcode)
  let treeExpand = []
  if (orgRadioRef.value == 0) {
    treeExpand = JSON.parse(sessionStorage.getItem('treeExpandp'))
  } else {
    treeExpand = JSON.parse(sessionStorage.getItem('treeExpand'))
  }
  if (treeExpand && treeExpand.length > 0) {
    expandedKeysRef.value = treeExpand
  } else {
    let expande = treeDataRef.value.find(v => v.xzqh_code == simcodeRef.value)
    if (expande) {
      expandedKeysRef.value = [expande.id]
    }
  }
  keysRef.value++
}

// zyt--异步加载
const loadNode = (node) => {
  //zyt--获取存储选择的区划simcode
  let selectSimcode = sessionStorage.getItem('simcode')
  if(selectSimcode==undefined || selectSimcode==null){//默认选择登录用户所属区划
    selectSimcode = UserInfo.department.simcode
    sessionStorage.setItem('simcode',selectSimcode)
  }
  if (orgRadioRef.value == 0) {
    return new Promise(resolve => {
      //获取区划树（下级）
      getQhTree(node.dataRef.id).then(res => {
        if (res!=null && res.length>0) {
          res = res.filter(item => item.xzqh_code !== null)
          res.forEach(c => {
            if(c.lev== '1'){//省
              if(c.xzqh_code=='71' || c.xzqh_code=='81' || c.xzqh_code=='82'){//台湾、香港、澳门无下级节点
                // 设置无子节点
                c.isLeaf = true
                c.islast = true
              }else{
                c.isLeaf = false
                c.islast = false
              }
            }else if (c.lev == '2') {//市
              c.isLeaf = false
              c.islast = false
            }else if (c.lev == '3') {//区县
              // 设置无子节点
              c.isLeaf = true
              c.islast = true
            }else{
              c.isLeaf = false
              c.islast = false
            }
          })
          node.dataRef.children = res || []
          treeDataRef.value = [...treeDataRef.value]
          if (res.length) {
            let treeSelect = JSON.parse(
              sessionStorage.getItem('treeSelectp')
            )
            let uuid = ''
            let indexs = ''
            let id = null
            let simcode = ''
            nRef.value = 0
            res.forEach((v, i) => {
              if (v.xzqh_code == selectSimcode) {
                id = v.id 
                uuid = v.pid
                simcode = v.xzqh_code
                indexs = i
                nRef.value++
              }
            })
            if (id!=null && nRef.value > 0) {
              selectedKeyRef.value = [id]
              emit('getDepId', simcode)
            }
          }
          let treeExpand = JSON.parse(sessionStorage.getItem('treeExpandp'))
          if (treeExpand && treeExpand.length > 0) {
            expandedKeysRef.value = treeExpand
          }

          resolve()
        }
      })
    })
  }
}

// 获得表格数据--zyt注释
/*const getTableDataBak = () => {
  let params = {
    dep_id: '',
    dep_type: 0,
    logdep_type: UserInfo.user.dep_type
  }
  let arr = []
  let arrUp = []
  // 获取本级及下级
  getDeptTrees(params).then(res => {
    if (res!=null && res.length>0) {
      treeDataRef.value = []
      if (dep_typeRef.value != 0) res[0].islast = true
      arr.push(res[0])
      let dep_type = 0;
      // 获取上级
      getDeptTreesUp(dep_type).then(async res => {
        if (res!=null) {
          if (res.length > 0) {
            res.forEach(v => {
              v.islast = true
            })
            arrUp.push(...res)

            if (dep_typeRef.value == '0') {
              arrUp[arrUp.length - 1].isLeaf = true
            } else {
              arrUp.splice(arrUp.length - 1, 1)
            }
          }
        }
        treeDataRef.value = arrUp.concat(arr)
        treeDataRef.value.forEach(v => {
          if (v.islast || v.islast == undefined) {
            v.isLeaf = true
          }
        })
        depIdRef.value = treeDataRef.value[0].id
        let uuid = ''
        let indexs = ''
        let id = null
        // if (orgRadioRef.value == 0) {
        //   treeSelect = JSON.parse(sessionStorage.getItem('treeSelectp'))
        // } else {
        //   treeSelect = JSON.parse(sessionStorage.getItem('treeSelect'))
        // }
        // if (treeSelect && treeSelect.length > 0) {
        //   id = treeSelect[0]
        // } else {
        //   id = UserInfo.user.dep_id
        // }
        let simcode = ''
        let dep_type = ''
        nRef.value = 0
        if (treeDataRef.value.length && props.defaultSelect) {
          let treeSelect = []
          if (orgRadioRef.value == 0) {
            treeSelect = JSON.parse(sessionStorage.getItem('treeSelectp'))
          } else {
            treeSelect = JSON.parse(sessionStorage.getItem('treeSelect'))
          }
          //zyt--获取存储选择的区划simcode
          let selectSimcode = sessionStorage.getItem('simcode')
          if(selectSimcode==undefined || selectSimcode==null){//默认选择登录用户所属区划
            selectSimcode = UserInfo.department.simcode
            sessionStorage.setItem('simcode',selectSimcode)
          }
          treeDataRef.value.forEach((v, i) => {
            if (v.simcode === selectSimcode) {
              id = v.id
              uuid = v.uuid
              simcode = v.simcode
              dep_type = v.dep_type
              indexs = i
              nRef.value++
            }
          })

          if (id!=null && nRef.value > 0) {
            selectedKeyRef.value = [id]
          } else {
            selectedKeyRef.value = [
              treeDataRef.value[treeDataRef.value.length - 1].id
            ]
            indexs = 0
          }
        }
        emit('getDepId', simcode)
        emit('gethyType', dep_type)  
        let treeExpand = []
        if (orgRadioRef.value == 0) {
          treeExpand = JSON.parse(sessionStorage.getItem('treeExpandp'))
        } else {
          treeExpand = JSON.parse(sessionStorage.getItem('treeExpand'))
        }
        if (treeExpand && treeExpand.length > 0) {
          expandedKeysRef.value = treeExpand
        } else {
          let expande = treeDataRef.value.find(v => v.simcode == simcodeRef.value)
          if (expande) {
            expandedKeysRef.value = [expande.id]
          }
        }
        keysRef.value++
      })
    }
  })
}*/

// 异步加载--zyt注释
/*const loadNodeBak = (node) => {
  //zyt--获取存储选择的区划simcode
  let selectSimcode = sessionStorage.getItem('simcode')
  if(selectSimcode==undefined || selectSimcode==null){//默认选择登录用户所属区划
    selectSimcode = UserInfo.department.simcode
    sessionStorage.setItem('simcode',selectSimcode)
  }
  if (orgRadioRef.value == 0) {
    return new Promise(resolve => {
      let params = {
        dep_id: node.dataRef.id,
        dep_type: dep_typeRef.value,
        logdep_type: UserInfo.user.dep_type
      }
      // 获取本级及下级
      getDeptTrees(params).then(res => {
        if (res!=null && res.length>0) {
          node.dataRef.children = res || []

          node.dataRef.children.forEach(v => {
            if (v.islast) {
              v.isLeaf = true
            }
          })
          treeDataRef.value = [...treeDataRef.value]
          if (res.length) {
            let treeSelect = JSON.parse(
              sessionStorage.getItem('treeSelectp')
            )
            let uuid = ''
            let indexs = ''
            let id = null
            // let treeSelect = JSON.parse(sessionStorage.getItem('treeSelectp'))
            // if (treeSelect && treeSelect.length > 0) {
            //   id = treeSelect[0]
            // } else {
            //   id = UserInfo.user.dep_id
            // }
            let simcode = ''
            let dep_type = ''
            nRef.value = 0
            res.forEach((v, i) => {
              if (v.simcode == selectSimcode) {
                id = v.id 
                uuid = v.uuid
                simcode = v.simcode
                dep_type = v.dep_type
                indexs = i
                nRef.value++
              }
            })
            if (id!=null && nRef.value > 0) {
              selectedKeyRef.value = [id]
              emit('gethyType', dep_type)  
              emit('getDepId', simcode)
            }
          }
          let treeExpand = JSON.parse(sessionStorage.getItem('treeExpandp'))
          if (treeExpand && treeExpand.length > 0) {
            expandedKeysRef.value = treeExpand
          }

          resolve()
        }
      })
    })
  }
  // return new Promise(resolve => {
  //   let params
  //   if (node.dataRef.is_self == 1 && node.dataRef.dep_type != '*') {
  //     params = JSON.stringify([
  //       {
  //         simcode: node.dataRef.simcode,
  //         dep_lev: node.dataRef.dep_lev,
  //         taskOrDep: 'd',
  //         dep_type: node.dataRef.dep_type,
  //         dep_isleader: 1
  //       },
  //       {
  //         simcode: node.dataRef.simcode,
  //         dep_lev: node.dataRef.dep_lev + 1,
  //         taskOrDep: 't',
  //         dep_type: node.dataRef.dep_type,
  //         dep_isleader: 1
  //       }
  //     ])
  //   } else if (node.dataRef.dep_type == '*') {
  //     params = JSON.stringify([
  //       {
  //         simcode: node.dataRef.simcode,
  //         dep_lev: node.dataRef.dep_lev,
  //         taskOrDep: 't',
  //         dep_type: node.dataRef.dep_type,
  //         dep_isleader: 1
  //       }
  //     ])
  //   } else if (node.dataRef.dep_type != '*') {
  //     params = JSON.stringify([
  //       {
  //         simcode: node.dataRef.simcode,
  //         dep_lev: node.dataRef.dep_lev,
  //         taskOrDep: 'd',
  //         dep_type: node.dataRef.dep_type,
  //         dep_isleader: 1
  //       }
  //     ])
  //   }
  //   getHyNextTaskTree({ tj: params }).then(res => {
  //       if (dep_typeRef.value == 0) {
  //         res =  res.filter(item => item.dep_type !== 12)
  //       }
  //       node.dataRef.children = res.map(item => {

  //           if (item.dep_type == '*') {
  //           return {
  //             ...item,
  //             dep_name: item.code_name + item.dep_type_name,
  //             is_self: node.dataRef.is_self ? node.dataRef.is_self : 0,
  //             isLeaf: !!item.is_dep,
  //             disableds: !item.is_dep
  //           }
  //         } else {
  //           return {
  //             ...item,
  //             id: item.is_dep ? item.id : item.id + '*',
  //             dep_name: item.is_dep
  //               ? item.dep_name
  //               : `${item.code_name}-${item.dep_type_name}`,
  //             isLeaf: !!item.is_dep,
  //             is_self: node.dataRef.is_self ? node.dataRef.is_self : 0,
  //             disableds: !item.is_dep
  //           }
  //         }
  //       })
  //       treeDataRef.value = [...treeDataRef.value]
  //       if (res.length>0) {
  //         let uuid = ''
  //         let indexs = ''
  //         let id = null
  //         // let treeSelect = JSON.parse(sessionStorage.getItem('treeSelect'))
  //         // if (treeSelect && treeSelect.length > 0) {
  //         //   id = treeSelect[0]
  //         // } else {
  //         //   id = UserInfo.user.dep_id
  //         // }
  //         let simcode = ''
  //         let dep_type = ''
  //         nRef.value = 0
  //         res.forEach((v, i) => {
  //           if (v.simcode == selectSimcode) {
  //             id = v.id 
  //             uuid = v.uuid
  //             simcode = v.simcode
  //             dep_type = v.dep_type
  //             indexs = i
  //             nRef.value++
  //           }
  //         })

  //         if (id!=null && nRef.value > 0) {
  //           selectedKeyRef.value = [id]
  //           emit('gethyType', dep_type)  
  //           emit('getDepId', simcode)
  //         }
  //       }
  //       let treeExpand = JSON.parse(sessionStorage.getItem('treeExpand'))
  //       if (treeExpand && treeExpand.length > 0) {
  //         expandedKeysRef.value = treeExpand
  //       }
  //       resolve()

  //   })
  // })
}*/

// 监听
// watch(
//   () => dep_typeRef.value,
//   () => {
//     if (typeof dep_typeRef.value !== 'undefined') {
//       getTableData()
//     }
//   },
//   {
//     deep: true,immediate: true
//   }
// )

// 监听
watch(
  () => simcodeRef.value,
  () => {
    if (typeof simcodeRef.value !== 'undefined') {
      getTableData()
    }
  },
  {
    deep: true,immediate: true
  }
)

onMounted(() => {
  dep_typeRef.value = 0
  orgRadioRef.value = 0
  //清空
  sessionStorage.setItem('treeSelectp', JSON.stringify([]))
  sessionStorage.setItem('treeExpandp', JSON.stringify([]))
  // if (dep_typeRef.value == 1) {
  //   dep_typeRef.value = 0
  // }
  // if (
  //   dep_typeRef.value == 0
  // ) {
  //   orgListForRef.value = [
  //     {
  //       label: '普查办',
  //       value: 0
  //     },
  //     {
  //       label: '行业部门',
  //       value: -2
  //     }
  //   ]
  // } else {
  //   let data = orgListRef.value.find(item => item.bmz == dep_typeRef.value)
  //   orgListForRef.value = [
  //     {
  //       label: '普查办',
  //       value: 0
  //     },
  //     {
  //       label: data.bmmc,
  //       value: data.bmz
  //     }
  //   ]
  // }
  // let treeRadio = sessionStorage.getItem('treeRadio')
  // if (treeRadio) {
  //   orgRadioRef.value = treeRadio * 1
  // } else {
  //   orgRadioRef.value = dep_typeRef.value
  //   sessionStorage.setItem('treeRadio', orgRadioRef.value)
  // }

  // changeOrgRadio(orgRadioRef.value)
})
</script>

<style lang="scss" scoped>
// .headBox {
//   position: relative;
//   line-height: 30px;
//   height: 30px;
//   margin-top: 10px;
//   margin-left: 15px;
// }

// .headBox .title {
//   color: #4083e7;
//   margin-left: 16px;
//   font-size: 14px;
//   text-align: left;
//   font-weight: bold;
// }
.qh-tree-headDiv {
  position: relative;
  line-height: 40px;
  height: 40px;
  margin-top: 0px;
  margin-left: 15px;
  width: 100%;
  border-bottom: 1px solid rgb(78, 146, 111);
  font-size: 18px;
  font-weight: 500;
  color: #4e926f;
  .qh-tree-titleDiv {
    position: absolute;
    top: 12px;
    width: 5px;
    height: 17px;
    background: #4e926f;
    border-radius: 5px;
    
    &::before {
      content: "";
      width: 4px;
      height: 13px;
      background: #f1ba22;
      border-radius: 5px;
      position: absolute;
      z-index: 2;
      left: 3px;
      top: 2px;
    }
  }
  span {
    display: inline-block;
    margin-left: 12px;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #037064;
  }
}

.leftTree {
  height: calc(100% - 37px);
  overflow-y: auto;
}

:deep(.ant-tree){
  height: calc(100% - 40px)!important;
  overflow: auto;
  padding: 10px;
}
</style>
