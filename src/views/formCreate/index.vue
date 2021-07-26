<!-- form-create demo -->
<template>
    <div class="p-form-create">
        <form-create
            v-if=""
            v-model="fApi"
            :rule="rule"
            :option="options"
            :value.sync="value"
            @change="onChange"
            @prefix1-change="prefix1Change"
        />
    </div>
</template>

<script>
import Vue from 'vue';
import mixinInit from '@/utils/mixins/pageInit';

let testImg = 'https://oaptest.cdn.bcebos.com/mbox/60812235_6ddbe4.png';
let icon = {
    help: 'md-help-circle'
}

export default {
    data() {
        return {
            i: 0,
            isLoading: false,
            fApi: {},
            value: {
                k2: '222', k6: '11:11:11',
                tabsChild1: {app1_field2: 'a11'},
                object: { field1: 'aaa1', field2: 'sss1' }
            },
            options: {
                form: {
                    inline: false,
                    // showMessage: false,
                    // autocomplete: 'off',
                    labelWidth: 220,
                    // labelPosition: 'top'
                },
                row: {
                    gutter: 10,
                },
                submitBtn: {
                    round: true,
                    long: true,
                    type: 'success',
                    size: 'large',
                    innerText: '自定义按钮',
                    styles: {'margin-top': '20px'}
                },
                resetBtn: {
                    col: {span: 8}
                },
                info: {
                    type: 'poptip',
                    icon: icon.help,
                    align: 'left',
                    placement: 'right',
                    trigger: 'hover',
                    // color: '#000',
                    // width: 500,
                },
                // 配置formItem
                wrap: {
                    // labelWidth: 0,
                },
                injectEvent: true,
                global: {},
                onSubmit: (formData) => {
                    console.log(formData);
                },
            },
            rule: [
                {type: 'hidden', field: 'id', value: '1'},  //hidden 组件
                {
                    type: 'input', field: 'tips', title: 'info-prefix-inline', value: 'default',
                    className: 'inline',
                    props: {
                        type: 'textarea', rows: 1
                    },
                    info: {
                        info: 'x',
                        content: '当前字段隐藏的提示说明；',
                        slot: 'xxxxxx'
                    },
                    prefix: '前缀',
                    suffix: '当前字段的显式说明',
                    validate: {required: true, message: '请输入xxx'},
                },
                {
                    type: 'input',
                    field: 'child',
                    title: 'prefix-block-append',
                    value: 'value',
                    clearable: true,
                    props: {},
                    // 高级配置
                    info: {
                        info: 'x',
                        content: '<img src="' + testImg + '">',
                    },
                    // prefix: {
                    //     type: 'img',
                    //     attrs: {src: testImg},
                    // },
                    suffix: {
                        // 当前组件的类型：可以是iview的组件（如 button，icon colorPicker poptip），也可以是html标签（如 p span i img）
                        type: 'alert',
                        props: {type: 'success'},
                        style: {color: 'red'},    // 当前组件的样式
                        children: ['suffix: 独立占用一行的说明'],
                    },
                    // 通过children来配置插槽, slot包括: prepend append
                    children: [
                        {
                            type: 'button',
                            slot: 'prepend',
                            props: {
                                disabled: true
                            },
                            children: ['prepend'],
                        },
                        {
                            type: 'span',
                            slot: 'append',
                            children: [
                                {type: 'icon', props: {type: 'ios-alert-outline'}},
                                {type: 'span', children: ['%']},
                            ],
                        },
                    ]
                },
                // 自定义组件1-tabsCus
                {
                    type: 'divider', className: 'ivue-form-item-label', children: ['自定义组件1: tabsCus'],
                    props: {orientation: 'left'}
                },
                {
                    type: 'tabsCus',
                    field: 'tabs',
                    title: '自定义组件1: tabsCus',
                    className: 'tabs-object',
                    value: '2',
                    props: {
                        options: [
                            {label: 'app1', value: '1'},
                            {label: 'app2', value: '2'}
                        ]
                    },
                    children: [
                        {type: 'input', field: 'app1_field1', title: '1-field1', slot: '1', col: {span: 12}},
                        {type: 'input', field: 'app1_field2', title: '1-field2', slot: '1', col: {span: 12}},
                        {type: 'input', field: 'app2_field1', title: '2-field1', slot: '2', col: {span: 12}},
                        {type: 'input', field: 'app2_field2', title: '2-field1', slot: '2', col: {span: 12}}
                    ]
                },
                // 自定义组件2-collapseCus
                {
                    type: 'collapseCus',
                    field: 'collapseCus',
                    title: '自定义组件2: collapseCus',
                    // value: true,
                    props: {
                        title: '分组1',
                    },
                    children: [
                        {type: 'input', field: 'collapse_field1', title: 'collapse-field1'},
                        {type: 'input', field: 'collapse_field2', title: 'collapse-field2'}
                    ]
                },
                // 自定义组件3-group: 和object区分开
                {
                    type: 'GroupCus',
                    field: 'GroupCus',
                    title: '自定义组件3: GroupCus',
                    // value: true,
                    props: {
                        title: '分组1',
                    },
                    
                    children: [
                        {type: 'input', field: 'group1_field1', title: 'group-field1', col: {span: 12},},
                        {type: 'input', field: 'group2_field1', title: 'group-field2', col: {span: 12},},
                        {type: 'input', field: 'group3_field1', title: 'group-field3', col: {span: 12},},
                        {type: 'input', field: 'group4_field1', title: 'group-field4', col: {span: 12},}
                    ]
                },
            ],
        };
    },
    methods: {
        onChange(v) {
            // console.log('onChange', arguments, this);
        },
        prefix1Change() {
            // console.log('prefix1Change', arguments);
        },
        updateCb(rule, key, value) {
            this.$nextTick(() => {
                rule.display = (this.fApi.form[key] === value);
            })
        }
    },
    mounted() {
        this.contentLoad();
        // this.fApi.on('prefix1-change',this.prefix1Change);
        // this.fApi.on('prefix2-change',this.prefix2Change);
    },
    mixins: [mixinInit],
};
</script>

<style lang='less'>
.p-form-create {
    .form-create .form-create .ivu-form-item:not(.ivu-form-item-required) {
        margin-bottom: 4px;
    }
    .ivu-form-item .ivu-form-item .ivu-form-item-content {
        // margin-left: auto!important;
    }
    .ivu-form-item-label .ivu-icon.ivu-icon-ios-information-circle-outline::before {
        // content: '\F3C1';
    }
    .ivu-form-item.inline {
        .ivu-form-item-content {
            display: flex;
            > div {
                width: auto;
                margin: 0 15px;
            }
        }
    }
    // 自定义组件 tabs
    .ivu-form-item.tabs-object {
        .ivu-radio-group-button {
            width: 100%;
            >.ivu-col {
                margin-top: 5px;
                padding: 5px 8px;
                border: 1px solid @primary-color;
            }
        }
    }
}
</style>