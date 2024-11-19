<template>
  <div>
    <ElForm :model="form">
      <dp-brand-selector v-model:cats="form.cats" v-model:brds="form.brds" :options="form.options" />
    </ElForm>

  </div>
</template>

<script setup lang="ts" name="DateStartEnd">
import { ElForm } from 'element-plus'
import { ref } from 'vue'
const form = ref({
  cats: ["look", "look，int"],
  brds: ["pgtest", "1234"],
  options:{
    allBrandList: [
      {
        "id": 1,
        "created_at": "2023-04-10 13:08:30",
        "updated_at": "2023-04-10 13:08:30",
        "name": "test1",
        "cat_code": "look",
        "detail": null,
        "operator": "bonnie",
        "status": 0
      },
      {
        "id": 2,
        "created_at": "2023-04-10 13:08:46",
        "updated_at": "2023-04-10 13:44:38",
        "name": "test2",
        "cat_code": "look，int",
        "detail": null,
        "operator": "bonnie",
        "status": 1
      },
      {
        "id": 3,
        "created_at": "2023-04-11 16:29:38",
        "updated_at": "2023-04-14 11:22:00",
        "name": "kiki-99",
        "cat_code": "kiki",
        "detail": "kiki测试",
        "operator": "bonnie",
        "status": 1
      },
      {
        "id": 4,
        "created_at": "2023-04-14 14:02:45",
        "updated_at": "2023-04-14 14:02:45",
        "name": "abc",
        "cat_code": "qwe",
        "detail": null,
        "operator": "Kiki",
        "status": 0
      },
      {
        "id": 5,
        "created_at": "2023-05-09 06:49:09",
        "updated_at": "2023-05-09 06:49:09",
        "name": "viv",
        "cat_code": "ab",
        "detail": null,
        "operator": "Rebecca",
        "status": 0
      }
    ],
    getBrandFn:getBrandFn
  }
})

//模拟方法请求
function getBrandFn (){
  return Promise.resolve({
    data:[{
      "id": 62,
      "created_at": "2023-01-18 12:00:01",
      "updated_at": "2023-01-18 12:00:01",
      "brand_code": "adjust",
      "brand_name": "adjust",
      "sub_brands": null,
      "remark": "Testing for Adjust.",
      "operator": "tsunami1",
      "homepage": null,
      "cat_code": null
    },
    {
      "id": 63,
      "created_at": "2023-03-15 13:53:42",
      "updated_at": "2023-03-15 13:53:42",
      "brand_code": "dev",
      "brand_name": "dev",
      "sub_brands": null,
      "remark": null,
      "operator": "stone",
      "homepage": "https//www.google.com",
      "cat_code": null
    },
    {
      "id": 64,
      "created_at": "2023-03-29 11:33:52",
      "updated_at": "2023-04-17 07:34:09",
      "brand_code": "pgtest",
      "brand_name": "pgtest",
      "sub_brands": null,
      "remark": "pg接入测试专用",
      "operator": "Kiki",
      "homepage": null,
      "cat_code": "look"
    },
    {
      "id": 65,
      "created_at": "2023-04-10 09:11:48",
      "updated_at": "2023-04-17 09:06:59",
      "brand_code": "123",
      "brand_name": "look",
      "sub_brands": null,
      "remark": null,
      "operator": "Kiki",
      "homepage": null,
      "cat_code": "kiki"
    },
    {
      "id": 66,
      "created_at": "2023-04-10 13:13:41",
      "updated_at": "2023-04-10 13:13:41",
      "brand_code": "1234",
      "brand_name": "York",
      "sub_brands": null,
      "remark": null,
      "operator": "bonnie",
      "homepage": null,
      "cat_code": "look"
    }]
  })
}
</script>

<style lang="scss" scoped></style>
  