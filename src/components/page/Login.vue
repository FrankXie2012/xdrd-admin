<template>
<div class="login-wrap">
    <div class="ms-title">徐墩人大 <small>后台管理系统</small></div>
    <div class="ms-login">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
            <el-form-item prop="username">
                <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
            </el-form-item>
            <el-form-item prop="validateCode">
                <el-input v-model="ruleForm.validateCode" placeholder="验证码"></el-input>
            </el-form-item>
            <img :src="code" @click="refreshCode" alt="验证码" class="code-img">
            <div class="login-btn">
                <el-button type="primary" :disabled="btnActive" :loading="isLoading" @click="submitForm('ruleForm')">登录</el-button>
            </div>
        </el-form>
    </div>
</div>
</template>

<script>
export default {
  data: function() {
    return {
      isLoading: false,
      code: "servlet/validateCodeServlet?" + new Date().getTime(),
      ruleForm: {
        username: "",
        password: "",
        validateCode: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        validateCode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    // 登录按钮禁用控制
    btnActive: function() {
      let form = this.ruleForm;
      if (form.username && form.password && form.validateCode) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    // 刷新验证码
    refreshCode() {
      this.code = "servlet/validateCodeServlet?" + new Date().getTime();
    },
    submitForm(formName) {
      const self = this;
      self.isLoading = true;
      self.$refs[formName].validate(valid => {
        if (valid) {
          self.$axios.post("../manage/login", self.ruleForm).then(res => {
            let _res = res.data;
            self.isLoading = false;
            if (_res.state === "success") {
              self.$store.commit("setLogin", _res.data);
              self.$router.push("/");
            } else {
              self.$message.error(_res.msg);
              self.refreshCode();
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}

.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 210px;
  margin: -160px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
}
.code-img {
  height: 38px;
  width: 80px;
  position: absolute;
  right: 42px;
  top: 165px;
}
</style>
