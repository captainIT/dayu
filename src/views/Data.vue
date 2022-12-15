<script  lang="ts" setup>
import { onMounted, ref } from "vue";
import { useCounterStore } from "@/stores/counter";
import axios from "axios";
import {renderAsync} from "docx-preview";
import { useRouter } from "vue-router";
import { ElMessage} from "element-plus";

// 响应式状态
const counter = useCounterStore()


const open = () => {
  ElMessage('this is a message.')
}

// 生命周期钩子
onMounted(() => {
  console.log("=======" + 3+"=======");
})
const  oPreview=(data:any)=> {
  console.log("=======" + data+"=======");
  return "%%%%%%"
}

const getDay=(data:any)=>{
  console.log("=======" + data+"=======");
  return data.day.split('-').slice(1)[1]
}
const hasData=(date:any)=>{
  // 判断是否生成过报告
  let test=date.day.split('-').slice(1)[1]
  if (test%2==0){
    return true
  }
  return false
}

const data=ref()
const router = useRouter()
const goDetail=(item:any) =>{
  if(hasData(item)){
    ElMessageBox.confirm(
      '去查看此日报告内容？',
      '',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'success',
      }
    )
      .then(() => {
       router.push("/labeling")
      })
      .catch(() => {

      })
  }
}

</script>
<template>
  <div >
    <h1>{{$t('主页')}} </h1>
    <el-button @click="oPreview">生成今日报告</el-button>
    <div style="">
      <el-calendar>
        <template #date-cell="{ data }">
          <div :class="hasData(data) ? 'is-selected' : ''" @click="goDetail(data)">
            <p >
              {{ getDay (data) }}
            </p>
            <span >{{ hasData(data) ? '已有报告' : ''}}</span>
          </div>

        </template>
      </el-calendar>
    </div>

  </div>
</template>

<style lang="scss">
div.is-selected {
  color: #1989fa;
}
</style>
