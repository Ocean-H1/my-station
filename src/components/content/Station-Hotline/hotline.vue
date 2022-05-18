<template>
  <div class="hotline">
    <!-- 标题 -->
    <div class="title">
      <div>热门线路</div>
    </div>
    <!-- tabs标签页 -->
    <el-tabs stretch v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :name="getCurrentDate(0)" label="今日"> </el-tab-pane>
      <el-tab-pane :name="getCurrentDate(1)" label="明日"> </el-tab-pane>
      <el-tab-pane :name="getCurrentDate(2)">
        <span slot="label">{{ getCurrentDate(2) }}</span>
      </el-tab-pane>
    </el-tabs>
    <HotlineTable></HotlineTable>
  </div>
</template>

<script>
import HotlineTable from './hotline-table'

export default {
  components: { HotlineTable },
  name: 'hotline',
  data() {
    return {
      activeName: this.$moment().format('MM-DD'),
    }
  },
  computed: {
    getCurrentDate() {
      return function (num) {
        return this.$moment().add(num, 'days').format('MM-DD')
      }
    },
  },
  methods: {
    handleClick(tab, e) {
      let status = {
        shuttle_shift_date: this.$moment().year() + '-' + tab.name,
        startDate: this.$moment(),
        activeTab: tab.name,
      }
      
      this.$store.commit('setSearchStatus', status)
    },
  },
  created() {
    // 每次跳转到首页时，恢复车票查询
    let status = {
        shuttle_shift_date: this.$moment().format('YYYY-MM-DD'),
        startDate: this.$moment(),
        activeTab: this.$moment().format('MM-DD'),
      }
    this.$store.commit('setSearchStatus', status)
  }
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
