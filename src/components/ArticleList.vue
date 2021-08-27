<template>
	<div class="ArticleList">
		<transition name="topBlank" >
			<div class="blank" v-if="isShow"></div>
		</transition>

		<div v-for="(article, article_id) in articles" :key="article_id">
			<Article :article="article" />
			<hr />
		</div>

		<div class="bottomBlank" v-if="!articleEnd">加载中，请稍等~~~</div>
		<div class="bottomBlank" v-if="articleEnd">到底啦~~~</div>
	</div>
</template>

<script>
import Article from "./Article.vue";
import { getArticles } from "../fake-api";
import {
	getScrollHeight,
	getScrollTop,
	getWindowHeight,
} from "../../static/screen";
export default {
	name: "ArticleList",
	components: {
		Article,
	},
	data() {
		return {
			articles: [],
			isShow: false,
			categoryId: 0,
			sortBy: "hot",
			offset: 0,
			limit: 15,
			articleEnd: false,
			showBottom:true,
			isLoad:true
		};
	},

	created() {
		this.addArticles();
	},

	activated() {
		//更新文章列表
		this.$bus.$on(
			"updateArticleListData",
			(categoryId, sortBy, offset, limit) => {
				this.categoryId = categoryId;
				if (sortBy !== "") this.sortBy = sortBy;
				this.offset = offset;
				this.limit = limit;
				this.$set(this.$data,"articles",[]);
				this.addArticles();
				document.documentElement.scrollTop = 0;
				document.body.scrollTop = 0;
				window.pageYOffset = 0;
				
			}
			
		);

		//文章列表排序
		this.$bus.$on("articleSortBy", (bottomState) => {
			this.sortBy = bottomState;
			this.offset = 0;
			this.$set(this.$data,"articles",[]);
			this.addArticles();
			document.documentElement.scrollTop =  0;
			document.body.scrollTop =  0;
			window.pageYOffset = 0;
		});

		this.$bus.$on("showBlank", isShow => this.isShow = isShow);
		
		//监听滚动
		window.addEventListener("scroll", this.load);
	},

	deactivated() {
		window.removeEventListener("scroll", this.load);
		this.$bus.$off("updateArticleListData");
	},

	destroyed(){
		this.$bus.$off("articleSortBy");
		this.$bus.$off("showBlank");
	},

	methods: {
		addArticles() {
			getArticles(
				this.categoryId,
				this.sortBy,
				this.offset,
				this.limit
			).then((result) => {
					this.offset += result.data.articles.length;
					this.articles.push(...result.data.articles);
					this.articleEnd = !result.has_more;
				},
				err => {console.log(err);}
			);
		},

		//无限滚动加载
		load() {
			if(this.isLoad){
				this.isLoad = false;
			//console.log('Y轴上的滚动距离:',getScrollTop() ,'\n','浏览器视口高度:', getWindowHeight() ,'\n','文档总高度:', getScrollHeight())
				setTimeout(() => {
					if (
						getScrollHeight() - (getScrollTop() + getWindowHeight()) <=
							50 &&
						!this.articleEnd
					) {
						this.addArticles();
					}
					this.isLoad = true;
				}, 500);
			}
		}

	},

};
</script>

<style scoped>
/* 进入的起点、离开的终点 */
.blank.topBlank-enter,
.blank.topBlank-leave-to {
	height: 0px;
}
.blank.topBlank-enter-active,
.blank.topBlank-leave-active {
	transition: height 0.5s linear;
}
/* 进入的终点、离开的起点 */
.blank.topBlank-enter-to,
.blank.topBlank-leave {
	height: 50px;
}

.ArticleList {
	width: 100%;
	background-color: white;
	z-index: 0;
	position: relative;
	top: 48px;
}

.blank {
	width: 100%;
	height: 50px;
	z-index: 10;
}

.bottomBlank {
	width: 100%;
	height: 80px;
	line-height: 20px;
	text-align: center;
	color: #8a9aa9;
}

hr {
	width: 95%;
	border: none;
	height: 1px;
	background: rgb(238, 230, 230);
}
</style>
