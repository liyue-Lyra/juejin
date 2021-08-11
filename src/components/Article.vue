<template>
	<div class="Article" @click="goToArticle(article.article_id),addHistory(article.article_id)">
		<div class="article-top">
			<ul class="user-date">
				<li class="user">{{ article.author_user_info.user_name }}</li>
				<li class="line"><i class="iconfont icon-anjianfengexian"></i></li>
				<li class="date">{{ changeTime(article.article_info.ctime)}}</li>
			</ul>
		</div>
		<div class="article-main">
			<div class="main-left">
				<a class="title" href="javascript:;">{{
					article.article_info.title
				}}</a>
				<a href="javascript:;" class="description">
					<p>{{ article.article_info.brief_content }}</p>
				</a>
			</div>
			<div class="main-right">
				<img :src="article.article_info.cover_image" alt="图片" />
			</div>
		</div>

		<div class="article-bottom">
			<ul class="detail">
				<li class="viewed">
					<i class="iconfont icon-yanjing"></i>
					{{changeCount(article.article_info.view_count,'0')}}
				</li>
				<li class="like">
					<i class="iconfont icon-dianzan"></i>
					{{ changeCount(article.article_info.digg_count,"点赞")}}
				</li>
				<li class="comment">
					<i class="iconfont icon-icon-pinglun"></i>
					{{ changeCount(article.article_info.comment_count,"评论")}}
				</li>
				<li class="techSort">
					{{article.category_info.first_category_name}}&nbsp;&nbsp;&nbsp;&nbsp;
					{{article.category_info.second_category_name}}&nbsp;
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import {changeTime} from "../../static/time"
export default {
	name: "Article",
	components: {},

	data() {
		return {};
	},

	props: {
		article: {
			type: Object,
		}
	},


	methods: {
		goToArticle(articleId) {
            this.$router.push({name: 'articlePage', params: { articleId: articleId, title:this.article.article_info.title}})
		},
		
		changeTime,

		changeCount(count,content){
			if(count>=10000)
			return (count/10000).toFixed(1)+'w'
			else if(count===0) return content
			else return count
		},

		addHistory(article_id){
			localStorage.setItem(article_id,Number(new Date()))
			//console.log('add',article_id)
		}

	},
};
</script>

<style scoped>
/* Article */

.Article {
	width: 95%;
	height: 140px;
	margin: 0 auto;
}

.article-main {
	display: flex;
}

.title {
	width: 100%;
	height: 24px;
	line-height: 24px;
	background-color: white;
	font-weight: bold;
	font-size: 16px;
	color: #1d2129;
	margin-top: 5px;
	margin-bottom: 5px;
	display: -webkit-box;
	overflow: hidden;
	text-overflow: ellipsis;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	text-decoration: none;
}

.description {
	color: #86909c;
	font-size: 13px;
	line-height: 22px;
	word-break: break-all;
	display: -webkit-box;
	overflow: hidden;
	text-overflow: ellipsis;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	background-color: white;
	text-decoration: none;
}



.user-date,
.detail {
	width: 100%;
	height: 30px;
	display: block;
	list-style: none;
	margin-top: 3px;
	font-size: 13px !important;
	color: #4e5969;
}

.user,
.line,
.date {
	max-width: 40%;
	height: 30px;
	line-height: 30px;
	float: left;
	flex: initial;
	display: inline;
	background-color: white;
	text-align: center;
	color: #86909c;
}



.line {
	width: 5%;
}

.icon-anjianfengexian{
	font-size: 20px;
	color: rgb(238, 230, 230);
}
.user,
.viewed {
	margin-left: 5px;
	font-size: 13px;
}

.user{
	color: #4e5969;
	margin-left: 10px;
}

.viewed,
.like,
.comment,
.techSort {
	width: 17%;
	height: 30px;
	line-height: 30px;
	float: left;
	flex: initial;
	display: inline;
	background-color: white;
	text-align: center;
}

.viewed{
	width: 21%;
}

.techSort {
	margin-left: 22px;
	padding-right: 5px;
	width: 34%;
	text-align: right;
	color: #86909c;
}

.main-left {
	float: left;
	width: 58%;
	margin-left: 10px;
	height: 36px;
}

.main-right {
	float: left;
	width: 34%;
	height: 80px;
	padding-left: 10px;
}

.main-right > img {
	width: 100%;
	height: 100%;
	/* width: auto;
	height: auto; */
	float: left;
	background-color: white;
	/* margin-left: 10px; */
	margin: 0 auto;
	overflow: hidden;
	/* flex-shrink: 0; */
}

.icon-yanjing{
	font-size: 11px;
	margin: auto 0;
}

 .icon-dianzan, .icon-icon-pinglun{
	font-size: 14px;
}

</style>
