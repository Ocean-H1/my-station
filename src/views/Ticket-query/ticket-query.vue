<template>
  <div class="ticketquery">
    <!-- 顶部 -->
    <div class="left">
      <div class="top">
        <step></step>
      </div>
      <!-- 导航栏 -->
      <div class="query-header">
        <queryheader></queryheader>
      </div>
    </div>

    <!-- 侧边栏 -->
    <div class="slidebar">
      <slidebar></slidebar>
    </div>
  </div>
</template>

<script>
import step from '../../components/content/query/step.vue'
import queryheader from '../../components/content/query/query-header.vue'
import slidebar from '../../components/content/query/slide.vue'
export default {
  name: 'ticketquery',
  data() {
    return {}
  },
  created: function () {
    this.GetRequest()
  },
  components: {
    step,
    queryheader,
    slidebar,
  },
  methods: {
    GetRequest() {
      window.sessionStorage.setItem(
        'final_region_id',
        this.$route.query.final_region_id
      )
      window.sessionStorage.setItem(
        'start_region_id',
        this.$route.query.start_region_id
      )
      window.sessionStorage.setItem('start_name', this.$route.query.start_name)
      window.sessionStorage.setItem('final_name', this.$route.query.final_name)
      window.sessionStorage.setItem(
        'shuttle_shift_date',
        this.$route.query.shuttle_shift_date
      )
    },
  },
}
</script>
<style scoped>
.ticketquery {
  display: flex;
  overflow: hidden;
}
.left {
  width: 80%;
  display: flex;
  flex-direction: column;
}
.top {
  width: 100%;
  flex: 1;
}
.query-header {
  width: 100%;
  flex: 5;
  margin-top: 1rem;
}
.slidebar {
  margin-top: 1.25rem;
  position: relative;
  width: 23%;
  margin-left: 10px;
  /* left: 77rem;
  top: 8.5rem; */
}
</style>