<!-- 内容库素材-套用模板弹窗 -->
<template>
    <Modal
        v-model="visible"
        title="套用模板"
        width="1000"
        class="com-use-template"
        class-name="flex-cm"
        :styles="{top: 0}"
    >
        <Form
            :model="model"
            :label-width="options.labelWidth"
            :inline="options.inline"
        >
            <template v-for="field, index in fields">
                <Row :gutter="15" justify="start"
                    v-if="field.type === 'List'"
                    class="listwp"
                >
                    <Col v-for="listItem, listIndex in tmpData" span="8" :key="listIndex">
                        <div class="imgwp"><img :src="listItem.img" alt=""></div>
                        <Input type="textarea" v-model="listItem.meta.title"/>
                    </Col>
                </Row>
                <FieldGenerator
                    v-else
                    :class="field.class || (field.valueModel ? 'smallMarginright' : '')"
                    :field="field"
                    :key="index"
                    :inline="typeof field.inline !== 'undefined' ? field.inline : options.inline"
                    :item-width="field.itemWidth || options.itemWidth"
                    :label-width="field.labelWidth || options.labelWidth"
                    @on-field-change="onFieldChange(field, $event)"
                />
            </template>
        </Form>
        <div slot="footer">
            <Button @click="onCancel">取消</Button>
            <Button type="primary" @click="onOk">确定</Button>
        </div>
    </Modal>
</template>

<script>
    import {api} from '@/utils';
    import {useTemplateForm} from './config';
    import mixModel from '@/utils/mixins/model';

    export default {
        props: {
            data: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                options: {
                    labelWidth: 80,
                    inline: false
                },
                fields: useTemplateForm.fields,
                model: {
                    gdt: '1',
                    audit: '1'
                },
                tmpData: this.data
            };
        },
        watch: {
            data(val) {
                this.tmpData = val;
            }
        },
        methods: {
            onFieldChange(field, value) {
            },
            onCancel () {
                this.visible = false;
            },
            onOk() {
                console.log(this.tmpData);
                this.$Message.success({content: '保存成功'});
                this.visible = false;
            }
        },
        mixins: [mixModel]
    };
</script>
<style lang="less">
    .com-use-template {
        .listwp {
            .ivu-col {
                margin-bottom: 20px;
                .imgwp {
                    height: 150px;
                    overflow: hidden;
                }
                img {
                    width: 100%;
                }
            }
            .ivu-input-wrapper {
                margin-top: 0px;
            }
        }
        .ivu-form-item {
            text-align: left;
        }
    }
</style>