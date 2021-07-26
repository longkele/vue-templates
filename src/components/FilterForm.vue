<template>
    <div class="fg-filter-form">
        <Form
            class="fg-filter-form-search"
            :model="model"
            :label-width="options.labelWidth"
            :inline="options.inline"
        >
            <template v-for="field, index in fieldsBase">
                <br v-if="field.type === 'Br'" :key="index">
                <FieldGenerator
                    v-else
                    :class="field.class || (field.valueModel ? 'smallMarginright' : '')"
                    :field="field"
                    :key="index"
                    :inline="typeof field.inline !== 'undefined' ? field.inline : options.inline"
                    :item-width="field.itemWidth || options.itemWidth"
                    @on-field-change="handleFieldChange(field, $event)"
                    @on-button-event="handleButtonClick"
                    @keydown.native.enter.prevent="handleInputPress"
                />
            </template>
            <div v-show="fieldsMore.length>0 && showMore" class="fg-filter-form-searchMorewp">
                <div class="content">
                    <template v-for="field, index in fieldsMore">
                        <br v-if="field.type === 'Br'" :key="index">
                        <FieldGenerator
                            v-else
                            :class="field.class || (field.valueModel ? 'smallMarginright' : '')"
                            :field="field"
                            :key="index"
                            :inline="typeof field.inline !== 'undefined' ? field.inline : options.inline"
                            :item-width="field.itemWidth || options.itemWidth"
                            @on-field-change="handleFieldChange(field, $event)"
                            @on-button-event="handleButtonClick"
                            @keydown.native.enter.prevent="handleInputPress"
                        />
                    </template>
                </div>
            </div>
            <div class="btnwp">
                <Button type="primary" @click="handleButtonClick">查询</Button>
                <Button
                    v-if="fieldsMore.length>0"
                    type="text"
                    @click="handleMore"
                    class="btnmore"
                >展开 <Icon :type="showMore ? 'ios-arrow-up' : 'ios-arrow-down'"></Icon>
                </Button>
            </div>
        </Form>
        <div class="fg-filter-form-content">
            <slot></slot>
            <div v-if="isLoading || !isFirstLoad" class="cn_nocontent">
                <p class="title">加载中...</p>
            </div>
            <div v-else-if="list.length === 0" class="cn_nocontent">
                <p class="title">暂无内容</p>
            </div>
        </div>
        <Page
            v-if="options.showPage"
            class="fg-filter-form-page"
            show-sizer
            show-elevator
            :current="model.page"
            :page-size="options.pageSize"
            :total="totalNum"
            :show-total="options.showPageTotal"
            :page-size-opts="[10, 20, 30, 40, 50]"
            @on-page-size-change="onPagesizeChange"
            @on-change="fetchData"
        />
        <Icon type="md-share" class="btnshare" @click="onShare"></Icon>
        <input class="cn_selinput" ref="selinput" type="text" :value="selurl">
    </div>
</template>

<script>
import {api, formatRes, copyUrl} from '@/utils';
import eutils from '@jnlong/eutils';

function getType (obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
}

