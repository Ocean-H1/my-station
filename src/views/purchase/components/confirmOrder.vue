<template>
  <div class="confirmOrder">
    <div class="messageBox">
      <div class="title">提示信息</div>
      <div class="items">
        <div class="item">
          1、为了使您能成功购买车票，请在
          <span style="color: red"> 29分钟</span>内完成支付。
        </div>
        <div class="item">
          2、支付成功后请前往联系人邮箱（查取取票验证码邮件）或个人中心查询是否成功购票。<span
            style="color: red"
            >特别声明：支付成功并不代表购票成功，</span
          >请及时查询，如有疑问联系客服（08:00-20:00）
        </div>
        <div class="item">
          3、本网站网上退票功能将在<span style="color: red"
            >发车前2小时关闭，</span
          >关闭后只能到始发站办理退票手续。
        </div>
      </div>
    </div>
    <div class="messageBox">
      <div class="title">车票信息</div>
      <div class="table">
        <el-table
          :data="master_orderInfo.order_info"
          :header-cell-style="{
            background: '#d3e5f1',
            color: '#2d65dc',
            letterSpacing: '5px',
            textAlign: 'center',
          }"
          :cell-style="{ textAlign: 'center' }"
        >
          <el-table-column label="发车时间" prop="shuttle_shift_time">
          </el-table-column>
          <el-table-column label="始发站" prop="start_station">
          </el-table-column>
          <el-table-column label="目的站" prop="final_station">
          </el-table-column>
          <el-table-column label="乘车人" width="150">
            <template slot-scope="scope">
              <span>{{
                scope.row.passenger_name + '(' + scope.row.ticket_type + ')'
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="车票金额" prop="ticket_price">
          </el-table-column>
          <el-table-column label="操作">
            <el-button
              type="warning"
              size="mini"
              @click="$router.push('/person/allOrder')"
              >详情</el-button
            >
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="messageBox">
      <div class="title">结算信息</div>
      <div class="items">
        <div style="color: #e6a23c; font-size: 25px">
          {{ master_orderInfo.master_total_amount }} 元
        </div>
      </div>
    </div>
    <!-- 支付平台 -->
    <div class="platform">支付平台</div>
    <div class="pay">
      <!-- 支付方式 -->
      <div class="pay_mode">
        <div class="title" style="color: #409eff; font-size: 14px">
          支付方式
        </div>
        <el-radio-group v-model="pay_mode">
          <el-radio border label="扫码支付">扫码支付</el-radio>
          <el-radio border label="备选项1">备选项</el-radio>
          <el-radio border label="备选项2">备选项</el-radio>
        </el-radio-group>
      </div>
      <!-- 支付银行 -->
      <div class="pay_bank">
        <div class="title" style="color: #409eff; font-size: 14px">
          支付银行
        </div>
        <div>
          <img src="@/assets/img/bank.png" alt="" style="width:100%;">
        </div>
      </div>
    </div>

    <!-- 确认并支付 -->
    <div class="confirm_pay">
      <el-button type="warning" style="width:160px;height:45px;" @click="confirm">确认并支付</el-button>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'confirmOrder',
  data() {
    return {
      master_orderInfo: JSON.parse(this.$route.query.order) || null,
      // 支付方式
      pay_mode: '扫码支付',
    }
  },
  methods: {
    // 确认并支付
    confirm() {
      this.$router.push({
        path:'/payQrcode',
        query:{
          info: JSON.stringify({
            master_order_number: this.master_orderInfo.master_order_number
          })
        },
      })
    },
  },
  created() {},
}
</script>

<style scoped>
.messageBox {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #f5f7fa;
  height: 180px;
  margin: 5vh 0;
  align-items: center;
}
.messageBox .items {
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 80%;
  font-size: 14px;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
}
.messageBox .table {
  width: 60%;
}
.messageBox .title {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 3px;
}
.platform {
  color: #fff;
  background-color: #409eff;
  width: 120px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pay{
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 3vh 0;
}
.confirm_pay{
  text-align: center;
}
</style>
