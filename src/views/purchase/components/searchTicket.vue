<template>
  <div class="searchTicket">
    <el-row :gutter="20">
      <!-- 左侧主体内容区 -->
      <el-col :span="17">
        <!-- tabs部分 卡片化 -->
        <el-tabs
          type="border-card"
          v-model="activeName"
          @tab-click="handleClick"
        >
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
          <el-table-column label="乘车车站" prop="start_station">
          </el-table-column>
          <el-table-column label="截止时间" prop="shuttle_shift_time">
          </el-table-column>
          <el-table-column label="途径站" prop="via_stations_name">
          </el-table-column>
          <el-table-column label="终点站" prop="final_region">
          </el-table-column>
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
              <el-button v-else disabled size="mini" type="info"
                >无票</el-button
              >
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
          <el-table-column label="乘车车站" prop="start_station">
          </el-table-column>
          <el-table-column label="发车时间" prop="shuttle_shift_time">
          </el-table-column>
          <el-table-column label="途径站" prop="via_stations_name">
          </el-table-column>
          <el-table-column label="终点站" prop="final_region">
          </el-table-column>
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
      </el-col>
      <!-- 右侧查询组件 直接复用 Home-Inquire -->
      <el-col :span="7">
        <HomeInquire></HomeInquire>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HomeInquire from '@/components/content/Home-Inquire/home-inquire.vue'
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
      // 点击tab的时候将路由参数result 也就是从HomeInquire传递过来的结果清空
      if (this.$route.query.result) {
        this.$route.query.result = ''
      }
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
    // 路由参数变化时的处理函数
    hanldeRouteChange() {
      // 如果参数中已有结果 则直接展示
      if (this.$route.query.result) {
        const routeParams = JSON.parse(this.$route.query.result)
        this.regular_shuttle_list = routeParams.regular_shuttle_list
        this.flow_shuttle_list = routeParams.flow_shuttle_list

        this.startDate =
          this.$store.getters.searchStatus.startDate || this.$moment()
        this.activeName =
          this.$store.getters.searchStatus.activeTab ||
          this.$moment().format('MM-DD')
        return
      }
      // 否则重新发起查询请求
      this.getShuttleList()
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
  components: {
    HomeInquire,
  },
  watch: {
    // 路由参数变化时，重新查询
    $route: 'hanldeRouteChange',
  },
}
</script>

<style scoped>
.el-row {
  width: 100%;
}
</style>
