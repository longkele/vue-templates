/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';
import vuebus from '@/utils/event-bus';

const VueRouterPush = Router.prototype.push;
Vue.use(Router);
Router.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err);
}

var router = new Router({
    // base: '/mboxcms/page/index/',
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'material',
            redirect: '/material/content',
            component: () => import('@/views/material/index'),
            children: [
                {
                    path: '/material/content',
                    name: 'materialContent',
                    component: () => import('@/views/material/content')
                }
            ]
        },
        {
            path: '/formcreate',
            name: 'formcreate',
            component: () => import('@/views/formCreate/index')
        },
    ]
})

router.beforeEach((to, from, next) => {
    // 跳转到的路由等于当前路由时（可能参数不一样），禁止跳转；
    if (to.name === from.name && from.name !== 'tmpEdit') {
        next(false);
        return;
    }
    window.scrollTo(0, 0);
    vuebus.$off();
    next();
})
router.afterEach((to, from) => {
});

export default router;
