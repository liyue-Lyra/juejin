<template>
	<transition name="SubSort" appear>
		<ul class="subSortList" v-if="subSort.length !== 0">
			<li :class="activeId === 0 ? 'active' : ''">
				<a
					href="javascript:;"
					@click="AllSort"
					:class="activeId === 0 ? 'active' : ''"
					>全部
				</a>
			</li>
			
			<li
				v-for="subCategory in subSort"
				:key="subCategory.category_id"
				:class="subCategory.category_id === activeId ? 'active' : ''"
				@click="getNewArticles(subCategory), changeActive(subCategory)">
				<a href="javascript:;" 
					:class="subCategory.category_id === activeId ? 'active' : ''">
					{{ subCategory.category_name }}
				</a>
			</li>
		</ul>

	</transition>
</template>

<script>
//import {backtop} from "../../static/screen";
export default {
	name: "SubSort",
	components: {},
	data() {
		return {
			subSort: [],
			bottomState: "hot",
			activeId: 0,
		};
	},
	activated() {
		this.$bus.$on("updateSubSort", (subSort) => {
			if (subSort) {
				this.subSort = subSort;
				this.$bus.$emit("showBlank", true);
			}
			else {
				this.subSort = [];
				this.$bus.$emit("showBlank", false);
				}
			this.activeId=0;
		}),
			this.$bus.$on("changeBottomState",
				(bottomState) => (this.bottomState = bottomState)
			);
	},
	deactivated(){
		this.$bus.$off("updateSubSort");
	},

	destroyed() {
		this.$bus.$off("changeBottomState");
	},

	methods: {
		AllSort() {
			this.$bus.$emit(
				"updateArticleListData",
				(this.subSort[0].category_id - 1) / 10,
				this.bottomState,
				0,
				15
			);
			this.activeId = 0;
			//this.$bus.$emit("toTop",true);
			//this.backtop()
		},

		getNewArticles(subCategory) {
			this.$bus.$emit(
				"updateArticleListData",
				subCategory.category_id,
				this.bottomState,
				0,
				15
			);
			//this.$bus.$emit("toTop",true);
			//this.backtop()
		},

		changeActive(subCategory) {
			this.activeId = subCategory.category_id;
		},
		//backtop
	},

};
</script>

<style scoped>
/* 进入的起点、离开的终点 */
.subSortList.SubSort-enter,
.subSortList.SubSort-leave-to {
	transform: translateY(-100%);
}
.subSortList.SubSort-enter-active,
.subSortList.SubSort-leave-active {
	transition: 0.5s linear;
}
/* 进入的终点、离开的起点 */
.subSortList.SubSort-enter-to,
.subSortList.SubSort-leave {
	transform: translateY(0);
}

.subSortList {
	width: 100%;
	height: 46px;
	line-height: 46px;
	display: flex;
	position: fixed;
	top: 46px;
	z-index: 8;
	/* float: inline-start; */
	overflow-x: scroll;
    background-color: rgb(235, 235, 235);

}

.subSortList>li{
	justify-content: center;
    align-items: center;
    height: 30px;
	line-height: 30px;
    background-color: #fff;
    border-radius: 15px;
    padding: 0 15px;
	margin: auto 8px;
}

.subSortList > li > a {
	height: 100%;
	width:100%;
	text-align: center;
	font-size: 12px;
	color: #71777c;
	text-decoration: none;
	display: block
}

.subSortList >li.active {
	background-color: #007fff;
}
.subSortList >li>a.active {
	color:white;
}
</style>
