<template>
    <div class="checkbox-card">
        <Card>
            <div class="checkbox-card-header">
                <slot name="checkbox-card-header-tag">
                    <div class="checkbox-card-header-tag">
                        <Tag>
                            优化师审核通过
                        </Tag>
                    </div>
                </slot>
                <slot name="checkbox-card-header-account">
                    <div class="checkbox-card-header-account">
                        <span>
                            已关联账号数: 12
                        </span>
                    </div>
                </slot>
                <slot name="checkbox-card-header-qr">
                    <div class="checkbox-card-header-qr">
                        <a
                            @click.stop.prevent="handleQrCodeClick(listData)"
                        >
                            <img
                                class="img-selector-content-ul-li-actions-qr"
                                src="../assets/img/qr.png"
                            >
                        </a>
                    </div>
                </slot>
            </div>
            <div class="checkbox-card-content" v-if="Object.keys(listData).length">
                <img
                    v-lazy="listData.cover"
                    :alt="listData.meta.title"
                    width="100%"
                    referrerPolicy="no-referrer"
                    @click.stop.prevent="handelMaterialDetail(listData)"
                >
            </div>
            <slot name="checkbox-card-title">
                <div class="checkbox-card-title" v-if="Object.keys(listData).length">
                    <p>{{listData.meta.title}}</p>
                </div>
            </slot>
            <slot name="checkbox-card-footer">
                <div class="checkbox-card-footer">
                    <div class="checkbox-card-footer-tag">
                        <Tag 
                            v-for="(item, index) in tag.tagList"
                            :key="index"
                            class="checkbox-card-footer-tag-name"
                        >
                            {{ listData[item] | tagFilterName(footerData) }}
                        </Tag>
                        <Tag 
                            class="checkbox-card-footer-tag-name"
                        >
                            {{ listData.create_time }}
                        </Tag>
                    </div>
                    <div class="checkbox-card-footer-target">
                        <div class="checkbox-card-footer-target-list">
                            <span
                                v-for="(item, index) in computedTarget.targetList"
                                :key="index"
                            >{{listData.meta[item]}}</span>
                        </div>
                        <div class="checkbox-card-footer-target-list">
                            <span
                                v-for="(item, index) in computedTarget.targetList"
                                :key="index"
                            >{{ item | targetName(footerData) }}</span>
                        </div>
                    </div>
                </div>
            </slot>
        </Card>
    </div>
</template>

<script>
import config from '@/config/index';
let that;
export default {
    props: {
        listData: {
            type: Object,
            default() {
                return {
                };
            }
        },
        footerData: {
            type: Object,
            default() {
                return {};
            }
        },
        headerData: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    filters: {
        statusType(value) {
            return value;
        },
        tagFilterName(value, footerData) {
            return footerData.tag.tagMap[value];
        },
        targetName(value, footerData) {
            return footerData.target.targetMap[value];
        }
    },
    beforeCreate () {
	    that = this
    },
    data() {
        return {
            list: [
                
            ]
        };
    },
    computed: {
        tag() {
            return that.footerData.tag || {};
        },
        computedTarget() {
            return that.footerData.target || [];
        }
    },
    created() {
    },
    methods: {
        handelMaterialDetail(val, event) {
            this.$emit('on-materialDetail', val);
            console.log(event);
            return false;
        },
        handleQrCodeClick(val, event) {
            this.$emit('on-qrCodeClick', val);
        }
    },
};
</script>

<style lang="less">
.checkbox-card {
    // width: 290px;
    // margin: 5px;
    .ivu-card {
        padding: 5px 0;
    }
    .ivu-card-body {
        padding: 0 16px;
    }
    &-header {
        &-tag {
            float: left;
        }
        &-account {
            float: left;
            line-height: 26px;
            font-size: 12px;
        }
        &-qr {
            position: relative;
            float: right;
            left: -20px;
            top: -2px;
            padding: 5px;
            img {
                // position: relative;
                // top: 2px;
                width: 15px;
                height: 15px;
            }
        }
    }
    &-content {
        .flex-cm();
        width: 100%;
        height: 150px;
        overflow: hidden;
        border-radius: 3px;
    }
    &-title {
        margin: 5px 0;
        line-height: 16px;
        height: 16 * 2px;
        .flex-middle();
        p {
            .lineclamp2();
        }
        &-input {
            width: 244px;
        }
    }
    &-footer {
        position: relative;
        &-titlewp {
            .flex-middle();
            margin: 5px 0;
            height: 30px;
            line-height: 15px;
        }
        &-title {
            .lineclamp2();
        }
        &-tag {
            &-name {
                width: 79px;
                text-align: center;
            }
        }
        &-target {
            &-list {
                font-size: 12px;
                margin-top: 5px;
                span {
                    display: inline-block;
                    width: 60px;
                    text-align: center;
                }
            }
        }
    }
}
</style>