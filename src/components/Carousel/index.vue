<template>
  <div class="swiper-container" id="floor1Swiper" ref="cur">
    <div class="swiper-wrapper">
        <!-- 这里parent组件要传数据是要遍历的轮播图 -->
      <div
        class="swiper-slide"
        v-for="carousel in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: "Carousel",
  props:['list'],
  //轮播图要解决两个问题1bannerList要已有完整数据（用watch监视）
  //2for循环已经结束(用$nextTick)
  watch:{
    list:{
      //这里用watch监听而不是mounted是为了和listContainer里面轮播图代码格式一样
      //不开immediate的话监视不到变化（因为数据没变过)
      immediate:true,
      handler(){
        //这里v-for动态渲染结构无法确定所以还是要用nextTick
        this.$nextTick(()=>{
          var mySwiper = new Swiper(
            this.$refs.cur,
            {
              loop: true, // 循环模式选项

              // 如果需要分页器
              pagination: {
                el: ".swiper-pagination",
                //点击小球的时候也切换图片
                clickable: true,
              },

              // 如果需要前进后退按钮
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
            }
          );
        })
      }
    }
  }
};
</script>

<style>
</style>