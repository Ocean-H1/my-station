<template>
  <div class="HomeNotice">
    <el-tabs>
      <el-tab-pane label="最新公告">
        <el-table
          :data="tableList1"
          style="width: 100%"
          size="small"
          stripe
          :show-header="false"
        >
          <el-table-column label="公告" width="260">
            <template slot-scope="scope">
              <span class="notice">{{ scope.row.desc }}</span>
            </template>
          </el-table-column>
          <el-table-column label="日期" width="100">
            <template slot-scope="scope">
              <span class="date">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="交通新闻">
        <el-table
          :data="tableList2"
          style="width: 100%"
          size="small"
          stripe
          :show-header="false"
        >
          <el-table-column label="新闻" width="260">
            <template slot-scope="scope">
              <span class="notice">{{ scope.row.desc }}</span>
            </template>
          </el-table-column>
          <el-table-column label="日期" width="100">
            <template slot-scope="scope">
              <span class="notice">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'HomeNotice',
  data() {
    return {
      // 暂时写死
      // 最新公告列表数据
      tableList1: [
        {
          desc: '400客服系统维护公告',
          date: '2022-01-22',
        },
        {
          desc: '疫情期退票规则',
          date: '2022-01-22',
        },
        {
          desc: '疫情防控人人参与',
          date: '2022-04-22',
        },
        {
          desc: '西安城南客运站恢复运行',
          date: '2022-04-06',
        },
        {
          desc: '暂停三原客运站运行',
          date: '2022-01-22',
        },
        {
          desc: '绕城高速出现极端天气',
          date: '2022-02-22',
        },
      ],
      // 交通新闻列表数据
      tableList2: [
        {
          desc: '习近平在第二届联合国全球可...',
          date: '2021-12-08',
        },
        {
          desc: '巴陕高速公路全线正式通车',
          date: '2018-11-23',
        },
        {
          desc: '西安市圆满完成2019年春...',
          date: '2019-03-18',
        },
        {
          desc: '春节假期西安市道路运输平安...',
          date: '2022-03-09',
        },
        {
          desc: '陕西柞水至山阳高速公路通车',
          date: '2018-12-20',
        },
        {
          desc: '陕西省交通运输厅调研商洛交通运输工作',
          date: '2018-08-24',
        },
      ],
    }
  },
  methods: {},
}
</script>

<style scoped>
.HomeNotice {
  overflow: hidden;
}
.notice,
.date {
  cursor: pointer;
}
.notice:hover,
.date:hover {
  text-decoration: underline;
  font-weight: 600;
}
</style>
