<template>
<div id="div_login">
    <img alt="Vue logo" src="@/assets/logo.png">
    <h1>欢迎来到医生会诊管理系统</h1>
    <a-form layout="inline" :form="form" @submit="handleSubmit">
    <a-form-item :validate-status="userNameError() ? 'error' : ''" :help="userNameError() || ''">
      <a-input
        v-decorator="[
          'account',
          { rules: [{ required: true, message: 'Please input your account!' }] },
        ]"
        placeholder="Account"
      >
        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item :validate-status="passwordError() ? 'error' : ''" :help="passwordError() || ''">
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]"
        type="password"
        placeholder="Password"
      >
        <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" :disabled="hasErrors(form.getFieldsError())">
        Log in
      </a-button>
    </a-form-item>
  </a-form>
  </div>
</template>

<script>
import sha1 from 'js-sha1' //mian.js

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
export default {
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this, { name: 'horizontal_login' }),
    };
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();
    });
  },
  methods: {
    // Only show error after a field is touched.
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('account') && getFieldError('account');
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('password') && getFieldError('password');
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let sha1Pass = sha1(values.password).toUpperCase()
          const loginParams = "?dbUser="+values.account+"&pwd="+sha1Pass;
          this.$Http.Get(this.$Api.Login.login+loginParams).then((res) => this.loginSuccess(res));
        }
      });
    },
    loginSuccess (res) {
        let resData = res.data

        // this.$GlobalData.AccessToken = res.token;
        // this.$GlobalData.LoginUserInfo = res.obj;

        //因为登录暂未实现，则先写死
        this.$GlobalData.AccessToken = "4ec1dac6-f0a4-4b3e-bf94-aa60b18148fe";
        this.$GlobalData.LoginUserInfo = {"dbuser":"000324","username":"000324","userid":"000324","hospitalid":"1000000"}
        
        console.log(resData)
        if(resData.passed){
          this.$router.push({ path: '/' })
          // 延迟 1 秒显示欢迎信息
          setTimeout(() => {
            this.$notification.success({
              message: '欢迎',
              description: `欢迎回来`
            })
          }, 1000)
        }else{
          this.$message.error(`用户名密码错误，请重试！`);
        }
        
       
        // this.isLoginError = false
    },
  },
};
</script>
<style>
#div_login {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>


