<template>
  <div class="placeorder">
    <div class="left">
      <step></step>
      <!-- 购买的车票信息 -->
      <div class="message">
        <div class="sa">
          <!-- <font> 规定文本的字体、字体尺寸、字体颜色 -->
          <em class="weisa"
          >您要购买的
            <strong>
              <font class="blue" style="color: blue; font-size: 1.1rem"
              >车票信息</font
              > </strong
            >如下:刷新查看最新信息
          </em>
        </div>
        <div class="chose">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr class="fonw1">
              <td height="38" class="c1 c2" width="14%">发车时间</td>
              <td width="21%" class="c1 c2">始发站</td>
              <td width="21%" class="c1 c2">目的站</td>
              <td width="8%" class="c1 c2">全价(元)</td>
              <td width="8%" class="c1 c2">车程时间</td>
              <td width="8%" class="c1 c2">剩余票数</td>
              <td width="6%" class="c1 c2">班次类型</td>
              <td width="8%" class="c1 c2">里程</td>
              <td width="8%" class="c2">车型</td>
            </tr>
            <tr class="fonw2">
                                 
              <td width="14%" v-for="(item, index) in 1" :key="index">
                {{ list.shuttle_shift_time }}
              </td>
                                 
              <td width="21%">{{ list.start_region }}</td>
                                 
              <td width="21%">{{ list.final_region }}</td>
                                 
              <td width="6%">{{ list.ticket_price }}</td>
                                 
              <td width="6%">{{ list.duration }}</td>
                                 
              <td width="6%">{{ list.unuse_ticket_quantity }}</td>
                                 
              <td width="6%">{{ list.shuttle_shift_type }}</td>
                                 
              <td width="8%">{{ list.full_lenght }}</td>
                                 
              <td width="8%">{{ list.car_model }}</td>
                             
            </tr>
            <!-- </tbody> -->
          </table>
        </div>
        <!-- 联系人信息 -->
        <div class="link">
          <div class="top">
            <em> 联系人信息：<span>*</span>为必填项 </em>
          </div>
          <div class="bottom">
            <h3>请选择联系人</h3>
            <br />
            <br />
            <ul class="goal" id="ul"></ul>
            <ul class="link1">
              <li>
                姓名
                <span>*&nbsp;</span>
                <input
                        type="text"
                        id="name"
                        @blur="lose1"
                        name="contact_person_name"
                        class="bt1"
                />
                <div
                        id="pleasename"
                        style="display: none; color: red; margin-left: 2.7rem"
                >
                  请输入姓名
                </div>
              </li>
              <li>
                手机
                <span>*&nbsp;</span>
                <input
                        type="text"
                        name="contact_person_phone_number"
                        @blur="lose2"
                        class="bt2"
                        id="phone"
                />
              </li>
              <li>
                邮箱
                <input type="text" name="contact_person_email" id="email" />
              </li>
              <li>
                <input type="checkbox" name="save" class="save1" />
                <label for="save" class="save2"> 保存至常用联系人 </label>
              </li>
            </ul>
          </div>
        </div>
        <!-- 乘车人信息 -->
        <div class="riding">
          <div style="float: left">
            <i class="weisa"
            >乘车人信息:
              <span>*</span>
              为必填项 &nbsp;&nbsp;&nbsp;
            </i>
            <span style="color: red"> (当前免票儿童数：) </span>
          </div>
          <div class="please">
            <h3>
              请选择乘车人:<font style="font-size: 3px; color: blue">
              只支持第一个乘车人选入</font
            >
            </h3>
            <ul class="chengcheren"></ul>
          </div>
          <div class="newpassenger">
            <table style="cellspacing: 0">
              <tbody class="hahh">
              <tr>
                <th style="width: 10%">票种</th>
                <th style="width: 10%">是否携带1.2米以下儿童</th>
                <th style="width: 15%"><span>*</span>姓名</th>
                <th style="width: 10%"><span>*</span>证件</th>
                <th style="width: 23%"><span>*</span>证件号</th>
                <th style="width: 15%" class="class_have_insurant">
                  购买保险
                </th>
                <th style="width: 7%">&nbsp;</th>
              </tr>
              <!-- <form action="/order/bookOrder" method="post"> -->
              <tr class="tr1">
                <td>
                  <select id="select1" ref="ticket">
                    <option>成人票</option>
                    <option>半票</option>
                    <option>携童票</option>
                  </select>
                </td>
                <td>
                  <select id="select2">
                    <option>否</option>
                    <option>是</option>
                  </select>
                </td>
                <td>
                  <input
                          type="text"
                          name="passenger_name"
                          id="passenger_name"
                          class="bt3"
                          @blur="lose3($event,this)"
                  />
                </td>
                <td>
                  <select id="select3">
                    <option>身份证</option>
                    <option>军人证</option>
                    <option>护照</option>
                  </select>
                </td>
                <td>
                  <input
                          type="text"
                          name="passenger_card_number"
                          id="passenger_card_number"
                          @blur="lose4($event,this)"
                          class="bt4"
                  />
                </td>
                <td>
                  <input
                          type="checkbox"
                          name="buying_insurance"
                          class="bt6"
                  />
                </td>
              </tr>
              <!-- <input type="button" value="提交订单" @click.stop="submit"> -->
              <!-- </form> -->
              <!-- 添加乘车人 -->
              <tr
                      :key="item.id"
                      :class="item.id"
                      ref="trlist"
                      v-for="item in items"
                      v-show="item.show"
              >
                <td >
                  <select id="select1" ref="ticket">
                    <option value="成人票">成人票</option>
                    <option value="半票">半票</option>
                    <option value="携童票">携童票</option>
                  </select>
                </td>
                <td>
                  <select id="select2" ref="isyes">
                    <option value="否">否</option>
                    <option value="是">是</option>
                  </select>
                </td>
                <td >
                  <input
                          type="text"
                          name="passenger_name"
                          class="bt2"
                          ref="name"
                          @blur="lose3($event,this)"
                  />
                </td>
                <td >
                  <select id="select3" ref="card">
                    <option value="身份证">身份证</option>
                    <option value="军人证">军人证</option>
                    <option value="护照">护照</option>
                  </select>
                </td>
                <td >
                  <input
                          type="text"
                          name="passenger_card_number"
                          class="bt3"
                          @blur="lose4($event,this)"
                          ref="cardnumber"
                  />
                </td>
                <td >
                  <input
                          type="checkbox"
                          name="buying_insurance"
                          class="bt4"
                          ref="isno"
                  />
                </td>
              </tr>
              <div class="nav" id="add_ticket_passenger">
                  <span class="add">
                    <input type="button" value="取消订单" @click="cancel" />
                    <input
                            type="button"
                            class="n"
                            value="添加乘车人"
                            @click="add"
                    />
                  </span>
                <span class="delete">
                    <input type="button" value="删除乘车人" @click="Delete" />
                  </span>
              </div>
              </tbody>
            </table>
          </div>
        </div>
        <div class="add" style="clear: both">
          <span>
            一个订单最多可订购
            <font>5张</font>
            车票
          </span>
        </div>
        <div class="border">
          <div class="new">
            <input type="checkbox" id="know" class="bt5" />
            <label for="know"
            >我已阅读并同意<a href="javascript:;">《购票须知》</a></label
            >
          </div>
          <div class="submit">
            <!-- 阻止事件冒泡，event.propogation()子 -->
            <input type="button" value="提交订单" @click.stop="submit" />
          </div>
        </div>
      </div>
    </div>
    <div class="sidebar">
      <div class="mar">
        <!-- <input class="flow-mb" disabled="disabled"> -->
        重要提示
      </div>
      <div class="flow-main">
        <p>1、成人及身高超过1.5米的儿童须购买全价票，供给座位。</p>
        <p>2、身高1.2米至1.5米的儿童购买半价儿童票，供给座位。</p>
        <p>
          3、身高1.2米以下儿童属免票儿童，须由购买了“成人票”，并在“是否携带1.2米以下儿童”选项中选择“是”的一名成人带领下免费乘车。一张“成人票”最多可以携带一名免票儿童，免票儿童无座位。一名成人携带免票儿童超出一名时，应为超出的儿童购买儿童半票，儿童半票供给座位。
        </p>
        <p>
          4、旅客随身携带乘车的物品，每一张全票可免费10千克，每一张儿童票可免费5千克；体积不能超过0.05立方米，长度不能超过1.8米，并以能放置本人座位下或车内行李架上为限。超过规定时，其超过部分按行包收费；占用座位时，按实际占用座位数购票。
        </p>
        <p>5、网上售票暂不支持网上改签。</p>
        <p>
          6、您可以到始发站的自助取票机上取票。为避免误车，非节假日建议在发车前1小时取票，并提前30分钟到始发站乘车；法定节假日及法定节假日节前一天，建议在发车前2小时取票，并提前1小时到始发站乘车。
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  import step from '../query/step.vue'
  export default {
    data() {
      return {
        items: [
          { id: 'tr2', show: false, content: '内容1' },
          { id: 'tr3', show: false, content: '内容2' },
          { id: 'tr4', show: false, content: '内容3' },
          { id: 'tr5', show: false, content: '内容4' },
        ],
        list: {},
        passenger:
            [
              //乘客列表
              {
                "passenger_id":null,
                "passenger_name":null,
                "passenger_card_number": null,
                "passenger_card_type":null, //证件类型: 身份证,军人证,护照,港澳居民来往内地通行证,台湾居民来往内地通行证,港澳台居民居住证
                "ticket_type": null, //票种:成人票,携童票（成人可携带身高低于1.5m的儿童）,半票（身高超1.5m的儿童票）
                "buying_insurance": null, //购买保险状态，true为购买
              },
              {
                "passenger_id":null,
                "passenger_name":null,
                "passenger_card_number": null,
                "passenger_card_type":null, //证件类型: 身份证,军人证,护照,港澳居民来往内地通行证,台湾居民来往内地通行证,港澳台居民居住证
                "ticket_type": null, //票种:成人票,携童票（成人可携带身高低于1.5m的儿童）,半票（身高超1.5m的儿童票）
                "buying_insurance": null, //购买保险状态，true为购买
              },
              {
                "passenger_id":null,
                "passenger_name":null,
                "passenger_card_number": null,
                "passenger_card_type":null, //证件类型: 身份证,军人证,护照,港澳居民来往内地通行证,台湾居民来往内地通行证,港澳台居民居住证
                "ticket_type": null, //票种:成人票,携童票（成人可携带身高低于1.5m的儿童）,半票（身高超1.5m的儿童票）
                "buying_insurance": null, //购买保险状态，true为购买
              },
              {
                "passenger_id":null,
                "passenger_name":null,
                "passenger_card_number": null,
                "passenger_card_type":null, //证件类型: 身份证,军人证,护照,港澳居民来往内地通行证,台湾居民来往内地通行证,港澳台居民居住证
                "ticket_type": null, //票种:成人票,携童票（成人可携带身高低于1.5m的儿童）,半票（身高超1.5m的儿童票）
                "buying_insurance": null, //购买保险状态，true为购买
              },
              {
                "passenger_id":null,
                "passenger_name":null,
                "passenger_card_number": null,
                "passenger_card_type":null, //证件类型: 身份证,军人证,护照,港澳居民来往内地通行证,台湾居民来往内地通行证,港澳台居民居住证
                "ticket_type": null, //票种:成人票,携童票（成人可携带身高低于1.5m的儿童）,半票（身高超1.5m的儿童票）
                "buying_insurance": null, //购买保险状态，true为购买
              },
            ],
      }
    },
    name: 'placeorder',
    components: {
      step,
    },
    computed: {
      myObj: {
        get: function () {
          return this.list
        },
      },
    },
         created() {
      this.linkperson()
      this.passengerh()
    },
    mounted() {
      window.dian = this.dian
      //后来加的事件加为全局，无定义
                  this.getShuttleList()
      window.dianpassenger = this.dianpassenger
    },
    
 
    methods: {
   
      //用上个页面请求的接口保存的数据
      getShuttleList() {
        //拿到数据
        var locadata = window.sessionStorage.getItem('locadata')
        console.log(1)
        console.log(locadata)
        //转换格式
        if(locadata!='undefined')
        var locadata = JSON.parse(locadata)
        //赋值
        this.list = locadata
        console.log('我谢谢谢谢')
        console.log(this.list)
        window.sessionStorage.setItem('shift',this.list.shift_id)
      },
      //点击按钮将数据填入联系人文本框
      dian(e) {
        var str = e.className
        var j = str.substr(8, 1)
        this.$http
            .get('/userCenter/getContactPersons', {
              page: 2,
              size: 10,
            })
            .then(function (res) {
              var name = document.querySelector('#name')
              var phone = document.querySelector('#phone')
              var email = document.querySelector('#email')

              var addinputs = document.getElementsByTagName('input')
              for (var k = 0; k < addinputs.length; k++) {
                if (addinputs[k].getAttribute('id') == 'kiki') {
                  addinputs[k].checked = false
                }
              }
              e.checked = true
              for (let i = 0; i < res.data.data.contact_person_list.length; i++) {
                if (
                    res.data.data.contact_person_list[j].name ==
                    res.data.data.contact_person_list[i].name
                ) {
                  window.sessionStorage.setItem(
                      'contact_person_id',
                      res.data.data.contact_person_list[j].contact_person_id
                  )
                  name.value = res.data.data.contact_person_list[i].name
                  phone.value = res.data.data.contact_person_list[i].phone_number
                  email.value = res.data.data.contact_person_list[i].email

                  window.sessionStorage.setItem(
                      'email',
                      res.data.data.contact_person_list[i].email
                  )
                  window.sessionStorage.setItem(
                      'phone_number',
                      res.data.data.contact_person_list[i].phone_number
                  )
                  window.sessionStorage.setItem(
                      'name',
                      res.data.data.contact_person_list[i].name
                  )
                }
              }
            })
      },
      // 常用联系人
      linkperson() {
        this.$http
            .get('/userCenter/getContactPersons', {
              page: 2,
              size: 10,
            })
            .then(function (res) {
              console.log(res)
              var goal = document.querySelector('.goal')
              for (let i = 0; i < res.data.data.contact_person_list.length; i++) {
                goal.innerHTML += `<input type="checkbox" onclick="dian(this)" id="kiki" class="addinput${i}"><li style="margin:-5px 10px 0px 2px">${res.data.data.contact_person_list[i].name}</li>`
              }
            })
            .catch(function () {})
      },
      // // 添加乘车人
      passengerh() {
        this.$http
            .get('/userCenter/getPassagers', {
              page: 2,
              size: 10,
            })
            .then(function (res) {
              console.log(166666)
              console.log(res)
              var chengcheren = document.querySelector('.chengcheren')
              for (let i = 0; i < res.data.data.passager_list.length; i++) {
                chengcheren.innerHTML += `<input type="checkbox" id="kik" onclick="dianpassenger(this)" class="addinput${i}"><li style="margin:-5px 10px 0px 2px">${res.data.data.passager_list[i].name}</li>`
              }
            })
            .catch(function (res) {})
      },
      //下面点击填入输入框
      dianpassenger(e) {
        //拿到他的classname值
        var str = e.className
        var j = str.substr(8, 1)
        console.log(j,'我是j')
        this.$http
            .get('/userCenter/getPassagers', {
              page: 2,
              size: 10,
            })
            .then(function (res) {
              var name = document.querySelector('#passenger_name')
              var card = document.querySelector('#passenger_card_number')
              var addinputs = document.getElementsByTagName('input')
              for (var k = 0; k < addinputs.length; k++) {
                if (addinputs[k].getAttribute('id') == 'kik') {
                  addinputs[k].checked = false
                }
              }
              e.checked = true
              for (let i = 0; i < res.data.data.passager_list.length; i++) {
                if (
                    res.data.data.passager_list[j].name ===
                    res.data.data.passager_list[i].name
                ) {
                  window.sessionStorage.setItem(
                      'passenger_id',
                      res.data.data.passager_list[j].passenger_id
                  )
                  console.log(window.sessionStorage.getItem('passenger_id'))
                  name.value = res.data.data.passager_list[i].name
                  card.value = res.data.data.passager_list[i].card_number

                  window.sessionStorage.setItem(
                      'card',
                      res.data.data.passager_list[i].card_number
                  )
                  window.sessionStorage.setItem(
                      'name',
                      res.data.data.passager_list[i].name
                  )
                }
              }
            })
      },
      //增加联系人
      add() {
        console.log(this.passenger.length,'nnn')
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].show == false) {
            this.items[i].show = true
            return 0
          }
        }
      },
      //删除乘车人
      Delete() {
        for (let j = 0; j < this.items.length; j++) {
          if (this.items[j].show == true) {
            this.items[j].show = false
            return 0
          }
        }
      },
      //实现两个文本框名字同步
      lose1() {
        var bt1 = document.querySelector('.bt1')
        var bt3 = document.querySelector('.bt3')
        if (bt1.value === '') {
          alert('姓名不能为空')
        } else {
          bt3.value = bt1.value
        }
      },
      lose2() {
        var bt2 = document.querySelector('.bt2')
        if (bt2.value === '') {
          alert('号码不能为空')
        } else {
          var reg = /^1[3456789]\d{9}$/
          if (!reg.test(bt2.value)) {
            alert('请输入正确的手机号')
          }
        }
      },
      lose3(that) {
        console.log(that,'that');
        let val = that.target.value ;
        if (val === '') {
          alert('姓名不能为空')
        }
      },
      lose4(that) {
        //   var bt4 = document.querySelector('.bt4')
        let val = that.target.value
        if (val === '') {
          alert('身份证不能为空')
        } else {
          var re =
              /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
          if (!re.test(that.target.value)) {
            alert('请输入正确的身份证号码')
          }
        }
      },
      // 点击提交按钮，判断书写格式，获取id,提交信息
      submit() {
        // var tablelist =  document.querySelector('.tablelist');

        var vm = this
        var bt1 = document.querySelector('.bt1')
        var bt2 = document.querySelector('.bt2')
        var bt3 = document.querySelector('.bt3')
        var bt4 = document.querySelector('.bt4')
        var bt5 = document.querySelector('.bt5')
        // //innerHTML： 设置或获取元素内的所有子节点（包括标签、注释和文本节点）
        if (
            (bt1.value && bt2.value && bt3.value && bt4.value) == null ||
            bt5.checked == false
        ) {
          alert('请完善信息或者仔细阅读购票须知后勾选')
        } else {
          if (window.sessionStorage.getItem('contact_person_id')) {
            var id = window.sessionStorage.getItem('contact_person_id')
            console.log(id,'test')
          } else {
            id = null
          }

          if (window.sessionStorage.getItem('phone_number')) {
            var phone_number = window.sessionStorage.getItem('phone_number')
            console.log(phone_number)
          } else {
            phone_number = null
          }
          if (window.sessionStorage.getItem('name')) {
            var name = window.sessionStorage.getItem('name')
            console.log(name)
          } else {
            name = null
          }
          if (window.sessionStorage.getItem('email')) {
            var email = window.sessionStorage.getItem('email')
            console.log(email)
          } else {
            email = null
          }
          //1
          // onchange , onblur 语法 频繁出现或者元素复用key,
          // 第一点 要给你的第二行第三行赋上值， 付完之之后，for他的length , 如果他的Name 和card number为'',
          var myselect = document.querySelector('.tr1').querySelector('#select1')
          var index1 = myselect.selectedIndex
          var myselect3 = document.getElementById('select3')
          var index2 = myselect3.selectedIndex
          var bt3 = document.querySelector('.tr1').querySelector('.bt3')
          var bt4 = document.querySelector('.tr1').querySelector('.bt4')
          var bt6 = document.querySelector('.tr1').querySelector('.bt6')
          this.passenger[0].passenger_id = (window.sessionStorage.getItem('passenger_id')||null)
          console.log(window.sessionStorage.getItem('passenger_id'),)
          console.log('zijixuande')
          this.passenger[0].ticket_type = myselect.options[index1].value
          this.passenger[0].passenger_card_type = myselect3.options[index2].value
          this.passenger[0].passenger_name = bt3.value
          this.passenger[0].passenger_card_number = bt4.value
          this.passenger[0].buying_insurance = bt6.checked
          //2
          var myselect21 = document
              .querySelector('.tr2')
              .querySelector('#select1')
          var index1 = myselect21.selectedIndex
          var myselect23 = document
              .querySelector('.tr2')
              .querySelector('#select3')
          var index3 = myselect23.selectedIndex
          var btn21 = document.querySelector('.tr2').querySelector('.bt2')
          var btn22 = document.querySelector('.tr2').querySelector('.bt3')
          var btn23 = document.querySelector('.tr2').querySelector('.bt4')
          console.log(btn21.value,'uuuuuuu')

          var classn = document.querySelector('.tr2').className.substr(2,1)

          console.log('执行与否');
          this.passenger[1].ticket_type = myselect21.options[index1].value
          this.passenger[1].passenger_card_type = myselect23.options[index3].value
          this.passenger[1].passenger_name = btn21.value
          this.passenger[1].passenger_card_number = btn22.value
          this.passenger[1].buying_insurance = btn23.checked


          // //3
          var myselect31 = document
              .querySelector('.tr3')
              .querySelector('#select1')
          var index1 = myselect31.selectedIndex
          var myselect33 = document
              .querySelector('.tr3')
              .querySelector('#select3')
          var index3 = myselect33.selectedIndex
          var btn31 = document.querySelector('.tr3').querySelector('.bt2')
          var btn32 = document.querySelector('.tr3').querySelector('.bt3')
          var btn33 = document.querySelector('.tr3').querySelector('.bt4')

          var classn = document.querySelector('.tr3').className.substr(2,1)

          this.passenger[2].ticket_type = myselect31.options[index1].value
          this.passenger[2].passenger_card_type = myselect33.options[index3].value
          this.passenger[2].passenger_name = btn31.value
          this.passenger[2].passenger_card_number = btn32.value
          this.passenger[2].buying_insurance = btn33.checked


          // //4
          var myselect41 = document
              .querySelector('.tr4')
              .querySelector('#select1')
          var index1 = myselect41.selectedIndex
          var myselect43 = document
              .querySelector('.tr4')
              .querySelector('#select3')
          var index3 = myselect33.selectedIndex
          var btn41 = document.querySelector('.tr4').querySelector('.bt2')
          var btn42 = document.querySelector('.tr4').querySelector('.bt3')
          var btn43 = document.querySelector('.tr4').querySelector('.bt4')

          var classn = document.querySelector('.tr4').className.substr(2,1)


          this.passenger[3].ticket_type = myselect41.options[index1].value
          this.passenger[3].passenger_card_type = myselect43.options[index3].value
          this.passenger[3].passenger_name = btn41.value
          this.passenger[3].passenger_card_number = btn42.value
          this.passenger[3].buying_insurance = btn43.checked


          // //5
          var myselect51 = document
              .querySelector('.tr5')
              .querySelector('#select1')
          var index1 = myselect51.selectedIndex
          var myselect53 = document
              .querySelector('.tr5')
              .querySelector('#select3')
          var index3 = myselect33.selectedIndex
          var btn51 = document.querySelector('.tr5').querySelector('.bt2')
          var btn52 = document.querySelector('.tr5').querySelector('.bt3')
          var btn53 = document.querySelector('.tr5').querySelector('.bt4')
          console.log('iiiiii')
          console.log(document.querySelector('.tr5').className)

          var classn = document.querySelector('.tr5').className.substr(2,1)

          this.passenger[4].ticket_type = myselect51.options[index1].value
          this.passenger[4].passenger_card_type = myselect53.options[index3].value
          this.passenger[4].passenger_name = btn51.value
          this.passenger[4].passenger_card_number = btn52.value
          this.passenger[4].buying_insurance = btn53.checked


          if(btn21.value == '' && btn22.value == ''){
            var classn = document.querySelector('.tr2').className.substr(2,1)
            // this.passenger.splice(classn-2,4-classn+2)
            this.passenger.length = 1
          }
          else if(btn31.value == '' && btn32.value == ''){
            var classn = document.querySelector('.tr3').className.substr(2,1)
            // this.passenger.splice(classn-2,4-classn+2)
            this.passenger.length = 2
          }
          else  if(btn41.value == '' && btn42.value == ''){
            var classn = document.querySelector('.tr4').className.substr(2,1)
            // this.passenger.splice(classn-2,4-classn+2)
            this.passenger.length = 3
          }
          else if(btn51.value == '' && btn52.value == ''){
            var classn = document.querySelector('.tr5').className.substr(2,1)
            // this.passenger.splice(classn-2,4-classn+2)
            this.passenger.length = 4
          }

          //提交数据post
          // this.passenger.length = flag;
          console.log(this.passenger , 'qqqq');
          console.log(bt4.value)
          this.$http
              .post('/order/bookOrder', {
                "shuttle_shift_id": window.sessionStorage.getItem('shift'), //班次id
                "contact_person_id": id, //紧急联系人id，勾选常用联系人需要写联系人id，手动填写联系人信息无需写紧急联系人id
                "contact_person_phone_number": phone_number || null, //紧急联系人电话
                "contact_person_name": name || null, //紧急联系人姓名
                "contact_person_email": email || null, //紧急联系人email，选填
                "passenger": this.passenger,
              })
              .then(function (res) {
                          console.log(res)
                      // 判断是否登陆成功
          if (res.data.code == 50006) {
         alert('提交订单失败，您还有未支付订单')
          }
                //保存master_order_number
                if(res.data != '{}')
                  window.sessionStorage.setItem(
                      'master_order_number',
                      res.data.data.master_order_number
                  )
                window.sessionStorage.setItem('passenger_id',null)
                //打印联系人id
                console.log(
                    'id' + window.sessionStorage.getItem('contact_person_id')
                )
                //结束一次，设置id为空
                window.sessionStorage.setItem('contact_person_id', null)
                console.log(res)
                //成功保存数据
                var code = res.data.code
                console.log(res.data.code)
                if (code == 10000) {
                  //转换成字符串键值对存储在数组中
                  var strinfomation = JSON.stringify(res.data.data)
                  //保存在infomation中
                  sessionStorage.setItem('localdata', strinfomation)
                  console.log(window.sessionStorage.getItem('localdata'))
                  vm.$router.push({ path: 'confirm' })
                }
              })
        }
      },
      cancel() {
        this.$http
            .get(
                '/order/cancelOrder?master_order_number=' +
                window.sessionStorage.getItem('master_order_number'),
                {}
            )
            .then(function (res) {
              console.log(window.sessionStorage.getItem('master_order_number'))
              console.log(window.sessionStorage.getItem('master_order_number'))
              console.log('cancel')
              console.log(res)
              if(res.data.code == 50003){
                alert('取消订单失败，请稍后重试')
              }
            })
      },
    },
  }
