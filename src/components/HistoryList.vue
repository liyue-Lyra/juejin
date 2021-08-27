<template>
	<div class="ArticleList">
		<div class="topBlank">浏览历史
		</div>
		<div class="blank"></div>
		<div v-for="article in articles" :key="article.article_id">
			<Article :article="article" />
			<hr/>
		</div>

		<div class="bottomBlank">没有更多啦~~~</div>
	</div>
</template>

<script>
import Article from "./Article.vue";
import { getArticleById } from "../fake-api";

export default {
	name: "HistoryList",
	components: {
		Article,
	},
	data() {
		return {
			articleIds: [],
			articles: [],
			articleEnd: false,
			
		};
	},

	activated() {
		this.articleIds = [];
		this.articles = [];
		this.getHistory();
		document.documentElement.scrollTop =  0;
        document.body.scrollTop =  0;
        window.pageYOffset = 0;
	},



	methods: {
		getHistory() {
			let Storage = [];
			const reg = new RegExp(/[0-9]{19}/); //key是19位的文章id
			for (var i = 0; i < localStorage.length; i++) {
				var key = localStorage.key(i);
				if (reg.test(key)) {
					Storage.push({
						articleId: key,
						time: localStorage.getItem(key),
					});
				}
			}

			function compare(property) {
				return function(a, b) {
					var value1 = a[property];
					var value2 = b[property];
					return value1 - value2;
				};
			}
			const myStorage = Storage.sort(compare("time"));
			for ( i = 0; i < myStorage.length; i++) {
				this.articles.unshift;
				getArticleById(myStorage[i].articleId).then(
					(result) => {
						this.articles.unshift(result.data.article);
					},
					(err) => {
						console.log(err);
					}
				);
			}
		},


	},

};
</script>

<style scoped>
.HistoryList {
	width: 100%;
	background-color: white;
	z-index: 0;
	position: relative;
	top: 48px;
}

.topBlank {
	width: 100%;
	height: 50px;
	line-height: 50px;
	font-weight: bold;
	font-size: 18px;
	color: #1d2129;
	text-align: center;
	z-index: 10;
	position: fixed;
	top: 0;
	background-color: white;
	border-bottom: 1px solid #d0d2d4;
}
.blank{
	height: 50px;
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
