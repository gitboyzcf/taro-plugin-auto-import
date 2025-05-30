# taro-plugin-vue-components

[Taro + Vue3](https://docs.taro.zone/docs/composition-api) **自动导入多个API的插件**，支持TypeScript，从[unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import/tree/main?tab=readme-ov-file#unplugin-auto-import) 派生并修改以适配 Taro

## 使用

### 安装

```
npm i taro-plugin-vue-components -D
```

### 使用插件

`/config/index.js`

```js
const config = {
  plugins: [[
    'taro-plugin-auto-import',
    {
      imports: [
        'vue',
        'pinia',
        // '@tarojs/taro', // 后续加入
      ],

      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      }
    },
  ]],
}
```
