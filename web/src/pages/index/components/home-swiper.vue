<template>
  <div class="HomeSwiper">
    <!-- 动态将轮播图的容器高度设置成与图片一直 -->
    <el-carousel trigger="click">
      <el-carousel-item v-for="item in swiperImg" :key="item">
        <img :src="item" alt="" style="height: 100%" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'home-swiper',
  data() {
    return {
      // 图片地址数组
      swiperImg: [
        'https://image.scqckypw.com/media/upload/images/chuanyu.jpg',
        'https://image.scqckypw.com/media/upload/images/dangshi.jpg',
        'https://image.scqckypw.com/media/upload/images/chuxing.jpg',
        'https://image.scqckypw.com/media/upload/images/bingduyufang20210425094029.jpg',
        'https://image.scqckypw.com/media/upload/images/111120180312133951.jpg',
      ],
      // 图片父容器高度
      swiperHeight: 1000,
      // 浏览器宽度
      screenWidth: 0,
    }
  },
  methods: {
    // 通过浏览器宽度（图片宽度）计算高度
    setSize() {
      this.swiperHeight = (400 / 1920) * this.screenWidth
    },
  },
  mounted() {
    // 首次加载时需要调用一次
    this.screenWidth = window.innerWidth
    this.setSize()
    // 当窗口大小改变时，调用一次
    window.onresize = () => {
      this.screenWidth = window.innerWidth
      this.setSize()
    }
  },
}
</script>

<style scoped>
.el-carousel {
  height: 100%;
}
</style>
