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
import Bottom from '../components/Bottom.vue';
import {getScrollTop} from "../../static/screen";
export default {
    components: {
        Bottom
    },
    data() {
        return {
            showBottom:true,
            scrollValue:0,
			isWatch:true
        };
    },

    activated(){
        window.addEventListener("scroll", this.ShowBottom);
    },
	deactivated() {
		window.removeEventListener("scroll", this.ShowBottom);
	},

    methods:{
        ShowBottom(){
			if(this.isWatch){
				this.isWatch = false;
				setTimeout(()=>{this.scrollValue=getScrollTop();
					this.isWatch = true;
					//console.log('1');
				},500);
			}
		}
    },

    watch: {
		scrollValue(newValue, oldValue) {
			if (this.showBottom && newValue - oldValue > 5 ) {
				this.showBottom = !this.showBottom;
				this.$bus.$emit("showBottom", false);
			} else if (!this.showBottom && (oldValue - newValue > 10 || newValue === 0)) {
				this.$bus.$emit("showBottom", true);
				this.showBottom = !this.showBottom;
			}
		},
	},
};
</script>

<style>
    
</style>