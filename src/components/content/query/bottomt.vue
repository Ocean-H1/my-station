<template>
  <div class="bottomt">
    <!-- 固定班车 -->
    <div id="c02">
      <div class="wflow">
        <p class="blue">固定班：乘客须按发车时间准时乘车。</p>
      </div>
      <div class="fixed">
        <table
          class="table_list_two"
          border="0"
          cellspacing="0"
          cellpadding="0"
        >
          <tbody>
            <tr class="stwo2">
              <td class="stationName" width="10%" height="35">乘车车站</td>
              <td class="start" width="16%">发车时间</td>
              <td class="stationName" width="10%">途经站</td>
              <td class="stationName" width="10%">终点站</td>
              <td class="classType" width="8%">班次类型</td>
              <td class="mileage" width="9%">里程</td>
              <td class="stationName" width="10%">车型</td>
              <td class="priceNumber" width="6%">票价</td>
              <td class="priceNumber" width="6%">票数</td>
              <td class="child" width="8%">免票儿童数</td>
              <td clsss="operation" width="7%">操作</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'bottomt',
  data() {
    return {}
  },
  created: function () {},
    // 钩子函数，初始化页面完成以后，在对dom结点进行相关操作
  mounted() {
    window.getticket = this.getticket
  },
  methods:{
      getticket(e) {
      var str = e.className
      var j = str.substr(4, 1)
      console.log(j)
      this.$http
        .get(
		'/query/shuttle/getShuttleList?start_region_id='+ window.sessionStorage.getItem('start_region_id') + '&final_region_id=' + window.sessionStorage.getItem('final_region_id') + '&shuttle_shift_date=' + window.sessionStorage.getItem('shuttle_shift_date'),
        )
        .then(function (res) {
           console.log(window.sessionStorage.getItem('start_region_id'))
      console.log(window.sessionStorage.getItem('final_region_id'))
      console.log(window.sessionStorage.getItem('shuttle_shift_date'))
          console.log('gagagagagaga')
          console.log(res)
          //转换成字符串
          var strinfomation = JSON.stringify(res.data.data.regular_shuttle_list[j])
          //存起来
          window.sessionStorage.setItem('locadata', strinfomation)
        })
      var result = confirm('温馨提示：购票后请到窗口办理取票!')
      if (result === true) {
        if (this.$store.getters.isLogin) {
          this.$router.push({ path: 'placeorder' })
        } else {
          alert('请先登陆')
          this.$router.push({ path: 'login' })
        }
      }
    },
  }
}
</script>

<style scoped>
* {
  font-family: 'Microsoft YaHei', \5fae\8f6f\96c5\9ed1, arial, \5b8b\4f53;
  margin: 0;
  padding: 0;
}
.car p,
#c01 p,
.blue {
  font-size: 0.9375rem;
  line-height: 1.3125rem;
  white-space: nowrap;
  color: #666;
  font-weight: 100;
  padding: 0.6625rem;
  /* font-weight: bold; */
}
#c01 p {
  color: red;
}
.blue {
  color: darkcyan;
}
.in {
  position: absolute;
  top: 8.7rem;
  left: 49.8rem;
}
.flow-water,
.fixed {
  font-size: 0.7875rem;
  color: #444;
  margin-top: 0.6625rem;
  border: 1px solid #6abdf1;
}
table {
  font-size: 0.7875rem;
  border-collapse: collapse;
  border-spacing: 0;
  background-color: #fff;
  width: 100%;
  border: 1px solid #fff;
  text-align: center;
  overflow: hidden;
  color: #403c3b;
}
.stwo1,
stwo2 {
  line-height: 1.125rem;
  padding: 0.2125rem;
  font-size: 0.7875rem;
  overflow: hidden;
  background-color: lightpink;
}
.stwo2 {
  background-color: lightskyblue;
}
tr {
  background: lightcyan;
}
span input {
  font-family: tahoma;
  /* 设置一个元素的垂直对齐方式。 */
  vertical-align: baseline;
  border: 0 none;
  color: #fafafa;
  cursor: pointer;
  height: 1.2875rem;
  padding-bottom: 2px;
  text-align: center;
  width: 3.1625rem;
  line-height: 1.2875rem;
  background: lightsalmon;
}
</style>



