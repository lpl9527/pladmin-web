<!--
    修改密码组件-->
<template>
  <div style="display: inline-block">
    <el-dialog :visible.sync="dialog" :close-on-click-modal="false" :before-close="cancel" :title="title" append-to-body width="500px" @click="cancel">
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="88px">
        <el-form-item label="旧密码" prop="oldPass">
          <el-input v-model="form.oldPass" type="password" auto-complete="off" style="width: 370px;" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input v-model="form.newPass" type="password" auto-complete="off" style="width: 370px;" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPass">
          <el-input v-model="form.confirmPass" type="password" auto-complete="off" style="width: 370px;" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="cancel">取消</el-button>
        <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import store from '@/store'
  import { updatePass } from '@/api/system/user'    //用户相关api

	export default {
		name: "updatePass",
    data() {
		  const confirmPass = (rule, value, callback) => {    //自定义确认密码验证规则
		    if (value) {
		      //判断确认密码的值与新密码值是否相等，value为当前校验的值，callback为回调函数
		      if (this.form.newPass !== value) {
		        callback(new Error('两次输入的密码不一致'))
          }else {
		        callback()
          }
        }else {
		      callback(new Error('请再次输入密码'))
        }
      }
		  return {
		    loading: false,
        dialog: false,
        title: '修改密码',
        form: {
		      oldPass: '',
          newPass: '',
          confirmPass: ''
        },
        rules: {    //表单校验规则
		      oldPass: [{required: true, message: '请输入旧密码', trigger: 'blur'}],
          newPass: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
          ],
          confirmPass: [{required: true, validator: confirmPass, trigger: 'blur'}]
        }
      }
    },
    methods: {
		  cancel() {
		    this.resetForm()
      },
      resetForm() {   //重置表单
        this.dialog = false
        this.$refs['form'].resetFields()
        this.form = {oldPass: '', newPass: '', confirmPass: ''}
      },
      doSubmit() {    //提交表单，修改密码
		    this.$refs['form'].validate((valid) => {
		      if (valid) {
		        this.loading = true
            //更新密码
            updatePass(this.form).then(res => {
              //修改成功重置表单
              this.resetForm()
              this.$notify({
                title: '密码修改成功，请重新登录',
                type: 'success',
                duration: 1500
              })
              //登出当前用户
              setTimeout(() => {
                store.dispatch('LogOut').then(() => {
                  //重新实例化vue-router对象，防止出现bug
                  location.reload()
                })
              }, 1500)

            }).catch(err => {
              this.loading = false
              console.log('修改密码异常：')
              console.log(err.response.data.message)
            })

          }else {
		        return false
          }
        })
      }
    }
	}
</script>

<style scoped>

</style>
