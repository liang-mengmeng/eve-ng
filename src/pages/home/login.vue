<template>

  <div class="content" >
     <navbar></navbar>
    <el-form ref="form" :rules="rules" :model="form" class="login-form">
      <h2 class="login-title">用户登录</h2>
      <!-- <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
        <el-tab-pane label="学号登录" name="first"></el-tab-pane>
        <el-tab-pane label="手机登录" name="second"></el-tab-pane>
        <el-tab-pane label="邮箱登录" name="third"></el-tab-pane>
      </el-tabs> -->
      <!-- <el-form-item prop="studentId" v-if="activeName=='first'">
        <el-input placeholder="学号" v-model="form.studentId">
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
      </el-form-item> -->
      <el-form-item prop="telephone" v-if="activeName=='second'">
        <el-input placeholder="手机号码" v-model="form.telephone">
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
      </el-form-item>
      <!-- <el-form-item prop="email" v-if="activeName=='third'">
        <el-input placeholder="邮箱" v-model="form.email">
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
      </el-form-item> -->
      <el-form-item prop="password">
        <el-input v-model="form.password" placeholder="密码" show-password>
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
        >登录</el-button>
        <el-button @click="goRegister">注册</el-button>
       
      </el-form-item>
    </el-form>
  </div>
</template>
  <script>
import SIdentify from "../../components/identify.vue";
import Navbar from "../../components/navbar.vue";
import $ from "jquery";

export default {
  data() {
    
    /* 自定义验证码规则 */
    const validateVerifycode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("验证码"));
      } else if (value !== this.identifyCode) {
        console.log("validateVerifycode:", value);
        callback(new Error("验证码不正确!"));
      } else {
        callback();
      }
    };
    return {
      activeName: "second",
     
      form: {
        //studentId: "",
        telephone: "",
        //email: "",
        password: "",
        verifycode: ""
      },
      pw:"",
      identifyCodes: "1234567890abcdefghijklmnopqrstuvwxyz",
      identifyCode: "",
      rules: {
        // studentId: [
        //   { required: true, message: "学号不能为空", trigger: "blur" },
        //   { min: 3, max: 15, message: "学号为3-15的字符", trigger: "blur" }
        // ],
        telephone: [
          { required: true, message: "电话号码不能为空", trigger: "blur" },
          {
            pattern: /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/,
            message: "电话格式不正确",
            trigger: "blur"
          }
        ],
        // email: [
        //   { required: true, message: "邮箱不能为空", trigger: "blur" },
        //   {
        //     pattern: /^\w+@[a-z0-9]+\.[a-z]{2,4}$/,
        //     message: "邮箱格式不正确",
        //     trigger: "blur"
        //   }
        // ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 8, max: 30, message: "密码长度为 8 - 30位", trigger: "blur" },
          {
            pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,30}$/,
            message: "密码为数字，小写字母，大写字母，特殊符号 至少包含三种",
            trigger: "blur"
          }
        ],
        verifycode: [
          {
            required: true,
            trigger: "blur",
            validator: validateVerifycode
          }
        ]
      }
    };
  },
  components: {
    SIdentify,
     Navbar
  },
  
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);

    history.pushState(null, null, document.URL);
    if (window.history && window.history.pushState) {
      $(window).on("popstate", function() {
        window.history.pushState("forward", null, "");
        window.history.forward(1);
      });
      window.history.pushState("forward", null, ""); //在IE中必须得有这两行
      window.history.forward(1);
    }
    let sha256 = require("js-sha256").sha256//这里用的是require方法，所以没用import
    this.pw = sha256(this.form.password)//要加密的密码
    

          

      
  },
  methods: {
    

    submitForm(formName) {
     
      this.$refs[formName].validate(valid => {
        if (valid) {
         this.$axios
            .get(this.$api +"/student/login", {
              params: {
                //studentId: this.form.studentId,
                telephone: this.form.telephone,
                //email: this.form.email,
                password: this.pw,
                
              },
            })
           .then((resp) => {
              if(resp.data.state=="200"){
                //登录成功
                 this.common.myMessage({
                    message: '登录成功！',
                    type: 'success',
                  });
                  
                this.$store.commit("SET_USER",resp.data.soid)
                   this.$router.push({ path: "/" });
                 
              }else{
                // 登录失败
                this.common.myMessage(
                  {message: '登录失败,'+resp.data.errMsg,
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
    goRegister() {
      this.$router.push({ path: "/register" });
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 密码加密
    encryption() {
	    let key = ''
	    let iv = ''
	    return new Promise(resolve => {
	        getKeyiv().then(res => {
	            key = res.data.key
	            iv = res.data.iv
	            resolve({
	                key,
	                iv
	            })
	        })
	    })
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
    handleClick(tab) {
      this.$refs["form"].resetFields();
    }
  }
};
</script>
<style acoped scoped>
    .login-form {
  width: 350px;
  margin: 160px auto; /* 上下间距160px，左右自动居中*/
  background-color: rgb(255, 255, 255, 0.8); /* 透明背景色 */
  padding: 30px;
  border-radius: 20px; /* 圆角 */
}
</style>
<style scoped>


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
.el-form-item{
    margin-bottom:18px
}
</style> 