<script setup>
import Loading from './../../components/Loading.vue'
import { ref,onMounted } from 'vue'
import BgBoard from '@/components/BgBoard.vue';
import useLoading from './../../composables/useLoading.js'
import { useRouter } from 'vue-router';
import { getCategory } from '@/api/photo'
/**
 * Loading效果
 */
const { isLoading } = useLoading()
// 获取到所有的分类信息
const photoList = ref([])
onMounted(async () => {
  const res = await getCategory()
  photoList.value = res.data
})
// 路由实例
const router = useRouter()
// 路由跳转
const onPhotoDetail = (item) => {
  // 携带参数跳转
  router.push(`/photo/${item.id}/${item.name}`)
}
</script>

<template>
  <Loading :is-loading="isLoading" />
  <BgBoard :title="'相册'" :wengan="'在这里，每一张照片都是时光的碎片，它们拼凑成我生活的记忆拼图。欢迎走进我的世界，与我一起回味那些美好瞬间'" />
  <div class="box">
    <!-- 每一行的头像盒子 -->
    <div class="box-img">
      <div class="img" v-for="item in photoList" :key="item" @click="onPhotoDetail(item)">
        <img :src="item.cover" >
        <span class="box__caption">{{ item.name }}</span>
        <p class="box__count">{{ item.count }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 700px;
  margin-bottom: 60px;

  .box-img {
    margin: 10px 0 0 153px;
    width: 1220px;
    height: 730px;
    border-radius: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    border: 2px solid #8597b4;
    box-shadow: 2px 2px 40px 2px #626a73;

    .img {
      transition: box-shadow 0.3s ease;
      /* 平滑过渡效果 */
      margin: 40px 0px 0px 10px;
      width: 255px;
      height: 270px;
      border-radius: 15px;
      overflow: hidden;
      background-color: #626a73;
      box-shadow: 0 15px 30px rgba(0, 0, 0, .3);

      &:hover {
        box-shadow: 0 5px 15px #8597b4;
        cursor: pointer;
      }

      img {
        width: 255px;
        height: 170px;
        object-fit: cover;
        border-radius: 13px 0 5px 5px;
      }

      .box__caption {
        margin-top: 30px;
        font-size: 20px;
        color: #aac9fa;
      }

      .box__count {
        margin-top: 4px;
        color: #8597b4;
      }
    }

    .img:nth-child(1) {
      transform: rotate(-5deg);
    }

    .img:nth-child(2) {
      transform: rotate(5deg);
    }

    .img:nth-child(3) {
      transform: rotate(-5deg);
    }

    .img:nth-child(4) {
      transform: rotate(5deg);
    }

    .img:nth-child(5) {
      transform: rotate(5deg);
    }

    .img:nth-child(6) {
      transform: rotate(-5deg);
    }

    .img:nth-child(7) {
      transform: rotate(5deg);
    }

    .img:nth-child(8) {
      transform: rotate(-5deg);
    }
  }
}
</style>