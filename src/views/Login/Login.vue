<template>
  <div class="login-box" :style="windowHeight">
    <img class="login-uni" src="../../images/cqjtu.png" alt>
    <div class="login-background">
      <div class="login-form">
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <p class="login-label">用户登录</p>

          <el-form-item label="账号" prop="account">
            <el-input type="text" v-model="loginForm.personLoginName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="loginForm.personPassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-submit" type="primary" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      windowHeight: {
        height: window.innerHeight + "px"
      },
      loginForm: {
        personLoginName: null,
        personPassword: null
      },
      rules: {
        personLoginName: [
          {
            type: "date",
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
        ],
        personPassword: [
          {
            type: "date",
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted: function() {},
  methods: {
    submitForm(formName) {
      var that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
        } else {
          return false;
        }
      });
      axios
        .post("http://bridge.vipgz1.idcfengye.com/sso/user/login", {
          personLoginName: this.loginForm.personLoginName,
          personPassword: this.loginForm.personPassword
        })
        .then(function(response) {
          //console.log("response")
          //console.log(response.data.ret)
          if (response.data.ret == 1) {
            alert("账号或密码错误");
          }
          if (response.data.ret == 0) {
            localStorage.setItem("token", response.data.data);
            console.log(localStorage.getItem("token"));
            axios.defaults.headers.common[
              "Authorization"
            ] = window.localStorage.getItem("token");
            that.$router.push({
              path: "/home"
            });
          }
          if (response.data.ret == 2) {
            alert("未登录");
          }
        })
        .catch(function(error) {});
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="stylus" scoped>
.login-label {
  font-size: 22px;
  padding: 20px 0 20px 50px;
}

.login-uni {
  margin-top: 20px;
  padding-left: 40px;
}

.login-box {
  position: relative;
}

.login-background {
  position: absolute;
  width: 100%;
  height: 400px;
  background: url('../../images/login3.jpg') 100% 21% no-repeat;
  top: 50%;
  margin-top: -200px;
}

.login-select {
  width: 100%;
}

.login-form {
  float: right;
  margin-right: 100px;
  margin-top: 80px;
  width: 350px;
  padding: 24px 24px 24px 0px;
  border-radius: 5px;
  box-shadow: 0 0px 6px rgba(0, 0, 0, 0.82);
  background-color: #fff;
  z-index: 11;
}

.login-submit {
  width: 100%;
}
</style>
