<template>
  <div class="login" :style="'background-image:url(' + Background + ');'" >
    <!--登录表单-->
    <!--vue的ref属性用于给元素或者子组件注册引用信息，这样就可以通过$refs.名称来对dom进行引用-->
    <!--:model用于实现数据的双向绑定-->
    <!--:roles用于指定表单的验证规则-->
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" label-position="left" label-width="0px">
      <h3 class="title">PL-ADMIN 后台管理系统</h3>
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
  import { getCodeImg } from '@/api/login'    //引入获取验证码图片api
  import {encrypt} from "../utils/rsaEncrypt";  //导入RSA加密函数
  import Config from '@/settings'   //导入全局设置
  import Cookies from 'js-cookie'   //导入Cookie

  export default {
		name: "login",
    data() {
		  return {
        Background: Background,   //背景图片引用
        codeUrl: '',
        cookiePass: '',   //Cookie中加密后的密码
        loginForm: {      //表单数据双向绑定
          username: '',
          password: '',
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
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    created() {   //组件创建完成时执行
		  //获取验证码
      this.getCode()
      //获取用户名、密码等Cookie信息，初始化登录表单数据
      this.getCookie()
      //token过期时提示
      this.point()
    },
    methods: {
		  getCode() {   //获取验证码图片
		    getCodeImg().then(res => {
		      this.codeUrl = res.img    //获取图片
          this.loginForm.uuid = res.uuid  //获取uuid（验证码在redis中的key）
        })
      },
      getCookie() { //获取Cookie中的用户信息
        const username = Cookies.get('username')
        let password = Cookies.get('password')
        const rememberMe = Cookies.get('rememberMe')
        this.cookiePass = password === undefined ? '' : password

        //如果Cookie中没有用户信息，则获取表单输入的用户密码
        password = password === undefined ? this.loginForm.password : password
        this.loginForm ={
          username: username === undefined ? this.loginForm.username : username,
          password: password,
          rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
          code: ''
        }
      },
		  handleLogin() {   //登录逻辑
		    this.$refs.loginForm.validate(valid => {
		      const user = {
		        username: this.loginForm.username,
            password: this.loginForm.password,
            rememberMe: this.loginForm.rememberMe,
            code: this.loginForm.code,
            uuid: this.loginForm.uuid
          }
          //如果密码与Cookie中密码不同，将当前密码RSA非对称加密处理
          if (user.password !== this.cookiePass) {
            user.password = encrypt(user.password)
          }
          if (valid){
            this.loading = true   //表单提交阶段显示登陆中...
            //如果选择了记住用户，则将用户信息放入Cookie
            if (user.rememberMe){
              Cookies.set('username', user.username, {expires: Config.passCookieExpires})
              Cookies.set('password', user.password, {expires: Config.passCookieExpires})
              Cookies.set('rememberMe', user.rememberMe, {expires: Config.passCookieExpires})
            }else { //否则移除用户信息
              Cookies.remove('username')
              Cookies.remove('password')
              Cookies.remove('rememberMe')
            }
            this.$store.dispatch('Login', user).then(() => {
              this.loading = false
              this.$router.push({path: this.redirect || '/'})
            }).catch(() => {
              this.loading = false
              this.getCode()  //登录失败后重新加载验证码
            })

          }else {   //表单验证未通过
            return false
          }
        })
      },
      point() {   //登录状态过期提示
		    const point = Cookies.get('point') !== undefined
        if (point) {
          this.$notify({
            title: '提示',
            message: '当前登录状态已过期，请重新登录！',
            type: 'warning',
            duration: 8000
          })
          Cookies.remove('point')
        }
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
