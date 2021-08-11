<template>
    <div>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
            <Bottom/>
        
        
    </div>

</template>

<script>
import Bottom from '../components/Bottom.vue'
export default {
    components: {
        Bottom
    },
    data() {
        return {};
    },

};
</script>

<style>
    
</style>