<script setup>
import IndexBar from './components/IndexBar.vue';
import FooterBar from './components/FooterBar.vue'
</script>

<template>
  <div>
    <!-- 导航栏 -->
    <IndexBar />
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <!-- 底部栏 -->
    <FooterBar />
  </div>

</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

div {
  /* background-color: #97adbe;
   */
  background-color: #86868b;
  position: relative;
  height: 100%;
  width: 100%;
  /*把背景图片放大到适合元素容器的尺寸，图片比例不变*/
  background-size: cover;
  left: 0;
}
</style>
