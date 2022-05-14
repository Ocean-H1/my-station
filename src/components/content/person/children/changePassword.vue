<template>
  <div class="info">
    <div class="cards">
      <div class="cards-header">修改密码</div>
      <div class="cards-body">
        <div class="form">
          <el-form
            ref="modifyFormRef"
            :model="modifyForm"
            label-width="100px"
            :rules="modifyRules"
          >
            <el-form-item label="原密码" prop="old_password">
              <el-input
                v-model="modifyForm.old_password"
                :show-password="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="password">
              <el-input
                v-model="modifyForm.password"
                :show-password="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码确认" prop="check_Pwd">
              <el-input
                v-model="modifyForm.check_Pwd"
                :show-password="true"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button style="width: 100%" type="danger" @click="_setPassword"
                >提 交</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 判断两次密码输入是否一致
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码！'))
      } else if (value !== this.modifyForm.password) {
        callback(new Error('两次输入不一致，请重新输入！'))
      } else {
        callback()
      }
    }
    return {
      modifyForm: {
        old_password: '',
        password: '',
        check_Pwd: '',
      },
      modifyRules: {
        old_password: [
          { required: 'true', message: '请输入旧密码', trigger: 'blur' },
        ],
        password: [
          { required: 'true', message: '请输入新密码', trigger: 'blur' },
        ],
        check_Pwd: [
          {
            validator: validatePass,
            trigger: 'blur',
          },
        ],
      },
    }
  },

  methods: {
    // 修改密码
    _setPassword() {
      this.$refs.modifyFormRef.validate(async (valid) => {
        if (!valid) return

        const { data: res } = await this.$http.post(
          `/userCenter/modifyPassword`,
          {
            old_password: this.$utils.md5(this.modifyForm.old_password, 16),
            password: this.$utils.md5(this.modifyForm.password, 16),
          }
        )

        if (res.code !== 10000) {
          return this.$message.error(res.message)
        }
        this.$message.success('修改密码成功，请重新登录！')
        // 改变登录态
        this.$store.dispatch('userLogin', false)
        this.$store.dispatch('setPermissions', false)
        // 清除sessionid
        window.sessionStorage.clear()
        // 刷新页面
        if (this.$route.path == '/first') {
          this.$router.go(0)
        }else {
          this.$router.push('/first')
        }
      })
    },
  },
}
</script>

<style scoped>
.form {
  width: 40%;
  margin: 120px auto;
}
</style>