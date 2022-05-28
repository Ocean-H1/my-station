<template>
  <div class="payQrcode">
    <img :src="QRcodeUrl" width="300px">
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
    }
  },
  methods: {
    confirmAndPay() {
         this.$http
        .request({
          url: `/order/payOrder?master_order_number=${this.master_order_number}`,
          responseType: 'blob',
          methods: 'get',
        })
        .then((res) => {
          // 将后台返回的二进制图片流转换
          const myBlob = new window.Blob([res.data], { type: 'image/png' })
          this.QRcodeUrl = window.URL.createObjectURL(myBlob)
        })
        .catch((err) => {
          console.log(err)
        })
    },

  },
  created() {
    this.confirmAndPay()
  },
}
</script>

<style scoped>
</style>
