<template>
  <div class="login">
    <!-- 标题 -->
    <div class="title">
      <span>登录</span>
    </div>
    <!-- 注册和找回密码 -->
    <div class="info">
      如果还未注册，<router-link to="/register" class="link"
        >点击这里注册</router-link
      >，如果忘记密码,<router-link to="/rebackPsd" class="link"
        >点击这里找回密码</router-link
      >
    </div>
    <!-- 登录的表单 -->
    <el-form
      :model="loginForm"
      :rules="loginRules"
      ref="loginFormRef"
      label-width="100px"
      label-position="left"
    >
      <el-form-item label="登录名:" prop="phone_number">
        <el-input
          v-model="loginForm.phone_number"
          placeholder="手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input
          v-model="loginForm.password"
          autocomplete="new-password"
          placeholder="密码"
          :show-password="true"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="check_code">
        <div class="RcodeContainer">
          <div class="checkcode" @click="refreshImg">
            <!-- <img :src="codeImgUrl" alt="图片验证码" width="100px" /> -->
            <img
              src="https://image.scqckypw.com/static/new/images/refreshen.png"
              alt="验证码默认图"
              width="100px"
              v-show="!checkCodeImg"
            />
            <div
              style="width: 100px"
              v-html="checkCodeImg"
              v-show="checkCodeImg"
            ></div>
          </div>
          <el-input
            v-model="loginForm.check_code"
            placeholder="点击图片刷新"
            @focus="refreshImg"
          ></el-input>
        </div>
      </el-form-item>

      <el-button type="danger" style="width: 180px" @click="login"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { loginAsync, getCheckCodeImg } from '@/services/index';
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        phone_number: '',
        password: '',
        check_code: '',
      },
      loginRules: {
        phone_number: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            type: 'string',
            pattern: /^(13\d|14[5|7]|15\d|166|17[3|6|7]|18\d)\d{8}$/,
            message: '请输入有效的手机号码',
            trigger: 'blur',
          },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        check_code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ],
      },
      checkCodeImg: null,
    };
  },
  methods: {
    // 点击刷新验证码图片
    async refreshImg() {
      const [res, err] = await getCheckCodeImg();

      if (err) {
        return this.$message({
          message: err.message,
          type: 'error',
          duration: 3000,
        });
      }

      this.checkCodeImg = res;
    },
    // 登录
    login() {
      // 登录前的预校验
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;

        const [res, err] = await loginAsync({
          phone_number: this.loginForm.phone_number,
          // 将密码进行MD5的16位摘要
          password: this.$utils.md5(this.loginForm.password, 16),
          check_code: this.loginForm.check_code,
        });

        if (err) {
          return this.$message({
            message: err.message,
            type: 'error',
            duration: 3000,
          });
        }

        // 保存返回的token
        window.localStorage.setItem('Token', res.token);
        // 改变用户的登录状态
        this.$store.dispatch('userLogin', true);
        // 用于之后路由守卫判断登录状态
        localStorage.setItem('isLogin', true);
        this.$message({
          message: '登录成功！',
          type: 'success',
          duration: 2000,
        });
        // 返回之前浏览的页面
        if (this.$route.query.redirectPath) {
          return this.$router.go(-1);
        }
        this.$router.push('/index');
      });
    },
  },
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.login .title {
  width: 30%;
  height: 60px;
  font-size: 1.8rem;
  letter-spacing: 15px;
  font-weight: 600;
  line-height: 60px;
}
.login .info {
  height: 30px;
  width: 35%;
  text-align: right;
}
.el-form {
  width: 30%;
  display: flex;
  flex-direction: column;
}
.RcodeContainer div {
  float: right;
  cursor: pointer;
}
.RcodeContainer {
  display: flex;
  flex-direction: row-reverse;
}
.RcodeContainer .checkcode {
  flex: 2;
}
.RcodeContainer .el-input {
  flex: 4;
}
.el-button {
  letter-spacing: 0.5em;
  font-size: 1.1em;
  text-align: center;
  margin: 0 auto;
}
.link {
  text-decoration: none;
  color: crimson;
}
.link:hover {
  text-decoration: underline;
}
.el-input__icon {
  cursor: pointer;
}
</style>
