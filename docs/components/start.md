<!-- 基础 -->

[[toc]]

# 快速使用

## 安装

```bash
npm i xxl-uipreedom
```

## 引入样式文件

```ts
// main.ts
import '@dp/components/es/index.css'
```

## Valor支持

全局类型注册, 在 `tsconfig.json` 的 `compilerOptions.types`  增加值

```json
"compilerOptions": {
  "types": ["@dp/components/global"]
}
```

## 使用

### 方式一：自动按需引入（推荐）

安装插件

```bash
npm i -D unplugin-vue-components
```

配置

```ts
// vite.config.ts | webpack.config.ts
import Components from 'unplugin-vue-components/vite' // vite
// import Components from 'unplugin-vue-components/webpack' // webpack
import { ComponentsResolver } from '@dp/components/es/utils/resolver'

...
plugins: [
  Components({
    resolvers: [ComponentsResolver()]
  }),
]
...
```

> 注意：如果当前配置文件不支持`esm`，则从`cjs`引入：
>
> `import { ComponentsResolver } from '@dp/components/cjs/utils/resolver'`
>

使用

```jsx
<DpTable />
```

### 方式二：完整引入

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import DpComponents from '@dp/components'
import '@dp/components/es/index.css'

createApp(App).use(DpComponents).mount('#app')
```

使用

```jsx
<DpTable />
```

### 方式三：手动按需引入

使用

```js
import { DpTable } from '@dp/components'

<DpTable />
```
