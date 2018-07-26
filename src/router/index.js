import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [{
	path: '/login',
	component: resolve => require(['../components/page/Login.vue'], resolve)
}, {
	path: '/',
	component: resolve => require(['../components/common/Home.vue'], resolve),
	children: [{
		path: '/',
		meta: {
			requireAuth: true,
		},
		component: resolve => require(['../components/page/Welcome.vue'],
			resolve)
	}, {
		path: '/newsList',
		meta: {
			requireAuth: true,
		},
		component: resolve => require(['../components/page/NewsList.vue'],
			resolve) // 文章列表
	}, {
		path: '/images',
		meta: {
			requireAuth: true,
		},
		component: resolve => require(['../components/page/ImgTable.vue'],
			resolve) // 图片新闻列表
	}, {
		path: '/editImg',
		meta: {
			requireAuth: true,
		},
		component: resolve => require(['../components/page/EditImg.vue'],
			resolve) // 编辑图片新闻
	}, {
		path: '/news',
		meta: {
			requireAuth: true,
		},
		component: resolve => require(['../components/page/News.vue'], resolve) // 新闻页面
	}, {
		path: '/newsAudit',
		meta: {
			requireAuth: true,
		},
		component: resolve => require(['../components/page/NewsAudit.vue'],
			resolve) // 文章审阅
	}, {
		path: '/links',
		meta: {
			requireAuth: true,
		},
		component: resolve => require(['../components/page/Links.vue'],
			resolve) // 友情链接
	}, {
	    path: '/editLink',
	    meta: {
	        requireAuth: true,
	    },
	    component: resolve => require(['../components/page/EditLink.vue'],
	        resolve) // 编辑友情链接
	}, {
		path: '/users',
		meta: {
			requireAuth: true,
		},
		component: resolve => require(['../components/page/Users.vue'],
			resolve) // 用户列表
	}, {
		path: '/addUser',
		meta: {
			requireAuth: true,
		},
		component: resolve => require(['../components/page/AddUser.vue'],
			resolve) // 新增用户
	}, {
		path: '/person',
		meta: {
			requireAuth: true,
		},
		component: resolve => require(['../components/page/Person.vue'],
			resolve) // 账号信息
	}]
}];
const router = new Router({
	routes
});

export default router;
