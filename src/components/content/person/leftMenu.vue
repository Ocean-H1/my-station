<template>
  <div class="menu">
    <div class="card">
      <div class="title">
        <h1>账户管理</h1>
      </div>
      <div class="list">
        <div v-for="(item,index) in userManager" :key="index">
          <router-link :class="$route.meta.title == item.text?'active' :'' " :to="'/person/'+item.href">
            {{item.text}}
          </router-link>
        </div>
      </div>

      <div class="title">
        <h1 class="mt-2">订单管理</h1>
      </div>
      <div class="list order">
        <div v-for="(item,index) in orderManager" :key="index">
          <router-link :class="$route.meta.title == item.text?'active' :'' " :to="'/person/'+item.href">
            {{item.text}}
          </router-link>
        </div>
      </div>
    </div>
    <div class="call">
      <h3>服务电话</h3>
      <div class="icons">
        <img src="~@/assets/img/tubiao.jpg" alt="">
        <p>xxx-xxx-xxxx</p>
      </div>
      <div>
        <small>
          服务电话咨询时间 (08:00-20:00)
        </small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userManager: [
        {
          icon: '',
          text: '基本资料',
          href: ''
        },
        {
          icon: '',
          text: '修改密码',
          href: 'changePassword'
        },
        {
          icon: '',
          text: '常用乘车人',
          href: 'passenger'
        },
        {
          icon: '',
          text: '常用联系人',
          href: 'contacts'
        },
      ],
      orderManager: [
        {
          icon: '',
          text: '所有订单',
          href: 'allOrder'
        },
        {
          icon: '',
          text: '已支付单',
          href: 'paidOrder'
        },
        {
          icon: '',
          text: '待支付单',
          href: 'waitOrder'
        },
        {
          icon: '',
          text: '退款完成',
          href: 'refundOrder'
        },
      ]
    }
  },
  created () {

  }
}
</script>

<style scoped>
.list a {
  position: relative;
}
.list a::after {
  content: '';
  position: absolute;
  height: 20px;
  width: 20px;
  background: url(~@/assets/img/allpic.png);
  background-position: 0 0;
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
}
.list>div:nth-of-type(2) a::after{
  background-position: 0 -153px;
}
.list>div:nth-of-type(3) a::after{
  background-position: 0 -111px;
}
.list>div:nth-of-type(4) a::after{
  background-position: 0 -427px;
}

.order>div:nth-of-type(1) a::after{
  background-position: 0 -192px;
}
.order>div:nth-of-type(2) a::after{
  background-position: 0 -260px;
}
.order>div:nth-of-type(3) a::after{
  background-position: -3px -227px;
}
.order>div:nth-of-type(4) a::after{
  background-position: -3px -336px;
}
.card {
  border: 1px solid #eee;
  background: #f9f9f9;
  padding: 20px 0;
  border-radius: 10px;
}
.card .title {
  text-align: center;
  padding: 20px 0 10px 0;
}
.card a {
  display: block;
  color: #252525;
  font-size: 14px;
  line-height: 40px;
  text-decoration: none;
  border-bottom: 1px solid #ccc;
  padding-left: 40px;
}
.card a.active {
  color: #fff;
  background-color: #2eaae8 !important;
}
.card a:hover {
  background-color: #f0eff0;
}
.mt-2 {
  margin-top: 2rem;
}
.call .icons {
  display: flex;
  align-items: center;
  padding: 10px 0;
}
.call .icons img {
  flex: 0 0 20%;
}
.call .icons p {
  font-size: 14px;
  color: #000;
  padding: 0;
}
.call small {
  font-size: 12px;
}
</style>