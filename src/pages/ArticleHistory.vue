<template>
    <div class="articleHistory">
        <HistoryList/>
        <ToTop/>
    </div>

</template>

<script>
import HistoryList from '../components/HistoryList.vue';
import ToTop from '../components/ToTop.vue';
export default {
    components: {
        HistoryList,
        ToTop,
    },
    data() {
        return {
        };
    },



};
</script>

<style scoped>
    .articleHistory {
        width: auto;
        height: 100%;
        overflow: hidden;
    }
    
</style>