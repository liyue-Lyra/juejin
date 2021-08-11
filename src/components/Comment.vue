<template>
	<div class="comment">
		<MainComment :comment_info="this.comment.comment_info" :user_info="this.comment.user_info"/>
		<div class="sub-comment-list" v-for="reply in this.comment.reply_infos" :key="reply.reply_id">
			<SubComment :reply="reply"/>
		</div>
		<hr />
	</div>
</template>

<script>
import MainComment from "./MainComment.vue";
import SubComment from "./SubComment.vue";

export default {
	name: "Comment",
	props: {
		comment: {
			type: Object,
		},
	},
	components: {
		MainComment,
		SubComment,
	},

	data() {
		return {};
	},

};
</script>

<style scoped>
.sub-comment-list {
	margin-top: 10px;
	height: auto;
}



hr {
	width: 92%;
	margin: 15px auto 5px;
	border: none;
	height: 1px;
	background: rgb(238, 230, 230);
}
</style>
