<script setup lang="ts">
import { onMounted } from 'vue'
import { useCounterStore } from "@/stores/counter";
import axios from "axios";
import { renderAsync } from "docx-preview";



const  oPreview=()=> {
  axios({
    method: "get",
    responseType: "blob", // 因为是流文件，所以要指定blob类型
    url: "./test.docx", // 自己的服务器，提供的一个word下载文件接口
  }).then(({ data }) => {
    console.log(data); // 后端返回的是流文件
    renderAsync(data, document.getElementById("container")); // 渲染到页面
  });
}
// 生命周期钩子
onMounted(() => {
  oPreview()
})
</script>
<template>
  <div >
    <h1>{{$t('报告查看')}} </h1>
    <div id="container" ></div>
  </div>
</template>

<style>

</style>
