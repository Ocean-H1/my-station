<template>
  <div class="hotlineTable">
    <el-table
      :data="lineList1"
      style="width: 50%"
      size="medium"
      stripe
      :show-header="false"
    >
      <el-table-column>
        <template slot-scope="scope">
          <span class="line" @click="showqueryheader(scope.row)"
            >{{ scope.row.start_region }}→{{ scope.row.final_region }}</span
          >
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <span class="yupiao" @click="showqueryheader(scope.row)"
            >[查询余票]</span
          >
        </template>
      </el-table-column>
    </el-table>

    <el-table
      :data="lineList2"
      style="width: 50%"
      size="medium"
      stripe
      :show-header="false"
    >
      <el-table-column>
        <template slot-scope="scope">
          <span class="line" @click="showqueryheader(scope.row)"
            >{{ scope.row.start_region }}→{{ scope.row.final_region }}</span
          >
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <span class="yupiao" @click="showqueryheader(scope.row)"
            >[查询余票]</span
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getFamiliarShuttles } from '@services/index';
export default {
  name: 'hotlineTable',
  data() {
    return {
      lineList1: [],
      lineList2: [],
    };
  },
  methods: {
    showqueryheader(info) {
      this.$router.push({
        path: '/purchase',
        query: {
          info: JSON.stringify(info),
        },
      });
    },
    // 获取热门线路列表信息
    async getLineList() {
      const params = {
        size: 20,
      };
      const [res, err] = await getFamiliarShuttles(params);
      if (err) {
        return this.$message.error('获取热门线路失败！');
      }

      // 保存数据
      this.lineList1 = res.familiar_shuttle_list.slice(0, 10);
      this.lineList2 = res.familiar_shuttle_list.slice(10, 20);
    },
  },
  created() {
    // 获取热门线路列表信息
    this.getLineList();
  },
};
</script>

<style scoped>
.el-table {
  float: right !important;
}
/* 余票查询的样式修改 */
.yupiao {
  color: #1b6690;
  cursor: pointer;
  letter-spacing: 0.1rem;
}
.yupiao:hover {
  text-decoration: underline;
  font-weight: 600;
}
.line:hover {
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
}
</style>
