<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { useCounterStore } from "@/stores/counter";
import { baseAxios } from "@/api/base";
import router from "@/router";

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

const listData = ref([{
  "date": "2022-12-21",
  "value": "这是我的心得21"
}, {
  "date": "2022-12-23",
  "value": "这是我的心得23"
}, {
  "date": "2022-12-27",
  "value": "这这是我的心得27这是我的心得27这是我的心得27这是我的心得27这是我的心得27这是我的心得27这是我的心得27这是我的心得27这是我的心得27是我的心得27"
}, {
  "date": "2022-12-29",
  "value": "这是我的心得29"
}, {
  "date": "2022-12-12",
  "value": "这是我的心得112"
}]);

const dialogFormVisible = ref(false);
const getDay = (data: any) => {
  return data.day.split("-").slice(1)[1];
};
const hasData = (date: any) => {
  let test = date.day.split("-").slice(1)[1];
  let findItem = listData.value.find(item => item.date == date.day);
  if (findItem) {
    return findItem.value;
  }
  return "";
};
const form = reactive({
  name: ""
});
const currentData = ref();
const createTips = (data: any) => {
  currentData.value = data.day;
  console.log("=======" + data.day + "=======");
  let findItem = listData.value.find(item => item.date == currentData.value);
  if (findItem) {
    form.name = findItem.value;
  }

  dialogFormVisible.value = true;
};

const save = () => {
  let findItem = listData.value.find(item => item.date == currentData.value);
  if (findItem) {
    findItem.value = form.name;
  } else {
    listData.value.push({ "date": currentData.value, "value": form.name });
  }
  form.name = "";
  dialogFormVisible.value = false;
};
// 生命周期钩子
onMounted(() => {
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
