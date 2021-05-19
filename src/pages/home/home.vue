<template>
  <div class="home">
   
        <navbar active-index="1"></navbar>
  

    <div class="carousel content">
      <carousel-3d  width="500" height="300" style="cursor:pointer">
        <slide v-for="item in imgList" :index="item.index">
          <img :src="['../../../static/img/home/'+item.src]" alt />
        </slide>
      </carousel-3d>
    </div>
   
  </div>
</template>

<script>
import Navbar from "../../components/navbar.vue";
export default {
  name: "home",
  data() {
    return {
       menuId:"1",
      imgList: [
        { index: 0, src: "slide1.jpg" },
        { index: 1, src: "slide2.jpg" },
        { index: 2, src: "slide3.jpg" },
        { index: 3, src: "slide4.jpg" },
        { index: 4, src: "slide5.jpg" },
      ],
    };
  },
  components: {
    Navbar
  },
  methods: {
   
   
    },
  
};
</script>

<style >



/* .middle .item-left {
  float: left;
  width: 30%;
  background: coral;
} */
</style>

