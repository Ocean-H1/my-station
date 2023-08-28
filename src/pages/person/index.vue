<template>
  <div class="person">
    <el-row type="flex" justify="space-between">
      <el-col :span="4">
        <LeftMenu />
      </el-col>

      <el-col :span="19">
        <router-view />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LeftMenu from '@/components/content/person/leftMenu'
export default {
  components: {
    LeftMenu
  }
}
</script>

<style>
.cards {
  border: 1px solid #ccc;
  border-radius: 10px;
}
.cards-header {
  background-color: #f6f6f6;
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
  line-height: 60px;
}
.cards-body,
.order-body{
  min-height: 80vh;
}
.cards-body small {
  font-size: 12px;
  font-weight: 300;
  color: #000;
}
.person {
  margin-top: 20px;
}
</style>