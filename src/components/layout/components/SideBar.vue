<template>
  <div class="sideBar">
    <MenuItem v-for="n in menus" v-bind="n"  v-model:selectedMenu="selectedMenu" ></MenuItem>

  </div>
</template>

<script setup>

// Data: '数据',
//   Labeling: '标注',
//   Model: '模型',

import { onUpdated, ref, toRaw, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

const menus=[{ name: "主页", route: "/data",testKey:1 }, {
  name: "报告查看",
  route: "/labeling",testKey:2,

}, { name: "我的心得", route: "/model",testKey:3 }, { name: "帮助", route: "/settings",testKey:4 }]

const selectedMenu=ref(1)
const router=useRouter()

watchEffect(() => {
  router.getRoutes().map((item, index) => {
    if(item.path === router.currentRoute.value.path){
      menus.forEach((itemMenu) =>{
        if(itemMenu.route== item.path){
          selectedMenu.value=itemMenu.testKey
        }
      })
    }
  })
})

</script>

<style scoped lang="scss">
.sideBar {
  margin-top: 60px;
  padding-top: 20px;
}
</style>