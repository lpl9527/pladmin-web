<!--
    修改邮箱组件-->
<template>
    <div style="display: inline-block;">
      <el-dialog :visible.sync="dialog" :close-on-click-modal="false" :before-close="cancel" :title="title" append-to-body width="475px" @close="cancel">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="88px">
          <el-form-item label="新邮箱" prop="email">
            <el-input v-model="form.email" autocomplete="off" style="width: 200px;" />
            <el-button class="code-button" :loading="codeLoading" :disabled="isDisabled" size="small" @click="sendCode">{{ buttonName }}</el-button>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input v-model="form.code" auto-complete="new-password" style="width: 320px;" />
          </el-form-item>
          <el-form-item label="当前密码" prop="pass">
            <el-input v-model="form.pass" auto-complete="new-password" type="password" style="width: 320px;" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="cancel">取消</el-button>
          <el-button type="primary" :loading="loading" @click="doSubmit">确认</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>



	export default {
		name: "updateEmail",
    props: {
		  email: {
		    type: String,
        required: true
      }
    },
    data() {
		  const validMail = (rule, value, callback) => {
		    if (value === null || value === '') {
		      callback(new Error('新邮箱不能为空'))
        }else if (value === this.email){
		      callback(new Error('新邮箱不能与旧邮箱相同'))
        }else if(validMail(value)) {
		      callback()
        }else {
		      callback(new Error('邮箱格式错误'))
        }
      }
		  return {
		    loading: false,
        dialog: false,
        title: '修改邮箱',
        form: {
		      email: '',
          code: '',
          pass: ''
        },
        user: {
		      email: '',
          password: ''
        },
        codeLoading: false,
        buttonName: '获取验证码',
        isDisabled: false,
        time: 60,
        rules: {  //表单验证规则
		      email: [
		        {required: true, validator: validMail, trigger: 'blur'}
          ],
          code: [
            {required: true, message: '验证码不能为空', trigger: 'blur'}
          ],
          pass: [
            {required: true, message: '当前密码不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
		  cancel() {
		    this.resetForm()
      },
      resetForm() {
		    this.dialog = false
        this.$refs['form'].resetFields()
        window.clearInterval(this.timer)
        this.time = 60
        this.buttonName = '获取验证码'
        this.isDisabled = false
        this.form = {email: '', code: '', pass: ''}
      },
      sendCode() {
		    this.codeLoading = true
        this.buttonName = '验证码发送中'
        const _this = this
      },
      doSubmit() {    //修改邮箱
		    console.log('提交表单')
      }
    }
	}
</script>

<style scoped>

  .code-button {
    margin-left: 5px;
  }

</style>
