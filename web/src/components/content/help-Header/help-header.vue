<template>
  <div class="help-header">
    <el-tabs type="card" v-model="activeName" stretch>
      <el-tab-pane label="如何购票" name="buy">
        <buy></buy>
      </el-tab-pane>
      <el-tab-pane label="如何支付" name="pay">
        <pay></pay>
      </el-tab-pane>
      <el-tab-pane label="如何取票" name="get">
        <get></get>
      </el-tab-pane>
      <el-tab-pane label="如何退票" name="returntick">
        <returntick></returntick>
      </el-tab-pane>
      <el-tab-pane label="购票须知" name="purchase">
        <purchase></purchase>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import buy from '../help-Main/buy.vue'
import pay from '../help-Main/pay.vue'
import get from '../help-Main/get.vue'
import returntick from '../help-Main/returntick.vue'
import purchase from '../help-Main/purchase.vue'

export default {
  name: 'Home-Tabbar',
  data() {
    return {
      activeName: 'buy',
    }
  },
  methods: {},
  components: {
    buy,
    pay,
    get,
    returntick,
    purchase,
  },
  created() {
    // 拿到参数，修改选项卡激活项
    this.activeName = this.$route.query.choice || 'buy'
  },
}
</script>

<style scoped>
</style>