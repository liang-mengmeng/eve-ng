<template>
  <div class="content">
    <navbar></navbar>
    <el-form ref="form" :rules="rules" :model="form" class="login-form">
      <h2 class="login-title">用户注册</h2>

      <el-form-item prop="studentName">
        <el-input placeholder="姓名（必填）" v-model="form.studentName">
          <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
        </el-input>
      </el-form-item>
       <el-form-item prop="studentId">
        <el-input placeholder="学号" v-model="form.studentId">
          <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="telephone">
        <el-input placeholder="手机号码（必填）" v-model="form.telephone">
          <i slot="prefix" class="el-input__icon el-icon-phone"></i>
        </el-input>
      </el-form-item>
      <!-- <el-form-item prop="verifyTel">
        <div class="input" style="float: left">
          <el-input
            v-model="form.verifyTel"
            placeholder="短信验证码"
          ></el-input>
        </div>
        <el-button
          type="primary"
          @click="getVerify"
          style="float: left; margin-left: 30px"
          :disabled="(disabled = !show)"
        >
          <span v-show="show">获取验证码</span>
          <span v-show="!show" class="count">{{ count }} s</span>
        </el-button>
      </el-form-item> -->

      <el-form-item prop="email">
        <el-input placeholder="邮箱" v-model="form.email">
          <i slot="prefix" class="el-input__icon el-icon-s-comment"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" placeholder="密码（必填）" show-password>
          <i slot="prefix" class="el-input__icon el-icon-key"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="newPwd">
        <el-input
          v-model="form.newPwd"
          placeholder="请重新输入密码"
          show-password
        >
          <i slot="prefix" class="el-input__icon el-icon-key"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="verifycode" class="verifycode">
        <div class="input">
          <el-input v-model="form.verifycode" placeholder="验证码"></el-input>
        </div>

        <div class="identifybox">
          <div @click="refreshCode">
            <s-identify :identifyCode="identifyCode"></s-identify>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('form')"
          @keyup.enter.native="submitForm('form')"
          >注册</el-button
        >
        <el-button @click="goLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  <script>
import SIdentify from "../../components/identify.vue";
import Navbar from "../../components/navbar.vue";

export default {
  data() {
    /* 自定义验证码规则 */
    const validateVerifycode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("验证码"));
      } else if (value !== this.identifyCode) {
        console.log("validateVerifycode:", value);
        callback(new Error("验证码不正确"));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      show: true,
      count: "",
      timer: null,
      pw:"",
      newpw:"",
      form: {
        studentName: "",
        telephone: "",
        verifyTel: "",
        email: "",
        password: "",
        newPwd: "",
        verifycode: "",
      },
      identifyCodes: "1234567890abcdefghijklmnopqrstuvwxyz",
      identifyCode: "",
      rules: {
        studentName: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
          { min: 2, max: 15, message: "姓名为2-15的字符", trigger: "blur" },
        ],
        telephone: [
          { required: true, message: "电话号码不能为空", trigger: "blur" },
          {
            pattern: /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/,
            message: "电话格式不正确",
            trigger: "blur",
          },
        ],
        // verifyTel: [
        //   { required: true, message: "短信验证码不能为空", trigger: "blur" }
        // ],
        email: [
          
          {
            pattern: /^\w+@[a-z0-9]+\.[a-z]{2,4}$/,
            message: "邮箱格式不正确",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 8, max: 30, message: "密码长度为 8 - 30位", trigger: "blur" },
          {
            pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,30}$/,
            message: "密码为数字，小写字母，大写字母，特殊符号 至少包含三种",
            trigger: "blur",
          },
        ],
        newPwd: [{ required: true, validator: validatePass2, trigger: "blur" }],
        verifycode: [
          {
            required: true,
            trigger: "blur",
            validator: validateVerifycode,
          },
        ],
      },
    };
  },
  components: {
    SIdentify,
    Navbar,
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);

    history.pushState(null, null, document.URL);
    if (window.history && window.history.pushState) {
      $(window).on("popstate", function () {
        window.history.pushState("forward", null, "");
        window.history.forward(1);
      });
      window.history.pushState("forward", null, ""); //在IE中必须得有这两行
      window.history.forward(1);
    }
    let sha256 = require("js-sha256").sha256//这里用的是require方法，所以没用import
    this.pw = sha256(this.form.password)//要加密的密码
    this.newpw = sha256(this.form.newPwd)//要加密的密码
  },
  methods: {
    getVerify() {
      // 验证手机号
      if (this.checkPhone() == false) {
        return false;
      } else {
        const TIME_COUNT = 60; //更改倒计时时间
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer); // 清除定时器
              this.timer = null;
            }
          }, 1000);
        }
      }
    },
    checkPhone() {
      let phone = this.form.telephone;
      if (
        !/^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/.test(
          phone
        )
      ) {
        this.$message.error("请填写正确的手机号");
        return false;
      }
    },

    submitForm(formName) {
      
      
      this.$refs[formName].validate((valid) => {
        if (valid) {
          
          
          this.$axios
            .get(this.$api +"/student/register", {
              params: {
                studentName: this.form.studentName,
                telephone: this.form.telephone,
                email: this.form.email,
                password: this.pw,
                authority: 0, //校内人员，校外人员
              },
            })
            .then((resp) => {
              if(resp.data.status=="200"){
               //注册成功
                 this.common.myMessage({
                    message: '注册成功！',
                    type: 'success',
                  });
                  this.goLogin()
                 
              }else{
                // 注册失败
                this.common.myMessage(
                  {message: '注册失败，请联系管理员！',
                    type: 'error',
                  });
                console.log("请求失败：" + err.status + "," + err.statusText);
              }
              
            })
            .catch((err) => {
              
              console.log("请求失败：" + err.status + "," + err.statusText);
            });
        } else {
          return false;
        }
      });
    },
    goLogin() {
      this.$router.push({ path: "/login" });
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 切换验证码
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      console.log(this.identifyCode);
      /* alert(this.identifyCode) */
    },
  },
};
</script>

<style scoped>
.login-form {
  width: 350px;
  margin: 20px auto; /* 上下间距160px，左右自动居中*/
  background-color: rgb(255, 255, 255, 0.8); /* 透明背景色 */
  padding: 30px;
  border-radius: 20px; /* 圆角 */
}

/* 背景 */
.content {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../../static/img/home/bg.jpg");
}

/* 标题 */

.login-title {
  color: #303133;
  text-align: center;
  margin-bottom: 20px;
}
.el-input__icon {
  font-size: 20px;
}
.verifycode {
  /* display: -webkit-flex; 
display: flex;
  flex-direction: column ;
  justify-content: space-between; */

  clear: both;
}
.verifycode .input {
  float: left;
}
.identifybox :hover {
  cursor: pointer;
}
.el-form-item {
  margin-bottom: 18px;
}
</style> 