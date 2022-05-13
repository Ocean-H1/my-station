<template>
    <div class="confirmbottom">
        <div class="way">
            <ul>
                <li>支付方式</li>
            </ul>
        </div>
        <div class="content">
            <div class="name">支付平台</div>
            <div class="pay">
                <input type="checkbox" id="zhifubao">
                <label for="zhifubao"></label>
            </div>
            <div class="name">支付银行</div>
            <img src="../../../assets/img/bank.png" alt="">
        </div>
      <div class="button">
          <button  @click="pay">确认并支付</button>
      </div>
    </div>
</template>
<script>
export default {
    name:'confirmbottom',
  
    methods:{
        pay(){
            if(document.getElementById("zhifubao").checked){
                this.$router.push('qrcode')
            }
            else{
                alert('请勾选支付方式');
            }
        }
    }
}
</script>
<style scoped>
*{
    margin: 0;
    padding: 0;
    font-family: "Microsoft YaHei",\5fae\8f6f\96c5\9ed1,arial,\5b8b\4f53;
}
.button{
    height: 6.25rem;
    position: relative;
}

button{
    position: absolute;
    left: 50%;
    top:50%;
    height: 3.125rem;
    width: 11.125rem;
    margin-top: -1.5625rem;
    margin-left: -5.5625rem;
    background-color: #2577E3;
    color: #FFFFFF;
    cursor: pointer;
    font-size: 1.125rem;
    font-weight: bold;
    border: none;
}
img{
    width: 100%;
}
.way{
    margin: 1rem 0 0 0;
    width: 6.5rem;
    height: 2.9rem;
    text-align: center;
    line-height: 2.9rem ;
    background:#2577E3;
    color: #FFF;
}
input{
    margin-left: 1rem;
}
.name{
    margin: 1rem 0 1rem 0 ;
    font-size: .85rem;
    color: #7EAED4;
}
label{
    margin-left: 2.5rem;
    margin-top: -2rem;
    display: block;
     width: 9rem;
    height: 2.8rem; 
    background: url('../../../assets/img/Pay.gif') ;
}
</style>