<!--
 * @file 通用head
-->

<template>
    <Menu
        class="c-head"
        mode="horizontal"
        theme="dark"
        :active-name="curMenu"
    >
        <div class="logowp flex">
            <p class="name">平台</p>
        </div>
        <div class="nav">
            <MenuItem name="product">
                <div class="productwp">
                    <label>产品线切换</label>
                    <Select
                        v-model="product"
                        size="large"
                        class="product-item"
                        @on-change="handelProductChange"
                    >
                        <Option
                            v-for="item in config.productList"
                            :value="item.value"
                            :key="item.value"
                        >{{ item.label }}</Option> 
                    </Select>
                </div>
            </MenuItem>
            <Submenu name="4">
                <template slot="title">{{ user.username }}</template>
                <MenuItem name="quit"><Icon type="md-log-out"/>退出</MenuItem>
            </Submenu>
        </div>
    </Menu>
</template>

<script>
import vuebus from '@/utils/event-bus';
import {config} from '@/utils';

let {user} = PAGE_DATA;

export default {
    props: {
        curtime: {
            type: [Number, String],
            default: 0
        }
    },
    data() {
        return {
            curMenu: 'home',
            config,
            user,
            product: config.productList[0].value,
            isApplyAdmin: true,
            applyMsg: window.PAGE_DATA.applyMsg,
            creatorMsg: window.PAGE_DATA.creatorMsg
        };
    },
    created() {
        window.PAGE_DATA.product = this.product;
        if (this.$route.name !== 'home') {
            this.curMenu = this.$route.name;
        }
    },
    mounted() {
    },
    watch: {
        curtime() {
            // log('head-watch-curtime', this.curtime);
            // 更新状态
            this.curMenu = this.$route.name;
            this.applyMsg = window.PAGE_DATA.applyMsg;
            this.creatorMsg = window.PAGE_DATA.creatorMsg;
        }
    },
    methods: {
        menuClick(name) {
            switch (name) {
                case 'quit':
                    location.href = '/api/logout';
                    break;
                default:
                    break;
            }
        },
        handelProductChange(value) {
            if (value) {
                window.PAGE_DATA.product = value;
                vuebus.$emit('on-product-change', value);
            }
        }
    },
};
</script>

<style lang="less">
.c-head {
    padding: 0 20px;
    background-color: #36c;
    .logowp {
        align-items: flex-end;
        position: relative;
        top: 10px;
        float: left;
        font-size: 16px;
        color: #fff;
        img {
            height: 36px;
        }
        .name {
            margin-left: 15px;
            padding-left: 15px;
            line-height: 22px;
            border-left: 1px solid #fff;
            font-size: 20px;
            font-weight: 800;
        }
    }
    .productwp {
        .flex-cm();
        label {
            width: 90px;
            color: #fff;
        }
        .product-item {
            width: 200px;
            .ivu-select-selection {
                background-color: transparent;
                border-color: #8d93ff;
                color: #fff;
                &:hover {
                    border-color: #dcdee2;
                }
            }
        }
    }
    .nav {
        float: right;
    }
}
</style>
