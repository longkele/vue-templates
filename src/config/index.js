/**
 * @file    全局config

 */
/* eslint-disable */
let debug = !!location.port;

export default {
    mock: true,
    debug,
    qrcodeWidth: 116,
    productList: [
        {label: 'app1', value: 'baidubox'},
        {label: 'app2', value: 'lite'},
    ],
    material: {
        card: {
            header: {
                show: true,
                tagStatus: {
                    '1': {
                        color: '',
                        name: '机审中'
                    },
                    '1': {
                        color: '',
                        name: '机审中'
                    },
                    '1': {
                        color: '',
                        name: '机审中'
                    },
                    '1': {
                        color: '',
                        name: '机审中'
                    },
                    '1': {
                        color: '',
                        name: '机审中'
                    },
                    '1': {
                        color: '',
                        name: '机审中'
                    },
                    '1': {
                        color: '',
                        name: '机审中'
                    }
                }
            },
            footer:{
                tag: {
                    tagList: ['product', 'dsp'],
                    tagMap: {
                        'baidubox': '百度',
                        'shantou.baidubox': '汕头'
                    }
                },
                target: {
                    targetList: ['size', 'click', 'ctr', 'ad_account_num'],
                    targetMap: {
                        'size':'展现',
                        'click': '点击',
                        'ctr': 'CTR',
                        'ad_account_num': '出价'
                    }
                }
            }
        },
        detail: {}
    },
    // 搜索框默认的配置
    searchConfig: {
        model: {
            media_type: 'all',
            product: 'baidubox',
            dsp: 'shantou.baidubox',
            from: 'auto'
        },
        options: {
            inline: true,
            labelWidth: 90,
            itemWidth: 360,
            pageSize: 5,
            showPage: true,
            showPageTotal: true
        }
    }
};