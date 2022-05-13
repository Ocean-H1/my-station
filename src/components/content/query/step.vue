<template>
    <div class="step">
        <!-- 余票查询的头部 -->
      <ul >
				<li class="one "><i class="icon_find"></i><span>1.车票查询</span></li>
				<li class="two"><i class="icon_order"></i><span>2.提交订单</span></li>
				<li class="three"><i class="icon_cof"></i><span>3.确认并支付</span></li>
				<li class="four"><i class="icon_succ"></i><span>4.购票成功</span></li>
			</ul> 
    </div>
</template>

<script>
export default {
  name:'step'
}
</script>

<style scoped>
*{
        font-family: "Microsoft YaHei",\5fae\8f6f\96c5\9ed1,arial,\5b8b\4f53;

}
.step{
      /* width: 53.75rem; */
      margin-top: 1.25rem;
}
.step  ul {
  display: flex;
  border: 2px solid lightsalmon;
}
.step ul li {
  height: 3.75rem;
  line-height: 3.75rem;
  text-align: center;
  float:left;
  flex: 1;
  background-size: 10rem 3.75rem;

}
.step .clearfix li .one{
}
</style>