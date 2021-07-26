<template>
    <div :class="['upload-comm', field.subType]">
        <div class="upload-content">
            <Upload
                ref="upload"
                name="file"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :on-error="handleError"
                :on-exceeded-size="handleExceededSize"
                :action="field.action"
                :accept="computeFormat.map(v => {
                    return '.' + v
                }).join(',')"
                :max-size="field.maxSize || 200"
                :format="computeFormat"
                :show-upload-list="field.showUploadList"
                :disabled="disabled"
            >
                <Button
                    v-if="field.subType === 'uploadExcel'"
                    class="upload-btnok"
                    type="text"
                    size="small"
                    :disabled="disabled"
                    @click.stop="handleDown"
                >下载模板</Button>
                <Button
                    class="upload-btnok"
                    size="small"
                    icon="md-cloud-upload"
                    :disabled="disabled"
                >上传{{ btnText }}</Button>
                <div
                    v-if="field.subType === 'video'"
                    class="imgwp background-base"
                >
                    <video
                        ref="uploadVideo"
                        :src="myIcon"
                        preload
                        width="100%"
                        height="100%"
                        @loadeddata="getFirstImg"
                    ></video>
                </div>
                <div v-else-if="field.subType === 'image'" class="imgwp background-base">
                    <p class="bg-img background-base" :style="{backgroundImage: 'url(' + myIcon + ')'}"></p>
                </div>
            </Upload>

            <div
                v-if="field.subType !== 'uploadExcel'"
                class="upload-tips"
            >
                {{ field.tip || '' + (field.subType === 'image' ? '' : '') }}
                支持{{ computeFormat.join('、').toUpperCase() }}格式，小于{{ disSize }}
            </div>
            <template v-if="field.showInput">
                <Input
                    v-if="field.subType === 'image'"
                    v-model="myIcon"
                    clearable
                    placeholder="图片链接"
                    @on-change="inputchange"
                />
                <Input
                    v-else-if="field.subType === 'video'"
                    v-model="myIcon"
                    type="textarea"
                    :rows="1"
                    placeholder="视频链接"
                    clearable
                    @on-change="inputchange"
                />
                <Input
                    v-else
                    v-model="myIcon"
                    class="upload-input"
                    type="textarea"
                    :rows="field.subType === 'uploadExcel' ? 6 : 2"
                    :disabled="field.subType === 'uploadExcel'"
                    @on-change="inputchange"
                />
            </template>
        </div>
    </div>
</template>

<script>
import {getValue} from '@/utils/processValue';

const textObj = {
    'image': '图片',
    'video': '视频',
    'uploadExcel': 'excel'
}

export default {
    name: 'uploadern',
    inject: ['FormInstance'],
    props: {
        field: {
            type: Object,
            required: true
        },
        size: {
            type: String,
            default() {
                return 'default';
            }
        }
    },
    data() {
        return {
            myIcon: '',
            btnText: textObj[this.field.subType],
            disSize: this.calSize(this.field.maxSize || 200),
            uploadList: []
        }
    },
    mounted() {
        this.myIcon = this.value;
        this.uploadList = this.$refs.upload.fileList;
    },
    created() {
        // this.icon && this.setMyicon(this.icon);
    },
    computed: {
        value() {
            let value = getValue({
                originModel: this.FormInstance.model,
                model: this.field.model
            }) || '';
            return value;
        },
        computeFormat() {
            return this.field.format || ['jpg', 'png'];
        },
        disabled() {
            if (this.field.maxCount && this.uploadList.length >= this.field.maxCount) {
                return true;
            } else {
                return this.field.disabled;
            }
        }
    },
    watch: {
        value(value) {
            this.setMyicon(value);
        },
    },
    filters: {},
    methods: {
        setMyicon(val) {
            if (this.field.subType ==='uploadExcel' && typeof val === 'object') {
                this.myIcon = JSON.stringify(val, null, 2);
            } else {
                this.myIcon = val;
            }
        },
        calSize(maxSize) {
            return maxSize >= 1024 ? maxSize / 1024 + 'MB' : maxSize + 'KB';
        },
        getFirstImg() {
            if (this.field.subType === 'video' && this.value) {
                let video = this.$refs.uploadVideo;

                video.play();
                setTimeout(function() {
                    video.pause();
                }, 500);
            }
        },
        handleChange() {
            // this.$set(this.FormInstance.model, this.field.model, this.myIcon);
            this.$emit('on-change', this.field.model, this.myIcon, null, this.field);
        },
        inputchange(e) {
            this.myIcon = e.target.value;
            this.handleChange();
        },
        handleDown() {
            location.href = this.field.tmpurl || 'https://efe-h2.cdn.bcebos.com/ceug/resource/res/2019-9/1567401926920/4cb6ad0ee21a.xlsx';
        },
        handleError(e) {},
        handleExceededSize(e) {
            this.$Message.error(`请上传小于${this.disSize}的${textObj[this.field.subType]}！`);
        },
        handleRemove(file) {
            this.myIcon = ''
            this.handleChange();
        },
        handleSuccess(res) {
            let value = {};
            if (res.errno == 0) {
                if (this.field.subType === 'uploadExcel') {
                    try {
                        value = this.initInput(res.data);
                    } catch (e) {
                        value = {};
                    }
                } else {
                    !/^http(s?):/.test(res.data.cdn_url) && (res.data.cdn_url = 'https:' + res.data.cdn_url)
                    value = res.data.cdn_url;
                }
                this.setMyicon(value);
                this.handleChange();
                this.$Message.success(`上传${textObj[this.field.subType]}成功`);
            } else {
                this.$Message.error(res.errmsg)
            }
        },
        initInput(source) {
            if (Object.prototype.toString.call(source) !=='[object Array]' || source.length < 3) {
                return;
            }

            let res = {};
            let title = source[1];
            let key1 = '';
            let key2 = '';
            source = source.slice(2);

            source.forEach(item => {
                item.forEach((itemCon, indexCon) => {
                    if (indexCon === 0) {
                        key2 = itemCon;
                    } else {
                        key1 = title[indexCon];
                        if (key2) {
                            !res[key1] && (res[key1] = {})
                            res[key1][key2] = itemCon;
                        }
                    }
                })
            })
            return res;
        }
    }
}
</script>

<style lang="less">
    .upload-comm {
        display: flex;
        position: relative;
        &.image,&.video {
            width: 100%;
            padding-left: 99px;
        }
        .imgwp {
            position: absolute;
            top: 0;
            left: 0;
            width: 80px;
            height: 80px;
            background-image: url(../../assets/img/bg-upload.png);
            .bg-img {
                position: absolute;
                top: 3px;
                left: 3px;
                bottom: 3px;
                right: 3px;
                border-radius: 6px;
                overflow: hidden;
                background-size: contain;
            }
        }
        .upload-content {
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: space-between;
            .upload-btnok {
                padding: 2px 30px;
                height: auto;
                line-height: 1;
                border-style: dashed;
                .ivu-icon {
                    font-size: 18px;
                }
            }
        }
        .upload-input {
            font-family: monospace;
            input[disabled],textarea[disabled] {
                font-size: 12px;
                color: inherit;
            }
        }
        .upload-tips {
            line-height: 17px;
            font-size: 12px;
            color: #919EAB;
        }
    }
</style>