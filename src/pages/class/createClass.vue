<template>
  <div class="body">
    <navbar active-index="4"></navbar>
    <el-container>
      <el-header>班级管理</el-header>
      <el-main>
        <el-steps :active="active" align-center finish-status="success">
          <el-step title="班级管理" icon="el-icon-edit"></el-step>
          <el-step title="预约实验" icon="el-icon-edit"></el-step>
          <el-step title="确认分配" icon="el-icon-edit"></el-step>
        </el-steps>
        <!-- *****************************************班级管理*********************************************** -->
        <div class="active" v-show="active == 0" style="margin-top: 12px">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="班级名称">
              <el-select v-model="form.className" allow-create default-first-option filterable placeholder="请选择">
    <el-option
      v-for="item in classes"
      :key="item.classId"
      :label="item.className"
      :value="item.classId">
    </el-option>
  </el-select>
            </el-form-item>

            <el-form-item label="选择学生">
              <el-table
                stripe
                max-height="250"
                border
                :data="
                  studentData.filter(
                    (data) =>
                      !search ||
                      data.studentID.toLowerCase().includes(search.toLowerCase())||
                      data.name.toLowerCase().includes(search.toLowerCase())||
                      data.major.toLowerCase().includes(search.toLowerCase())
                  )
                "
                ref="multipleTable"
                :default-sort="{ prop: 'studentID', order: 'ascending' }"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionStudent"
              >
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column label="学号" prop="studentID" sortable>
                  <template slot-scope="scope">{{
                    scope.row.studentID
                  }}</template>
                </el-table-column>
                <el-table-column label="姓名">
                  <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column label="专业">
                  <template slot-scope="scope">{{ scope.row.major }}</template>
                </el-table-column>
                <el-table-column align="right">
                  <template slot="header" slot-scope="scope">
                    <el-input
                      v-model="search"
                      size="mini"
                      placeholder="输入学生学号/姓名/专业搜索"
                    />
                  </template>
                </el-table-column>
              </el-table>
             
            </el-form-item>
            
          </el-form>
          
        </div>
        <!-- *****************************************预约实验*********************************************** -->
        <div class="active" v-show="active == 1" style="margin-top: 12px">
          <el-form  ref="form2" :model="form2" label-width="100px">
           
               <el-form-item label="课程时间">
              <el-date-picker
                v-model="form2.daterange"
                type="daterange"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="课程开始日期"
                end-placeholder="课程结束日期"
                align="right"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="预约实验时间">
              <el-time-picker
                is-range
                v-model="form2.timerange"
                format="HH:mm"
                value-format="HH:mm"
                :picker-options="{ step: '00:15' }"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
              >
              </el-time-picker>
            </el-form-item>
           
            
           
            <el-form-item label="选择实验">
              <el-table
                stripe
                max-height="250"
                border
                :data="
                  experimentData.filter(
                    (data) =>
                      !searchExper ||
                      data.ename
                        .toLowerCase()
                        .includes(searchExper.toLowerCase())
                  )
                "
                ref="multipleTable"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionExperiment"
              >
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column label="实验名称">
                  <template slot-scope="scope">{{ scope.row.ename }}</template>
                </el-table-column>
                <el-table-column label="实验手册">
                  <template slot-scope="scope">
                    <!-- <a :href="scope.row.url" download="分析模板.csv"></a> -->
                    <el-tag
                      ><a :href="scope.row.url" :download="scope.row.ename"
                        >实验手册下载</a
                      ></el-tag
                    >
                  </template>
                </el-table-column>
                <el-table-column label="实验所占资源">
                  <el-table-column prop="CPU" label="CPU">
                    <template slot-scope="scope">{{ scope.row.cpu }}</template>
                  </el-table-column>
                  <el-table-column prop="memory" label="内存">
                    <template slot-scope="scope">{{
                      scope.row.memory
                    }}</template>
                  </el-table-column>
                  <el-table-column prop="storeSpace" label="存储空间">
                    <template slot-scope="scope">{{
                      scope.row.storeSpace
                    }}</template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="开始时间">
                  <template slot-scope="scope">{{
                    scope.row.startDate
                  }}</template>
                </el-table-column>
                <el-table-column label="截止时间">
                  <template slot-scope="scope">{{
                    scope.row.endDate
                  }}</template>
                </el-table-column>
                <el-table-column align="right">
                  <template slot="header" slot-scope="scope">
                    <el-input
                      v-model="searchExper"
                      size="mini"
                      placeholder="输入实验名称搜索"
                    />
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            
          </el-form>
        </div>
        <!-- *****************************************确认分配*********************************************** -->

        <div class="active" v-show="active == 2" style="margin-top: 12px">
           <el-form ref="form3" :model="form3" label-width="100px">
            <el-form-item label="班级名称">
              <div class="item-content">{{form3.className}}</div>
            </el-form-item>

            
            <el-form-item label="已选学生">
              <!-- <el-card class="box-card">
                <div
                  v-for="item in form3.selectedStudents"
                  :key="item.studentID"
                  class="text item"
                >
                  {{ item.studentID+item.name }}
                </div>
              </el-card> -->
            </el-form-item>
             <el-form-item label="课程时间">
                <div class="item-content">{{form3.daterange?form3.daterange[0]+'至'+form3.daterange[1]:""}}</div>
              
            </el-form-item>
            <el-form-item label="预约实验时间">
              <div class="item-content">{{form3.timerange?form3.timerange[0]+'至'+form3.timerange[1]:""}}</div>
              
            </el-form-item>
             <el-form-item label="已选实验">
              <!-- {{form2.timerange}} -->
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>
    <el-footer>
      <el-button :disabled="active == 0" style="margin-top: 12px" @click="prior"
        >上一步</el-button
      >
      <el-button v-show="active != 2" style="margin-top: 12px" @click="next"
        >下一步</el-button
      >
      <el-button v-show="active == 2" style="margin-top: 12px" 
        >提交</el-button
      >
    </el-footer>
  </div>
