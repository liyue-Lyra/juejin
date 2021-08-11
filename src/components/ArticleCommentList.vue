<template>
	<div class="articleCommentList">
		<template v-for="(comment, comment_id) in comments">
			<Comment :comment="comment" :key="comment_id" />
		</template>
		<div class="commentBottom" v-if="commentEnd">到底啦~</div>
	</div>
</template>

<script>
import Comment from "./Comment.vue";
import { getCommentsByArticleId } from "../fake-api";
import {
	getScrollHeight,
	getScrollTop,
	getWindowHeight,
} from "../../static/screen";

export default {
	name: "ArticleCommentList",
	props: ["articleId"],
	components: { Comment },
	data() {
		return {
			comments: [],
			commentEnd: false,
			offset: 0,
			limit: 10,
		};
	},
	created() {
		this.getComments();
	},

	mounted() {
		//监听滚动
		window.addEventListener("scroll", this.loadComment);
	},

	destroyed() {
		window.removeEventListener("scroll", this.loadComment);
	},

	methods: {
		getComments() {
			getCommentsByArticleId(
				this.articleId,
				this.offset,
				this.limit
			).then((result) => {
					this.offset += result.data.comments.length;
					this.comments.push(...result.data.comments);
					this.commentEnd = !result.has_more;
				},
				err => {console.log(err);}
				);
		},

		loadComment() {
			if (
				getScrollHeight() - (getScrollTop() + getWindowHeight()) <= 50 
                 && !this.commentEnd
			) {
				this.getComments();
			}
		},
	},
};
</script>

<style scoped>
.commentBottom {
	text-align: center;
	height: 30px;
	line-height: 30px;
	color: #8a9aa9;
}
</style>
