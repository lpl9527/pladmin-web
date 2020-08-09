<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--个人信息列-->
      <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="5" style="margin-bottom: 10px;">
        <el-card class="box-card">

          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>

          <div>
            <div style="text-align: center">
              <!--文件上传-->
              <div class="el-upload">
                <img :src="user.avatarName ? baseApi + '/avatar/' + user.avatarName : Avatar" title="点击上传头像" class="avatar" @click="toggleShow">
                <my-upload v-model="show" :headers="headers" :url="updateAvatarApi" @crop-upload-success="cropUploadSuccess" />
              </div>
            </div>
            <!--用户个人信息-->
            <ul class="user-info">
              <!--用户账号-->
              <li>
                <div style="height: 100%;">
                  <svg-icon icon-class="login" /> 登录账号
                  <div class="user-right">{{user.username}}</div>
                </div>
              </li>
              <!--用户昵称-->
              <li>
                <svg-icon icon-class="user1" /> 用户昵称
                <div class="user-right">{{user.nickName}}</div>
              </li>
              <!--所属部门-->
              <li>
                <svg-icon icon-class="dept" /> 所属部门
                <div class="user-right">{{user.dept.name}}</div>
              </li>
              <!--手机号码-->
              <li>
                <svg-icon icon-class="phone" /> 手机号码
                <div class="user-right">{{user.phone}}</div>
              </li>
              <!--邮箱-->
              <li>
                <svg-icon icon-class="email" /> 用户邮箱
                <div class="user-right">{{user.email}}</div>
              </li>
              <li>
                <svg-icon icon-class="anq" /> 安全设置
                <div class="user-right">
                  <a @click="$refs.pass.dialog = true">修改密码</a>&nbsp&nbsp
                  <a @click="$refs.email.dialog = true">修改邮箱</a>
                </div>
              </li>
            </ul>
          </div>

        </el-card>
      </el-col>
      <!--用户资料-->
      <el-col :xs="24" :sm="24" :md="16" :lg="18" :xl="19">
        <el-card class="box-card">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="用户资料" name="first">
              <el-form ref="form" :model="form" :rules="rules" style="margin-top: 10px;" size="small" label-width="65px">
                <el-form-item label="昵称" prop="nickName">
                  <el-input v-model="form.nickName" style="width: 35%;" />
                  <span style="color: #c0c0c0;margin-left: 10px;">用户昵称不作为登录使用</span>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="form.phone" style="width: 35%" />
                  <span style="color: #C0C0C0;margin-left: 10px;">手机号码不能重复</span>
                </el-form-item>
                <el-form-item label="性别">
                  <el-radio-group v-model="form.gender" style="width: 178px;">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="">
                  <el-button :loading="saveLoading" size="mini" type="primary" @click="doSubmit">保存配置</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>

            <!--操作日志-->
            <el-tab-pane label="操作日志" name="second">
              <el-table v-loading="loading" :data="data" style="width: 100%;">
                <el-table-column prop="description" label="行为" />
                <el-table-column prop="requestIp" label="IP" />
                <el-table-column :show-overflow-tooltip="true" prop="address" label="IP来源" />
                <el-table-column prop="browser" label="浏览器" />
                <el-table-column prop="time" label="请求耗时" align="center">
                  <template slot-scope="scope">
                    <el-tag v-if="scope.row.time <= 300">{{ scope.row.time }}ms</el-tag>
                    <el-tag v-else-if="scope.row.time <= 1000" type="warning">{{ scope.row.time }}ms</el-tag>
                    <el-tag v-else type="danger">{{ scope.row.time }}ms</el-tag>
                  </template>
                </el-table-column>
                <el-table-column align="right">
                  <template slot="header">
                    <div style="display:inline-block;float: right;cursor: pointer" @click="init">创建日期<i class="el-icon-refresh" style="margin-left: 40px" /></div>
                  </template>
                  <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.createTime) }}</span>
                  </template>
                </el-table-column>
              </el-table>

              <!--element-ui分页组件-->
              <el-pagination :total="total" :current-page="page + 1" style="margin-top: 8px;" layout="total, prev, pager, next, sizes" @size-change="sizeChange" @current-change="pageChange" />

            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>

    <!--修改密码弹出组件-->
    <update-pass ref="pass" />
    <!--修改邮箱弹出组件，将当前邮箱传递到修改邮箱子组件-->
    <update-email ref="email" :email="user.email" />

  </div>
