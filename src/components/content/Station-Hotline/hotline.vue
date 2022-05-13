<template>
  <div class="hotline">
    <!-- 标题 -->
    <div class="title">
      <div>热门线路</div>
    </div>
    <!-- tabs标签页 -->
    <el-tabs stretch v-model="activeName">
      <el-tab-pane name="first" label="今日">
        <HotlineTable :choice="activeName"></HotlineTable>
      </el-tab-pane>
      <el-tab-pane name="second" label="明日">
        <HotlineTable :choice="activeName"></HotlineTable>
      </el-tab-pane>
      <el-tab-pane name="third">
        <span slot="label">{{ timeArray[2] }}</span>
        <HotlineTable :choice="activeName"></HotlineTable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import HotlineTable from './hotline-table'

export default {
  components: { HotlineTable },
  name: 'hotline',
  data() {
    return {
      activeName: 'first',
    }
  },
  computed: {
    // 拿到日期
    timeArray: function () {
      let dateTime = new Date()
      //   年
      let year = dateTime.getFullYear()
      //   月
      let month = dateTime.getMonth() + 1
      //   日
      let date = dateTime.getDate()
      
      let timeArray = []
      for (let i = 0; i < 3; i++) {
        timeArray[i] = month + '月' + (date + i) + '日'
      }
      return timeArray
    },
  },
  methods: {},
}
</script>

<style scoped>
.hotline {
  display: flex;
  flex-direction: column;
}
.title {
  background-color: #068abb;
  width: 100%;
}
.title div {
  float: left;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.6rem;
  color: #fff;
}
</style>
