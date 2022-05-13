<template>
    <div class="login">
    <!-- 遮罩层登陆 -->
    <div class="modal">
            <div class="login_head">
                <span>用户快捷登录</span> 
                <span>关闭</span>
            </div>
            <div class="login_bottom">
                <p>用户帐号登录</p>
                <ul>
                    <li>
                        <div class="la">
                            <label> 登录名：</label>
                             <input id="username" maxlength="30" class="reginput_01" type="text" name="textfield">
                        </div>
                    </li>
                    <li>
                        <div class="la">
                            <label> 密码：</label> 
                            <input id="password" class="reginput_01" type="password" maxlength="16" name="textfield">
                        </div>
                    </li>
                    <li style="padding: 0px; margin: 0px; height: 25px;">
                        <div class="struct">
                            <span id="tip" style="color: red; margin-left: 110px;"></span>
                        </div>
                    </li>
                    <li style="padding: 0px; margin: 0px;">
                        <div class="la">
                            <!-- <label></label> -->
                            <a class="btnlogin" href="javascript:void(0)" @click="login">登录</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'login',
    methods:{
        login(){
            this.$router.push('yanzheng');
        }
    }

}
</script>
<style scoped>
*{
    font-family: "Microsoft YaHei",\5fae\8f6f\96c5\9ed1,arial,\5b8b\4f53;
    margin: 0;
    padding: 0;
}
.login{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
}
.login .modal{
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
    /* padding: 1.25rem; */
        width: 23.75rem;
        height: 16.9357rem;
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
    height: 13.5rem;
}
p{
    line-height: 2.5rem;
    float: left;
    font-size: .875rem;
    font-weight: bold;
    color: #666;
    padding-top: 10px;
    text-indent: 20px;
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
    margin-left: 9rem;
    text-align: center;
    width: 6.125rem;
    font-weight: bold;
}
</style>