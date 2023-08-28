<template>
  <div class="allOrder cards">
    <div class="order">
      <div class="order-title">
        <span>> 我的订单</span>
      </div>
      <div class="order-body">
        <div class="search">
          <span class="text">购票时间:</span>
          <div class="start-time time">
            <span>从</span>
            <el-date-picker
              v-model="start_time"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
          <div class="start-time time">
            <span>到</span>
            <el-date-picker
              v-model="end_time"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
          <div class="btn">
            <el-button type="success">筛选</el-button>
          </div>
        </div>
        <div class="result">
          <el-table
            :data="tableData"
            style="width: 100%"
            :header-cell-style="{ textAlign: 'center' }"
            :cell-style="{ textAlign: 'center' }"
            row-key="order_id"
            border
            lazy
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            <el-table-column
              prop="master_order_number"
              label="订单号"
              width="240"
            >
            </el-table-column>
            <el-table-column
              prop="shuttle_shift_time"
              label="发车时间"
              width="180"
            >
            </el-table-column>
            <el-table-column prop="total_amount" label="价钱">
            </el-table-column>
            <el-table-column prop="order_status" label="状态">
            </el-table-column>
            <el-table-column prop="start_region" label="始发地">
            </el-table-column>
            <el-table-column prop="final_region" label="到达地">
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="row">
                <el-button
                  type="primary"
                  size="small"
                  @click="getOrderDetail(row.row.master_order_number)"
                  style="margin-right: 10px"
                >
                  订单详情
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="toggle">
            <el-pagination
              layout="prev, pager, next"
              :total="total"
              background
              :page-size='queryForm.size'
              @current-change="handleCurrentChange"
            >
            </el-pagination>
          </div>
        </div>
        <div class="history">
          您暂无 相关记录，如需购票请
          <router-link to="/">点击这里</router-link>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="isShowOrderDetail" width="70%">
      <el-table
        :data="subTableData"
        style="width: 100%"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
        row-key="order_id"
        border
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="master_order_number" label="订单号" width="240">
        </el-table-column>
        <el-table-column prop="shuttle_shift_time" label="发车时间" width="180">
        </el-table-column>
        <el-table-column prop="total_amount" label="价钱"> </el-table-column>
        <el-table-column prop="order_status" label="状态"> </el-table-column>
        <el-table-column prop="start_region" label="始发地"> </el-table-column>
        <el-table-column prop="final_region" label="到达地"> </el-table-column>
        <el-table-column prop="ticket_type" label="票种"> </el-table-column>
        <el-table-column prop="card_type" label="证件类型"> </el-table-column>
        <el-table-column prop="card_number" label="证件号码"> </el-table-column>
        <el-table-column prop="refund_amount" label="退款金额">
        </el-table-column>
        <el-table-column prop="ride_code" label="乘车码"> </el-table-column>
        <el-table-column prop="start_station" label="城西客运站">
        </el-table-column>
        <el-table-column prop="final_station" label="兴平客运站">
        </el-table-column>
        <el-table-column prop="ticket_price" label="票价"> </el-table-column>
        <el-table-column prop="station_fee" label="站台费"> </el-table-column>
        <el-table-column prop="refund_fee" label="退款手续费">
        </el-table-column>
        <el-table-column prop="insurance_price" label="保险费">
        </el-table-column>
        <el-table-column prop="insurance_status" label="保险状态">
        </el-table-column>
        <el-table-column prop="shuttle_shift_type" label="班次类型">
        </el-table-column>
        <el-table-column prop="line_type" label="线路类型"> </el-table-column>
        <el-table-column prop="car_model" label="车辆型号"> </el-table-column>
        <el-table-column prop="shift_id" label="班次号"> </el-table-column>
        <!-- <el-table-column prop="order_operation_log" label="班次类型"> </el-table-column> -->
        <el-table-column label="操作" width="180">
          <template slot-scope="row">
            <el-popconfirm
              title="是否确认退票？"
              icon="none"
              @confirm="handleRefund(row.row.master_order_number, 'single')"
            >
              <el-button slot="reference" size="small" type="primary"
              >退票</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      start_time: '',
      end_time: '',
      tableData: [],
      isShowOrderDetail: false,
      subTableData: [],
      queryForm: {
        page: 1,
        size: 6
      },
      total: 0
    }
  },

  mounted() {
    this._getOrderInfo({ order_status: 'refund' })
  },

  methods: {
    // 获取子订单
    getOrderDetail(orderId) {
      this.isShowOrderDetail = true
      this._getSubOrder({
        master_order_number: orderId,
      })
    },

    // 监听页码改变
    handleCurrentChange(newPage) {
      this.queryForm.page = newPage
      this._getOrderInfo()
    },

    _getOrderInfo(params) {
      this.$http
        .request({
          url: `/order/getOrderInfo?page=${this.queryForm.page}&size=${this.queryForm.size}`,
          method: 'get',
          params,
        })
        .then((result) => {
          console.log(result.data)
          if (result.data.code === 10000) {
            result.data.data.order_list.forEach((element) => {
              element.children = []
            })
            this.tableData = result.data.data.order_list
          }
          this.total= result.data.total
        })
    },

    _getSubOrder(params) {
      this.$http
        .request({
          url: '/order/getOrderDetailInfo',
          method: 'get',
          params,
        })
        .then((result) => {
          console.log(result.data)
          if (result.data.code === 10000) {
            this.subTableData = result.data.data.order_detail_list
          }
        })
    },
  },
}
</script>

<style scoped>
.allOrder {
  padding: 10px 20px;
}
.order-title {
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #f0f0f0;
}
.order-title span {
  font-weight: bold;
  color: #7d7d7d;
  border-bottom: 2px solid #2577e3;
}
.search {
  margin: 50px 0 80px 0;
  display: flex;
  align-items: center;
  background: #dce9ef;
  padding: 10px 20px;
  font-size: 12px;
}
.search .text {
  margin: 0 20px;
  color: #000000;
  font-size: 12px;
  font-weight: 100;
}
.search .time {
  font-size: 14px;
}
.search .time span {
  margin: 0 20px;
}
.search .btn {
  margin-left: 20px;
}
.toggle {
  text-align: right;
  margin-top: 40px;
}
.toggle .val{
  margin: 0 10px;
}
.history{
  font-size: 12px;
}
.history a{
  color: red;
}
</style>