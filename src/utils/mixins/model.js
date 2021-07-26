/**
 * @file 实现自定义v-model
 * @date 2021-06-15
 */

export default {
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    data() {
        return {
            visible: false // this.value
        };
    },
    watch: {
        value(val) {
            this.visible = val;
        },
        visible(val) {
            this.$emit('change', val);
        }
    }
}