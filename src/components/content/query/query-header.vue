<template>
  <div class="query-header">
    <!-- 导航栏 -->
    <!--stretch标签撑开 -->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" stretch>
      <!-- 使用插槽自定义标签的内容，并且可以修改样式-->
      <el-tab-pane class="el-tabs" name="first"
        ><span slot="label" class="style">{{ getdate1() }} </span>
        <bottom></bottom>
        <table>
          <!-- 流水班 -->
          <tbody class="show-ticket-one" id="flow1"></tbody>
        </table>
        <bottomt></bottomt>
        <table>
          <!-- 固定班 -->
          <tbody class="show-ticket-two" id="flow2"></tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane class="el-tabs" name="second"
        ><span slot="label" class="style">{{ getdate2() }}</span>
        <bottom></bottom>
        <table>
          <!-- 流水班 -->
          <tbody class="show-ticket-one" id="flow3"></tbody>
        </table>
        <bottomt></bottomt>
        <table>
          <!-- 固定班 -->
          <tbody class="show-ticket-two" id="flow4"></tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane class="el-tabs" name="third"
        ><span slot="label" class="style">{{ getdate3() }}</span>
        <bottom></bottom>
        <table>
          <!-- 流水班 -->
          <tbody class="show-ticket-one" id="flow5"></tbody>
        </table>
        <bottomt></bottomt>
        <table>
          <!-- 固定班 -->
          <tbody class="show-ticket-two" id="flow6"></tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane class="el-tabs" name="fourth"
        ><span slot="label" class="style">{{ getdate4() }}</span>
        <bottom></bottom>
        <table>
          <!-- 流水班 -->
          <tbody class="show-ticket-one" id="flow7"></tbody>
        </table>
        <bottomt></bottomt>
        <table>
          <!-- 固定班 -->
          <tbody class="show-ticket-two" id="flow8"></tbody>
        </table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import bottom from '../query/bottom.vue'
import Bottomt from '../query/bottomt.vue'
export default {
  name: 'query-header',
  // inject: ['reload'], // 引入方法
  data() {
    return {
      activeName: 'first',
    }
  },
  created() {
    this.first()
    this.er()
  },
      // 钩子函数，初始化页面完成以后，在对dom结点进行相关操作
  mounted() {
    window.getticket = this.getticket
    this.er()
  },
 
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    if(tab.name == 'first'){
      this.first();
    }
    if(tab.name == 'second'){
      this.second();
    }
    if(tab.name == 'third'){
      this.third();
    }
    if(tab.name == 'fourth'){
      this.fourth();
    }
  },
