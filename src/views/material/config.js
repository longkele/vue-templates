/**
 * @file 素材：页面配置文件
 */

import config from '@/config/index';

let search = config.searchConfig;

export const useTemplateForm = {
    fields: [
        {
            type: 'Radio',
            subtype: 'button',
            class: 'radio-text',
            itemWidth: 'auto',
            label: '今日头条',
            model: 'toutiao',
            options: [
                {'label': '1大图logo白字600*300', 'value': '1'},
                {'label': '2大图logo白字600*300', 'value': '2'},
                {'label': '3大图logo白字600*300', 'value': '3'}
            ]
        },
        {type: 'List', model: 'list'},
        {
            type: 'Radio',
            subtype: 'button',
            class: 'radio-text',
            inline: false,
            itemWidth: 'auto',
            labelWidth: 0,
            model: 'audit',
            options: [
                {'label': '审核', 'value': '1'},
                {'label': 'BD审核', 'value': '2'},
                {'label': '业务审核', 'value': '3'}
            ]
        },
    ]
};

export const confData = {
    content: {
        search: {
            model: search.model,
            options: {
                ...search.options,
                apiName: 'getMatlist'
            }
        }
    },
}
