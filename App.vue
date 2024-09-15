<script setup>
import { useRouter } from 'vue-router'
import { nextTick, onMounted } from 'vue'

// 路由实例
const router = useRouter()

onMounted(async () => {
  if (router.path !== '/home') {
    await router.replace('home')
    await nextTick(() => {
      window.scrollTo(0, 0);
    })
  } else {
    window.scrollTo(0, 0);
  }
})

</script>

<template>
  <!-- 一级路由出口 -->
  <router-view></router-view>
</template>

<style>
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

li {
  list-style: none;
}

::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
</style>
