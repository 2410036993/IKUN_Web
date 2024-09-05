<script setup>
import BgBoard from '@/components/BgBoard.vue'
import Loading from '@/components/Loading.vue';
import useLoading from './../../composables/useLoading.js'
import { onMounted, ref } from 'vue'
import { getPath } from '@/api/about'

/**
 * Loading效果
 */
const { isLoading } = useLoading()
const pathList = ref([])
const total = ref(0)
onMounted(async () => {
  window.scrollTo(0, 0);
  const res = await getPath()
  pathList.value = res.data
  total.value = res.data.reduce((sum, item) => sum + item.time, 0)
})

</script>

<template>
  <Loading :is-loading="isLoading"></Loading>
  <BgBoard title="学习路" wengan="在这里，我镌刻时空的学习印记，每一次回顾，都是一次心灵的洗礼与成长" />
  <div class="learning">
    <h2 style="color: #aac9fa;margin-left: 35px;margin-bottom: 30px;font-family: cursive;display: flex;">
      <i class="iconfont icon-shijian" style="font-size: 28px;color: #2a343e;margin-right: 8px;"></i>
      总学习时间({{ total }}天)
    </h2>
    <el-timeline>
      <el-timeline-item center v-for="item in pathList" :key="item" color="#aac9fa" hollow="true"
        :timestamp="`${item.startTime}至${item.endTime}`" placement="top">
        <el-alert :title="item.name" type="info" effect="dark" :close-text="`学习时间${item.time}天`" />
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<style lang="scss" scoped>
.learning {
  width: 830px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #aac9fa;
  border-radius: 20px;
  background-color: #626a73;
}
</style>
