<script setup>
defineProps({
  title: String,
  wengan: String
})
</script>

<template>
  <div class="box-xk">
    <div class="title">{{ title }}</div>
    <div class="wa">
      {{ wengan }}
    </div>
  </div>

</template>

<style scoped>

.title,
.wa {
  color: #aac9fa;
  text-shadow: 21px 21px 88px #85cdff;
  font-size: 38px;
  /* 如果背景图片颜色较深，你可能想要白色文字 */
  text-align: center;
  /* 使标题居中对齐 */
  position: absolute;
  /* 绝对定位标题 */
  top: 46%;
  /* 将标题的顶部定位到容器高度的50% */
  left: 50%;
  /* 将标题的左边定位到容器宽度的50% */
  transform: translate(-50%, -50%);
  /* 通过transform属性将标题的中心点对齐到容器的中心点 */
  margin: 0;
}

.wa {
  width: 100%;
  text-shadow: 1px 1px 1px #85cdff;
  font-size: 19px;
  top: 77%;
  color: #8597b4;
  font-family: KaiTi;
}

/* NOTE: The styles were added inline because Prefixfree needs access to your styles and they must be inlined if they are on local disk! */
.box-xk {
  width: 100%;
  height: 200px;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%) !important;
  overflow: hidden;
  position: relative;
}
</style>