</template>

<script>

  import myUpload from 'vue-image-crop-upload'    //导入图片、文件上传组件
  import { mapGetters } from 'vuex'

  import Avatar from '@/assets/images/avatar.png' //引入头像
  import { getToken } from "../../../utils/auth"; //从Cookie中获取token
  import store from '@/store'                     //获取所有定义的store
  import { isValidPhone } from '@/utils/validate' //手机号校验
  import { parseTime } from '@/utils/index'       //转化时间为时间字符串
  import { editUser } from '@/api/system/user'    //编辑用户信息

  import updatePass from "./center/updatePass";   //修改密码
  import updateEmail from "./center/updateEmail"; //修改邮箱

  import crud from '../../../mixins/crud'    //混入全局增删改查组件

	export default {
		name: "Center",
    components: {
		  myUpload,
      updatePass,
      updateEmail
    },
    mixins: [crud],   //混入 (mixins)：是一种分发 Vue 组件中可复用功能的非常灵活的方式。混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项，组件可直接进行使用。
    data() {
		  //自定义手机号验证
      const validPhone = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入电话号码'))
        }else if (!isValidPhone(value)) {
          callback(new Error('请输入正确的手机号码'))
        }else{
          callback()
        }
      }
		  return {
		    show: false,
        Avatar: Avatar,
        activeName: 'first',
        saveLoading: false,
        headers: {
		      'Authorization': getToken()
        },
        form: {},
        rules: {
		      nickName: [
            {required: true, message: '请输入用户昵称', trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
          ],
          phone: [
            {required: true, validator: validPhone, trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
		  ...mapGetters([
		    'user',
        'updateAvatarApi',
        'baseApi'
      ])
    },
    created() {
		  this.form = {   //初始化用户信息
		    id: this.user.id,
        nickName: this.user.nickName,
        gender: this.user.gender,
        phone: this.user.phone
      }
      //拉取用户信息
      store.dispatch('GetInfo').then(() => {})
    },
    methods: {
		  parseTime,    //解析时间为字符串
		  toggleShow() {    //切换头像显示
		    this.show = !this.show
      },
      handleClick(tab, event) {   //点击切换tab
		    if (tab.name === 'second') {
		      this.init()
        }
      },
      cropUploadSuccess(jsonData, field) {    //上传成功重新拉取用户信息
		    store.dispatch('GetInfo').then(() => {})
      },
      beforeInit() {    //获取用户操作日志
		    this.url = 'api/logs/user'
        return true
      },
      doSubmit() {  //提交修改用户信息
		    if (this.$refs['form']) {
		      this.$refs['form'].validate((valid) => {
		        if (valid) {
		          this.saveLoading = true
              editUser(this.form).then(() => {
                //混入的编辑成功通知
                this.editSuccessNotify()
                //重新拉取用户信息
                store.dispatch('GetInfo').then(() => {})
                this.saveLoading = false
              }).catch(() => {
                this.saveLoading = false
              })
            }
          })
        }else {
		      return false
        }
      }
    }
	}
</script>

<style ref="stylesheet" lang="scss">
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  .user-info {
    padding-left: 0;
    list-style: none;
    li{
      border-bottom: 1px solid #F0F3F4;
      padding: 11px 0;
      font-size: 13px;
    }
    .user-right {
      float: right;
      a{
        color: #317EF3;
      }
    }
  }
</style>
