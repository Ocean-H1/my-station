<template>
  <div class="info">
    <div class="cards">
      <div class="cards-header">常用联系人</div>
      <div class="cards-body">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="index" label="序号" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="email" label="邮箱"> </el-table-column>
          <el-table-column prop="phone_number" label="电话号码">
          </el-table-column>
          <el-table-column label="操作">
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
        <div class="btns">
<!--          <el-button>上一页</el-button>-->
<!--          <el-button>下一页</el-button>-->
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
          <a
            @click="
              isShow = !isShow;
              form = { name:'',phone:'', email:''}
            "
            href="#"
            >添加常用联系人</a
          >
        </div>
        <div v-show="isShow" class="form">
          <div class="inner">
            <el-form ref="form" :model="form" label-width="100px">
              <el-form-item label="姓 名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="电 话">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
              <el-form-item label="Email">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button style="width: 100%;" type="danger" @click="submit">提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <el-dialog :visible.sync="isShowEdit" width="30%">
        <el-form ref="form" model="form" label-width="100px">
          <el-form-item label="姓 名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="电 话">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="Email">
            <el-input v-model="form.email"></el-input>
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
        phone: '',
        email: '',
      },
      isShowEdit: false,
      queryForm: {
        page: 1,
        size: 6
      },
      total: 0
    }
  },

  mounted() {
    this._getUserInfo()
  },

  methods: {
    handleEdit(index) {
      this.contact_person_id = this.tableData[index].contact_person_id
      this.isShowEdit = true
      this.form = {
        phone: this.tableData[index].phone_number,
        name: this.tableData[index].name,
        email: this.tableData[index].email,
      }
    },
    // 监听页码改变
    handleCurrentChange(newPage) {
      this.queryForm.page = newPage
      this._getUserInfo()
    },

    handleDelete(index) {
      this._delete(
        { contact_person_id: this.tableData[index].contact_person_id },
        index
      )
    },

    handleSave() {
      const {
        form: { name, email, phone },
      } = this
      if (!name) {
        Message.error('姓名不能为空')
        return
      } else if (!phone) {
        Message.error('电话号不能为空')
        return
      } else {
        this._edit({
          name,
          email: email,
          phone_number: phone,
          contact_person_id: this.contact_person_id,
        })
      }
    },

    submit() {
      const {
        form: { name, email, phone },
      } = this
      if (!name) {
        Message.error('姓名不能为空')
        return
      } else if (!phone) {
        Message.error('电话号不能为空')
        return
      } else {
        this._add({
          name,
          email: email,
          phone_number: phone,
        })
      }
    },

    _delete(params, index) {
      this.$http
        .request({
          url: '/userCenter/deleteContactPerson',
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
          url: '/userCenter/addContactPerson',
          method: 'post',
          data,
        })
        .then((result) => {
          console.log(result.data)
          if (result.data.code === 10000) {
            Message.success('添加成功')
            this.isShow = false
          }
        })
    },

    _edit(data) {
      this.$http
        .request({
          url: '/userCenter/modifyContactPerson',
          method: 'post',
          data,
        })
        .then((result) => {
          console.log(result.data)
          if (result.data.code === 10000) {
            Message.success('修改成功')
            this.isShowEdit = false
            this._getUserInfo()
          }
        })
    },

    // 获取乘车人列表
    _getUserInfo() {
      this.$http
        .request({
          url: `/userCenter/getContactPersons?page=${this.queryForm.page}&size=${this.queryForm.size}`,
          method: 'get',
        })
        .then((result) => {
          console.log(result.data)
          this.tableData = result.data.data.contact_person_list
          this.total = result.data.total
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
</style>