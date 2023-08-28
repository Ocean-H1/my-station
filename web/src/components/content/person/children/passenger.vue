<template>
  <div class="info">
    <div class="cards">
      <div class="cards-header">常用乘车人</div>
      <div class="cards-body">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="index" label="序号" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="card_type" label="证件类型"></el-table-column>
          <el-table-column prop="card_number" label="证件号码">
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="row">
              <el-button
                type="primary"
                size="small"
                @click="handleEdit(row.$index)"
              >
                修改
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click="handleDelete(row.$index)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <!-- 分页区 -->
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            background
            :page-size='queryForm.size'
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
        <div class="add">
          <a @click="isShow = !isShow" href="#">添加常用乘车人</a>
        </div>
        <div v-show="isShow" class="form">
          <div class="inner">
            <el-form ref="form" :model="form" label-width="100px">
              <el-form-item label="姓 名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="证件类型">
                <el-select v-model="form.power" placeholder="请选择">
                  <el-option value="身份证">身份证</el-option>
                  <el-option value="军人证">军人证</el-option>
                  <el-option value="护照">护照</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="证件号">
                <el-input v-model="form.idNumber"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button style="width: 100%;" type="danger" @click="submit"
                  >提交</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <el-dialog :visible.sync="isShowEdit" width="30%">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="姓 名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-select v-model="form.power" placeholder="请选择">
              <el-option value="身份证">身份证</el-option>
              <el-option value="军人证">军人证</el-option>
              <el-option value="护照">护照</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号">
            <el-input v-model="form.idNumber"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isShowEdit = false">取 消</el-button>
          <el-button type="primary" @click="handleSave">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'

export default {
  data () {
    return {
      tableData: [],
      isShow: false,
      form: {
        name: '',
        power: '身份证',
        idNumber: '',
      },
      queryForm: {
        page: 1,
        size: 6
      },
      isShowEdit: false,
      total: 0
    }
  },

  mounted() {
    this._getPassagers()
  },

  methods: {
    handleEdit(index) {
      this.passenger_id = this.tableData[index].passenger_id
      this.isShowEdit = true
      this.form = {
        power: this.tableData[index].card_type,
        name: this.tableData[index].name,
        idNumber: this.tableData[index].card_number,
      }
    },

    // 监听页码改变
    handleCurrentChange(newPage) {
      this.queryForm.page = newPage
      this._getPassagers()
    },

    handleDelete(index) {
      this._delete({ passenger_id: this.tableData[index].passenger_id }, index)
    },

    handleSave() {
      const {
        form: { name, power, idNumber },
      } = this
      if (!name) {
        Message.error('姓名不能为空')
        return
      } else if (!idNumber) {
        Message.error('证件号不能为空')
        return
      } else {
        this._edit({
          name,
          card_number: idNumber,
          card_type: power,
          passenger_id: this.passenger_id,
        })
      }
    },

    submit() {
      const {
        form: { name, power, idNumber },
      } = this
      if (!name) {
        Message.error('姓名不能为空')
        return
      } else if (!idNumber) {
        Message.error('证件号不能为空')
        return
      } else {
        this._add({
          name,
          card_number: idNumber,
          card_type: power,
        })
      }
    },

    _delete(params, index) {
      this.$http
        .request({
          url: '/userCenter/deletePassager',
          method: 'get',
          params,
        })
        .then((result) => {
          console.log(result.data)
          if (result.data.code === 10000) {
            Message.success('删除成功')
            this.tableData.splice(index, 1)
          }
        })
    },

    _add(data) {
      this.$http
        .request({
          url: '/userCenter/addPassager',
          method: 'post',
          data
        })
        .then((result) => {
          console.log(result.data)
          if (result.data.code === 10000) {
            Message.success('添加成功')
            this.isShow = false
            this._getPassagers()
          }
        })
    },

    _edit(data) {
      this.$http
        .request({
          url: '/userCenter/modifyPassager',
          method: 'post',
          data,
        })
        .then((result) => {
          console.log(result.data)
          if (result.data.code === 10000) {
            Message.success('修改成功')
            this.isShowEdit = false
            this._getPassagers()
          }
        })
    },

    // 获取乘车人列表
    _getPassagers() {
      this.$http
        .request({
          url: `/userCenter/getPassagers?page=${this.queryForm.page}&size=${this.queryForm.size}`,
          method: 'get'
        })
        .then((result) => {

          console.log(result.data)
          this.tableData = result.data.data.passager_list
          this.total= result.data.total
        })
    },
  },
}
</script>

<style scoped>
.form {
  width: 80%;
  padding: 50px 0;
  background: #f5f5f5;
  margin-top: 30px;
  margin-left: 50px;
}
.form .inner {
  width: 40%;
  margin: 0 auto;
}
.btns {
  margin-top: 20px;
  text-align: right;
}
.add a {
  font-weight: bold;
  margin-left: 50px;
  text-decoration: none;
  color: #1a66b3;
}
.el-select {
  width: 100%;
}

.pagination{
  text-align: right;
  margin: 10px 0;
}
</style>