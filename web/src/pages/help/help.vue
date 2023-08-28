<template>
  <div class="help">
    <div class="third-header">
      <helpheader></helpheader>
    </div>
  </div>
</template>
<script>
import helpheader from '../../components/content/help-Header/help-header.vue'

export default {
  name: 'help',
  data() {
    return {}
  },
  components: {
    helpheader,
  },
}
</script>
<style scoped>
.help{
  margin-top: 3vh;
}
</style>
