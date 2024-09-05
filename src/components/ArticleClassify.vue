<script setup>
import { useRoute, useRouter } from 'vue-router';
import BgBoard from '@/components/BgBoard.vue';
import Loading from '@/components/Loading.vue';
import useLoading from '@/composables/useLoading.js'
import { onMounted, ref } from 'vue'
import { getArticleClassify } from '@/api/article'
/**
 * Loading效果
 */
const { isLoading } = useLoading()
const router = useRoute()
// 分页参数
const pageParams = ref({
  page: 1,
  limit: 6,
  name: '',
  type: 0,
})
onMounted(() => {
  window.scrollTo(0, 0);
  pageParams.value.name = router.params.name
  pageParams.value.type = router.params.id
})
// 全部文章数据
const entriesList = ref([])
// 文章总数
const total = ref(0)
// 获取
const getEntireList = async () => {
  const res = await getArticleClassify(pageParams.value)
  entriesList.value = res.data
  total.value = res.data.total
}
// 页面加载获取到所有的数据
onMounted(() => {
  getEntireList()
})
// 点击了分页
const handleCurrentChange = () => {
  getEntireList()
}
const route = useRouter()
// 跳转详情
const onDetail = (id) => {
  route.push(`/article/${id}`)
}
</script>

<template>
  <Loading :isLoading="isLoading" />
  <BgBoard :title="pageParams.name"></BgBoard>
  <div class="tabs" v-if="entriesList.length > 0">
    <div class="tabs-box" v-for="item in entriesList" :key="item" @click="onDetail(item.id)">
      <!-- 图片位置 -->
      <div class="img-box">
        <img :src="item.cover" alt="">
      </div>
      <!-- 时间文字概述 -->
      <div class="text">
        <h3 style="color: #223040;">{{ item.title }}</h3>
        <p>{{ item.describe }}</p>
        <i class="iconfont icon-rili"> {{ item.createTime }}</i>
      </div>
    </div>
    <div class="fy" style="margin: 10px 0 0 20px;">
      <el-pagination background layout="prev, pager, next" :default-page-size="pageParams.limit"
        @current-change="handleCurrentChange" v-model:current-page="pageParams.page" :total="total" />
    </div>
  </div>
  <!-- 没有有照片的时候显示空状态 -->
  <div v-else class="empty-box">
    <!-- 自定义空状态时的图片 -->
    <el-empty :image-size="400"
      image="http://59.110.169.188:9000/blog/admin-photo/20240711/4286f4a5d9684aacba4d0e708875f4cf8ada62755b2f445990c71b23fdc57f5c%E7%A9%BA%E6%95%B0%E6%8D%AE.png"
      style="width: 1530px;height: 400px">
      <!-- 作用域插槽 -->
      <template #description>
        <!-- 重写这个样式 -->
        <span style="color: #aac9fa;font-size: 20px;" >还没有发布文章数据哦</span>
      </template>
    </el-empty>
  </div>
</template>

<style lang="scss" scoped>
.empty-box {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 10px auto;
  width: 1000px;
  height: 500px;
  background-color: #414e5d;
  text-align: center;
  opacity: 0.8;
  border-radius: 16px;
}

.tabs {
  width: 900px;
  margin: 10px auto 25px auto;

  .fy {
    :deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
      background-color: #8597b4 !important; //修改默认的背景色
    }

    :deep(.el-pagination.is-background .el-pager li:not(.is-disabled)) {
      background-color: #626a73 !important; //修改默认的背景色
    }

    :deep(.el-pagination.is-background .btn-prev.is-first .el-icon) {
      color: #8597b4 !important; //修改默认的背景色
      font-weight: bold;
    }

    :deep(.el-pagination.is-background .btn-next.is-last .el-icon) {
      color: #8597b4 !important; //修改默认的背景色
      font-weight: bold;
    }

    :deep(.el-pagination.is-background .btn-prev.is-first) {
      background-color: #626a73 !important; //修改默认的背景色
    }

    :deep(.el-pagination.is-background .btn-next.is-last) {
      background-color: #626a73 !important; //修改默认的背景色
    }
  }

  .tabs-box {
    transition: all 0.3s ease;
    border-radius: 15px;
    margin: 10px 0 10px 18px;
    background-color: #626a73;
    width: 900px;
    height: 200px;
    display: flex;
    border: 1px solid #9fbbe7;

    .img-box {
      display: flex;
      width: 350px;
      height: 100%;
      align-items: center;

      img {
        margin-left: 10px;
        width: 275px;
        height: 130px;
        object-fit: cover;
      }
    }

    .text {
      margin-top: 13px;
      height: 170px;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      h3 {
        margin: 0;
        padding: 0;
        font-weight: bold;
      }

      p {
        margin-top: 10px;
        margin-right: 2px;
        padding: 0;
        color: #9fbbe7;
        font-weight: bold;
      }

      i {
        font-size: 13px;
        color: #8293ae;
        font-weight: bold;
      }
    }
  }

  .tabs-box:first-child {
    margin: 30px 0 10px 18px;
  }

  .tabs-box:hover {
    box-shadow: 2px 2px 20px 2px #aac9fa;
    cursor: pointer;
  }

}
</style>
