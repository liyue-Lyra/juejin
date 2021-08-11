<template>
	<div class="main-comment-box">

		<div class="user-pic">
			<img :src="user_info.avatar_large" alt="用户头像" />
		</div>

		<div class="comment-rightbox">
			<div class="user-info-box">
				<ul class="user-info">
					<li class="user-name">{{user_info.user_name}}</li>
					&nbsp;
					<li class="user-level" v-if="user_info.level">
						<img :src="showLevel(user_info.level)" alt="等级图标">
					</li>
					&nbsp;
					<li class="user-tag">{{user_info.job_title}}</li>
				</ul>
			</div>

			<div class="content-box">
				<span class="content"
					>{{comment_info.comment_content}}</span>
			</div>

			<div class="comment-time">{{changeTime(comment_info.ctime)}}</div>
			<div class="like-reply">
				<ul>
					<li class="reply">
						<a href="javascript:;">
							<i class="iconfont icon-icon-pinglun"></i>
							回复
						</a>
					</li>
					<li class="like">
						<a href="javascript:;">
							<i class="iconfont icon-dianzan"></i>
							{{changeCount(comment_info.digg_count)}}
						</a>
						</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import {changeTime} from "../../static/time"
export default {
    name: "MainComment",
	props:{
		comment_info:{
			type:Object
		},
		user_info:{
			type:Object
		},
	},
	components: {},
	data() {
		return {

		};
	},

	methods: {
		changeTime,
		changeCount(count){
			if(count>=10000)
			return (count/10000).toFixed(1)+'w'
			else if(count===0) return ''
			else return count
		},
		showLevel(level){
			return require('/public/assets/pics/LV'+level+'.svg')
		}
	},
};
</script>

<style scoped>
.main-comment-box {
	display: flex;
	margin-top: 20px;
}

.user-info {
	display: flex;
}

.user-info-box {
	margin: 10px;
	width: 300px;
	height: 20px;
}

.user-name,
.user-tag {
	line-height: 20px;
	max-width: 130px;
	display: -webkit-box;
	overflow: hidden;
	text-overflow: ellipsis;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	font-size: 13px;
}
.user-name{
	color: #333333;
}

.user-tag{
	color: #8a9aa9;
}

.user-level {
	line-height: 20px;
	width: 30px;
	text-align: center;
}

.user-pic,
.comment-rightbox {
	float: left;
	margin-bottom: 6px;
}

.user-pic > img {
	width: 40px;
	height: 40px;
	border-radius: 20px;
	margin-left:25px;
}

.content-box {
	margin: 15px 10px;
	font-size: 14px;
	line-height: 1.8;
	width: 84%;
}

.content {
	margin: 0px;
	/* overflow: hidden; */
	text-align: justify;
	font-size: 13px;
    color: #505050;
}

.comment-time {
	float: left;
	font-size: 12px;
	margin-left: 10px;
	color: #8a9aa9;
}

.like-reply {
	text-align: center;
	background-color: white;
	float: right;
	font-size: 12px;
	margin-right: 30px;
}

.like,
.reply {
	float: right;
	width: 60px;
}
.like>a, .reply>a{
	text-decoration: none;
	color: #8a9aa9;
}
</style>
