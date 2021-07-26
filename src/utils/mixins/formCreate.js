/**
 * @file    formCreate

 * @desc    formCreate自定义组件，公用的mixin
 */
/* eslint-disable */

export default {
    props: {
        value: [String, Number, Boolean, Array, Object, Function],
        field: '',
        title: '',
        options: [],
    },
    inject: {
        $pfc: {
            default: null
        }
    },
    data() {
        return {
            model: this.value,
        };
    },
    watch: {
        value(val) {
            this.model = val; //同步 value 的值
        },
    },
    computed: {
        row() {
            return this.$pfc.option.row || {};
        }
    },
    methods: {
        onChange(val) {
            this.model = val;
            this.$emit('input', this.model);
        }
    }
};