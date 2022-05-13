<template>
  <div class="rebackPsd">
    <!-- 标题 -->
    <div class="title"><span>找回密码</span></div>
    <!-- 提示信息 -->
    <div class="info">
      请输入绑定手机和验证码信息，稍后新密码将发送至您的手机
    </div>
    <!-- 找回密码的表单 -->
    <el-form
      :model="rebackForm"
      :rules="rebackRules"
      ref="rebackFormRef"
      label-width="100px"
      label-position="left"
    >
      <el-form-item label="手机号:" prop="phoneNumber">
        <el-input
          v-model="rebackForm.phoneNumber"
          placeholder="输入绑定的手机号"
        ></el-input>
      </el-form-item>

      <el-form-item label="验证码" prop="checkcode">
        <div class="RcodeContainer">
          <div class="checkcode" @click="refreshImg">
            <img :src="codeImgUrl" alt="图片验证码" width="100px" />
          </div>
          <el-input
            v-model="rebackForm.checkcode"
            placeholder="点击图片刷新"
            @focus="refreshImg"
          ></el-input>
        </div>
      </el-form-item>
      <el-form-item label="短信验证码:" prop="phone_code">
        <div class="RcodeContainer">
          <div class="checkcode" style="width: 40%">
            <el-button type="primary">点击获取短信验证码</el-button>
          </div>
          <el-input v-model="rebackForm.phone_code"></el-input>
        </div>
      </el-form-item>
      <el-button type="danger" style="width: 180px">提交</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'rebackPsd',
  data() {
    return {
      // 找回密码的表单
      rebackForm: {
        phoneNumber: '',
        // 图片验证码
        checkout: '',
        // 短信验证码
        phone_code: '',
      },
      // 找回密码表单验证规则
      rebackRules: {
        phoneNumber: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            type: 'string',
            pattern: /^(13\d|14[5|7]|15\d|166|17[3|6|7]|18\d)\d{8}$/,
            message: '请输入有效的手机号码',
            trigger: 'blur',
          },
        ],
        checkcode: [
          { required: true, message: '请输入图片验证码', trigger: 'blur' },
        ],
        phone_code: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' },
        ],
      },
      //   验证码图片地址
      codeImgUrl: 'https://image.scqckypw.com/static/new/images/refreshen.png',
    }
  },
  methods: {
    // 点击刷新验证码图片
    refreshImg() {
      //生成一个随机数（防止缓存）
      let num = Math.ceil(Math.random() * 10)
      this.codeImgUrl = `https://www.scqckypw.com/rCode.jpg?${num}`
    },
  },
}
</script>

<style scoped>
.rebackPsd {
  width: 100%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.rebackPsd .title {
  width: 30%;
  height: 60px;
  font-size: 1.8rem;
  letter-spacing: 15px;
  font-weight: 600;
  line-height: 60px;
}
.rebackPsd .info {
  height: 30px;
  width: 35%;
  text-align: center;
  font-size: 14px;
  color: #4c8fbe;
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
.el-input__icon {
  cursor: pointer;
}
.el-form > .el-button {
  letter-spacing: 0.5em;
  font-size: 1.1em;
  text-align: center;
  margin: 0 auto;
}
</style>
