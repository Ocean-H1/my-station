<template>
  <div class="searchTicket">
    <!-- tabs部分 卡片化 -->
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :name="getCurrentDate(0)">
        <span slot="label"
          ><i class="el-icon-date"></i> {{ getCurrentDate(0) }}</span
        >
        1
      </el-tab-pane>
      <el-tab-pane :name="getCurrentDate(1)">
        <span slot="label"
          ><i class="el-icon-date"></i> {{ getCurrentDate(1) }}</span
        >
        2
      </el-tab-pane>
      <el-tab-pane :name="getCurrentDate(2)">
        <span slot="label"
          ><i class="el-icon-date"></i> {{ getCurrentDate(2) }}</span
        >
        3
      </el-tab-pane>
      <el-tab-pane :name="getCurrentDate(3)">
        <span slot="label"
          ><i class="el-icon-date"></i> {{ getCurrentDate(3) }}</span
        >
        4
      </el-tab-pane>
      <el-tab-pane :name="getCurrentDate(4)">
        <span slot="label" @click="addDays(2)"
          ><i class="el-icon-date"></i> {{ getCurrentDate(4) }}</span
        >
        5
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'searchTicket',
  data() {
    return {
      startDate: this.$moment(),
      activeName: this.$moment().format('MM-DD')
    }
  },
  methods: {
    addDays(num) {
      this.startDate = this.$moment(this.startDate).add(num, 'days')
    },
    // 处理选项卡切换事件
    handleClick(tab,event) {
        console.log(tab.name);
    }
  },
  computed: {
    getCurrentDate() {
      return function (num) {
        return this.$moment(this.startDate).add(num, 'days').format('MM-DD')
      }
    },
  },
}
</script>

<style scoped>
</style>
