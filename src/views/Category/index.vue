<script setup>
import Loading from '@/components/Loading.vue';
import useLoading from './../../composables/useLoading.js'
import BgBoard from '@/components/BgBoard.vue';
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { getClassifyList } from '@/api/category'
/**
 * Loading效果
 */
const { isLoading } = useLoading()
onMounted(() => {
  window.scrollTo(0, 0);
})
const isShowText = ref(false)

// 鼠标悬停事件
const handleMouseEnter = () => {
  console.log('1');
  isShowText.value = true
}

// 鼠标离开
const handleMouseLeave = () => {
  isShowText.value = false
}
// 点击了分类
const router = useRouter()
// 点击进入标签页
const onClassify = (item) => {
  router.push(`/allarticle/${item}/${1}`)
}
const classifyList = ref([])
// 获取所有的分页和数据
const getCategoryAndArticle = async () => {
  const res = await getClassifyList()
  classifyList.value = res.data
}
onMounted(() => {
  getCategoryAndArticle()
})
// 跳转到文章详情
const onDetail = (id) => {
  router.push(`/article/${id}`)
}

</script>

<template>
  <Loading :isLoading="isLoading" />
  <BgBoard :title="'分类'" :wengan="'在这里，每一篇分类都是一道独特的门扉，引领您步入我精心营造的思想花园'" />
  <div class="category" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <!-- 分类盒子 -->
    <div class="box" v-for="item in classifyList" :key="item">
      <h3 :class="{ 'h3-op': isShowText }">{{ item.categoryName }}</h3>
      <!-- 分类概述 -->
      <div class="dh" :class="{ 'h3-op': !isShowText }">
        <h2 @click="onClassify(item.categoryName)">{{ item.categoryName }}({{ item.count }})</h2>
        <p>推荐阅读</p>
        <div class="gs" @click="onDetail(article.id)"  v-for="article in item.hotArticleVoList" :key="article.id">
          <div class="img-box">
            <img :src="article.cover" alt="">
          </div>
          <p>{{ article.title }}</p>
        </div>
      </div>
    </div>

  </div>
  <div class="card"></div>
</template>

<style lang="scss" scoped>
.category {
  width: 1030px;
  margin: 20px auto;
  background-color: #626a73;
  border-radius: 20px;
  display: flex;
  flex-wrap: wrap;
  padding: 18px 0 0 38px;
  border: 1px solid #aac9fa;


  .box {
    margin: 0px 15px 15px 10px;
    width: 300px;
    height: 410px;
    position: relative;
    background-color: #7a8aa3;
    border-radius: 10px;
    text-align: center;
    transition: all 0.3s ease;


    h3 {
      transition: all 0.8s ease;
      font-size: 26px;
      font-family: cursive;
      color: #aac9fa;
      font-weight: bold;
      position: absolute;
      left: 32%;
      top: 33%;
    }

    .h3-op {
      opacity: 0;
    }


    .dh {
      margin: 60px auto;
      transition: all 1s ease;
      width: 230px;
      height: 180px;

      h2 {
        margin-bottom: 60px;
        font-size: 26px;
        font-family: cursive;
        color: #aac9fa;
        background: linear-gradient(#626a73 0 0) var(--p, 0) / var(--p, 0) no-repeat;
        transition: .4s, background-position 0s;
      }

      h2:hover {
        cursor: pointer;
        --p: 100%;
        font-weight: bold;
        border-radius: 10px;
      }

      .gs {
        display: flex;
        align-items: center;
        color: #223040;

        p {
          font-size: 12px;
        }

        .img-box {
          margin-top: 12px;
          margin-right: 5px;
          width: 90px;
          height: 60px;

          img {
            width: 90px;
            height: 60px;
            object-fit: cover;
          }
        }
      }

      .gs:hover {
        cursor: pointer;
        color: #aac9fa;
        font-weight: bold;
      }


    }
  }

  .box::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 3px solid #aac9fa;
    border-radius: 10px;
    animation: div5Ani 5s infinite linear;
  }

  .box::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 3px solid #aac9fa;
    border-radius: 10px;
    animation: div5Ani 5s infinite linear;

  }

  @keyframes div5Ani {

    100% {
      clip-path: inset(0% 0% 98% 0%);
    }

    75% {
      clip-path: inset(0 98% 0 0);
    }

    50% {
      clip-path: inset(98% 0 0 0);
    }

    25% {
      clip-path: inset(0 0 0 98%);
    }

    0% {
      clip-path: inset(0% 0% 98% 0%);
    }
  }

  .box::after {
    animation: div5Ani 3s infinite -1.5s linear;
  }
}
</style>