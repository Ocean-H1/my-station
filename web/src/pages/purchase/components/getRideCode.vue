<template>
  <div class="getRideCode">
    <div class="info">
      <span style="color: #67c23a">{{ totalPrice }}(元)</span
      >支付成功！您的乘车码是<span class="ride_code">{{ rideCode }}</span
      >,请妥善保管。
    </div>
  </div>
</template>

<script>
export default {
  name: 'getRideCode',
  data() {
    return {
      // 乘车码
      rideCode: '',
      totalPrice: this.$route.query.total_amount,
      master_order_number: this.$route.query.out_trade_no,
    };
  },
  methods: {
    //   获得乘车码
    async getRideCode() {
      const { data: res } = await this.$http.get(
        `/order/getRideCode?master_order_number=${this.master_order_number}`,
      );
      if (res.code !== 10000) {
        return this.$message.error(res.message);
      }

      // 保存乘车码
      this.rideCode = res.data.ride_code;
      this.$emit('getSteps', 4);
    },
  },
  mounted() {
    this.getRideCode();
  },
};
</script>

<style scoped>
.getRideCode {
  margin-top: 10vh;
}
.info {
  font-size: 20px;
  letter-spacing: 3px;
  text-align: center;
}
.ride_code {
  display: inline-block;
  padding: 5px;

  color: #f56c6c;
  font-weight: 600;
  font-size: 30px;
  text-decoration: underline;
  text-underline-offset: 5px;
}
</style>
