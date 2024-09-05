<script setup>
import { ref, onMounted } from 'vue'
// 接受组件传过来的数据
defineProps({
  photoList: Array
})
onMounted(()=>{
  window.scrollTo(0, 0);
})
const scrollContainer = ref(null); // 创建一个 ref 来引用滚动容器  
onMounted(() => {
  // 在组件挂载后，将滚动容器滚动到顶部  
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop = 0;
  }
});
</script>

<template>
  <div class="box">
    <!-- 延迟500ms在更新视频 -->
    <ul v-infinite-scroll="load" ref="scrollContainer" infinite-scroll-delay="800" class="infinite-list"
      style="overflow: auto">
      <li v-for="i in photoList" :key="i" class="infinite-list-item">
        <p style="margin-left: 25px;color: #aac9fa;margin-bottom: 6px;">{{ i.time }}</p>
        <div class="div-img">
          <!-- 图片的宽度 -->
          <vue3-VideoPlay v-for="park in i.photoUrlList" :key="park" width="350px" height="278px" class="vido"
            :src="park" :poster="i.imagePath" :autoPlay="false" />
        </div>
      </li>
    </ul>
  </div>

</template>

<style lang="scss" scoped>
.box {
  margin-left: 280px;
}

.infinite-list {
  width: 1000px;
  height: 900px;
  padding: 0;
  list-style: none;
  background-color: #626a73;
  border-radius: 20px;
  border: 1px solid #aac9fa;
  box-shadow: 0 5px 15px #8597b4;
}

.infinite-list .infinite-list-item {
  height: 360px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  margin: 20px;

  .div-img {
    display: flex;
    // 限制图片的宽度
    width: 705px;
    height: 300px;
    align-items: center;
    justify-content: space-between;
  }
}

.infinite-list .infinite-list-item+.list-item {
  margin-top: 10px;
}
</style>