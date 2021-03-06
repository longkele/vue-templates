/**
 * @file: 处理递归设置model值
 */

export const setValue = function setValue({originModel, model, value}) {

    let path = model.split('.');
    if (!originModel) {
        throw new Error('[formGenerator warn]: please define a valid model !');
    }

    const length = path.length;
    path.reduce((formModel, model, index) => {
        if (!formModel[model] && index !== length - 1) {
            this.$set(formModel, model, {});
        }
        if (index === length - 1) {
            this.$set(formModel, model, value);
        }
        return formModel[model];
    }, originModel);
};

export const getValue = function getValue({originModel, model}) {
    let path = model.split('.');
    return path.reduce((value, model) => {
        return value[model];
    }, originModel);
};