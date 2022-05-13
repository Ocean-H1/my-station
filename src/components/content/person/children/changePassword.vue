<template>
  <div class="info">
    <div class="cards">
      <div class="cards-header">修改密码</div>
      <div class="cards-body">
        <div class="form">
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="原  密  码">
              <el-input v-model="form.oldPwd" :show-password="true"></el-input>
            </el-form-item>
            <el-form-item label="新  密  码">
              <el-input v-model="form.pwd" :show-password="true"></el-input>
            </el-form-item>
            <el-form-item label="新密码确认">
              <el-input v-model="form.check_pwd" :show-password="true"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button style="width: 100%;" type="danger" @click="clickSubmit"
                >提交</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'

export default {
  data () {
    return {
      form:{
        oldPwd:'',
        pwd:'',
        check_Pwd:'',
      }
    }
  },

  methods: {
    clickSubmit() {
      const { oldPwd, pwd, check_pwd } = this.form
      if (!oldPwd || !pwd || !check_pwd) {
        console.log(!oldPwd, !pwd, !check_pwd)
        Message.error('密码不能为空')
        return
      } else if (oldPwd == pwd) {
        Message.error('不能与原密码相同')
        return
      } else if (pwd != check_pwd) {
        Message.error('新密码不一致')
        return
      } else {
        this._setPassword({
          old_password: this.$utils.md5(oldPwd, 16),
          password: this.$utils.md5(pwd, 16),
        })
      }
    },

    // 设置密码
    _setPassword(data) {
      this.$http
        .request({
          url: '/userCenter/modifyPassword',
          method: 'POST',
          data,
        })
        .then((res) => {
          if (res.data.code === 10000) {
            Message.success(res.data.message)
          }
        })
    },
  },
}
</script>

<style scoped>
 .form{
   width: 40%;
   margin: 120px auto;
 }
</style>