<template>
	<div class="toTop" v-if="isShow" @click="backtop">
		<i class="iconfont icon-jiantoudown"></i>
	</div>
</template>

<script>
import { getScrollTop ,backtop} from "../../static/screen";
export default {
    name: "ToTop",
	data() {
		return {
			isShow: false,
			isTop: false,
			isWatch:true
		};
	},

	mounted() {
		window.addEventListener("scroll", this.showBtn);
		this.$bus.$on("toTop", (value) => {if(value) this.backtop()});
	},

	destroyed() {
		this.$bus.$off("toTop");
		window.removeEventListener("scroll", this.showBtn);
	},

	methods: {
		// 显示回到顶部按钮
		showBtn() {
			if(this.isWatch){
				this.isWatch = false;
				setTimeout(() => {
					let scrollTop = getScrollTop();
					if (scrollTop <= 0) {
						this.isTop = true;
					} else {
						this.isTop = false;
					}

					if (scrollTop > 300) {
						this.isShow = true;
					} else {
						this.isShow = false;
					}
					this.isWatch = true;	
				}, 500);
			}
		},

		backtop
		
	},
};
</script>

<style scoped>
.toTop {
	width: 40px;
	height: 40px;
	line-height: 40px;
	border-radius: 20px;
	z-index: 10;
	position: fixed;
	bottom: 65px;
	right: 20px;
	background-color: white;
	box-shadow: 2px 2px 2px rgb(221, 216, 214);
	
}

.icon-jiantoudown{
	margin-left: 12px;
	color: rgb(165, 160, 160);
}

</style>
