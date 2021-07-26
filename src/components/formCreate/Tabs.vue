<!-- form-cusfield demo -->
<template>
    <Tabs 
        v-model="model"
        class="form-create-tabsCus"
        type="card"
        :animated="false"
        @on-click="onChange"
    >
        <TabPane
            v-for="item, index in options" :key="item.value"
            :label="item.label" :name="item.value"
            class="tab-content"
        >
            <Row :gutter="row.gutter">
                <slot :name="item.value"></slot>
            </Row>
        </TabPane>
    </Tabs>
</template>

<script>
import formcreateMixin from '@/utils/mixins/formCreate';

export default {
    props: {
    },
    data() {
        return {
        };
    },
    methods: {
    },
    mixins: [formcreateMixin]
};
</script>

<style lang="less">
.form-create-tabsCus {
    .ivu-tabs-content {
        padding: 10px;
        border: 1px solid @primary-color;
    }
}
</style>