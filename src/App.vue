<template>
	<div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

<script>
import "/public/assets/reset.css";

export default {
    name: "App",
    components: {

    },

    created(){
      if(this.$route.path === '/home/history'){
          this.$router.replace('/home/articleListPage')
      } 
    },

};
</script>

