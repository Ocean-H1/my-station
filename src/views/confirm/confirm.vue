<template>
    <div class="confirm">
        <div class="step">
            <step></step>
        </div>
        <div class="box">
         <box></box>
        </div>
        <div class="tabbar">
         <Tabbar></Tabbar>
        </div>
    </div>
</template>
<script>
import step from '../../components/content/query/step.vue'
import  box from '../../components/content/query/confirmtop.vue'
import Tabbar from '../../components/content/query/confirmbottom.vue'
import Step from '../../components/content/query/step.vue'
export default {
    name:'confirm',
    components:{
        box,Tabbar,
        Step
    }
}
</script>
<style scoped>
.step{
    width:100%;
}
</style>