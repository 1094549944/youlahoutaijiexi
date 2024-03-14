<script setup lang="ts">
import { ref } from "vue";
import variables from "@/styles/variables.module.scss";
defineProps<{ msg: string }>();

const count = ref(0);
const { pkg } = __APP_INFO__;
</script>

<template>
  <div>
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <hr />
    <el-icon size="16" color="red">
      <Edit />
    </el-icon>
    <hr />
    <svg-icon icon-class="refresh" spin />
    刷新
    <hr />
    <div class="test-css">测试是否引入了颜色</div>
    <hr />
    <div :style="{ 'background-color': variables['bgColor'] }">
      测试全局使用
    </div>
    <hr />
    <button class="bg-blue w-80 h-10 ml-10 m-1">button</button>
    <hr />
    <div class="animate__animated animate__bounce">An animated element</div>
    <hr />
  </div>
</template>

<style scoped lang="scss">
.read-the-docs {
  color: #888;
}
.test-css {
  width: 100px;
  height: 100px;
  background-color: $bg-color;
}
</style>
