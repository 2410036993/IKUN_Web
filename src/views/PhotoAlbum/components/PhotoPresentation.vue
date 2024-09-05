<script setup>
import {onMounted} from 'vue'
onMounted(()=>{
  window.scrollTo(0, 0);
})
defineProps({
  photoList: Array
})
</script>

<template>
  <!-- 当没有数据的时候显示 -->
  <div class="box" v-if="photoList.length > 0">
    <ul v-infinite-scroll="load" infinite-scroll-distance="200px" class="infinite-list" style="overflow: auto">
      <li v-for="i in photoList" :key="i" class="infinite-list-item">
        <p style="margin-left: 25px;color: #aac9fa;margin-bottom: 6px;">{{ i.time }}</p>
        <div class="div-img">
          <el-image :src="photo" fit="cover" class="tp" :preview-src-list="i.photoUrlList" :initial-index="index"
            v-for="(photo, index) in i.photoUrlList" :key="photo" />
        </div>
      </li>
    </ul>
  </div>
  <!-- 没有有照片的时候显示空状态 -->
  <div v-else class="empty-box"  >
    <!-- 自定义空状态时的图片 -->
    <el-empty :image-size="400"  image="http://59.110.169.188:9000/blog/admin-photo/20240711/4286f4a5d9684aacba4d0e708875f4cf8ada62755b2f445990c71b23fdc57f5c%E7%A9%BA%E6%95%B0%E6%8D%AE.png" style="width: 1530px;height: 400px" >
      <!-- 作用域插槽 -->
      <template #description>
        <!-- 重写这个样式 -->
        <span style="color: #aac9fa;font-size: 20px;">该相册分类下还没有照片</span>
      </template>
    </el-empty>
  </div>
</template>

<style lang="scss" scoped>
.empty-box{
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
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  margin: 20px;

  .div-img {
    flex-wrap: wrap;
    display: flex;
    align-items: center;
    justify-content: start;
    width: 830px;

    .tp {
      margin-top: 2px;
      margin-left: 3px;
      width: 200px;
      height: 180px;
      object-fit: cover;
    }
  }
}

.infinite-list .infinite-list-item+.list-item {
  margin-top: 10px;
}
</style>