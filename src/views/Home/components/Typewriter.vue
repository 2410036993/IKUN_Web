<script setup>
import { ref } from 'vue'
// 从后端获取到首页打字机文字(程序员文案)
const textList = ref([])
textList.value = [
  '正在和世界解耦和',
  '如果它没坏 就不要修复它',
  '虚拟与现实 一码之隔',
  '每一行代码 都是对未来的承诺'
]

</script>

<template>
  <div class="box">
    <!-- 打字机效果 -->
    <div class="app-typewriter">
      <p>Hao's Blog</p>
      <!-- TODO从后端获取到要输入的字控制在10个字左右 -->
      <vuetyped :strings="textList" class="vuetyped" :showCursor="true" :typeSpeed="330" :loop="true" :backSpeed="15">
        <span class="typing"></span>
      </vuetyped>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-typewriter {
  margin-top: 280px;
  border: 1px solid #86868b;
  width: 100%;

  p {
    margin-bottom: 20px;
    margin-top: 10px;
    text-align: center;
    color: #ffffff;
    font-size: 55px;
    font-style: italic;
    font-weight: bold;
  }

  .vuetyped {
    margin-left: 643px;
    color: #fffefe;
    font-weight: bold;
    font-size: 18px;
    letter-spacing: 0.1em;
  }
}
</style>
