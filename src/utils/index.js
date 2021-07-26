/* eslint-disable */
/**
 * @file    工具集
 */

import config from '@/config/index';
import eutils from '@jnlong/eutils';
import Schema from 'async-validator';
import { options } from 'less';
import api from '@/config/api';

export function log() {
    if (config.debug) {
        var arg = [].slice.call(arguments);

        if (arg.length > 0 && typeof arg[0] === 'string') {
            arg[0] = '%c' + arg[0];
            arg.splice(1, 0, 'background:#eee;color: blue');
        }

        try {
            console.log.apply(null, arg);
        } catch (e) {
            console.log('util.log error');
        }
    }
};

/**
 * 获取唯一标识符
 * @return {string} 返回唯一标识符
 */
export const guid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0;
        let v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

export function formatRes(res, showError = true) {
    if (res && (res.errno === 0 || res.code === 0)) {
        let data = res.data || true;
        return data;
    } else {
        let msg = res.errmsg || res.data;
        if (showError && this.$Message) {
            this.$Message.error(msg);
        }
        return false
    }
}

/**
 * 复制文本到系统的粘贴板
 * @params text {string} 需要复制的文本
 */
export function copyUrl (text, id = 'selinput') {
    let tag = this.$refs[id];
    let that = this;

    if (!tag) {
        return;
    }
    if (text) {
        this.selurl = text;
        this.$nextTick(() => {
            copy();
        })
    } else {
        copy();
    }

    function copy() {
        tag.select();
        document.execCommand('Copy');
        that.$Message.success('复制成功');
    }
};

export {config, api};
