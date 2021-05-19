<template>
  <div class="body">
    <navbar active-index="2"></navbar>
    <div class="content">
      <div class="searchBar">
      <el-form ref="form" :model="form" label-width="80px" :inline="true"> 
        
      <el-form-item label="实验名称">
        <el-input
          placeholder="请输入实验名称搜索"
          v-model="form.eName"
          @keyup.enter.native="changeKey"
          clearable
        >
          <i
            slot="prefix"
            class="el-input__icon el-icon-search"
            @click="changeKey"
            style="cursor: pointer"
          ></i>
        </el-input>
        </el-form-item>
        <el-form-item label="实验时段">
   <el-date-picker
      v-model="form.datetimerange"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right">
    </el-date-picker>
  </el-form-item>
         <el-form-item label="任课老师">
    <el-input v-model="form.teacherName"></el-input>
  </el-form-item>
          <el-form-item label="所属课程">
          <el-select
          v-model="form.className"
          placeholder="请选择课程"
          @change="changeClass"
        >
          <el-option
            v-for="item in classList"
            :key="item.value"
            :label="item.cName"
            :value="item.value"
          >
          </el-option>
        </el-select>
         </el-form-item>
          <el-form-item>
    <el-button  type="primary" @click="onSubmit">搜索</el-button>
  </el-form-item>
         </el-form>
        
       
      </div>
      <div class="experiment-list">
        <div
          class="columns-item"
          v-for="item in experimentList"
          v-if="experimentList.length > 0"
        >
          <el-card :body-style="{ padding: '0px' }">
            <div style="padding: 10px">
              <div class="e-title">{{ item.experimentContentName }}</div>
              <div class="bottom clearfix">
                <time class="time"
                  >可用资源&nbsp;&nbsp;CPU:{{ item.cpuTopLimit }}内存：{{
                    item.memoryTopLimit
                  }}</time
                >
              </div>
            </div>
          </el-card>
          <div class="buttons">
            <el-row>
              <el-button
                size="small"
                type="info"
                round
                @click="preview(item.url)"
                >实验手册</el-button
              >
              <el-button size="small" type="primary" round @click="carryout()"
                >我要做实验</el-button
              >
              <el-button size="small" icon="el-icon-star-off"></el-button>
            </el-row>
          </div>
        </div>
        <div class="nodata" v-if="experimentList.length === 0">
          <img src="../../../static/img/experiment/nodata.png" alt />
        </div>
      </div>

      <div class="bullet-content" id="pdf">
        <!-- <canvas v-for="item in totalPage" :key="item" :id='"the-canvas" + item' class="pdf-content"></canvas> -->

        <!-- <pdf
      :src="src" 
      :page="currentPage" 
      @num-pages="pageCount=$event"
      @page-loaded="currentPage=$event" 
      @loaded="loadPdfHandler"> 
    </pdf> -->
        <iframe name="myFrame" :src="experimentUrl"></iframe>
      </div>
    </div>
    <!-- <div class="alertBox">
        
       
    </div> -->
  </div>
</template>
<script>
import Navbar from "../../components/navbar.vue";
import pdf from "vue-pdf";
import PDFJS from "pdfjs-dist";
export default {
  name: "doExperiment",
  data() {
    return {
      form:{
        eName:"",
        className:"路由与交换技术",
        datetimerange:"",
       
        teacherName:"",
      },
     

      experimentUrl: "",
      classList: [
        {
          value: "路由与交换技术",
          cName: "路由与交换技术",
        },
        {
          value: "计算机网络课程设计",
          cName: "计算机网络课程设计",
        },
      ],
      experimentList: [],
    };
  },
  components: {
    Navbar,
  },

  mounted() {
    this.loadingList(); //在html加载完成后进行，相当于在页面上同步显示后端数据
  },
  methods: {
    //加载数据
    loadingList() {
      {
        this.$axios.get("/mock/experimentData").then((resp) => {
          // url即在mock.js中定义的
          this.experimentList = resp.data.experimentlist;
        });
        // this.$axios
        //   .get(this.$api + "/experiment/findexpbyexpcontentname", {
        //     params: {
        //       category: this.classSearch,
        //       contentname: this.keySearch,
        //     },
        //   })
        //   .then((resp) => {
        //     if (resp.data.status == "200") {
        //       this.experimentList = resp.data.experimentlist;
        //     } else {
        //       console.log("请求失败：" + err.status + "," + err.statusText);
        //     }
        //   })
        //   .catch((err) => {
        //     console.log("请求失败：" + err.status + "," + err.statusText);
        //   });
      }
    },
    // 修改课程后触发
    changeClass(val) {
      this.loadingList();
    },
    // 输入实验名称后触发
    changeKey() {
      this.loadingList();
    },
    // 点击查询按钮后触发
    onSubmit(){
      this.loadingList();
    },
    // 下载附件
    preview(url) {
      //window.open(url);
      window.open(
        url,
        "_blank",
        "menubar=no,toolbar=no, status=no,scrollbars=yes"
      );
    },
    // 做实验
    carryout() {
      this.$router.push({ path: "/edetail" });
    },
  },
};
</script>
<style  scoped>
.searchBar {
  display: flex;
}
.searchBar .el-input,
.searchBar .el-select {
 
}
.experiment-list {
  overflow: hidden;
  margin: 0.6em;
}
.columns-item {
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 30%;
  height: 200px;
  margin: 14px 0.8%;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 1;
  border-radius: 2px;
  color: #fff;
  float: left;
  position: relative;
}
.columns-item:hover {
  transform: scale(1.02);
  box-shadow: 5px 5px 20px 5px rgba(0, 0, 0, 0.15);
}
.columns-item .e-title {
  /*flex 布局*/
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  justify-content: center;

  text-align: justify;

  height: 140px;

  margin: 0 auto;
  color: #fff;
}
.columns-item .time {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #fff;
  font-size: 14px;
  float: right;
}
.columns-item .buttons {
  margin-top: 6px;
}
.alertBox {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 99;
}
.alertBox .bullet-content {
}
</style>
<style>


.columns-item .el-card__body {
  background: #409eff;
  border: none;
  color: #fff;
  height: 160px;
  position: relative;
}
</style>
