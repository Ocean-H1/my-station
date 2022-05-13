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
                  @click="toPay"
                  style="margin-right: 10px;"
                >
                  支付
                </el-button>
                <el-popconfirm
                  title="是否确认取消？"
                  icon="none"
                  @confirm="handleCancel(row.row.master_order_number)"
                >
                  <el-button slot="reference" size="small" type="danger"
                  >取消订单</el-button
                  >
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="history">
          您暂无 相关记录，如需购票请
          <router-link to="/">点击这里</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      start_time: '',
      end_time: '',
      tableData: [],
    }
  },

  mounted() {
    this._getOrderInfo({ order_status: 'arrearage' })
  },

  methods: {
    handleCancel(orderID){
      console.log(orderID);
      this._cancelOrder({master_order_number: orderID})
    },

    toPay() {
      this.$router.push({ path: '/qrcode' })
    },

    _cancelOrder(params) {
      this.$http
        .request({
          url: `/order/cancelOrder?master_order_number=${params.master_order_number}`,
          method: 'get',
        })
        .then((result) => {
          console.log(result.data)
          if (result.data.code === 10000) {
            this._getOrderInfo({ order_status: 'arrearage' })
          }
        })
    },

    _getOrderInfo(params) {
      this.$http
        .request({
          url: '/order/getOrderInfo',
          method: 'get',
          params,
        })
        .then((result) => {
          console.log(result.data)
          if (result.data.code === 10000) {
            result.data.data?.order_list.forEach((element) => {
              element.children = []
            })
            this.tableData = result.data.data.order_list
          }else {
            this.tableData  = []
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