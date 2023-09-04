<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="6"
        ><div class="grid-content logo">
          <img src="@/assets/img/logo.png" alt="" width="40px" /></div
      ></el-col>
      <el-col :span="12"
        ><div class="grid-content title">客运互联网售票平台</div></el-col
      >
      <!-- 用户未登录时显示 -->
      <el-col :span="6" v-if="!isLogin" class="user">
        <div class="grid-content login" @click="switchPage('/login')">登录</div>
        <div class="grid-content register" @click="switchPage('/register')">
          注册
        </div>
      </el-col>
      <!-- 用户已登录时显示 -->
      <el-col :span="6" class="user" v-else>
        <div class="grid-content profile" @click="switchPage('/person')">
          个人中心
        </div>
        <div class="grid-content logout" @click="logout">退出</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Home-top',
  data() {
    return {
      isLogin: this.$store.getters.isLogin,
    };
  },
  methods: {
    // 跳转到登录/注册页面
    switchPage(path) {
      if (this.$route.path === path) return;
      this.$router.push(path);
    },
    // 退出登录
    async logout() {
      // 这个接口好像没写，暂时默认退出成功，清除用户登录态

      // const { data: res } = await this.$http.get(`/permissions/logOut`)
      // if (res.code !== 10000) {
      //   return this.$message({
      //     type: 'error',
      //     message: res.message,
      //     duration: 2500,
      //   })
      // }
      this.$message({
        message: '退出成功！',
        type: 'warning',
        duration: 2000,
      });

      // 改变登录态
      this.$store.dispatch('userLogin', false);
      this.$store.dispatch('setPermissions', false);
      // 清除token
      window.localStorage.clear();
      // 刷新页面
      if (this.$route.path == '/index') {
        this.$router.go(0);
      }
      this.$router.push('/index');
    },
  },
};
</script>

<style scoped>
.container,
.el-row,
.el-col {
  height: 100%;
}

.grid-content {
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 2em;
  letter-spacing: 0.5em;
  font-weight: 600;
}
.login,
.register,
.profile,
.logout {
  cursor: pointer;
  letter-spacing: 3px;
  width: 50%;
}
.login:hover,
.register:hover,
.profile:hover,
.logout:hover {
  text-decoration: underline;
}
.user {
  display: flex;
  flex-direction: row;
}
</style>
