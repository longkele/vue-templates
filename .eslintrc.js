module.exports = {
    extends: [
        '@ecomfe/eslint-config/baidu/default', // 根据代码库ES版本选择default或es5
        '@ecomfe/eslint-config/baidu/defect', // 根据代码库ES版本选择defect或defect-es5
        // '@ecomfe/eslint-config/react',
        // '@ecomfe/eslint-config/vue',
    ],
    rules: {
        'vue/require-v-for-key': 'off'
    }
};