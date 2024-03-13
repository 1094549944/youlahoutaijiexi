<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);
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
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
