<template>
  <div class="purchase">
    <!-- 顶部步骤条部分 -->
    <el-steps
      :active="activeStep"
      finish-status="success"
      simple
      style="margin-top: 20px"
      ref="stepRef"
    >
      <el-step title="车票查询"></el-step>
      <el-step title="提交订单"></el-step>
      <el-step title="确认并支付"></el-step>
      <el-step title="购票成功"></el-step>
    </el-steps>

    <!-- 路由占位符 -->
    <div class="content">
      <router-view @getSteps="setStep"></router-view>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'purchase',
  data() {
    return {
      // 默认激活的步骤条
      activeStep: Number(window.sessionStorage.getItem('activeStep')) || 0,
    }
  },
  methods:{
    setStep(step) {
      // step组件的active属性需要一个number类型的值，所以取出来的时候先转成Number
      window.sessionStorage.setItem('activeStep',step)
      this.$forceUpdate();
    },
  },
}
</script>

<style scoped>
</style>
