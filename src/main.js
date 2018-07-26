import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
// import mock from 'mock/mock.js';
import Vuex from 'vuex';
import store from './vuex/store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import "babel-polyfill";

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.prototype.$axios = axios;

router.beforeEach((
    to,
    from,
    next
) => {
    // 这里的meta就是我们刚刚在路由里面配置的meta
    if (to.meta.requireAuth) {
        // 下面这个判断是自行实现到底是否有没有登录
        if (store.getters.isLogin) {
            // 登录就继续
            next();
        } else {
            // 没有登录跳转到登录页面，登录成功之后再返回到之前请求的页面
            store.dispatch('checkLogin').then((res) => {
                if (res.state === 'success') {
                    next();
                } else {
                    next({
                        path: '/login'
                    });
                }
            });
        }
    } else {
        // 不需要登录的，可以继续访问
        next();
    };
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
