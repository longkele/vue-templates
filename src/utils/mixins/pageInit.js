/**
 * @file    pageInit

 */
/* eslint-disable */

import vuebus from '@/utils/event-bus';

export default {
    props: {
        curItem: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            selurl: '',
            product: ''
        };
    },
    created() {
        this.$Loading.start();
        this.$emit('on-routeChange', this.$route);
        this.product = window.PAGE_DATA.product;
        
        vuebus.$on('on-product-change', value => {
            this.product = value;
            this.onProductChange && this.onProductChange(value);
        });
    },
    mounted() {
        setTimeout(()=> {
            this.$Loading.finish();
        }, 1000);
    },
    methods: {
        contentLoad() {
            this.$emit('on-contentLoad');
        }
    }
}
