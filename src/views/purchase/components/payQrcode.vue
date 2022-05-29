<template>
  <div class="payQrcode">
    <div class="title">
      支付金额<span style="color: #e6a23c; font-weight: 700"
        >{{ totalPrice }}(元)</span
      >请扫描下方二维码完成支付
    </div>
    <img :src="QRcodeUrl" width="300px" />
  </div>
</template>

<script>
export default {
  name: 'payQrcode',
  data() {
    return {
      master_order_number: JSON.parse(this.$route.query.info)
        .master_order_number,
      // 支付二维码的URL
      QRcodeUrl: '',
      // 需要支付的金额
      totalPrice: this.$route.query.totalPrice,
      // 定时器
      timer: null,
    }
  },
  methods: {
    // 提交订单并获得支付二维码
    confirmAndPay() {
      this.$http
        .request({
          url: `/order/payOrder?master_order_number=${this.master_order_number}`,
          responseType: 'blob',
          methods: 'get',
        })
        .then((res) => {
          if(res.status !== 200 ){
            return this.$message.error('获取支付二维码失败!')
          }
          // 将后台返回的二进制图片流转换
          const myBlob = new window.Blob([res.data], { type: 'image/png' })
          this.QRcodeUrl = window.URL.createObjectURL(myBlob)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 查询用户是否支付成功
    async payOrderVerify() {
      const { data: res } = await this.$http.get(
        `/order/payOrderVerify?master_order_number=${this.master_order_number}`
      )
      if (res.code === 10000) {
        // 支付成功
        this.$message.success('支付成功！')
        clearInterval(this.timer)
        this.$emit('getSteps', 4)
        this.$router.push({
          path: '/purchase/getRideCode',
          query: {
            master_order_number: this.master_order_number,
            totalPrice: this.totalPrice,
          },
        })
      }
    },
  },
  created() {
    this.confirmAndPay()
    this.payOrderVerify()
    // 每10秒发送一次查询请求
    this.timer = setInterval(() => {
      this.payOrderVerify()
    }, 1000 * 10)
  },
  destroyed() {
    // 清除定时器
    clearInterval(this.timer)
  },
}
</script>

<style scoped>
.payQrcode {
  margin-top: 10vh;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
}
.title {
  font-size: 20px;
  letter-spacing: 2px;
}
</style>
