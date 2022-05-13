<template>
    <div class="slide">
					<div class="sidebartop">
						<div class="title">汽车票查询</div>
						<div class="tabBoxTicket">
							<!-- 查询车票 -->
							<!-- <form action="https://www.scqckypw.com:443/query/searchTicket.html" method="get" id="id_book_form"> -->

								<dl>
									<dd class="clearfix">
										<span class="txt">出发城市:</span> <span class="list">
                                         <input class="max1" id="bookStartCityName"  type="text" autocomplete="off" maxlength="20"   placeholder="中文/拼音">
										</span>
									</dd>
									<dd class="clearfix">
										<span class="txt">到达城市:</span>
                                        <span class="list"> 
                                            <input class="max2" id="bookEndCityName" name="targetName" type="text" autocomplete="off"  placeholder="中文/拼音">
										</span>
									</dd>
									<dd class="clearfix">
										<span class="txt">乘车时间:</span>
                                        <span class="list">
                                            <input class="max" type="date" name="" id="" value="">
                                        </span>
									</dd>
									<dd>
										<input type="button" value="" id="checkTicketBtn" class="subBtn">
									</dd>
								</dl>
							<!-- </form> -->
						</div>
					</div>
					<div class="sidebarbottom">
						<div class="titletell">服务电话</div>
						<div class="severTell">
							<h2>123-456-7891</h2>
							<p>(工作时间:(08:00-20:00)</p>
						</div>
					</div>
    </div>
</template>
<script>
export default {
    name:'slide',
    mounted(){
    this.tongbu()
    },
    methods:{
        tongbu(){
            var bt1 = document.querySelector('.max1');
            var bt2 = document.querySelector('.max2');
            bt1.value = window.sessionStorage.getItem('start_name')
            window.sessionStorage.getItem('start_name') == null
            console.log(window.sessionStorage.getItem('start_name'))
          bt2.value = window.sessionStorage.getItem('final_name')
          window.sessionStorage.getItem('final_name') == null
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
.max{
    height: 1.9rem;
    width: 10.5rem;
}
.sidebartop,.sidebarbottom{
    /* width: 17.25rem;*/
     height: 17.5rem;  
    border: .025rem solid #00618b;
}
.sidebarbottom{
    margin-top: 1.25rem;
}
.sidebartop .title,.titletell{
    text-indent: .35rem;
    height: 2.375rem;
    font-size: 1.125rem;
    color: #fff;
    line-height: 2.375rem;
    background:#00618b ;
}
h2{
    font-size: 2.25rem;
    text-align: center;
    font-weight: normal;
    margin-top: 2.5rem;
    color: #00618b;
    line-height: 3.75rem;
}
.subBtn{
    color: #444;
    font-size: 100%;
    border: 0 none;
    width: 16rem;
    height: 2.6875rem;
    margin: 0rem  .625rem ;
    background: url(../../../../src/assets/img/formbg.jpg) no-repeat;
    cursor: pointer;
}

.txt{
    color: #444;
    display: block;
    float: left;
    width: 5rem;
    font-size: 1rem;
    line-height: 2rem;
    text-align: center;
}

dd{
    font-size: .8125rem;
    color: #444;
    clear: both;
    margin-top: 1.5rem;
}


</style>