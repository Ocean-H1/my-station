<template>
  <div class="pay">
    <dl>
      <dt>1、如何支付?</dt>
      <dd>
        答：您可以选择“银联网银”，选择相应银行进行支付。
        <br />
        <img
          alt="支付入口"
          src="../../../../src/assets/img/1.png"
          width="80%"
        />
      </dd>
      <dt>2、支付后验证信息只能发送到注册人手机上吗?</dt>
      <dd>
        答：在乘车人信息录入页面联系电话号码，可以填写乘车人联系号码，系统将发送至该号码。
      </dd>
      <dt>3、支付成功后没收到短信通知怎么办?</dt>
      <dd>
        答：请在支付完成30分钟后在票务网查看您“个人中心”里的订单详情，若状态显示为“待取票”且显示有取票验证码，则表示购票成功；若状态显示“已作废”则表示购票失败，若您已确实支付了票款，该票款将在7个工作日内自动退还至原支付账户上。如有疑问请及时拨打服务电话：
        400-858-3030。
      </dd>
      <dt>4、点击进入相应支付页面，填写相关支付信息后无法支付，怎么办?</dt>
      <dd>
        答：我平台仅提供支付跳转链接，若您已经进入相应支付渠道，而无法支付，请您联系相应银行客服进行咨询。
      </dd>
    </dl>
  </div>
</template>
<script >
export default {
  name: 'pay',
}
</script>
<style scoped>
.pay {
  padding: 1.25rem;
}
dl {
  font-family: 'Microsoft YaHei', \5fae\8f6f\96c5\9ed1, arial, \5b8b\4f53;
  color: #444;
  margin: 0;
  padding: 0;
}
dt {
  font-family: 'Microsoft YaHei', \5fae\8f6f\96c5\9ed1, arial, \5b8b\4f53;
  margin: 0;
  font-size: 1.125rem;
  color: #00618b;
  line-height: 2;
}
dd {
  font-family: 'Microsoft YaHei', \5fae\8f6f\96c5\9ed1, arial, \5b8b\4f53;
  margin: 0;
  padding: 0;
  font-size: 1.125rem;
  color: #6e6e6e;
  line-height: 1.5;
}
</style>