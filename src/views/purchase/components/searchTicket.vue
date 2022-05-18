<template>
  <div class="searchTicket">
    <!-- tabs部分 卡片化 -->
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :name="getCurrentDate(0)">
        <span slot="label" @click="handleDays(-2)"
          ><i class="el-icon-date"></i> {{ getCurrentDate(0) }}</span
        >
      </el-tab-pane>
      <el-tab-pane :name="getCurrentDate(1)">
        <span slot="label"
          ><i class="el-icon-date"></i> {{ getCurrentDate(1) }}</span
        >
      </el-tab-pane>
      <el-tab-pane :name="getCurrentDate(2)">
        <span slot="label"
          ><i class="el-icon-date"></i> {{ getCurrentDate(2) }}</span
        >
      </el-tab-pane>
      <el-tab-pane :name="getCurrentDate(3)">
        <span slot="label"
          ><i class="el-icon-date"></i> {{ getCurrentDate(3) }}</span
        >
      </el-tab-pane>
      <el-tab-pane :name="getCurrentDate(4)">
        <span slot="label" @click="handleDays(2)"
          ><i class="el-icon-date"></i> {{ getCurrentDate(4) }}</span
        >
      </el-tab-pane>
    </el-tabs>

    <!-- 展示符合条件班次的table部分 -->
    <!-- 流水班 -->
    <el-table
      :data="flow_shuttle_list"
      stripe
      highlight-current-row
      :header-cell-style="{
        background: '#F56C6C',
        color: '#fff',
        letterSpacing: '5px',
        textAlign: 'center',
      }"
      :cell-style="{ textAlign: 'center' }"
      size="small"
    >
      <el-table-column label="乘车车站" prop="start_station"> </el-table-column>
      <el-table-column label="截止时间" prop="shuttle_shift_time">
      </el-table-column>
      <el-table-column label="途径站" prop="via_stations_name">
      </el-table-column>
      <el-table-column label="终点站" prop="final_region"> </el-table-column>
      <el-table-column label="班次类型" prop="shuttle_shift_type">
      </el-table-column>
      <el-table-column label="里程" prop="full_lenght"> </el-table-column>
      <el-table-column label="车型" prop="car_model"> </el-table-column>
      <el-table-column label="票价" prop="ticket_price"> </el-table-column>
      <el-table-column label="票数" prop="unuse_ticket_quantity">
      </el-table-column>
      <el-table-column label="儿童票数" prop="unuse_child_ticket_quantity">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.unuse_ticket_quantity != 0"
            size="mini"
            type="warning"
            >购票</el-button
          >
          <el-button v-else disabled size="mini" type="info">无票</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 固定班 -->
    <el-table
      :data="regular_shuttle_list"
      stripe
      highlight-current-row
      :header-cell-style="{
        background: '#068abb',
        color: '#fff',
        letterSpacing: '5px',
        textAlign: 'center',
      }"
      :cell-style="{ textAlign: 'center' }"
      size="small"
    >
      <el-table-column label="乘车车站" prop="start_station"> </el-table-column>
      <el-table-column label="发车时间" prop="shuttle_shift_time">
      </el-table-column>
      <el-table-column label="途径站" prop="via_stations_name">
      </el-table-column>
      <el-table-column label="终点站" prop="final_region"> </el-table-column>
      <el-table-column label="班次类型" prop="shuttle_shift_type">
      </el-table-column>
      <el-table-column label="里程" prop="full_lenght"> </el-table-column>
      <el-table-column label="车型" prop="car_model"> </el-table-column>
      <el-table-column label="票价" prop="ticket_price"> </el-table-column>
      <el-table-column label="票数" prop="unuse_ticket_quantity">
      </el-table-column>
      <el-table-column label="儿童票数" prop="unuse_child_ticket_quantity">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.unuse_ticket_quantity != 0"
            size="mini"
            type="warning"
            >购票</el-button
          >
          <el-button v-else disabled size="mini">无票</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'searchTicket',
  data() {
    return {
      // 计算日期的起点，默认是当天
      startDate: this.$store.getters.searchStatus.startDate || this.$moment(),
      // 默认激活的tab
      activeName:
        this.$store.getters.searchStatus.activeTab ||
        this.$moment().format('MM-DD'),
      // 流水班
      flow_shuttle_list: [],
      // 固定班
      regular_shuttle_list: [],
    }
  },
  methods: {
    // 用户点击最后一个或第一个tab的时候，通过此函数更新计算日期的 起点(默认是当天)
    handleDays(num) {
      this.startDate = this.$moment(this.startDate).add(num, 'days')
    },
    // tabs切换触发事件
    handleClick(tab, event) {
      let status = {
        shuttle_shift_date: this.$moment().year() + '-' + tab.name,
        startDate: this.startDate,
        activeTab: tab.name,
      }

      this.$store.commit('setSearchStatus', status)
      // 重新查询班次
      this.getShuttleList()
    },
    // 查询符合条件的班次线路
    async getShuttleList() {
      console.log(this.$route.query.info);
      const info = JSON.parse(this.$route.query.info)
      let shuttle_shift_date =
        this.$store.getters.searchStatus.shuttle_shift_date ||
        this.$moment().format('YYYY-MM-DD')
      const { data: res } = await this.$http.get(
        `/query/shuttle/getShuttleList`,
        {
          params: {
            start_region_id: info.start_region_id,
            final_region_id: info.final_region_id,
            shuttle_shift_date,
          },
        }
      )
      if (res.code !== 10000) {
        this.flow_shuttle_list = []
        this.regular_shuttle_list = []
        return this.$message.error(res.message)
      }
      // 保存返回的班次列表
      this.flow_shuttle_list = res.data.flow_shuttle_list
      this.regular_shuttle_list = res.data.regular_shuttle_list
    },
  },
  computed: {
    // 获取当天的日期 可以传参表示得到当天+num的日期
    getCurrentDate() {
      return function (num = 0) {
        return this.$moment(this.startDate).add(num, 'days').format('MM-DD')
      }
    },
  },
  created() {
    this.getShuttleList()
  },
}
</script>

<style scoped>
</style>
