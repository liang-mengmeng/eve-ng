<template>
  <div class="body">
    <navbar active-index="4"></navbar>
    <div class="content">
      <iframe
        frameborder="0"
        scrolling="auto"
        style="width: 100%"
        id="mainIframe"
        name="mainIframe"
        :src="iframeUrl"
        
      ></iframe>
    </div>
    <!-- <div class="callback">
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div> -->
  </div>
</template>
<script>
import Navbar from "../../components/navbar.vue";
export default {
  name: "EDetail",
  data() {
    return {
        iframeUrl:"http://netlab.hdu.edu.cn:20031/"
    };
  },
  components: {
    Navbar,
  },
  mounted(){
     const oIframe = document.getElementById('mainIframe');
    const deviceWidth = document.documentElement.clientWidth;
    const deviceHeight = document.documentElement.clientHeight;
    oIframe.style.width = (Number(deviceWidth)-80) + 'px'; //数字是页面布局宽度差值
    oIframe.style.height = (Number(deviceHeight)-120) + 'px'; //数字是页面布局高度差

    




    
  },
  methods: {
      
  },
};
</script>
<style scoped>
</style>