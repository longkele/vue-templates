/* eslint-disable */
import '@/assets/css/reset.less';
import '@/assets/css/iview-theme.less';
import '@/assets/css/comm.less';
import '@/assets/font/iconfont.less';
import 'form-generator-iview/src/style/index.less';

import axios from 'axios';
import mockData from '@/config/mockData/index';

// lib
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import viewUI from 'view-design';
import FormGenerator from 'form-generator-iview';
import VueLazyload from 'vue-lazyload';
import formCreate from '@form-create/iview4';

// components
import Chead from '@/components/Head';
import Cloading from '@/components/Cloading';
import fieldUpload from '@/components/FormField/fieldUpload';
import FilterForm from '@/components/FilterForm';
import CheckAllPage from '@/components/CheckAllPage';
import CheckboxCard from '@/components/CheckboxCard';
import TabsRouter from '@/components/tabsRouter';
import CollapseCus from '@/components/formCreate/Collapse.vue';
import TabsCus from '@/components/formCreate/Tabs.vue';
import GroupCus from '@/components/formCreate/Group.vue';
import FcEditor from "@form-create/component-wangeditor";

mockData.mockInit();
// axios.request('/test/sidemenu').then(res => {
//     console.log('res', res)
// })

formCreate.component('CollapseCus', CollapseCus);
formCreate.component('TabsCus', TabsCus);
formCreate.component('GroupCus', GroupCus);

Vue.config.productionTip = false;
Vue.use(viewUI, {
    // iview全局配置 https://www.iviewui.com/docs/guide/global
});
Vue.use(FormGenerator);
Vue.use(formCreate);

/**
 * 图片延迟加载 https://github.com/hilongjw/vue-lazyload
 * demo
    <img v-lazy="img.src">
    <div v-lazy:background-image="imgObj"></div>
 */
Vue.use(VueLazyload, {
    preLoad: 1.3,
    // error: errorimage,
    // loading: require('/src/assets/img/loading.png'),
    attempt: 1
});

Vue.component('Cloading', Cloading);
Vue.component('fieldUploadCustom', fieldUpload);
Vue.component('Chead', Chead);
Vue.component('FilterForm', FilterForm);
Vue.component('CheckAllPage', CheckAllPage);
Vue.component('CheckboxCard', CheckboxCard);
Vue.component('TabsRouter', TabsRouter);
Vue.component('editor', FcEditor);

if (!PAGE_DATA.isLogin) {
    location.href = '/mboxcms/page/login';
} else {
    new Vue({
        router,
        render: h => h(App)
    }).$mount('#app')
}
