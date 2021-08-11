<template>
    <div class="ArticleListPage">
        <Topbar/>
        <SubSort/>
        <ArticleList/>
        <ToTop/>
    </div>

</template>

<script>
import Topbar from '../components/Topbar.vue'
import SubSort from '../components/SubSort.vue'
import ArticleList from '../components/ArticleList.vue'
import ToTop from '../components/ToTop.vue'
import {getScrollTop} from "../../static/screen"
export default {
    name: "ArticleListPage",
    components: {
        Topbar,
        SubSort,
        ArticleList,
        ToTop,
    },
    data() {
        return {
            scrollY : 0,
        };
    },


    activated(){
        document.documentElement.scrollTop = this.scrollY || 0
        document.body.scrollTop = this.scrollY || 0
        window.pageYOffset = this.scrollY || 0
    },
    beforeRouteLeave (to, from, next) {
        this.scrollY = getScrollTop()
        next()
    },

};
</script>

<style scoped>
    .articleListPage {
        width: auto;
        height: 100%;
        overflow: hidden;
    }
</style>