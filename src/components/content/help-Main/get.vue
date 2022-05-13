<template>
    <div class="get">
        <dl>
                    <dt>说明：</dt>
                    <dd>答： 方式一：凭乘车人二代身份证原件或者取票验证码在始发车站自助取票机上取票（未配置自助取票机的车站请选择方式二取票）</dd>
                    <dd>答： 方式二：综合窗口取票：凭乘车人二代身份证原件和取票验证码在始发车站售票大厅综合窗口取票。</dd>
                    <dt>购买目的城市的返程票怎么取票？</dt>
                    <dd>答：购买目的城市的返程票请在到达目的城市后，在始发车站通过自动取票机或者在综合窗口进行取票。</dd>
                    <dt>如何获取取票验证码？</dt>
                    <dd>答：购票成功后，系统将向您注册时提供的邮箱和购票时填写的手机号码发送取票验证码，您也可以在个人中心里面查询。</dd>
                    <dt>要是到车站已经发车了，网上买的票还能取出来吗?</dt>
                    <dd>答：发车后一小时以内均能取票，取票后请到车站综合窗口办理退票。</dd>
                    <dt>车站自助机上能取到其他车站的车票吗?</dt>
                    <dd>答：不能，只支持乘客在车站取本站始发客车的车票。</dd>
                    <dt>购票成功验证码领取吗?</dt>
                    <!-- <dd>答：请登陆首页点击“取票验证码”，填写乘车人手机号码即可找回。</dd> -->
                    <dd><img src="../../../../src/assets/img/5.png" alt=""></dd>
                    <dt>如果错过了最晚退票时间，还能取到纸质车票作为报销凭证吗？</dt>
                    <dd>答：成都出发的乘客在发车当日内可以在始发车站自助取票机上取出车票作为报销凭证；非成都出发的城市和地区车站可以在发车后24小时内在始发车站取出车票作为报销凭证。</dd>
                </dl>
    </div>
</template>
<script>
export default {
    name:'get'
}
</script>
<style scoped>
.get{
        padding: 1.25rem;
}
dl{
    font-family: "Microsoft YaHei",\5fae\8f6f\96c5\9ed1,arial,\5b8b\4f53;
    color: #444;
    margin: 0;
    padding: 0;
}
dt{
    font-family: "Microsoft YaHei",\5fae\8f6f\96c5\9ed1,arial,\5b8b\4f53;
    margin: 0;
    font-size: 1.125rem;
    color: #00618b;
    line-height: 2;
}
dd{
    font-family: "Microsoft YaHei",\5fae\8f6f\96c5\9ed1,arial,\5b8b\4f53;
    margin: 0;
    padding: 0;
    font-size: 1.125rem;
    color: #6e6e6e;
    line-height: 1.5;
}
</style>