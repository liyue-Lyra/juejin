<template>
	<div class="article-main">
		<div class="article-topbar">
			<div class="author">
				<div class="author-pic">
					<img :src="author_user_info.avatar_large" alt="用户头像" />
				</div>

				<ul class="author-info">
					<ul class="line1">
						<li class="author-name">
							{{ author_user_info.user_name }}
						</li>
						&nbsp;
						<li class="author-level" v-if="author_user_info.level">
							<img :src="showLevel(author_user_info.level)" alt="等级图标">
						</li>
					</ul>

					<ul class="line2">
						<li
							class="date"
							v-text="
								new Date(parseInt(article_info.ctime) * 1000)
									.toLocaleString()
									.split(' ')[0]
									.replace('/', '年')
									.replace('/', '月') + '日'
							"
						></li>
						<li class="viewed">阅读&nbsp;{{ article_info.view_count }}</li>
					</ul>
				</ul>
			</div>
		</div>
		<hr />
		<div class="article-pic">
			<img :src="this.article_info.cover_image" alt="文章头图" />
		</div>

		<h1 class="title">{{ article_info.title }}</h1>

		<div class="article-content" v-html="article_content"></div>

	</div>
</template>

<script>
import { getArticleById } from "../fake-api";
export default {
	name: "ArticleMain",
	props: ["articleId"],
	components: {},
	data() {
		return {
			article: {
				type: Object,
			},
			article_info: {
				type: Object,
			},
			author_user_info: {
				type: Object,
			},
			article_content: "",
		};
	},
	mounted() {
		getArticleById(this.articleId).then((result) => {
				this.article_info = result.data.article.article_info;
				this.author_user_info = result.data.article.author_user_info;
				this.article_content = result.data.article.article_content;
			},
			err => {console.log(err);}
		);


	},
	methods: {
		showLevel(level){
			return require('/public/assets/pics/LV'+level+'.svg')
		}
	},

};
</script>

<style scoped>
.article-topbar {
	width: 100%;
	height: 50px;
	background-color: #fff;
	margin-top: 10px;
}

.author-pic {
	width: 40px;
	height: 40px;
	margin-left: 20px;
}

.line1,
.line2,
.author {
	display: flex;
}

.line1 > li,
.line2 > li {
	float: left;
}

.author-pic,
.author-info {
	float: left;
	margin-top: 10px;
	
}

.author-pic > img {
	width: 40px;
	height: 40px;
	border-radius: 20px;
}

.author-info {
	margin-left: 15px;
}

.author-name{
	font-size: 16px;
    font-weight: 700;
    color: #333;
}

.line2 {
	padding-top: 10px;
	color: #86909c;
	font-size: 13px;
}

.viewed{
    margin-left: 10px;
}
.article-pic{
    width: 90%;
    margin: 5px auto;
}
.article-pic >img {
	width: 100%;
}

.title {
	width: 90%;
	height: auto;
	background-color: white;
	font-weight: bold;
	color: black;
	margin: 25px auto 15px;
	text-decoration: none;
	line-height: 1.5;
	font-size: 24px;
	text-align: center;
}

.article-content{
    width: 85%;
    margin: 0 auto;
    
}

hr{
    width: 91%;
    margin: 10px auto;
	border: none;
	height: 1px;
	background: rgb(238, 230, 230);	
}

</style>
