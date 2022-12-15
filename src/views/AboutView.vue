<script setup lang="ts">
import { onMounted } from 'vue'
import { useCounterStore } from "@/stores/counter";


// 生命周期钩子
onMounted(() => {
})
</script>
<template>
  <div >
    <h1>{{$t('settings')}} </h1>
    <div>修改用户信息</div>
  </div>
</template>

<style>

</style>
