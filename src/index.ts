import type { IPluginContext } from '@tarojs/service'
import webpackChain from 'webpack-chain'

const { AutoImportPlugin } = require('./bundle')

interface IPluginOptions {
  /**
   * 插件配置 参考
   * @see https://github.com/unplugin/unplugin-auto-import/tree/main?tab=readme-ov-file#unplugin-auto-import
   */
  [key: string]: any;
}

/**
 * 编译过程扩展
 */
export default (ctx: IPluginContext, pluginOpts: IPluginOptions) => {
  ctx.onBuildStart(() => {
    console.log("🚀 ~ taro-plugin-auto-import ~ 编译开始")
  })

  ctx.modifyWebpackChain(({ chain }: { chain: webpackChain }) => {
    chain.plugin('unplugin-auto-import').use(
      AutoImportPlugin(pluginOpts)
    )
    chain.module
      .rule("mjs")
      .test(/\.mjs$/)
      .type("javascript/auto")
      .include.add(/node_modules/)
      .end();
  })

  ctx.onBuildComplete(() => {
    console.log("🚀 ~ taro-plugin-auto-import ~ 构建完成！")
  })
  ctx.onBuildFinish(() => {
    console.log('Webpack 编译结束！')
  })
}
