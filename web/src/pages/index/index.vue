<template>
  <div class="index">
    <!-- 第一部分 查询 公告 轮播图 -->
    <div class="index-container">
      <HomeInquire></HomeInquire>
      <Swiper></Swiper>
      <HomeNotice></HomeNotice>
    </div>
    <!-- 流程图 -->
    <div class="process">
      <HomeProcess></HomeProcess>
    </div>
    <!-- 热门线路 和 车站介绍 -->
    <div class="footer-container">
      <!-- 车站介绍 -->
      <div class="footer-station">
        <StationBox></StationBox>
      </div>
      <!-- 热门线路 -->
      <div class="footer-hotLine">
        <Hotline></Hotline>
      </div>
    </div>
  </div>
</template>

<script>
import Hotline from './components/Station-Hotline/hotline.vue'
import StationBox from './components/Station-Hotline/stationBox.vue'
import HomeProcess from './components/home-process.vue'
import HomeNotice from './components/home-notice.vue'
import HomeInquire from './components/home-inquire.vue'
import Swiper from './components/home-swiper.vue'

export default {
  name: 'index',
  data() {
    return {}
  },
  components: {
    Hotline,
    StationBox,
    HomeProcess,
    HomeNotice,
    HomeInquire,
    Swiper,
  },
}
</script>

<style scoped>
.index-container {
  display: flex;
  justify-content: space-between;
  max-height: 300px;
  margin: 3vh 0 3vh 0;
}
.process {
  margin: 5vh 0 2vh 0;
}
.HomeNotice {
  width: 25vw;
}
.HomeSwiper {
  width: 36vw;
}
.HomeInquire {
  width: 25vw;
}
.footer-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 5vh 0 5vh 0;
  height: 67vh;
  overflow: hidden;
}
.footer-station,
.footer-hotLine {
  width: 48%;
}
</style>
