<template>
  <div class="buy">
    <dl>
      <dt id="abcd1">问：如何注册？</dt>
      <dd>
        答：1、您可以登录汽车客运票务网电脑网页，右上角点击注册按钮，填写相应邮箱或手机号码及密码，并请认真阅读《注册须知服务条款》后进行注册。
      </dd>
      <dd><img src="../../../../src/assets/img/首页.png" width="100%" /></dd>
      <!-- <dd>2、您也可以通过手机下载四川汽车客运票务网APP应用软件（国徽图案），在手机端点击“登录”按钮进入登录界面后点击“注册”，通过填写手机号码及密码进行注册。</dd>
						<dd><img src="https://image.scqckypw.com/static/new/images/help_reg_app1.png" width="45%"><img src="https://image.scqckypw.com/static/new/images/help_reg_app2.png" width="45%"></dd> -->
      <dt>问：在汽车客运票务网电脑网页注册的账号能否在手机客户端使用？</dt>
      <dd>
        答：您在汽车客运票务网任意渠道注册的账号可以在本网站下任意购票渠道中使用。
      </dd>
      <dt>问：注册后能注销账号吗？</dt>
      <dd>答：抱歉，本网站及下属产品不支持注销账号。</dd>
      <dt id="abcd2">问：如何找回密码？</dt>
      <dd>
        答：点击登录按钮进入登录界面，选择“点击这里找回密码”；或者，您也可以拨打客服电话4008583030，通过人工重置找回密码。
      </dd>
      <dd>
        <img src="https://image.scqckypw.com/static/new/images/cd3.png" />
      </dd>
      <dt>问：一个手机号码可以注册几次？</dt>
      <dd>答：一个手机号码只能注册一次。</dd>
      <dt>二、如何下单</dt>
      <dd>
        <img
          src="https://image.scqckypw.com/static/new/images/homestep.jpg"
          width="100%"
        />
      </dd>
      <dt>问：如何选择班次？</dt>
      <dd>
        答：在“出发城市”、“到达城市”输入框输入简要的城市拼音首字母，充分利用输入框智能提示功能选择出发城市。
      </dd>
      <dd>例如：如何查询成都发往眉山的汽车票呢？</dd>
      <dd>
        ① 分别在“出发城市”、“到达城市”输入“成都”、“眉山”，或者简拼“cd”、“ms”
      </dd>
      <dd>
        ② 输入框将自动弹出系统相匹配的城市名称，分别选择最相匹配的“成都”和
        “眉山”
      </dd>
      <dd>③ 选择“乘车时间”点击“搜索”</dd>
      <dd>④ 选择所需的班次后点击“购票”</dd>
      <dt>问：如何下单？</dt>
      <dd>
        答：选择所需班次并点击“购票”后，进入订单填写页面，请核实您要购买的车票信息并仔细阅读右边的“重要提示”后，根据页面提示，填写相应联系人信息及乘车人信息，带红色星号标志为必填项。若乘车人不止一位，请点击“添加一位乘车人”，在提交订单前，请仔细阅读《购票须知》。
      </dd>
      <dt>问：如何支付款项？</dt>
      <dd>
        答：点击“提交订单”后，将进入支付页面，请咨询阅读“提示信息”并再次核实“车票信息”是否与您的出行计划一致。汽车客运票务提供的第三方支付平台为“银联网银”，支付前请确认您的银行卡是否有银联标示，是否开通网银功能。若您的卡没有银联标示或未开通网银，则无法支付，请更换符合条件的银行卡进行支付。
      </dd>
      <dt>问：点击“确认并支付”后页面无反应是怎么回事？</dt>
      <dd>
        答：点击“确认并支付”后，汽车客运票务网将跳转到第三方支付平台“银联网银”，若无法跳转，请确认您当前的网络是否畅通，若网络畅通仍然无法跳转，建议使用IE8以上浏览器或者火狐浏览器下单支付。
      </dd>
      <dt>问：成功跳转到银联支付界面，无法输入密码怎么办？</dt>
      <dd>
        答：请检查您的浏览器是否屏蔽了插件，请允许网银所需插件运行，或根据相应支付银行页面的提示进行操作。若仍无法解决问题，请咨询相应支付银行的客服为您解答。
      </dd>
    </dl>
  </div>
</template>
<script>
export default {
  name: 'buy',
}
</script>
<style scoped>
.buy {
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