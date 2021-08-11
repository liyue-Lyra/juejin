<template>
		<ul class="TopbarList">
			<li
				v-for="category in categories"
				:key="category.category_id"
				
				@click="
					getSubSort(category),
						getNewArticles(category),
						changeActive(category)
				"
			>
				<a href="javascript:;" :class="category.category_id === activeId ? 'active' : ''">{{ category.category_name }}</a>
			</li>
		</ul>

</template>

<script>
import { getCategories } from "../fake-api";

export default {
	name: "Topbar",
	components: {},
	data() {
		return {
			categories: [],
			bottomState: "hot",
			activeId: 0,
		};
	},

	created() {
		this.FirstSort();
	},
	
	activated() {
		this.$bus.$on(
			"changeBottomState",
			(bottomState) => (this.bottomState = bottomState)
		);
	},

	deactivated() {
		this.$bus.$off("changeBottomState");
	},

	methods: {
		FirstSort() {
			getCategories().then((result) => {
					this.categories = result.data.categories;
				},
				err => {console.log(err);}
			);
		},

		getSubSort(category) {
			this.$bus.$emit("updateSubSort", category.children);
		},

		getNewArticles(category) {
			this.$bus.$emit(
				"updateArticleListData",
				category.category_id,
				this.bottomState,
				0,
				15
			);
		},
		changeActive(category) {
			this.activeId = category.category_id;
		},
	},
};
</script>

<style scoped>


.TopbarList {
	width: 100%;
	height: 46px;
	line-height: 46px;
	display: flex;
	background-color: white;
	position: fixed;
	top: 0;
	z-index: 9;
	overflow-x: scroll;
    border-bottom: 1px solid #d0d2d4;
}

.TopbarList > li {
	height: 100%;
	width: 95px;
	text-align: center;
	align-items: center;
    justify-content: center;
}

.TopbarList > li > a {
	text-decoration: none;
	font-size: 12px;
    color: #71777c;
}
.TopbarList > li>a.active {
	color: #007fff;
}
</style>
