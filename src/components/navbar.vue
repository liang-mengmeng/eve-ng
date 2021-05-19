 <template>
  <div class="navbar">
    <div class="container">
      <div class="flex-start">
        <div class="logo">
          <img src="../../static/img/home/logo.png" alt @click="goHome" />
        </div>
      </div>

      <div class="flex-middle">
        <div class="menu">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            active-text-color="#57b2ff"
            @select="handleSelect"
          >
            <el-menu-item index="1" @click="goHome">首页</el-menu-item>
            <el-menu-item index="2" @click="goDoExperiment"
              >实验中心</el-menu-item
            >
            <el-menu-item index="3" @click="goExperiment"
              >我的实验室</el-menu-item
            >

            <el-menu-item index="4" @click="goClass">班级管理</el-menu-item>
            <el-menu-item index="6">课程管理</el-menu-item>
             <el-menu-item index="7">学生管理</el-menu-item>
          </el-menu>
        </div>
        <div class="login">
          <el-button v-if="!isLogin" @click="goLogin" type="primary"
            >登录|注册</el-button
          >
          <div v-if="isLogin">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <el-avatar icon="el-icon-user-solid"></el-avatar>
               
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="">退出登录</el-dropdown-item>
                
              </el-dropdown-menu>
            </el-dropdown>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Navbar",
  props:{
    activeIndex:{
      type:String
    }
  },
  
  data() {
    return {
      activeIndex:"1",
      isLogin: false,

    };
  },
  mounted() {
    
    this.loginStatus();
     
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key
        console.log(key, keyPath);
      },
    loginStatus(){
      let getUser = window.sessionStorage.getItem("user")
      if(getUser===null||getUser===""){
       this.isLogin = false
      }else{
      this.isLogin = true
    }
    },
    goHome() {
     
      this.$router.push({ path: "/" });
    },
    goExperiment() {
      
      this.$router.push({ path: "/experiment" });
    },
    goDoExperiment() {
      
      this.$router.push({ path: "/doExperiment" });
    },
    goClass() {
       this.$router.push({ path: "/class" });
    },
    goLogin() {
      this.$router.push({ path: "/login" });
    },
    handleCommand() {
     this.$confirm('此操作将注销登录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // this.getRequest("/logout");
            window.sessionStorage.removeItem("user")
            this.$store.commit('user', "");
            this.$router.replace("/");
            this.isLogin = false
           
            //触发后禁止浏览器的后退键
            history.pushState(null, null, document.URL);
           
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            });
          });

        
      }
  },
};
</script>
<style>
.navbar {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background: #fff;

  z-index: 10000;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  transition: box-shadow 0.3s;
}
.container {
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;

  margin: 0 1.5em;
}
.container .flex-start {
  flex-grow: 0;
  align-items: stretch;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  margin-right: auto;

  width: 250px;
  padding: 8px 10px 0 10px;

  cursor: pointer;
}
img {
  height: auto;
  width: 100%;
  max-width: 100%;
}
.container .flex-middle {
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin-left: auto;
}
.flex-middle .menu {
  margin-right: 1em;
}
.menu .el-menu {
  border: none;
}
.menu .el-menu.el-menu--horizontal{
  border:none
}
.flex-middle .login {
  margin-top: 20px;
}

.el-menu {
  border: 0;
  padding: 10px 0;
}
</style>