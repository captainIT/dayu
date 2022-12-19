<script  lang="ts" setup>
import { onMounted, ref } from "vue";
import { useCounterStore } from "@/stores/counter";
import axios from "axios";
import {renderAsync} from "docx-preview";
import { useRouter } from "vue-router";
import { ElMessage} from "element-plus";
import {getReport, postReport} from "@/api/user";

// 响应式状态
const counter = useCounterStore()

const open = () => {
  ElMessage('this is a message.')
}
const reportList=ref<any>([])
// 生命周期钩子
onMounted(async () => {
  let dateNow=new Date();
  let year=dateNow.getFullYear()
  let currentMonth=dateNow.getMonth()+1
  if (currentMonth==1){
    year = year-1
  }
  // todo 补全参数
  let param={
    "start_date":``,
    "end_date":``
  }
  const {data} = await getReport(param)
  reportList.value=data

})
const createReport=async ()=> {
    let dateNow=new Date();
  let year=dateNow.getFullYear()
  let currentMonth=dateNow.getMonth()+1
  let param={
    "url":`${year}-${currentMonth}-${dateNow.getDate()}`
  }
  const {data} = await postReport(param)
}

const getDay=(data:any)=>{
  return data.day.split('-').slice(1)[1]
}
const hasData=(date:any)=>{
  let findItem=reportList.value.find((item:any)=>item.create_time==date.day)
  if (findItem){
    return true
  }
  return false
}

// const hasData=(date:any)=>{
//   console.log("===hasData====" + date+"=======");
//   // 判断是否生成过报告
//   let test=date.day.split('-').slice(1)[1]
//   if (test%2==0){
//     return true
//   }
//   return false
// }

const router = useRouter()
const goDetail=(item:any) =>{
  console.log(item)
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
          localStorage.setItem('currentReportDay',item.day)
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
    <el-button @click="createReport">生成今日报告</el-button>
    <div style="margin-top: 10px">
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
