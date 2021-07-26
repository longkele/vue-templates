/**
 * @file    filterForm

 * @desc    筛选列表公用的mixin
 */
/* eslint-disable */

import {api} from '@/utils';

export default {
    data() {
        return {
            isPageLoading: false,
            isLoading: false,
            list: [],
            curpage: 1,
            selectAllList: [], // 当前选择的列表记录
            showDetails: false,
            shareObj: {} // 解析分享的参数filterParams
        };
    },
    created() {
        // 解析通过分享按钮，生成的url中包含的查询条件，方便快速查询指定的内容；
        try {
            if (this.$route.query.filterParams) {
                this.shareObj = JSON.parse(decodeURIComponent(this.$route.query.filterParams));
            }
        } catch(e) {
        }
    },
    mounted() {
    },
    methods: {
        // select-all 相关
        onCountChange(list, alllist) {
            this.selectAllList = alllist;
        },
        // filter-form 相关
        onSearchChange(field, value) {
            if (field.model === 'planDate' && eutils.isArray(value) && !value[0]) {
                this.$set(this.search.model, 'planDate', null);
            }
        },
        onSearchDataChange(data, params, isRefilterData) {
            let checkall = this.$refs.checkall;
            this.curpage = params.page;
            this.list = data.list;
            checkall && this.$nextTick(() => {
                checkall.changeList(isRefilterData);

                // 1. 设置默认选择的选项；
                // let tmp = ['9366409630396707177:baidubox:shantou.baidubox', '9229021245899537354:baidubox:shantou.baidubox'];
                // checkall.checkAllGroup = tmp;
                // checkall.checkAllGroupChange(tmp);
                // 2. 设置全选
                // checkall.handleCheckAll();
            });
        },
        onLoadingChange(val) {
            this.isLoading = val;
            if (val) {
                this.list = [];
            }
        },
        // 投放：打开详情页；
        onToDetails() {
            this.showDetails = true;
        },
        getListData(url = '', params = {}) {
            this.isPageLoading = true;

            api(url, params)
            .then(res => {
                if (res.errno === 0) {
                    let fields = res.data.form.fields;
                    // console.log('getListData1', res, fields);

                    this.search.fields = fields;
                    this.$refs.searchForm.fetchData();
                    this.$nextTick(() => {
                        this.contentLoad();
                    });
                }
                this.isPageLoading = false;
            })
            .catch(err => {
                this.isPageLoading = false;
            });
        }
    }
}