</script>
<style scoped>
  * {
    color: #444;
    margin: 0;
    padding: 0;
    font-family: 'Microsoft YaHei', \5fae\8f6f\96c5\9ed1, arial, \5b8b\4f53;
  }

  .delete {
    position: relative;
    left: 32.5rem;
    top: -1.5rem;
  }
  tr {
    margin: 1.25rem;
  }
  .save1 {
    margin: 6px 0 0 2.5rem;
  }
  .border {
    width: 53.75rem;
    padding: 2.5rem;
    border: 0.025rem solid #cccccc;
  }
  .sidebar {
    color: #444;
    width: 17.25rem;
    margin-left: 1.5rem;
    margin-top: 1rem;
  }
  .mar {
    height: 2.5rem;
    line-height: 2.5rem;
    background: #f4f8fb;
    text-align: center;
    font-size: 1rem;
    font-weight: bold;
    color: #2c96ea;
  }
  p {
    font-size: 0.75rem;
    line-height: 1.5625rem;
    color: #4f71a1;
    margin: 5px 0;
    font-weight: 500;
  }

  .message,
  .link,
  .riding {
    font-size: 0.75rem;
    border-color: #2577e3 #cccccc #cccccc;
    border-right: 1px solid #cccccc;
    border-style: solid;
    border-width: 3px 1px 1px;
    line-height: 20px;
    margin: 16px 0 0;
    padding: 5px 3px 0px -1px;
    width: 53.75rem;
    float: left;
  }
  .message .chose {
    background: #f6f9fe;
  }
  .link,
  .riding {
    margin: 1.25rem 0;
    width: 53.75rem;
    border: #2577e3 #cccccc #2577e3;
  }
  em,
  i,
  span {
    font-size: 1.1rem;
    font-style: initial;
    font-weight: bold;
    color: #666;
  }
  .link .bottom,
  .please {
    font-size: 0.75rem;
    color: #444;
    line-height: 1.25rem;
    margin: 0;
    padding: 0;
    width: 53.2rem;
    /* border: 1px solid #e1e1e1; */
    background: #f6f9fe;
    margin-bottom: 0.125rem;
    margin: 0.25rem 0.0625rem 0.25rem;
  }
  .bottom h3 {
    margin: 0;
    font-size: 100%;
    font-weight: bold;
    padding: 0.0625rem 0.625rem 0.0625rem 0.625rem;
    color: #2577e3;
    float: left;
    height: 2.5rem;
    line-height: 2.5rem;
  }
  ul {
    display: flex;
    margin: 0.625rem 0 0.625rem;
    padding: 0.625rem 0 0.625rem;
  }
  ul li {
    float: left;
    flex: 1;
  }
  span {
    color: red;
  }
  .riding,
  .border {
    width: 100%;
  }
  input {
    outline: none;
  }
  .riding .newpassenger {
    width: 100%;
    background: #f6f9fe;
    margin: 0.25rem 0.0625rem 0.25rem;
  }
  .please {
    clear: both;
    background: #f6f9fe;
    margin: 2rem 0.0625rem 0.8rem;
    width: 100%;
  }
  .please h3 {
    color: #2577e3;
    height: 2.5rem;
    line-height: 2.5rem;
    margin: 0.25rem 0.0625rem 0.25rem;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  tr {
    font-size: 12px;
    line-height: 20px;
    border-collapse: collapse;
    border-spacing: 0;
    text-align: center;
    color: #666;
  }
  .fonw1 {
    font-weight: 600;
  }
  .fonw1 td,
  .fonw2 td {
    /* border: .3px solid #596289; */
    box-shadow: lightblue 1px 1px;
  }
  .fonw2 {
    height: 3rem;
    line-height: 3rem;
    text-align: center;
  }
  th {
    /* border: solid #cfccbd 1px; */
    background: #ffedd5;
    line-height: 1.5625rem;
    color: #596289;
    font-weight: bold;
    font-size: 0.875rem;
    width: 10%;
  }
  .new {
    clear: both;
  }
  a {
    text-decoration: none;
    color: #2577e3;
  }
  .submit {
    height: 5rem;
    margin-top: 0.25rem;
  }
  .submit input {
    display: inline-block;
    font-family: tahoma;
    outline: 0 none;
    background-color: #ff9913;
    border: 0px solid #ff9913;
    color: #ffffff;
    cursor: pointer;
    font-size: 1.125rem;
    font-weight: bold;
    height: 3.125rem;
    line-height: 3.125rem;
    width: 11.25rem;
    text-align: center;
    margin-top: 1.5rem;
    margin-left: 20.25rem;
  }
  .placeorder {
    display: flex;
  }
  .left {
    flex: 3;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .left .message {
    width: 100%;
  }
  .left .message .link {
    width: 100%;
  }
  .left .message .link .bottom {
    width: 100%;
  }
  .sidebar {
    flex: 1;
    border: 0.0125rem solid #cccccc;
    /* padding: 1.025rem; */
  }
</style>