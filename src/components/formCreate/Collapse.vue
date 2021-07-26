<!-- form-cusfield demo -->
<template>
    <div class="form-create-collapse ivu-collapse">
        <div :class="['ivu-collapse-item', model ? 'ivu-collapse-item-active' : '']">
            <div
                class="ivu-collapse-header"
                @click="onChange"
            >
                <i class="ivu-icon ivu-icon-ios-arrow-forward"></i>{{ title }}
            </div>
            <div
                v-show="model"
                class="ivu-collapse-content"
            >
                <Row :gutter="row.gutter">
                    <slot></slot>
                </Row>
            </div>
        </div>
    </div>
</template>

<script>
import formcreateMixin from '@/utils/mixins/formCreate';

export default {
    props: {
    },
    inject: {
    },
    data() {
        return {
        };
    },
    methods: {
        onChange() {
            this.model = !this.model;
            this.$emit('input', this.model);
        },
    },
    mixins: [formcreateMixin]
};
</script>

<style lang="less">
.form-create-collapse {
    .ivu-collapse-content {
        padding-top: 10px;
        padding-bottom: 10px;
    }
}
</style>