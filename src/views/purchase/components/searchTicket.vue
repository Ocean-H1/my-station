<template>
  <div class="searchTicket">
    <!-- tabs部分 卡片化 -->
    <el-tabs type="border-card">
      <el-tab-pane :label="getCurrentDate(0)">111</el-tab-pane>
      <el-tab-pane :label="getCurrentDate(1)">配置管理</el-tab-pane>
      <el-tab-pane :label="getCurrentDate(2)">角色管理</el-tab-pane>
      <el-tab-pane :label="getCurrentDate(3)">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'searchTicket',
  data() {
    return {}
  },
  computed: {
    getCurrentDate() {
      return function (num) {
        return this.$moment().add(num, 'days').format('MM月DD日')
      }
    },
  },
}
</script>

<style scoped>
</style>
