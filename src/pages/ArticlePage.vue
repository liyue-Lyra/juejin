<template>
	<div class="articlePage"  >	
		<ArticleMain :articleId='$route.params.articleId'/>
		<hr />
		<ArticleCommentList :articleId='$route.params.articleId'/>
		<ToTop/>
	</div>
</template>

<script>
import ArticleMain from "../components/ArticleMain.vue";
import ArticleCommentList from "../components/ArticleCommentList.vue";
import ToTop from "../components/ToTop.vue";
import { getArticleById } from "../fake-api";

export default {
	name: "ArticlePage",
	components: {
		ArticleMain,
		ArticleCommentList,
		ToTop
	},
	data() {
		return {
			articleId: this.$route.params.articleId,  
		};
	},

	mounted(){
		getArticleById(this.articleId).then((result) => {
				document.title = result.data.article.article_info.title;
			},
			err => {console.log(err);}
		);

		document.documentElement.scrollTop =  0;
        document.body.scrollTop =  0;
        window.pageYOffset = 0;
	}

};
</script>

<style scoped>
	.articlePage{
		width:auto;
		overflow: hidden;
	}

	hr{
	width: 90%;
	margin: 0 auto;	
	border: none;
	height: 1px;
	background: rgb(238, 230, 230);
	}
</style>
