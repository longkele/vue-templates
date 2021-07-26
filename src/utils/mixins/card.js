/**
 * @file 列表中包含卡片的页面公共类
 */

import mixinInit from '@/utils/mixins/pageInit';
import filterForm from '@/utils/mixins/filterForm';

import useTemplate from '@/views/material/aUseTemplate.vue';

export default {
    data() {
        return {
            qrCodeOpen: false,
            openDetails: false,
            tmpSelectList: [] // 兼容点击卡片的单项选择 和 多选 两种方式；
        }
    },
    methods: {
        formatCarddata(item) {
            return item;
        },
        onQrCodeClick(val) {
            this.qrCodeOpen = true;
        },
        // 点击卡片图片后，弹窗展示单个卡片的详情；
        onOpenDetail(item) {
            this.openDetails = true;
            this.tmpSelectList = [item];
        },
        // 点击选定使用或者套用模板后，弹窗展示当前选择卡片的详情；
        onOpenDetails() {
            if (this.selectAllList.length === 0) {
                this.$Message.warning({content: '请先选择记录！', top: 300});
                return;
            }
            this.tmpSelectList = this.selectAllList;
            this.openDetails = true;
        }
    },
    components: {
        useTemplate
    },
    mixins: [mixinInit, filterForm]
}