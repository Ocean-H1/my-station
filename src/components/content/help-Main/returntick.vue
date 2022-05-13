<template>
    <div class="returntick">
        <dl>
                    <dt>重要提示：</dt>
                    <dd style="text-indent:2em;">1、网上改签功能暂未开通，您需要到始发站取票后在综合窗口办理相关手续。</dd>
                    <dd style="text-indent:2em;">2、根据交通运输部《客规》交通运输厅、物价局的规定退票手续费标准如下所列（退票费直接从购票款中扣划）：</dd>
                    <dd style="text-indent:4em;">A、当次客运班车开车时间两小时前办理退票，按票面金额的10%收取退票费，不足5角不计收，不足1元按5角计收；</dd>
                    <dd style="text-indent:4em;">B、当次客运班车开车时间前两小时以内办理退票，按票面金额的20%收取退票费，不足5角不计收，不足1元按5角计收；</dd>
                    <dd style="text-indent:4em;">C、当次客运班车开车后一小时内办理退票，按票面金额的50%收取退票费，不足5角不计收，不足1元按5角计收；</dd>
                    <dd style="text-indent:4em;">D、当次客运班车发车一小时后，不再办理退票；</dd>
                    <dd style="padding-left:2em;">3、因不可抗拒原因或始发站原因造成客运班车停运，汽车客运票务网将通过您预留的手机号码短信通知您退票，同时还在网站的最新动态栏目滚动播出。购票后请关注以上信息。</dd>
                    <dd style="padding-left:2em;">4、网上退票功能将在发车时刻前2小时关闭，关闭后只能到始发站办理退票手续。</dd>
                    <dd style="padding-left:2em;">5、因各车站退票规定有差异，本网站将以各车站实际规定代扣退票手续费。</dd>
                    <dt>如何退票？</dt>
                    <dd>答：请先登录网站，然后点击网站导航栏“退票”按钮进入退票操作页面，按提示操作即可。另外也可以登录网站后在“订单管理”里操作退票。</dd>
                    <dt>退款多久能到帐？</dt>
                    <dd>答：根据您付款平台不同，一般会在7个工作日内退款到您当时支付的卡上。</dd>
                    <dt>网上买的票到车站退需要身份证吗?</dt>
                    <dd>答：如果您已经取出车票后需要退票，请乘车人持车票、本人身份证或取票验证码前往始发车站综合窗口办理退票。</dd>
                    <dt>问：使用信用卡支付，如何退款？</dt>
                    <dd>答：各大银行信用卡退款一般没有短信服务，请您确认您的信用卡是否开通消费撤销的短信通知服务功能，若未开通此功能，请查询您的信用卡账单明细。</dd>
                </dl>
    </div>
</template>
<script>
export default {
    name:'returntick'
}
</script>
<style scoped>
.returntick{
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