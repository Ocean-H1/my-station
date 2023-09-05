<template>
  <div class="submitOrder">
    <el-row :gutter="20">
      <el-col :span="17">
        <div class="ticketTitle">
          您要购买的<span style="color: #2577e3">车票信息</span>如下:
        </div>
        <!-- 用户选择车票信息 -->
        <el-table
          :data="ticketInfo"
          stripe
          border
          highlight-current-row
          :header-cell-style="{
            background: '#068abb',
            color: '#fff',
            letterSpacing: '5px',
            textAlign: 'center',
          }"
          :cell-style="{ textAlign: 'center' }"
          size="small"
        >
          <el-table-column label="发车时间" prop="shuttle_shift_time">
          </el-table-column>
          <el-table-column label="始发站" prop="start_station">
          </el-table-column>
          <el-table-column label="目的站" prop="final_station">
          </el-table-column>
          <el-table-column label="全价(元)" prop="ticket_price">
          </el-table-column>
          <el-table-column label="剩余票数" prop="unuse_ticket_quantity">
          </el-table-column>
          <el-table-column label="班次类型" prop="shuttle_shift_type">
          </el-table-column>
          <el-table-column label="里程" prop="full_length"> </el-table-column>
          <el-table-column label="车型" prop="car_model"> </el-table-column>
        </el-table>
        <div class="ticketTitle">
          联系人信息:<span style="color: red"> * </span>为必填项
        </div>
        <div>
          <span style="color: #2577e3; font-size: 14px; letter-spacing: 2px"
            >请选择联系人:</span
          >
        </div>
        <!-- 常用联系人选择区域 -->

        <div style="margin: 15px 0"></div>
        <el-checkbox-group
          v-model="checked_personList"
          @change="CheckedPersonChange"
          :max="1"
        >
          <el-checkbox
            v-for="person in contact_list"
            :key="person.contact_person_id"
            :label="person"
            @change="(checked) => contactBoxChange(checked, person)"
            >{{ person.name }}</el-checkbox
          >
        </el-checkbox-group>
        <!-- 手动填写联系人表单区域 -->
        <el-form
          :model="contactForm"
          :rules="contactRules"
          ref="contactFormRef"
          class="contactForm"
          label-width="60px"
        >
          <el-form-item label="姓名" prop="contact_person_name">
            <el-input
              v-model="contactForm.contact_person_name"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="contact_person_phone_number">
            <el-input
              v-model="contactForm.contact_person_phone_number"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="contact_person_email">
            <el-input
              v-model="contactForm.contact_person_email"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="ticketTitle">
          乘车人信息:<span style="color: red"> * </span>为必填项
        </div>
        <div>
          <span style="color: #2577e3; font-size: 14px; letter-spacing: 2px"
            >请选择乘车人:</span
          >
        </div>
        <!-- 常用乘车人选择区域 -->

        <div style="margin: 15px 0"></div>
        <el-checkbox-group
          v-model="checked_passagerList"
          @change="CheckedPassChange"
        >
          <el-checkbox
            v-for="passager in passager_list"
            :key="passager.passenger_id"
            :label="passager"
            @change="(checked) => pasBoxChange(checked, passager)"
            >{{ passager.name }}</el-checkbox
          >
        </el-checkbox-group>
        <div style="margin: 15px 0"></div>
        <!-- 乘车人信息区 -->
        <el-form
          :model="addPasForm"
          ref="addPasFormRef"
          :rules="addPasForm.addPasRules"
          :inline="true"
          label-width="100px"
        >
          <el-table
            :data="addPasForm.passenger"
            border
            style="width: 100%"
            :header-cell-style="{
              background: '#f6f9fe',
              color: '#fff',
              letterSpacing: '5px',
              textAlign: 'center',
            }"
            :cell-style="{ textAlign: 'center' }"
            size="small"
          >
            <el-table-column width="120px">
              <template slot="header">
                <span style="color: #2d65dc">票种</span>
              </template>
              <template slot-scope="scope">
                <el-form-item>
                  <el-select v-model="scope.row.ticket_type" size="mini">
                    <el-option
                      v-for="type in [
                        { value: '成人票' },
                        { value: '半票' },
                        { value: '携童票' },
                      ]"
                      :key="type.value"
                      :value="type.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column width="90px">
              <template slot="header">
                <span style="color: #2d65dc">购买保险</span>
              </template>
              <template slot-scope="scope">
                <el-form-item>
                  <el-checkbox
                    v-model="scope.row.buying_insurance"
                  ></el-checkbox>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot="header">
                <span style="color: #2d65dc">证件类型</span>
                <i style="color: #f56c6c">*</i>
              </template>
              <template slot-scope="scope">
                <el-form-item>
                  <el-select
                    v-model="scope.row.passenger_card_type"
                    size="mini"
                  >
                    <el-option
                      v-for="type in [
                        { value: '身份证' },
                        { value: '军人证' },
                        { value: '护照' },
                        { value: '港澳居民来往内地通行证' },
                        { value: '台湾居民来往内地通行证' },
                        { value: '港澳台居民居住证' },
                      ]"
                      :key="type.value"
                      :value="type.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column width="140">
              <template slot="header">
                <span style="color: #2d65dc">姓名</span>
                <i style="color: #f56c6c">*</i>
              </template>
              <template slot-scope="scope">
                <el-form-item
                  :prop="`passenger.${scope.$index}.passenger_name`"
                  :rules="addPasForm.addPasRules.passenger_name"
                >
                  <el-input
                    type="text"
                    v-model="scope.row.passenger_name"
                    autocomplete="off"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column width="190">
              <template slot="header">
                <span style="color: #2d65dc">证件号</span>
                <i style="color: #f56c6c">*</i>
              </template>
              <template slot-scope="scope">
                <el-form-item
                  :prop="`passenger.${scope.$index}.passenger_card_number`"
                  :rules="addPasForm.addPasRules.passenger_card_number"
                >
                  <el-input
                    v-model="scope.row.passenger_card_number"
                    autocomplete="off"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column width="140">
              <template slot="header">
                <span style="color: #2d65dc">出生日期</span>
              </template>
              <template slot-scope="scope">
                <el-form-item>
                  <el-input
                    :value="getBirth(scope.row.passenger_card_number)"
                    size="mini"
                    placeholder="格式: 2020-01-20"
                  ></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot="header">
                <span style="color: #2d65dc">操作</span>
              </template>
              <template slot-scope="scope">
                <el-form-item>
                  <el-button
                    type="danger"
                    size="mini"
                    @click="del_pasBybutton(scope.$index, scope.row)"
                    >删除</el-button
                  >
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
        </el-form>

        <!-- 添加乘车人信息 -->
        <div class="add_passenger">
          <el-tooltip
            effect="light"
            content="一个订单最多可订购 5张 车票"
            placement="bottom"
          >
            <el-button
              type="primary"
              style="width: 150px; letter-spacing: 2px"
              @click="add_passenger()"
              >添加乘车人</el-button
            >
          </el-tooltip>
        </div>

        <div class="must_know">
          <el-checkbox v-model="if_know">我已阅读</el-checkbox
          ><router-link to="/help">《购票须知》</router-link>
        </div>
        <!-- 提交订单区域 -->
        <div class="submit_order">
          <el-button
            type="warning"
            @click="handleBookParams"
            style="width: 180px; height: 40px"
            >提 交 订 单</el-button
          >
        </div>
      </el-col>
      <!-- 右侧公告区 -->
      <el-col :span="7"></el-col>
    </el-row>
  </div>
