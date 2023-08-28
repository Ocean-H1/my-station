<template>
  <div id="app">
    <Home></Home>
  </div>
</template>

<script>
import Home from '@/components/Home.vue'
export default {
  name: 'app',
  data() {
    return {}
  },
  components: {
    Home,
  },
  created() {
    // 在页面刷新的时候将vuex里的数据保存到sessionStorage中
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('dataStore', JSON.stringify(this.$store.state))
    })
    // 在页面加载的时候读取sessionStorage中的数据
    sessionStorage.getItem('dataStore') &&
      this.$store.replaceState(
        Object.assign(
          this.$store.state,
          JSON.parse(sessionStorage.getItem('dataStore'))
        )
      )
  },
}
</script>

<style></style>
