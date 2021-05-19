<template>
 
   
   <div class="body">
    <navbar active-index="4"></navbar>
    <div class="content">
      <div class="searchBar">
      <el-form ref="form" :model="form" label-width="80px" :inline="true"> 
        
      <el-form-item label="班级名称">
        <el-input
          placeholder="请输入班级名称搜索"
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
         <el-form-item label="所属专业">
        <el-input
         
          v-model="form.major"
        
          clearable
        >
         
        </el-input>
        </el-form-item>
        <el-form-item label="开课时段">
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
           <el-form-item label="所在学期">
        <el-input
         
          v-model="form.semester"
        
          clearable
        >
         
        </el-input>
        </el-form-item>
          <el-form-item label="备注信息">
            <el-input 
  type="textarea"
  autosize
  placeholder="请输入备注信息"
  v-model="form.bz" clearable>
</el-input>
       
        </el-form-item>
         <el-form-item>
    <el-button type="primary" @click="onSubmit">搜索</el-button>
  </el-form-item>
         </el-form>
        
       
     

    </div>
    <!-- <div class="alertBox">
        
       
    </div> -->
  </div>
   
  </div>
</template>

<script>
import Navbar from "../../components/navbar.vue";
export default {
  name: "class",
  data() {
    return {
      active: 0,
       form:{
        eName:"",
        major:"",
        datetimerange:"",
       teacherName:"",
       semester:"",
        bz:"",
      },
     
      
        
      
     
     

      
    };
  },
   components: {
    Navbar,
  },
  methods: {
   onSubmit:{},
   changeKey:{},
   
    
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
