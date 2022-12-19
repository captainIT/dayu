<script setup lang="ts">
import { onMounted } from 'vue'
import { useCounterStore } from "@/stores/counter";


// 生命周期钩子
onMounted(() => {
})
</script>
<template>
  <div >
    <h1>{{$t('设置')}} </h1>
    <div>个人资料</div>
    <el-divider border-style="dashed" />

    <div style="margin-bottom: 20px">
      <span style="margin-right: 20px;font-weight: 700">姓名:</span>
      <span >吴彦祖</span>
    </div>
    <div>
      <span style="margin-right: 20px;font-weight: 700">手机号:</span>
      <span>13569425582</span>

    </div>
  </div>
</template>

<style>

</style>
