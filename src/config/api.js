/**
 * @file api配置和管理
 */

import axios from '@/config/axios';
import { config } from '@/utils';
import mockData from '@/config/mockData/index';

// 统一管理所有接口的配置Map
export const apiMap = {
    // 公共接口
    getSidemenu: {url: '/material/ui/sidemenu'},
    // 素材接口
    getMaterialJob: {url: '/material/job/page'},
    getMatlist: {url: '/material/job/matlist'},
    // xx: {url: '', method: 'post'},
}

/**
 * 
 * @param {String | Object} name 接口key，如果在apiObj存在这个可以，就使用apiObj[name];
 * @param {*} params  axios 请求参数
 * @param {*} options axios 请求的options配置
 * @returns axios.request
 * @example request('getMaterialJob', {id: 66}).then(res => {});
 */
export default function (name = {}, params = {}, options = {}) {
    console.log('api', name, curApi);
    let curApi = typeof name === 'string' ? (apiMap[name] || {}) : name;

    // // 先使用mock数据
    if (typeof name === 'string' && config.mock && mockData[name]) {
        return Promise.resolve(mockData[name]);
    }
    // // 不满足mock条件，再使用真实接口
    else if (curApi) {
        let method = curApi.method || 'get';
        let tmpOpt = {
            url: curApi.url,
            method,
            ...options
        };

        tmpOpt[method === 'get' ? 'params' : 'data'] = params;
        return axios(tmpOpt);
    }
}
