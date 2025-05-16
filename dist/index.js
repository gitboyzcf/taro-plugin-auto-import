'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const { AutoImportPlugin } = require('./bundle');
/**
 * 编译过程扩展
 */
var index = (ctx, pluginOpts) => {
    ctx.onBuildStart(() => {
        console.log("🚀 ~ taro-plugin-auto-import ~ 编译开始");
    });
    ctx.modifyWebpackChain(({ chain }) => {
        chain.plugin('unplugin-auto-import').use(AutoImportPlugin(pluginOpts));
        chain.module
            .rule("mjs")
            .test(/\.mjs$/)
            .type("javascript/auto")
            .include.add(/node_modules/)
            .end();
    });
    ctx.onBuildComplete(() => {
        console.log("🚀 ~ taro-plugin-auto-import ~ 构建完成！");
    });
    ctx.onBuildFinish(() => {
        console.log('Webpack 编译结束！');
    });
};

exports.default = index;
//# sourceMappingURL=index.js.map
