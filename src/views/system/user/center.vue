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
    </el-row>

    <!--修改密码弹出组件-->
    <update-pass ref="pass" />
    <!--修改邮箱弹出组件-->
    <update-email ref="email" :email="user.email" />

  </div>
</template>

<script>

  import myUpload from 'vue-image-crop-upload'    //导入图片、文件上传组件
  import { mapGetters } from 'vuex'

  import Avatar from '@/assets/images/avatar.png' //引入头像
  import { getToken } from "../../../utils/auth"; //从Cookie中获取token
  import store from '@/store'   //获取所有定义的store
  import updatePass from "./center/updatePass";   //修改密码
  import updateEmail from "./center/updateEmail"; //修改邮箱

	export default {
		name: "Center",
    components: {
		  myUpload,
      updatePass,
      updateEmail
    },
    data() {
		  return {
		    show: false,
        Avatar: Avatar,
        activeName: 'first',
        saveLoading: false,
        headers: {
		      'Authorization': getToken()
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
    methods: {
		  toggleShow() {    //切换头像显示
		    this.show = !this.show
      },
      cropUploadSuccess(jsonData, field) {    //上传成功重新拉取用户信息
		    store.dispatch('GetInfo').then(() => {})
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
