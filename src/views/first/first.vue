<template>
  <div class="first">
    <!-- 第一部分 查询 公告 轮播图 -->
    <div class="first-container">
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
import Hotline from '../../components/content/Station-Hotline/hotline'
import StationBox from '../../components/content/Station-Hotline/stationBox'
import HomeProcess from '../../components/content/Home-Process/home-process'
import HomeNotice from '../../components/content/Home-Notice/home-notice'
import HomeInquire from '../../components/content/Home-Inquire/home-inquire'
import Swiper from '@/components/content/Home-Swiper/home-swiper.vue'

export default {
  name: 'first',
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
.first-container {
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
.footer-hotLine{
  width: 48%;
}

</style>
