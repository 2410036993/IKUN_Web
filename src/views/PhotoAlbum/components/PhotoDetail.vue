<script setup>
import { useRoute } from 'vue-router';
import Loading from '@/components/Loading.vue';
import useLoading from '@/composables/useLoading';
import BgBoard from '@/components/BgBoard.vue';
import { ref, onMounted } from 'vue'
import PhotoPresentation from './PhotoPresentation.vue';
import VideoPresentaion from './VideoPresentaion.vue'
import { getPhoto } from '@/api/photo';
/**
 * Loading效果
 */
const { isLoading } = useLoading()

onMounted(() => {
  window.scrollTo(0, 0);
})

/**
 * 获取到页面传来的参数
 */
const router = useRoute()
const id = router.params.id
const category = router.params.category

// 图片集合
const photoList =ref([])
// 获取到图片集合
const getPhotoList = async () => {
  // 存储数据
  const res = await getPhoto(id)
  // 复制
  photoList.value = res.data
}
onMounted(()=>{
  getPhotoList()
})
</script>

<template>
  <Loading :is-loading="isLoading" />
  <BgBoard :title="category" />
  <!-- 加载图片组件 -->
  <PhotoPresentation v-if="id != 7" :photoList="photoList" @update-list="updateList" />
  <!-- 视频组件 -->
  <VideoPresentaion v-else :photoList="photoList"/>
</template>

<style lang="scss" scoped></style>