<template>
    <div class="form-create-checkall">
        <div class="form-create-checkall-head">
            <Checkbox
                :indeterminate="indeterminate"
                :value="checkAll"
                @click.prevent.native="handleCheckAll">{{title || '全选'}}</Checkbox>
        </div>
        <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
            <Checkbox :label="item.value" v-for="item in options" :key="item.value">{{item.label}}</Checkbox>
        </CheckboxGroup>
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
            indeterminate: true,
            checkAll: false,
            checkAllGroup: this.value || []
        };
    },
    watch: {
        value: {
            handler(val) {
                let checkAll = false;
                let indeterminate = false;

                if (typeof val === 'undefined') {
                    return;
                }
                console.log('chechall-watch', val, this.checkAllGroup, this.options);
                this.checkAllGroup = val || [];
                if (this.checkAllGroup.length > 0) {
                    if (this.checkAllGroup.length === this.options.length) {
                        checkAll = true;
                    } else {
                        indeterminate = true;
                    }
                }
                this.checkAll = checkAll;
                this.indeterminate = indeterminate;
            },
            immediate: true
        }
    },
    mounted() {
    },
    methods: {
        handleCheckAll () {
            if (this.checkAll) {
                this.checkAll = false;
            } else {
                this.checkAll = true;
            }
            this.indeterminate = false;

            if (this.checkAll) {
                this.checkAllGroup = this.options.map(item => item.value);
            } else {
                this.checkAllGroup = [];
            }
            this.$emit('input', this.checkAllGroup);
        },
        checkAllGroupChange (data) {
            if (data.length === this.checkAllGroup.length) {
                this.indeterminate = false;
                this.checkAll = true;
            } else if (data.length > 0) {
                this.indeterminate = true;
                this.checkAll = false;
            } else {
                this.indeterminate = false;
                this.checkAll = false;
            }
            this.$emit('input', this.checkAllGroup);
        }
    },
    mixins: [formcreateMixin]
};
</script>

<style  lang="less">
    .form-create-checkall {
        margin-bottom: 15px;
        &-head {
            border-bottom: 1px solid #e8eaec;
        }
        .ivu-checkbox-group {
            margin: 5px 0 0 25px;
        }
    }
</style>