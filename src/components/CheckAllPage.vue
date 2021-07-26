<!-- 支持全选的 checkbox 组合 -->
<template>
    <div class="c-select-checkall">
        <div class="c-select-checkall-title cn_nav">
            <slot name="checkall-start"><div class="cn_nav-left"></div></slot>
            <slot name="checkall">
                <div class="cn_nav-right flex">
                    <Checkbox
                        :indeterminate="indeterminate"
                        :value="checkAll"
                        border
                        @click.prevent.native="handleCheckAll"
                    >{{ title }}</Checkbox>
                    <div class="cn_nav-count">
                        <p>当前页：<span>{{ checkAllGroup.length }}</span></p>
                        <p>所有页：<span>{{ pagecount }}</span></p>
                    </div>
                </div>
            </slot>
            <slot name="checkall-end"></slot>
        </div>

        <!-- 列表展示方式1：table -->
        <div v-if="distype === 'table'"
            class="ivu-table ivu-table-stripe ivu-table-border ivu-table-wrapper-with-border"
        >
            <slot name="content-title"></slot>
            <CheckboxGroup
                v-model="checkAllGroup"
                @on-change="checkAllGroupChange"
            >
                <slot name="content-list"></slot>
            </CheckboxGroup>
        </div>

        <!-- 列表展示方式2：card -->
        <CheckboxGroup
            v-else
            v-model="checkAllGroup"
            @on-change="checkAllGroupChange"
        >
            <Row :gutter="15" justify="start">
                <Col :span="listspan"
                    v-for="item, index in list"
                    :key="index"
                    style="margin-bottom: 15px"
                >
                    <Checkbox
                        :label="item.id"
                        class="c-select-checkall-checkbox"
                    >
                        <slot :name="'content' + item.id"></slot>
                    </Checkbox>
                </Col>
            </Row>
        </CheckboxGroup>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default() {
                return [];
            }
        },
        curpage: {
            type: Number,
            default: 1
        },
        title: {
            type: String,
            default: '全选当前页面'
        },
        distype: {
            type: String,
            default: 'card'
        },
        listspan: {
            type: Number,
            default: 8
        }
    },
    data() {
        return {
            indeterminate: false,
            checkAll: false,
            checkAllGroup: [],
            checkPagelist: {},  // 记录所有页面的选择项；
            pagecount: 0
        };
    },
    watch: {
        checkAllGroup(val) {
            let allList = [];
            let checkPagelist = this.checkPagelist;

            Object.keys(checkPagelist).forEach(item => {
                allList = allList.concat(checkPagelist[item]);
            });
            this.$emit('on-countChange', val, allList);
            this.pagecount = allList.length;
            // console.log('watch-checkAllGroup', val, allList);
        },
        list(val) {
            // this.$nextTick(() => {
            //     this.changeList();
            // });
        }
    },
    mounted() {
    },
    methods: {
        checkAllGroupChange (data) {
            if (data.length === this.list.length) {
                this.indeterminate = false;
                this.checkAll = true;
                this.checkPagelist[this.curpage] = this.list;
            } else if (data.length > 0) {
                let curList = [];
                let ids = ',' + data.join(',') + ',';

                this.list.forEach(item => {
                    if (ids.indexOf(`,${item.id},`) !== -1) {
                        curList.push(item);
                    }
                })
                this.checkPagelist[this.curpage] = curList;
                this.indeterminate = true;
                this.checkAll = false;
            } else {
                this.indeterminate = false;
                this.checkAll = false;
                this.checkPagelist[this.curpage] = [];
            }
        },
        // list数据发生变化；
        changeList(isRefilterData) {
            // 重新查询时，需要清空所有选择项；
            if (isRefilterData) {
                this.checkPagelist = {};
                this.checkAllGroup = [];
            }
            else {
                let curList = this.checkPagelist[this.curpage] || [];

                this.checkAllGroup = curList.map(x => x.id);
            }
            this.checkAllGroupChange(this.checkAllGroup);
        },
        // 点击全选按钮；
        handleCheckAll () {
            if (this.checkAll) {
                this.checkAll = false;
            } else {
                this.checkAll = true;
            }
            this.indeterminate = false;

            if (this.checkAll) {
                this.checkAllGroup = this.list.map(x => x.id);
                this.checkPagelist[this.curpage] = this.list;
            } else {
                this.checkAllGroup = [];
                this.checkPagelist[this.curpage] = [];
            }
        }
    }
};
</script>

<style lang="less">
    .c-select-checkall {
        .ivu-checkbox-group {
            .ivu-col {
                margin-bottom: 15px;
            }
        }
        &-checkbox {
            position: relative;
            width: 100%;
            .ivu-checkbox {
                position: absolute;
                right: 8px;
                top: 8px;
                z-index: 101;
            }
        }
        // list-table 格式
        .ivu-table {
            table {
                width: 100%;
                td {
                    text-align: center;
                }
            }
        }
        .ivu-table-body {
            .ivu-checkbox-wrapper {
                margin: 0;
                padding: 14px 22px;
            }
        }
        .ivu-table-stripe .ivu-table-body tr:hover td {
            background: #ebf7ff;
        }
    }
</style>