export default {
    props: {
        model: {
            type: Object,
            default() {
                return {};
            }
        },
        fields: {
            type: Array,
            default() {
                return [];
            }
        },
        options: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    data() {
        return {
            selurl: '',
            totalNum: 0,
            isFirstLoad: false,
            isLoading: false,
            list: [],
            fieldsBase: [],
            fieldsMore: [],
            showMore: false,
            computeModal: eutils.deepCopy(this.model),
            pageSize: this.options.pageSize || 50
        }
    },
    watch: {
        fields(val) {
            let index = val.findIndex(item => item.type === 'CustomMore');

            if (index !== -1) {
                this.fieldsBase = val.slice(0, index);
                this.fieldsMore = val.slice(index + 1);
            } else {
                this.fieldsBase = val;
                this.fieldsMore = [];
            }
        },
        isLoading() {
            this.$emit('on-loadingChange', this.isLoading);
        },
        model: {
            handler: function(val) {
                this.computeModal = val;
            },
            deep: true
        }
    },
    created() {
    },
    mounted() {
    },
    methods: {
        // 筛选
        handleFieldChange(field, event) {
            let key = field.model;
            let value = this.model[key];

            this.$emit('on-searchChange', field, value);
            if (field.changeToSearch) {
                this.fetchData(1, true);
            }

            if (
                !(getType(value) === 'Array' && value.length === 0)
                && value !== ''
                && value !== 'ALL' && value !== 'all'
            )
            {
                // 处理特殊字段：组合选项
                if (field.valueModel) {
                    let curValue = this.model[field.valueModel];

                    curValue && (this.computeModal[value] = this.formatValue(curValue));
                    // select改变后，删除改变前的选项的值；
                    if (getType(field.options) === 'Array') {
                        field.options.forEach(item => {
                            (item.value !== value) && delete this.computeModal[item.value];
                        })
                    }
                }
                else if (field.preModal) {
                    this.model[field.preModal] 
                    && (this.computeModal[this.model[field.preModal]] = this.formatValue(value));
                } else {
                    this.computeModal[key] = this.formatValue(value);
                }
            }
        },
        handleButtonClick() {
            this.fetchData(1, true);
        },
        handleInputPress(e) {
            if (e.keyCode === 13) {
                this.fetchData(1, true);
            }
        },
        handleMore() {
            this.showMore = !this.showMore;
        },
        formatValue(val) {
            return typeof val === 'object' ? JSON.stringify(val) : val;
        },
        getParams(pn) {
            this.computeModal.pageSize = this.pageSize;
            this.computeModal.page = pn || 1;

            return this.computeModal;
        },
        onPagesizeChange(size) {
            this.pageSize = size;
            this.fetchData(1, true);
        },
        // 其他
        fetchData(pn, isRefilterData) {
            if (this.isLoading) {
                return;
            }
            this.isLoading = true;
            this.list = [];

            let params = this.getParams(pn);

            api(
                this.options.apiName,
                params
            )
            .then(res =>
                {
                    let data = formatRes.call(this, res);

                    this.isFirstLoad = true;
                    if (data) {
                        data.total *= 1;
                        this.totalNum = data.total;
                        this.isLoading = false;
                        this.list = data.list;
                        this.$emit('on-dataChange', data, params, isRefilterData);
                    } else {
                        this.isLoading = false;
                    }
                }
            ).catch(err=>
                {
                    this.isFirstLoad = true;
                    this.isLoading = false;
                }
            );
        },
        onShare() {
            try {
                let value = encodeURIComponent(JSON.stringify(this.model));
                let url = location.href.slice(location.href.indexOf)
                let text = eutils.urlParse.add('filterParams', value, location.origin + location.pathname + location.hash);

                copyUrl.call(this, text);
                console.log('onshare', this.model, text);
            } catch (err) {
                console.log('复制失败', err);
            }
        }
    }
}
</script>

<style lang="less">
    .fg-filter-form {
        &-searchMorewp {
            .content {
                margin-top: 10px;
            }
        }
        &-search {
            position: relative;
            padding-bottom: 10px;
            border-bottom: 1px solid @border-color-base;
            color: #404040;
            .ivu-divider-horizontal {
                margin: 0 0 15px;
            }
        }
        &-content {
            min-height: 100px;
        }
        &-page {
            display: flex;
            align-items: flex-end;
            margin: 30px 0;
            text-align: center;
        }
        .ivu-form-item.smallMarginright {
            margin-right: 10px;
        }
        .btnwp {
            margin-top: 10px;
            text-align: right;
        }
        .btnmore {
            padding-left: 20px;
            padding-right: 20px;
            color: #999;
        }
        .btnshare {
            position: absolute;
            top: 0px;
            right: 20px;
            height: 38px;
            line-height: 38px;
            width: 38px;
            font-size: 20px;
            text-align: center;
            cursor: pointer;
            &:hover {
                color: @primary-color;
            }
        }
        .fg-filter-form-page {
            justify-content: flex-end;
        }
    }
</style>
