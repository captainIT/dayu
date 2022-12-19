<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { useCounterStore } from "@/stores/counter";
import { baseAxios } from "@/api/base";
import router from "@/router";
import {getLearn, getReport, postLearn, postReport} from "@/api/user";

// 响应式状态
const counter = useCounterStore();


const open = () => {
  baseAxios.post("/api/system/user/", {})
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};

const listData = ref([]);

const dialogFormVisible = ref(false);
const getDay = (data: any) => {
  return data.day.split("-").slice(1)[1];
};
const hasData = (date: any) => {
  let findItem = listData.value.find(item => item.create_time == date.day);
  if (findItem) {
    return findItem.data;
  }
  return "";
};
const form = reactive({
  name: ""
});
const currentData = ref();
const createTips = (data: any) => {
  currentData.value = data.day;
  let findItem = listData.value.find(item => item.create_time == data.day);
  if (findItem) {
    form.name = findItem.data;
  }
  dialogFormVisible.value = true;
};

const save = async () => {
  let findItem = listData.value.find(item => item.create_time == currentData.value);
    let param={
    "data":form.name, "create_time":currentData.value
  }
  const {data} = await postLearn(param)
  if (findItem) {
    findItem.data = form.name;
  } else {
    listData.value.push({ "create_time": currentData.value, "data": form.name });
  }
  form.name = "";
  dialogFormVisible.value = false;
};
// 生命周期钩子
onMounted(async () => {
  let param={}
    const {data} = await getLearn(param)
  listData.value=data

});
</script>
<template>
  <div>
    <h1>{{ $t("我的心得") }} </h1>
    <div>
      <el-calendar>
        <template #date-cell="{ data }">
          <div @click="createTips(data)">
            <span :class="data.isSelected ? 'is-selected' : ''">
              {{ getDay(data) }}
            </span>
            <span style="font-size: 6px;display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
              overflow: hidden;">{{ hasData(data) }}</span>
          </div>

        </template>
      </el-calendar>
    </div>

    <el-dialog v-model="dialogFormVisible" title="创建心得">
      <el-form :model="form">
        <el-form-item label="心得内容">
          <el-input
            v-model="form.name"
            :autosize="{ minRows: 6, maxRows: 8 }"
            type="textarea"
            placeholder="请输入"
          />
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="save">
          确认
        </el-button>
      </span>
      </template>
    </el-dialog>

  </div>
</template>

<style>

</style>
