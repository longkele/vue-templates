import Mock from 'mockjs';
import getSidemenu from './sidemenu';
import getMaterialJob from './materialJob';
import getMatlist from './matlist';

import {apiMap} from '@/config/api';

let apiObj = {
    getSidemenu,
    getMaterialJob,
    getMatlist
}

export default {
    mockInit: function () {
    //     Object.keys(apiMap).forEach(key => {
    //         // console.log('options2', apiMap[key].url, apiObj[key]);
    //         Mock.mock(apiMap[key].url, options => {
    //             return apiObj[key] || {errno: 404}
    //         })
    //     })
    },
    ...apiObj
}
