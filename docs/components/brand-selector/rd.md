<!-- 表单 -->
<script setup>
import Basis from './demo/basis.vue'
// import basisCustom from './demo/basisCustom.vue'
// import customDays from './demo/customDays.vue'
</script>

# DPBrandSelector

::: tip
基于业务组件封装实现品牌分类和关联品牌功能，使用它可以节省大量代码实现你想要的功能
:::

[[toc]]

1、默认情况
<ClientOnly>
<div>
    <Basis />
</div>

</ClientOnly>

::: details 查看代码
<<< @/components/brand-selector/demo/basis.vue
:::

## 默认情况下参数说明
| 参数            | 说明     |          类型           | 可选值 | 默认值 |
| --------------- | -------- | :---------------------: | :----: | :----: |
| \*v-model:cats | 品牌类型 |         string[]          |   --   |   --   |
| \*v-model:brds   | 关联品牌 |         string[]          |   --   |   --   |
| options         | 详细配置 | Partial\<IDateOptoins\> |   --   |   {}   |
| brdLabelKey         | 关联品牌label的key | 'brand_name' | 'brand_code' |   --   |   brand_name   |


## 自定义情况下参数options 配置明细

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --------------- | -------- | :-------------------: | :----: | :----: |
| allBrandList | 品牌类型下拉数据 | [] | -- |  |
| getBrandFn | 关联品牌下拉数据回调 | function | -- |  |