<!-- 素材 / 内容库素材 -->
<template>
    <div class="p-material-content">
        <filter-form
            ref="searchForm"
            :model="search.model"
            :options="search.options"
            :fields="search.fields"
            @on-searchChange="onSearchChange"
            @on-dataChange="onSearchDataChange"
            @on-loadingChange="onLoadingChange"
        >
            <CheckAllPage
                :list="list"
                :curpage="curpage"
                ref="checkall"
                @on-countChange="onCountChange"
            >
                <template slot="checkall-end">
                    <div class="cn_nav-right">
                        <Button @click="onOpenDetails">套用模板</Button>
                    </div>
                </template>
                <template
                    v-for="item, index in list"
                    :slot="'content' + item.id"
                >
                    <CheckboxCard
                        v-show="!isLoading"
                        @on-qrCodeClick="onQrCodeClick"
                        @on-materialDetail="onOpenDetail"
                        :listData="formatCarddata(item)"
                    >
                    </CheckboxCard>
                </template>
            </CheckAllPage>
        </filter-form>
        <useTemplate :data="tmpSelectList" v-model="openDetails"></useTemplate>
    </div>
</template>

<script>
import {confData} from './config';
import cardMixin from '@/utils/mixins/card';

let pageData = confData.content;

export default {
    data() {
        return {
            search: {
                options: pageData.search.options,
                model: {},
                fields: [],
            },
        };
    },
    created() {
        this.getListData('getMaterialJob', {id: 'rawmaterial'});
        this.search.model = {
            ...pageData.search.model,  // 默认值
            product: this.product,    // 当前产品线
            ...this.shareObj          // 分享链接中包含的过滤条件
        }
    },
    methods: {
    },
    mixins: [cardMixin]
};
</script>

<style lang="less">
.p-material-content {
    margin: 0 auto;
    .ivu-card {
        min-height: 100px;
        padding: 15px 0;
    }
}
</style>
