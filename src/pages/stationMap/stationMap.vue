<template>
  <div class="stationMap">
    <!-- 侧边车站列表 -->
    <div class="list">
      <div class="title">车站列表</div>
      <el-table
        :data="stationList"
        size="large"
        stripe
        :show-header="false"
        height="80vh"
      >
        <el-table-column align="center">
          <template slot-scope="scope">
            <span class="staInfo" @click="switchStation(scope.row)">{{
              scope.row.station_name
            }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 地图容器 -->
    <div class="MapContainer">
      <!-- 切换按钮 -->
      <el-switch
        v-model="renderComponent"
        active-text="车站地图"
        inactive-text="车站时刻表"
      >
      </el-switch>
      <!-- 地图 -->
      <Map v-if="renderComponent"></Map>
      <!-- 车站时刻表 -->
      <div v-else class="stime">
        <el-table :data="stationTime" style="width: 100%" border height="520">
          <el-table-column prop="" label="始发站" width="160">
          </el-table-column>
          <el-table-column prop="" label="目的地" width="160">
          </el-table-column>
          <el-table-column prop="" label="发车时间" width="200">
          </el-table-column>
          <el-table-column prop="" label="班次类型" width="160">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import Map from '../../components/content/Map/map.vue'

export default {
  components: { Map },
  name: 'stationMap',
  data() {
    return {
      stationList: this.$store.state.stationList,
      renderComponent: true,
      stationTime: [],
    }
  },
  methods: {
    // 用户点击车站列表，改变地图中心
    switchStation(activeStation) {
      if (activeStation === this.$store.state.activeStation) return
      this.$store.commit('setPosition', activeStation)
      // 在用户点击后实现强制刷新(利用了v-if，缺点就是相对于v-show来说性能不好)
      this.renderComponent = false
      this.$nextTick().then(() => {
        this.renderComponent = true
      })
    },
  },
}
</script>

<style scoped>
.stationMap {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 90vh;
  margin-top: 5vh;
}
.list {
  height: 100%;
  width: 20vw;
}
.list .title {
  height: 40px;
  background-color: #068abb;
  color: #fff;
  font-size: 1.2rem;
  text-align: center;
  line-height: 40px;
  letter-spacing: 0.5rem;
}

.MapContainer {
  width: 55vw;
  height: 100%;
  border: 1px dotted;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.staInfo:hover {
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
}
.stime {
  margin: 0 auto;
}
</style>