</template>

<script>
import { bookOrder } from '@/services/index';
export default {
  name: 'submitOrder',
  data() {
    return {
      ticketInfo: [JSON.parse(this.$route.query.ticketInfo || '{}')],
      //   已选中的联系人列表
      checked_personList: [],
      // 常用联系人列表
      contact_list: [],
      // 联系人信息
      contactForm: {
        contact_person_name: '',
        contact_person_phone_number: '',
        contact_person_email: '',
        contact_person_id: null,
      },
      contactRules: {
        contact_person_name: [
          { required: 'true', message: '联系人姓名不能为空!', trigger: 'blur' },
        ],
        contact_person_phone_number: [
          { required: true, message: '联系人手机号不能为空!', trigger: 'blur' },
          {
            type: 'string',
            pattern: /^(13\d|14[5|7]|15\d|166|17[3|6|7]|18\d)\d{8}$/,
            message: '请输入有效的手机号码',
            trigger: 'blur',
          },
        ],
      },
      //   常用乘车人列表
      passager_list: [],
      checked_passagerList: [],
      //   添加乘车人信息的表单对象
      addPasForm: {
        passenger: [
          {
            passenger_id: null,
            passenger_name: '',
            passenger_card_number: '',
            passenger_card_type: '身份证',
            ticket_type: '成人票',
            buying_insurance: false,
          },
        ],
        addPasRules: {
          passenger_name: [
            { required: true, message: '姓名不能为空!', trigger: 'blur' },
          ],
          passenger_card_number: [
            { required: true, message: '证件号不能为空!', trigger: 'blur' },
          ],
        },
      },
      // 是否同意购票须知
      if_know: false,
    };
  },
  methods: {
    //   查询常用联系人
    async getContactPersons() {
      const { data: res } = await this.$http.get(
        `/userCenter/getContactPersons`,
      );
      if (res.code !== 10000) {
        this.contact_list = [];
        return this.$message.error(res.message);
      }
      this.contact_list = res.data.contact_person_list;
    },
    // 查询常用乘车人
    async getPassagers() {
      const { data: res } = await this.$http.get(`/userCenter/getPassagers`);
      if (res.code !== 10000) {
        this.passager_list = [];
        return this.$message.error(res.message);
      }
      this.passager_list = res.data.passager_list;
    },
    // 联系人复选框列表触发事件
    CheckedPersonChange(value) {
      let checkedCount = value.length;
      this.checkAllPerson = checkedCount === this.contact_list.length;
      this.isPersonIndeterminate =
        checkedCount > 0 && checkedCount < this.contact_list.length;
    },
    // 乘车人复选框列表触发事件
    CheckedPassChange(value) {
      let checkedCount = value.length;
      this.checkAllPassager = checkedCount === this.passager_list.length;
      this.isPassIndeterminate =
        checkedCount > 0 && checkedCount < this.passager_list.length;
    },
    // 添加乘车人信息
    add_passenger(info = null) {
      if (this.addPasForm.passenger.length === 5) {
        return this.$message.error('一个订单最多订购 5 张车票！');
      }
      if (info) {
        return this.addPasForm.passenger.push(info);
      }
      // 默认情况下，添加一个空的乘车人信息行
      let params = {
        passenger_id: null,
        passenger_name: '',
        passenger_card_number: '',
        passenger_card_type: '身份证',
        ticket_type: '成人票',
        buying_insurance: false,
      };
      this.addPasForm.passenger.push(params);
    },
    // 通过checkbox删除乘车人信息
    del_pasBycheckBox(row) {
      let arr = [];
      const del_id = row.passenger_id;
      this.addPasForm.passenger.forEach((item) => {
        if (item.passenger_id != del_id) {
          arr.push(item);
        }
      });
      this.addPasForm.passenger = arr;
    },
    // 通过行内按钮删除信息
    del_pasBybutton(index, row) {
      const del_id = row.passenger_id;
      let arr = [];
      this.checked_passagerList.forEach((item) => {
        if (item.passenger_id != del_id) {
          arr.push(item);
        }
      });
      this.checked_passagerList = arr;
      this.addPasForm.passenger.splice(index, 1);
    },
    // 乘车人checkbox值发生变化
    pasBoxChange(checked, passenger) {
      if (checked) {
        // 增加/填充 乘车人信息
        const { passenger_id, name, card_number, card_type } = passenger;
        const info = {
          passenger_id,
          passenger_name: name,
          passenger_card_number: card_number,
          passenger_card_type: card_type,
          buying_insurance: false,
          ticket_type: '成人票',
        };
        this.add_passenger(info);
      } else {
        // 删除/取消 乘车人信息
        this.del_pasBycheckBox(passenger);
      }
    },
    // 联系人checkbox值发生变化
    contactBoxChange(checked, person) {
      if (checked) {
        const { name, phone_number, email, contact_person_id } = person;
        this.contactForm = {
          contact_person_name: name,
          contact_person_phone_number: phone_number,
          contact_person_email: email,
          contact_person_id,
        };
      } else {
        this.contactForm = {
          contact_person_name: '',
          contact_person_phone_number: '',
          contact_person_email: '',
          contact_person_id: null,
        };
      }
    },
    // 根据身份证号获取出生日期
    getBirth(idCard) {
      let birth;
      // 二代身份证
      if (idCard.length === 18) {
        birth =
          idCard.substring(6, 10) +
          '-' +
          idCard.substring(10, 12) +
          '-' +
          idCard.substring(12, 14);
      }
      // 一代身份证
      if (idCard.length === 15) {
        birth =
          '19' +
          idCard.substring(6, 8) +
          '-' +
          idCard.substring(8, 10) +
          '-' +
          idCard.substring(10, 12);
      }
      return birth;
    },
    // 处理订单提交请求的参数
    handleBookParams() {
      let params = {
        shuttle_shift_id: this.ticketInfo[0].shift_id,
        contact_person_id: this.contactForm.contact_person_id,
        contact_person_phone_number:
          this.contactForm.contact_person_phone_number,
        contact_person_name: this.contactForm.contact_person_name,
        contact_person_email: this.contactForm.contact_person_name,
        passenger: this.addPasForm.passenger,
      };
      this.bookOrder(params);
    },
    // 提交订单并预订订单
    bookOrder(params) {
      this.$refs.contactFormRef.validate((valid) => {
        if (!valid) return;
        this.$refs.addPasFormRef.validate(async (valid) => {
          if (!valid) return;
          if (!this.if_know) return this.$message.error('请先同意购票须知！');

          const [res, err] = await bookOrder(params);

          if (err) {
            return this.$message.error(err.message);
          }
          this.$message.success('提交订单成功！');

          this.$emit('getSteps', 2);
          this.$router.push({
            path: '/purchase/confirmOrder',
            query: {
              order: JSON.stringify(res),
            },
          });
        });
      });
    },
  },
  created() {
    this.getContactPersons();
    this.getPassagers();
  },
};
</script>

<style scoped>
.el-row {
  width: 100%;
}
.ticketTitle {
  font-size: 18px;
  font-weight: 600;
  margin: 3vh 0 0 0;
  padding: 10px 0;
  letter-spacing: 2px;
  border-top: 2px solid #2577e3;
}
.contactForm {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  padding-top: 15px;
}
.contactForm .el-form-item {
  margin-bottom: 0px;
}
.add_passenger {
  width: 100%;
  padding: 20px 0;
  text-align: right;
}
.submit_order {
  margin-top: 5vh;
  text-align: center;
}
.must_know {
  border-top: 2px solid #2577e3;
  font-size: 16px;
  padding: 10px 0;
}
</style>
