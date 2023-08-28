<template>
  <div class="Map">
    <!-- 放置地图的容器 -->
    <div id="container"></div>
  </div>
</template>


<script>
export default {
  name: 'Map',
  mounted() {
    this.baiduMap()
  },
  methods: {
    baiduMap() {
      // 创建地图实例
      let map = new BMapGL.Map('container')
      // 定义中心坐标信息
      let x = this.$store.state.activeStation.longitude
      let y = this.$store.state.activeStation.latitude
      let address = this.$store.state.activeStation.station_address
      let title = this.$store.state.activeStation.station_name

      // 创建点坐标(GPS)
      let gpsPoint = new BMapGL.Point(x, y)

      // 初始化地图，设置中心点坐标和地图级别
      map.centerAndZoom(gpsPoint, 16)
      //开启鼠标滚轮缩放
      map.enableScrollWheelZoom(true)

      let scaleCtrl = new BMapGL.ScaleControl() // 添加比例尺控件
      map.addControl(scaleCtrl)
      let zoomCtrl = new BMapGL.ZoomControl() // 添加缩放控件
      map.addControl(zoomCtrl)
      let cityCtrl = new BMapGL.CityListControl() // 添加城市列表控件
      map.addControl(cityCtrl)

      // 转换GPS为BD坐标
      let translateCallback = function (data) {
        if (data.status === 0) {
          let marker = new BMapGL.Marker(data.points[0])
          map.addOverlay(marker)
          map.setCenter(data.points[0])
          var opts = {
            width: 300, // 信息窗口宽度
            height: 120, // 信息窗口高度
            title, // 信息窗口标题
          }
          var infoWindow = new BMapGL.InfoWindow(address, opts) // 创建信息窗口对象
          map.openInfoWindow(infoWindow, data.points[0]) //开启信息窗口
        }
      }
      setTimeout(() => {
        let convertor = new BMapGL.Convertor()
        let pointArr = []

        pointArr.push(gpsPoint)
        convertor.translate(pointArr, 3, 5, translateCallback)
      }, 200)
    },
  },
}
</script>

<style scoped>
.Map {
  width: 90%;
}
#container {
  height: 80vh;
  width: 100%;
}
</style>