</template>

<script>
import Navbar from "../../components/navbar.vue";
export default {
  name: "class",
  data() {
    return {
      active: 0,
      form: {
        className: "",
      },
      form2: {
        daterange: "",
        timerange: "",
      },
      form3:{
        className:"",
        selectedStudents:[],
        daterange:"",
        timerange:"",
        selectedExperiment:[],
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近半年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 183);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      studentData: [
        {
          studentID: "20227001",
          name: "张三",
          major: "计算机",
        },
        {
          studentID: "20227002",
          name: "李四",
          major: "软件工程",
        },
        {
          studentID: "20227003",
          name: "王五",
          major: "软件工程",
        },
        {
          studentID: "20227004",
          name: "王小虎",
          major: "软件工程",
        },
        {
          studentID: "20227005",
          name: "王小虎",
          major: "计算机",
        },
        {
          studentID: "20227006",
          name: "杜晓飞",
          major: "法律",
        },
        {
          studentID: "20227007",
          name: "啦啦啦",
          major: "网络安全",
        },
      ],
      experimentData: [
        {
          ename: "路由与交换技术",
          url: "../../../static/doc/啦啦啦.doc",
          cpu: "",
          memory: "",
          storeSpace: "",
          startDate: "2020-12-12",
          endDate: "2021-01-12",
        },
      ],

      search: "",
      searchExper: "",
      multipleStudent: [],
      multipleExperiment:[],
    };
  },
   components: {
    Navbar,
  },
  methods: {
    handleSelectionStudent(val) {
      
      this.multipleStudent = val;
      console.log(this.multipleStudent)
    },
    handleSelectionExperiment(val) {
      this.multipleExperiment = val;
    },
    prior() {
      this.active--;
    },
    next() {
      this.active++;
      if(this.active==2){
        this.form3.className = this.form.className;
        this.form3.daterange = this.form2.daterange;
        this.form3.timerange = this.form2.timerange;
        //this.form3.selectedStudents = this.multipleStudent;
        
      }
    },
  },
};
</script>

<style scoped>
.el-date-editor{
  width:100%;
}
.item-content{
  text-align: left;
}
</style>
