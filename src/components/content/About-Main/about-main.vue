<template>
  <div class="about-main">
    <dl>
      <dt>关于我们</dt>
      <dd style="text-indent: 2em">
        同意建设西安市道路客运联网售票系统。该系统由西安市交通运输厅投资建设，是惠及群众、服务社会的民生工程。乘客通过“西安汽车客运票务网”购买汽车票，免收服务费
      </dd>

      <dd style="text-indent: 2em">
        西安汽车客运票务网（http://localhost:8080/first）是西安道路客运服务广大社会公众的重要窗口。由西安市交通运输厅道路运输管理局全力打造，通过集成全省道路客运信息，为广大社会公众免费提供在线汽车余票、时刻表、汽车站信息查询，网上购票以及在线咨询等综合性服务。
      </dd>

      <dd style="text-indent: 2em">
        我们承诺，将通过多项专利技术的转化和技术创新，努力改善旅客的购票体验，恪尽职守，逐步充实服务信息，扩大服务范围，完善界面效果，为广大社会公众提供更方便、快捷、丰富、优质的道路客运票务服务。
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'about-main',
}
</script>
<style scoped>
dl {
  font-family: 'Microsoft YaHei', \5fae\8f6f\96c5\9ed1, arial, \5b8b\4f53;
  font-size: 12px;
  color: #444;
  margin: 0;
  padding: 0;
}
dt {
  font-family: 'Microsoft YaHei', \5fae\8f6f\96c5\9ed1, arial, \5b8b\4f53;
  margin: 0;
  padding: 40px 0 0 0;
  font-size: 18px;
  color: #00618b;
  line-height: 2;
}
dd {
  font-family: 'Microsoft YaHei', \5fae\8f6f\96c5\9ed1, arial, \5b8b\4f53;
  margin: 0;
  padding: 0;
  font-size: 18px;
  color: #6e6e6e;
  line-height: 1.5;
  text-indent: 2em;
}
</style>