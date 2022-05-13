<template>
    <div class="success">
  <div class="title">购票成功!</div>
   
    <div class="content">
        <p>
            取票验证码：<span class="confirm" v-for="(item,index) in 1" :key="index">{{list.ride_code}}</span>
        </p>
        <p>
            验证码已发送至联系人手机/邮箱，请凭验证码或乘车人身份证取票。
        </p>
    </div>
   <div class="left">
    <p>
        取票方式：
        <img src="../../assets/img/way.png" alt="">

    </p>
    <p>
        若有疑问,请查看详细取票帮助或直接拨打电话
        <span class="kequ" style="color:red">客服电话：123-456-789</span> (08:00-20:00)
    </p>
    <p>
        <span class="black" style="color:blank ;font-weight:bold">
            建议提前取票时间：
        </span>
        请提前1小时到始发站乘车取票
    </p>
    <p>
        <span class="blod" style="color:blank; font-weight:bold">
            退票:
        </span>
        <br>
        <span style="margin-left:1.7rem">已取票：已取得车票，请到始发站的“综合窗口”办理退票。</span>  
        
    </p>
    <p>
        未取票:未取得车票，可在本网站操作退票，网上退票功能将在发车时刻前2小时关闭，关闭后之能到始发站办理退票手续。
    </p>
   </div>
   <div class="right" style="color:blue;font-size:.6rem;font-weight:bold">
     小贴士：
     <div class="box">
         <p>1.你可以在登陆后进入“个人中心”查看历史订单</p>
         <p>2.在你没有取票前，如果您的行程有改变，可以在本站直接退票</p>
         <p>3.非节假日，建议在
             <font style="color:red">发车前1小时</font>取票</p>
         <p>4.节假日，建议在<font style="color:red">发车前2小时</font>取票</p>
         <p>5.为了保护你的信息安全 <span style="color:blue; font-size:2rem" >{{count}}</span> 秒后自动返回个人中心</p>
     </div>
   </div>
    </div>
 
</template>
<script>
export default {
    name:'success',
    data(){
        return{
            list:{},
            count:''
        }
    },
    created(){
   this.ridecode();
   this.countdown();
    },
computed: {
    myObj: {
      get: function () {
        return this.list // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      },
    },
  },
    methods:{ 
    //实现页面倒计时
        countdown(){
       const timecount = 60;
       if(!this.timer){
           this.count = timecount;
           this.timer = setInterval(() => {
               if(this.count > 1 && this.count <= timecount){
                   this.count--;
               }else{
                   clearInterval(this.timer);
                   this.timer = null;
                   this.$router.push('person')
               }
           },1000)
       }
        },
        ridecode(){
        var vm = this; 
            this.$http.get(
                '/order/getRideCode?master_order_number='+ window.sessionStorage.getItem('master_order_number'),
                ).then(function(res){
                    //打印主订单号
       console.log(window.sessionStorage.getItem('master_order_number'));
                    console.log(res);
                    //将信噺转换成字符串
        var strinfomation = JSON.stringify(res.data.data)
       sessionStorage.setItem("infomation",strinfomation)
        //打印信息
    console.log(window.sessionStorage.getItem('infomation'));
         //拿到信息
        var infomation = sessionStorage.getItem('infomation');
            //将字符串转换为json格式
            var jsonobj = JSON.parse(infomation);
            //提取我们的数据
            vm.list = jsonobj;
        })
        }
    }
}
</script>
<style scoped>
*{
    margin: 0;
    padding: 0;
}
img{
    width: 90%;
    margin-left: 5%;
}
.title{
    color: red;
    font-size: 1.4rem;
font-weight: bold;
margin-bottom: .375rem;
margin-top: 1rem;

}
.confirm{
    display: block;
    margin-left: 8rem;
    margin-top: -2.3rem;
   height: 2rem;
   line-height: 2rem;
    width: 9rem;
    color: white;
    background: lightcoral;
}
.content{
    margin-top: .975rem;
}
.content p{
    font-size: 1rem;
    color: #333;
    font-weight: 500;
    margin-left: -2rem;
    line-height: 3rem;
}
.left{
    width: 60%;
    /* border: 1px solid #666; */
    padding: .25rem;
    border-right: 1px dotted grey;
}
.left p{
    color: #333;
    font-size: .9rem;
    font-weight: 500;
    line-height: 2rem;
}
.right{
    position: absolute;
   right: 0;
   top: 19rem;
    width: 40%;
    /* border: 1px solid #666; */
    padding: .25rem;
    height: 28rem;
}
.box p{
    font-size: .8rem;
    color: #2c96ea;
    font-weight: 500;
    line-height: 2rem;

}
</style>
