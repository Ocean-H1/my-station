<template>
  <div class="QRcode">
    <a href="http://localhost:8080/first"><h2>西安客运票务网</h2></a>
    <div class="row"></div>
    <div id="divPay">
      <div class="payinfowx">
        <p>
          支付金额
          <span class="price" v-for="(item, index) in 1" :key="index">
            {{ list.master_total_amount }}
          </span>
          <label id="tipMsg">请扫描下方二维码完成支付</label>
        </p>
        <div class="qrCode">
          <img :src="qrcodeUrl" alt="二维码" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'QRcode',
  data() {
    return {
      list: {},
      qrcodeUrl: '',
    }
  },
  created() {
    this.info()
    this.getimg()
    this.time()
    this.open1()
  },
  beforeDestroy() {
    this.destroy()
  },
  computed: {
    myObj: {
      get: function () {
        return this.list // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      },
    },
  },
  methods: {
    open1(){
    this.$message({
      showClose: true,
    })
    },
    //请求
    loop() {
      var vm = this
      this.$http
        .get(
          '/order/payOrderVerify?master_order_number=' +
            window.sessionStorage.getItem('master_order_number')
        )
        .then(function (res) {
          window.sessionStorage.setItem('code', res.data.code)
          console.log(res)
          if (window.sessionStorage.getItem('code') == 10000) {
            vm.$router.push({path:'success'})
          }
        }).catch(function(){
        })
    },
    //设置定时器
    time() {
      this.timer = setInterval(this.loop, 2000)
    },
    destroy() {
      clearInterval(this.timer)
    },

    //得到二维码
    getimg() {
      this.$http
        .request({
          url:
            '/order/payOrder?master_order_number=' +
            window.sessionStorage.getItem('master_order_number'),
          responseType: 'blob',
          methods: 'get',
        })
        .then((res) => {
          console.log(window.sessionStorage.getItem('master_order_number'))
          console.log(res)
          const myblob = new window.Blob([res.data], { type: 'image/png' })
          this.qrcodeUrl = window.URL.createObjectURL(myblob)
          console.log(this.qrcodeUrl)
        })
    },
    //拿到钱数
    info() {
      var getlocaldata = sessionStorage.getItem('localdata')
      var jsonobj = JSON.parse(getlocaldata)
      this.list = jsonobj
    },
  },
}
</script>
<style scoped>
.qrCode {
  background: lightcyan;
  width: 19rem;
  height: 19rem;
  position: relative;
  left: 50%;
  top: 50%;
  margin-top: -4.5rem;
  margin-left: -9.5rem;
}
.price {
  color: orange;
}
.row {
  width: 100%;
  height: 0.15rem;
  background: lightskyblue;
}
a {
  text-decoration: none;
}
p {
  color: #333;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 3.125rem;
  font-size: 1.5rem;
  font-weight: 500;
}
h2 {
  font-size: 1.5rem;
  color: red;
  display: block;
  width: 100%;
  height: 3.125rem;
  line-height: 3.125rem;
  text-indent: 1.25rem;
  font-weight: 500;
}
img {
  display: inline-block;
  width: 20rem;
  height: 20rem;
}
</style>