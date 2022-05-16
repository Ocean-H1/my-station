<template>
  <div class="hotline">
    <!-- 标题 -->
    <div class="title">
      <div>热门线路</div>
    </div>
    <!-- tabs标签页 -->
    <el-tabs stretch v-model="activeName">
      <el-tab-pane name="first" label="今日">
        <HotlineTable :choice="activeName"></HotlineTable>
      </el-tab-pane>
      <el-tab-pane name="second" label="明日">
        <HotlineTable :choice="activeName"></HotlineTable>
      </el-tab-pane>
      <el-tab-pane name="third">
        <span slot="label">{{getCurrentDate(2)}}</span>
        <HotlineTable :choice="activeName"></HotlineTable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import HotlineTable from './hotline-table'

export default {
  components: { HotlineTable },
  name: 'hotline',
  data() {
    return {
      activeName: 'first',
    }
  },
  computed: {
    getCurrentDate() {
      return function (num) {
        return this.$moment().add(num, 'days').format('MM月DD日')
      }
    },
  },
  methods: {},
}
</script>

<style scoped>
.hotline {
  display: flex;
  flex-direction: column;
}
.title {
  background-color: #068abb;
  width: 100%;
}
.title div {
  float: left;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.6rem;
  color: #fff;
}
</style>
