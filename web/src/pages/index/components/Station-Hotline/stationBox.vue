<template>
  <div class="stationBox">
    <!-- 标题 -->
    <div class="title">
      <div>车站介绍</div>
      <div @click="showMap(stationList[0])" class="moreStation">
        更多车站 <i class="el-icon-d-arrow-right"></i>
      </div>
    </div>
    <!-- 车站列表 -->
    <div class="stationList">
      <el-table
        :data="stationList2"
        style="width: 50%"
        size="medium"
        stripe
        :show-header="false"
      >
        <el-table-column>
          <template slot-scope="scope">
            <span class="staInfo" @click="showMap(scope.row)">{{
              scope.row.station_name
            }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        :data="stationList1"
        style="width: 50%"
        size="medium"
        stripe
        :show-header="false"
      >
        <el-table-column>
          <template slot-scope="scope">
            <span class="staInfo" @click="showMap(scope.row)">{{
              scope.row.station_name
            }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getAllStations } from '@services/index';
export default {
  name: 'stationBox',
  data() {
    return {
      stationList1: [],
      stationList2: [],
    };
  },
  methods: {
    // 点击车站跳转到地图页面
    showMap(activeStation) {
      // 设置车站的经纬度
      this.$store.commit('setPosition', activeStation);
      // 跳转页面
      this.$router.push('stationMap');
    },
    // 获取车站列表(详情及经纬度)
    async getStationList() {
      const { data: res } = await getAllStations();
      if (res.code !== 10000) {
        return this.$message({
          type: 'error',
          message: '获取车站列表失败！',
          duration: 2000,
        });
      }

      // 保存数据
      this.stationList1 = res.data.station_list.slice(0, 10);
      this.stationList2 = res.data.station_list.slice(10, 20);
      this.$store.commit('setStationList', res.data.station_list);
    },
  },
  created() {
    // 获取车站列表详情及经纬度
    this.getStationList();
  },
};
</script>

<style scoped>
.stationBox {
  display: flex;
  flex-direction: column;
}
.title,
.stationList {
  width: 100%;
}
.title {
  background-color: #068abb;
}
.title div {
  width: 50%;
  float: left;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.6rem;
  color: #fff;
}
.moreStation:hover {
  text-decoration: underline;
}
.el-table {
  float: right !important;
}
.staInfo:hover {
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
}
</style>
