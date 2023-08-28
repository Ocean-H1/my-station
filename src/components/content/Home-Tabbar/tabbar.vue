<template>
  <div class="HomeTabbar">
    <el-menu
      :default-active="$route.path"
      mode="horizontal"
      router
      background-color="#d3e5f1"
    >
      <el-menu-item index="/index">首页</el-menu-item>
      <el-menu-item index="/refund">退票</el-menu-item>
      <el-menu-item index="/help">帮助中心</el-menu-item>
      <el-menu-item index="/advise">投诉建议</el-menu-item>
      <el-submenu index="/" v-if="isRoot">
        <template slot="title">后台管理</template>
        <el-menu-item index="/shiftModule">班次管理</el-menu-item>
        <el-menu-item index="/ticketModule">票务管理</el-menu-item>
      </el-submenu>
      <el-menu-item index="/about">关于我们</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import index from '@pages/index/index.vue'
import refund from '@pages/refund/refund.vue'
import help from '@pages/help/help.vue'
import advise from '@pages/advise/advise.vue'
import about from '@pages/about/about.vue'

export default {
  name: 'Home-Tabbar',
  data() {
    return {
      isRoot: false,
    }
  },
  methods: {
    async checkPermission() {
      // 登录成功后进行权限验证
      const { data: res } = await this.$http.get(`/manage/checkPermission`)
      if (res.code == 10000) {
        // 超级用户
        // this.$store.dispatch('setPermissions',true)
        this.isRoot = true
        sessionStorage.setItem('isRoot', true)
      }
    },
  },
  created() {
    this.checkPermission()
  },
  components: {
    index,
    refund,
    help,
    advise,
    about,
  },
}
</script>

<style scoped>
/* 子节点激活样式 */
.HomeTabbar > .el-menu > .el-menu-item.is-active {
  background-color: #068abb !important;
  border-bottom: 3px solid #f6cc58;
  color: #fff;
  font-weight: 600;
}
/* 修改submenu激活样式 */
.el-menu > .el-submenu.is-active {
  color: #fff;
  font-weight: 600;
}
.el-menu > .el-submenu.is-active /deep/ .el-submenu__title {
  background-color: #068abb !important;
  color: #fff;
  border-bottom: 3px solid #f6cc58 !important;
}
.el-menu
  > .el-submenu.is-active
  /deep/
  .el-submenu__title
  .el-icon-arrow-down:before {
  color: #fff;
}
/* 子节点hover样式 */
.HomeTabbar > .el-menu > .el-menu-item:hover {
  background-color: #068abb !important;
  color: #fff;
  font-weight: 600;
}
/* 修改el-submenu的默认样式 使用深度选择 /deep/  */
.el-menu > .el-submenu {
  flex: 1;
}
.el-menu > .el-submenu /deep/ .el-submenu__title {
  font-size: 1.2rem;
  color: #000;
  text-align: center;
  letter-spacing: 3px;
}
.el-menu > .el-submenu /deep/ .el-submenu__title:hover {
  background-color: #068abb !important;
  color: #fff;
  font-weight: 600;
}
.el-menu
  > .el-submenu
  /deep/
  .el-submenu__title:hover
  .el-icon-arrow-down:before {
  color: #fff;
}
/* 基本样式 */
.HomeTabbar > .el-menu {
  display: flex;
  justify-content: center;
}
.HomeTabbar > .el-menu > .el-menu-item {
  flex: 1;
  font-size: 1.2rem;
  color: #000;
  text-align: center;
  letter-spacing: 3px;
}
/* 修改submenu 二级菜单的默认样式  */
.el-menu--horizontal .el-menu--popup .el-menu-item {
  letter-spacing: 1px;
}
.el-menu--horizontal .el-menu--popup .el-menu-item:hover {
  background-color: #068abb !important;
  color: #fff;
  font-weight: 600;
}
.el-menu--horizontal .el-menu--popup .el-menu-item.is-active {
  background-color: #068abb !important;
  color: #fff;
  font-weight: 600;
}
</style>
