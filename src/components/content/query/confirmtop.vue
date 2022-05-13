<template>
    <div class="confirmtop">
            <dl>
                <dt >
                    <div class="left1">
                      <h2>提示信息</h2>
                    </div>
                </dt>
                <dd>
                    <div class="qcontent">
								  <p>
                                1、为了使您能成功购买车票，请在<span style="color: #f00;">29分钟内</span>完成支付。
                            </p>
								
							
								 <p>
                                2、支付成功后请前往联系人邮箱（查收取票验证码邮件）或个人中心查询是否成功购票。 <span style="color: #f00;">特别声明：支付成功并不代表购票成功</span>，请及时查询，如有疑问联系客服(08:00-20:00)。
                            </p>
								<p>
									3、本网站网上退票功能将在<span style="color: #f00;">发车前2小时关闭</span>，关闭后只能到始发站办理退票手续。
								</p>
							</div>
                </dd>
            </dl>
            <dl>
                <dt>
                    <div class="left2">
                      <h2>车票信息</h2>
                    </div>
                </dt>
                <dd>
                    <div class="title">
                 <ul>
                    <li class="c0">始发站</li>
                    <li class="c3">目的地</li>
                    <li class="c1">乘车人</li>
                    <li class="c4"> 发车时间</li>
                    <li class="c1">车票金额 </li>
                    <li class="c2">操作</li>
				</ul>
                    </div>
                    <div class="list">
                <ul class="ago">
                    <li class="c0" v-for="(item,index) in 1" :key="index">{{list.order_info[0].start_station}}</li>
                    <li class="c3" v-for="(item,index) in 1" :key="index">{{list.order_info[0].final_station}}</li>
                    <li class="c1" v-for="(item,index) in 1" :key="index">{{list.order_info[0].passenger_name}}</li>
                    <li class="c4"  v-for="(item,index) in 1" :key="index">{{list.order_info[0].shuttle_shift_time}}</li>
                    <li class="c1"  v-for="(item,index) in 1" :key="index">{{list.order_info[0].ticket_price}}</li>
                    <li class="c2">
                        <font class="org">
                            <a href="javascript:;" @click="show">详情</a>
                        </font>
                    </li>
                </ul>               
                    </div>
                </dd>
            </dl>
            <dl>
                <dt>
                <div class="left3">
                    <h2>结算信息</h2>
                </div>
                </dt>
                <dd>
                    <div class="money">
                        <i v-for="(item,index) in 1" :key="index" class="item">{{list.master_total_amount}}</i>
                    </div>
                </dd>
            </dl>
        </div>

</template>
<script>
export default {
    name:'confirmtop',
    data(){
      return {
          list:{}
      }
    },
    created(){
    this.getinfomation();
    },
    computed: {
       myObj: {
          get:function(){
        return this.list; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
        }
    },
},
    methods:{
            getinfomation(){
            //读取本地的字符串数据
            var getlocaldata = sessionStorage.getItem('localdata');
            //显示内型，这个时候是字符串
            console.log(typeof(getlocaldata));
            //将字符串转换为json格式
            var jsonobj = JSON.parse(getlocaldata);
            //提取我们的数据
            console.log(jsonobj);
            this.list = jsonobj;
        },
        show(){
            var list = document.querySelector('.list');
            var getlocaldata = sessionStorage.getItem('localdata');
            console.log(typeof(getlocaldata));
            var jsonobj = JSON.parse(getlocaldata);
            console.log(jsonobj);
            for(let i = 0;i<jsonobj.order_info.length;i++){
                var ago = document.querySelector('.ago');
                ago.style.display = 'none';
                console.log(jsonobj.order_info.length)
                list.innerHTML += `<ul style="display:flex;">
                    <li  style="flex:1;color:ligthskyblue; font-size: 1rem;  line-height: 2.4375rem;  text-align: center;">${jsonobj.order_info[i].start_station}</li>
                    <li style="flex:1;    
 color:ligthskyblue; font-size: 1rem;  line-height: 2.4375rem;   text-align: center;"  >${jsonobj.order_info[i].final_station}</li>
                    <li style="flex:1; 
  color:ligthskyblue; font-size: 1rem;  line-height: 2.4375rem;   text-align: center;">${jsonobj.order_info[i].passenger_name}</li>
                    <li style="flex:1;    
color:ligthskyblue; font-size: 1rem;  line-height: 2.4375rem;   text-align: center;">${jsonobj.order_info[i].shuttle_shift_time}</li>
                    <li style="flex:1;  
 color:ligthskyblue; font-size: 1rem;  line-height: 2.4375rem;   text-align: center;">${jsonobj.order_info[i].ticket_price}</li>
                <li style="flex:1;  
 color:ligthskyblue; font-size: 1rem;  line-height: 2.4375rem;   text-align: center;"></li>
                </ul>
                `
            }
        }
    }
}
</script>
<style scoped>
*{
    font-family: "Microsoft YaHei",\5fae\8f6f\96c5\9ed1,arial,\5b8b\4f53;
    margin: 0;
    padding: 0;
     color: #444;
}
a{
    text-decoration: none;
    color: lightskyblue;
}
.left1{
    width: 12.25rem;
    height:7.7rem;
    line-height: 7.7rem;
    text-align: center;
}
.left2{
    line-height: 8.4rem;
    text-align: center;
    width: 12.25rem;
    height:8.4rem;
}
.left3{
    line-height: 5.5rem;
    text-align: center;
    width: 12.25rem;
    height:5.5rem;
}
ul{
    display: flex;
}
.title{
    background: #f5f5f5;
}
.title ul li{
     flex: 1;
    font-weight: 900;
    font-size: 1.1rem;
    list-style: none;
    display: block;
    line-height: 2.4375rem;
    width: 10rem;
     text-align: center;
            color: #666;
}
.list{
    margin-top:.9rem ;
    height: 5rem;
}
.list ul li{
    flex: 1;
    font-size: 1rem;
        text-align: center;
            color: #666;

}
dl{
    font-size: .75rem;
    background-color: #F1F1F1;
    border: 1px solid #DDDCDC;
    margin-top: .625rem;
    /* overflow: hidden; */
    padding: 20px 0;
}
dt{
    font-size: .75rem;
    float: left;
    text-align: center;
    /* width: 13.125rem; */
    /* height: .6875rem;
    line-height: 6.6875rem; */
}
h2{
    font-size: 1.5rem;
    font-weight: bold;
    
}
dd{
    margin-left: 13.25rem;
     background: white;
}
.money{
    height: 5.5rem;
    line-height: 5.5rem;
}
p{
    line-height: 1.9rem;
    padding-left: .5625rem;
    text-align: left;
    font-size: .875rem;
    font-weight: 500;
    background: white;

}
i{

    font-size: 1.6rem;
    color: orange;
    margin-left: 1.25rem;
    font-style: normal;
    }
</style>