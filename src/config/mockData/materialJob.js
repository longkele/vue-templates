/**
 * 
 * @file 本地调试时，mock数据
 */

const dateOptions = [
    {label: '一周前', value: [-7, 0]},
    {label: '一月前', value: [30, 0]}
];

export default {
    errno: 0,
    data: {
        form: {
            fields: [
                {
                    'key': '1000',
                    'type': 'Input',
                    'label': '查找1',
                    'model': 'id',
                    'placeholder': '请输入素材ID/标题/关键字查找',
                    'defaultValue': ''
                },
                {
                    type: 'Select',
                    subtype: 'button',
                    model: 'count1',
                    valueModel: 'count1_value',
                    width: 120,
                    labelWidth: 0,
                    'options': [
                        {
                            'label': '展现',
                            'value': 'pvCount'
                        },
                        {
                            'label': '点击率',
                            'value': 'clickCount'
                        }
                    ],
                },
                {
                    'type': 'LogicInput',
                    'model': 'count1_value',
                    width: 230,
                    labelWidth: 0,
                    preModal: 'count1',
                    'enables': [
                        '=',
                        '>=',
                        '<='
                    ],
                    'defaultValue': {
                        'logic': '>=',
                        'value': '0'
                    }
                },
                {
                    'key': '100061',
                    'type': 'DatePicker',
                    'subType': 'daterange',
                    'label': '创建时间',
                    'model': 'date1',
                    'placeholder': '',
                    'defaultValue': [],
                    options: dateOptions
                },
                {
                    'key': '100211',
                    'type': 'Select',
                    'multiple': true,
                    'label': '一级分类',
                    'model': 'cat',
                    'required': false,
                    'apiParams': [
                        'material_type',
                        'product'
                    ],
                    'defaultValue': [],
                    'clearable': true
                },
                {
                    'type': 'Radio',
                    subtype: 'button',
                    class: 'radio-text',
                    inline: false,
                    itemWidth: 'auto',
                    'label': '排序',
                    'model': 'sort',
                    changeToSearch: true,
                    'options': [
                        {
                            'label': '播放量/阅读量',
                            'value': 'meta.click'
                        },
                        {
                            'label': '点击率',
                            'value': 'meta.ctr'
                        },
                        {
                            'label': '分享数',
                            'value': 'meta.st_share'
                        },
                        {
                            'label': '喜欢数',
                            'value': 'meta.st_like'
                        },
                        {
                            'label': '评论数',
                            'value': 'meta.st_comment'
                        },
                        {
                            'label': '端内完播率',
                            'value': 'sta.completion_rate'
                        },
                        {
                            'label': '百家号发布时间',
                            'value': 'meta.publish_time'
                        }
                    ],
                },
                {type: 'CustomMore', model: 'custom_more'},
                {
                    'key': '10008',
                    'type': 'LogicInput',
                    'label': '原图宽度',
                    'model': 'width',
                    'enables': [
                        '=',
                        '>=',
                        '<='
                    ],
                    'defaultValue': {
                        'logic': '=',
                        'value': '0'
                    },
                    'defaultHide': true,
                    'showOn': {
                        'material_type': [
                            {
                                'type': 'enum',
                                'enum': [
                                    'xz'
                                ]
                            }
                        ]
                    }
                },
                {
                    'key': '10008',
                    'type': 'LogicInput',
                    'label': '原图高度',
                    'model': 'height',
                    'enables': [
                        '=',
                        '>=',
                        '<='
                    ],
                    'defaultValue': {
                        'logic': '=',
                        'value': '0'
                    },
                    'defaultHide': true,
                    'showOn': {
                        'material_type': [
                            {
                                'type': 'enum',
                                'enum': [
                                    'xz'
                                ]
                            }
                        ]
                    }
                },
                {
                    'key': '1000612',
                    'type': 'Input',
                    'label': '标签搜索',
                    'model': 'tags',
                    'placeholder': '请输入标签',
                    'defaultValue': '',
                    'defaultHide': true
                },
            ]
        }
    }
}