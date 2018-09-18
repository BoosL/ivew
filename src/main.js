import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';

import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';


import global_ from '../src/config/global';
import VDistpicker from 'v-distpicker';

Vue.component('v-distpicker', VDistpicker);
Vue.prototype.GLOBAL = global_;

import Vuex from 'vuex';

Vue.use(Vuex);

Vue.use(VueRouter);

Vue.use(iView);


// 路由配置
const RouterConfig = {
    //mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});


new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
