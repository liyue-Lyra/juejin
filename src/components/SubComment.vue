<template>
    <div class="sub-comment-box">
        
        <hr class="sub-comment-line" />
        <div class="sub-user-pic">
            <img :src="reply.user_info.avatar_large" alt="二级用户头像"/>
        </div>

        <div class="sub-comment-rightbox">
            <div class="sub-user-info-box">
                <ul class="sub-user-info">
                    <li class="sub-user-name">{{reply.user_info.user_name}}</li>&nbsp;
                    <li class="sub-user-level" v-if="reply.user_info.level">
						<img :src="showLevel(reply.user_info.level)" alt="等级图标">
                    </li>&nbsp;
                    <li class="sub-user-tag">{{reply.user_info.job_title}}</li>
                </ul>
            </div>

            <div class="sub-content-box">
                <span class="sub-content">{{reply.reply_info.reply_content}}</span>
            </div>

            <div class="sub-comment-time">{{changeTime(reply.reply_info.ctime)}}</div>
        </div>
                
    </div>

</template>

<script>
import {changeTime} from "../../static/time"
export default {
    name: "SubComment",
    components: {},
    props: {
		reply: {
			type: Object,
		},
	},
    data() {
        return {};
    },

    mounted() {},
    methods: {
        changeTime,
        showLevel(level){
			return require('/public/assets/pics/LV'+level+'.svg')
		}
    }
};
</script>

<style scoped>
.sub-comment-line {
	width: 76%;
	margin-bottom: 15px;
	margin-left: 17%;
	border: none;
	height: 1px;
	background: rgb(238, 230, 230);
}

.sub-comment-box:after{ /* 解决高度塌陷 */
        clear: both;
        content: '';
        display: block;
        height: 0;
    }


.sub-user-info{
    display: flex;
    width: 65%;
}

.sub-user-info-box{
    margin: 10px 0;
    width: 300px;
    height: 20px;
    
    
}

.sub-user-name,.sub-user-tag{
    line-height: 20px;
    max-width: 130px;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    font-size: 13px;
}

.sub-user-name{
	color: #333333;
}

.sub-user-tag{
	color: #8a9aa9;
}

.sub-user-level{
    line-height: 20px;
    font-size: 12px;
    width: 30px;
    text-align: center;
}


.sub-user-pic,.sub-comment-rightbox{
    float: left;
}

.sub-comment-rightbox{
    margin-left: 10px;
    width: 63%;
}


.sub-user-pic>img{
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-left: 65px;
}


.sub-content-box{
    font-size: 12px;
    line-height: 1.8;
}

.sub-content{
    text-align: justify;
    font-size: 13px;
    color: #505050;
}

.sub-comment-time{
    font-size: 12px;
    margin: 10px 0;
    color: #8a9aa9;
}



</style>