er(){
  console.log(66767)
// var url = window.location.href;
// var url = this.$route.params
// var url = this.$route.path
var url =this.$route.query.info
// var url = JSON.stringify(url)
// var url = this.$router

window.sessionStorage.setItem('final_name',url.final_region)
window.sessionStorage.setItem('start_name',url.start_region)
window.sessionStorage.setItem('start_region_id',url.start_region_id) 
window.sessionStorage.setItem('final_region_id',url.final_region_id) 
if(window.sessionStorage.getItem('shuttle_shift_date') == undefined){
window.sessionStorage.setItem('shuttle_shift_date',  window.sessionStorage.getItem('day1'))
}
console.log(window.sessionStorage.getItem('shuttle_shift_date'))
console.log(url)


// final_region_id
// start_region
// start_region_id
},
    getticket(e) {
      var str = e.className
         console.log(e)
      console.log(e.parentNode.parentNode.parentNode.id.substr(4,1))
      var k = e.parentNode.parentNode.parentNode.id.substr(4,1)
      var j = str.substr(4, 1)
      console.log(j)
      console.log(window.sessionStorage.getItem('start_region_id'))
      console.log(window.sessionStorage.getItem('final_region_id'))
      console.log(window.sessionStorage.getItem('shuttle_shift_date'))
      this.$http.get(
    	'/query/shuttle/getShuttleList?start_region_id='+ window.sessionStorage.getItem('start_region_id') + '&final_region_id=' + window.sessionStorage.getItem('final_region_id') + '&shuttle_shift_date=2022-' +  window.sessionStorage.getItem('strs')
      )
        .then(function (res) {
            console.log(res)
          console.log(window.sessionStorage.getItem('strs'))
          console.log('gagagagagaga')
          // 转换成字符串
          if(k%2 == 1){
          var strinfomation = JSON.stringify(res.data.data.flow_shuttle_list[j])
          }else{
           strinfomation = JSON.stringify(res.data.data.regular_shuttle_list[j])
          }
           //存起来
          window.sessionStorage.setItem('locadata', strinfomation)
          console.log(window.sessionStorage.getItem('locadata'))
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
    //点击函数
first(){
		this.$http.get(
		'/query/shuttle/getShuttleList?start_region_id='+ window.sessionStorage.getItem('start_region_id') + '&final_region_id=' + window.sessionStorage.getItem('final_region_id') + '&shuttle_shift_date=' + window.sessionStorage.getItem('shuttle_shift_date'),
		).then(function(res){
       window.sessionStorage.setItem('strs', window.sessionStorage.getItem('shuttle_shift_date'))
      console.log(window.sessionStorage.getItem('start_region_id'))
      console.log(window.sessionStorage.getItem('final_region_id'))
      console.log(window.sessionStorage.getItem('shuttle_shift_date'))
      console.log(res)
			if(res.data.code === 10000){
				var flow1 = document.querySelector('#flow1');
				var flow2 = document.querySelector('#flow2');
        flow1.innerHTML = null;
    for(let i = 0;i < res.data.data.flow_shuttle_list.length;i++){
     flow1.innerHTML +=`<tr data-tname="城西客运站" class="stwo" > <td height="42" width="10%" ><strong > ${res.data.data.flow_shuttle_list[i].start_station}
			</strong></td>	
		<td style="padding: 1px;" width="16%"><strong>${res.data.data.flow_shuttle_list[i].shuttle_shift_time}</strong></td>
		<td width="10%"> ${res.data.data.flow_shuttle_list[i].start_region}</td>	
	    <td width="10%"><strong> ${res.data.data.flow_shuttle_list[i].final_region}</strong></td> 
		<td width="8%">
			<strong> ${res.data.data.flow_shuttle_list[i].shuttle_shift_type}</strong>
		</td>
		<td width="9%">${res.data.data.flow_shuttle_list[i].full_lenght}</td>	 
		<td width="10%">${res.data.data.flow_shuttle_list[i].car_model}</td>	
		<td width="6%"><strong>${res.data.data.flow_shuttle_list[i].ticket_price}</strong></td>	 
		<td width="6%"> ${res.data.data.flow_shuttle_list[i].unuse_ticket_quantity}</td>
		<td class="child" width="8%"> ${res.data.data.flow_shuttle_list[i].unuse_child_ticket_quantity}</td>
        <td>

				<input width="7%" type="submit" value="购票" class="span${i}" onclick="getticket(this)" >
	  
		</td>
	</tr>
		`
            }

            flow2.innerHTML = null
            for (
              let i = 0;
              i < res.data.data.regular_shuttle_list.length;
              i++
            ) {
              flow2.innerHTML += `<tr data-tname="城西客运站" class="stwo" > <td height="42" width="10%" ><strong > ${res.data.data.regular_shuttle_list[i].start_station}
			</strong></td>	
		<td style="padding: 1px;" width="16%"><strong>${res.data.data.regular_shuttle_list[i].shuttle_shift_time}</strong></td>
		<td width="10%"> ${res.data.data.regular_shuttle_list[i].start_region}</td>	
	    <td width="10%"><strong> ${res.data.data.regular_shuttle_list[i].final_region}</strong></td> 
		<td width="8%">
			<strong> ${res.data.data.regular_shuttle_list[i].shuttle_shift_type}</strong>
		</td>
		<td width="9%">${res.data.data.regular_shuttle_list[i].full_lenght}</td>	 
		<td width="10%">${res.data.data.regular_shuttle_list[i].car_model}</td>	
		<td width="6%"><strong>${res.data.data.regular_shuttle_list[i].ticket_price}</strong></td>	 
		<td width="6%"> ${res.data.data.regular_shuttle_list[i].unuse_ticket_quantity}</td>
		<td class="child" width="8%"> ${res.data.data.regular_shuttle_list[i].unuse_child_ticket_quantity}</td>
        <td>
		
				<input width="7%" type="submit" value="购票" class="span${i}" onclick="getticket(this)" >
	 
		</td>
	</tr>
		`
            }
          }
		}).catch(function(){

		}
		)
		 },
second(){
		this.$http.get(
		'/query/shuttle/getShuttleList?start_region_id='+ window.sessionStorage.getItem('start_region_id') + '&final_region_id=' + window.sessionStorage.getItem('final_region_id') + '&shuttle_shift_date=2022-' + window.sessionStorage.getItem('day2'),
		).then(function(res){
      window.sessionStorage.setItem('strs',window.sessionStorage.getItem('day2'))
       console.log(res)
			if(res.data.code === 10000){
				var flow3 = document.querySelector('#flow3');
				var flow4 = document.querySelector('#flow4');
        flow3.innerHTML = null;
    for(let i = 0;i < res.data.data.flow_shuttle_list.length;i++){
     flow3.innerHTML +=`<tr data-tname="城西客运站" class="stwo" > <td height="42" width="10%" ><strong > ${res.data.data.flow_shuttle_list[i].start_station}
			</strong></td>	
		<td style="padding: 1px;" width="16%"><strong>${res.data.data.flow_shuttle_list[i].shuttle_shift_time}</strong></td>
		<td width="10%"> ${res.data.data.flow_shuttle_list[i].start_region}</td>	
	    <td width="10%"><strong> ${res.data.data.flow_shuttle_list[i].final_region}</strong></td> 
		<td width="8%">
			<strong> ${res.data.data.flow_shuttle_list[i].shuttle_shift_type}</strong>
		</td>
		<td width="9%">${res.data.data.flow_shuttle_list[i].full_lenght}</td>	 
		<td width="10%">${res.data.data.flow_shuttle_list[i].car_model}</td>	
		<td width="6%"><strong>${res.data.data.flow_shuttle_list[i].ticket_price}</strong></td>	 
		<td width="6%"> ${res.data.data.flow_shuttle_list[i].unuse_ticket_quantity}</td>
		<td class="child" width="8%"> ${res.data.data.flow_shuttle_list[i].unuse_child_ticket_quantity}</td>
        <td>
	
				<input width="7%" type="submit" value="购票" class="span${i}" onclick="getticket(this)" >
		</td>
	</tr>
		`
            }
            flow4.innerHTML = null
            for (
              let i = 0;
              i < res.data.data.regular_shuttle_list.length;
              i++
            ) {
              flow4.innerHTML += `<tr data-tname="城西客运站" class="stwo" > <td height="42" width="10%" ><strong > ${res.data.data.regular_shuttle_list[i].start_station}
			</strong></td>	
		<td style="padding: 1px;" width="16%"><strong>${res.data.data.regular_shuttle_list[i].shuttle_shift_time}</strong></td>
		<td width="10%"> ${res.data.data.regular_shuttle_list[i].start_region}</td>	
	    <td width="10%"><strong> ${res.data.data.regular_shuttle_list[i].final_region}</strong></td> 
		<td width="8%">
			<strong> ${res.data.data.regular_shuttle_list[i].shuttle_shift_type}</strong>
		</td>
		<td width="9%">${res.data.data.regular_shuttle_list[i].full_lenght}</td>	 
		<td width="10%">${res.data.data.regular_shuttle_list[i].car_model}</td>	
		<td width="6%"><strong>${res.data.data.regular_shuttle_list[i].ticket_price}</strong></td>	 
		<td width="6%"> ${res.data.data.regular_shuttle_list[i].unuse_ticket_quantity}</td>
		<td class="child" width="8%"> ${res.data.data.regular_shuttle_list[i].unuse_child_ticket_quantity}</td>
        <td>
				<input width="7%" type="submit" value="购票" class="span${i}" onclick="getticket(this)" >
		</td>
	</tr>
		`
            }
          }
		}).catch(function(){

		}
		)
		 },
third(){
		this.$http.get(
		'/query/shuttle/getShuttleList?start_region_id='+ window.sessionStorage.getItem('start_region_id') + '&final_region_id=' + window.sessionStorage.getItem('final_region_id') + '&shuttle_shift_date=2022-' + window.sessionStorage.getItem('day3'),
		).then(function(res){
      window.sessionStorage.setItem('strs', window.sessionStorage.getItem('day3'))
      console.log(res)
			if(res.data.code === 10000){
				var flow5 = document.querySelector('#flow5');
				var flow6 = document.querySelector('#flow6');
        flow5.innerHTML = null;
    for(let i = 0;i < res.data.data.flow_shuttle_list.length;i++){
     flow5.innerHTML +=`<tr data-tname="城西客运站" class="stwo" > <td height="42" width="10%" ><strong > ${res.data.data.flow_shuttle_list[i].start_station}
			</strong></td>	
		<td style="padding: 1px;" width="16%"><strong>${res.data.data.flow_shuttle_list[i].shuttle_shift_time}</strong></td>
		<td width="10%"> ${res.data.data.flow_shuttle_list[i].start_region}</td>	
	    <td width="10%"><strong> ${res.data.data.flow_shuttle_list[i].final_region}</strong></td> 
		<td width="8%">
			<strong> ${res.data.data.flow_shuttle_list[i].shuttle_shift_type}</strong>
		</td>
		<td width="9%">${res.data.data.flow_shuttle_list[i].full_lenght}</td>	 
		<td width="10%">${res.data.data.flow_shuttle_list[i].car_model}</td>	
		<td width="6%"><strong>${res.data.data.flow_shuttle_list[i].ticket_price}</strong></td>	 
		<td width="6%"> ${res.data.data.flow_shuttle_list[i].unuse_ticket_quantity}</td>
		<td class="child" width="8%"> ${res.data.data.flow_shuttle_list[i].unuse_child_ticket_quantity}</td>
        <td>
				<input width="7%" type="submit" value="购票" class="span${i}" onclick="getticket(this)" >
		</td>
	</tr>
		`
            }
            flow6.innerHTML = null
            for (
              let i = 0;
              i < res.data.data.regular_shuttle_list.length;
              i++
            ) {
              flow6.innerHTML += `<tr data-tname="城西客运站" class="stwo" > <td height="42" width="10%" ><strong > ${res.data.data.regular_shuttle_list[i].start_station}
			</strong></td>	
		<td style="padding: 1px;" width="16%"><strong>${res.data.data.regular_shuttle_list[i].shuttle_shift_time}</strong></td>
		<td width="10%"> ${res.data.data.regular_shuttle_list[i].start_region}</td>	
	    <td width="10%"><strong> ${res.data.data.regular_shuttle_list[i].final_region}</strong></td> 
		<td width="8%">
			<strong> ${res.data.data.regular_shuttle_list[i].shuttle_shift_type}</strong>
		</td>
		<td width="9%">${res.data.data.regular_shuttle_list[i].full_lenght}</td>	 
		<td width="10%">${res.data.data.regular_shuttle_list[i].car_model}</td>	
		<td width="6%"><strong>${res.data.data.regular_shuttle_list[i].ticket_price}</strong></td>	 
		<td width="6%"> ${res.data.data.regular_shuttle_list[i].unuse_ticket_quantity}</td>
		<td class="child" width="8%"> ${res.data.data.regular_shuttle_list[i].unuse_child_ticket_quantity}</td>
        <td>
				<input width="7%" type="submit" value="购票" class="span${i}" onclick="getticket(this)" >
		</td>
	</tr>
		`
            }
          }
		}).catch(function(){})
		 },
fourth(){
		this.$http.get(
		'/query/shuttle/getShuttleList?start_region_id='+ window.sessionStorage.getItem('start_region_id') + '&final_region_id=' + window.sessionStorage.getItem('final_region_id') + '&shuttle_shift_date=2022-' + window.sessionStorage.getItem('day4'),
		).then(function(res){
      console.log(res)
      window.sessionStorage.setItem('strs',window.sessionStorage.getItem('day4'))
			if(res.data.code === 10000){
				var flow7 = document.querySelector('#flow7');
				var flow8 = document.querySelector('#flow8');
        flow7.innerHTML = null;
    for(let i = 0;i < res.data.data.flow_shuttle_list.length;i++){
     flow7.innerHTML +=`<tr data-tname="城西客运站" class="stwo" > <td height="42" width="10%" ><strong > ${res.data.data.flow_shuttle_list[i].start_station}
			</strong></td>	
		<td style="padding: 1px;" width="16%"><strong>${res.data.data.flow_shuttle_list[i].shuttle_shift_time}</strong></td>
		<td width="10%"> ${res.data.data.flow_shuttle_list[i].start_region}</td>	
	    <td width="10%"><strong> ${res.data.data.flow_shuttle_list[i].final_region}</strong></td> 
		<td width="8%">
			<strong> ${res.data.data.flow_shuttle_list[i].shuttle_shift_type}</strong>
		</td>
		<td width="9%">${res.data.data.flow_shuttle_list[i].full_lenght}</td>	 
		<td width="10%">${res.data.data.flow_shuttle_list[i].car_model}</td>	
		<td width="6%"><strong>${res.data.data.flow_shuttle_list[i].ticket_price}</strong></td>	 
		<td width="6%"> ${res.data.data.flow_shuttle_list[i].unuse_ticket_quantity}</td>
		<td class="child" width="8%"> ${res.data.data.flow_shuttle_list[i].unuse_child_ticket_quantity}</td>
        <td>
				<input width="7%" type="submit" value="购票" class="span${i}" onclick="getticket(this)">
		</td>
	</tr>
		`
            }
            flow8.innerHTML = null
            for (
              let i = 0;
              i < res.data.data.regular_shuttle_list.length;
              i++
            ) {
              flow8.innerHTML += `<tr data-tname="城西客运站" class="stwo" > <td height="42" width="10%" ><strong > ${res.data.data.regular_shuttle_list[i].start_station}
			</strong></td>	
		<td style="padding: 1px;" width="16%"><strong>${res.data.data.regular_shuttle_list[i].shuttle_shift_time}</strong></td>
		<td width="10%"> ${res.data.data.regular_shuttle_list[i].start_region}</td>	
	    <td width="10%"><strong> ${res.data.data.regular_shuttle_list[i].final_region}</strong></td> 
		<td width="8%">
			<strong> ${res.data.data.regular_shuttle_list[i].shuttle_shift_type}</strong>
		</td>
		<td width="9%">${res.data.data.regular_shuttle_list[i].full_lenght}</td>	 
		<td width="10%">${res.data.data.regular_shuttle_list[i].car_model}</td>	
		<td width="6%"><strong>${res.data.data.regular_shuttle_list[i].ticket_price}</strong></td>	 
		<td width="6%"> ${res.data.data.regular_shuttle_list[i].unuse_ticket_quantity}</td>
		<td class="child" width="8%"> ${res.data.data.regular_shuttle_list[i].unuse_child_ticket_quantity}</td>
        <td>
				<input width="7%" type="submit" value="购票" class="span${i}" onclick="getticket(this)" >
		</td>
	</tr>
		`
            }
          }
        })
        .catch(function () {})
    },
    // 不管是否有变化，每一次都要重新执行函数
    getdate1() {
      let date = new Date()
      var month =
        date.getMonth() <= 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var day = date.getDate() <= 9 ? '0' + date.getDate() : date.getDate()
      if (
        window.sessionStorage.getItem('shuttle_shift_date').slice(1, 4) ===
        '022'
      ) {
        getdate = window.sessionStorage
          .getItem('shuttle_shift_date')
          .slice(5, 10)
        console.log(window.sessionStorage.getItem('shuttle_shift_date'))
        console.log(getdate)
        window.sessionStorage.getItem('shuttle_shift_date') == null
        window.sessionStorage.setItem('day1', getdate)
      } else {
        var getdate = month + '-' + day
        window.sessionStorage.setItem('day1', getdate)
      }
      return getdate
    },
    getdate2: function () {
      let date = new Date()
      var month =
        date.getMonth() <= 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var day =
        date.getDate() + 1 <= 9
          ? '0' + (date.getDate() + 1)
          : date.getDate() + 1
      var getdate = month + '-' + day
      window.sessionStorage.setItem('day2', getdate)
      console.log('qq')
      console.log(window.sessionStorage.getItem('day2'))
      return getdate
    },
    getdate3: function () {
      let date = new Date()
      var month =
        date.getMonth() <= 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var day =
        date.getDate() + 2 <= 9
          ? '0' + (date.getDate() + 2)
          : date.getDate() + 2
      var getdate = month + '-' + day
      window.sessionStorage.setItem('day3', getdate)
      return getdate
    },
    getdate4: function () {
      let date = new Date()
      var month =
        date.getMonth() <= 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var day =
        date.getDate() + 3 <= 9
          ? '0' + (date.getDate() + 3)
          : date.getDate() + 3
      var getdate = month + '-' + day
      window.sessionStorage.setItem('day4', getdate)
      return getdate
    },
  },

  computed: {},
  components: {
    bottom,
    Bottomt,
  },
}
</script>

<style scoped>
* {
  font-family: 'Microsoft YaHei', \5fae\8f6f\96c5\9ed1, arial, \5b8b\4f53;
  margin: 0;
  padding: 0;
}

/* 修改选项卡的样式 */
.style {
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.25rem;
}
.query-header {
  /* width: 53.75rem; */
  width: 100%;
}
/* 通过类名，用到style有scoped中 */
/* .el-tabs__item :hover{
 background: lightblue;
} */
tbody {
  background: lavenderblush;
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
.stwo {
  line-height: 1.125rem;
  padding: 0.2125rem;
  font-size: 0.7875rem;
  overflow: hidden;
  background-color: lightpink;
}
tr {
  background: lightcyan;
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
</style> 

			