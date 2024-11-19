<!-- 基础 -->

[[toc]]


# 贡献

### 1.启动开发模式
---
```bash
npm run dev
```

### 2.编译生产命令 
---
```bash
npm run build
```

### 3.调试组件效果
---
直接在/demo目录引人组件使用即可，已经做了软链引用

```vue
<script setup lang="ts">
import { DpTable } from '@dp/components'
</script>

<template>
    <DpTable btn-txt="我是按钮呀" @on-add="onAdd" />
</template>
```
也可以在自己项目修改`package.json`文件，增加以下依赖项实现软链，然后就可以在自己项目进行调试了。
```json
"dependencies": {
    "@dp/components": "link:绝对目录地址"
  }
```



### 4.组件文档输出
---
组件文档目录在 docs，组件的md说明文件也放在 docs/components/ 目录下

##### 启动文档开发模式
```bash
npm run dev
```

##### 编译文档
```bash
npm run build
```

### 5.发布组件包
在对应package 下执行发布命令即可，package包命名规则必需是 @dp/* 规则
```
npm pub # 会自动发布到内部npm仓库
```

