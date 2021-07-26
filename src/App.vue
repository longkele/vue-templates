<template>
    <div id="app" class="p-app">
        <Layout>
            <Header>
                <chead/>
            </Header>
            <Layout>
                <Sider
                    v-model="isCollapsed"
                    :width="200"
                    :collapsed-width="0"
                    collapsible
                    :style="{minHeight: pageHeight + 'px'}"
                >
                    <csider
                        v-show="!isCollapsed"
                        :route-name="routeName"
                        @on-change="handleSiderChange"
                    />
                </Sider>
                <Layout class="layout-content">
                    <Icon
                        :type="isCollapsed ? 'md-arrow-dropright' : 'md-arrow-dropleft'"
                        :class="['hide optionsider', isCollapsed ? 'collapsed' : '']"
                        size="40"
                        @click="handleOptionSider"
                    />
                    <h1 class="layout-title flex-middle">
                        <Icon type="md-arrow-round-forward"/>{{ pageName }}
                    </h1>
                    <Content :style="{padding: '15px 30px 30px', minHeight: '280px', background: '#fff'}">
                        <template v-show="isContentLoad">
                            <keep-alive>
                                <router-view
                                    v-if="$route.meta.keepAlive !== false"
                                    class="layout-main"
                                    @on-routeChange="handleRouteChange"
                                    @on-contentLoad="handleContentLoad"
                                />
                            </keep-alive>
                            <router-view
                                v-if="$route.meta.keepAlive === false"
                                class="layout-main"
                                @on-routeChange="handleRouteChange"
                                @on-contentLoad="handleContentLoad"
                            />
                        </template>
                        <div
                            v-if="!isContentLoad"
                            class="cn_page_loading"
                        >
                            <Spin
                                class="cn_page_loading-spin"
                                size="large"
                            />
                        </div>
                    </Content>
                    <footer>@2021  xx.com</footer>
                </Layout>
            </Layout>
        </Layout>
        <BackTop>
            <div class="cn_top"></div>
        </BackTop>
    </div>
</template>

<script>
import vuebus from '@/utils/event-bus';
import 'moment/locale/zh-cn';
import Sider from '@/components/Sider';

let {isLogin} = PAGE_DATA;

export default {
    data() {
        return {
            pageHeight: window.innerHeight - 62,
            routeName: '',
            pageName: '',
            menuList: [],
            isCollapsed: false,
            isContentLoad: false
        }
    },
    components: {
        csider: Sider
    },
    created() {
        if (!isLogin) {
            location.href = '/mboxcms/page/login';
            return;
        }
    },
    methods: {
        handleSiderChange(name) {
            this.pageName = name;
        },
        // 控制左侧菜单 显示 & 隐藏
        handleOptionSider() {
            this.isCollapsed = !this.isCollapsed;
        },
        handleRouteChange(route) {
            this.routeName = route.name;
            this.isContentLoad = false;
        },
        handleContentLoad() {
            this.$Loading.finish();
            this.isContentLoad = true;
        }
    },
    beforeRouteEnter(to, from, next) {
        next();
    },
    mounted() {
        document.body.addEventListener('keydown', e => {
            if ((e.ctrlKey || e.metaKey) && e.keyCode === 83) {
                vuebus.$emit('keydown-save');

                //阻止默认事件
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }
            }
        })
    }
}
</script>

<style lang="less">
    .p-app {
        // background: #f5f7f9;
        position: relative;
        .layout-title {
            padding: 0 24px;
            font-size: 16px;
            font-weight: 600;
            height: 38px;
            background-color: #f2f2f2;
            .ivu-icon {
                margin-right: 10px;
                padding: 2px;
                border: 2px solid #999;
                font-size: 12px;
                color: #999;
                border-radius: 50%;
            }
        }
        .layout-content {
            border-left: 1px solid @border-color-base;
        }
        footer {
            .flex-cm();
            height: 48px;
            background-color: #f2f2f2;
            color: #666;
            font-size: 13px;
            font-weight: 600;
            text-align: center;
        }
        p {
            margin: 0;
        }
        .optionsider {
            position: fixed;
            top: 360px;
            left: 156;
            cursor: pointer;
            z-index: 1001;
            transition: all .2s ease-in-out;
            &.collapsed {
                left: 2px;
            }
        }
        .ivu-form-inline .ivu-form-item {
            margin-right: 30px;
        }
        .ivu-layout {
            position: relative;
            background: inherit;
        }
        .ivu-layout-header {
            padding: 0;
            height: auto;
            line-height: inherit;
        }
        .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title {
            white-space: nowrap;
        }
        .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item.ivu-menu-item-active {
            border-right: none;
            color: #fff!important;
            background: @btn-default-color !important;
        }
        
        .ivu-layout-sider {
            background-color: #fff;
        }
        .ivu-layout-sider-children {
            background-color: @menu-dark-active-bg;
        }
        
        .ivu-layout-sider-trigger {
            background-color: @menu-dark-active-bg;
            border-top: 1px solid #666;
            .ivu-icon {
                font-size: 22px;
            }
        }
        .ivu-layout-sider-collapsed {
            .ivu-layout-sider-trigger {
                width: 30px !important;
            }
        }
    }
</style>
