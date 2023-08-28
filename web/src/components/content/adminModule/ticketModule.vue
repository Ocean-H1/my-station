<template>
  <div class="ticketModule">
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 查询区 -->
      <el-form
        :model="QueryForm"
        :rules="QueryRules"
        ref="QueryFormRef"
        label-width="80px"
        label-position="left"
        class="queryForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="QueryForm.name"></el-input>
        </el-form-item>
        <el-form-item label="证件类型" prop="card_type">
          <el-select v-model="QueryForm.card_type" placeholder="请选择证件类型">
            <el-option
              v-for="item in cardTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码" prop="card_number">
          <el-input v-model="QueryForm.card_number"></el-input>
        </el-form-item>
        <el-button type="primary" style="height: 40px" @click="getOrderList"
          >查 询</el-button
        >
      </el-form>
      <!-- 车票列表区 -->
      <el-table
        :data="ticketList"
        border
        stripe
        highlight-current-row
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column
          label="订单创建时间"
          prop="create_time"
        ></el-table-column>
        <el-table-column label="线路" prop="shuttle_line"></el-table-column>
        <el-table-column label="订单状态">
          <span>已支付</span>
        </el-table-column>
        <el-table-column
          label="乘车人姓名"
          prop="passenger_name"
        ></el-table-column>
        <el-table-column
          label="乘车人证件类型"
          prop="passenger_name"
        ></el-table-column>
        <el-table-column
          label="乘车人证件号码"
          prop="passenger_card_type"
        ></el-table-column>
        <el-table-column label="乘车码" prop="ride_code"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="showEditDialog(scope.row)"
            size="mini"
              >编 辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 编辑车票信息的对话框 -->
      <el-dialog
        title="编辑车票"
        :visible.sync="EditDialogVisible"
        width="70%"
        @close="EditDialogClosed"
      >
        <el-form
          :model="editForm"
          :rules="editFormRules"
          ref="editFormRef"
          class="editForm"
          label-width="110px"
        >
          <el-form-item label="订单创建时间" prop="create_time">
            <el-input
              v-model="editForm.create_time"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="线路" prop="shuttle_line">
            <el-input
              v-model="editForm.shuttle_line"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-input :disabled="true" value="已支付"></el-input>
          </el-form-item>
          <el-form-item label="乘车人姓名" prop="passenger_name">
            <el-input v-model="editForm.passenger_name"></el-input>
          </el-form-item>
          <el-form-item
            label="乘车人证件类型"
            label-width="130px"
            prop="passenger_card_type"
          >
            <el-select
              v-model="editForm.passenger_card_type"
              placeholder="请选择证件类型"
            >
              <el-option
                v-for="item in cardTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="乘车人证件号码"
            label-width="130px"
            prop="passenger_card_number"
          >
            <el-input v-model="editForm.passenger_card_number"></el-input>
          </el-form-item>
          <el-form-item label="乘车码" prop="ride_code">
            <el-input v-model="editForm.ride_code" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="EditDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editTicketInfo">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ticketModule',
  data() {
    return {
      QueryForm: {
        name: '',
        card_type: '',
        card_number: '',
      },
      QueryRules: {
        name: [{ required: 'true', message: '请输入姓名', trigger: 'blur' }],
        card_type: [
          { required: 'true', message: '请选择证件类型', trigger: 'blur' },
        ],
        card_number: [
          { required: 'true', message: '请输入证件号', trigger: 'blur' },
          {
            min: 18,
            message: '请检查证件号是否有误！',
            trigger: 'blur',
          },
        ],
      },
      // 证件类型
      cardTypes: [
        {
          value: '身份证',
          label: '身份证',
        },
        {
          value: '军人证',
          label: '军人证',
        },
        {
          value: '护照',
          label: '护照',
        },
        {
          value: '港澳居民来往内地通行证',
          label: '港澳居民来往内地通行证',
        },
        {
          value: '台湾居民来往内地通行证',
          label: '台湾居民来往内地通行证',
        },
        {
          value: '港澳台居民居住证',
          label: '港澳台居民居住证',
        },
      ],
      // 查询到的车票列表
      ticketList: [],
      // 控制编辑对话框的显示/隐藏
      EditDialogVisible: false,
      editForm: {},
      editFormRules: {
        passenger_name: [
          { required: 'true', message: '请输入乘车人姓名', trigger: 'blur' },
        ],
        passenger_card_type: [
          {
            required: 'true',
            message: '请选择乘车人证件类型',
            trigger: 'blur',
          },
        ],
        passenger_card_number: [
          { required: 'true', message: '请输入乘车人证件号', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    // 查询车票
    getOrderList() {
      this.$refs.QueryFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post(
          `/manage/getOrderList`,
          this.QueryForm
        )
        if (res.code != 10000) {
          return this.$message({
            type: 'error',
            message: res.message,
            duration: 2000,
          })
        }

        this.ticketList = res.data.order_list
        this.$message.success('查询车票成功！')
      })
    },
    // 编辑车票
    EditDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    showEditDialog(ticketInfo) {
      this.editForm = ticketInfo
      this.EditDialogVisible = true
    },
    editTicketInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post(
          `/manage/modifyOrderInfo`,
          this.editForm
        )
        if (res.code != 10000) {
          return this.$message({
            type: 'error',
            message: res.message,
            duration: 2000,
          })
        }
        this.EditDialogVisible = false
        this.$message.success('修改车票信息成功！')
      })
    },
  },
}
</script>

<style scoped>
.queryForm {
  display: flex;
  justify-content: space-around;
}
.editForm {
  max-width: 1050px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.dialog-footer {
  display: flex;
  justify-content: space-evenly;
}
</style>
