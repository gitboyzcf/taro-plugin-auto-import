import type { IPluginContext } from '@tarojs/service';
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
declare const _default: (ctx: IPluginContext, pluginOpts: IPluginOptions) => void;
export default _default;
