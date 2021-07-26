<!-- 素材-首页 -->
<template>
    <div class="p-material-index">
        <tabsRouter
            :data="list"
            @on-change="onTabChange"
        ></tabsRouter>
    </div>
</template>

<script>
import mixinInit from '@/utils/mixins/pageInit';

export default {
    data() {
        return {
            list: [
                {label: '素材1', name: 'materialContent'}
            ]
        };
    },
    created() {
        this.contentLoad();
    },
    methods: {
        onTabChange(name) {
        },
    },
    mounted() {},
    watch: {},
    components: {},
    mixins: [mixinInit]
};
</script>

<style lang="less">
.p-material-index {
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
