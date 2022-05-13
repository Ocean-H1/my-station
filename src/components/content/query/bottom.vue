<template>
  <div class="bottom">
    <!-- 车型说明 -->
    <div class="car">
      <p>车型说明：同班线路,车型越高,票价越高,舒适度越高。</p>
      <!-- <div id="hint" style="display: block; color: rgb(0, 0, 255); font-size: 13px; padding-left: 10px;"></div> -->
      <!-- <p>西安客运站</p> -->
    </div>

    <!-- 流水班车  -->
    <div id="c01">
      <p style="color: #af0609">
        流水班：即滚动发车，乘客须在截止时间之前到站乘车。
      </p>
      <div class="flow-water">
        <table
          class="table_list"
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
        >
        <!-- 车型说明 -->
          <tbody>
            <tr class="stwo1">
              <td class="stationName" width="10%" height="35">乘车车站</td>
              <td class="start" width="16%">截止时间</td>
              <td class="stationName" width="10%">途经站</td>
              <td class="stationName" width="10%">终点站</td>
              <td class="classType" width="8%">班次类型</td>
              <td class="mileage" width="9%">里程</td>
              <td class="stationName" width="10%">车型</td>
              <td class="priceNumber" width="6%">票价</td>
              <td class="priceNumber" width="6%">票数</td>
              <td class="child" width="8%">免票儿童数</td>
              <td class="operation" width="7%">操作</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div> 
  </div>
</template>
<script>
export default {
  name: 'bottom',
  data() {
    return {}
  },
  created: function () {
  },
  // 钩子函数，初始化页面完成以后，在对dom结点进行相关操作
  mounted() {
    window.getticket = this.getticket
  },
  methods: {
  getticket(e){
      console.log(e)
      var str = e.className
      var j = str.substr(4, 1)
            console.log(j)
      console.log(j,'uuuuuuuuuuuuuuuu')
      this.$http
        .get(
		'/query/shuttle/getShuttleList?start_region_id='+ window.sessionStorage.getItem('start_region_id') + '&final_region_id=' + window.sessionStorage.getItem('final_region_id') + '&shuttle_shift_date=' + window.sessionStorage.getItem('shuttle_shift_date'),
        )
        .then(function (res) {
          console.log('ddddddddddd')
          console.log(res)
          //转换成字符串
          var strinfomation = JSON.stringify(res.data.data.flow_shuttle_list[j])
          //存起来
          window.sessionStorage.setItem('locadata', strinfomation)
          console.log(window.sessionStorage.getItem('locadata'))
        })
      var result = confirm('温馨提示：购票后请到窗口办理取票!')
      if (result === true) {
        if (this.$store.state.isLogin === 1) {
          this.$router.push({path:'placeorder'})
        } else {
          alert('请先登陆')
          this.$router.push({path:'login'})
        }
      }
    },
  },
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
.stwo1 {
  line-height: 1.125rem;
  padding: 0.2125rem;
  font-size: 0.7875rem;
  overflow: hidden;
  background-color: lightpink;
}
tr {
  background: lightcyan;
}
</style>



