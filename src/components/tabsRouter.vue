<!-- tabs标签：content部分使用router-view实现二级路由 -->
<template>
    <div class="c-tabs-router">
        <Tabs
            v-model="tabName"
            type="card"
            @on-click="onTabChange"
        >
            <TabPane
                v-for="item, index in data"
                :key="index"
                :label="item.label" :name="item.name"
            ></TabPane>
        </Tabs>
        <slot>
            <template v-show="isContentLoad">
                <keep-alive>
                    <router-view
                        v-if="$route.meta.keepAlive !== false"
                        @on-routeChange="handleRouteChange"
                        @on-contentLoad="handleContentLoad"
                    ></router-view>
                </keep-alive>

                <router-view
                    v-if="$route.meta.keepAlive === false"
                    @on-routeChange="handleRouteChange"
                    @on-contentLoad="handleContentLoad"
                ></router-view>
            </template>
        </slot>
        <div
            v-if="!isContentLoad"
            class="cn_page_loading"
        >
            <Spin
                class="cn_page_loading-spin"
                size="large"
            />
        </div>
    </div>
</template>

<script>

export default {
    props: {
        data: {
            type: Array,
            default() {
                return [];
            }
        },
        useRouter: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            tabName: '',
            isContentLoad: false
        };
    },
    created() {
        this.tabName = this.$route.name;
    },
    methods: {
        onTabChange(name) {
            this.$emit('on-change', name);
            if (this.useRouter && this.$route.name !== name) {
                this.$router.push({name});
            }
        },
        handleRouteChange(route) {
            this.isContentLoad = false;
        },
        handleContentLoad() {
            this.isContentLoad = true;
        }
    }
};
</script>

<style lang="less">
.c-tabs-router {
    .ivu-tabs {
        margin: 0 0 2px -20px;
    }
    .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-nav-container {
        height: auto;
    }
    .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
        height: 41px;
        padding: 10px 50px 0;
    }
}
</style>
