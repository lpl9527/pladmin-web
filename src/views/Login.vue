<template>
  <div class="login" :style="'background-image:url(' + Background + ');'" >
    <!--登录表单-->
    <!--vue的ref属性用于给元素或者子组件注册引用信息，这样就可以通过$refs.名称来对dom进行引用-->
    <!--:model用于实现数据的双向绑定-->
    <!--:roles用于指定表单的验证规则-->
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" label-position="left" label-width="0px">
      <h3 class="title">ADMIN-SYSTEM 后台管理系统</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          <!--这里使用了vue的Svg Icon图标，在@/icons/svg中的图标只需在svg-icon标签的icon-class属性指定图标名称即可引入-->
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码" @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="loginForm.code" auto-complete="off" placeholder="验证码" style="width: 63%;" @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode">
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0 0 25px 0;">
        记住我
      </el-checkbox>
      <el-form-item style="width: 100%;">
        <el-button :loading="loading" size="medium" type="primary" style="width: 100%;" @click.enter.native="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
    <!--底部-->
    <div v-if="$store.state.settings.showFooter" id="el-login-footer">
      <span v-html="$store.state.settings.footerTxt" />
      <span> · </span>
      <a href="http://www.beian.miit.gov.cn" target="_blank">{{$store.state.settings.caseNumber}}</a>
    </div>

  </div>
</template>

<script>

  import Background from '@/assets/images/background.jpg'   //引入背景图片
  import {getCodeImg} from "../api/login";    //引入获取验证码图片api

  export default {
		name: "login",
    data() {
		  return {
        Background: Background,   //背景图片引用
        codeUrl: '',
        loginForm: {      //表单数据双向绑定
          username: 'admin',
          password: '111111',
          rememberMe: false,
          code: '',
          uuid: ''
        },
        loginRules: {   //表单验证规则
          username: [{
            required: true,     //是否必需
            trigger: 'blur',    //触发时机，光标离开时进行校验
            message: '用户名不能为空'    //提示信息
          }],
          password: [{required: true, trigger: 'blur', message: '密码不能为空'}],
          code: [{required: true, trigger: 'change', message: '验证码不能为空'}]
        },
        loading: false,
        redirect: undefined
      }
    },
    methods: {
		  getCode() {   //获取验证码图片地址
		    /*getCodeImg().then(res => {
		      this.codeUrl = res.img    //获取图片
          this.loginForm.uuid = res.uuid  //获取uuid
        })*/
      },
		  handleLogin() {
		    console.log("登录！")
      }
    }
	}
</script>

<style rel="stylesheet/scss" lang="scss">
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-size: cover;
  }
  .title {
    margin: 0 auto 30px auto;
    text-align: center;
    color: #707070;
  }

  .login-form {
    border-radius: 6px;
    background: #ffffff;
    width: 385px;
    padding: 25px 25px 5px 25px;
    .el-input {
      height: 38px;
      input {
        height: 38px;
      }
    }
    .input-icon{
      height: 39px;width: 14px;margin-left: 2px;
    }
  }
  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }
  .login-code {
    width: 33%;
    display: inline-block;
    height: 38px;
    float: right;
    img{
      cursor: pointer;
      vertical-align:middle
    }
  }
</style>
