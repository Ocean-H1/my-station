<template>
  <div class="shiftMoudle">
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 查询与添加区 -->
      <el-form
        :model="QueryForm"
        :rules="QueryRules"
        ref="QueryFormRef"
        label-width="80px"
        label-position="left"
        class="queryForm"
      >
        <el-form-item label="起始地" prop="start_name">
          <!-- 带有输入建议的input -->
          <el-autocomplete
            v-model="QueryForm.start_name"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect1"
            :debounce="0"
          >
            <i slot="append">区/县</i>
            <template slot-scope="{ item }">
              <div class="cityName">{{ item.city_name + '市：' }}</div>
              <div class="regionName">{{ item.region_name }}</div>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="目的地" prop="final_name">
          <!-- 带有输入建议的input -->
          <el-autocomplete
            v-model="QueryForm.final_name"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect2"
            :debounce="0"
          >
            <i slot="append">区/县</i>
            <template slot-scope="{ item }">
              <div class="cityName">{{ item.city_name + '市：' }}</div>
              <div class="regionName">{{ item.region_name }}</div>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="乘车日期" prop="shuttle_shift_date">
          <el-date-picker
            v-model="QueryForm.shuttle_shift_date"
            align="left"
            type="date"
            placeholder="请选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="middle"
            style="height: 40px"
            @click="getShuttleList"
            >查询</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="middle"
            style="height: 40px"
            @click="addDialogVisible = true"
            >新建班次</el-button
          >
        </el-form-item>
      </el-form>

      <!-- 班次列表区 -->
      <el-table
        :data="shuttleList"
        border
        stripe
        highlight-current-row
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column
          label="日期"
          prop="shuttle_shift_date"
        ></el-table-column>
        <el-table-column
          label="时间"
          prop="shuttle_shift_time"
        ></el-table-column>
        <el-table-column label="票价" prop="ticket_price"></el-table-column>
        <el-table-column
          label="班次类型"
          prop="shuttle_shift_type"
        ></el-table-column>
        <el-table-column label="线路类型" prop="line_type"></el-table-column>
        <el-table-column
          label="余票"
          prop="unuse_ticket_quantity"
        ></el-table-column>
        <el-table-column
          label="儿童余票"
          prop="unuse_child_ticket_quantity"
        ></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.status" placement="top">
              <el-switch
                v-model="scope.row.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="使用中"
                inactive-value="禁用中"
                @change="userStateChange(scope.row)"
              >
              </el-switch>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="350px">
          <template slot-scope="scope">
            <!-- 编辑 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row)"
              >编辑</el-button
            >
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeShuutleById(scope.row.shift_id)"
              >删除</el-button
            >
            <!-- 详情 -->
            <el-button
              type="warning"
              size="mini"
              @click="showDetailDialog(scope.row)"
              ><i class="el-icon-tickets"></i> 详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区 -->
      <el-pagination
        :page-sizes="[5, 10, 15, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
        :current-page="QueryForm.page"
        :page-size="QueryForm.size"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      >
      </el-pagination>
      <!-- 新建班次的对话框 -->
      <el-dialog
        title="新建班次"
        :visible.sync="addDialogVisible"
        width="70%"
        @close="addDialogClosed"
      >
        <!-- 内容主体区 -->
        <el-form
          :model="addForm"
          :rules="addFormRules"
          ref="addFormRef"
          label-width="110px"
          class="addForm"
        >
          <el-form-item label="始发地" prop="start_region">
            <el-input
              placeholder="西安"
              v-model="addForm.start_region"
            ></el-input>
          </el-form-item>
          <el-form-item label="终点站" prop="final_region">
            <el-input
              placeholder="乾县"
              v-model="addForm.final_region"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div style="width: 190px"></div>
          </el-form-item>
          <el-form-item label="日期" prop="shuttle_shift_date">
            <el-date-picker
              v-model="addForm.shuttle_shift_date"
              align="left"
              type="date"
              placeholder="请选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              style="width: 190px"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="时间" prop="shuttle_shift_time">
            <el-time-select
              v-model="addForm.shuttle_shift_time"
              :picker-options="{
                start: '08:00',
                step: '00:30',
                end: '24:00',
              }"
              placeholder="选择时间"
              style="width: 190px"
            >
            </el-time-select>
          </el-form-item>
          <el-form-item label="总票数" prop="ticket_quantity">
            <el-input v-model="addForm.ticket_quantity"></el-input>
          </el-form-item>
          <el-form-item label="始发客运站" prop="start_station">
            <el-select
              v-model="addForm.start_station"
              placeholder="请选择"
              style="width: 190px"
            >
              <el-option
                v-for="item in famliar_stations_list"
                :key="item.station_name"
                :label="item.station_name"
                :value="item.station_name"
              >
                <span style="float: left">{{ item.station_name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.station_english_name
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="终点客运站" prop="final_station">
            <el-select
              v-model="addForm.final_station"
              placeholder="请选择"
              style="width: 190px"
            >
              <el-option
                v-for="item in famliar_stations_list"
                :key="item.station_name"
                :label="item.station_name"
                :value="item.station_name"
              >
                <span style="float: left">{{ item.station_name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.station_english_name
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="余票数" prop="unuse_ticket_quantity">
            <el-input v-model="addForm.unuse_ticket_quantity"></el-input>
          </el-form-item>
          <el-form-item label="票价" prop="ticket_price">
            <el-input v-model="addForm.ticket_price"></el-input>
          </el-form-item>
          <el-form-item label="保险费" prop="insurance_price">
            <el-input v-model="addForm.insurance_price"></el-input>
          </el-form-item>
          <el-form-item label="儿童总票" prop="child_ticket_quantity">
            <el-input v-model="addForm.child_ticket_quantity"></el-input>
          </el-form-item>
          <el-form-item label="退票手续费" prop="refund_fee">
            <el-input v-model="addForm.refund_fee"></el-input>
          </el-form-item>
          <el-form-item label="服务费" prop="station_fee">
            <el-input v-model="addForm.station_fee"></el-input>
          </el-form-item>
          <el-form-item label="儿童余票" prop="unuse_child_ticket_quantity">
            <el-input v-model="addForm.unuse_child_ticket_quantity"></el-input>
          </el-form-item>
          <el-form-item label="班次类型" prop="shuttle_shift_type">
            <el-select
              v-model="addForm.shuttle_shift_type"
              placeholder="固定班/流水班"
              style="width: 190px"
            >
              <el-option
                v-for="item in shuttleOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="线路类型" prop="line_type">
            <el-select
              v-model="addForm.line_type"
              placeholder="高速/低速"
              style="width: 190px"
            >
              <el-option
                v-for="item in lineOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="总用时" prop="duration">
            <el-input v-model="addForm.duration"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-input
              v-model="addForm.status"
              placeholder="使用中/禁用中"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="始发客运站代码"
            prop="station_number"
            label-width="140px"
          >
            <el-input
              v-model="addForm.station_number"
              placeholder="610100CXO"
              style="width: 160px"
            ></el-input>
          </el-form-item>
          <el-form-item label="总里程" prop="full_lenght">
            <el-input v-model="addForm.full_lenght"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部按钮区 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false"> 取 消 </el-button>
          <el-button type="primary" @click="addShuttle">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 编辑班次的对话框 -->
      <el-dialog
        title="编辑班次"
        :visible.sync="EditDialogVisible"
        width="70%"
        @close="EditDialogClosed"
      >
        <el-form
          :model="editForm"
          :rules="editFormRules"
          ref="editFormRef"
          class="editForm"
          label-width="110px"
        >
          <el-form-item label="日期" prop="shuttle_shift_date">
            <el-date-picker
              v-model="editForm.shuttle_shift_date"
              align="left"
              type="date"
              placeholder="请选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              style="width: 190px"
              :disabled="true"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="时间" prop="shuttle_shift_time">
            <el-time-select
              v-model="editForm.shuttle_shift_time"
              :picker-options="{
                start: '08:00',
                step: '00:30',
                end: '24:00',
              }"
              placeholder="选择时间"
              style="width: 190px"
            >
            </el-time-select>
          </el-form-item>
          <el-form-item label="总票数" prop="ticket_quantity">
            <el-input v-model="editForm.ticket_quantity"></el-input>
          </el-form-item>
          <el-form-item label="始发客运站" prop="start_station">
            <el-select
              v-model="editForm.start_station"
              placeholder="请选择"
              style="width: 190px"
            >
              <el-option
                v-for="item in famliar_stations_list"
                :key="item.station_name"
                :label="item.station_name"
                :value="item.station_name"
              >
                <span style="float: left">{{ item.station_name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.station_english_name
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="终点客运站" prop="final_station">
            <el-select
              v-model="editForm.final_station"
              placeholder="请选择"
              style="width: 190px"
            >
              <el-option
                v-for="item in famliar_stations_list"
                :key="item.station_name"
                :label="item.station_name"
                :value="item.station_name"
              >
                <span style="float: left">{{ item.station_name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.station_english_name
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="余票数" prop="unuse_ticket_quantity">
            <el-input v-model="editForm.unuse_ticket_quantity"></el-input>
          </el-form-item>
          <el-form-item label="票价" prop="ticket_price">
            <el-input v-model="editForm.ticket_price"></el-input>
          </el-form-item>
          <el-form-item label="保险费" prop="insurance_price">
            <el-input v-model="editForm.insurance_price"></el-input>
          </el-form-item>
          <el-form-item label="儿童总票" prop="child_ticket_quantity">
            <el-input v-model="editForm.child_ticket_quantity"></el-input>
          </el-form-item>
          <el-form-item label="退票手续费" prop="refund_fee">
            <el-input v-model="editForm.refund_fee"></el-input>
          </el-form-item>
          <el-form-item label="服务费" prop="station_fee">
            <el-input v-model="editForm.station_fee"></el-input>
          </el-form-item>
          <el-form-item label="儿童余票" prop="unuse_child_ticket_quantity">
            <el-input v-model="editForm.unuse_child_ticket_quantity"></el-input>
          </el-form-item>
          <el-form-item label="班次类型" prop="shuttle_shift_type">
            <el-select
              v-model="editForm.shuttle_shift_type"
              placeholder="固定班/流水班"
              style="width: 190px"
            >
              <el-option
                v-for="item in shuttleOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="线路类型" prop="line_type">
            <el-select
              v-model="editForm.line_type"
              placeholder="高速/低速"
              style="width: 190px"
            >
              <el-option
                v-for="item in lineOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="总用时" prop="duration">
            <el-input v-model="editForm.duration"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-input
              v-model="editForm.status"
              placeholder="使用中/禁用中"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="始发客运站代码"
            prop="station_number"
            label-width="140px"
          >
            <el-input
              v-model="editForm.station_number"
              placeholder="610100CXO"
              style="width: 160px"
            ></el-input>
          </el-form-item>
          <el-form-item label="总里程" prop="full_lenght">
            <el-input v-model="editForm.full_lenght"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="EditDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 班次详情的对话框 -->
      <el-dialog
        title="班次详情"
        :visible.sync="DetailDialogVisible"
        width="70%"
        @close="DetailDialogClosed"
      >
        <el-form
          :model="DetailForm"
          :rules="DetailFormRules"
          ref="DetailFormRef"
          class="DetailForm"
          label-width="110px"
        >
          <el-form-item label="日期" prop="shuttle_shift_date">
            <el-date-picker
              v-model="DetailForm.shuttle_shift_date"
              align="left"
              type="date"
              placeholder="请选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              style="width: 190px"
              :disabled="true"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="时间" prop="shuttle_shift_time">
            <el-time-select
              v-model="DetailForm.shuttle_shift_time"
              :picker-options="{
                start: '08:00',
                step: '00:30',
                end: '24:00',
              }"
              placeholder="选择时间"
              style="width: 190px"
              :disabled="true"
            >
            </el-time-select>
          </el-form-item>
          <el-form-item label="总票数" prop="ticket_quantity">
            <el-input
              v-model="DetailForm.ticket_quantity"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="始发客运站" prop="start_station">
            <el-select
              v-model="DetailForm.start_station"
              placeholder="请选择"
              style="width: 190px"
              :disabled="true"
            >
              <el-option
                v-for="item in famliar_stations_list"
                :key="item.station_name"
                :label="item.station_name"
                :value="item.station_name"
              >
                <span style="float: left">{{ item.station_name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.station_english_name
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="终点客运站" prop="final_station">
            <el-select
              v-model="DetailForm.final_station"
              placeholder="请选择"
              style="width: 190px"
              :disabled="true"
            >
              <el-option
                v-for="item in famliar_stations_list"
                :key="item.station_name"
                :label="item.station_name"
                :value="item.station_name"
              >
                <span style="float: left">{{ item.station_name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.station_english_name
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="余票数" prop="unuse_ticket_quantity">
            <el-input
              v-model="DetailForm.unuse_ticket_quantity"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="票价" prop="ticket_price">
            <el-input
              v-model="DetailForm.ticket_price"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="保险费" prop="insurance_price">
            <el-input
              v-model="DetailForm.insurance_price"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="儿童总票" prop="child_ticket_quantity">
            <el-input
              v-model="DetailForm.child_ticket_quantity"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="退票手续费" prop="refund_fee">
            <el-input
              v-model="DetailForm.refund_fee"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="服务费" prop="station_fee">
            <el-input
              v-model="DetailForm.station_fee"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="儿童余票" prop="unuse_child_ticket_quantity">
            <el-input
              v-model="DetailForm.unuse_child_ticket_quantity"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="班次类型" prop="shuttle_shift_type">
            <el-select
              v-model="DetailForm.shuttle_shift_type"
              placeholder="固定班/流水班"
              style="width: 190px"
              :disabled="true"
            >
              <el-option
                v-for="item in shuttleOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="线路类型" prop="line_type">
            <el-select
              v-model="DetailForm.line_type"
              placeholder="高速/低速"
              style="width: 190px"
              :disabled="true"
            >
              <el-option
                v-for="item in lineOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="总用时" prop="duration">
            <el-input v-model="DetailForm.duration" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-input
              v-model="DetailForm.status"
              placeholder="使用中/禁用中"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="始发客运站代码"
            prop="station_number"
            label-width="140px"
          >
            <el-input
              v-model="DetailForm.station_number"
              placeholder="610100CXO"
              style="width: 160px"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="总里程" prop="full_lenght">
            <el-input
              v-model="DetailForm.full_lenght"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="DetailDialogVisible = false" type="primary"
            >关 闭</el-button
          >
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'shiftMoudle',
  data() {
    function isInArray(arr, value) {
      // 判断是否在数组中有该选项的方法，也可以用es6的some方法
      for (let i = 0; i < arr.length; i++) {
        if (value === arr[i]) {
          return true
        }
      }
      return false
    }
    const validatePass = (rule, value, callback) => {
      this.regionsList.forEach((item) => {
        // 造出一个只有城市名的数组regionsNameList
        this.regionsNameList.push(item.region_name)
      })

      if (isInArray(this.regionsNameList, value)) {
        callback()
      } else {
        callback(new Error('请选择列表中已有选项!'))
      }
    }
    return {
      // 查询班次的表单对象
      QueryForm: {
        start_name: '',
        final_name: '',
        start_region_id: 0,
        final_region_id: 0,
        shuttle_shift_date: '',
        // 当前的页码
        page: 1,
        // 当前每页显示的数据量
        size: 5,
      },
      // 查询班次的表单验证规则
      QueryRules: {
        // 出发地
        start_name: [
          {
            message: '请选择有效的城市！',
            trigger: 'change',
            validator: validatePass,
          },
          { required: 'true', message: '请输入目的地', trigger: 'blur' },
        ],
        // 目的地
        final_name: [
          {
            message: '请选择有效的城市！',
            trigger: 'change',
            validator: validatePass,
          },
          {
            message: '请选择有效的城市！',
            trigger: 'blur',
            validator: validatePass,
          },
          { required: 'true', message: '请输入目的地', trigger: 'blur' },
        ],

        // 乘车时间
        shuttle_shift_date: [
          { required: true, message: '请选择乘车日期', trigger: 'blur' },
        ],
      },
      // 所有地区列表
      regionsList: [],
      regionsNameList: [],
      // 符合条件的班次列表
      shuttleList: [],
      // 控制新建班次对话框的 显示/隐藏
      addDialogVisible: false,
      // 添加班次的表单
      addForm: {
        shift_id: null,
        shuttle_shift_date: '',
        shuttle_shift_time: '',
        start_region: '',
        final_region: '',
        start_station: '',
        final_station: '',
        ticket_quantity: null,
        child_ticket_quantity: null,
        unuse_ticket_quantity: null,
        unuse_child_ticket_quantity: null,
        ticket_price: null,
        refund_fee: null,
        station_fee: null,
        insurance_price: null,
        shuttle_shift_type: '',
        line_type: '',
        duration: '',
        full_lenght: '',
        status: '',
        station_number: '',
      },
      // 添加班次的表单验证
      addFormRules: {
        shuttle_shift_date: [
          { required: 'true', message: '请选择日期', trigger: 'blur' },
        ],
        shuttle_shift_time: [
          { required: 'true', message: '请选择时间', trigger: 'blur' },
        ],
        start_region: [
          { required: 'true', message: '请输入始发地', trigger: 'blur' },
        ],
        final_region: [
          { required: 'true', message: '请输入目的地', trigger: 'blur' },
        ],
        start_station: [
          { required: 'true', message: '请选择起始客运站', trigger: 'blur' },
        ],
        final_station: [
          { required: 'true', message: '请选择目的地客运站', trigger: 'blur' },
        ],
        ticket_quantity: [
          { required: 'true', message: '请输入总票数', trigger: 'blur' },
        ],
        child_ticket_quantity: [
          { required: 'true', message: '请输入儿童总票数', trigger: 'blur' },
        ],
        unuse_ticket_quantity: [
          { required: 'true', message: '请输入剩余票数', trigger: 'blur' },
        ],
        unuse_child_ticket_quantity: [
          { required: 'true', message: '请输入剩余儿童票数', trigger: 'blur' },
        ],
        ticket_price: [
          { required: 'true', message: '请输入票价', trigger: 'blur' },
        ],
        refund_fee: [
          { required: 'true', message: '请输入退款手续费', trigger: 'blur' },
        ],
        station_fee: [
          { required: 'true', message: '请输入服务费', trigger: 'blur' },
        ],
        insurance_price: [
          { required: 'true', message: '请输入保险费', trigger: 'blur' },
        ],
        shuttle_shift_type: [
          { required: 'true', message: '请输入班次类型', trigger: 'blur' },
        ],
        line_type: [
          { required: 'true', message: '请输入线路类型', trigger: 'blur' },
        ],
        duration: [
          { required: 'true', message: '请输入总用时', trigger: 'blur' },
        ],
        full_lenght: [
          { required: 'true', message: '请输入总里程', trigger: 'blur' },
        ],
        status: [{ required: 'true', message: '请输入状态', trigger: 'blur' }],
        station_number: [
          {
            required: 'true',
            message: '请输入始发客运站代码',
            trigger: 'blur',
          },
        ],
      },
      // 班次列表的数据总量
      total: 0,
      // 班次类型
      shuttleOpt: [
        {
          value: '固定班',
          label: '固定班',
        },
        {
          value: '流水班',
          label: '流水班',
        },
      ],
      // 线路类型
      lineOpt: [
        {
          value: '高速',
          label: '高速',
        },
        {
          value: '低速',
          label: '低速',
        },
      ],
      // 常见车站列表
      famliar_stations_list: [],
      // 控制编辑班次对话框的显示/隐藏
      EditDialogVisible: false,
      // 编辑班次表单对象
      editForm: {},
      // 编辑班次正则验证
      editFormRules: {
        shuttle_shift_date: [
          { required: 'true', message: '请选择日期', trigger: 'blur' },
        ],
        shuttle_shift_time: [
          { required: 'true', message: '请选择时间', trigger: 'blur' },
        ],
        start_station: [
          { required: 'true', message: '请选择起始客运站', trigger: 'blur' },
        ],
        final_station: [
          { required: 'true', message: '请选择目的地客运站', trigger: 'blur' },
        ],
        ticket_quantity: [
          { required: 'true', message: '请输入总票数', trigger: 'blur' },
        ],
        child_ticket_quantity: [
          { required: 'true', message: '请输入儿童总票数', trigger: 'blur' },
        ],
        unuse_ticket_quantity: [
          { required: 'true', message: '请输入剩余票数', trigger: 'blur' },
        ],
        unuse_child_ticket_quantity: [
          { required: 'true', message: '请输入剩余儿童票数', trigger: 'blur' },
        ],
        ticket_price: [
          { required: 'true', message: '请输入票价', trigger: 'blur' },
        ],
        refund_fee: [
          { required: 'true', message: '请输入退款手续费', trigger: 'blur' },
        ],
        station_fee: [
          { required: 'true', message: '请输入服务费', trigger: 'blur' },
        ],
        insurance_price: [
          { required: 'true', message: '请输入保险费', trigger: 'blur' },
        ],
        shuttle_shift_type: [
          { required: 'true', message: '请输入班次类型', trigger: 'blur' },
        ],
        line_type: [
          { required: 'true', message: '请输入线路类型', trigger: 'blur' },
        ],
        duration: [
          { required: 'true', message: '请输入总用时', trigger: 'blur' },
        ],
        full_lenght: [
          { required: 'true', message: '请输入总里程', trigger: 'blur' },
        ],
        status: [{ required: 'true', message: '请输入状态', trigger: 'blur' }],
        station_number: [
          {
            required: 'true',
            message: '请输入始发客运站代码',
            trigger: 'blur',
          },
        ],
      },
      // 控制详情对话框的显示与隐藏
      DetailDialogVisible: false,
      // 班次详情的表单对象
      DetailForm: {},
      DetailFormRules: {},
    }
  },
  methods: {
    // 查找输入建议
    querySearch(queryString, cb) {
      let regionsList = this.regionsList
      let res = queryString
        ? regionsList.filter(this.createFilter(queryString))
        : regionsList

      cb(res)
    },
    // 输入建议的过滤器
    createFilter(queryString) {
      return (regionsList) => {
        return (
          regionsList.region_name
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) >= 0 ||
          regionsList.region_english_name
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) >= 0
        )
      }
    },
    // 输入建议被选中时触发的事件
    handleSelect1(item) {
      this.QueryForm.start_name = item.region_name
      this.QueryForm.start_region_id = item.region_id
    },
    handleSelect2(item) {
      this.QueryForm.final_name = item.region_name
      this.QueryForm.final_region_id = item.region_id
    },
    // 获取地区列表(用于输入建议)
    async getAllRegions() {
      // 发送请求
      const { data: res } = await this.$http.get(`/query/region/getAllRegions`)

      if (res.code !== 10000) {
        return this.$message.error('获取所有地区列表失败!')
      }

      // 保存数据
      this.regionsList = res.data.region_list
    },
    // 查询符合条件的班次列表
    getShuttleList() {
      // 发送请求
      this.$refs.QueryFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post(
          `/manage/getShuttleInfoList`,
          {
            start_region_id: this.QueryForm.start_region_id,
            final_region_id: this.QueryForm.final_region_id,
            shuttle_shift_date: this.QueryForm.shuttle_shift_date,
            page: this.QueryForm.page,
            size: this.QueryForm.size,
          }
        )
        // 请求失败
        if (res.code != 10000)
          return this.$message({
            type: 'error',
            message: res.message,
            duration: 2000,
          })

        this.$message.success('查询班次列表成功！')
        // 保存班次列表
        this.shuttleList = res.data.shuttle_list
        // 保存数据总量
        this.total = res.total
      })
    },
    // 监听页码改变
    handleCurrentChange(newPage) {
      this.QueryForm.page = newPage
      this.getShuttleList()
    },
    // 监听pagesize改变
    handleSizeChange(newSize) {
      this.QueryForm.size = newSize
      this.getShuttleList()
    },
    // 修改班次状态
    async userStateChange(userinfo) {
      const { data: res } = await this.$http.get(
        `/manage/changeShuttleStatus`,
        {
          params: {
            Shuttle_id: userinfo.shift_id,
          },
        }
      )

      if (res.code != 10000) {
        // 修改状态失败
        userinfo.status = !userinfo.status
        return this.$message({
          type: 'error',
          message: res.message,
          duration: 2000,
        })
      }

      this.$message.success('状态更新成功！')
    },
    // 监听新建班次对话框的关闭事件
    addDialogClosed() {
      // 清空表单
      this.$refs.addFormRef.resetFields()
    },
    // 点击按钮添加新班次
    addShuttle() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return
        // 发送请求
        const { data: res } = await this.$http.post(
          `/manage/createShuttleInfo`,
          this.addForm
        )

        if (res.code != 10000) {
          return this.$message({
            type: 'error',
            message: res.message,
            duration: 2000,
          })
        }

        this.$message.success('添加成功！')
        // 隐藏对话框
        this.addDialogVisible = false
        // 重新获取班次列表
        this.getShuttleList()
      })
    },
    // 获取常见车站列表
    async getFamliarStation() {
      const { data: res } = await this.$http.get(
        `/query/station/getFamliarStation?size=20`
      )
      if (res.code != 10000) {
        return this.$message({
          type: 'error',
          message: res.message,
          duration: 200,
        })
      }
      // 保存数据
      this.famliar_stations_list = res.data.famliar_stations_list
    },
    // 展示编辑班次的对话框
    async showEditDialog(shuttleInfo) {
      // 获得本一行的信息对象
      this.editForm = shuttleInfo
      // 展示编辑对话框
      this.EditDialogVisible = true
    },
    // 监听编辑班次对话框关闭事件
    EditDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 编辑班次信息提交
    editUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return

        const { data: res } = await this.$http.post(
          `/manage/modifyShuttleInfo`,
          this.editForm
        )

        if (res.code != 10000) {
          return this.$message({
            type: 'error',
            message: res.message,
            duration: 2000,
          })
        }
        this.EditDialogVisible = false
        this.getShuttleList()
        this.$message.success('班次信息编辑成功！')
      })
    },
    // 删除班次信息
    async removeShuutleById(id) {
      // 询问用户是否确认删除
      const confirmResult = await this.$confirm(
        '此操作将会永久删除该班次，是否继续？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => {
        return err
      })
      // 如果用户确认删除 则会返回confirm 取消则会返回 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除操作！')
      }
      // 表示用户确定删除 发送请求
      const { data: res } = await this.$http.get(`/manage/deleteShuttleInfo`, {
        params: {
          Shuttle_id: id,
        },
      })
      if (res.code != 10000) {
        return this.$message({
          type: 'error',
          message: res.message,
          duration: 2000,
        })
      }
      this.$message.success('删除班次成功！')
      this.getShuttleList()
    },
    // 查看班次详情
    showDetailDialog(shuttleInfo) {
      this.DetailForm = shuttleInfo
      this.DetailDialogVisible = true
    },
    DetailDialogClosed() {
      this.$refs.DetailFormRef.resetFields()
    },
  },
  created() {
    // 获取地区列表(用于input输入建议)
    this.getAllRegions()
    // 获取常见车站列表
    this.getFamliarStation()
  },
}
</script>

<style scoped>
.cityName {
  font-weight: 600;
  width: 50%;
  float: left;
  font-size: 16px !important;
}
.regionName {
  width: 50%;
  float: left;
  letter-spacing: 3px;
}
.regionName:hover {
  color: deepskyblue;
}
.queryForm {
  display: flex;
  justify-content: space-around;
}
.el-pagination {
  text-align: center;
  margin: 5vh 0;
}
.addForm,
.editForm,
.DetailForm {
  max-width: 1050px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
/* 解决flex布局下最后一行元素不够的情况 3栏布局 */
/* .addForm::after {
  content: '';
  width: 30%;
} */
.dialog-footer {
  display: flex;
  justify-content: space-evenly;
}
</style>
