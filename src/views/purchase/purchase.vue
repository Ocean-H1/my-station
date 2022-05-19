<template>
  <div class="purchase">
    <!-- 顶部步骤条部分 -->
    <el-steps
      :active="activeStep"
      finish-status="success"
      simple
      style="margin-top: 20px"
    >
      <el-step title="车票查询"></el-step>
      <el-step title="提交订单"></el-step>
      <el-step title="确认并支付"></el-step>
      <el-step title="购票成功"></el-step>
    </el-steps>

    <!-- 路由占位符 -->
    <div class="content">
      <router-view></router-view>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'purchase',
  data() {
    return {
      // 激活的步骤条index
      activeStep: 0,
    }
  }
}
</script>

<style scoped>
.content {
  margin: 5vh 0;
}
</style>
