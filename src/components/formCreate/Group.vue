<!-- form-cusfield demo -->
<template>
    <Row
        :class="['form-create-groupCus', className]"
        :gutter="row.gutter">
        <slot></slot>
    </Row>
</template>

<script>
import formcreateMixin from '@/utils/mixins/formCreate';

export default {
    props: {
        className: ''
    },
    data() {
        return {
        };
    },
    methods: {
        onChange(val) {
        }
    },
    mixins: [formcreateMixin]
};
</script>

<style lang="less">
.form-create-groupCus {
}
</style>