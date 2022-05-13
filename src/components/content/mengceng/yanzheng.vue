<template>
    <div class="yanzheng">
        <div class="login_content">
            <div class="login_head">
                <span>请输入验证码</span>
             <span >关闭</span>
            </div>
            <div class="login_bottom">
                <ul>
                    <li>
                        <div class="la">
                            <label> 验证码：</label>
                             <input  @focus="refreshImg" style="width: 100px;" maxlength="30" class="reginput_01" type="text" name="textfield">
                        	<img  :src="codeImgUrl"  alt="点我更换验证码" style="vertical-align: middle"/>
                        </div>
                    </li>
                    <li style="padding: 0px; margin: 0px; height: 1.25rem;">
                        <div class="struct">
                            <span style="color: red; margin-left: 6.875rem;"></span>
                        </div>
                    </li>
                    <li style="padding: 0px; margin: 0px;">
                        <div class="la" style="text-align: center;">
                            <a class="btn_login"  href="javascript:void(0)" @click="confirm">确定</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'yanzheng',
    data(){
        return{
    codeImgUrl: 'https://image.scqckypw.com/static/new/images/refreshen.png',
        }
    },
    methods:{
        confirm(){
            this.$router.push('confirm');
        },
     refreshImg() {
      let num = Math.ceil(Math.random() * 10)
      this.codeImgUrl = `https://www.scqckypw.com/rCode.jpg?${num}`
    },
    }
}
</script>
<style scoped>
*{
    font-family: "Microsoft YaHei",\5fae\8f6f\96c5\9ed1,arial,\5b8b\4f53;
    margin: 0;
    padding: 0;
}
.yanzheng{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
}
.login_content{
    font-size: .75rem;
    color: #444;
    padding-bottom: 20px;
    position:absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    /* 定位居中 */
    box-sizing: border-box;
        width: 23.75rem;
        height: 9.9375rem;
}
.login_head{
    color: #444;
    background: none repeat scroll 0 0 #f4f8fb;
    font-size: .875rem;
    font-weight: 700;
    height: 3.4375rem;
    line-height: 3.4375rem;
    position: relative;
    text-indent: 1.25rem;
    width: 23.75rem;
 ;
}
.login_bottom{
    width: 23.75rem;
    float: left;
    background: #FFFFFF;
    height: 6.5rem;
}
ul{
    font-size: .75rem;
    color: #444;
    float: left;
    width: 23.75rem;
}
li{
        
    display: list-item;
    float: left;
    margin: .3125rem 0 0;
    padding: .3125rem 0;
    width: 23.75rem;
}
label{
       
    line-height: 1.25rem;
    cursor: default;
    float: left;
    color: #404040;
    font-size: .875rem;
    padding: 7px 10px;
    text-align: right;
    width: 6.25rem;
}
input{
        
    font-size: 100%;
    font-family: tahoma;
    border: 1px solid #A5AFC3;
    float: left;
    height: 2rem;
    line-height: 2rem;
    margin-right: .5rem;
    outline: 0 none;
    padding: 7px 10px;
    width: 12.5rem;
}
a{
    cursor: pointer;
    text-decoration: none;
    outline:none;
    background-color: #2c96ea;
    border: 1px solid #085e9b;
    color: #FFFFFF;
    display: inline-block;
    font: 14px/30px SimSun,sans-serif;
    height: 30px;
    text-align: center;
    width: 6.125rem;
    font-weight: bold;
}
</style>