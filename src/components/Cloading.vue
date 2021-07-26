<!-- 全屏loading组件 -->
<template lang="html">
    <Modal
        v-model="tmpShow"
        class="cm_loadingwp"
        footer-hide
        :mask-closable="false"
        :closable="false"
    >
        <Progress
            class="progress"
            status="active"
            :stroke-color="'#2d8cf0'"
            :percent="tmpProgressVal"
        />
    </Modal>
</template>

<script>
export default {
    props: {
        showloading: {
            type: Boolean,
            default: true
        },
        progressVal: {
            type: Number,
            default: undefined
        },
        // 总等待时长
        totalTime: {
            type: Number,
            default: 2000
        }
    },
    data() {
        return {
            tmpShow: this.showloading,
            tmpProgressVal: 0
        }
    },
    watch: {
        showloading(val) {
            if (val) {
                this.tmpProgressVal = 0;
                this.tmpShow = val;
                this.autoStep();
            } else {
                this.tmpProgressVal = 100;
                setTimeout(() => {
                    this.tmpShow = val;
                }, 600);
            }
        },
        progressVal(val) {
            this.tmpProgressVal = val;
        }
    },
    methods: {
        autoStep() {
            let step = 1;
            let count = this.totalTime / (100 / step);

            // if (typeof this.progressVal !== 'undefined') {
            //     return;
            // }
            let time = setInterval(() => {
                if (this.tmpProgressVal + step >= 99) {
                    this.tmpProgressVal = 99;
                    clearInterval(time);
                } else {
                    this.tmpProgressVal += step;
                }
            }, count)
        }
    },
    mounted() {},
    created() {}
}
</script>

<style lang="less" scoped>
</style>
