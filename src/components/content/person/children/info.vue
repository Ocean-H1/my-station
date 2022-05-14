<template>
  <div class="info">
    <div class="cards">
      <div class="cards-header">基本资料</div>
      <div class="cards-body">
        <div>
          <small>您好！ 欢迎您登录个人中心！</small>
        </div>
        <div class="box user-info">
          <div class="title">
            <h3>基本信息</h3>
            <!-- <a href="#">修改</a> -->
            <el-button @click="showEditDialog()" type="warning" size="mini" style="margin-left: 20px;">修 改</el-button>
          </div>
          <el-divider></el-divider>
          <div class="inputs">
            <section>
              <div class="left">
                <span class="name">用户名:</span>
                <span class="result">{{ userInfo.phone_number }}</span>
              </div>
              <div class="right">
                <span class="name">真实姓名:</span>
                <span class="result">{{ userInfo.name }}</span>
              </div>
            </section>
            <section>
              <div class="left">
                <span class="name">性&nbsp;&nbsp;&nbsp;&nbsp;别:</span>
                <span class="result">{{ userInfo.sex }}</span>
              </div>
              <div class="right">
                <span class="name">证件类型:</span>
                <span class="result">{{ userInfo.card_type }}</span>
              </div>
            </section>
            <section>
              <div class="left">
                <span class="name">证件号:</span>
                <span class="result">{{ userInfo.card_number }}</span>
              </div>
            </section>
          </div>
          <!-- <div v-show="isShow" class="change inputs">
            <section>
              <div class="left">
                <span class="name">用户名:</span>
                <span class="result">{{ userInfo.phone_number }}</span>
              </div>
              <div class="right">
                <span class="name">真实姓名:</span>
                <div class="result">
                  <el-input v-model="name" placeholder=""></el-input>
                </div>
              </div>
            </section>
            <section>
              <div class="left">
                <span class="name">性&nbsp;&nbsp;&nbsp;&nbsp;别:</span>
                <span class="result">
                  <el-radio v-model="sex" label="1">男</el-radio>
                  <el-radio v-model="sex" label="2">女</el-radio>
                  <el-radio v-model="sex" label="3">保密</el-radio>
                </span>
              </div>
              <div class="right">
                <span class="name">证件类型:</span>
                <span class="result">
                  <el-select v-model="power" placeholder="请选择">
                    <el-option value="身份证">身份证</el-option>
                    <el-option value="军人证">军人证</el-option>
                    <el-option value="护照">护照</el-option>
                  </el-select>
                </span>
              </div>
            </section>
            <section>
              <div class="right">
                <span class="name">证件号:</span>
                <span class="result">
                  <el-input v-model="idNumber" placeholder=""></el-input>
                </span>
              </div>
            </section>
            <section>
              <div class="right">
                <el-button type="danger" @click="clickConfirm">确定</el-button>
                <el-button type="info" @click="isShow = !isShow"
                  >取消</el-button
                >
              </div>
            </section>
          </div> -->
        </div>
        <div class="box user-info">
          <div class="title">
            <h3>手机绑定</h3>
            <span>绑定后可用于登录和找回密码</span>
          </div>
          <el-divider></el-divider>

          <div class="inputs">
            <section>
              <div class="left">
                <span class="name">手机:</span>
                <span class="result">18082509082</span>
              </div>
              <div class="right">
                <span class="name">已绑定:</span>
                <div class="result">
                  <el-button type="danger" size="small">解绑</el-button>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div class="box user-info">
          <div class="title">
            <h3>邮箱绑定</h3>
            <span>绑定后可用于登录和找回密码</span>
          </div>
          <el-divider></el-divider>

          <div class="inputs">
            <section>
              <div class="left">
                <span class="name">邮箱:</span>
                <span class="result">空</span>
              </div>
              <div class="right">
                <span class="name">已绑定:</span>
                <div class="result">
                  <el-button type="danger" size="small">解绑</el-button>
                </div>
              </div>
            </section>
          </div>
        </div>

        <!-- 修改用户信息的对话框 -->
        <el-dialog
          title="修改信息"
          :visible.sync="EditDialogVisible"
          width="50%"
          @close="EditDialogClosed"
        >
          <!-- 用户信息的表单 -->
          <el-form
            :model="editForm"
            :rules="editFormRules"
            ref="editFormRef"
            class="editForm"
            label-width="100px"
          >
            <el-form-item label="用户名">
              <el-input v-model="editForm.phone_number" disabled></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="name">
              <el-input v-model="editForm.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-select
                v-model="editForm.sex"
                placeholder="请选择性别"
                style="width: 190px"
              >
                <el-option
                  v-for="sex in genderOpt"
                  :key="sex.name"
                  :label="sex.name"
                  :value="sex.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="证件类型" prop="card_type">
              <el-select
                v-model="editForm.card_type"
                placeholder="选择身份证类型"
                style="width: 190px"
              >
                <el-option
                  v-for="type in cardOpt"
                  :key="type.name"
                  :label="type.name"
                  :value="type.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="证件号" prop="card_number">
              <el-input v-model="editForm.card_number"></el-input>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="EditDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="this._setUserInfo">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardOpt: [
        {
          value: '身份证',
          label: '身份证',
        },
        {
          value: '军人证',
          label: '军人证',
        },
        {
          value: '护照',
          label: '护照',
        },
        {
          value: '港澳居民来往内地通行证',
          label: '港澳居民来往内地通行证',
        },
        {
          value: '台湾居民来往内地通行证',
          label: '台湾居民来往内地通行证',
        },
        {
          value: '港澳台居民居住证',
          label: '港澳台居民居住证',
        },
      ],
      genderOpt: [
        {
          name: '男',
          value: '男'
        },
        {
          name: '女',
          value: '女'
        },
        {
          name: '保密',
          value: '保密'
        }
      ],
      // 修改信息的对话框是否显示
      EditDialogVisible: false,
      editForm: {
        name: '',
        card_number: '',
        sex: '',
        card_type: '',
      },
      editFormRules: {
        name: [
          { required: 'true', message: '请输入真实姓名', trigger: 'blur' },
        ],
        card_number: [
          { required: 'true', message: '请输入您的证件号', trigger: 'blur' },
        ],
        sex: [{ required: 'true', message: '请选择您的性别', trigger: 'blur' }],
        card_type: [
          { required: 'true', message: '请选择证件类型', trigger: 'blur' },
        ],
      },
      userInfo: {},
    }
  },
  mounted() {
    this._getUserInfo()
  },

  methods: {
    // 获取用户信息
    _getUserInfo() {
      this.$http
        .request({
          url: '/userCenter/getProfile',
          method: 'get',
        })
        .then((result) => {
          this.userInfo = result.data.data.profileInfo
        })
    },
    // 显示修改信息的对话框
    showEditDialog(){
      this.editForm = this.userInfo
      this.EditDialogVisible = true
    },
    // 修改用户信息
    _setUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return

        const { data: res } = await this.$http.post(
          `/userCenter/modifyProfile`,
          this.editForm
        )

        if (res.code !== 10000) {
          return this.$message({
            type: 'error',
            message: res.message,
            duration: 2500,
          })
        }
        this.EditDialogVisible = false
        this._getUserInfo()
        this.$message.success('修改信息成功！')
      })
    },
    // 监听修改信息对话框关闭事件
    EditDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
  },
}
</script>

<style scoped>
.cards-body {
  padding: 20px;
}

.box .title {
  display: flex;
  align-items: center;
}
.box .title span {
  font-size: 12px;
}
.title h3 {
  color: #555;
}
.box .title a,
.box .title span {
  font-size: 12px;
  margin-left: 20px;
  text-decoration: none;
}
.inputs section {
  display: flex;
  justify-content: space-between;
}
.inputs section > div {
  flex: 0 0 45%;
  border-bottom: 1px solid #eee;
  padding: 20px 0 20px 40px;
  font-size: 12px;
}
.inputs section > div .name {
  font-weight: bold;
}
.inputs section > div .result {
  color: #000;
  margin-left: 20px;
}
.inputs .right {
  display: flex;
  align-items: center;
}
.dialog-footer {
  display: flex;
  justify-content: space-evenly;
}
.editForm {
  display: flex;
  flex: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>