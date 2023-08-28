<template>
    <div class="refund-main">
     <h1>退 票</h1>
     <h6>
         <span>已取票乘客：</span>
        "&nbsp;已取得车票乘客，请持车票到始发站的“综合窗口”办理退票。"
     </h6>
     <h6>
         <span>未取票乘客：</span>
         " 网站购票未取票旅客，直接登录本网站使用退票功能即可。网上退票功能将在发车前2小时关闭，关闭后您只能到始发站退票。"
     </h6>
     <h3>特此声明：</h3>
     <div class="step">
         <p class="index">根据交通运输部、物价局的相关规定以及联网车站的有关规定，旅客退票将按下列标准向始发站支付退票费  <br>（退票费直接从购票款中扣除）。</p>
         <p class="index">1、当次客运班车开车时间两小时前办理退票，按票面金额的10%收取退票费，不足5角不计收，不足1元按5角计收。</p>
         <p class="index">2、当次客运班车开车时间前两小时以内办理退票，按票面金额的20%收取退票费，不足5角不计收，不足1元按5角计收。</p>
         <p class="index">3、当次客运班车开车后一小时内办理退票，按票面金额的50%收取退票费，不足5角不计收，不足1元按5角计收(此标准只适用于成都地区部分车站，详情请咨询车站)。</p>
         <p class="index">4、当日退票需当日在车站营业时间内办理，最后一班车票退票需在发车前办理。</p>
         <p class="index">5、因不可抗拒原因或始发站原因造成客运班车停运，汽车客运票务网将通过您预留的手机号码短信通知您退票。</p>
         <p class="index">6、因各车站退票规定有差异，本网站将以各车站实际规定代扣退票手续费。</p>
         <p class="index">7、在网上退票又需要退票单据作为报销凭证时，旅客在该票的退票状态为“退票成功”后24小时以内，可到发车站售换票窗口办理。</p>
         <p class="index">8、网上退票的票款根据您持卡所在银行不同，预计7个工作日内退款到您的原支付账户。</p>
     </div>
     <div class="stepBottom">
         <!-- <a href="javascript:login();" title="明白了，我要退票">明白了，我要退票</a> -->
     </div>
</div>
</template>
<script>
export default {
  name: 'refund-main',
}
</script>

<style scoped>
.refund-main{
    /* padding:2.5rem; */
    border: #DCDFE6;
        border: blue;
    /* padding: 1.25rem; */
}
.refund-main h1{
    text-align: center;
    font-size: 2.2rem;
    color: #e27500;
    font-weight: normal;
}
h6 span{
    color: #e27500;;
}
.refund-main h6,.refund-main p{
    margin: 1.25rem;
    font-size: 1.2rem;
    font-weight: normal;
    color: #00618b;
}
.refund-main h6{
    padding-top: .525rem;  
}
.refund-main p.index{
text-indent: 1.625rem;
margin: 0;
}
.refund-main h3{
    color: #00618b;
    display: block;
    font-size: 1.5rem;
    margin: 1rem;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}
.stepBottom{
       text-align: center;
}
a{
    cursor: pointer;
    display: inline-block;
    width: 23.65rem;
    height: 3.9875rem;
    line-height: 3.9875rem;
    border-radius: .3438rem;
    background: #f1b000;
    font-size: 1.65rem;
    /* line-height: 58px; */
    color: #fff;
    border: none;
    text-decoration: none;
    outline: none;
    margin: 1.125rem;
}
</style>



