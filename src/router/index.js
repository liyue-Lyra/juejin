// 该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router";
//引入组件
import ArticlePage from "../pages/ArticlePage.vue";
import ArticleListPage from "../pages/ArticleListPage.vue";
import ArticleHistory from "../pages/ArticleHistory.vue";
import Home from "../pages/Home.vue";


//创建并暴露一个路由器
export default new VueRouter({
	mode: "history",
	base: "/",
	routes: [
		{
			//重定向
			path: "/",
			redirect: "/home/articleListPage",
		},
		{
			name:'articlePage',
			path: "/articlePage/:articleId",
			component: ArticlePage,
		},

		{
			name:'home',
			path: "/home",
			component: Home,
			redirect: "/home/articleListPage",
			children:[
				{
					name:'articleListPage',
					path: "articleListPage",
					component: ArticleListPage,
					meta: { keepAlive: true},
				},
				{
					name:'historyPage',
					path: "history",
					component: ArticleHistory,
					meta: { keepAlive: true},
				},
			]
		},

		
	],

	
});
